import { useState, useEffect, useMemo } from 'react';
import {
  db,
  collection,
  query as firestoreQuery,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from '@/integrations/firebase/client';
import { startOfDay, startOfWeek, startOfMonth, subDays, format, startOfHour } from 'date-fns';

export type TimeRange = 'today' | 'week' | 'month' | 'all';

interface AnalyticsData {
  id: string;
  emotion: string;
  emotion_confidence: number;
  age_group: string;
  age_estimate: number | null;
  gender: string;
  gender_confidence: number;
  timestamp: string;
  session_id: string | null;
  created_at: string;
}

export function useAnalytics(timeRange: TimeRange = 'today') {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStartDate = (range: TimeRange): Date | null => {
    const now = new Date();
    switch (range) {
      case 'today':
        return startOfDay(now);
      case 'week':
        return startOfWeek(now);
      case 'month':
        return startOfMonth(now);
      case 'all':
        return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // build Firestore query
        let q = firestoreQuery(
          collection(db, 'face_analytics'),
          orderBy('timestamp', 'desc')
        );

        const startDate = getStartDate(timeRange);
        if (startDate) {
          q = firestoreQuery(q, where('timestamp', '>=', startDate.toISOString()));
        }

        const snapshot = await getDocs(q);
        const result = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as AnalyticsData));
        setData(result);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // subscribe to realtime additions
    const baseQuery = firestoreQuery(
      collection(db, 'face_analytics'),
      orderBy('timestamp', 'desc')
    );
    const startDate = getStartDate(timeRange);
    const realtimeQuery = startDate
      ? firestoreQuery(baseQuery, where('timestamp', '>=', startDate.toISOString()))
      : baseQuery;

    const unsubscribe = onSnapshot(realtimeQuery, (snap) => {
      const additions = snap.docChanges()
        .filter(c => c.type === 'added')
        .map(c => ({ id: c.doc.id, ...c.doc.data() } as AnalyticsData));
      if (additions.length) {
        setData(prev => [...additions, ...prev]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [timeRange]);

  const stats = useMemo(() => {
    const total = data.length;
    
    // Emotion distribution
    const emotionCounts: Record<string, number> = {};
    data.forEach(d => {
      emotionCounts[d.emotion] = (emotionCounts[d.emotion] || 0) + 1;
    });

    // Age group distribution
    const ageGroupCounts: Record<string, number> = {};
    data.forEach(d => {
      ageGroupCounts[d.age_group] = (ageGroupCounts[d.age_group] || 0) + 1;
    });

    // Gender distribution
    const genderCounts: Record<string, number> = {};
    data.forEach(d => {
      genderCounts[d.gender] = (genderCounts[d.gender] || 0) + 1;
    });

    // Sentiment calculation (positive vs negative)
    const positiveEmotions = ['happy', 'surprised'];
    const negativeEmotions = ['sad', 'angry', 'fearful', 'disgusted'];
    
    const positive = data.filter(d => positiveEmotions.includes(d.emotion)).length;
    const negative = data.filter(d => negativeEmotions.includes(d.emotion)).length;
    const neutral = data.filter(d => d.emotion === 'neutral').length;
    
    const sentimentScore = total > 0 
      ? Math.round(((positive - negative) / total + 1) * 50) 
      : 50;

    // Hourly trend
    const hourlyData: Record<string, { positive: number; negative: number; neutral: number; total: number }> = {};
    data.forEach(d => {
      const hour = format(new Date(d.timestamp), 'HH:00');
      if (!hourlyData[hour]) {
        hourlyData[hour] = { positive: 0, negative: 0, neutral: 0, total: 0 };
      }
      hourlyData[hour].total++;
      if (positiveEmotions.includes(d.emotion)) {
        hourlyData[hour].positive++;
      } else if (negativeEmotions.includes(d.emotion)) {
        hourlyData[hour].negative++;
      } else {
        hourlyData[hour].neutral++;
      }
    });

    // Emotion by gender
    const emotionByGender: Record<string, Record<string, number>> = {};
    data.forEach(d => {
      if (!emotionByGender[d.gender]) {
        emotionByGender[d.gender] = {};
      }
      emotionByGender[d.gender][d.emotion] = (emotionByGender[d.gender][d.emotion] || 0) + 1;
    });

    // Peak unhappy times
    const unhappyByHour: Record<string, number> = {};
    data.forEach(d => {
      if (negativeEmotions.includes(d.emotion)) {
        const hour = format(new Date(d.timestamp), 'HH:00');
        unhappyByHour[hour] = (unhappyByHour[hour] || 0) + 1;
      }
    });

    const peakUnhappyHours = Object.entries(unhappyByHour)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour, count]) => ({ hour, count }));

    return {
      total,
      emotionCounts,
      ageGroupCounts,
      genderCounts,
      sentimentScore,
      positive,
      negative,
      neutral,
      hourlyData,
      emotionByGender,
      peakUnhappyHours,
    };
  }, [data]);

  return {
    data,
    stats,
    isLoading,
    error,
  };
}

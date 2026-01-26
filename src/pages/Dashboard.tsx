import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmotionPieChart } from '@/components/dashboard/EmotionPieChart';
import { SentimentTrendChart } from '@/components/dashboard/SentimentTrendChart';
import { AgeGroupChart } from '@/components/dashboard/AgeGroupChart';
import { GenderEmotionChart } from '@/components/dashboard/GenderEmotionChart';
import { UnhappyTimesCard } from '@/components/dashboard/UnhappyTimesCard';
import { SentimentGauge } from '@/components/dashboard/SentimentGauge';
import { TimeRangeSelector } from '@/components/dashboard/TimeRangeSelector';
import { useAnalytics, TimeRange } from '@/hooks/useAnalytics';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Smile, TrendingUp, Clock, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const { stats, isLoading, error } = useAnalytics(timeRange);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Card className="border-destructive">
            <CardContent className="py-8 text-center">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Customer sentiment and demographic insights
            </p>
          </div>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Analyzed"
            value={stats.total}
            subtitle="Faces detected"
            icon={Users}
          />
          <StatCard
            title="Positive Sentiment"
            value={`${stats.positive}`}
            subtitle={`${stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}% of total`}
            icon={Smile}
            iconClassName="bg-success/10 text-success"
          />
          <StatCard
            title="Sentiment Score"
            value={stats.sentimentScore}
            subtitle="Out of 100"
            icon={TrendingUp}
            iconClassName={
              stats.sentimentScore >= 60
                ? 'bg-success/10 text-success'
                : stats.sentimentScore >= 40
                ? 'bg-warning/10 text-warning'
                : 'bg-destructive/10 text-destructive'
            }
          />
          <StatCard
            title="Peak Hours"
            value={stats.peakUnhappyHours[0]?.hour || 'N/A'}
            subtitle="Most negative sentiment"
            icon={Clock}
            iconClassName="bg-warning/10 text-warning"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SentimentGauge
            score={stats.sentimentScore}
            positive={stats.positive}
            negative={stats.negative}
            neutral={stats.neutral}
          />
          <div className="lg:col-span-2">
            <EmotionPieChart emotionCounts={stats.emotionCounts} />
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentTrendChart hourlyData={stats.hourlyData} />
          <GenderEmotionChart emotionByGender={stats.emotionByGender} />
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgeGroupChart ageGroupCounts={stats.ageGroupCounts} />
          <UnhappyTimesCard peakUnhappyHours={stats.peakUnhappyHours} />
        </div>
      </main>
    </div>
  );
}

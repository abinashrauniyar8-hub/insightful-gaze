import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getEmotionEmoji } from '@/lib/faceApi';

interface GenderEmotionChartProps {
  emotionByGender: Record<string, Record<string, number>>;
}

const EMOTION_COLORS: Record<string, string> = {
  happy: '#facc15',
  sad: '#3b82f6',
  angry: '#ef4444',
  neutral: '#9ca3af',
  surprised: '#a855f7',
  fearful: '#8b5cf6',
  disgusted: '#22c55e',
};

export function GenderEmotionChart({ emotionByGender }: GenderEmotionChartProps) {
  // Get all unique emotions
  const allEmotions = new Set<string>();
  Object.values(emotionByGender).forEach((emotions) => {
    Object.keys(emotions).forEach((e) => allEmotions.add(e));
  });

  const data = Object.entries(emotionByGender).map(([gender, emotions]) => ({
    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
    ...emotions,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Emotions by Gender</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Emotions by Gender</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
              <XAxis
                type="number"
                stroke="hsl(215 20% 65%)"
                tick={{ fill: 'hsl(215 20% 65%)' }}
              />
              <YAxis
                dataKey="gender"
                type="category"
                stroke="hsl(215 20% 65%)"
                tick={{ fill: 'hsl(215 20% 65%)' }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 14%)',
                  border: '1px solid hsl(217 33% 22%)',
                  borderRadius: '8px',
                }}
                itemStyle={{ color: 'hsl(210 40% 98%)' }}
                labelStyle={{ color: 'hsl(210 40% 98%)' }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: 'hsl(210 40% 98%)' }}>
                    {getEmotionEmoji(value)} {value}
                  </span>
                )}
              />
              {Array.from(allEmotions).map((emotion) => (
                <Bar
                  key={emotion}
                  dataKey={emotion}
                  fill={EMOTION_COLORS[emotion] || '#888'}
                  stackId="a"
                  name={emotion}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

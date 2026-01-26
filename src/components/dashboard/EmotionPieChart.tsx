import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getEmotionEmoji } from '@/lib/faceApi';

interface EmotionPieChartProps {
  emotionCounts: Record<string, number>;
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

export function EmotionPieChart({ emotionCounts }: EmotionPieChartProps) {
  const data = Object.entries(emotionCounts).map(([emotion, count]) => ({
    name: `${getEmotionEmoji(emotion)} ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`,
    value: count,
    emotion,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Emotion Distribution</CardTitle>
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
        <CardTitle className="text-lg">Emotion Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={EMOTION_COLORS[entry.emotion] || '#888'}
                    className="transition-all hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 14%)',
                  border: '1px solid hsl(217 33% 22%)',
                  borderRadius: '8px',
                }}
                itemStyle={{ color: 'hsl(210 40% 98%)' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(210 40% 98%)' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SentimentTrendChartProps {
  hourlyData: Record<string, { positive: number; negative: number; neutral: number; total: number }>;
}

export function SentimentTrendChart({ hourlyData }: SentimentTrendChartProps) {
  const data = Object.entries(hourlyData)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([hour, values]) => ({
      hour,
      positive: values.positive,
      negative: values.negative,
      neutral: values.neutral,
      total: values.total,
    }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hourly Sentiment Trend</CardTitle>
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
        <CardTitle className="text-lg">Hourly Sentiment Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
              <XAxis
                dataKey="hour"
                stroke="hsl(215 20% 65%)"
                tick={{ fill: 'hsl(215 20% 65%)' }}
              />
              <YAxis
                stroke="hsl(215 20% 65%)"
                tick={{ fill: 'hsl(215 20% 65%)' }}
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
                  <span style={{ color: 'hsl(210 40% 98%)' }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 4 }}
                activeDot={{ r: 6 }}
                name="Positive"
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
                name="Negative"
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={{ fill: '#9ca3af', r: 4 }}
                activeDot={{ r: 6 }}
                name="Neutral"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

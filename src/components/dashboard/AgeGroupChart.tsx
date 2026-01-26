import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AgeGroupChartProps {
  ageGroupCounts: Record<string, number>;
}

const AGE_COLORS: Record<string, string> = {
  Child: '#22d3ee',
  Teen: '#a855f7',
  Adult: '#3b82f6',
  Senior: '#f59e0b',
};

const AGE_LABELS: Record<string, string> = {
  Child: '👶 Child (0-12)',
  Teen: '🧑 Teen (13-19)',
  Adult: '👨 Adult (20-59)',
  Senior: '👴 Senior (60+)',
};

export function AgeGroupChart({ ageGroupCounts }: AgeGroupChartProps) {
  const data = Object.entries(ageGroupCounts).map(([ageGroup, count]) => ({
    name: AGE_LABELS[ageGroup] || ageGroup,
    value: count,
    ageGroup,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Age Distribution</CardTitle>
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
        <CardTitle className="text-lg">Age Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={AGE_COLORS[entry.ageGroup] || '#888'}
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

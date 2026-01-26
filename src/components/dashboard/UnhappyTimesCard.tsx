import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock } from 'lucide-react';

interface UnhappyTimesCardProps {
  peakUnhappyHours: Array<{ hour: string; count: number }>;
}

export function UnhappyTimesCard({ peakUnhappyHours }: UnhappyTimesCardProps) {
  if (peakUnhappyHours.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Peak Unhappy Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No negative emotions recorded yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in border-warning/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Peak Unhappy Times
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {peakUnhappyHours.map(({ hour, count }, index) => (
            <div
              key={hour}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-lg font-bold ${
                    index === 0
                      ? 'text-destructive'
                      : index === 1
                      ? 'text-warning'
                      : 'text-muted-foreground'
                  }`}
                >
                  #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{hour}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-destructive">{count}</span>
                <span className="text-sm text-muted-foreground ml-1">negative</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Consider reviewing customer experience during these times
        </p>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SentimentGaugeProps {
  score: number;
  positive: number;
  negative: number;
  neutral: number;
}

export function SentimentGauge({ score, positive, negative, neutral }: SentimentGaugeProps) {
  const getScoreColor = (s: number) => {
    if (s >= 70) return 'text-success';
    if (s >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Neutral';
    if (s >= 20) return 'Concerning';
    return 'Critical';
  };

  const total = positive + negative + neutral;
  const positivePercent = total > 0 ? (positive / total) * 100 : 0;
  const neutralPercent = total > 0 ? (neutral / total) * 100 : 0;
  const negativePercent = total > 0 ? (negative / total) * 100 : 0;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Sentiment Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <span className={cn('text-6xl font-bold', getScoreColor(score))}>
            {score}
          </span>
          <p className={cn('text-lg font-medium mt-1', getScoreColor(score))}>
            {getScoreLabel(score)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-success">😊 Positive</span>
            <span className="font-medium">{positive} ({positivePercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">😐 Neutral</span>
            <span className="font-medium">{neutral} ({neutralPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-destructive">😔 Negative</span>
            <span className="font-medium">{negative} ({negativePercent.toFixed(1)}%)</span>
          </div>
        </div>

        <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
          <div
            className="bg-success transition-all"
            style={{ width: `${positivePercent}%` }}
          />
          <div
            className="bg-muted-foreground transition-all"
            style={{ width: `${neutralPercent}%` }}
          />
          <div
            className="bg-destructive transition-all"
            style={{ width: `${negativePercent}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

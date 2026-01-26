import { Button } from '@/components/ui/button';
import { TimeRange } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all', label: 'All Time' },
];

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={value === range.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(range.value)}
          className={cn(
            'transition-all',
            value === range.value && 'shadow-lg'
          )}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}

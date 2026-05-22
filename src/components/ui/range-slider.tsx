import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  step?: number;
  formatLabel?: (val: number) => string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatLabel,
  className,
}: RangeSliderProps) {
  const range = max - min || 1;
  const minPercent = ((value.min - min) / range) * 100;
  const maxPercent = ((value.max - min) / range) * 100;

  // Why: prevent the min thumb from crossing the max thumb and vice versa
  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), value.max - step);
      onChange({ min: newMin, max: value.max });
    },
    [value.max, onChange, step]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), value.min + step);
      onChange({ min: value.min, max: newMax });
    },
    [value.min, onChange, step]
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative flex h-5 items-center">
        {/* Track */}
        <div className="absolute h-1 w-full rounded-full bg-zinc-200" />
        {/* Active range */}
        <div
          className="absolute h-1 rounded-full bg-zinc-900"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          step={step}
          onChange={handleMinChange}
          className="range-thumb pointer-events-none absolute h-1 w-full appearance-none bg-transparent"
          aria-label="Minimum price"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          step={step}
          onChange={handleMaxChange}
          className="range-thumb pointer-events-none absolute h-1 w-full appearance-none bg-transparent"
          aria-label="Maximum price"
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-500">
        <span>{formatLabel ? formatLabel(value.min) : value.min}</span>
        <span>{formatLabel ? formatLabel(value.max) : value.max}</span>
      </div>
    </div>
  );
}

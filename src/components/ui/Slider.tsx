import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
  accent?: string;
  className?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  accent = "accent-text",
  className = "",
}: SliderProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 py-2 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
        <output htmlFor={id} className="text-lg font-semibold tabular-nums text-text">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-12 w-full cursor-pointer ${accent}`}
      />
    </div>
  );
}

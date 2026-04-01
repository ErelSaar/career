"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step01_Age({ value, onChange }: Props) {
  return (
    <StepWrapper stepNumber={1} title="How old are you?" hint="This helps calibrate realistic timelines and energy levels.">
      <input
        type="number"
        min={14}
        max={99}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 27"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-lg"
      />
    </StepWrapper>
  );
}

"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step02_Location({ value, onChange }: Props) {
  return (
    <StepWrapper stepNumber={2} title="Where are you based?" hint="City and country help factor in job market conditions.">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Berlin, Germany"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-lg"
      />
    </StepWrapper>
  );
}

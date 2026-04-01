"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step12_TargetRole({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={12}
      title="What role are you targeting?"
      hint="Optional — enables job fit scoring and a tailored candidacy assessment."
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Senior Product Manager, Head of Growth, UX Researcher..."
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-lg"
      />
      <p className="text-xs text-gray-600 mt-2">Leave blank to skip. You'll still get top career direction recommendations.</p>
    </StepWrapper>
  );
}

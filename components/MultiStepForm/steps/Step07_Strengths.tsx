"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step07_Strengths({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={7}
      title="What do people repeatedly ask for your help with?"
      hint="Think about things you consider 'obvious' or 'not a big deal' — that others find hard or impressive."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="People always ask me to explain technical things in simple terms. My friends come to me when they're stuck on a decision — I'm good at breaking problems down clearly..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step10_Dream({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={10}
      title="If everything worked out perfectly, what does your career look like in 10 years?"
      hint="No constraints. Dream freely. What are you doing, who for, and how does it feel?"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I'm running a small design studio — maybe 5 people. We work on meaningful projects for clients we actually respect. I have creative control and financial stability. I'm known for my craft..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step06_Motivators({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={6}
      title="If money and status didn't exist, what work would you still do — and why?"
      hint="Strip away the external rewards. What would you genuinely choose?"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I'd probably still build things — software, products, whatever. I like seeing something go from nothing to working. I also enjoy teaching people things they didn't know before..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

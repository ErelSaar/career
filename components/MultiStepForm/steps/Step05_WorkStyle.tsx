"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step05_WorkStyle({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={5}
      title="Describe your ideal workday in detail."
      hint="Where are you? Who's around? What are you doing? How do you feel at the end of it?"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I'd be working alone in a quiet space, solving complex problems with clear outcomes. No meetings before 10am. I'd feel mentally stimulated but not overwhelmed..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

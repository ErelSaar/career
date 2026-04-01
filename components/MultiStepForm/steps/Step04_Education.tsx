"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step04_Education({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={4}
      title="What's your educational background?"
      hint="Degree, field of study, certifications, or self-taught — whatever applies."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Bachelor's in Psychology, self-taught in web development, took online courses in data analysis..."
        rows={4}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

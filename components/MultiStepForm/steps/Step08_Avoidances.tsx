"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step08_Avoidances({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={8}
      title="What kind of work drains you completely?"
      hint="Tasks, environments, people, or dynamics that leave you exhausted or disengaged by 2pm."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Repetitive admin work kills me. I can't stand micromanagement or being watched constantly. Long pointless meetings drain my energy. I struggle with pure sales roles..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

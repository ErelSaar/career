"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step09_Constraints({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={9}
      title="What are your hard constraints right now?"
      hint="Income requirements, location, family, health, available time, visa/immigration, anything that limits your options."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="I need to earn at least $3,000/month within 6 months. I can't relocate — I have family here. I have about 10 hours a week to invest in learning or side projects..."
        rows={5}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition resize-none"
      />
    </StepWrapper>
  );
}

"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step13_JobDescription({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={13}
      title="Paste a job description"
      hint="Optional — unlocks a detailed match score, gap analysis, cover letter opener, and interview prep themes."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste a job posting or role description here..."
        rows={10}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-sm leading-relaxed resize-none"
      />
      <p className="text-xs text-gray-600 mt-2">Leave blank to skip. Works best when combined with a target role.</p>
    </StepWrapper>
  );
}

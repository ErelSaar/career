"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step11_Resume({ value, onChange }: Props) {
  return (
    <StepWrapper
      stepNumber={11}
      title="Paste your resume or CV"
      hint="Optional — but unlocks resume analysis, alignment scoring, and rewrite suggestions. Plain text works best."
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your full resume text here..."
        rows={10}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-sm leading-relaxed resize-none"
      />
      <p className="text-xs text-gray-600 mt-2">Leave blank to skip. This won't affect your career matches.</p>
    </StepWrapper>
  );
}

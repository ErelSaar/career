"use client";
import StepWrapper from "../StepWrapper";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const OPTIONS = [
  { id: "student", label: "Student", sub: "Still in school or university" },
  { id: "early", label: "Early Career", sub: "0–3 years of work experience" },
  { id: "mid", label: "Mid Career", sub: "3–10 years of experience" },
  { id: "senior", label: "Senior", sub: "10+ years of experience" },
  { id: "pivot", label: "Career Changer", sub: "Switching industries or roles" },
];

export default function Step03_Experience({ value, onChange }: Props) {
  return (
    <StepWrapper stepNumber={3} title="Where are you in your career?">
      <div className="grid grid-cols-1 gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
              value === o.id
                ? "border-violet-500 bg-violet-500/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
            }`}
          >
            <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${value === o.id ? "border-violet-400 bg-violet-400" : "border-gray-500"}`} />
            <div>
              <div className="font-medium">{o.label}</div>
              <div className="text-xs text-gray-400">{o.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </StepWrapper>
  );
}

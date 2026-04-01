"use client";

interface StepWrapperProps {
  stepNumber: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}

export default function StepWrapper({ stepNumber, title, hint, children }: StepWrapperProps) {
  return (
    <div className="animate-fade-in-up w-full">
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
        Question {stepNumber}
      </div>
      <h2 className="text-xl font-semibold text-white mb-1 leading-snug">{title}</h2>
      {hint && <p className="text-sm text-gray-400 mb-6">{hint}</p>}
      {!hint && <div className="mb-6" />}
      {children}
    </div>
  );
}

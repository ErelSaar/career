"use client";

import { useState } from "react";
import { FormData } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import Step01_Age from "./steps/Step01_Age";
import Step02_Location from "./steps/Step02_Location";
import Step03_Experience from "./steps/Step03_Experience";
import Step04_Education from "./steps/Step04_Education";
import Step05_WorkStyle from "./steps/Step05_WorkStyle";
import Step06_Motivators from "./steps/Step06_Motivators";
import Step07_Strengths from "./steps/Step07_Strengths";
import Step08_Avoidances from "./steps/Step08_Avoidances";
import Step09_Constraints from "./steps/Step09_Constraints";
import Step10_Dream from "./steps/Step10_Dream";
import Step11_Resume from "./steps/Step11_Resume";
import Step12_TargetRole from "./steps/Step12_TargetRole";
import Step13_JobDescription from "./steps/Step13_JobDescription";

const TOTAL_STEPS = 13;
const OPTIONAL_STEPS = new Set([11, 12, 13]);

const emptyForm: FormData = {
  age: "",
  location: "",
  experienceLevel: "",
  education: "",
  workStyle: "",
  motivators: "",
  strengths: "",
  avoidances: "",
  constraints: "",
  dream: "",
  resumeText: "",
  targetRole: "",
  jobDescription: "",
};

interface Props {
  onSubmit: (data: FormData) => void;
}

export default function MultiStepForm({ onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function isStepValid(): boolean {
    if (OPTIONAL_STEPS.has(step)) return true;
    switch (step) {
      case 1: return form.age.trim().length > 0;
      case 2: return form.location.trim().length > 0;
      case 3: return form.experienceLevel.trim().length > 0;
      case 4: return form.education.trim().length > 0;
      case 5: return form.workStyle.trim().length > 0;
      case 6: return form.motivators.trim().length > 0;
      case 7: return form.strengths.trim().length > 0;
      case 8: return form.avoidances.trim().length > 0;
      case 9: return form.constraints.trim().length > 0;
      case 10: return form.dream.trim().length > 0;
      default: return false;
    }
  }

  function next() {
    if (!isStepValid()) return;
    if (step === TOTAL_STEPS) {
      onSubmit(form);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  const isLast = step === TOTAL_STEPS;
  const isOptional = OPTIONAL_STEPS.has(step);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-8">
        <ProgressBar current={step} total={TOTAL_STEPS} />
      </div>

      {step >= 11 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 text-xs text-violet-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
            Optional inputs — skip freely
          </span>
        </div>
      )}

      <div className="min-h-[380px]">
        {step === 1 && <Step01_Age value={form.age} onChange={(v) => update("age", v)} />}
        {step === 2 && <Step02_Location value={form.location} onChange={(v) => update("location", v)} />}
        {step === 3 && <Step03_Experience value={form.experienceLevel} onChange={(v) => update("experienceLevel", v)} />}
        {step === 4 && <Step04_Education value={form.education} onChange={(v) => update("education", v)} />}
        {step === 5 && <Step05_WorkStyle value={form.workStyle} onChange={(v) => update("workStyle", v)} />}
        {step === 6 && <Step06_Motivators value={form.motivators} onChange={(v) => update("motivators", v)} />}
        {step === 7 && <Step07_Strengths value={form.strengths} onChange={(v) => update("strengths", v)} />}
        {step === 8 && <Step08_Avoidances value={form.avoidances} onChange={(v) => update("avoidances", v)} />}
        {step === 9 && <Step09_Constraints value={form.constraints} onChange={(v) => update("constraints", v)} />}
        {step === 10 && <Step10_Dream value={form.dream} onChange={(v) => update("dream", v)} />}
        {step === 11 && <Step11_Resume value={form.resumeText} onChange={(v) => update("resumeText", v)} />}
        {step === 12 && <Step12_TargetRole value={form.targetRole} onChange={(v) => update("targetRole", v)} />}
        {step === 13 && <Step13_JobDescription value={form.jobDescription} onChange={(v) => update("jobDescription", v)} />}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="px-5 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white disabled:opacity-0 transition"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!isStepValid()}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isStepValid()
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20"
              : "bg-white/5 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isLast ? "Analyze My Career →" : isOptional ? "Next →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

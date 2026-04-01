"use client";

import { useState } from "react";
import { FormData, CareerReport as ReportType } from "@/lib/types";
import MultiStepForm from "./MultiStepForm/MultiStepForm";
import CareerReport from "./CareerReport/CareerReport";

type AppState = "intro" | "form" | "loading" | "results" | "error";

const LOADING_MESSAGES = [
  "Extracting resume signals...",
  "Scoring alignment between evidence and self-perception...",
  "Identifying top career directions...",
  "Mapping skill and experience gaps...",
  "Writing resume improvements...",
  "Scoring job description match...",
  "Building your action plan...",
];

export default function CareerAdvisor() {
  const [state, setState] = useState<AppState>("intro");
  const [report, setReport] = useState<ReportType | null>(null);
  const [error, setError] = useState<string>("");
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  async function handleSubmit(data: FormData) {
    setState("loading");
    setLoadingMsgIdx(0);

    const interval = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);

    try {
      const res = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Something went wrong");
      }

      setReport(json);
      setState("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setState("error");
    } finally {
      clearInterval(interval);
    }
  }

  function reset() {
    setReport(null);
    setError("");
    setState("intro");
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
            AI
          </div>
          <span className="text-sm font-semibold text-white">Career Advisor</span>
        </div>
        {state !== "intro" && state !== "form" && (
          <button onClick={reset} className="text-xs text-gray-500 hover:text-white transition">
            ← Start over
          </button>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">

        {/* INTRO */}
        {state === "intro" && (
          <div className="max-w-lg text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs text-violet-300 font-medium mb-6">
              Powered by Claude AI
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Find your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                ideal career path
              </span>
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Answer 10 deep questions, optionally upload your resume and a target job description.
              Get a personalized career report with scored matches, alignment analysis, resume rewrites, and a concrete action plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400">
              {["10 questions", "Resume analysis", "Alignment scoring", "Resume rewrite", "Job match scoring", "Actionable roadmap"].map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
                  {f}
                </span>
              ))}
            </div>
            <button
              onClick={() => setState("form")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
            >
              Start My Career Analysis →
            </button>
          </div>
        )}

        {/* FORM */}
        {state === "form" && (
          <div className="w-full max-w-xl animate-fade-in-up">
            <MultiStepForm onSubmit={handleSubmit} />
          </div>
        )}

        {/* LOADING */}
        {state === "loading" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in-up">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/30" />
              <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
              <div className="absolute inset-3 rounded-full bg-violet-500/10" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium text-lg transition-all">{LOADING_MESSAGES[loadingMsgIdx]}</p>
              <p className="text-gray-500 text-sm mt-1">Deep analysis — may take up to 60 seconds</p>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {state === "results" && report && (
          <div className="w-full max-w-3xl">
            <CareerReport report={report} onReset={reset} />
          </div>
        )}

        {/* ERROR */}
        {state === "error" && (
          <div className="text-center max-w-md animate-fade-in-up">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-white font-semibold text-lg mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-6">{error}</p>
            <button
              onClick={() => setState("form")}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

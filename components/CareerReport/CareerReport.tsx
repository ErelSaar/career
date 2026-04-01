"use client";
import { CareerReport as ReportType } from "@/lib/types";
import CareerMatchCard from "./CareerMatchCard";

interface Props {
  report: ReportType;
  onReset: () => void;
}

export default function CareerReport({ report, onReset }: Props) {
  const {
    archetype,
    resume_extraction,
    alignment_analysis,
    career_matches,
    action_plan,
    resume_improvement,
    job_match,
    final_verdict,
  } = report;

  const hasResume = resume_extraction?.work_history?.length > 0;
  const hasJobMatch =
    job_match?.target_role ||
    (job_match?.jd_match_score != null && job_match.jd_match_score > 0);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 pb-20">

      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <div className="inline-block bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text text-3xl font-bold mb-2">
          Your Career Report
        </div>
        <p className="text-gray-400 text-sm">Evidence-grounded. Personally calibrated. Decision-ready.</p>
      </div>

      {/* Final Verdict — hero card */}
      {final_verdict && (
        <section className="animate-fade-in-up">
          <div className="bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent border border-violet-500/25 rounded-2xl p-6 space-y-4">
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">The Verdict</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <VerdictItem label="Best Near-Term Direction" value={final_verdict.best_near_term_direction} accent="text-emerald-400" />
              <VerdictItem label="Best Long-Term Direction" value={final_verdict.best_long_term_direction} accent="text-violet-400" />
              <VerdictItem label="Most Important Gap to Close" value={final_verdict.most_important_gap_to_close} accent="text-amber-400" />
              <VerdictItem label="Most Leveraged Next Move" value={final_verdict.most_leveraged_next_move} accent="text-sky-400" />
            </div>
          </div>
        </section>
      )}

      {/* Archetype */}
      {archetype && (
        <section className="animate-fade-in-up">
          <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/25 rounded-2xl p-6">
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">🧠 Your Archetype</div>
            <div className="text-2xl font-bold text-white mb-3">{archetype.name}</div>
            <p className="text-sm text-gray-300 leading-relaxed">{archetype.summary}</p>
          </div>
        </section>
      )}

      {/* Alignment Analysis — only if resume provided */}
      {hasResume && alignment_analysis && (
        <section>
          <SectionTitle icon="⚖️" title="Self-Perception vs. Evidence" />
          <div className="space-y-4">
            {/* Score + assessments */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Alignment Score</div>
                <AlignmentRing score={alignment_analysis.alignment_score} />
              </div>
              <div className="sm:col-span-2 space-y-3">
                {alignment_analysis.goal_credibility_assessment && (
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-1">Goal Credibility</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{alignment_analysis.goal_credibility_assessment}</p>
                  </div>
                )}
                {alignment_analysis.transition_timing_assessment && (
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">Transition Timing</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{alignment_analysis.transition_timing_assessment}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Insight grids */}
            <div className="grid sm:grid-cols-2 gap-4">
              {alignment_analysis.hidden_strengths?.length > 0 && (
                <InsightBox title="Hidden Strengths" items={alignment_analysis.hidden_strengths} accent="emerald" />
              )}
              {alignment_analysis.underestimated_strengths?.length > 0 && (
                <InsightBox title="You're Underselling" items={alignment_analysis.underestimated_strengths} accent="violet" />
              )}
              {alignment_analysis.overestimation_risks?.length > 0 && (
                <InsightBox title="Overestimation Risks" items={alignment_analysis.overestimation_risks} accent="amber" />
              )}
              {alignment_analysis.contradictions?.length > 0 && (
                <InsightBox title="Contradictions" items={alignment_analysis.contradictions} accent="red" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Resume Extraction — compact quality panel */}
      {hasResume && resume_extraction && (
        <section>
          <SectionTitle icon="📄" title="Resume Signal Analysis" />
          <div className="space-y-4">
            {/* Quality */}
            <div className="grid sm:grid-cols-4 gap-3">
              {Object.entries(resume_extraction.overall_resume_quality).map(([key, val]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {key.replace(/_/g, " ")}
                  </div>
                  <p className="text-xs text-gray-300 leading-snug">{val}</p>
                </div>
              ))}
            </div>

            {/* Signals */}
            <div className="grid sm:grid-cols-3 gap-3">
              {resume_extraction.hard_skills?.length > 0 && (
                <TagCloud label="Hard Skills" items={resume_extraction.hard_skills} color="sky" />
              )}
              {resume_extraction.soft_skills?.length > 0 && (
                <TagCloud label="Soft Skills" items={resume_extraction.soft_skills} color="teal" />
              )}
              {resume_extraction.tools_and_technologies?.length > 0 && (
                <TagCloud label="Tools & Tech" items={resume_extraction.tools_and_technologies} color="indigo" />
              )}
            </div>

            {/* Strength patterns */}
            {resume_extraction.repeated_strength_patterns?.length > 0 && (
              <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Repeated Strength Patterns</div>
                <BulletList items={resume_extraction.repeated_strength_patterns} accent="text-violet-500/50" />
              </div>
            )}

            {/* Evidence gaps */}
            {resume_extraction.evidence_gaps?.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Evidence Gaps</div>
                <BulletList items={resume_extraction.evidence_gaps} accent="text-amber-500/50" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Career Matches */}
      <section>
        <SectionTitle icon="🎯" title="Career Matches" />
        <div className="space-y-4">
          {career_matches?.map((m, i) => (
            <CareerMatchCard key={i} match={m} />
          ))}
        </div>
      </section>

      {/* Action Plan */}
      {action_plan && (
        <section>
          <SectionTitle icon="🚀" title="Action Plan" />
          <div className="grid sm:grid-cols-3 gap-4">
            <ActionColumn label="This Week" items={action_plan.this_week} accent="emerald" />
            <ActionColumn label="This Month" items={action_plan.this_month} accent="sky" />
            <ActionColumn label="Next 3–6 Months" items={action_plan.next_3_to_6_months} accent="violet" />
          </div>
        </section>
      )}

      {/* Resume Improvement */}
      {resume_improvement && (
        <section>
          <SectionTitle icon="✍️" title="Resume Rewrite" />
          <div className="space-y-4">

            {/* Positioning */}
            {(resume_improvement.positioning_problem || resume_improvement.rewrite_strategy) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {resume_improvement.positioning_problem && (
                  <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                    <div className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Current Positioning Problem</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{resume_improvement.positioning_problem}</p>
                  </div>
                )}
                {resume_improvement.rewrite_strategy && (
                  <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Rewrite Strategy</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{resume_improvement.rewrite_strategy}</p>
                  </div>
                )}
              </div>
            )}

            {/* Headline options */}
            {resume_improvement.headline_options?.length > 0 && (
              <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
                <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-3">Headline Options</div>
                <div className="space-y-2">
                  {resume_improvement.headline_options.map((h, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-violet-500/60 text-xs shrink-0 mt-0.5">{i + 1}.</span>
                      <p className="text-sm text-white font-medium">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {resume_improvement.professional_summary_rewrite && (
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-2">Rewritten Summary</div>
                <p className="text-sm text-gray-200 leading-relaxed italic">{resume_improvement.professional_summary_rewrite}</p>
              </div>
            )}

            {/* Improved bullets */}
            {resume_improvement.improved_bullet_points?.length > 0 && (
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-3">Improved Bullet Points</div>
                <ul className="space-y-2">
                  {resume_improvement.improved_bullet_points.map((b, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-teal-500/50 shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Issues + keywords */}
            <div className="grid sm:grid-cols-2 gap-4">
              {resume_improvement.key_resume_issues?.length > 0 && (
                <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
                  <div className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">Key Issues</div>
                  <BulletList items={resume_improvement.key_resume_issues} accent="text-orange-500/50" />
                </div>
              )}
              {resume_improvement.target_role_keywords_to_add?.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Keywords to Add</div>
                  <div className="flex flex-wrap gap-1.5">
                    {resume_improvement.target_role_keywords_to_add.map((kw, i) => (
                      <span key={i} className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-lg px-2 py-1">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Job Match */}
      {hasJobMatch && job_match && (
        <section>
          <SectionTitle icon="🔗" title={`Job Match${job_match.target_role ? ` — ${job_match.target_role}` : ""}`} />
          <div className="space-y-4">

            {/* Score + assessment */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">JD Match</div>
                <AlignmentRing score={job_match.jd_match_score} />
              </div>
              <div className="sm:col-span-2 space-y-3">
                {job_match.candidacy_assessment && (
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-1">Candidacy Assessment</div>
                    <p className="text-sm text-gray-300">{job_match.candidacy_assessment}</p>
                  </div>
                )}
                {job_match.tailored_pitch && (
                  <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl px-4 py-3">
                    <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-1">Your Pitch</div>
                    <p className="text-sm text-gray-300 italic">{job_match.tailored_pitch}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Matches */}
            <div className="grid sm:grid-cols-2 gap-4">
              {job_match.strongest_matches?.length > 0 && (
                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Strongest Matches</div>
                  <BulletList items={job_match.strongest_matches} accent="text-emerald-500/50" />
                </div>
              )}
              {job_match.weakest_matches?.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
                  <div className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Weakest Matches</div>
                  <BulletList items={job_match.weakest_matches} accent="text-red-500/50" />
                </div>
              )}
            </div>

            {/* Cover letter + interview prep */}
            {job_match.cover_letter_opening && (
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-2">Cover Letter Opening</div>
                <p className="text-sm text-gray-200 leading-relaxed italic">{job_match.cover_letter_opening}</p>
              </div>
            )}

            {job_match.interview_themes_to_prepare?.length > 0 && (
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Interview Themes to Prepare</div>
                <ul className="space-y-1.5">
                  {job_match.interview_themes_to_prepare.map((t, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-amber-500/50 shrink-0">{i + 1}.</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reset */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition"
        >
          ← Start Over
        </button>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function VerdictItem({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div>
      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${accent}`}>{label}</div>
      <p className="text-sm text-gray-200 leading-snug">{value}</p>
    </div>
  );
}

function AlignmentRing({ score }: { score: number }) {
  const color = score >= 70 ? "#34d399" : score >= 45 ? "#fbbf24" : "#9ca3af";
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" className="-rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={radius}
          fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute text-lg font-bold text-white">{score}%</span>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg">{icon}</span>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function InsightBox({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  const accentMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    violet: "text-violet-400 bg-violet-500/5 border-violet-500/20",
    amber: "text-amber-400 bg-amber-500/5 border-amber-500/20",
    red: "text-red-400 bg-red-500/5 border-red-500/20",
  };
  return (
    <div className={`border rounded-xl p-4 ${accentMap[accent]}`}>
      <div className="text-xs font-semibold uppercase tracking-wide mb-3">{title}</div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-300 flex gap-2">
            <span className="opacity-30 shrink-0">—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TagCloud({ label, items, color }: { label: string; items: string[]; color: string }) {
  const colorMap: Record<string, string> = {
    sky: "bg-sky-500/10 border border-sky-500/20 text-sky-300",
    teal: "bg-teal-500/10 border border-teal-500/20 text-teal-300",
    indigo: "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300",
    violet: "bg-violet-500/10 border border-violet-500/20 text-violet-300",
  };
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span key={i} className={`text-xs px-2 py-1 rounded-lg ${colorMap[color] ?? colorMap.sky}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-300 flex gap-2">
          <span className={`shrink-0 ${accent}`}>—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ActionColumn({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  const accentMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    sky: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    violet: "bg-violet-500/10 border-violet-500/30 text-violet-400",
  };
  return (
    <div className={`border rounded-xl p-4 ${accentMap[accent]}`}>
      <div className="text-xs font-bold uppercase tracking-wide mb-3">{label}</div>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className="text-sm text-gray-300 flex gap-2">
            <span className="opacity-40 shrink-0">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

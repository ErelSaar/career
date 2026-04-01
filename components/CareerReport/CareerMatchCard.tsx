"use client";
import { CareerMatch } from "@/lib/types";

interface Props {
  match: CareerMatch;
}

function scoreBg(score: number) {
  if (score >= 75) return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
  if (score >= 55) return "bg-amber-500/20 border-amber-500/30 text-amber-400";
  return "bg-gray-500/20 border-gray-500/30 text-gray-400";
}

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-400";
  if (score >= 55) return "text-amber-400";
  return "text-gray-400";
}

function TagList({ items, color }: { items: string[]; color: string }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span key={i} className={`text-xs px-2 py-1 rounded-lg border ${color}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  if (!items?.length) return null;
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

export default function CareerMatchCard({ match }: Props) {
  const isAspiational = match.why_it_ranks_here?.toLowerCase().includes("aspir");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-in-up space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-500 w-6 shrink-0">#{match.rank}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white">{match.role_name}</h3>
              {isAspiational && (
                <span className="text-xs bg-violet-500/15 border border-violet-500/30 text-violet-300 rounded-full px-2 py-0.5">
                  Aspirational
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{match.time_to_entry}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`border rounded-xl px-3 py-1.5 text-center ${scoreBg(match.match_score)}`}>
            <div className="text-xl font-bold">{match.match_score}</div>
            <div className="text-xs opacity-60">match</div>
          </div>
          <div className="border border-white/10 rounded-xl px-3 py-1.5 text-center bg-white/[0.03]">
            <div className={`text-xl font-bold ${scoreColor(match.confidence_score)}`}>{match.confidence_score}</div>
            <div className="text-xs text-gray-600">confidence</div>
          </div>
        </div>
      </div>

      {/* Why it ranks here */}
      {match.why_it_ranks_here && (
        <div className="bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">💡 Why #{match.rank}</div>
          <p className="text-sm text-gray-300">{match.why_it_ranks_here}</p>
        </div>
      )}

      {/* Why this role + Reality check */}
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Why it fits</div>
          <p className="text-gray-300 leading-relaxed">{match.why_this_role}</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
          <div className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">⚠ Reality Check</div>
          <p className="text-gray-300 leading-relaxed">{match.reality_check}</p>
        </div>
      </div>

      {/* Evidence */}
      {((match.evidence_from_resume?.length > 0) || (match.evidence_from_answers?.length > 0)) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {match.evidence_from_resume?.length > 0 && (
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <div className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-2">From Resume</div>
              <BulletList items={match.evidence_from_resume} accent="text-sky-500/60" />
            </div>
          )}
          {match.evidence_from_answers?.length > 0 && (
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">From Answers</div>
              <BulletList items={match.evidence_from_answers} accent="text-violet-500/60" />
            </div>
          )}
        </div>
      )}

      {/* Action intel */}
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        {match.first_step_this_week?.length > 0 && (
          <div className="border border-violet-500/20 bg-violet-500/5 rounded-xl p-3">
            <div className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">🚀 First Step This Week</div>
            <BulletList items={match.first_step_this_week} accent="text-violet-500/50" />
          </div>
        )}
        {match.fastest_path?.length > 0 && (
          <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-xl p-3">
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-2">⚡ Fastest Path</div>
            <BulletList items={match.fastest_path} accent="text-indigo-500/50" />
          </div>
        )}
      </div>

      {/* Your advantage */}
      {match.your_advantage && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">🔥 Your Advantage </span>
          <p className="text-sm text-gray-300 mt-1">{match.your_advantage}</p>
        </div>
      )}

      {/* What to avoid */}
      {match.what_to_avoid?.length > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3">
          <div className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">❌ What to Avoid</div>
          <BulletList items={match.what_to_avoid} accent="text-orange-500/50" />
        </div>
      )}

      {/* Gaps */}
      <div className="grid sm:grid-cols-2 gap-3">
        {match.skills_gap?.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills Gap</div>
            <TagList items={match.skills_gap} color="bg-white/5 border-white/10 text-gray-300" />
          </div>
        )}
        {match.experience_gap?.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Experience Gap</div>
            <TagList items={match.experience_gap} color="bg-white/5 border-white/10 text-gray-300" />
          </div>
        )}
      </div>

      {/* Projects / Experiments */}
      {match.recommended_projects_or_experiments?.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">🧪 Recommended Experiments</div>
          <BulletList items={match.recommended_projects_or_experiments} accent="text-teal-500/50" />
        </div>
      )}
    </div>
  );
}

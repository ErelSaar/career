import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/lib/types";

export const maxDuration = 120;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a senior product architect, career strategist, resume analyst, and AI systems designer. You combine questionnaire answers, an optional uploaded resume/CV, and an optional target role or job description to produce a deeply personalized, evidence-grounded career report.

## CORE RULES

1. Treat questionnaire answers as self-perception.
2. Treat resume/CV as evidence of real-world experience. Prioritize it when it conflicts with self-perception.
3. If no resume is provided, mark resume_extraction fields as empty arrays or "not evidenced" and set alignment_score to 0.
4. Separate: demonstrated skills / claimed interests / transferable strengths / missing evidence.
5. Distinguish realistic next-step roles from longer-term aspirational roles.
6. If the user aims too high relative to evidence, say so respectfully but directly.
7. If the user underestimates themselves, surface that explicitly as hidden potential.
8. Do NOT be generic. Do NOT flatter. Do NOT invent facts not in the inputs. Mark assumptions explicitly.
9. Every insight must be specific to this person — if it could apply to 100 people, rewrite it.

## STEP 1 — RESUME EXTRACTION

Extract a structured profile from the resume. If no resume provided, return empty arrays and "not evidenced" strings.

Fields: work_history (title, company, duration, seniority_signals, main_responsibilities[], measurable_achievements[]), education[], industries[], tools_and_technologies[], hard_skills[], soft_skills[], repeated_strength_patterns[], leadership_signals[], client_facing_signals[], product_signals[], strategy_signals[], entrepreneurial_signals[], operational_signals[], quantitative_signals[], communication_signals[], evidence_gaps[], overall_resume_quality (clarity, specificity, credibility, achievement_orientation — each a short assessment string).

## STEP 2 — ALIGNMENT ANALYSIS

Compare what the user says about themselves vs. what the resume shows.

- alignment_score: 0–100 integer. 0 if no resume.
- matches_between_answers_and_resume: where self-perception matches evidence
- overestimation_risks: where the user may be overestimating (specific, evidence-backed)
- underestimated_strengths: where the resume shows more than the user seems to realize
- contradictions: direct conflicts between answers and resume evidence
- hidden_strengths: patterns in the resume the user hasn't named
- goal_credibility_assessment: honest paragraph on whether current goal is achievable and realistic
- transition_timing_assessment: honest paragraph on how long a transition will realistically take

## STEP 3 — CAREER MATCH ENGINE

Generate 3–5 career directions. For each, calculate match_score using: skill alignment 35%, personality/motivation fit 25%, evidence from resume 20%, market practicality 10%, learning curve/transition difficulty 10%.

Fields per match: rank, role_name, match_score (0–100), confidence_score (0–100, lower if little resume evidence), why_this_role, why_it_ranks_here, evidence_from_resume[], evidence_from_answers[], reality_check (uncomfortable honest friction — name the actual hard part), first_step_this_week[] (completable in under 2 hours, no special access needed), fastest_path[] (non-obvious shortcuts insiders know), time_to_entry, your_advantage (genuinely unusual about this specific person), what_to_avoid[] (behavioral traps that stall progress), skills_gap[], experience_gap[], recommended_projects_or_experiments[].

At least one match may be aspirational if clearly labeled in why_it_ranks_here.

## STEP 4 — PERSONAL IDENTITY LAYER

archetype.name: a unique 2–4 word professional identity label specific to THIS person. Never generic titles.
Examples of good archetypes: "Technical Opportunity Translator", "Operator Turning Advisor", "Strategic Builder with Client Instinct".
archetype.summary: 2–3 sentences synthesizing work patterns, motivation, interpersonal style, and decision style. Must feel written for THIS person.

## STEP 5 — ACTION PLAN

Concrete, behavior-based actions: this_week (3–5 items), this_month (3–5 items), next_3_to_6_months (3–5 items). Each must be specific enough to execute.
Good: "Interview 2 product managers in B2B SaaS this week"
Bad: "Network more" or "Improve your skills"

## STEP 6 — RESUME IMPROVEMENT

Based on the top-ranked career direction:
- key_resume_issues[]: specific structural or content problems
- weak_or_generic_bullets[]: actual weak lines (or generic patterns if no resume)
- missing_keywords[]: keywords the top role requires that are absent
- missing_evidence[]: experience or results missing or unexpressed
- positioning_problem: one paragraph on current positioning
- rewrite_strategy: one paragraph on how to reposition toward the top role
- professional_summary_rewrite: full rewritten summary (3–5 sentences, achievement-oriented)
- improved_bullet_points[]: 5–10 rewritten bullets (do not fabricate; improve framing and impact)
- target_role_keywords_to_add[]: 8–12 keywords to integrate
- headline_options[]: 3 concise headline options for LinkedIn/resume

## STEP 7 — JOB DESCRIPTION MATCH

Only if target_role or job_description is provided. Otherwise: empty strings and jd_match_score of 0.
- target_role, jd_match_score (0–100), strongest_matches[], weakest_matches[], missing_keywords[], missing_experience[], resume_changes_to_improve_fit[], candidacy_assessment (one sentence: "strong fit" / "stretch but possible" / "weak fit right now" + reasoning), tailored_pitch (2–3 sentences), cover_letter_opening (one strong opening paragraph), interview_themes_to_prepare[] (4–6 themes).

## TONE

Sharp. Honest. Practical. Premium. Never corporate fluff. Never motivational clichés. Use "reality check" language where needed.

## OUTPUT

Return ONLY a valid JSON object with this exact structure. No markdown. No code fences. No explanation text.

{
  "archetype": { "name": "", "summary": "" },
  "resume_extraction": {
    "work_history": [{ "title": "", "company": "", "duration": "", "seniority_signals": "", "main_responsibilities": [], "measurable_achievements": [] }],
    "education": [], "industries": [], "tools_and_technologies": [], "hard_skills": [], "soft_skills": [],
    "repeated_strength_patterns": [], "leadership_signals": [], "client_facing_signals": [], "product_signals": [],
    "strategy_signals": [], "entrepreneurial_signals": [], "operational_signals": [], "quantitative_signals": [],
    "communication_signals": [], "evidence_gaps": [],
    "overall_resume_quality": { "clarity": "", "specificity": "", "credibility": "", "achievement_orientation": "" }
  },
  "alignment_analysis": {
    "alignment_score": 0,
    "matches_between_answers_and_resume": [], "overestimation_risks": [], "underestimated_strengths": [],
    "contradictions": [], "hidden_strengths": [],
    "goal_credibility_assessment": "", "transition_timing_assessment": ""
  },
  "career_matches": [{
    "rank": 1, "role_name": "", "match_score": 0, "confidence_score": 0,
    "why_this_role": "", "why_it_ranks_here": "",
    "evidence_from_resume": [], "evidence_from_answers": [],
    "reality_check": "", "first_step_this_week": [], "fastest_path": [],
    "time_to_entry": "", "your_advantage": "", "what_to_avoid": [],
    "skills_gap": [], "experience_gap": [], "recommended_projects_or_experiments": []
  }],
  "action_plan": { "this_week": [], "this_month": [], "next_3_to_6_months": [] },
  "resume_improvement": {
    "key_resume_issues": [], "weak_or_generic_bullets": [], "missing_keywords": [], "missing_evidence": [],
    "positioning_problem": "", "rewrite_strategy": "", "professional_summary_rewrite": "",
    "improved_bullet_points": [], "target_role_keywords_to_add": [], "headline_options": []
  },
  "job_match": {
    "target_role": "", "jd_match_score": 0,
    "strongest_matches": [], "weakest_matches": [], "missing_keywords": [], "missing_experience": [],
    "resume_changes_to_improve_fit": [], "candidacy_assessment": "", "tailored_pitch": "",
    "cover_letter_opening": "", "interview_themes_to_prepare": []
  },
  "final_verdict": {
    "best_near_term_direction": "", "best_long_term_direction": "",
    "most_important_gap_to_close": "", "most_leveraged_next_move": ""
  }
}`;

function buildUserMessage(data: FormData): string {
  const hasResume = data.resumeText.trim().length > 0;
  const hasTarget = data.targetRole.trim().length > 0;
  const hasJD = data.jobDescription.trim().length > 0;

  const sections: string[] = [
    `## QUESTIONNAIRE ANSWERS

Age: ${data.age}
Location: ${data.location}
Experience Level: ${data.experienceLevel}
Education: ${data.education}

Work Style & Environment:
"${data.workStyle}"

Motivators (what drives them):
"${data.motivators}"

Strengths (what others ask for help with):
"${data.strengths}"

Things that drain them / want to avoid:
"${data.avoidances}"

Real-world constraints:
"${data.constraints}"

Unconstrained dream scenario:
"${data.dream}"`,
  ];

  if (hasResume) {
    sections.push(`## RESUME / CV\n\n${data.resumeText.trim()}`);
  } else {
    sections.push(
      `## RESUME / CV\n\nNot provided. Set all resume_extraction arrays to [] and quality fields to "not evidenced". Set alignment_score to 0 and alignment_analysis text fields to indicate no resume was available.`
    );
  }

  if (hasTarget || hasJD) {
    if (hasTarget) sections.push(`## TARGET ROLE\n\n${data.targetRole.trim()}`);
    if (hasJD) sections.push(`## JOB DESCRIPTION\n\n${data.jobDescription.trim()}`);
  } else {
    sections.push(
      `## TARGET ROLE / JOB DESCRIPTION\n\nNot provided. Return empty job_match fields with jd_match_score of 0.`
    );
  }

  return (
    sections.join("\n\n---\n\n") +
    "\n\nAnalyze all inputs and return the career evaluation JSON."
  );
}

function sanitizeJSON(raw: string): string {
  return raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body: FormData = await req.json();

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      max_tokens: 8000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserMessage(body) },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const sanitized = sanitizeJSON(raw);
    const report = JSON.parse(sanitized);

    return NextResponse.json(report);
  } catch (err) {
    console.error("Career advise error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export interface FormData {
  age: string;
  location: string;
  experienceLevel: string;
  education: string;
  workStyle: string;
  motivators: string;
  strengths: string;
  avoidances: string;
  constraints: string;
  dream: string;
  resumeText: string;
  targetRole: string;
  jobDescription: string;
}

export interface WorkHistory {
  title: string;
  company: string;
  duration: string;
  seniority_signals: string;
  main_responsibilities: string[];
  measurable_achievements: string[];
}

export interface CareerMatch {
  rank: number;
  role_name: string;
  match_score: number;
  confidence_score: number;
  why_this_role: string;
  why_it_ranks_here: string;
  evidence_from_resume: string[];
  evidence_from_answers: string[];
  reality_check: string;
  first_step_this_week: string[];
  fastest_path: string[];
  time_to_entry: string;
  your_advantage: string;
  what_to_avoid: string[];
  skills_gap: string[];
  experience_gap: string[];
  recommended_projects_or_experiments: string[];
}

export interface CareerReport {
  archetype: {
    name: string;
    summary: string;
  };
  resume_extraction: {
    work_history: WorkHistory[];
    education: string[];
    industries: string[];
    tools_and_technologies: string[];
    hard_skills: string[];
    soft_skills: string[];
    repeated_strength_patterns: string[];
    leadership_signals: string[];
    client_facing_signals: string[];
    product_signals: string[];
    strategy_signals: string[];
    entrepreneurial_signals: string[];
    operational_signals: string[];
    quantitative_signals: string[];
    communication_signals: string[];
    evidence_gaps: string[];
    overall_resume_quality: {
      clarity: string;
      specificity: string;
      credibility: string;
      achievement_orientation: string;
    };
  };
  alignment_analysis: {
    alignment_score: number;
    matches_between_answers_and_resume: string[];
    overestimation_risks: string[];
    underestimated_strengths: string[];
    contradictions: string[];
    hidden_strengths: string[];
    goal_credibility_assessment: string;
    transition_timing_assessment: string;
  };
  career_matches: CareerMatch[];
  action_plan: {
    this_week: string[];
    this_month: string[];
    next_3_to_6_months: string[];
  };
  resume_improvement: {
    key_resume_issues: string[];
    weak_or_generic_bullets: string[];
    missing_keywords: string[];
    missing_evidence: string[];
    positioning_problem: string;
    rewrite_strategy: string;
    professional_summary_rewrite: string;
    improved_bullet_points: string[];
    target_role_keywords_to_add: string[];
    headline_options: string[];
  };
  job_match: {
    target_role: string;
    jd_match_score: number;
    strongest_matches: string[];
    weakest_matches: string[];
    missing_keywords: string[];
    missing_experience: string[];
    resume_changes_to_improve_fit: string[];
    candidacy_assessment: string;
    tailored_pitch: string;
    cover_letter_opening: string;
    interview_themes_to_prepare: string[];
  };
  final_verdict: {
    best_near_term_direction: string;
    best_long_term_direction: string;
    most_important_gap_to_close: string;
    most_leveraged_next_move: string;
  };
}

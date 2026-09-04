export type SkillVerificationStatus = 'CLAIMED' | 'DEMONSTRATED' | 'VERIFIED';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  education: string;
  degree: string;
  department: string;
  graduationYear: string;
  experienceLevel: 'Student' | 'Fresher (0-1 yrs)' | 'Junior (1-2 yrs)';
  targetJobRole: string;
  targetCompanies: string[];
  preferredTechnologies: string[];
  careerGoal: string;
  availableStudyHoursPerWeek: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Core CS' | 'Frameworks' | 'Databases' | 'DevOps & Tools' | 'Problem Solving';
  status: SkillVerificationStatus;
  currentEstimatedLevel: number; // 1 to 5
  requiredLevel: number; // 1 to 5
  gap: number; // required - current (clamped >= 0)
  priority: PriorityLevel;
  whyItMatters: string;
  recommendedPractice: string;
  recommendedProject: string;
  recommendedAssessment: string;
  verifiedScore?: number;
  verifiedDate?: string;
  sources: ('Resume' | 'GitHub' | 'SkillProof' | 'Interview' | 'JobSimulation')[];
}

export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  sectionScores: {
    structure: number;
    skills: number;
    experience: number;
    projects: number;
    education: number;
  };
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
  matchingSkills: string[];
  missingSkills: string[];
  targetJobTitle?: string;
  targetJobDesc?: string;
  lastAnalyzedDate: string;
  fileName?: string;
}

export interface JobPosting {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Remote';
  experienceReq: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  fitScore: number;
  matchTier: 'Strong Match' | 'Moderate Match' | 'Low Match';
  matchReason: string;
  matchingSkills: string[];
  missingSkills: string[];
  projectRelevanceScore: number;
  resumeRelevanceScore: number;
  interviewReadinessScore: number;
}

export interface RoadmapTask {
  id: string;
  week: number;
  month: number;
  phase: string;
  title: string;
  category: 'Topics' | 'Coding practice' | 'Projects' | 'Assessments' | 'Revision' | 'Interview preparation' | 'Retesting';
  estimatedHours: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  skillTag: string;
  description: string;
  actionRoute?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  repoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced';
  complexityScore?: number;
  score?: number;
  skillsDemonstrated: string[];
  resumeBulletPoints?: string[];
  resumeBullets?: string[];
  technicalInterviewQuestions?: string[];
  interviewQuestions?: string[];
  projectDefenseQuestions?: string[];
  defenseQuestions?: string[];
  improvementSuggestions?: string[];
  missingFeatures?: string[];
  qualityScore?: number;
  completenessScore?: number;
  documentationScore?: number;
  architectureQualityScore?: number;
}

export interface GitHubData {
  username: string;
  connected: boolean;
  avatarUrl: string;
  publicRepos: number;
  publicReposCount?: number;
  topLanguages: { name: string; percentage: number; color?: string }[];
  totalCommitsLastYear: number;
  totalCommitsThisYear?: number;
  consistencyStreakDays: number;
  consistencyStreak?: string;
  repoQualityScore: number;
  repositoryQualityScore?: number;
  verifiedEvidenceSkills: string[];
  evidenceFound?: { skill: string; proof: string; confidence: string; repo: string }[];
  recentRepos: {
    name: string;
    stars: number;
    language: string;
    description: string;
    lastPushed: string;
    hasReadme: boolean;
  }[];
  repos?: {
    name: string;
    stars: number;
    forks: number;
    language: string;
    description: string;
    qualityScore: number;
    commitCount: number;
  }[];
}

export type GitHubProfileData = any;

export interface MCQQuestion {

  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface CodingQuestion {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  language: string;
  solutionHint: string;
  testCases: { input: string; expectedOutput: string }[];
}

export interface SkillProofAssessment {
  id: string;
  title: string;
  category: 'Programming' | 'Python' | 'Java' | 'C' | 'DSA' | 'SQL' | 'DBMS' | 'OOP' | 'Computer Networks' | 'Operating Systems' | 'Web Development';
  type: 'MCQ' | 'Coding' | 'Practical' | 'Role-specific';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionCount: number;
  durationMinutes: number;
  completed: boolean;
  score?: number;
  accuracy?: number;
  timeSpentMinutes?: number;
  topicBreakdown?: { topic: string; score: number }[];
  strengths?: string[];
  weaknesses?: string[];
  awardedSkillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  lastAttemptedDate?: string;
  mcqQuestions?: MCQQuestion[];
  codingQuestion?: CodingQuestion;
}

export interface MockInterviewQuestion {
  id: number;
  question: string;
  category?: string;
  expectedKeyPoints: string[];
  candidateAnswer?: string;
  followUpQuestion?: string;
  candidateFollowUpAnswer?: string;
  feedback?: string;
  rating?: number; // 1-10
}

export interface MockInterviewSession {
  id: string;
  date: string;
  role: string;
  type?: string;
  interviewType?: string;
  companyStyle?: string;
  questionCount?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  mode?: 'Text' | 'Voice';
  questions?: MockInterviewQuestion[];
  overallScore?: number;
  categoryScores?: Record<string, number>;
  strongAnswers?: string[];
  weakAnswers?: string[];
  missingPoints?: string[];
  betterApproach?: string;
  topicsToPractice?: string[];
  roadmapUpdates?: string[];
  readinessVerdict?: string;
  completed?: boolean;
}

export interface JobSimulationTask {
  id: string;
  role?: string;
  roleTrack?: string;
  title: string;
  difficulty?: 'Junior' | 'Mid-Level';
  scenario?: string;
  scenarioDescription?: string;
  objective?: string;
  files?: { name: string; content: string; language: string }[];
  instructions?: string[];
  deliverables?: string[];
  starterCode: string;
  testRunner?: {
    description: string;
    expectedResult: string;
  };
  completed: boolean;
  score?: number;
  evaluation?: {
    correctness: number;
    problemSolving: number;
    codeQuality: number;
    timeManagement: number;
    feedback: string;
  };
}

export type JobSimulationScenario = any;


export interface ApplicationRecord {
  id: string;
  company: string;
  jobRole: string;
  jobDescription: string;
  applicationDate: string;
  resumeVersion: string;
  jobFitScore: number;
  currentStage: 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Selected' | 'Rejected' | 'Withdrawn';
  stageHistory: ('Applied' | 'Assessment' | 'Technical Round 1' | 'Technical Round 2' | 'HR Round' | 'Offer')[];
  interviewStage?: 'Resume Screen' | 'Online Assessment' | 'Technical Round 1' | 'Technical Round 2' | 'HR Round';
  outcome: 'Pending' | 'Selected' | 'Rejected' | 'Withdrawn';
  rejectionReason?: string;
  recruiterFeedback?: string;
  interviewFeedback?: string;
  knownReason?: string;
  skillGapsAtTime: string[];
  assessmentScoreAtTime?: number;
  interviewScoreAtTime?: number;
  notes?: string;
}

export interface CareerReplayReport {
  analyzedApplicationsCount: number;
  detectedPattern: string;
  confidence: 'Evidence-supported' | 'Likely' | 'Insufficient evidence';
  rootCauseAnalysis: string;
  repeatedFailurePoints: string[];
  stageDropoffs: { stage: string; dropCount: number }[];
  actionablePlan: string[];
  recommendedSkillProofTest: string;
  recommendedMockInterview: string;
  previousPerformance: {
    stage: string;
    failureNote: string;
    interviewScore: number;
  };
  currentPerformance?: {
    retestedDate: string;
    newInterviewScore: number;
    scoreDelta: number;
    retestStatus: 'Improved' | 'Pending Retest';
    validationNote: string;
  };
}

export interface CareerReadinessScore {
  overall: number; // 0-100
  resume: number;
  jobFit: number;
  skills: number;
  projects: number;
  skillProof: number;
  interview: number;
  jobSimulation: number;
  biggestImprovementOpportunity: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'success' | 'info';
  timestamp: string;
  actionTab?: string;
  actionLabel?: string;
  read: boolean;
}

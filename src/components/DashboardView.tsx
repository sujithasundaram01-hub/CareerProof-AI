import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Award,
  Video,
  FileText,
  Briefcase,
  GitPullRequest,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target
} from 'lucide-react';
import {
  UserProfile,
  CareerReadinessScore,
  SkillItem,
  ResumeAnalysis,
  RoadmapTask,
  MockInterviewSession,
  SkillProofAssessment,
  ApplicationRecord,
  CareerReplayReport
} from '../types';

interface DashboardViewProps {
  user: UserProfile;
  readiness: CareerReadinessScore;
  skills: SkillItem[];
  resume: ResumeAnalysis;
  roadmap: RoadmapTask[];
  mockInterviews: MockInterviewSession[];
  assessments: SkillProofAssessment[];
  applications: ApplicationRecord[];
  careerReplay: CareerReplayReport;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  readiness,
  skills = [],
  roadmap = [],
  mockInterviews = [],
  assessments = [],
  applications = [],
  careerReplay,
  onNavigate,
}) => {
  const completedTasks = (roadmap || []).filter((t) => t.status === 'Completed').length;
  const roadmapProgress = Math.round((completedTasks / (roadmap?.length || 1)) * 100);

  const criticalGaps = (skills || []).filter((s) => s.priority === 'Critical' || s.priority === 'High');
  const recentInterview = mockInterviews?.[0];
  const recentAssessment = (assessments || []).find((a) => a.completed);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Sleek 4-Column Top Metric Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Readiness */}
        <div 
          onClick={() => onNavigate('Profile')}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-all"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Readiness</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900">{readiness?.overall ?? 74}%</span>
            <span className="text-emerald-500 text-xs font-bold pb-1">+4%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${readiness?.overall ?? 74}%` }}></div>
          </div>
        </div>

        {/* Metric 2: Resume Score */}
        <div 
          onClick={() => onNavigate('Resume')}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-all"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Resume Score</p>
          <span className="text-3xl font-black text-slate-900">{readiness?.resume ?? 81}</span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-600 font-bold">
            <span className="px-1.5 py-0.5 bg-emerald-50 rounded">ATS READY</span>
          </div>
        </div>

        {/* Metric 3: Skill Score */}
        <div 
          onClick={() => onNavigate('Skill Gap')}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-all"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Skill Score</p>
          <span className="text-3xl font-black text-slate-900">{readiness?.skills ?? 68}</span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-amber-600 font-bold">
            <span className="px-1.5 py-0.5 bg-amber-50 rounded">GAPS DETECTED</span>
          </div>
        </div>

        {/* Metric 4: Fit Score */}
        <div 
          onClick={() => onNavigate('Jobs')}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-all"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Fit Score</p>
          <span className="text-3xl font-black text-slate-900">{readiness?.jobFit ?? 84}%</span>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-blue-600 font-bold">
            <span className="px-1.5 py-0.5 bg-blue-50 rounded">STRONG MATCH</span>
          </div>
        </div>
      </div>

      {/* 2. Sleek Gradient Banner: Career Replay Intelligence */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 lg:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Career Replay Intelligence</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
              {careerReplay?.confidence || 'High Confidence'}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Repeated Failure Pattern Detected</h2>
          <p className="text-blue-100 text-sm max-w-2xl mb-6 leading-relaxed">
            The AI has analyzed your last {careerReplay?.analyzedApplicationsCount || applications?.length || 4} applications. While your fundamentals are strong, you consistently struggle with <span className="font-bold underline decoration-white/40">DSA follow-up complexity questions</span> during Technical Round 1 interviews.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onNavigate('SkillProof')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Retake SkillProof DSA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => onNavigate('Career Replay')}
              className="bg-blue-500/30 hover:bg-blue-500/40 backdrop-blur text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-xs transition-all"
            >
              View Journey Map
            </button>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 3. Main 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Applications Table & Mock Interview Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {/* Applications Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">Recent Applications & Stages</h3>
              <button 
                onClick={() => onNavigate('Applications')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                View All Tracking &rarr;
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Company</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Status</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Fit Score</th>
                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase">Outcome / Diagnosis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                            {app.company.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{app.company}</p>
                            <p className="text-[10px] text-slate-400">{app.jobRole}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          app.currentStage === 'Rejected'
                            ? 'bg-slate-100 text-slate-500'
                            : app.currentStage === 'Interview'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {app.currentStage}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs font-bold text-slate-700">{app.jobFitScore}%</td>
                      <td className="px-5 py-4">
                        {app.currentStage === 'Rejected' ? (
                          <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {app.rejectionReason?.includes('DSA') ? 'DSA Follow-up Drop-off' : 'Skill Gap'}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium italic">In Progress...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Highlights: Mock Interview & SkillProof in Sleek Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mock Interview Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-xs text-slate-800">Latest Mock Drill</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                    {recentInterview?.companyStyle || 'FAANG'} Format
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-slate-500 text-xs">Interview Score</span>
                  <span className="text-xl font-black text-slate-900">{recentInterview ? `${recentInterview.overallScore}%` : '82%'}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{recentInterview?.weakAnswers?.[0] || 'Technical depth verified, live complexity verbalization improved.'}"
                </p>
              </div>
              <button
                onClick={() => onNavigate('Mock Interview')}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Launch Mock Session &rarr;
              </button>
            </div>

            {/* SkillProof Verified Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-xs text-slate-800">SkillProof Assessment</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    Verified
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-slate-500 text-xs">{recentAssessment?.title || 'Data Structures & Algorithms'}</span>
                  <span className="text-xl font-black text-emerald-600">{recentAssessment ? `${recentAssessment.score}%` : '78%'}</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Awarded: Level {recentAssessment?.awardedSkillLevel ?? '3'} badge</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('SkillProof')}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Browse Assessments &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Skill Gap, Next Best Action, GitHub Evidence */}
        <div className="lg:col-span-4 space-y-6">
          {/* Skill Gap Analysis */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Skill Gap Analysis</h3>
              <button 
                onClick={() => onNavigate('Skill Gap')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Inspect
              </button>
            </div>
            <div className="space-y-4">
              <div className="group">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">DSA & Algorithms</span>
                  <span className="text-rose-500">CRITICAL GAP</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">SQL & Query Tuning</span>
                  <span className="text-amber-500">MEDIUM GAP</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Java Spring Boot</span>
                  <span className="text-emerald-500">PROVEN</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Best Action Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Next Best Action</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl space-y-3">
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                Your roadmap requires completing the live DSA follow-up drill to unlock Tier-1 company mock rounds.
              </p>
              <button 
                onClick={() => onNavigate('SkillProof')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold shadow-sm transition-colors"
              >
                Start Simulation Now
              </button>
            </div>
          </div>

          {/* Sleek Dark GitHub Evidence Card */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full"></div>
              <h3 className="text-sm font-bold">GitHub Evidence</h3>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4">Latest Commit Insights</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0"></div>
                <p className="text-xs text-slate-300 truncate">Optimized SQL query joins in /FinTrack-API</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0"></div>
                <p className="text-xs text-slate-300 truncate">Implemented Redis cache locks (Verified)</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-[11px] text-slate-400">
                  Proven Skills: <span className="text-emerald-400 font-semibold">Java, Redis, Docker, SQL</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

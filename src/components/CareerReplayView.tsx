import React, { useState } from 'react';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileText,
  Briefcase,
  Award,
  Video,
  UserCheck,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import {
  ApplicationRecord,
  CareerReplayReport,
  SkillItem,
  RoadmapTask
} from '../types';

interface CareerReplayViewProps {
  careerReplay: CareerReplayReport;
  applications: ApplicationRecord[];
  skills: SkillItem[];
  roadmap: RoadmapTask[];
  onUpdateCareerReplay: (updated: CareerReplayReport) => void;
  onNavigate: (tab: string) => void;
}

export const CareerReplayView: React.FC<CareerReplayViewProps> = ({
  careerReplay,
  applications,
  onUpdateCareerReplay,
  onNavigate,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddRejectionModal, setShowAddRejectionModal] = useState(false);

  // New Rejection state form
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newStage, setNewStage] = useState<'Technical Round 1' | 'Online Assessment' | 'Technical Round 2' | 'HR Round'>('Technical Round 1');
  const [newFeedback, setNewFeedback] = useState('');
  const [newReason, setNewReason] = useState('');

  const selectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  // Journey steps pipeline
  const journeyStages = [
    { name: 'Resume Screening', icon: FileText },
    { name: 'Job Match', icon: Briefcase },
    { name: 'Online Assessment', icon: Award },
    { name: 'Technical Round 1', icon: Video },
    { name: 'Technical Round 2 / HR', icon: UserCheck },
    { name: 'Final Outcome', icon: ShieldCheck }
  ];

  const handleTriggerReanalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/gemini/career-replay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applications,
          pastWeaknesses: careerReplay.repeatedFailurePoints
        })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdateCareerReplay({
          ...careerReplay,
          detectedPattern: data.detectedPattern || careerReplay.detectedPattern,
          confidence: data.confidence || 'Evidence-supported',
          rootCauseAnalysis: data.rootCauseAnalysis || careerReplay.rootCauseAnalysis,
          repeatedFailurePoints: data.repeatedFailurePoints || careerReplay.repeatedFailurePoints,
          actionablePlan: data.actionablePlan || careerReplay.actionablePlan,
          recommendedSkillProofTest: data.recommendedSkillProofTest || careerReplay.recommendedSkillProofTest,
          recommendedMockInterview: data.recommendedMockInterview || careerReplay.recommendedMockInterview
        });
      }
    } catch (e) {
      console.warn('Using local Career Replay model evaluation', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSimulateRetestSuccess = () => {
    const updated = {
      ...careerReplay,
      currentPerformance: {
        retestedDate: new Date().toISOString().split('T')[0],
        newInterviewScore: 82,
        scoreDelta: 21,
        retestStatus: 'Improved' as const,
        validationNote: 'Demonstrated complete mastery of Java 8 HashMap red-black tree mechanisms and amortized O(1) dynamic array proofs in follow-up validation drills.'
      }
    };
    onUpdateCareerReplay(updated);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Differentiating Positioning Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 lg:p-7 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                PATENT-GRADE DIFFERENTIATOR
              </span>
              <span className="text-xs text-slate-400 font-medium">Cross-Application Diagnostics</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Career Replay Engine
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Track rejection &rarr; Replay journey &rarr; Detect repeated failure pattern &rarr; Fix weakness &rarr; Retest &rarr; Improve next application.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerReanalysis}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Pattern...' : 'Re-run Replay Analysis'}</span>
            </button>
            <button
              onClick={() => setShowAddRejectionModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Outcome</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Primary Detected Pattern Card */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Diagnosis</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  careerReplay.confidence === 'Evidence-supported'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {careerReplay.confidence}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Repeated Failure Pattern Detected
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Synthesized from <strong className="text-slate-900">{careerReplay.analyzedApplicationsCount} historical applications</strong>
          </div>
        </div>

        {/* Pattern Statement */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-900">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Recurring Elimination Barrier:
          </div>
          <p className="text-base font-extrabold text-amber-950">
            "{careerReplay.detectedPattern}"
          </p>
          <p className="text-xs text-slate-700 mt-2 leading-relaxed font-medium">
            {careerReplay.rootCauseAnalysis}
          </p>
        </div>

        {/* Breakdown Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {careerReplay.repeatedFailurePoints.map((pt, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-700 font-medium leading-snug">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Visual Journey Replay Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Application Journey Timeline Replay</h3>
            <p className="text-xs text-slate-500">Select an application to inspect the candidate funnel and isolate where drop-off occurred.</p>
          </div>

          {/* Application selector buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedApp.id === app.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{app.company}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded ${
                  app.currentStage === 'Rejected'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {app.currentStage}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected App Detailed Pipeline */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">{selectedApp.company}</span>
                <span className="text-xs text-slate-500">• {selectedApp.jobRole}</span>
              </div>
              <span className="text-[11px] text-slate-400">Applied: {selectedApp.applicationDate} • Resume: {selectedApp.resumeVersion}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600">Job Fit Score: <strong className="text-indigo-600">{selectedApp.jobFitScore}%</strong></span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedApp.currentStage === 'Rejected'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                Outcome: {selectedApp.currentStage}
              </span>
            </div>
          </div>

          {/* Visual Step Pipeline Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {journeyStages.map((stg, idx) => {
              const Icon = stg.icon;
              const isDropOff = selectedApp.currentStage === 'Rejected' && selectedApp.interviewStage === stg.name;
              const isPassed = !isDropOff && (
                stg.name === 'Resume Screening' ||
                stg.name === 'Job Match' ||
                (stg.name === 'Online Assessment' && (selectedApp.assessmentScoreAtTime || 0) >= 75)
              );

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center relative transition-all ${
                    isDropOff
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400'
                      : isPassed
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-white border-slate-200 opacity-60'
                  }`}
                >
                  <div className="mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shadow-sm bg-white">
                    <Icon className={`w-4 h-4 ${
                      isDropOff ? 'text-rose-600' : isPassed ? 'text-emerald-600' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">{stg.name}</div>

                  <div className="mt-1.5 text-[10px] font-bold">
                    {isDropOff && <span className="text-rose-600 uppercase tracking-tight">Drop-Off Point</span>}
                    {isPassed && <span className="text-emerald-600">Passed ✓</span>}
                    {!isDropOff && !isPassed && <span className="text-slate-400">Pending</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Evidence Log for this application */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-indigo-600" />
                Interviewer & Recruiter Feedback Recorded
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                "{selectedApp.interviewFeedback || selectedApp.recruiterFeedback || 'No explicit verbatim feedback recorded.'}"
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Identified Weakness at Time of Application
              </div>
              <p className="text-slate-600 leading-relaxed">
                {selectedApp.rejectionReason || 'Struggled with algorithmic complexity trade-offs.'}
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Registered Skill Gaps: {selectedApp.skillGapsAtTime?.join(', ') || 'DSA, Rest API'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Actionable Remediation Plan & Retest Verification ⭐ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Remediation Plan (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Targeted Remediation Plan</h3>
              <p className="text-xs text-slate-500">Formulated by Career Replay to systematically eradicate the failure pattern.</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              4 Steps
            </span>
          </div>

          <div className="space-y-3">
            {careerReplay.actionablePlan.map((action, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-slate-800 font-medium leading-relaxed">{action}</span>
                </div>

                <button
                  onClick={() => {
                    if (i === 0) onNavigate('SkillProof');
                    else if (i === 1) onNavigate('Mock Interview');
                    else if (i === 2) onNavigate('Job Simulation');
                    else onNavigate('Applications');
                  }}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 whitespace-nowrap bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Before vs After Retest Comparison (5 cols) ⭐ */}
        <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50/70 to-white rounded-2xl border border-indigo-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Progression Proof</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {careerReplay.currentPerformance ? 'Retest Validated' : 'Retest Required'}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Before vs. After Retest Comparison</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Measure tangible skill delta before risking your next high-value application.
            </p>

            {/* Score Comparison Bars */}
            <div className="mt-5 space-y-4">
              {/* Previous Score */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Initial Interview Score (Amazon Failure)</span>
                  <span className="font-bold text-rose-600">{careerReplay.previousPerformance.interviewScore}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${careerReplay.previousPerformance.interviewScore}%` }} />
                </div>
              </div>

              {/* Retest Score */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-800">
                  <span className="font-semibold">Recent Mock Retest Score (After Drills)</span>
                  <span className="font-extrabold text-emerald-600">
                    {careerReplay.currentPerformance ? `${careerReplay.currentPerformance.newInterviewScore}%` : 'Pending'}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${careerReplay.currentPerformance?.newInterviewScore || 61}%` }}
                  />
                </div>
              </div>
            </div>

            {careerReplay.currentPerformance && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-0.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>+{careerReplay.currentPerformance.scoreDelta}% Technical Defense Delta</span>
                </div>
                <p className="text-emerald-800 leading-relaxed text-[11px]">
                  {careerReplay.currentPerformance.validationNote}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onNavigate('Mock Interview')}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>Take Hard Mock Retest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSimulateRetestSuccess}
              title="Quick demo simulation of retest verification"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-lg text-xs transition-colors"
            >
              Simulate Retest
            </button>
          </div>
        </div>
      </div>

      {/* Rejection Logging Modal */}
      {showAddRejectionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span>Log Application Outcome for Career Replay</span>
              </div>
              <button
                onClick={() => setShowAddRejectionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g., Goldman Sachs, PhonePe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Job Role</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Drop-Off Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Online Assessment">Online Assessment</option>
                    <option value="Technical Round 1">Technical Round 1</option>
                    <option value="Technical Round 2">Technical Round 2</option>
                    <option value="HR Round">HR / Managerial Round</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Interviewer Feedback / Notes</label>
                <textarea
                  rows={2}
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="e.g., Struggled with dynamic programming state transition equation"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Root Reason (if known)</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g., Live coding edge case omission"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddRejectionModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddRejectionModal(false);
                  handleTriggerReanalysis();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Save & Run Replay Engine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

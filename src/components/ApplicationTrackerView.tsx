import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  PlusCircle,
  RotateCcw,
  ExternalLink,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ApplicationRecord } from '../types';

interface ApplicationTrackerViewProps {
  applications: ApplicationRecord[];
  onAddApplication: (app: ApplicationRecord) => void;
  onUpdateApplicationStatus: (appId: string, stage: ApplicationRecord['currentStage']) => void;
  onNavigate: (tab: string) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  applications,
  onAddApplication,
  onUpdateApplicationStatus,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Application form
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Software Engineer');
  const [stage, setStage] = useState<ApplicationRecord['currentStage']>('Applied');
  const [notes, setNotes] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) || app.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'All' || app.currentStage === filterStage;
    return matchesSearch && matchesStage;
  });

  const handleCreate = () => {
    if (!company.trim()) return;
    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      company,
      jobRole: role,
      jobDescription: 'Standard full-time software engineering graduate hiring program.',
      applicationDate: new Date().toISOString().split('T')[0],
      currentStage: stage,
      resumeVersion: 'v2.1-ATS-Optimized.pdf',
      jobFitScore: 78,
      assessmentScoreAtTime: 82,
      notes,
      skillGapsAtTime: ['DSA', 'System Design'],
      stageHistory: ['Applied'],
      outcome: 'Pending'
    };
    onAddApplication(newApp);
    setShowAddModal(false);
    setCompany('');
    setNotes('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Tracker</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Synchronized with Replay
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logs interview stages, recruiter responses, and rejection feedback to power the cross-application Career Replay engine.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Track New Application</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['All', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStage(s)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                filterStage === s ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Application Cards List */}
      <div className="space-y-4">
        {filteredApps.map((app) => {
          const isRejected = app.currentStage === 'Rejected';
          const isSelected = app.currentStage === 'Selected';
          const isAssessment = app.currentStage === 'Assessment';
          const isInterview = app.currentStage === 'Interview';

          return (
            <div
              key={app.id}
              className={`p-6 rounded-2xl border transition-all bg-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                isRejected
                  ? 'border-rose-200 shadow-sm'
                  : isSelected
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">{app.company}</h3>
                  <span className="text-xs text-slate-500 font-medium">• {app.jobRole}</span>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isRejected
                      ? 'bg-rose-100 text-rose-800'
                      : isSelected
                      ? 'bg-emerald-100 text-emerald-800'
                      : isAssessment
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {app.currentStage}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied: {app.applicationDate}
                  </span>
                  <span>•</span>
                  <span>Resume: {app.resumeVersion}</span>
                  <span>•</span>
                  <span>Job Fit: <strong className="text-slate-700">{app.jobFitScore}%</strong></span>
                </div>

                {/* Feedback note if any */}
                {(app.interviewFeedback || app.rejectionReason) && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic leading-snug">
                    "{app.interviewFeedback || app.rejectionReason}"
                  </p>
                )}
              </div>

              {/* Right Action & Career Replay Bridge */}
              <div className="flex items-center gap-3 self-end lg:self-center">
                {/* Stage selector */}
                <select
                  value={app.currentStage}
                  onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as any)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold focus:outline-none"
                >
                  <option value="Saved">Saved</option>
                  <option value="Applied">Applied</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected 🎉</option>
                  <option value="Rejected">Rejected</option>
                </select>

                {isRejected && (
                  <button
                    onClick={() => onNavigate('Career Replay')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-sm transition-all whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Analyze in Career Replay</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base">Track New Job Application</span>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Uber, Swiggy"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Job Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Initial Status</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-semibold"
                >
                  <option value="Applied">Applied</option>
                  <option value="Assessment">Online Assessment</option>
                  <option value="Interview">Interview Round</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes / Context</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Referral source, job link, recruiter email..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Track Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

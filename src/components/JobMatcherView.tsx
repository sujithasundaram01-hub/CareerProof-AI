import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { JobPosting, SkillItem } from '../types';

interface JobMatcherViewProps {
  jobs: JobPosting[];
  skills: SkillItem[];
  onSelectJobForReplay?: (job: JobPosting) => void;
  onNavigate: (tab: string) => void;
}

export const JobMatcherView: React.FC<JobMatcherViewProps> = ({
  jobs,
  skills,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Strong Match' | 'Moderate Match' | 'Low Match'>('All');
  const [selectedJob, setSelectedJob] = useState<JobPosting>(jobs[0] || {} as JobPosting);
  const [showAddCustomJD, setShowAddCustomJD] = useState(false);

  // Custom paste JD state
  const [customTitle, setCustomTitle] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [customJD, setCustomJD] = useState('');

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.company.toLowerCase().includes(searchTerm.toLowerCase()) || j.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedFilter === 'All' || j.matchTier === selectedFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Job Matcher</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Deterministic Fit Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculates multidimensional fit scores (skills, project proof, interview readiness) and explains <span className="font-semibold text-slate-700">WHY</span> you match.
          </p>
        </div>

        <button
          onClick={() => setShowAddCustomJD(!showAddCustomJD)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Paste / Upload New JD</span>
        </button>
      </div>

      {/* Optional Custom JD Paste Box */}
      {showAddCustomJD && (
        <div className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-md space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Evaluate Custom Job Description
            </span>
            <button onClick={() => setShowAddCustomJD(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company</label>
              <input
                type="text"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                placeholder="e.g. Stripe, Flipkart"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Job Role</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. SDE 1 - Core Services"
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-xs">Paste Full Job Description</label>
            <textarea
              rows={4}
              value={customJD}
              onChange={(e) => setCustomJD(e.target.value)}
              placeholder="Paste requirements, tech stack, responsibilities..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200"
            />
          </div>

          <button
            onClick={() => {
              setShowAddCustomJD(false);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            Calculate Instant Job Fit
          </button>
        </div>
      )}

      {/* Main Grid: Listings (5 cols) & Match Breakdown (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Job Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search company or role..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
            >
              <option value="All">All Tiers</option>
              <option value="Strong Match">🟢 Strong</option>
              <option value="Moderate Match">🟡 Moderate</option>
              <option value="Low Match">🔴 Low</option>
            </select>
          </div>

          {/* List items */}
          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              const isStrong = job.matchTier === 'Strong Match';
              const isModerate = job.matchTier === 'Moderate Match';

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900">{job.company}</span>
                      <h4 className="text-xs font-semibold text-slate-700 mt-0.5">{job.role}</h4>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className={`text-base font-extrabold ${
                        isStrong ? 'text-emerald-600' : isModerate ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {job.fitScore}%
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isStrong
                          ? 'bg-emerald-100 text-emerald-800'
                          : isModerate
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {job.matchTier}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location.split('(')[0].trim()}
                    </span>
                    <span>•</span>
                    <span>{job.experienceReq}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600">{job.salaryRange}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Deep Match Intelligence (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header of Selected Job */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{selectedJob.company}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">{selectedJob.type}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedJob.role}</h2>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>{selectedJob.location}</span>
                <span>•</span>
                <span>{selectedJob.experienceReq}</span>
                <span>•</span>
                <span className="font-bold text-slate-800">{selectedJob.salaryRange}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Fit</span>
              <div className="text-3xl font-extrabold text-indigo-600 mt-0.5">{selectedJob.fitScore}%</div>
              <span className="text-[10px] font-bold text-slate-700">{selectedJob.matchTier}</span>
            </div>
          </div>

          {/* WHY User Matches or Does Not Match (CRITICAL REQUIREMENT) */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1.5">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Fit Explanation: Why you match / do not match</span>
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {selectedJob.matchReason}
            </p>
          </div>

          {/* Sub-Dimension Fit Gauges */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block">Resume Relevance</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{selectedJob.resumeRelevanceScore}%</span>
              <span className="text-[10px] text-slate-500">Keyword Alignment</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block">Project Proof</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{selectedJob.projectRelevanceScore}%</span>
              <span className="text-[10px] text-slate-500">Tech Stack Overlap</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block">Interview Readiness</span>
              <span className="text-lg font-bold text-amber-600 mt-0.5 block">{selectedJob.interviewReadinessScore}%</span>
              <span className="text-[10px] text-amber-600 font-semibold">Needs Follow-Up Drill</span>
            </div>
          </div>

          {/* Skills Breakdown: Matching vs Missing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-2">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Matching Candidate Skills ({selectedJob.matchingSkills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.matchingSkills?.map((ms, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 font-medium text-[11px]">
                    ✓ {ms}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 text-xs space-y-2">
              <span className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Missing Skill Gaps for this Role ({selectedJob.missingSkills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.missingSkills?.map((ms, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-rose-800 border border-rose-200 font-medium text-[11px]">
                    ✕ {ms}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Action Bridge */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Closing these missing skills will raise your match tier from <strong className="text-slate-800">{selectedJob.matchTier}</strong> to 🟢 Strong Match.
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('Skill Gap')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-2 rounded-lg text-xs"
              >
                Inspect Gaps
              </button>
              <button
                onClick={() => onNavigate('Interview Playbook')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1"
              >
                <span>View Interview Playbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

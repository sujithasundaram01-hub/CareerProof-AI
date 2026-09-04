import React, { useState } from 'react';
import {
  GitPullRequest,
  AlertTriangle,
  Award,
  BookOpen,
  FolderGit2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SkillItem, UserProfile } from '../types';

interface SkillGapViewProps {
  skills: SkillItem[];
  user: UserProfile;
  onNavigate: (tab: string) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  skills,
  user,
  onNavigate
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  const filteredSkills = skills.filter((s) => {
    if (selectedPriority === 'All') return true;
    return s.priority === selectedPriority;
  });

  const criticalCount = skills.filter((s) => s.priority === 'Critical').length;
  const highCount = skills.filter((s) => s.priority === 'High').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Skill Gap Analyzer</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
              {criticalCount} Critical • {highCount} High Priority
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compares your demonstrated proficiency against benchmark requirements for <strong className="text-slate-800">{user.targetJobRole}</strong>.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedPriority === p ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p === 'Critical' && '🔴 '}
              {p === 'High' && '🟠 '}
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Cross-Module Connectivity Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-indigo-900 font-medium">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            Skill gap discoveries automatically calibrate your <strong>Roadmap</strong>, populate targeted <strong>SkillProof tests</strong>, and customize <strong>AI Mock Interview follow-ups</strong>.
          </span>
        </div>
        <button
          onClick={() => onNavigate('Roadmap')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
        >
          <span>View Synchronized Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Detailed Skill Gap Cards */}
      <div className="space-y-4">
        {filteredSkills.map((skill) => {
          const isCritical = skill.priority === 'Critical';
          const isHigh = skill.priority === 'High';
          const isVerified = skill.status === 'VERIFIED';

          return (
            <div
              key={skill.id}
              className={`p-6 rounded-2xl border transition-all bg-white ${
                isCritical
                  ? 'border-rose-200 shadow-sm'
                  : isHigh
                  ? 'border-amber-200 shadow-sm'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Top: Name, Badges, Level Meter */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{skill.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {skill.category}
                    </span>

                    {/* Evidence Status Pill */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : skill.status === 'DEMONSTRATED'
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {skill.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>Evidence Sources: {skill.sources.join(', ')}</span>
                    {skill.verifiedScore && (
                      <span className="text-emerald-600 font-bold">• Verified Score: {skill.verifiedScore}%</span>
                    )}
                  </div>
                </div>

                {/* Level Meter & Priority Tag */}
                <div className="flex items-center gap-4">
                  {/* Current vs Required Level Gauge */}
                  <div className="flex items-center gap-3 text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 font-semibold block">Current</span>
                      <span className="font-extrabold text-slate-900 text-sm">Level {skill.currentEstimatedLevel}/5</span>
                    </div>
                    <span className="text-slate-300 font-bold">&rarr;</span>
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 font-semibold block">Required</span>
                      <span className="font-extrabold text-indigo-600 text-sm">Level {skill.requiredLevel}/5</span>
                    </div>

                    <div className="pl-2 border-l border-slate-200 text-center">
                      <span className="text-[10px] text-slate-400 font-semibold block">Skill Gap</span>
                      <span className={`font-extrabold text-sm ${skill.gap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {skill.gap > 0 ? `-${skill.gap} Level` : 'Closed ✓'}
                      </span>
                    </div>
                  </div>

                  {/* Priority Pill */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    isCritical
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : isHigh
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                    <span>{skill.priority} Priority</span>
                  </span>
                </div>
              </div>

              {/* Why the Skill Matters (CRITICAL REQUIREMENT) */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-800 block mb-0.5">Why this skill matters for your target role:</span>
                <p className="text-slate-600 leading-relaxed">
                  {skill.whyItMatters}
                </p>
              </div>

              {/* Prescribed Action Modules */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Recommended Practice</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{skill.recommendedPractice}</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                    <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Recommended Project Artifact</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{skill.recommendedProject}</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>SkillProof Verification Test</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-snug">{skill.recommendedAssessment}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('SkillProof')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

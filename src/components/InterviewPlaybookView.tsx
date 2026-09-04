import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  HelpCircle,
  Video,
  ShieldCheck,
  Code2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface InterviewPlaybookViewProps {
  user: UserProfile;
  onNavigate: (tab: string) => void;
}

export const InterviewPlaybookView: React.FC<InterviewPlaybookViewProps> = ({
  user,
  onNavigate
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('Amazon');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true,
    'check-4': true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const playbookSections = [
    {
      title: 'Expected Technical Topics (Core Java & Distributed Backend)',
      icon: Code2,
      questions: [
        'Java Concurrency: ConcurrentHashMap segment locks vs synchronized maps, thread pool sizing, volatile keyword.',
        'Spring Boot Internals: Bean lifecycle, Dependency Injection, @Transactional rollback mechanisms.',
        'Database Optimization: B-Tree vs Hash index structures, execution plan analysis, isolation levels (Read Committed vs Serializable).'
      ]
    },
    {
      title: 'Amazon Leadership & Behavioral Questions (STAR Method)',
      icon: Video,
      questions: [
        '"Customer Obsession": Tell me about a time you went above and beyond to solve a user bottleneck in FinTrack.',
        '"Dive Deep": Describe a complex technical defect where you had to drill down into the database query log or memory heap.',
        '"Deliver Results": How did you prioritize your semester project deliverables under tight deadlines?'
      ]
    },
    {
      title: 'Project Defense Battle-Testing (FinTrack Microservices)',
      icon: ShieldCheck,
      questions: [
        'Why did you use Redis as a caching layer instead of an in-memory Caffeine cache on the server node?',
        'If a network partition occurs between your Spring microservice and PostgreSQL, how do you guarantee financial atomicity?',
        'How does Docker Compose networking handle service discovery between containers?'
      ]
    },
    {
      title: 'Coding & High-Frequency Data Structures',
      icon: BookOpen,
      questions: [
        'Graphs & BFS/DFS: Shortest path in binary matrix, clone graph, word ladder.',
        'Dynamic Programming: Coin change 1 & 2, longest common subsequence, house robber.',
        'Binary Trees: Lowest common ancestor, serialize and deserialize binary tree.'
      ]
    }
  ];

  const checklistItems = [
    { id: 'check-1', label: 'Master Java 8 HashMap collision resolution & treeification' },
    { id: 'check-2', label: 'Draft 3 STAR behavioral stories for Leadership Principles' },
    { id: 'check-3', label: 'Memorize FinTrack database schema and p99 latency benchmarks' },
    { id: 'check-4', label: 'Pass SQL & Database SkillProof assessment' },
    { id: 'check-5', label: 'Retake Hard Mock Interview with zero follow-up drop-offs' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Interview Playbook</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Company-Specific Strategy
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curated hiring rubrics, defense strategies, and high-probability interview questions for <strong className="text-slate-800">{user.targetJobRole}</strong>.
          </p>
        </div>

        {/* Target Company Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['Amazon', 'Google', 'Microsoft', 'Razorpay'].map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCompany === comp ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Playbook Topics (8 cols) & Preparation Checklist (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Playbook Q&A Modules (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {playbookSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm pb-2 border-b border-slate-100">
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{sec.title}</span>
                </div>

                <div className="space-y-2">
                  {sec.questions.map((q, qIdx) => (
                    <div key={qIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Preparation Checklist (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Readiness Checklist</span>
              <span className="text-xs font-extrabold text-indigo-600">
                {Object.values(checkedItems).filter(Boolean).length}/{checklistItems.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {checklistItems.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <button className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <span className={`font-medium leading-snug ${isChecked ? 'line-through text-slate-400' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('Mock Interview')}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Test Playbook in Mock Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

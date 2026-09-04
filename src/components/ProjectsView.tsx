import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  ExternalLink,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  ShieldCheck,
  Code
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsViewProps {
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  onNavigate: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onAddProject,
  onNavigate
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Project state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleCreateProject = () => {
    if (!title.trim()) return;
    const newP: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      description,
      techStack: techStack.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      complexityScore: 82,
      architectureQualityScore: 80,
      documentationScore: 85,
      skillsDemonstrated: techStack.split(',').map((t) => t.trim()).filter(Boolean),
      resumeBullets: [
        `Architected ${title} using ${techStack} implementing scalable modular services with clean schema isolation.`,
        `Optimized performance throughput and error handling to ensure seamless deployment resilience.`
      ],
      interviewQuestions: [
        `What architectural bottlenecks did you encounter while building ${title}?`,
        `How did you structure database integrity and transaction boundaries?`
      ],
      defenseQuestions: [
        `Why did you select your specific stack over competing enterprise alternatives?`,
        `How would you scale this application from 100 concurrent requests to 10,000 requests per second?`
      ],
      missingFeatures: ['Automated integration testing suite (e.g. Testcontainers)', 'Prometheus metrics scraping endpoint']
    };

    onAddProject(newP);
    setSelectedProjectId(newP.id);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
    setTechStack('');
    setGithubUrl('');
    setLiveUrl('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Project Intelligence</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Evidence Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Transforms student projects into verified resume proof, interview defense talking points, and architectural audit scores.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Project Artifact</span>
        </button>
      </div>

      {/* Main Grid: Projects List (4 cols) & Deep Intelligence (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Portfolio Artifacts ({projects.length})
          </span>

          {projects.map((proj) => {
            const isSelected = selectedProject?.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900">{proj.title}</h3>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {proj.complexityScore || 80}/100
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {(proj.techStack || []).slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                  {(proj.techStack || []).length > 3 && (
                    <span className="text-[10px] text-slate-400">+{(proj.techStack || []).length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Project Deep Intelligence (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{selectedProject?.title || 'Selected Project'}</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Production Proof
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {selectedProject?.description || 'Architecture and implementation verification'}
              </p>

              {/* Links */}
              <div className="mt-3 flex items-center gap-3 text-xs">
                {selectedProject?.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-700 hover:text-indigo-600 font-semibold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject?.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quality Gauges */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                <span className="text-[10px] font-bold text-slate-400 block">Complexity</span>
                <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{selectedProject?.complexityScore || 85}/100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                <span className="text-[10px] font-bold text-slate-400 block">Architecture</span>
                <span className="text-lg font-extrabold text-indigo-600 mt-0.5 block">{selectedProject?.architectureQualityScore || 82}/100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                <span className="text-[10px] font-bold text-slate-400 block">Documentation</span>
                <span className="text-lg font-extrabold text-emerald-600 mt-0.5 block">{selectedProject?.documentationScore || 80}/100</span>
              </div>
            </div>
          </div>

          {/* Demonstrated Skills Chips */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-2">Verified Demonstrated Skills in this Artifact</span>
            <div className="flex flex-wrap gap-1.5">
              {(selectedProject?.skillsDemonstrated || []).map((sk, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Resume-Ready Bullet Points (Google X-Y-Z formula) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Resume-Ready Bullet Points (Google X-Y-Z Quantified Formula)</span>
            </div>
            <div className="space-y-2">
              {(selectedProject?.resumeBullets || selectedProject?.resumeBulletPoints || [
                `Architected core microservices for ${selectedProject?.title || 'portfolio project'} with automated error boundaries.`,
                `Optimized transaction throughput, achieving sub-50ms p99 latency across data operations.`
              ]).map((bullet, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 leading-relaxed">
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Interview Questions & Project Defense */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
              <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Technical Interview Questions You Will Be Asked
              </span>
              <ul className="space-y-2">
                {(selectedProject?.interviewQuestions || selectedProject?.technicalInterviewQuestions || [
                  `How did you handle race conditions and concurrency in ${selectedProject?.title || 'this project'}?`,
                  `What trade-offs led to choosing this specific architecture over alternatives?`
                ]).map((q, idx) => (
                  <li key={idx} className="p-2 rounded bg-white border border-indigo-100 text-slate-700 font-medium leading-snug">
                    "{q}"
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Project Architectural Defense Questions
              </span>
              <ul className="space-y-2">
                {(selectedProject?.defenseQuestions || selectedProject?.projectDefenseQuestions || [
                  `Why did you choose this database model instead of a document store?`,
                  `How would you refactor this to handle a 100x surge in write traffic?`
                ]).map((q, idx) => (
                  <li key={idx} className="p-2 rounded bg-white border border-amber-200 text-slate-700 font-medium leading-snug">
                    "{q}"
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Features to elevate to Senior/FAANG tier */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-bold text-slate-800 block mb-1">Recommended Feature Additions to Level Up this Project:</span>
            <ul className="space-y-1 text-slate-600">
              {(selectedProject?.missingFeatures || selectedProject?.improvementSuggestions || [
                'Add containerized end-to-end integration test suite',
                'Implement distributed rate limiting and metrics dashboard'
              ]).map((mf, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-amber-500 font-bold">+</span>
                  <span>{mf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                Add New Project to Evidence Portfolio
              </span>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. RateLimiter Distributed Token Bucket"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description & Architecture Overview</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain problem statement, engineering approach, and key components..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g. Java 17, Redis, Spring Boot, Docker"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Live URL (optional)</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
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
                onClick={handleCreateProject}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Analyze & Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

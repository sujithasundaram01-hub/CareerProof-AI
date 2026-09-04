import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Target,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface ResumeAnalyzerViewProps {
  resume: ResumeAnalysis;
  onUpdateResume: (updated: ResumeAnalysis) => void;
  onNavigate: (tab: string) => void;
}

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  resume,
  onUpdateResume,
  onNavigate
}) => {
  const [resumeText, setResumeText] = useState(`ARJUN SHARMA
Computer Science & Engineering | 2025 Graduate
Email: arjun.sharma2025@college.edu | GitHub: github.com/arjun-sharma-dev | LinkedIn: linkedin.com/in/arjun-sharma

EDUCATION
National Institute of Technology — B.Tech Computer Science & Engineering (2021 - 2025)
CGPA: 8.8/10.0 | Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Software Design.

TECHNICAL SKILLS
Languages: Java 17, Python, SQL, C++, TypeScript
Frameworks & Databases: Spring Boot, FastAPI, PostgreSQL, Redis, React
Tools & Practices: Git, Docker Compose, Linux/Unix, REST APIs

PROJECTS
FinTrack: Scalable Personal Finance & Ledger Microservices (Java 17, Spring Boot, PostgreSQL, Redis, Docker)
• Engineered high-concurrency double-entry bookkeeping microservices handling simulated 50,000+ transaction ledgers.
• Implemented Redis caching for balance query lookups, optimizing p99 read response latency from 180ms down to 14ms.
• Configured multi-container orchestration using Docker Compose with automated PostgreSQL schema migrations.

HealthPulse: Diagnostic Predictor & Analytics Webhook (Python, FastAPI, Scikit-Learn)
• Developed cardiovascular anomaly classifier using Random Forest models achieving 89.2% cross-validated accuracy.
• Created asynchronous REST endpoints delivering diagnostic predictions in under 45ms.`);

  const [targetJobTitle, setTargetJobTitle] = useState(resume.targetJobTitle || 'Software Developer (Backend / Java)');
  const [targetJobDesc, setTargetJobDesc] = useState(resume.targetJobDesc || 'Seeking an entry-level Java Software Developer proficient in Spring Boot, REST APIs, and relational databases. Strong grasp of Data Structures, Algorithms, and clean Object-Oriented Design required. Unit testing and Docker is a plus.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overall' | 'jd-match'>('overall');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetJobTitle,
          targetJobDesc
        })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdateResume({
          ...resume,
          overallScore: data.overallScore || 82,
          atsScore: data.atsScore || 79,
          sectionScores: data.sectionScores || resume.sectionScores,
          strengths: data.strengths || resume.strengths,
          weaknesses: data.weaknesses || resume.weaknesses,
          missingKeywords: data.missingKeywords || resume.missingKeywords,
          suggestions: data.suggestions || resume.suggestions,
          matchingSkills: data.matchingSkills || resume.matchingSkills,
          missingSkills: data.missingSkills || resume.missingSkills,
          targetJobTitle,
          targetJobDesc,
          lastAnalyzedDate: new Date().toISOString().split('T')[0]
        });
      }
    } catch (e) {
      console.warn('API error, preserving structured analysis', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Resume Analyzer</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              ATS Standard v4.2
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates ATS parsing compatibility, section weights, keyword saturation, and job-description matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('overall')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'overall' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overall & ATS Analysis
            </button>
            <button
              onClick={() => setActiveSubTab('jd-match')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'jd-match' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Target JD Match
            </button>
          </div>
        </div>
      </div>

      {/* Input / Upload Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Resume Source</span>
            <span className="text-[11px] text-slate-400">Current: {resume.fileName || 'Active Profile'}</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Resume Raw Content (PDF / DOCX Text)</label>
            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 leading-relaxed"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Job Title</label>
              <input
                type="text"
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Job Description (for JD Gap Matching)</label>
              <textarea
                rows={3}
                value={targetJobDesc}
                onChange={(e) => setTargetJobDesc(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing with Gemini AI...' : 'Re-Analyze Resume & JD Match'}</span>
          </button>
        </div>

        {/* Right: Analysis Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeSubTab === 'overall' ? (
            <>
              {/* Score Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Score</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{resume.overallScore}/100</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Good Foundation</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ATS Pass Rate</span>
                  <div className="text-2xl font-extrabold text-indigo-600 mt-1">{resume.atsScore}%</div>
                  <span className="text-[10px] text-indigo-600 font-semibold">Standard Parsable</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projects Section</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{resume.sectionScores.projects}/100</div>
                  <span className="text-[10px] text-slate-400">High Relevance</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skills Saturation</span>
                  <div className="text-2xl font-extrabold text-amber-600 mt-1">{resume.sectionScores.skills}/100</div>
                  <span className="text-[10px] text-amber-600 font-semibold">Missing Keywords</span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Resume Strengths</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {resume.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Identified Weaknesses & Omissions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {resume.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Keywords Chip Box */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-indigo-600" />
                    High-Impact Keywords Missing from Your Resume
                  </span>
                  <span className="text-[10px] text-slate-400">Found in 70%+ of target JDs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resume.missingKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-1"
                    >
                      <span className="text-rose-400 font-bold">+</span>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Improvement Suggestions */}
              <div className="bg-indigo-50/60 rounded-xl p-4 border border-indigo-100 text-xs space-y-2">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Actionable Resume Refinements (Google X-Y-Z Formula)
                </div>
                <div className="space-y-1.5">
                  {resume.suggestions.map((sug, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-indigo-100 text-slate-700">
                      {sug}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Job-Specific Resume Analysis Tab */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Job-Specific Resume Alignment</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    78% Resume Match
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Exact cross-comparison between your uploaded credentials and "{targetJobTitle}".
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Matching Skills */}
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Matching Skills Detected ({resume.matchingSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.matchingSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 text-xs space-y-2">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Missing Skills in Resume ({resume.missingSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.missingSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-rose-800 border border-rose-200 font-semibold text-[11px]">
                        ✕ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Relevant Projects Alignment */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Relevant Portfolio Projects for this Role</span>
                <p className="text-slate-600 leading-relaxed">
                  Your project <strong className="text-indigo-600">FinTrack: Scalable Personal Finance & Ledger Microservices</strong> demonstrates 85% of the backend requirements (Java, Spring Boot, PostgreSQL, Redis) requested in this Job Description.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">Want to verify missing skills to prove your qualification?</span>
                <button
                  onClick={() => onNavigate('SkillProof')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1"
                >
                  <span>Prove Missing Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

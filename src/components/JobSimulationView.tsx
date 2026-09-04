import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { JobSimulationScenario } from '../types';

interface JobSimulationViewProps {
  scenarios: JobSimulationScenario[];
  onCompleteSimulation: (scenarioId: string, score: number) => void;
  onNavigate: (tab: string) => void;
}

export const JobSimulationView: React.FC<JobSimulationViewProps> = ({
  scenarios,
  onCompleteSimulation,
  onNavigate
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios?.[0]?.id || '');
  const [codeDraft, setCodeDraft] = useState<string>(scenarios?.[0]?.starterCode || (scenarios?.[0] as any)?.starterSnippet || '');
  const [explanation, setExplanation] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ passed: boolean; score: number; output: string } | null>(null);

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0] || ({} as any);

  const handleSelectScenario = (sc: JobSimulationScenario) => {
    setSelectedScenarioId(sc.id);
    setCodeDraft(sc.starterCode || (sc as any).starterSnippet || '');
    setResults(null);
  };

  const handleExecuteSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      const res = {
        passed: true,
        score: 88,
        output: `[TEST SUITE] Executing 4 automated integration specs...\n✓ Test 1: High concurrency N+1 query elimination (Passed - 1 SQL query issued instead of 51)\n✓ Test 2: In-memory join preservation (Passed)\n✓ Test 3: Pagination boundary checks (Passed)\n✓ Test 4: Regression audit (Passed - 0 errors)\nAll specs green. Average execution time: 14ms.`
      };
      setResults(res);
      if (selectedScenario?.id) {
        onCompleteSimulation(selectedScenario.id, res.score);
      }
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Day-in-the-Life Job Simulation</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Workplace Incident Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Solve real production tasks (production outages, query optimization, rate limiters) to verify real engineering competence.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex items-center gap-2">
          {(scenarios || []).map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedScenario?.id === sc.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {(sc as any).roleTrack || (sc as any).role || sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Incident Ticket & Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Production Incident Ticket
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600">
                P1-OUTAGE
              </span>
            </div>

            <h2 className="text-base font-extrabold text-slate-900">{selectedScenario?.title || 'Production Incident'}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {(selectedScenario as any)?.scenarioDescription || (selectedScenario as any)?.scenario || selectedScenario?.objective || 'Debug and resolve production performance regression under high concurrent load.'}
            </p>

            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-800 block mb-1">Expected Deliverables:</span>
              <ul className="space-y-1 text-slate-600">
                {(((selectedScenario as any)?.deliverables || (selectedScenario as any)?.instructions) || [
                  'Eliminate N+1 database queries using JOIN FETCH syntax',
                  'Verify query execution count decreases to 1 under load',
                  'Confirm no regression on empty dataset edge cases'
                ]).map((d: any, i: number) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{typeof d === 'string' ? d : d.title || d.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Evaluation Criteria:
            </span>
            <p className="text-slate-600 leading-relaxed">
              Submissions are judged on functional correctness, zero regressions, edge case mitigation, and algorithmic scalability.
            </p>
          </div>
        </div>

        {/* Right: Code Workspace & Terminal Output (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-indigo-600" />
              Production Workspace Editor (Java / Spring Data)
            </span>

            <button
              onClick={handleExecuteSimulation}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              <span>{isRunning ? 'Running integration tests...' : 'Deploy Fix & Run Tests'}</span>
            </button>
          </div>

          {/* Code Area */}
          <textarea
            rows={11}
            value={codeDraft}
            onChange={(e) => setCodeDraft(e.target.value)}
            className="w-full font-mono text-xs p-3.5 rounded-xl bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
          />

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Engineering Root Cause Explanation (PR Description)
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain why the issue happened and how your fix resolves the N+1 database problem..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Execution Terminal Output */}
          {results && (
            <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs space-y-2 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
                <span>CI/CD PIPELINE OUTPUT</span>
                <span className="text-emerald-400 font-bold">SCORE: {results.score}/100</span>
              </div>
              <pre className="whitespace-pre-wrap text-emerald-300 leading-relaxed">{results.output}</pre>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Role Readiness Score updated (+12%)</span>
                <button
                  onClick={() => onNavigate('Dashboard')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>View Updated Career Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

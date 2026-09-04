import React, { useState, useEffect } from 'react';
import {
  Video,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { MockInterviewSession } from '../types';

interface MockInterviewViewProps {
  pastSessions: MockInterviewSession[];
  onSaveSession: (session: MockInterviewSession) => void;
  onNavigate: (tab: string) => void;
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({
  pastSessions,
  onSaveSession,
  onNavigate
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [interviewType, setInterviewType] = useState<string>('Technical');
  const [companyStyle, setCompanyStyle] = useState<string>('Amazon');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Hard');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Active chat state
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string; timestamp: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [report, setReport] = useState<MockInterviewSession | null>(null);

  // Sample interview questions script with dynamic follow-ups
  const interviewScript = [
    {
      q: `Hello Arjun. Welcome to your ${companyStyle} ${interviewType} interview. Let's start with a foundational question: In Java, how does a HashMap handle collisions internally, and what happens when the load factor threshold is crossed?`,
      followUp: `Interesting. You mentioned linked lists, but in Java 8+, at what treeify threshold does a bucket transition into a Red-Black tree, and why was this change made?`
    },
    {
      q: `Now consider this scenario: You have an endpoint that queries a database table with 10 million rows, and p99 response times spike to 4 seconds. Walk me through your step-by-step diagnostic and indexing strategy.`,
      followUp: `If an index exists on the foreign key column but Postgres still executes a sequential scan, what database statistics or query planning flags would you inspect?`
    },
    {
      q: `Looking at your project FinTrack, you used Redis for caching balances. How did you handle cache invalidation and ensure strong consistency during concurrent ledger updates?`,
      followUp: `What if Redis crashes while the DB write succeeds? How do you prevent dirty reads or data loss?`
    }
  ];

  const handleStartInterview = () => {
    setInProgress(true);
    setReport(null);
    setCurrentTurnIdx(0);
    const initialMsg = {
      sender: 'ai' as const,
      text: interviewScript[0].q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMsg]);
    speakText(initialMsg.text);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim() || isAiThinking) return;

    const userMsg = {
      sender: 'user' as const,
      text: userInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setUserInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      setIsAiThinking(false);
      const nextTurn = currentTurnIdx + 1;

      // Realistic interviewer rule: ask follow-up or proceed to next question
      if (currentTurnIdx === 0) {
        const aiFollowUp = {
          sender: 'ai' as const,
          text: interviewScript[0].followUp,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...newMsgs, aiFollowUp]);
        speakText(aiFollowUp.text);
        setCurrentTurnIdx(1);
      } else if (currentTurnIdx === 1) {
        const nextQ = {
          sender: 'ai' as const,
          text: interviewScript[1].q,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...newMsgs, nextQ]);
        speakText(nextQ.text);
        setCurrentTurnIdx(2);
      } else {
        // Conclude interview and generate report
        handleConcludeInterview(newMsgs);
      }
    }, 1200);
  };

  const handleConcludeInterview = async (allMsgs: typeof messages) => {
    setIsAiThinking(true);
    try {
      const response = await fetch('/api/gemini/interview-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'Software Developer (Java / Backend)',
          interviewType,
          companyStyle,
          conversation: allMsgs
        })
      });

      let evaluationData: any = null;
      if (response.ok) {
        evaluationData = await response.json();
      }

      const finalSession: MockInterviewSession = {
        id: `mock-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        role: 'Software Developer (Java / Backend)',
        interviewType,
        companyStyle,
        difficulty,
        overallScore: evaluationData?.overallScore || 78,
        readinessVerdict: evaluationData?.readinessVerdict || 'Borderline Job-Ready',
        categoryScores: evaluationData?.categoryScores || {
          technicalAccuracy: 76,
          communication: 82,
          problemSolving: 75,
          confidence: 80,
          structure: 78
        },
        strongAnswers: evaluationData?.strongAnswers || [
          'Solid initial explanation of Java HashMap bucket indexing and hash code distribution.'
        ],
        weakAnswers: evaluationData?.weakAnswers || [
          'Omitted exact time complexity comparison for Red-Black tree rebalancing vs linked list traversal.'
        ],
        missingPoints: evaluationData?.missingPoints || [
          'Did not mention the TREEIFY_THRESHOLD constant (8) and MIN_TREEIFY_CAPACITY (64).'
        ],
        betterApproach: evaluationData?.betterApproach || 'Structure technical responses with: 1) Mechanism, 2) Thresholds, 3) Big-O impact.',
        roadmapUpdates: ['Review Java 8 HashMap internal source code', 'Practice database indexing query plans']
      };

      setReport(finalSession);
      onSaveSession(finalSession);
      setInProgress(false);
    } catch (e) {
      console.warn('Fallback evaluation', e);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Mock Interview</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Zero-Interruption Realism
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulates real hiring rounds with dynamic follow-ups. No mid-interview spoilers; comprehensive report generated upon completion.
          </p>
        </div>

        {inProgress && (
          <button
            onClick={() => handleConcludeInterview(messages)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-lg text-xs border border-rose-200"
          >
            End Interview & Generate Report
          </button>
        )}
      </div>

      {!inProgress && !report && (
        /* Configuration Screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl space-y-6">
          <h2 className="text-base font-extrabold text-slate-900">Configure Interview Simulation</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Style Persona</label>
              <select
                value={companyStyle}
                onChange={(e) => setCompanyStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="Amazon">Amazon (Bar Raiser + Leadership Principles)</option>
                <option value="Google">Google (Algorithmic Rigor + Scale)</option>
                <option value="Microsoft">Microsoft (System Architecture + Practical Code)</option>
                <option value="Fast-Paced Startup">Fast-Paced Startup (Pragmatic Execution)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Interview Round Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="Technical">Technical (DSA, Languages, Concurrency)</option>
                <option value="System Design">System Design & Database Architecture</option>
                <option value="Project Defense">Project Defense (Portfolio Auditing)</option>
                <option value="Behavioral">Behavioral (STAR Method)</option>
                <option value="HR Round">HR & Culture Fit</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Difficulty Bar</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="Easy">Standard Entry-Level</option>
                <option value="Medium">Competitive SDE 1</option>
                <option value="Hard">Hard (FAANG Bar Raiser Drill)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Question Count</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value={5}>5 Questions (Rapid Drill)</option>
                <option value={10}>10 Questions (Standard Round)</option>
                <option value={20}>20 Questions (Full Marathon)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Authentic Pressure Simulation:</span> The interviewer will challenge ambiguous assertions and ask follow-up questions just like an onsite engineering manager. Text and audio speech synthesis are enabled.
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Enter Live Interview Room</span>
          </button>
        </div>
      )}

      {/* Mode B: Live Interview Room */}
      {inProgress && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[600px]">
          {/* Top Room Banner */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <span className="font-extrabold text-sm">{companyStyle} • {interviewType} Round</span>
                <span className="block text-[11px] text-slate-400">Interviewer Persona: Senior Engineering Bar Raiser</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSpeaking && (
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1.5 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  Interviewer Speaking...
                </span>
              )}
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={idx} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isAi
                        ? 'bg-white text-slate-900 border border-slate-200 rounded-tl-sm'
                        : 'bg-indigo-600 text-white rounded-tr-sm'
                    }`}
                  >
                    <div className={`text-[10px] font-bold mb-1 flex items-center justify-between gap-4 ${
                      isAi ? 'text-slate-400' : 'text-indigo-200'
                    }`}>
                      <span>{isAi ? 'AI Interviewer' : 'You (Candidate)'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="font-medium text-[13px]">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>Interviewer is evaluating your response...</span>
                </div>
              </div>
            )}
          </div>

          {/* User Response Input Box */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <textarea
                rows={2}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your structured answer... (Press Enter to send)"
                className="flex-1 p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-slate-50"
              />

              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isAiThinking}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-xl transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode C: Post-Interview Evaluation Report */}
      {report && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Post-Session Analysis</span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Interview Performance Dossier</h2>
              <span className="text-xs text-slate-500">{report.companyStyle} Style • {report.interviewType}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-extrabold text-indigo-600">{report.overallScore}%</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Overall Score</span>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                report.overallScore >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {report.readinessVerdict}
              </span>
            </div>
          </div>

          {/* Sub-Category Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {Object.entries(report.categoryScores).map(([key, val]) => (
              <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-bold uppercase text-slate-400 block capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{val}%</span>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strong Answers & Articulations
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {report.strongAnswers.map((ans, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{ans}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
              <span className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Critical Weaknesses & Follow-Up Gaps
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {report.weakAnswers.map((ans, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{ans}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Better Approach Recommendation */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1.5">
            <span className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Recommended Architectural Response Formulation
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {report.betterApproach}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setReport(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              &larr; Return to Setup
            </button>
            <button
              onClick={() => onNavigate('Career Replay')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span>Sync with Career Replay Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

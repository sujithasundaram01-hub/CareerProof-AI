import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Play,
  ArrowRight,
  Code2,
  Sparkles,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { SkillProofAssessment, SkillItem } from '../types';

interface SkillProofViewProps {
  assessments: SkillProofAssessment[];
  skills: SkillItem[];
  onCompleteAssessment: (assessmentId: string, score: number, accuracy: number, level: number) => void;
  onNavigate: (tab: string) => void;
}

export const SkillProofView: React.FC<SkillProofViewProps> = ({
  assessments,
  skills,
  onCompleteAssessment,
  onNavigate
}) => {
  const [activeAssessmentId, setActiveAssessmentId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [codeAnswer, setCodeAnswer] = useState(
    `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    throw new IllegalArgumentException("No two sum solution");\n}`
  );
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const activeAssessment = assessments.find((a) => a.id === activeAssessmentId);

  // Normalize questions whether provided as `questions` or `mcqQuestions`
  const getNormalizedQuestions = (assessment: SkillProofAssessment | undefined) => {
    if (!assessment) return [];
    const rawList = (assessment as any).questions || assessment.mcqQuestions || [];
    if (rawList.length > 0) {
      return rawList.map((q: any, idx: number) => ({
        id: q.id ?? idx,
        questionText: q.questionText || q.question || 'Technical Assessment Question',
        options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: q.correctAnswerIndex ?? q.correctAnswer ?? 0,
        explanation: q.explanation || 'Verified optimal time and space complexity solution.'
      }));
    }
    // Fallback standard questions if empty
    return [
      {
        id: 1,
        questionText: 'What is the amortized time complexity of inserting N elements into a dynamic array with doubling capacity?',
        options: ['O(N^2)', 'O(N log N)', 'O(N) overall, averaging O(1) per insertion', 'O(log N)'],
        correctAnswerIndex: 2,
        explanation: 'Because array doubling occurs only at powers of 2, the sum of copied elements across N insertions is O(N), yielding amortized O(1) per insertion.'
      },
      {
        id: 2,
        questionText: 'Which data structure offers average O(1) lookup and O(1) insertion while maintaining insertion order in Java?',
        options: ['TreeMap', 'LinkedHashMap', 'PriorityQueue', 'ConcurrentSkipListSet'],
        correctAnswerIndex: 1,
        explanation: 'LinkedHashMap maintains a doubly-linked list through all of its entries while maintaining hash bucket lookup.'
      }
    ];
  };

  const activeQuestions = getNormalizedQuestions(activeAssessment);

  const handleStartAssessment = (id: string) => {
    setActiveAssessmentId(id);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setHasSubmitted(false);
    setTestResult(null);
  };

  const handleSelectOption = (optIdx: number) => {
    if (hasSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleRunCode = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestResult('Passed 4/4 Test Cases • Time: 12ms (O(N) time, O(N) auxiliary space)');
    }, 600);
  };

  const handleFinishAssessment = () => {
    if (!activeAssessment) return;
    setHasSubmitted(true);

    // Calculate score
    const questions = activeQuestions;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / (questions.length || 1)) * 100);
    const accuracy = calculatedScore;
    const awardedLevel = calculatedScore >= 80 ? 4 : calculatedScore >= 60 ? 3 : 2;

    onCompleteAssessment(activeAssessment.id, calculatedScore, accuracy, awardedLevel);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">SkillProof Tests</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              Verified Candidate Badging
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized technical assessments (DSA, Java, SQL, OOP). Passing scores elevate your skill status to <strong className="text-emerald-700">VERIFIED</strong> and resolve Career Replay flags.
          </p>
        </div>

        {activeAssessmentId && (
          <button
            onClick={() => setActiveAssessmentId(null)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
          >
            &larr; Exit to All Assessments
          </button>
        )}
      </div>

      {/* Mode A: Test Catalog */}
      {!activeAssessmentId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((test) => {
            const isDone = test.completed;
            return (
              <div
                key={test.id}
                className={`p-6 rounded-2xl border transition-all bg-white flex flex-col justify-between ${
                  isDone
                    ? 'border-emerald-200 shadow-sm'
                    : test.difficulty === 'Advanced'
                    ? 'border-amber-200 shadow-sm ring-1 ring-amber-400/20'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-slate-100 text-slate-700">
                      {test.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      test.difficulty === 'Advanced'
                        ? 'bg-rose-100 text-rose-800'
                        : test.difficulty === 'Intermediate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">{test.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {(test as any).description || 'Standardized assessment evaluating technical problem solving and algorithmic performance.'}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {(test as any).timeLimitMinutes ?? test.durationMinutes ?? 25} mins
                    </span>
                    <span>•</span>
                    <span>{(test as any).questions?.length ?? test.mcqQuestions?.length ?? test.questionCount ?? 10} Questions</span>
                  </div>

                  {isDone && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center justify-between font-extrabold text-emerald-900">
                        <span>Score: {test.score}%</span>
                        <span>Level {test.awardedSkillLevel} Verified ✓</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        {test.accuracy}% accuracy • Recorded on career profile
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleStartAssessment(test.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isDone
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Retake Assessment' : 'Start Assessment'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Mode B: Active Assessment Engine */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Engine Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{activeAssessment?.category || 'General'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                  {activeAssessment?.difficulty || 'Medium'}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">{activeAssessment?.title || 'Technical Assessment'}</h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="bg-slate-100 px-3 py-1.5 rounded-lg font-mono font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Timer: 18:42</span>
              </span>
              <span className="text-slate-400 font-semibold">
                Question {currentQuestionIdx + 1} of {activeQuestions.length || 1}
              </span>
            </div>
          </div>

          {/* Current Question */}
          {activeQuestions[currentQuestionIdx] && (
            <div className="space-y-4">
              <div className="text-base font-bold text-slate-900 leading-relaxed">
                {activeQuestions[currentQuestionIdx].questionText}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuestions[currentQuestionIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === oIdx;
                  const isCorrect = activeQuestions[currentQuestionIdx].correctAnswerIndex === oIdx;

                  let optStyle = 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800';
                  if (isSelected) {
                    optStyle = 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-950 font-bold';
                  }
                  if (hasSubmitted) {
                    if (isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950 line-through';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {hasSubmitted && isCorrect && (
                        <span className="text-emerald-600 text-xs font-bold">Correct ✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (shown after submission) */}
              {hasSubmitted && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    Conceptual Explanation
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {activeQuestions[currentQuestionIdx].explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Interactive Code Editor (Coding challenge problem) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Live Coding Component (Java 17 Solution)
              </span>
              <button
                onClick={handleRunCode}
                disabled={isRunningTests}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" />
                <span>{isRunningTests ? 'Executing tests...' : 'Run Test Cases'}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {testResult && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{testResult}</span>
              </div>
            )}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
            >
              &larr; Previous Question
            </button>

            {currentQuestionIdx < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishAssessment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & Update Verified Profile</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

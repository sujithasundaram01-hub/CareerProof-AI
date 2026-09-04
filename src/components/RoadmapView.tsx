import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Clock,
  Calendar,
  Filter,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Circle,
  PlayCircle
} from 'lucide-react';
import { RoadmapTask, UserProfile } from '../types';

interface RoadmapViewProps {
  roadmap: RoadmapTask[];
  user: UserProfile;
  onUpdateTaskStatus: (taskId: string, newStatus: 'Not Started' | 'In Progress' | 'Completed') => void;
  onNavigate: (tab: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  user,
  onUpdateTaskStatus,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const completedCount = roadmap.filter((t) => t.status === 'Completed').length;
  const inProgressCount = roadmap.filter((t) => t.status === 'In Progress').length;
  const progressPercent = Math.round((completedCount / (roadmap.length || 1)) * 100);

  const categories = ['All', 'Topics', 'Coding practice', 'Projects', 'Assessments', 'Revision', 'Interview preparation', 'Retesting'];

  const filteredTasks = roadmap.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Personalized Career Roadmap</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Calibrated: {user.availableStudyHoursPerWeek} hrs/week
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic milestone curriculum prioritized by your mock interview weaknesses and target company hiring bars.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Milestone Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Roadmap Progress</span>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {progressPercent}% Complete • {completedCount} of {roadmap.length} Milestones Achieved
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedCount} Completed
            </span>
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              {inProgressCount} In Progress
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <Circle className="w-3.5 h-3.5" />
              {roadmap.length - completedCount - inProgressCount} Pending
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'Completed';
          const isInProgress = task.status === 'In Progress';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-xl border transition-all bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : isInProgress
                  ? 'border-indigo-300 ring-1 ring-indigo-500/20 shadow-sm'
                  : 'border-slate-200'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => {
                    const next = isDone ? 'Not Started' : isInProgress ? 'Completed' : 'In Progress';
                    onUpdateTaskStatus(task.id, next);
                  }}
                  className="mt-1"
                  title="Click to toggle status"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isInProgress ? (
                    <PlayCircle className="w-5 h-5 text-indigo-600 animate-pulse" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      Week {task.week} • {task.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      Tag: {task.skillTag}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedHours} hrs
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold mt-1.5 ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                    {task.description}
                  </p>
                </div>
              </div>

              {/* Right Action & Status Picker */}
              <div className="flex items-center gap-2.5 self-end md:self-center">
                <select
                  value={task.status}
                  onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as any)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold focus:outline-none ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isInProgress
                      ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed ✓</option>
                </select>

                {task.actionRoute && (
                  <button
                    onClick={() => onNavigate(task.actionRoute!)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Launch {task.actionRoute}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

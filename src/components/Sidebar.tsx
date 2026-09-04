import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GitPullRequest,
  Map,
  FolderGit2,
  Github,
  Award,
  Video,
  Terminal,
  RotateCcw,
  ClipboardList,
  BookOpen,
  User,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  isSpecial?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, isOpen = false, onClose }) => {
  const navItems: { section: string; items: NavItem[] }[] = [
    {
      section: 'OVERVIEW',
      items: [
        { id: 'Dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
        { 
          id: 'Career Replay', 
          label: 'Career Replay', 
          icon: RotateCcw, 
          badge: 'KEY ENGINE', 
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
          isSpecial: true 
        },
      ]
    },
    {
      section: 'ANALYZE & TARGET',
      items: [
        { id: 'Resume', label: 'AI Resume Analyzer', icon: FileText },
        { id: 'Jobs', label: 'AI Job Matcher', icon: Briefcase },
        { id: 'Skill Gap', label: 'Skill Gap Analyzer', icon: GitPullRequest, badge: '2 Critical', badgeColor: 'bg-rose-100 text-rose-700' },
        { id: 'Roadmap', label: 'Career Roadmap', icon: Map },
      ]
    },
    {
      section: 'BUILD & PROVE',
      items: [
        { id: 'Projects', label: 'Project Intelligence', icon: FolderGit2 },
        { id: 'GitHub', label: 'GitHub Intelligence', icon: Github },
        { id: 'SkillProof', label: 'SkillProof Tests', icon: Award, badge: 'Verified', badgeColor: 'bg-emerald-100 text-emerald-700' },
      ]
    },
    {
      section: 'SIMULATE & APPLY',
      items: [
        { id: 'Mock Interview', label: 'AI Mock Interview', icon: Video },
        { id: 'Job Simulation', label: 'Job Simulation', icon: Terminal },
        { id: 'Applications', label: 'Application Tracker', icon: ClipboardList, badge: '3 Active', badgeColor: 'bg-indigo-100 text-indigo-700' },
        { id: 'Interview Playbook', label: 'Interview Playbook', icon: BookOpen },
      ]
    },
    {
      section: 'ACCOUNT',
      items: [
        { id: 'Profile', label: 'Profile & Evidence', icon: User },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] flex flex-col h-screen select-none border-r border-slate-800 transition-transform duration-200 ease-in-out
        md:sticky md:top-0 md:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/30">
              C
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight leading-none">CareerProof AI</h1>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Find the gap. Prove the skill.</p>
            </div>
          </div>

          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {navItems.map((group) => (
            <div key={group.section}>
              <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {group.section}
              </div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (onClose) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all group ${
                        isActive
                          ? item.isSpecial
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-600/15 text-blue-400 font-semibold'
                          : item.isSpecial
                          ? 'text-amber-300/80 hover:bg-slate-800/80 hover:text-amber-200'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105 ${
                            isActive
                              ? item.isSpecial
                                ? 'text-amber-400'
                                : 'text-blue-400'
                              : item.isSpecial
                              ? 'text-amber-500'
                              : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate text-xs">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ${
                            isActive
                              ? 'bg-blue-500/30 text-blue-200'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom User Profile Card */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0b1120]">
          <div 
            onClick={() => {
              onSelectTab('Profile');
              if (onClose) onClose();
            }}
            className="bg-slate-800/60 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 text-xs font-bold">
                AS
              </div>
              <div className="flex-1 overflow-hidden text-left">
                <p className="text-xs font-bold text-white truncate">Arjun Sharma</p>
                <p className="text-[10px] text-slate-400 truncate">SWE Entry Level</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

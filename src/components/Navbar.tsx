import React from 'react';
import { 
  Bell, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  UserCheck,
  Menu
} from 'lucide-react';
import { UserProfile, CareerReadinessScore, NotificationItem } from '../types';

interface NavbarProps {
  user: UserProfile;
  readiness: CareerReadinessScore;
  notifications: NotificationItem[];
  onSelectTab: (tab: string) => void;
  currentTab: string;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  readiness,
  notifications,
  onSelectTab,
  currentTab,
  onToggleMobileMenu
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 transition-all">
      {/* Left: Mobile hamburger menu, focus pill with animated ping & breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Current Focus</span>
          <div 
            onClick={() => onSelectTab('Career Replay')}
            className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100 cursor-pointer hover:bg-amber-100/70 transition-colors"
            title="Active remedial goal identified by Career Replay"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Fix: DSA Explanations
          </div>
        </div>

        <div className="flex md:hidden items-center gap-1.5 truncate">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 truncate">{currentTab}</span>
        </div>
      </div>

      {/* Right: Readiness meter, notification bell, action buttons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Readiness Pill */}
        <button 
          onClick={() => onSelectTab('Dashboard')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium transition-colors"
          title="Overall Career Readiness"
        >
          <span className="text-slate-500 text-[11px] font-bold uppercase">Readiness</span>
          <span className="text-blue-600 font-black">{readiness.overall}%</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Intelligent Alerts ({notifications.length})
                </div>
                <span className="text-xs text-slate-400 font-medium">Real-time sync</span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-xl text-left transition-all ${
                      notif.type === 'critical'
                        ? 'bg-rose-50/80 border border-rose-100 text-rose-950'
                        : notif.type === 'warning'
                        ? 'bg-amber-50/80 border border-amber-100 text-amber-950'
                        : 'bg-slate-50 border border-slate-100 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {notif.type === 'critical' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                        {notif.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                        {notif.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{notif.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                    {notif.actionTab && (
                      <button
                        onClick={() => {
                          onSelectTab(notif.actionTab!);
                          setShowNotifications(false);
                        }}
                        className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        {notif.actionLabel || 'Inspect'} &rarr;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile / Settings Button */}
        <button
          onClick={() => onSelectTab('Profile')}
          className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors hidden sm:block"
        >
          Profile
        </button>

        {/* Sleek Primary Action */}
        <button
          onClick={() => onSelectTab('Career Replay')}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm px-4 py-2 rounded-lg font-semibold shadow-lg shadow-slate-900/20 transition-all flex items-center gap-1.5"
        >
          <span>Run Diagnosis</span>
        </button>
      </div>
    </header>
  );
};

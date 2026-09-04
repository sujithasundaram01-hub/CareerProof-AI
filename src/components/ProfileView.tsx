import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Target,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  LogOut,
  Save,
  KeyRound,
  Sparkles
} from 'lucide-react';
import { UserProfile, SkillItem } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  skills: SkillItem[];
  onUpdateUser: (user: UserProfile) => void;
  onNavigate: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  skills,
  onUpdateUser,
  onNavigate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const claimedCount = skills.filter((s) => s.status === 'CLAIMED').length;
  const demonstratedCount = skills.filter((s) => s.status === 'DEMONSTRATED').length;
  const verifiedCount = skills.filter((s) => s.status === 'VERIFIED').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Candidate Profile & Skill Proof</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              Verified Dossier
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Houses candidate credentials, target role benchmarks, and the three-tier Evidence Matrix (Claimed vs Demonstrated vs Verified).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 p-2 rounded-xl text-xs transition-colors"
            title="Account & Authentication"
          >
            <KeyRound className="w-4 h-4" />
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes successfully synchronized across all platform modules.</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={formData.avatar}
            alt={formData.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/10 shadow-md"
          />

          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{formData.name}</h2>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{formData.email}</span>
                  <span>•</span>
                  <span>{formData.experienceLevel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {formData.targetJobRole}
                </span>
              </div>
            </div>

            {/* Academic & Target Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Education & Degree</span>
                <span className="font-extrabold text-slate-800 text-xs mt-0.5 block">{formData.degree} ({formData.department})</span>
                <span className="text-[11px] text-slate-500">{formData.education} • Class of {formData.graduationYear}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Target Companies</span>
                <span className="font-extrabold text-slate-800 text-xs mt-0.5 block">{formData.targetCompanies.join(', ')}</span>
                <span className="text-[11px] text-slate-500">Tier-1 Product & FinTech</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block">Study Availability</span>
                <span className="font-extrabold text-indigo-600 text-xs mt-0.5 block">{formData.availableStudyHoursPerWeek} Hours / Week</span>
                <span className="text-[11px] text-slate-500">{formData.careerGoal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THREE-TIER EVIDENCE MATRIX (CRITICAL SPEC REQUIREMENT) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Claimed vs. Demonstrated vs. Verified Skill Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict truth-in-credentials protocol. Prevents AI fabrication and distinguishes unverified resume text from proven competence.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              {verifiedCount} Verified (Tests)
            </span>
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
              {demonstratedCount} Demonstrated (Git)
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
              {claimedCount} Claimed (Resume)
            </span>
          </div>
        </div>

        {/* Skills Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">Skill Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Evidence Tier</th>
                <th className="py-2.5 px-3">Current Level</th>
                <th className="py-2.5 px-3">Target Level</th>
                <th className="py-2.5 px-3">Verification Source</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skills.map((s) => {
                const isVerified = s.status === 'VERIFIED';
                const isDemonstrated = s.status === 'DEMONSTRATED';

                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-extrabold text-slate-900">{s.name}</td>
                    <td className="py-3 px-3 text-slate-500">{s.category}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isVerified
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : isDemonstrated
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">Level {s.currentEstimatedLevel}/5</td>
                    <td className="py-3 px-3 font-bold text-indigo-600">Level {s.requiredLevel}/5</td>
                    <td className="py-3 px-3 text-slate-500 font-medium">
                      {s.verifiedScore ? `Score: ${s.verifiedScore}% (${s.sources.join(', ')})` : s.sources.join(', ')}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {!isVerified && (
                        <button
                          onClick={() => onNavigate('SkillProof')}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                        >
                          Verify &rarr;
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auth Modal (Sign Up, Login, Forgot Password) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">
                {authMode === 'login' ? 'Sign In to CareerProof' : authMode === 'signup' ? 'Create Student Account' : 'Reset Password'}
              </span>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {authMode === 'signup' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Arjun Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="arjun.sharma2025@college.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              )}

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs mt-2"
              >
                {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>

              <div className="flex items-center justify-between text-[11px] pt-2 text-slate-500">
                {authMode === 'login' ? (
                  <>
                    <button onClick={() => setAuthMode('forgot')} className="hover:underline">Forgot password?</button>
                    <button onClick={() => setAuthMode('signup')} className="font-bold text-indigo-600 hover:underline">New user? Sign Up</button>
                  </>
                ) : (
                  <button onClick={() => setAuthMode('login')} className="font-bold text-indigo-600 hover:underline">Already registered? Sign In</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

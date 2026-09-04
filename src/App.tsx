import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CareerReplayView } from './components/CareerReplayView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { JobMatcherView } from './components/JobMatcherView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { ProjectsView } from './components/ProjectsView';
import { GitHubView } from './components/GitHubView';
import { SkillProofView } from './components/SkillProofView';
import { MockInterviewView } from './components/MockInterviewView';
import { JobSimulationView } from './components/JobSimulationView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { InterviewPlaybookView } from './components/InterviewPlaybookView';
import { ProfileView } from './components/ProfileView';
import { ErrorBoundary } from './components/ErrorBoundary';

import {
  demoUser,
  demoCareerReadiness,
  demoSkills,
  demoResumeAnalysis,
  demoJobs,
  demoRoadmap,
  demoProjects,
  demoGitHubData,
  demoSkillProofAssessments,
  demoMockInterviews,
  demoJobSimulations,
  demoApplications,
  demoCareerReplay,
  demoNotifications
} from './demoData';
import {
  UserProfile,
  CareerReadinessScore,
  SkillItem,
  ResumeAnalysis,
  JobPosting,
  RoadmapTask,
  ProjectItem,
  GitHubProfileData,
  SkillProofAssessment,
  MockInterviewSession,
  JobSimulationScenario,
  ApplicationRecord,
  CareerReplayReport,
  NotificationItem
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('Dashboard');

  // Central connected state
  const [user, setUser] = useState<UserProfile>(demoUser);
  const [readiness, setReadiness] = useState<CareerReadinessScore>(demoCareerReadiness);
  const [skills, setSkills] = useState<SkillItem[]>(demoSkills);
  const [resume, setResume] = useState<ResumeAnalysis>(demoResumeAnalysis);
  const [jobs, setJobs] = useState<JobPosting[]>(demoJobs);
  const [roadmap, setRoadmap] = useState<RoadmapTask[]>(demoRoadmap);
  const [projects, setProjects] = useState<ProjectItem[]>(demoProjects);
  const [githubData, setGithubData] = useState<GitHubProfileData>(demoGitHubData);
  const [assessments, setAssessments] = useState<SkillProofAssessment[]>(demoSkillProofAssessments);
  const [mockInterviews, setMockInterviews] = useState<MockInterviewSession[]>(demoMockInterviews);
  const [jobSimulations, setJobSimulations] = useState<JobSimulationScenario[]>(demoJobSimulations);
  const [applications, setApplications] = useState<ApplicationRecord[]>(demoApplications);
  const [careerReplay, setCareerReplay] = useState<CareerReplayReport>(demoCareerReplay);
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoNotifications);

  // Recalculate and update readiness whenever user completes actions
  const handleUpdateRoadmapTask = (taskId: string, newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    setRoadmap((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleCompleteAssessment = (assessmentId: string, score: number, accuracy: number, level: number) => {
    const awardedSkillLevel: 'Beginner' | 'Intermediate' | 'Advanced' =
      level >= 4 ? 'Advanced' : level >= 3 ? 'Intermediate' : 'Beginner';

    setAssessments((prev) =>
      prev.map((a) =>
        a.id === assessmentId
          ? { ...a, completed: true, score, accuracy, awardedSkillLevel }
          : a
      )
    );

    // Also update corresponding skill to VERIFIED in central skills matrix
    const targetAssessment = assessments.find((a) => a.id === assessmentId);
    if (targetAssessment) {
      setSkills((prev) =>
        prev.map((s) => {
          if (s.name.toLowerCase().includes(targetAssessment.category.toLowerCase().split(' ')[0])) {
            return {
              ...s,
              status: 'VERIFIED',
              verifiedScore: score,
              currentEstimatedLevel: Math.max(s.currentEstimatedLevel, level),
              gap: Math.max(0, s.requiredLevel - level)
            };
          }
          return s;
        })
      );
    }

    // Bump readiness scores
    setReadiness((prev) => ({
      ...prev,
      skillProof: Math.min(100, prev.skillProof + 8),
      skills: Math.min(100, prev.skills + 5),
      overall: Math.min(100, prev.overall + 4)
    }));
  };

  const handleSaveMockSession = (session: MockInterviewSession) => {
    setMockInterviews((prev) => [session, ...prev]);
    setReadiness((prev) => ({
      ...prev,
      interview: session.overallScore,
      overall: Math.round((prev.overall + session.overallScore) / 2)
    }));
  };

  const handleCompleteSimulation = (scenarioId: string, score: number) => {
    setJobSimulations((prev) =>
      prev.map((s) => (s.id === scenarioId ? { ...s, completed: true, score } : s))
    );
    setReadiness((prev) => ({
      ...prev,
      jobSimulation: Math.min(100, score),
      overall: Math.min(100, prev.overall + 3)
    }));
  };

  const handleAddProject = (project: ProjectItem) => {
    setProjects((prev) => [project, ...prev]);
    setReadiness((prev) => ({
      ...prev,
      projects: Math.min(100, prev.projects + 5),
      overall: Math.min(100, prev.overall + 2)
    }));
  };

  const handleAddApplication = (app: ApplicationRecord) => {
    setApplications((prev) => [app, ...prev]);
  };

  const handleUpdateApplicationStatus = (appId: string, stage: ApplicationRecord['currentStage']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, currentStage: stage } : a))
    );
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <div className="flex flex-1">
        {/* Left Sidebar (Desktop fixed, responsive mobile drawer) */}
        <Sidebar 
          currentTab={currentTab} 
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setMobileNavOpen(false);
          }} 
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            user={user}
            readiness={readiness}
            notifications={notifications}
            onSelectTab={setCurrentTab}
            currentTab={currentTab}
            onToggleMobileMenu={() => setMobileNavOpen((prev) => !prev)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <ErrorBoundary key={currentTab} fallbackViewName={currentTab} onReset={() => setCurrentTab('Dashboard')}>
              {currentTab === 'Dashboard' && (
              <DashboardView
                user={user}
                readiness={readiness}
                skills={skills}
                resume={resume}
                roadmap={roadmap}
                mockInterviews={mockInterviews}
                assessments={assessments}
                applications={applications}
                careerReplay={careerReplay}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Career Replay' && (
              <CareerReplayView
                careerReplay={careerReplay}
                applications={applications}
                skills={skills}
                roadmap={roadmap}
                onUpdateCareerReplay={setCareerReplay}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Resume' && (
              <ResumeAnalyzerView
                resume={resume}
                onUpdateResume={setResume}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Jobs' && (
              <JobMatcherView
                jobs={jobs}
                skills={skills}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Skill Gap' && (
              <SkillGapView
                skills={skills}
                user={user}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Roadmap' && (
              <RoadmapView
                roadmap={roadmap}
                user={user}
                onUpdateTaskStatus={handleUpdateRoadmapTask}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Projects' && (
              <ProjectsView
                projects={projects}
                onAddProject={handleAddProject}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'GitHub' && (
              <GitHubView
                githubData={githubData}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'SkillProof' && (
              <SkillProofView
                assessments={assessments}
                skills={skills}
                onCompleteAssessment={handleCompleteAssessment}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Mock Interview' && (
              <MockInterviewView
                pastSessions={mockInterviews}
                onSaveSession={handleSaveMockSession}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Job Simulation' && (
              <JobSimulationView
                scenarios={jobSimulations}
                onCompleteSimulation={handleCompleteSimulation}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Applications' && (
              <ApplicationTrackerView
                applications={applications}
                onAddApplication={handleAddApplication}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Interview Playbook' && (
              <InterviewPlaybookView
                user={user}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'Profile' && (
              <ProfileView
                user={user}
                skills={skills}
                onUpdateUser={setUser}
                onNavigate={setCurrentTab}
              />
            )}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}

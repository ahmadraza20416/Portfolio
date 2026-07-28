'use client';

import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ScrollProgress from '@/components/public/ScrollProgress';
import Chatbot from '@/components/public/Chatbot';

import HeroSection from '@/components/public/HeroSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import SkillsSection from '@/components/public/SkillsSection';
import ServicesSection from '@/components/public/ServicesSection';
import ProjectEstimator from '@/components/public/ProjectEstimator';
import TechMatrix from '@/components/public/TechMatrix';
import GitHubStatsSection from '@/components/public/GitHubStatsSection';
import LiveApiTester from '@/components/public/LiveApiTester';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import AboutSection from '@/components/public/AboutSection';
import ContactSection from '@/components/public/ContactSection';
import DynamicSectionsRenderer from '@/components/public/DynamicSectionsRenderer';

import FloatingDock from '@/components/shared/FloatingDock';
import CommandKModal from '@/components/shared/CommandKModal';
import ScheduleMeetingModal from '@/components/public/ScheduleMeetingModal';

export default function HomeContent({ profile, navItems, skills, experience, projects, testimonials, dynamicSections }) {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isCommandKOpen, setIsCommandKOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Navbar
        navItems={navItems}
        profile={profile}
        onOpenCommandK={() => setIsCommandKOpen(true)}
      />

      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <HeroSection profile={profile} />

        {/* 2. Career Experience & Track Record */}
        <ExperienceSection experience={experience} />

        {/* 3. Selected Work Projects */}
        <ProjectsSection projects={projects} />

        {/* 4. Tech Stack & Skills */}
        <SkillsSection skills={skills} />

        {/* 5. Services & Solutions */}
        <ServicesSection />

        {/* 6. Interactive Scope & Budget Estimator */}
        <ProjectEstimator />

        {/* 7. Code Quality Guarantees & Stats */}
        <GitHubStatsSection />

        {/* 8. Engineering Comparison Matrix */}
        <TechMatrix />

        {/* 9. Live REST API Developer Sandbox */}
        <LiveApiTester />

        {/* 10. Client Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 11. About Me & Personal Background */}
        <AboutSection profile={profile} />

        {/* 12. Dynamic Admin Sections */}
        <DynamicSectionsRenderer sections={dynamicSections} />

        {/* 13. Contact Form & Action Buttons */}
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
      <Chatbot />

      {/* Floating Glass Action Dock */}
      <FloatingDock
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenMeeting={() => setIsMeetingOpen(true)}
        onOpenCommandK={() => setIsCommandKOpen(true)}
      />

      {/* Spotlight Command Search Modal */}
      <CommandKModal
        isOpen={isCommandKOpen}
        onClose={() => setIsCommandKOpen(false)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* Discovery Strategy Call Booking Modal */}
      <ScheduleMeetingModal
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
      />

      {/* Project Estimator Lightbox Modal */}
      {isEstimatorOpen && (
        <ProjectEstimator isOpen={true} onClose={() => setIsEstimatorOpen(false)} />
      )}
    </>
  );
}

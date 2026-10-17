import { useState, useEffect } from 'react';
import { StoryNavigation } from './common/StoryNavigation';
import { ParticleCanvas } from './common/ParticleCanvas';
import { GoldDivider } from './common/GoldDivider';
import { CompanyEnquiryModal } from './common/CompanyEnquiryModal';

import { Chapter00Search } from './companyChapters/Chapter00Search';
import { Chapter01Problem } from './companyChapters/Chapter01Problem';
import { Chapter02BlindSpot } from './companyChapters/Chapter02BlindSpot';
import { Chapter03Solution } from './companyChapters/Chapter03Solution';
import { Chapter04Evidence } from './companyChapters/Chapter04Evidence';
import { Chapter05Connection } from './companyChapters/Chapter05Connection';
import { Chapter06BuiltForDifferentCompanies } from './companyChapters/Chapter06BuiltForDifferentCompanies';
import { Chapter07FinalReveal } from './companyChapters/Chapter07FinalReveal';

import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from '../motion/lenisManager';

const CHAPTER_TITLES = [
  'THE SEARCH',
  'THE PROBLEM',
  'THE BLIND SPOT',
  'THE SOLUTION',
  'THE EVIDENCE',
  'THE CONNECTION',
  'BUILT FOR DIFFERENT COMPANIES',
  'THE FINAL REVEAL',
];

interface CompaniesPageProps {
  onNavigateToStudents: (targetSection?: string) => void;
  onNavigatePage?: (page: 'home' | 'colleges' | 'companies', targetSection?: string) => void;
}

export function CompaniesPage({ onNavigateToStudents, onNavigatePage }: CompaniesPageProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'startup' | 'enterprise' | 'partner'>('startup');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Initialize smooth scrolling with Lenis
    initSmoothScroll();

    const chapterIds = [
      'chapter-00',
      'chapter-01',
      'chapter-02',
      'chapter-03',
      'chapter-04',
      'chapter-05',
      'chapter-06',
      'chapter-07',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = chapterIds.indexOf(entry.target.id);
            if (index !== -1) {
              setCurrentChapter(index);
            }
          }
        });
      },
      {
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    chapterIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      destroySmoothScroll();
    };
  }, []);

  const handleOpenModal = (type: 'startup' | 'enterprise' | 'partner' = 'startup') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleExploreStory = () => {
    scrollToTarget('#chapter-01', -50);
  };

  const handlePageNavigation = (page: 'home' | 'colleges' | 'companies', targetSection?: string) => {
    if (page === 'colleges' || (page as string) === 'students') {
      onNavigateToStudents(targetSection);
    } else if (page === 'home') {
      if (onNavigatePage) {
        onNavigatePage('home', targetSection);
      } else {
        window.location.href = '/';
      }
    } else {
      if (targetSection && targetSection !== '#chapter-00') {
        scrollToTarget(targetSection, -60);
      } else {
        scrollToTarget('#chapter-00', 0);
      }
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-obsidian)',
        color: 'var(--text-ivory)',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient Gold Particle Dust */}
      <ParticleCanvas />

      {/* Fixed Sticky Header Navigation for Companies */}
      <StoryNavigation
        currentChapter={currentChapter}
        totalChapters={CHAPTER_TITLES.length}
        chapterTitle={CHAPTER_TITLES[currentChapter] || 'TALENT DISCOVERY CHRONICLE'}
        pageMode="companies"
        onNavigatePage={handlePageNavigation}
        onOpenProjectModal={() => handleOpenModal('startup')}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* CHAPTER 00 — THE SEARCH */}
        <Chapter00Search
          onExploreStory={handleExploreStory}
          onOpenCompanyModal={() => handleOpenModal('startup')}
        />

        <GoldDivider />

        {/* CHAPTER 01 — THE PROBLEM */}
        <Chapter01Problem />

        <GoldDivider />

        {/* CHAPTER 02 — THE BLIND SPOT */}
        <Chapter02BlindSpot />

        <GoldDivider />

        {/* CHAPTER 03 — THE SOLUTION */}
        <Chapter03Solution />

        <GoldDivider />

        {/* CHAPTER 04 — THE EVIDENCE */}
        <Chapter04Evidence />

        <GoldDivider />

        {/* CHAPTER 05 — THE CONNECTION */}
        <Chapter05Connection onOpenCompanyModal={() => handleOpenModal('startup')} />

        <GoldDivider />

        {/* CHAPTER 06 — BUILT FOR DIFFERENT COMPANIES */}
        <Chapter06BuiltForDifferentCompanies onOpenCompanyModal={handleOpenModal} />

        <GoldDivider />

        {/* CHAPTER 07 — THE FINAL REVEAL */}
        <Chapter07FinalReveal
          onOpenCompanyModal={() => handleOpenModal('startup')}
          onNavigateToStudents={onNavigateToStudents}
        />
      </main>

      {/* Interactive Company Discovery Modal */}
      <CompanyEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}

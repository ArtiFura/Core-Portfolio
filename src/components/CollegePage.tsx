import { useState, useEffect } from 'react';
import { StoryNavigation } from './common/StoryNavigation';
import { ParticleCanvas } from './common/ParticleCanvas';
import { GoldDivider } from './common/GoldDivider';
import { ProjectModal } from './common/ProjectModal';

import { Chapter00CollegeCover } from './chapters/Chapter00CollegeCover';
import { Chapter01Problem } from './chapters/Chapter01Problem';
import { Chapter02TurningPoint } from './chapters/Chapter02TurningPoint';
import { Chapter03LearnBuildProve } from './chapters/Chapter03LearnBuildProve';
import { Chapter04ProofOfAbility } from './chapters/Chapter04ProofOfAbility';
import { Chapter05Opportunity } from './chapters/Chapter05Opportunity';
import { Chapter06BuiltToScale } from './chapters/Chapter06BuiltToScale';
import { Chapter07Forward } from './chapters/Chapter07Forward';

import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from '../motion/lenisManager';

const CHAPTER_TITLES = [
  'FOR COLLEGES',
  'THE PROBLEM',
  'THE TURNING POINT',
  'LEARN. BUILD. IMPROVE.',
  'PROOF OF ABILITY',
  'POTENTIAL TO OPPORTUNITY',
  'BUILT TO SCALE',
  'FORWARD',
];

export interface CollegePageProps {
  onNavigatePage: (page: 'home' | 'colleges' | 'companies', targetSection?: string) => void;
  onNavigateToCompanies?: (targetSection?: string) => void;
  onNavigateToHome?: () => void;
}

export function CollegePage({
  onNavigatePage,
}: CollegePageProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'college' | 'business' | 'partner'>('college');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Initialize Lenis smooth momentum scrolling synchronized with GSAP ScrollTrigger
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

  const handleOpenModal = (type: 'college' | 'business' | 'partner' = 'college') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleExploreStory = () => {
    scrollToTarget('#chapter-01', -50);
  };

  const handleNavClick = (page: 'home' | 'colleges' | 'companies', targetSection?: string) => {
    if (page !== 'colleges') {
      onNavigatePage(page, targetSection);
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
      {/* Golden Ambient Particle Dust */}
      <ParticleCanvas />

      {/* Fixed Sticky Header Navigation */}
      <StoryNavigation
        currentChapter={currentChapter}
        totalChapters={CHAPTER_TITLES.length}
        chapterTitle={CHAPTER_TITLES[currentChapter] || 'FOR COLLEGES'}
        pageMode="colleges"
        onNavigatePage={handleNavClick}
        onOpenProjectModal={() => handleOpenModal('college')}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* CHAPTER 00 — DEDICATED COLLEGE HERO */}
        <Chapter00CollegeCover
          onExploreStory={handleExploreStory}
          onOpenProjectModal={() => handleOpenModal('college')}
        />

        <GoldDivider />

        {/* CHAPTER 01 — THE PROBLEM */}
        <Chapter01Problem />

        <GoldDivider />

        {/* CHAPTER 02 — THE TURNING POINT */}
        <Chapter02TurningPoint />

        <GoldDivider />

        {/* CHAPTER 03 — LEARN. BUILD. IMPROVE. */}
        <Chapter03LearnBuildProve />

        <GoldDivider />

        {/* CHAPTER 04 — PROOF OF ABILITY */}
        <Chapter04ProofOfAbility />

        <GoldDivider />

        {/* CHAPTER 05 — CONNECTING POTENTIAL TO OPPORTUNITY */}
        <Chapter05Opportunity />

        <GoldDivider />

        {/* CHAPTER 06 — BUILT TO SCALE */}
        <Chapter06BuiltToScale />

        <GoldDivider />

        {/* CHAPTER 07 — FORWARD */}
        <Chapter07Forward onOpenProjectModal={handleOpenModal} />
      </main>

      {/* Interactive Project Discussion Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}

export default CollegePage;

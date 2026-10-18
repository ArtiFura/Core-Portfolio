import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { CollegePage } from './components/CollegePage';
import { CompaniesPage } from './components/CompaniesPage';
import { ComicLightboxProvider } from './components/common/ComicLightboxContext';
import { ComicLightboxModal } from './components/common/ComicLightboxModal';
import { scrollToTarget } from './motion/lenisManager';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type AppPage = 'home' | 'colleges' | 'companies';

function getInitialPage(): AppPage {
  if (typeof window === 'undefined') return 'home';
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '').toLowerCase();
  let path = window.location.pathname.toLowerCase();
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  const hash = window.location.hash.toLowerCase();

  if (
    path.startsWith('/companies') ||
    hash === '#companies' ||
    hash.startsWith('#/companies')
  ) {
    return 'companies';
  }
  if (
    path.startsWith('/colleges') ||
    path.startsWith('/students') ||
    hash === '#colleges' ||
    hash === '#students' ||
    hash.startsWith('#/colleges') ||
    hash.startsWith('#/students')
  ) {
    return 'colleges';
  }
  return 'home';
}

function getPageTitle(page: AppPage): string {
  switch (page) {
    case 'companies':
      return 'ARTIFURA for Companies';
    case 'colleges':
      return 'ARTIFURA for Colleges';
    case 'home':
    default:
      return 'ARTIFURA';
  }
}

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPage);

  useEffect(() => {
    const handleLocationChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      document.title = getPageTitle(page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial document title
    document.title = getPageTitle(getInitialPage());

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (page: AppPage, targetSection?: string) => {
    // Clear and refresh any active ScrollTriggers before transitioning
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    setCurrentPage(page);

    const isHeroTarget = targetSection === '#chapter-00' || targetSection === '#home-hero';
    const hash = targetSection && !isHeroTarget ? targetSection : '';

    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const prefix = base || '';

    if (page === 'companies') {
      window.history.pushState(null, '', prefix + '/companies' + hash);
    } else if (page === 'colleges') {
      window.history.pushState(null, '', prefix + '/colleges' + hash);
    } else {
      window.history.pushState(null, '', (prefix || '') + '/' + hash);
    }

    document.title = getPageTitle(page);

    if (targetSection && !isHeroTarget) {
      setTimeout(() => {
        scrollToTarget(targetSection, -60);
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Refresh ScrollTrigger after DOM repaint
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  return (
    <ComicLightboxProvider>
      {currentPage === 'companies' ? (
        <CompaniesPage
          onNavigatePage={handleNavigate}
          onNavigateToStudents={(section) => handleNavigate('colleges', section)}
        />
      ) : currentPage === 'colleges' ? (
        <CollegePage
          onNavigatePage={handleNavigate}
          onNavigateToCompanies={(section) => handleNavigate('companies', section)}
          onNavigateToHome={() => handleNavigate('home')}
        />
      ) : (
        <HomePage onNavigatePage={handleNavigate} />
      )}
      <ComicLightboxModal />
    </ComicLightboxProvider>
  );
}

export default App;

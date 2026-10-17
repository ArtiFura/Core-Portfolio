import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { scrollToTarget } from '../../motion/lenisManager';
import { useMagnetic } from '../../motion/useMagnetic';
import { ArtifuraSymbol, ArtifuraLambdaGlyph } from '../ArtifuraIntro';
import { ShinyText } from '../reactbits';

export interface StoryNavigationProps {
  currentChapter?: number;
  totalChapters?: number;
  chapterTitle?: string;
  pageMode?: 'home' | 'colleges' | 'companies' | 'students';
  onNavigatePage?: (page: 'home' | 'colleges' | 'companies', targetSection?: string) => void;
  onOpenProjectModal: () => void;
}

interface NavLinkItem {
  id: string;
  name: string;
  href: string;
  isActive: boolean;
  isPageSwitch: boolean;
  targetPage?: 'home' | 'colleges' | 'companies';
  targetSection?: string;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentChapter: _currentChapter = 0,
  pageMode = 'home',
  onNavigatePage,
  onOpenProjectModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const magneticBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.22, maxDistance: 8 });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 40);

          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (maxScroll > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCollegeMode = pageMode === 'colleges' || pageMode === 'students';
  const isCompanyMode = pageMode === 'companies';
  const isHomeMode = pageMode === 'home';

  const basePrefix = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  // Focused 4-Link Navigation Bar: HOME, FOR COLLEGE, FOR COMPANIES, CONTACT
  const navLinks: NavLinkItem[] = [
    {
      id: 'home',
      name: 'HOME',
      href: basePrefix ? `${basePrefix}/` : '/',
      isActive: isHomeMode,
      isPageSwitch: !isHomeMode,
      targetPage: 'home',
      targetSection: '#home-hero',
    },
    {
      id: 'college',
      name: 'FOR COLLEGE',
      href: `${basePrefix}/colleges`,
      isActive: isCollegeMode,
      isPageSwitch: !isCollegeMode,
      targetPage: 'colleges',
      targetSection: '#chapter-00',
    },
    {
      id: 'companies',
      name: 'FOR COMPANIES',
      href: `${basePrefix}/companies`,
      isActive: isCompanyMode,
      isPageSwitch: !isCompanyMode,
      targetPage: 'companies',
      targetSection: '#chapter-00',
    },
    {
      id: 'contact',
      name: 'CONTACT',
      href: isHomeMode ? '#contact-section' : '#chapter-07',
      isActive: false,
      isPageSwitch: false,
      targetSection: isHomeMode ? '#contact-section' : '#chapter-07',
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isPageSwitch?: boolean,
    targetPage?: 'home' | 'colleges' | 'companies',
    targetSection?: string
  ) => {
    e.preventDefault();
    if (isPageSwitch && targetPage && onNavigatePage) {
      onNavigatePage(targetPage, targetSection);
    } else if (targetSection) {
      const el = document.querySelector(targetSection);
      if (el) {
        scrollToTarget(targetSection, -60);
      } else {
        onOpenProjectModal();
      }
    } else {
      scrollToTarget(href, -60);
    }
  };

  const getCtaLabel = () => {
    if (isCompanyMode) return 'HIRE TALENT';
    if (isCollegeMode) return 'CAMPUS PILOT';
    return 'DISCUSS PROJECT';
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? 'rgba(8, 8, 8, 0.94)'
            : 'linear-gradient(180deg, rgba(8, 8, 8, 0.92) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(212, 175, 55, 0.22)'
            : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isScrolled ? '12px 24px' : '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'padding 0.3s ease',
          }}
        >
          {/* Brand Wordmark (Left) */}
          <a
            href={basePrefix ? `${basePrefix}/` : '/'}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigatePage) {
                onNavigatePage('home', '#home-hero');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            title="Artifura Home"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '34px',
                position: 'relative',
              }}
            >
              <ArtifuraSymbol
                style={{
                  height: '28px',
                  width: 'auto',
                  filter: 'drop-shadow(0 0 12px rgba(255, 212, 87, 0.55))',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
              <span
                className="wordmark-shine"
                style={{
                  fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                  color: '#f0efea',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  textTransform: 'uppercase',
                }}
              >
                RTIFUR
                <ArtifuraLambdaGlyph
                  style={{
                    height: '0.88em',
                    width: 'auto',
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--gold-bright)',
                  letterSpacing: '0.14em',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                <ShinyText text="LMS" speed={2.5} shineColor="#fff" color="var(--gold-bright)" glow={0.5} />
              </span>
            </div>
          </a>

          {/* Minimal Navigation Links (Desktop: HOME, FOR COLLEGE, FOR COMPANIES, CONTACT) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="nav-links-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) =>
                  handleNavClick(
                    e,
                    link.href,
                    link.isPageSwitch,
                    link.targetPage,
                    link.targetSection
                  )
                }
                className={`nav-link-item ${link.isActive ? 'active' : ''}`}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: link.isActive ? 700 : 500,
                  letterSpacing: '0.14em',
                  color: link.isActive ? 'var(--gold-bright)' : 'var(--text-muted)',
                  borderBottom: link.isActive
                    ? '2px solid var(--gold-bright)'
                    : '2px solid transparent',
                  transition: 'all 0.25s ease',
                  padding: '6px 2px',
                  cursor: 'pointer',
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button (Desktop Magnetic Primary CTA) & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              ref={magneticBtnRef}
              onClick={onOpenProjectModal}
              className="btn-gold-primary gold-sweep-active"
              style={{
                padding: '9px 18px',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <ShinyText text={getCtaLabel()} speed={3} shineColor="#ffffff" color="#080808" glow={0.4} />
              <ArrowUpRight size={14} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                background: 'rgba(20, 20, 20, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--gold-bright)',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Story Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.05)',
            position: 'relative',
          }}
        >
          <div
            className="progress-bar-shimmer"
            style={{
              height: '100%',
              width: `${scrollProgress}%`,
              boxShadow: '0 0 10px rgba(245, 215, 110, 0.9)',
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 8, 8, 0.98)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            borderBottom: '2px solid var(--gold-primary)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--gold-antique)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              marginBottom: '32px',
            }}
          >
            NAVIGATION // ARTIFURA LMS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(
                    e,
                    link.href,
                    link.isPageSwitch,
                    link.targetPage,
                    link.targetSection
                  );
                }}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: link.isActive ? 'var(--gold-bright)' : 'var(--text-ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                  cursor: 'pointer',
                }}
              >
                <span>
                  0{idx + 1}. {link.name}
                </span>
                <ArrowUpRight size={18} color="var(--gold-primary)" />
              </a>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="btn-gold-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              {getCtaLabel()}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .nav-links-desktop {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

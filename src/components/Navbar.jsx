import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const CONTACT_MAILTO = (email) =>
  `mailto:${email}?subject=Business Connection – Portfolio&body=Hello Mr. Mohamed Rafi,%0D%0A%0D%0AI came across your executive portfolio and would like to connect to discuss potential synergy and opportunities.%0D%0A%0D%0ALooking forward to hearing from you.%0D%0ABest Regards,`;

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const MOBILE_LINK_VARIANTS = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const tickingRef = useRef(false);
  const { portfolioMode, setPortfolioMode } = usePortfolio();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav className={`fixed top-0 left-0 w-full transition-all duration-300 py-2.5 sm:py-3 px-4 sm:px-6 ${isOpen ? 'z-[100]' : 'z-50'}`}>
      {/* Floating Capsule Nav Container */}
      <div 
        className={`max-w-5xl mx-auto px-6 md:px-8 py-3 rounded-full flex justify-between items-center transition-all duration-500 border ${
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-gold-primary/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)] scale-[0.98]' 
            : 'bg-slate-dark/40 backdrop-blur-md border-gold-primary/10'
        }`}
      >
        {/* Left Logo Name - w-auto shrink-0 to prevent taking unnecessary space */}
        <div className="w-auto shrink-0 flex justify-start">
          <a href="#home" className="text-slate-50 text-base sm:text-lg font-black tracking-tight whitespace-nowrap group text-left">
            <span className="inline md:hidden">
              <span className="bg-gradient-to-r from-amber-500 to-gold-primary bg-clip-text text-transparent">Rafi</span>
              <span className="text-gold-primary">.</span>
            </span>
            <span className="hidden md:inline">
              <span>Mohamed</span>
              <span className="bg-gradient-to-r from-amber-500 to-gold-primary bg-clip-text text-transparent group-hover:brightness-110 ml-1">
                Rafi
              </span>
              <span className="text-gold-primary">.</span>
            </span>
          </a>
        </div>

        {/* Center Nav Links - flex-1 align-center to consume all available space and center links */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="flex items-center space-x-3.5 lg:space-x-5 xl:space-x-6 text-[10px] lg:text-xs">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  className={`relative group font-bold tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? 'text-gold-primary' : 'text-slate-350 hover:text-slate-50'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-gold-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right CTA + Theme Toggle - w-auto shrink-0 to fit content exactly */}
        <div className="hidden md:flex w-auto shrink-0 justify-end items-center space-x-2.5 lg:space-x-3">
          {/* Mode Switcher */}
          <div className="flex bg-slate-900 border border-gold-primary/20 rounded-full p-0.5 text-[9px] lg:text-[10px] shrink-0">
            <button
              onClick={() => setPortfolioMode('logistics')}
              className={`px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                portfolioMode === 'logistics'
                  ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              Logistics
            </button>
            <button
              onClick={() => setPortfolioMode('hr')}
              className={`px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                portfolioMode === 'hr'
                  ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              HR
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 lg:p-2 rounded-full border border-gold-primary/20 hover:border-gold-primary/50 text-gold-primary hover:bg-gold-primary/10 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <a
            href={CONTACT_MAILTO(personalInfo.emails.primary)}
            className="hidden lg:inline-flex relative overflow-hidden px-4 py-1.5 lg:px-5 lg:py-2 rounded-full bg-slate-900 border border-gold-primary/30 text-gold-primary font-bold text-[10px] lg:text-xs uppercase tracking-wider hover:border-gold-primary hover:bg-gold-primary hover:text-black transition-all duration-300 backdrop-blur-md hire-shine cursor-pointer shadow-sm shrink-0"
          >
            <span className="relative z-10">Contact Me</span>
          </a>
        </div>

        {/* Mobile Controls - visible under md */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mode Switcher */}
          <div className="flex bg-slate-900 border border-gold-primary/20 rounded-full p-0.5 text-[9px] mr-1">
            <button
              onClick={() => setPortfolioMode('logistics')}
              className={`px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                portfolioMode === 'logistics'
                  ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              Logistics
            </button>
            <button
              onClick={() => setPortfolioMode('hr')}
              className={`px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                portfolioMode === 'hr'
                  ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              HR
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-gold-primary/20 text-gold-primary hover:bg-gold-primary/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <button onClick={toggleMenu} className="text-slate-50 focus:outline-none p-1.5 cursor-pointer" aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-4 right-4 mt-2 overflow-hidden bg-slate-950/95 backdrop-blur-xl shadow-2xl border border-gold-primary/20 rounded-3xl z-[60]"
          >
            <div className="flex flex-col px-6 py-5 space-y-4 text-left">
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  variants={MOBILE_LINK_VARIANTS}
                  href={href}
                  onClick={closeMenu}
                  className="text-slate-300 hover:text-gold-primary font-bold text-base border-b border-slate-900 pb-2 transition-colors uppercase tracking-wider text-left"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div variants={MOBILE_LINK_VARIANTS} className="pt-2">
                <a
                  href={CONTACT_MAILTO(personalInfo.emails.primary)}
                  onClick={closeMenu}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-bold uppercase tracking-wider hover:brightness-110 transition-all w-full text-center shadow-lg cursor-pointer"
                >
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hire-shine::before {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
        }
        .hire-shine:hover::before { left: 130%; }
      `}</style>
    </nav>
  );
};

export default Navbar;
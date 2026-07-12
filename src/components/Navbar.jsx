import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolioData';
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

  const handleNavLinkClick = useCallback((e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90; // Spacing for navigation capsule height and spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  }, []);

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
          <a 
            href="#home" 
            onClick={(e) => handleNavLinkClick(e, '#home')}
            className="text-slate-50 text-base sm:text-lg font-black tracking-tight whitespace-nowrap group text-left"
          >
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
                  onClick={(e) => handleNavLinkClick(e, href)}
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
        <div className="md:hidden flex items-center space-x-3.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gold-primary/20 text-gold-primary hover:bg-gold-primary/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
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

          <button 
            onClick={toggleMenu} 
            className="text-slate-50 focus:outline-none p-1.5 cursor-pointer relative z-[100]" 
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="md:hidden fixed inset-0 z-[98] bg-black/75 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sliding Right-side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="md:hidden fixed top-0 right-0 h-full w-[80vw] max-w-[300px] z-[99] bg-slate-950/98 border-l border-gold-primary/20 shadow-2xl p-6 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-5 border-b border-gold-primary/10 mt-2">
              <a 
                href="#home" 
                onClick={(e) => handleNavLinkClick(e, '#home')} 
                className="text-slate-50 text-base font-black tracking-tight uppercase text-left"
              >
                Mohamed<span className="text-gold-primary"> Rafi</span>.
              </a>
              <button 
                onClick={closeMenu} 
                className="w-8 h-8 rounded-full border border-gold-primary/20 hover:border-gold-primary/50 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 py-6 flex flex-col space-y-3.5 text-left overflow-y-auto scrollbar-none">
              {NAV_LINKS.map(({ label, href }, index) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <motion.a
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    href={href}
                    onClick={(e) => handleNavLinkClick(e, href)}
                    className={`relative flex items-center gap-3 py-2.5 px-4 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-gold-primary/10 border-gold-primary/30 text-gold-primary shadow-sm'
                        : 'border-transparent text-slate-350 hover:bg-slate-900/30 hover:text-slate-50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold-primary scale-110 animate-pulse' : 'bg-slate-700'}`} />
                    <span>{label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Drawer Switcher & Footer */}
            <div className="pt-5 border-t border-gold-primary/10 flex flex-col gap-4">
              {/* Mobile Mode Switcher inside menu */}
              <div className="flex justify-between items-center bg-slate-900 border border-gold-primary/15 rounded-xl p-1 w-full text-[10px]">
                <button
                  onClick={() => { setPortfolioMode('logistics'); closeMenu(); }}
                  className={`flex-1 py-2 rounded-lg font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    portfolioMode === 'logistics'
                      ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-slate-50'
                  }`}
                >
                  Logistics
                </button>
                <button
                  onClick={() => { setPortfolioMode('hr'); closeMenu(); }}
                  className={`flex-1 py-2 rounded-lg font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    portfolioMode === 'hr'
                      ? 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black shadow-md'
                      : 'text-slate-400 hover:text-slate-50'
                  }`}
                >
                  HR
                </button>
              </div>

              {/* Contact CTA */}
              <a
                href={CONTACT_MAILTO(personalInfo.emails.primary)}
                onClick={closeMenu}
                className="w-full text-center py-3 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-black uppercase tracking-widest text-[10px] hover:brightness-110 shadow-lg cursor-pointer"
              >
                Contact Me
              </a>

              {/* Social Quick bar */}
              <div className="flex justify-center items-center gap-6 mt-1 mb-2">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-primary transition-all" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href={`tel:${personalInfo.phone}`} className="text-slate-400 hover:text-gold-primary transition-all" aria-label="Phone Call">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-primary transition-all" aria-label="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.97 4.463-9.97 9.97 0 1.936.556 3.737 1.517 5.263l-1.559 4.767 4.908-1.501c1.47.887 3.189 1.401 5.104 1.401 5.507 0 9.97-4.464 9.97-9.97S17.519 2 12.012 2zm5.726 13.916c-.244.686-1.22 1.25-1.921 1.332-.475.057-1.096.09-3.21-.79-2.704-1.123-4.437-3.87-4.57-4.048-.135-.178-1.096-1.457-1.096-2.78 0-1.323.693-1.97.94-2.234.24-.265.53-.332.709-.332.179 0 .358.001.512.008.16.007.375-.06.586.446.216.517.739 1.802.802 1.93.064.127.106.275.021.442-.083.167-.127.275-.254.422-.128.147-.267.33-.383.442-.128.127-.26.265-.11.52.148.252.658 1.082 1.411 1.751.973.864 1.794 1.134 2.048 1.265.254.13.404.111.554-.06.149-.17.637-.738.807-1.006.17-.266.339-.222.57-.137.234.086 1.488.702 1.743.83.254.127.424.192.488.3.063.109.063.633-.18 1.319z"/>
                  </svg>
                </a>
              </div>
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
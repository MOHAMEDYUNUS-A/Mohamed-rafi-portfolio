import React from 'react';
import { logisticsData, hrData, socialLinks } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const LinkedInIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LINK_VARIANTS = {
  outline: 'bg-slate-900 border border-gold-primary/30 text-slate-300 hover:bg-gold-primary hover:text-black hover:border-gold-primary shadow-sm',
  primary: 'bg-gradient-to-r from-amber-600 to-gold-primary text-black font-black hover:brightness-110 shadow-md',
  disabled: 'bg-slate-900/40 text-slate-600 border border-slate-900/30 cursor-not-allowed',
};

const ProjectLink = ({ href, label, icon, variant, disabled }) => (
  <a
    href={disabled ? undefined : href}
    target={disabled ? undefined : '_blank'}
    rel={disabled ? undefined : 'noopener noreferrer'}
    aria-disabled={disabled || undefined}
    className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${LINK_VARIANTS[disabled ? 'disabled' : variant]}`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const getProjectLinks = (project) => {
  const links = [];

  if (project.links.linkedin) {
    links.push({
      key: 'linkedin',
      href: project.links.linkedin,
      label: 'Case Study',
      icon: <LinkedInIcon />,
      variant: 'primary',
    });
  }

  if (project.links.demo) {
    links.push({
      key: 'demo',
      href: project.links.demo,
      label: 'Portal',
      icon: <ExternalLinkIcon />,
      variant: 'outline',
    });
  }

  return links;
};

const ProjectCard = ({ project, index }) => (
  <div
    data-aos="reveal-up"
    data-aos-delay={index * 100}
    className="group relative bg-slate-950/60 backdrop-blur-md border border-gold-primary/10 hover:border-gold-primary/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 hover:bg-slate-950/95 hover:shadow-[0_20px_50px_rgba(226,184,87,0.06)] transition-all duration-500 relative overflow-hidden"
  >
    {/* Soft auroral glow behind card corner */}
    <div className="absolute -top-12 -right-12 w-28 h-28 bg-gold-primary/0 group-hover:bg-gold-primary/5 rounded-full blur-2xl pointer-events-none transition-colors duration-500" />

    <div>
      {/* Top Header Badge & Number Row */}
      <div className="flex justify-between items-center mb-6">
        {project.badge && (
          <span className="inline-block text-[9px] font-black tracking-widest uppercase text-gold-primary bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/20 select-none">
            {project.badge}
          </span>
        )}
        <span className="text-4xl font-black text-gold-primary/10 group-hover:text-gold-primary/25 font-serif italic select-none transition-colors duration-300">
          {project.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-black text-slate-50 group-hover:text-gold-primary transition-colors tracking-tight mb-4 text-left">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-slate-350 text-sm leading-relaxed mb-6 font-semibold text-left">
        {project.description}
      </p>
    </div>

    <div>
      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[10px] font-bold text-slate-300 bg-slate-900 rounded-full border border-gold-primary/10 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3.5 pt-4 border-t border-gold-primary/10">
        {getProjectLinks(project).map(({ key, ...linkProps }) => (
          <ProjectLink key={key} {...linkProps} />
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { portfolioMode } = usePortfolio();
  const projects = portfolioMode === 'logistics' ? logisticsData.projects : hrData.projects;
  return (
    <section
      id="projects"
      className="bg-slate-secondary pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10 bg-[linear-gradient(to_right,#e2b85702_1px,transparent_1px),linear-gradient(to_bottom,#e2b85702_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      {/* Ambient glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none projects-orb" />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none projects-orb"
        style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="reveal-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Operations Records
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-50 tracking-tight mb-4 uppercase">
            High-Value Operations & Facilitations
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A curated dashboard of chemical logistics, intralogistics plant automation, and custom supply chain operations successfully directed in Saudi Arabia.
          </p>
        </div>

        {/* Project Grid Layout - redesigned for dashboard presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* LinkedIn Connection CTA */}
        <div data-aos="reveal-up" data-aos-delay="300" className="mt-16 flex justify-center">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-gold-primary/20 text-slate-50 font-bold text-base hover:bg-gold-primary hover:text-black hover:border-gold-primary hover:shadow-[0_0_30px_rgba(226,184,87,0.25)] transition-all duration-500 group cursor-pointer"
          >
            <LinkedInIcon />
            <span>Explore My LinkedIn Case Studies</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .projects-orb { animation: projects-orb-drift 15s ease-in-out infinite; }
        @keyframes projects-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .projects-orb { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
import React from 'react';
import { projects, socialLinks } from '../data/portfolioData';

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// Shared visual variants for every project action button, so each link only
// needs to declare *which* style it wants instead of repeating the classes.
const LINK_VARIANTS = {
  outline: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
  outlineSoft: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
  primary:
    'bg-gradient-to-r from-[#6d5bf5] to-[#22d3ee] text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(139,108,247,0.45)]',
  disabled: 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed',
};

const ProjectLink = ({ href, label, icon, variant, disabled }) => (
  <a
    href={disabled ? undefined : href}
    target={disabled ? undefined : '_blank'}
    rel={disabled ? undefined : 'noopener noreferrer'}
    aria-disabled={disabled || undefined}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${LINK_VARIANTS[disabled ? 'disabled' : variant]}`}
  >
    {icon}
    {label}
  </a>
);

// Builds the list of action buttons for a project from whichever link fields
// are actually present — the JSX below just maps over this, instead of four
// hand-written conditional blocks.
const getProjectLinks = (project) => {
  const links = [];

  if (project.links.github) {
    links.push({ key: 'github', href: project.links.github, label: 'GitHub', icon: <GitHubIcon />, variant: 'outline' });
  }

  if (project.links.demo !== undefined) {
    links.push({
      key: 'demo',
      href: project.links.demo || '#',
      label: project.links.demo ? 'Live Demo' : 'Demo Coming Soon',
      icon: <ExternalLinkIcon />,
      variant: 'primary',
      disabled: !project.links.demo,
    });
  }

  if (project.links.frontendDemo) {
    links.push({
      key: 'frontendDemo',
      href: project.links.frontendDemo,
      label: 'Frontend Demo',
      icon: <ExternalLinkIcon />,
      variant: 'primary',
    });
  }

  if (project.links.backendApi) {
    links.push({
      key: 'backendApi',
      href: project.links.backendApi,
      label: 'Backend API',
      icon: <ExternalLinkIcon />,
      variant: 'outlineSoft',
    });
  }

  return links;
};

const ProjectCard = ({ project, aosDelay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={aosDelay}
    className={`relative rounded-2xl p-[1px] group transition-all duration-500 hover:-translate-y-1 ${
      project.isFlagship
        ? 'bg-gradient-to-br from-[#8b6cf7]/50 via-white/10 to-[#22d3ee]/30 hover:from-[#8b6cf7] hover:via-[#22d3ee]/40 hover:to-[#8b6cf7]/60'
        : 'bg-white/10 hover:bg-white/20'
    }`}
  >
    <div
      className={`rounded-2xl p-6 md:p-8 h-full backdrop-blur-md transition-all duration-500 ${
        project.isFlagship ? 'bg-[#0f0f14]/95 group-hover:bg-[#0f0f14]/90' : 'bg-[#111117]/90 group-hover:bg-[#111117]/80'
      }`}
    >
      {/* Badge */}
      {project.badge && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#8b6cf7] bg-[#8b6cf7]/10 px-3 py-1 rounded-full border border-[#8b6cf7]/20 mb-4">
          {project.badge}
        </span>
      )}

      {/* Number + Title */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-5xl font-black text-white/10 font-serif italic">{project.number}</span>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.title}</h3>
      </div>

      {/* Description */}
      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-2xl font-medium">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-bold text-white/70 bg-white/5 rounded-full border border-white/10 hover:bg-[#22d3ee]/20 hover:border-[#22d3ee]/30 hover:text-[#7dd8ea] transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons — data-driven, see getProjectLinks() */}
      <div className="flex flex-wrap gap-3">
        {getProjectLinks(project).map(({ key, ...linkProps }) => (
          <ProjectLink key={key} {...linkProps} />
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-[#0a0a12] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      {/* Ambient glow accents — ties this section back to the rest of the site */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#6d5bf5]/10 rounded-full blur-[120px] pointer-events-none projects-orb" />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[120px] pointer-events-none projects-orb"
        style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-8 shadow-sm bg-white/5 backdrop-blur-sm">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Work that speaks <br className="hidden md:block" />
            for itself
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg font-medium leading-relaxed">
            A selection of projects that showcase my expertise in full-stack development and modern architecture.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} aosDelay={(index + 1) * 100} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-16 flex justify-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white hover:text-black hover:border-[#8b6cf7]/40 hover:shadow-[0_0_30px_rgba(139,108,247,0.25)] transition-all duration-500 group"
          >
            <GitHubIcon />
            Explore All My Repositories
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
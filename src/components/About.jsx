import React from 'react';
import stackImage from '../assets/about/yusuf-avatar.png';
import { aboutContent } from '../data/portfolioData';

// --- Tech stack icons ---------------------------------------------------
// Each icon is just its raw <svg> markup; a single TechIcon wrapper below
// handles the shared layout, label, and hover treatment so we don't repeat
// the same markup three times.

const javaSvg = (
  <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
    <path fill="#EA2D2E" d="M47.617 98.12c-19.192 5.362 11.677 16.439 36.115 5.969-4.003-1.556-6.874-3.391-6.874-3.391-10.897 5.163-31.934 2.759-25.932-2.097 4.501-3.631 0 0-3.309-.481zM65.856 86.36c-11.756 6.392-26.996 7.086-18.907 1.186 0 0-7.915 5.163-16.747 9.202 0 0-2.31 2.259 8.003 2.981 17.168 1.199 43.879-.749 45.026-8.065 0 0 1.243-3.178-17.375-5.304z" />
    <path fill="#EA2D2E" d="M83.528 71.122s5.58 5.784-6.154 10.372c-22.342 8.725-46.496.666-29.911-6.023 6.238-2.515 9.738-2.728 9.738-2.728s-3.397-2.4-11.715 2.103c-24.692 13.36 11.12 19.441 39.654 8.366 5.363-2.077 8.162-5.965 8.162-5.965-.001.001-9.774-6.125-9.774-6.125zM91.625 96.106c-.198.395-.461.781-.791 1.159 0 0 13.189-3.404 8.545-11.964-4.591-8.454-8.145-12.625 10.927-27.179 0 0-29.855 7.447-18.681 37.984z" />
    <path fill="#EA2D2E" d="M76.203 0s11.752 11.752-11.146 29.835c-18.359 14.499-4.187 22.754-.005 32.198-10.7-9.662-18.555-18.159-13.29-26.074C59.003 24.494 80.823 18.793 76.203 0zM66.414 113.085c21.023 1.345 53.358-.745 54.156-10.672 0 0-1.473 3.777-17.441 6.776-18.02 3.384-40.215 2.988-53.367.819 0 .001 2.695 2.228 16.652 3.077z" />
  </svg>
);

const springBootSvg = (
  <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
    <path fill="#6DB33F" d="M116.452 6.643a59.104 59.104 0 01-6.837 12.136A64.249 64.249 0 0064.205-.026C28.984-.026 0 28.958 0 64.179c0 35.22 28.984 64.205 64.205 64.205 35.221 0 64.179-28.985 64.179-64.205 0-10.632-2.624-20.672-7.26-29.508a59.03 59.03 0 01-4.672-8.028zm-53.478 99.75c-23.407 0-42.392-18.985-42.392-42.393 0-23.407 18.985-42.392 42.392-42.392 4.016 0 7.907.563 11.591 1.607l-4.756 8.229a34.498 34.498 0 00-6.835-.683c-19.152 0-34.673 15.521-34.673 34.673 0 19.153 15.521 34.674 34.673 34.674 12.322 0 23.146-6.443 29.29-16.146l7.621 4.397c-7.966 12.614-22.043 20.984-37.911 20.034z" />
    <path fill="#6DB33F" d="M96.118 56.392l-32.22 18.604-8.816-15.273 32.221-18.604z" />
  </svg>
);

const mernSvg = (
  <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
    <g stroke="#00d8ff" strokeWidth="4.5" fill="none" transform="translate(10, 10)">
      <ellipse cx="54" cy="54" rx="16" ry="46" transform="rotate(30 54 54)" />
      <ellipse cx="54" cy="54" rx="16" ry="46" transform="rotate(90 54 54)" />
      <ellipse cx="54" cy="54" rx="16" ry="46" transform="rotate(150 54 54)" />
      <circle cx="54" cy="54" r="7" fill="#00d8ff" />
    </g>
    <path
      fill="#439934"
      opacity="0.9"
      d="M36 84c-3-6-4-15 0-22 3 7 9 10 10 15 2 1.5 1 3-2 5l-8 2zm4-25c2 4 4 11 0 16-1-5-6-8-7-12-2-1-1-3 2-4l5 0z"
    />
    <path
      fill="#339933"
      opacity="0.9"
      d="M98 32l-12-7-12 7v14l12 7 12-7V32zm-12 1.5l8 4.6v9.3l-8 4.6-8-4.6v-9.3l8-4.6z"
    />
  </svg>
);

// Data-driven list — add/remove a stack entry here without touching any markup.
const techStack = [

];

const TechIcon = ({ label, icon, delay, floatDelay }) => (
  <div
    data-aos="zoom-in"
    data-aos-delay={delay}
    className="icon-float flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl"
    style={{ animationDelay: `${floatDelay}s` }}
  >
    {icon}
    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{label}</span>
  </div>
);

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden font-sans pt-20 pb-40 px-6 md:px-12 bg-gradient-to-br from-[#4338ca] via-[#6d5bf5] to-[#22b8cf]"
    >
      {/* Premium Diagonal grid/stripe accent pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.012)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.012)_50%,rgba(255,255,255,0.012)_75%,transparent_75%,transparent)] bg-[size:30px_30px] pointer-events-none" />

      {/* Ambient glow accents to tie the section back to the hero's palette */}
      <div className="glow-orb absolute -top-1/3 -right-1/4 w-[60%] h-[60%] pointer-events-none rounded-full blur-[130px] opacity-25 bg-[#22d3ee] z-0" />
      <div
        className="glow-orb absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] pointer-events-none rounded-full blur-[130px] opacity-20 bg-[#8b6cf7] z-0"
        style={{ animationDelay: '-4s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start relative z-10">
        {/* Left Side: ID Badge with Left-Reveal animation */}
        <div data-aos="fade-right" data-aos-delay="100" className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div className="id-badge relative flex justify-center w-full" style={{ transformOrigin: 'top center' }}>
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black/80 transform -translate-x-1/2 shadow-inner z-0" />
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-200 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]" />

            {/* Badge Card with Holographic glow and corporate design */}
            <div className="bg-gray-950 w-full max-w-[280px] rounded-2xl p-4 shadow-[0_25px_60px_rgba(10,5,30,0.65)] border border-[#8b6cf7]/40 relative z-20 overflow-hidden flex flex-col items-center">
              
              {/* Holographic glowing stripes */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#22d3ee]/10 blur-xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#8b6cf7]/10 blur-xl pointer-events-none" />

              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-950 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center border-t border-x border-[#8b6cf7]/30">
                <div className="w-8 h-2 bg-black/50 rounded-full shadow-inner" />
              </div>
              
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/10 shadow-inner mt-2 mb-4">
                <img
                  src={stackImage}
                  alt="Mohamed Yunus — AI & Data Science"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* ID Details */}
              <div className="w-full flex flex-col items-center text-center font-mono">
                <h4 className="text-white font-black tracking-wider text-[13px] uppercase">
                  Mohamed Yunus A
                </h4>
                <p className="text-[#8b6cf7] text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  AI & Full Stack Engineer
                </p>

                {/* Simulated Barcode Scanner */}
                <div className="mt-4 w-full flex flex-col items-center gap-1.5 opacity-85">
                  <div className="flex items-center gap-[2.2px] h-6 w-fit bg-white/5 px-2 py-1 rounded-sm">
                    <div className="w-[1px] h-full bg-white/70" />
                    <div className="w-[2px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/70" />
                    <div className="w-[3px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/40" />
                    <div className="w-[2px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/70" />
                    <div className="w-[4px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[2px] h-full bg-white/70" />
                    <div className="w-[1px] h-full bg-white/70" />
                  </div>
                  <span className="text-[7.5px] text-white/45 tracking-[0.25em]">ID: 9360461743</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Info Content with Right-Reveal animation */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            {aboutContent.heading}
          </h2>
          <p
            className="text-lg font-bold mb-12 leading-relaxed max-w-3xl text-indigo-50/90"
            dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
          />

          {/* Horizontal Skills Row — rendered from techStack, no repeated markup */}
          <div className="flex items-center gap-10 mt-8">
            {techStack.map(({ key, label, icon, delay, floatDelay }) => (
              <TechIcon key={key} label={label} icon={icon} delay={delay} floatDelay={floatDelay} />
            ))}
          </div>
        </div>
      </div>

      {/* ID badge animation styles */}
      <style>{`
        .id-badge {
          animation: badge-drop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     badge-swing 4.5s ease-in-out 1.1s infinite;
        }
        .id-badge:hover {
          animation-play-state: paused;
          transform: rotate(0deg) translateY(0);
        }

        @keyframes badge-drop {
          0%   { transform: translateY(-260px) rotate(0deg); opacity: 0; }
          55%  { transform: translateY(12px) rotate(-4deg);  opacity: 1; }
          75%  { transform: translateY(-6px) rotate(3deg); }
          100% { transform: translateY(0) rotate(-3deg); }
        }

        @keyframes badge-swing {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(5deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .id-badge {
            animation: none;
            transform: rotate(-3deg);
            opacity: 1;
          }
        }

        .glow-orb { animation: orb-drift 14s ease-in-out infinite; }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.08); }
        }

        .icon-float { animation: icon-float 3.2s ease-in-out infinite; }
        .icon-float:hover { animation-play-state: paused; }
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-orb, .icon-float { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default About;
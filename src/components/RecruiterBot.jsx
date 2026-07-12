import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOT_ANSWERS = {
  logistics: `Mohamed Rafi has 15+ years of experience in 3PL and chemical logistics. Key details:
• Managed business development with tier-1 clients (SABIC, Ma'aden, Tasnee) at Karl Schmidt Middle East (2022-2025).
• Secured long-term 3PL chemical storage contracts (Aquaness & Nex Chemia) for 10,000 MT/year.
• Operationalized high-volume polymer container export flows of 100-200 containers monthly from Jubail to Genoa, Italy.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  workforce: `Rafi is highly expert in HR solutions, manpower outsourcing, and Saudi labor compliance:
• Currently the Regional Sales Manager at Workforce Saudia.
• Previously at Jaddarah Workforce (2014-2022) as BD & Operations Manager, overseeing 10,000+ outsourced staff across 10 branches.
• Fully fluent in Qiwa, GOSI, WPS (Mudad), Muqeem, Absher Business, and Nitaqat (Saudization).
• Managed end-to-end global campaigns (India, Nepal) and drove SAR 25M in monthly revenues.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  automation: `Rafi bridges industrial end-users with global tech providers for smart warehousing and robotics:
• Led intralogistics plant layouts and robotic automation integrations.
• Integrated robotic arms and stretch hood packaging machines, securing approvals for projects like JPP (unmanned packaging project) and Ravago ME.
• Collaborated with technology giants like E80 Group (Italy) and S.A. TALKE on full-scale automation feasibility studies.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  contact: `Here is Rafi's contact information:
• Location: Al-Jubail, Kingdom of Saudi Arabia
• Iqama status: Transferable Iqama (No. 2529781821)
• Email: mohamedrafi2512@gmail.com
• Phone/WhatsApp: +966 (0) 553 951 303

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  milestones: `Some of Rafi's major strategic wins:
1. Silos EPC Project: Led commercial alignment and BD for the TASNEE Silos project (Carbon Black products) valued at USD 12 Million.
2. Collections Recovery: Launched a payment recovery unit at Jaddarah Workforce, successfully recovering SR 272 Million in overdue payments.
3. COVID-19 Mobilization: Recruited and mobilized 450+ candidates internationally under quarantine restrictions, generating SR 450K/month.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  education: `Mohamed Rafi holds:
• Bachelor of Science (B.Sc.) degree from Bharathidasan University, Tiruchirappalli, Tamil Nadu, India (Graduated in 2009).

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  personal: `Personal Details for Rafi:
• Nationality: Indian (Passport T9285897, valid until August 2030)
• Status: Married with 4 dependents
• Born: June 28, 1988
• Current Location: Al-Jubail (Transferable Iqama)

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  career: `Mohamed Rafi's 15+ years career timeline:
• Oct 2025–Present: Regional Sales Manager at Workforce Saudia (Manpower & HR Outsourcing)
• Jul 2025–Present: Head of Business Development at TechPulse Global (Logistics, Automation & Market Entry)
• Mar 2025–May 2025: Head of BD (Market Entry Contractor) at WR Logistics LLC
• 2022–Feb 2025: Commercial Manager at Karl Schmidt Middle East
• 2014–2022: BD & Operations Manager at Jaddarah Workforce Services
• 2012–2014: BD & Operations Executive at Plus Max Malaysia
• 2010–2012: HR Executive at Coastline Group India

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  advisory: `As Head of BD at TechPulse, Rafi acts as a key consultant for international players entering the Saudi market:
• Guided E80 Group (Italian automation provider), ADK Blasts Corp (South Korea), and Handled (USA) through local corporate incorporation.
• Structured their GOSI, Qiwa, recruitment channels, and local payroll onboarding to ensure compliance-first market entry.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  availability: `Rafi resides in Al-Jubail, KSA with a fully Transferable Iqama (No. 2529781821) and is ready for transition. Notice period is subject to discussion (typically standard 1 month or immediate for key opportunities). You can inquire about salary expectations and terms directly at mohamedrafi2512@gmail.com or +966 (0) 553 951 303.

Source: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889)`,

  matchmaker: `📊 SYNERGY MATCHMAKER
Rafi's background is tailored to drive growth and operational compliance in the Gulf.

Please select your organization's primary focus to view the specific synergy mapping:`,

  match_logistics: `📊 RAFI & LOGISTICS SYNERGY MATCH: 98%
• Core Value: 15+ years managing chemical 3PL logistics, terminal layouts, and polymer container exports.
• Metric: Managed commercial BD/execution for USD 12M silos project, and handled 10,000 MT/year chemical DG warehousing.
• Ideal For: Head of Logistics, BD Director, or terminal supply chain leader.

Select another category or contact Rafi below:`,

  match_hr: `📊 RAFI & MANPOWER/HR SYNERGY MATCH: 96%
• Core Value: Directed 10 branches and 10,000+ outsourced staff deployments at Jaddarah Workforce Services.
• Metric: Created payment recovery unit recovering SR 272 Million in overdue balances. Fully fluent in Qiwa, GOSI, and Wages Protection (WPS).
• Ideal For: Regional Sales Director, HR Outsourcing Operations Leader, or GRC expert.

Select another category or contact Rafi below:`,

  match_automation: `📊 RAFI & INTRALOGISTICS AUTOMATION SYNERGY MATCH: 95%
• Core Value: Bridges global tech providers (like E80 Group Italy) with tier-1 petrochemical end-users for unmanned systems.
• Metric: Managed feasibility workflows for robotic stretch hood packaging and laser-guided vehicle integrations.
• Ideal For: Smart warehousing projects and CAPEX business development initiatives.

Select another category or contact Rafi below:`,

  default: `I can help you with questions about:
• "logistics" (3PL, polymer export, Schmidt)
• "manpower" (manpower services, Qiwa, GOSI)
• "automation" (robotics, packaging)
• "career" (companies, roles, background)
• "advisory" (Saudi market entry, E80)
• "availability" (notice period, location, Iqama)
• "accomplishments" (wins, recovery, silos)
• "contact" or "personal" details

What would you like to explore?`
};

const SUGGESTIONS_POOLS = {
  default: [
    { label: '📊 Synergy Matchmaker', keywords: ['matchmaker'] },
    { label: 'Career Timeline', keywords: ['career'] },
    { label: '3PL & Logistics', keywords: ['logistics'] },
    { label: 'Manpower & HR', keywords: ['workforce'] },
    { label: 'Availability & Iqama', keywords: ['availability'] }
  ],
  matchmaker: [
    { label: 'Logistics Operations', keywords: ['match_logistics'] },
    { label: 'Manpower & HR Solutions', keywords: ['match_hr'] },
    { label: 'Robotic Automation', keywords: ['match_automation'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  match_logistics: [
    { label: 'Check HR Synergy', keywords: ['match_hr'] },
    { label: 'Check Automation Synergy', keywords: ['match_automation'] },
    { label: 'Get Contact Details', keywords: ['contact'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  match_hr: [
    { label: 'Check Logistics Synergy', keywords: ['match_logistics'] },
    { label: 'Check Automation Synergy', keywords: ['match_automation'] },
    { label: 'Get Contact Details', keywords: ['contact'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  match_automation: [
    { label: 'Check Logistics Synergy', keywords: ['match_logistics'] },
    { label: 'Check HR Synergy', keywords: ['match_hr'] },
    { label: 'Get Contact Details', keywords: ['contact'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  logistics: [
    { label: 'Silos Project', keywords: ['silos'] },
    { label: 'Polymer Exports', keywords: ['polymer'] },
    { label: '3PL Storage', keywords: ['3pl'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  workforce: [
    { label: 'Jaddarah Staffing', keywords: ['jaddarah'] },
    { label: 'Workforce Saudia', keywords: ['workforce'] },
    { label: 'Saudi Compliance', keywords: ['compliance'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  automation: [
    { label: 'E80 Feasibility', keywords: ['e80'] },
    { label: 'Robotic Systems', keywords: ['robot'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  availability: [
    { label: 'Iqama Number', keywords: ['iqama'] },
    { label: 'Contact Info', keywords: ['contact'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  career: [
    { label: 'Karl Schmidt Role', keywords: ['schmidt'] },
    { label: 'Jaddarah Role', keywords: ['jaddarah'] },
    { label: 'Workforce Role', keywords: ['workforce'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  advisory: [
    { label: 'E80 Corporation', keywords: ['e80'] },
    { label: 'Saudi Compliance', keywords: ['compliance'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  milestones: [
    { label: 'Silos Project', keywords: ['silos'] },
    { label: 'Collections Recovery', keywords: ['recovery'] },
    { label: 'Main Menu', keywords: ['default'] }
  ],
  contact: [
    { label: 'Availability', keywords: ['availability'] },
    { label: 'Iqama Status', keywords: ['iqama'] },
    { label: 'Main Menu', keywords: ['default'] }
  ]
};

const findBestAnswer = (query) => {
  const q = query.toLowerCase().trim();
  
  if (q.includes('matchmaker') || q.includes('synergy') || q.includes('check')) {
    return { text: BOT_ANSWERS.matchmaker, category: 'matchmaker' };
  }
  if (q.includes('match_logistics')) {
    return { text: BOT_ANSWERS.match_logistics, category: 'match_logistics' };
  }
  if (q.includes('match_hr')) {
    return { text: BOT_ANSWERS.match_hr, category: 'match_hr' };
  }
  if (q.includes('match_automation')) {
    return { text: BOT_ANSWERS.match_automation, category: 'match_automation' };
  }
  if (q.includes('logistics') || q.includes('3pl') || q.includes('schmidt') || q.includes('polymer') || q.includes('shipping') || q.includes('export')) {
    return { text: BOT_ANSWERS.logistics, category: 'logistics' };
  }
  if (q.includes('workforce') || q.includes('manpower') || q.includes('outsourcing') || q.includes('hr') || q.includes('qiwa') || q.includes('gosi') || q.includes('saudization') || q.includes('jaddarah') || q.includes('wps')) {
    return { text: BOT_ANSWERS.workforce, category: 'workforce' };
  }
  if (q.includes('automation') || q.includes('robot') || q.includes('intralogistics') || q.includes('technology') || q.includes('e80')) {
    return { text: BOT_ANSWERS.automation, category: 'automation' };
  }
  if (q.includes('career') || q.includes('company') || q.includes('companies') || q.includes('role') || q.includes('roles') || q.includes('history') || q.includes('timeline') || q.includes('experience')) {
    return { text: BOT_ANSWERS.career, category: 'career' };
  }
  if (q.includes('advisory') || q.includes('market entry') || q.includes('foreign') || q.includes('consult') || q.includes('guide')) {
    return { text: BOT_ANSWERS.advisory, category: 'advisory' };
  }
  if (q.includes('availability') || q.includes('notice') || q.includes('ready') || q.includes('salary') || q.includes('hire') || q.includes('join')) {
    return { text: BOT_ANSWERS.availability, category: 'availability' };
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('location')) {
    return { text: BOT_ANSWERS.contact, category: 'contact' };
  }
  if (q.includes('iqama') || q.includes('status')) {
    return { text: BOT_ANSWERS.contact, category: 'contact' };
  }
  if (q.includes('win') || q.includes('accomplish') || q.includes('milestone') || q.includes('silos') || q.includes('tasnee') || q.includes('recovery')) {
    return { text: BOT_ANSWERS.milestones, category: 'milestones' };
  }
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college')) {
    return { text: BOT_ANSWERS.education, category: 'education' };
  }
  if (q.includes('personal') || q.includes('nationality') || q.includes('passport')) {
    return { text: BOT_ANSWERS.personal, category: 'personal' };
  }

  return { text: BOT_ANSWERS.default, category: 'default' };
};

const renderMessageText = (text) => {
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = mdLinkRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a 
        key={matchIndex} 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gold-primary hover:underline font-bold"
      >
        {linkText}
      </a>
    );
    lastIndex = mdLinkRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

const RecruiterBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [suggestions, setSuggestions] = useState(SUGGESTIONS_POOLS.default);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am Rafi's Personal AI Agent. How can I help you?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Show notification post preloader exit
    const showTimer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 3500); // 3.5 seconds delay

    // Auto-dismiss after exactly 3 seconds of being visible
    const hideTimer = setTimeout(() => {
      setShowNotification(false);
    }, 6500); // 6.5 seconds total (3.5s delay + 3s visible)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  // Cancel Speech Synthesis on Component Unmount or Chat Close
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = (msgId, text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    } else {
      window.speechSynthesis.cancel();
      
      const cleanText = text
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // link tags
        .replace(/•/g, '') // bullets
        .replace(/\*/g, ''); // bold symbols
        
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      
      setSpeakingMsgId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const exportChatLog = () => {
    const headerText = `=== MOHAMED RAFI - AI RECRUITER AGENT CONVERSATION LOG ===\nDate: ${new Date().toLocaleDateString()}\n\n`;
    const bodyText = messages.map(msg => `[${msg.time}] ${msg.sender === 'user' ? 'Recruiter' : 'AI Agent'}: ${msg.text}`).join('\n\n');
    const footerText = `\n\n=== END OF LOG. Contact Rafi at: mohamedrafi2512@gmail.com / +966 (0) 553 951 303 ===`;
    
    const blob = new Blob([headerText + bodyText + footerText], { type: 'text/plain;charset=utf-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Rafi_AI_Agent_ChatLog_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleSend = (textToSend, displayLabel) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    // Add user message with a human-readable display label if available
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: displayLabel || text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    
    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      const match = findBestAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: match.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
      setSuggestions(SUGGESTIONS_POOLS[match.category] || SUGGESTIONS_POOLS.default);
    }, 850);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat Window Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 35 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-80 sm:w-96 h-[480px] bg-slate-950/95 border border-gold-primary/30 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl mb-4"
          >
            {/* Window Header */}
            <div className="relative px-5 py-3.5 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-gold-primary/15 flex items-center justify-between">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-sm">
                  👔
                </div>
                <div className="text-left">
                  <h4 className="text-white text-xs font-black tracking-wide uppercase font-mono">Mohamed Rafi</h4>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Rafi's Personal AI Agent
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Export Chat Logs Button */}
                <button
                  onClick={exportChatLog}
                  className="text-slate-400 hover:text-gold-primary p-1 focus:outline-none cursor-pointer transition-colors"
                  title="Export Chat Conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-slate-400 hover:text-white p-1 focus:outline-none cursor-pointer transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/30 scrollbar-thin">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed text-left relative group/bubble ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-amber-600 to-gold-primary text-black font-extrabold shadow-md rounded-tr-none'
                      : 'bg-slate-900 border border-gold-primary/10 text-slate-200 font-medium rounded-tl-none whitespace-pre-line pr-8'
                  }`}>
                    {renderMessageText(msg.text)}

                    {/* TTS Voice Button on Bot Messages */}
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => toggleSpeech(msg.id, msg.text)}
                        className="absolute right-2.5 bottom-2.5 opacity-0 group-hover/bubble:opacity-100 transition-opacity p-0.5 text-slate-400 hover:text-gold-primary focus:outline-none cursor-pointer"
                        title="Read out loud"
                      >
                        {speakingMsgId === msg.id ? (
                          <div className="flex gap-0.5 items-center h-3">
                            <span className="w-[1.5px] h-2 bg-gold-primary animate-pulse" style={{ animationDelay: '0s' }} />
                            <span className="w-[1.5px] h-3 bg-gold-primary animate-pulse" style={{ animationDelay: '0.15s' }} />
                            <span className="w-[1.5px] h-1.5 bg-gold-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
                          </div>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  <span className="text-[8.5px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-slate-900 border border-gold-primary/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}

              <div ref={logEndRef} />
            </div>

            {/* Suggested Tags Area */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-gold-primary/10">
              <h5 className="text-[9px] font-bold text-gold-primary/60 uppercase tracking-widest text-left mb-2 select-none">
                Suggested Questions:
              </h5>
              <div className="flex flex-wrap gap-2 justify-start max-h-[72px] overflow-y-auto scrollbar-none">
                {suggestions.map(sug => (
                  <button
                    key={sug.label}
                    onClick={() => handleSend(sug.keywords[0], sug.label)}
                    disabled={isTyping}
                    className="px-2.5 py-1 text-[9.5px] font-bold rounded-full bg-slate-900 border border-gold-primary/15 text-slate-300 hover:border-gold-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div className="p-3 bg-slate-900 border-t border-gold-primary/15 flex gap-2 items-center">
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
                placeholder="Ask about logistics, manpower, wins..."
                className="flex-1 bg-slate-950 border border-gold-primary/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-primary/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !inputVal.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-600 to-gold-primary text-black flex items-center justify-center hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Send query"
              >
                <svg className="w-4.5 h-4.5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closed Notification Speech Bubble */}
      <AnimatePresence>
        {!isOpen && showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="absolute bottom-18 left-0 w-64 bg-slate-950/95 border border-gold-primary/35 rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-start gap-2.5 z-20 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-sm shrink-0">👔</div>
            <div className="flex-1 text-left">
              <p className="text-white text-[11px] font-bold leading-normal">
                Hi! I am Rafi's Personal AI Agent. Ask me anything!
              </p>
            </div>
            
            {/* Close cross to dismiss */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded focus:outline-none cursor-pointer shrink-0"
              aria-label="Dismiss greeting"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-2xl relative cursor-pointer focus:outline-none ${
          isOpen 
            ? 'bg-slate-950 border border-gold-primary/35 text-gold-primary' 
            : 'bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black border border-gold-primary/20 hover:brightness-110 shadow-[0_10px_30px_rgba(226,184,87,0.3)]'
        }`}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? (
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            {/* Ambient online green indicator dot */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        )}
      </motion.button>
      
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(226, 184, 87, 0.25);
          border-radius: 99px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(226, 184, 87, 0.45);
        }
        
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecruiterBot;

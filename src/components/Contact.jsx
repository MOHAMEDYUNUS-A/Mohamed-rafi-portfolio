import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { emailjsConfig, personalInfo, socialLinks } from '../data/portfolioData';
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const FloatingField = ({ id, name, label, type = 'text', required, textarea }) => {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <motion.div variants={fieldVariants} className="relative w-full">
      <Tag
        type={textarea ? undefined : type}
        id={id}
        name={name}
        placeholder=" "
        required={required}
        rows={textarea ? 4 : undefined}
        className={`peer w-full bg-slate-900/40 border border-slate-800/80 px-4 pt-6 pb-2.5 text-slate-100 text-sm font-semibold rounded-2xl focus:outline-none focus:border-gold-primary/65 focus:bg-slate-900/80 focus:ring-4 focus:ring-gold-primary/5 transition-all duration-350 ${
          textarea ? 'resize-none min-h-[120px]' : ''
        }`}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4.5 text-slate-500 text-xs sm:text-sm font-semibold pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold-primary/90 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold-primary/80"
      >
        {label}
      </label>
    </motion.div>
  );
};

// Premium SVG Icons
const MapPinIcon = () => (
  <svg className="w-5 h-5 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IDIcon = () => (
  <svg className="w-5 h-5 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 21v-4a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="11" r="4" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, sending

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = formRef.current;
    const firstName = form.querySelector('#firstName')?.value || '';
    const lastName = form.querySelector('#lastName')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields.', {
        style: {
          background: '#0b0f19',
          color: '#f8fafc',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        }
      });
      return;
    }

    setStatus('sending');

    const sendEmailPromise = (async () => {
      const isConfigured = 
        emailjsConfig.serviceId && 
        emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
        emailjsConfig.templateId && 
        emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
        emailjsConfig.publicKey && 
        emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

      if (!isConfigured) {
        const mailtoLink = `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
        window.open(mailtoLink, '_blank');
        formRef.current.reset();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
        setStatus('idle');
        return "Opened mail client!";
      }

      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      formRef.current.reset();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 }
      });
      setStatus('idle');
      return "Message sent successfully!";
    })();

    toast.promise(sendEmailPromise, {
      loading: 'Sending your message...',
      success: (msg) => msg,
      error: () => {
        setStatus('idle');
        return 'Failed to send message. Please try again.';
      },
    }, {
      style: {
        background: '#0b0f19',
        color: '#f8fafc',
        border: '1px solid rgba(226, 184, 87, 0.2)',
      },
      success: {
        iconTheme: {
          primary: '#e2b857',
          secondary: '#0b0f19',
        },
      },
    });
  };

  return (
    <section ref={ref} id="contact" className="bg-slate-dark w-full min-h-screen relative overflow-hidden pt-28 pb-32 px-6 md:px-12 border-t border-gold-primary/10 flex items-center">
      <Toaster position="bottom-right" reverseOrder={false} />
      
      {/* Background drifting glow accents */}
      <div className="absolute top-1/4 left-10 w-[32rem] h-[32rem] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[26rem] h-[26rem] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Background large graphic lettering */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-10"
      >
        <h1 
          className="text-[24vw] leading-[0.75] font-black uppercase tracking-tighter select-none scale-y-[1.4] origin-top text-transparent bg-clip-text bg-gradient-to-r from-amber-600/5 via-gold-primary/5 to-yellow-300/5 opacity-50"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Two-Column Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Office Contacts Info Panel */}
          <div data-aos="reveal-right" className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-xs text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm uppercase tracking-widest">
              Get In Touch
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-6 uppercase tracking-tight leading-[1.1]">
              Let's Align On <br className="hidden md:block" />
              Your Next Venture
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed mb-10 max-w-sm">
              Inquire about operations consultation, strategic manpower outsourcing, bid proposals, or technical project implementation.
            </p>

            {/* Glassmorphism details panel */}
            <div className="flex flex-col gap-5 w-full mb-10 bg-slate-950/30 backdrop-blur-sm border border-slate-800/60 p-6 rounded-3xl max-w-md">
              {/* Location */}
              <div className="flex items-start gap-4 text-left">
                <span className="w-11 h-11 rounded-2xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center shrink-0">
                  <MapPinIcon />
                </span>
                <div>
                  <h4 className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-0.5">Location</h4>
                  <p className="text-slate-50 text-sm font-black uppercase">Al-Jubail, Eastern Province, KSA</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-800/40" />

              {/* Email */}
              <div className="flex items-start gap-4 text-left">
                <span className="w-11 h-11 rounded-2xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center shrink-0">
                  <MailIcon />
                </span>
                <div>
                  <h4 className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-0.5">Email</h4>
                  <a href={`mailto:${personalInfo.emails.primary}`} className="text-slate-50 text-sm font-black hover:text-gold-primary transition-colors uppercase">
                    {personalInfo.emails.primary}
                  </a>
                </div>
              </div>

              <div className="w-full h-[1px] bg-slate-800/40" />

              {/* Iqama */}
              <div className="flex items-start gap-4 text-left">
                <span className="w-11 h-11 rounded-2xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center shrink-0">
                  <IDIcon />
                </span>
                <div>
                  <h4 className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-0.5">Iqama Status</h4>
                  <p className="text-slate-50 text-sm font-black uppercase">Transferable Iqama (No. 2529781821)</p>
                </div>
              </div>
            </div>

            {/* LinkedIn Button */}
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-slate-950/80 border border-gold-primary/20 text-slate-50 px-6 py-3.5 rounded-full hover:bg-gold-primary hover:text-black hover:border-gold-primary hover:shadow-[0_10px_25px_rgba(226,184,87,0.25)] transition-all duration-300 hover:scale-103 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Right Column: Message Form Panel */}
          <div data-aos="reveal-left" className="lg:col-span-7 w-full bg-slate-950/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle inner accent light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,184,87,0.03),transparent_50%)] pointer-events-none" />

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="relative flex flex-col gap-7 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <FloatingField id="firstName" name="first_name" label="First Name" required />
                <FloatingField id="lastName" name="last_name" label="Last Name" />
              </div>
              
              <FloatingField id="email" name="user_email" label="Email Address" type="email" required />
              
              <FloatingField id="message" name="message" label="Type your message here" textarea required />

              {/* Consent check */}
              <div className="flex items-start gap-3.5 text-xs font-semibold text-slate-400 text-left mt-1">
                <input 
                  type="checkbox" 
                  id="permission" 
                  className="mt-1 w-4 h-4 rounded border-slate-800 bg-transparent focus:ring-gold-primary/30 cursor-pointer transition-transform duration-200 checked:scale-110 shrink-0" 
                  style={{ accentColor: "#e2b857" }}
                  required
                />
                <label htmlFor="permission" className="cursor-pointer leading-snug select-none">
                  I give permission to contact me at this email address to discuss business opportunities.
                </label>
              </div>

              {/* Submit Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-5 border-t border-slate-800/60 mt-3">
                <p className="text-slate-500 text-[10.5px] font-mono leading-normal max-w-[280px] text-left">
                  Your message goes directly to my secure inbox. Response times are usually within 24 hours.
                </p>
                
                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={status === 'idle' ? { scale: 1.03 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  className={`px-8 py-3.5 rounded-full border border-gold-primary/40 font-bold flex items-center justify-center gap-3 duration-300 group whitespace-nowrap self-start sm:self-auto cursor-pointer text-sm tracking-wide ${
                    status === 'sending' 
                      ? 'opacity-60 cursor-not-allowed bg-slate-900/50 text-slate-400' 
                      : 'text-slate-50 bg-slate-900 border-gold-primary/20 hover:bg-gold-primary hover:text-black hover:border-gold-primary hover:shadow-[0_10px_35px_rgba(226,184,87,0.25)]'
                  }`}
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                  
                  {status !== 'sending' && <SendIcon />}
                </motion.button>
              </div>

            </motion.form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
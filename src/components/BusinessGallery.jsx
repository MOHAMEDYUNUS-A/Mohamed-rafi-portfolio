import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the user's uploaded JPEG images from the gallery assets
import img0 from '../assets/gallery/business.jpeg';
import img1 from '../assets/gallery/business1.jpeg';
import img2 from '../assets/gallery/business2.jpeg';
import img3 from '../assets/gallery/business3.jpeg';
import img4 from '../assets/gallery/business 4.jpeg'; // Note the space in filename
import img5 from '../assets/gallery/busines5.jpeg';   // Note the spelling in filename
import img6 from '../assets/gallery/business6.jpeg';
import img7 from '../assets/gallery/business7.jpeg';
import img8 from '../assets/gallery/business8.jpeg';
import img9 from '../assets/gallery/business9.jpeg';
import img10 from '../assets/gallery/business10.jpeg';
import img13 from '../assets/gallery/business13.jpeg';
import imgWorkforce from '../assets/gallery/workforce.jpeg';
import imgAward from '../assets/AWARDS/award_certificate.png';

const CATEGORIES = [
  { id: 'all', label: 'All Operations' },
  { id: 'workforce', label: 'Workforce & HR' },
  { id: 'automation', label: 'Robotic Automation' },
  { id: 'logistics', label: 'Bulk Logistics' },
  { id: 'storage', label: '3PL DG Storage' }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Recruitment Campaign with Client ACIC in Chennai',
    category: 'workforce',
    image: img1,
    description: 'Spearheading large-scale global recruitment drives in Chennai for client ACIC to mobilize highly qualified workforce candidates.'
  },
  {
    id: 2,
    title: 'Sipchem- Argus Forum',
    category: 'logistics',
    image: img2,
    description: 'Representing commercial operations and logistics initiatives at the regional Sipchem-Argus Forum.'
  },
  {
    id: 3,
    title: 'Farewell Bidding from Jaddarah',
    category: 'workforce',
    image: img3,
    description: 'Farewell bidding ceremony from Jaddarah Group, celebrating 08 long years of dedicated services in multiple roles.'
  },
  {
    id: 4,
    title: 'Schmidt 75 Year Anniversary',
    category: 'logistics',
    image: img4,
    description: 'Celebrating 75 years of Karl Schmidt Group\'s logistics legacy and bulk logistics achievements.'
  },
  {
    id: 5,
    title: 'Meeting with Schmidt Board and Executive Management',
    category: 'logistics',
    image: img5,
    description: 'Participating in high-level alignment meetings with the Karl Schmidt board and global executive management team.'
  },
  {
    id: 6,
    title: 'Team in Jubail HQ',
    category: 'workforce',
    image: img6,
    description: 'Engaging with workforce operations and client onboarding support teams at the Jubail Headquarters.'
  },
  {
    id: 7,
    title: 'During 17 GPCA Annual Forum in Doha, Qatar with Schmidt Board and Executive Management',
    category: 'logistics',
    image: img7,
    description: 'Delegate networking at the 17th GPCA Annual Forum in Doha, Qatar alongside the Karl Schmidt board and leadership.'
  },
  {
    id: 8,
    title: 'IPTC Forum in Kuala Lumpur, Malaysia',
    category: 'logistics',
    image: img8,
    description: 'Representing bulk operations and dry bulk supply chains during the IPTC conference in Kuala Lumpur, Malaysia.'
  },
  {
    id: 9,
    title: 'IPTC Forum in Kuala Lumpur, Malaysia',
    category: 'logistics',
    image: img9,
    description: 'Aligning with international tech providers and energy delegates at the IPTC forum in Kuala Lumpur, Malaysia.'
  },
  {
    id: 10,
    title: 'Good Will Meetings with Key Potentials',
    category: 'logistics',
    image: img10,
    description: 'Fostering strategic alliances and holding goodwill meetings with key potential regional clients.'
  },
  {
    id: 13,
    title: 'Sipchem- Argus Forum',
    category: 'logistics',
    image: img13,
    description: 'Analyzing market trends and petrochemical logistics solutions at the Sipchem-Argus Forum.'
  },
  {
    id: 0,
    title: 'Meeting with GPCA\'s Secretary',
    category: 'logistics',
    image: img0,
    description: 'Strategic engagement meeting with the GPCA Secretary-General regarding local content and GCC logistics developments.'
  },
  {
    id: 14,
    title: 'Meeting with Workforce Saudia Executive Management',
    category: 'workforce',
    image: imgWorkforce,
    description: 'A strategic alignment meeting recently held with the Workforce Saudia executive management team.'
  },
  {
    id: 15,
    title: 'Appreciation Award by S A Talke',
    category: 'workforce',
    image: imgAward,
    description: 'Awarded by S.A. TALKE in recognition of outstanding logistics operations support and consistent service delivery.'
  }
];

const BusinessGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const activeCategories = useMemo(() => {
    return CATEGORIES.filter(cat => {
      if (cat.id === 'all') return true;
      return GALLERY_ITEMS.some(item => item.category === cat.id);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery" className="bg-slate-primary pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10">
      
      {/* Background drifting glows */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="reveal-up" className="mb-16 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Business Gallery
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-50 tracking-tight mb-4 uppercase">
            Operations & Projects Showcase
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A visual overview of logistics terminals, automated systems, manpower deployments, and corporate ventures managed across Saudi Arabia.
          </p>
        </div>

        {/* Categories Tab Selector - responsive scrollable */}
        <div data-aos="reveal-up" className="flex justify-start md:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-3">
          <div className="flex flex-nowrap gap-3 px-2 md:px-0">
            {activeCategories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-gold-primary text-black border-gold-primary shadow-[0_10px_20px_rgba(226,184,87,0.2)]'
                      : 'bg-slate-950/60 text-slate-400 border-gold-primary/10 hover:text-slate-50 hover:border-gold-primary/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Style Portfolio Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-gold-primary/15 bg-slate-950 cursor-pointer shadow-lg hover:border-gold-primary/40 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image element */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Dark transparent gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                </div>

                {/* Content details overlay */}
                <div className="absolute inset-0 z-10 p-5 flex flex-col justify-end items-start text-left bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-gold-primary/10 text-gold-primary text-[8px] font-black tracking-widest uppercase py-0.5 px-2.5 rounded-full border border-gold-primary/20 mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-slate-50 text-base font-black tracking-tight leading-tight group-hover:text-gold-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-normal">
                    {item.description}
                  </p>
                </div>

                {/* Sweep gold bottom bar */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-gold-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal Showcase */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-950 border border-gold-primary/30 rounded-3xl max-w-4xl w-full overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative flex flex-col md:flex-row cursor-default"
            >
              {/* Close Cross Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/60 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 hover:border-white/20 transition-all cursor-pointer focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Side: Large image display */}
              <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto bg-black flex items-center justify-center relative overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
              </div>

              {/* Right Side: Description details */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/5 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <span className="bg-gold-primary/10 text-gold-primary text-[9px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-gold-primary/25 inline-block mb-4">
                    {selectedItem.category}
                  </span>
                  
                  <h3 className="text-white text-2xl font-black mb-3 tracking-tight">
                    {selectedItem.title}
                  </h3>
                  
                  <p className="text-slate-350 text-sm leading-relaxed font-semibold mb-6">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="border-t border-gold-primary/10 pt-6">
                  <a
                    href="#contact"
                    onClick={() => setSelectedItem(null)}
                    className="inline-block w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-amber-600 to-gold-primary text-black text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-[0_10px_25px_rgba(226,184,87,0.2)] transition-all"
                  >
                    Inquire About This Project
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BusinessGallery;

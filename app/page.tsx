'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  Coffee, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight, 
  Star, 
  MessageCircle,
  Send
} from 'lucide-react';
import Image from 'next/image';

// --- Components ---

const PremiumButton = ({ children, variant = 'primary', className = '', onClick }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline', className?: string, onClick?: () => void }) => {
  const baseStyles = "relative px-10 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all duration-700 overflow-hidden group flex items-center justify-center gap-3";
  
  const variants = {
    primary: "bg-gradient-to-br from-coffee to-coffee-light text-white shadow-[0_0_30px_rgba(111,78,55,0.2)] hover:shadow-[0_0_50px_rgba(166,124,82,0.4)]",
    secondary: "bg-white text-black hover:bg-beige shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]",
    outline: "border border-white/20 text-white hover:border-white/60 bg-white/[0.03] backdrop-blur-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Shine Effect Layer */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-all duration-1000 ease-in-out group-hover:translate-x-full"
        style={{ skewX: -20 }}
      />
      
      {/* Glow Layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-coffee rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-coffee/20">
            <Coffee className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tighter uppercase italic">Route<span className="text-coffee-light">30</span></span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-bold text-white/70 hover:text-white transition-colors uppercase tracking-[0.3em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coffee-light transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
          <PremiumButton variant="primary" className="!px-6 !py-2.5">
            Order Now
          </PremiumButton>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[72px] z-40 bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col p-10 gap-8 h-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display font-black uppercase italic tracking-tighter text-white/40 hover:text-coffee-light transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="mt-auto pb-20">
                <PremiumButton className="w-full !py-6">Order Now</PremiumButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{x: number, y: number, duration: number, delay: number, driftX: number, driftX2: number, size: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 8,
      driftX: (Math.random() - 0.5) * 15,
      driftX2: (Math.random() - 0.5) * 30,
      size: 1 + Math.random() * 3
    })));
  }, []);

  return (
    <section id="home" className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Cinematic Zoom & Blur Transition */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=90&w=2560"
            alt="Luxury Cafe Mood"
            fill
            className="object-cover brightness-[0.6] contrast-125"
            priority
          />
        </motion.div>
        
        {/* Layered Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10" />
        
        {/* Warm Cinematic Glows */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-coffee-light/10 blur-[150px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-coffee/15 blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }} />
      </div>

      {/* Steam / Mist Atmosphere */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-[-10%] bg-white/5 blur-[40px] rounded-full animate-steam"
            style={{ 
              left: `${15 + i * 20}%`, 
              width: `${200 + Math.random() * 200}px`, 
              height: `${100 + Math.random() * 100}px`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles / Particles */}
      <div className="absolute inset-0 z-25 pointer-events-none">
        {mounted && particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: p.x + "%", 
              y: p.y + "%",
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [null, "-30%", "-60%"],
              x: [null, `${p.driftX}%`, `${p.driftX2}%`]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      <div className="relative z-40 text-center px-6 max-w-6xl pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-coffee-light animate-pulse shadow-[0_0_10px_rgba(166,124,82,0.8)]" />
            <span className="text-coffee-light font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
              Est. MMXXIV • Manhattan District One
            </span>
            <div className="w-2 h-2 rounded-full bg-coffee-light animate-pulse shadow-[0_0_10px_rgba(166,124,82,0.8)]" />
          </motion.div>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            className="font-display text-[12vw] md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.75] uppercase italic"
          >
            Cinematic <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>Dining.</span>
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-beige/70 text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed tracking-[0.05em]"
          >
            Experience a curated fusion of high-end architectural aesthetics and artisanal culinary mastery. Beyond flavor, we craft atmospheres.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <PremiumButton variant="primary" className="w-full sm:w-auto px-16 group">
              Explore Tasting Menu <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={18} /></motion.span>
            </PremiumButton>
            <PremiumButton variant="outline" className="w-full sm:w-auto px-16">
              Private Booking
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Sophisticated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, bottom: '20px' }}
        animate={{ opacity: 1, bottom: '40px' }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40">The Experience Awaits</span>
        <div className="relative w-[1px] h-20 bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-coffee-light to-transparent" 
          />
        </div>
      </motion.div>
    </section>
  );
};


const MenuItems = () => {
  const items = [
    { 
      name: 'Midnight Black Cold Brew', 
      price: '$12.00', 
      category: 'Brew',
      desc: '12-hour slow-dripped single origin beans with notes of dark chocolate and smoked oak.',
      img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=95&w=800'
    },
    { 
      name: 'Aged Wagyu Truffle Burger', 
      price: '$34.00', 
      category: 'Signature',
      desc: '45-day aged wagyu beef, black truffle emulsion, 24-month cave-aged cheddar on a gold-dusted brioche.',
      img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=95&w=800'
    },
    { 
      name: 'Burrata & Heirloom Fig', 
      price: '$26.00', 
      category: 'Appetizer', 
      desc: 'Hand-stretched burrata, caramelized honey figs, balsamic silk, and toasted pistachios.',
      img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=95&w=800'
    },
    { 
      name: 'Lotus Gold Silk Shake', 
      price: '$18.00', 
      category: 'Dessert',
      desc: 'Madagascar vanilla bean blend, crushed lotus speculoos, and edible 24k gold flakes.',
      img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=95&w=800'
    },
  ];

  return (
    <section id="menu" className="py-40 px-6 bg-[#030303] relative overflow-hidden">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-coffee-light/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-cinematic-gradient opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-coffee-light font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block drop-shadow-[0_0_10px_rgba(166,124,82,0.5)]">The Culinary Archive</span>
            <h2 className="font-display text-6xl md:text-8xl font-black uppercase italic leading-none tracking-tighter">Artisan<br/><span className="text-white/20">Plates.</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <PremiumButton variant="outline" className="!px-12 backdrop-blur-2xl">
              Download Full Dossier <ArrowRight size={14} className="group-hover:rotate-45 transition-transform" />
            </PremiumButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass-card rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-125 brightness-90 group-hover:brightness-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                <div className="absolute top-6 right-6 glass px-6 py-2.5 rounded-full text-xs font-black tracking-widest text-white border border-white/20 shadow-xl">
                  {item.price}
                </div>
                <div className="absolute bottom-6 left-8 flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-coffee-light drop-shadow-md">{item.category}</span>
                   <div className="w-8 h-[1px] bg-coffee-light group-hover:w-16 transition-all duration-700" />
                </div>
              </div>
              <div className="p-10">
                <h3 className="font-display text-2xl font-black mb-4 uppercase tracking-tighter italic group-hover:text-coffee-light transition-colors duration-500 leading-tight">{item.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-light tracking-wide line-clamp-3">{item.desc}</p>
                <PremiumButton variant="outline" className="w-full !rounded-2xl group-hover:bg-coffee-light/10 group-hover:border-coffee-light/40 transition-all">
                  Request Service
                </PremiumButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-2' },
    { url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-1' },
    { url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-1' },
    { url: 'https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-2' },
    { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-1' },
    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=95&w=800', span: 'md:col-span-2' },
  ];

  return (
    <section id="gallery" className="py-48 bg-[#080808] relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="px-6 mb-24 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-coffee-light font-bold tracking-[0.8em] uppercase text-[10px] mb-6 block">Atmosphere Archive</span>
          <h2 className="font-display text-6xl md:text-9xl font-black uppercase italic leading-none tracking-tighter">The<br/><span className="text-coffee-light">Gaze.</span></h2>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={`${img.span} relative rounded-[3rem] overflow-hidden group cursor-pointer border border-white/5 shadow-3xl bg-black`}
          >
            <Image 
              src={img.url} 
              alt={`Gallery ${i}`} 
              width={1200} 
              height={1600} 
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1500ms] ease-in-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col justify-end p-12">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="flex items-center gap-6 font-display font-black italic uppercase tracking-tighter text-3xl"
               >
                 <span className="text-white">Route 30</span>
                 <div className="w-12 h-[2px] bg-coffee-light" />
                 <Instagram size={28} className="text-coffee-light" />
               </motion.div>
            </div>
            {/* Corner Decorative Element */}
            <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-white/20 rounded-tl-2xl group-hover:border-coffee-light transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-48 px-6 relative overflow-hidden bg-black">
       {/* Deep Ambient Light */}
       <div className="absolute top-1/2 left-0 w-full h-[600px] bg-coffee/5 blur-[160px] rounded-full -translate-y-1/2 -px-20 pointer-events-none" />
       
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative group"
         >
           <div className="relative rounded-[4rem] overflow-hidden aspect-[4/5] z-10 border border-white/5 shadow-3xl">
             <Image 
               src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=95&w=1000" 
               alt="Artisan Craftsmanship" 
               fill
               className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
           </div>
           
           {/* Sophisticated Aesthetic Circular Element */}
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/[0.02] backdrop-blur-3xl rounded-full flex items-center justify-center p-12 z-20 border border-white/10 hidden xl:flex"
            >
              <div className="text-center relative">
                 <div className="absolute inset-0 bg-coffee-light/10 blur-3xl rounded-full" />
                 <p className="text-[11px] font-black uppercase tracking-[0.5em] text-coffee-light mb-3 leading-tight relative">Prestige</p>
                 <p className="text-4xl font-display font-black leading-none italic uppercase relative text-white">Archives.</p>
              </div>
           </motion.div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
         >
           <span className="text-coffee-light font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block drop-shadow-md">The Philosophy</span>
           <h2 className="font-display text-7xl md:text-[8rem] font-black mb-12 uppercase italic leading-[0.8] tracking-tighter">Where<br/>Quietude<br/><span className="text-white/20">Prevails.</span></h2>
           <p className="text-white/50 text-xl mb-12 font-light leading-relaxed tracking-wide font-serif">
             Route 30 is more than a destination; it&apos;s a declaration. Born from the intersection of urban architectural minimalism and centuries-old artisan heritage. We curate sensory-first experiences for those who value the aesthetics of space as much as the depth of flavor.
           </p>
           
           <div className="grid grid-cols-2 gap-12 mb-16">
             <motion.div 
               whileHover={{ x: 10 }}
               className="border-l-2 border-coffee-light/30 pl-8 transition-colors hover:border-coffee-light"
             >
               <h4 className="font-display font-black text-4xl mb-3 italic uppercase tracking-tighter text-white">Elite.</h4>
               <p className="text-white/30 text-[11px] uppercase font-bold tracking-[0.3em]">Ethical Sourcing</p>
             </motion.div>
             <motion.div 
               whileHover={{ x: 10 }}
               className="border-l-2 border-coffee-light/30 pl-8 transition-colors hover:border-coffee-light"
             >
               <h4 className="font-display font-black text-4xl mb-3 italic uppercase tracking-tighter text-white">Atmosphere.</h4>
               <p className="text-white/30 text-[11px] uppercase font-bold tracking-[0.3em]">Sonic Architecture</p>
             </motion.div>
           </div>
           
           <PremiumButton variant="outline" className="group !px-14">
             View Our Manifesto <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-700" />
           </PremiumButton>
         </motion.div>
       </div>
    </section>
  );
};

const SocialProof = () => {
    const reviews = [
        { name: "Maximilian Voss", role: "Creative Director, V-Studio", text: "The architectural synergy at Route 30 is unmatched. It's not just a café; it's a sensory masterclass in urban minimalism." },
        { name: "Elena Santini", role: "Vogue Food Editor", text: "From the acoustic dampening to the golden brioche, every detail at Route 30 whispers international luxury." },
        { name: "Marcus Thorne", role: "CEO, Thorne Ventures", text: "My definitive choice for private closings. The atmosphere commands precisely the right degree of prestige and focus." }
    ];
    
    return (
        <section className="py-48 bg-black relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-coffee-light/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-coffee-light font-bold tracking-[0.8em] uppercase text-[10px] mb-8 block">Global Acclaim</span>
                        <h2 className="font-display text-7xl md:text-[9rem] font-black italic uppercase leading-[0.8] tracking-tighter">The<br/>Critiques.</h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((rev, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            whileHover={{ y: -20 }}
                            className="p-14 glass-card rounded-[4rem] border border-white/5 relative group bg-gradient-to-br from-white/[0.02] to-transparent"
                        >
                            <div className="absolute top-12 right-12 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                               <Coffee size={100} />
                            </div>
                            <div className="flex gap-1.5 mb-10 text-coffee-light">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current shadow-lg" />)}
                            </div>
                            <blockquote className="text-2xl italic text-white/80 mb-16 font-light leading-relaxed tracking-wide group-hover:text-white transition-colors duration-500 line-clamp-4 focus-within:line-clamp-none cursor-default font-serif">
                              &quot;{rev.text}&quot;
                            </blockquote>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-coffee-light transition-colors duration-700">
                                   <span className="text-2xl font-display font-black text-coffee-light">{rev.name[0]}</span>
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-display font-black text-xl uppercase italic tracking-tighter mb-1 text-white group-hover:text-coffee-light transition-colors duration-500">{rev.name}</h4>
                                    <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.3em] font-sans">{rev.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-48 px-6 bg-[#030303] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coffee-light/5 blur-[160px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    >
                        <span className="text-coffee-light font-bold tracking-[0.8em] uppercase text-[10px] mb-10 block">Reservations & Inquiries</span>
                        <h2 className="font-display text-8xl md:text-[10rem] font-black mb-16 uppercase italic leading-[0.8] tracking-tighter">Initiate<br/><span className="text-coffee-light">Contact.</span></h2>
                        
                        <div className="space-y-16 mb-24">
                            <div className="flex items-start gap-10 group">
                                <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-coffee-light/50 transition-all duration-700 shadow-2xl">
                                    <MapPin className="text-coffee-light w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="font-display font-black uppercase text-2xl italic tracking-tighter mb-3 text-white">The Sanctuary</h4>
                                    <p className="text-white/40 text-base font-light tracking-widest leading-relaxed">30 Route st, Manhattan District<br/>New York, NY 10012</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-10 group">
                                <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-coffee-light/50 transition-all duration-700 shadow-2xl">
                                    <Clock className="text-coffee-light w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="font-display font-black uppercase text-2xl italic tracking-tighter mb-3 text-white">Opening Rituals</h4>
                                    <p className="text-white/40 text-base font-light tracking-widest leading-relaxed">Mon — Fri: 07:00 — 23:00<br/>Sat — Sun: 09:00 — 01:00</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-10 group">
                                <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-coffee-light/50 transition-all duration-700 shadow-2xl">
                                    <Phone className="text-coffee-light w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="font-display font-black uppercase text-2xl italic tracking-tighter mb-3 text-white">The Hot Line</h4>
                                    <p className="text-white/40 text-base font-light tracking-widest leading-relaxed">+1 (212) ROUTE-30<br/>concierge@route30.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Map Aesthetic - Enhanced */}
                        <div className="w-full h-[500px] glass-card rounded-[4rem] overflow-hidden relative group grayscale contrast-125 opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 ring-1 ring-white/10 shadow-3xl">
                             <Image 
                                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=90&w=1200" 
                                alt="District Map" 
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[4s] ease-out"
                             />
                             <div className="absolute inset-0 bg-black/60" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="glass px-10 py-5 rounded-3xl flex items-center gap-5 border border-white/20 active:scale-95 transition-all shadow-huge"
                                  >
                                     <div className="w-3 h-3 bg-coffee-light rounded-full animate-ping" />
                                     <span className="text-xs font-black uppercase tracking-[0.5em] text-white">Live Operations Map</span>
                                 </motion.button>
                             </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="glass-card p-14 md:p-20 rounded-[5rem] border border-white/5 shadow-huge sticky top-32 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-3xl"
                    >
                        <h3 className="font-display text-7xl md:text-8xl font-black mb-16 uppercase italic leading-[0.8] tracking-tighter">Inquiry<br/><span className="text-coffee-light">Vault.</span></h3>
                        <form className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-5">
                                    <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.5em] block ml-4">Codename</label>
                                    <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 text-sm focus:border-coffee-light focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10 text-white font-light tracking-widest" placeholder="YOUR FULL NAME" />
                                </div>
                                <div className="space-y-5">
                                    <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.5em] block ml-4">Secure Mail</label>
                                    <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 text-sm focus:border-coffee-light focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10 text-white font-light tracking-widest" placeholder="YOUR@EMAIL.COM" />
                                </div>
                            </div>
                            <div className="space-y-5">
                                <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.5em] block ml-4">Subject of Interest</label>
                                <div className="relative">
                                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 text-sm focus:border-coffee-light focus:bg-white/[0.08] outline-none transition-all appearance-none text-white/40 cursor-pointer font-light tracking-widest">
                                        <option className="bg-[#050505]">VIP TABLE RESERVATION</option>
                                        <option className="bg-[#050505]">PRIVATE ARCHIVE RENTAL</option>
                                        <option className="bg-[#050505]">PRESS & MEDIA</option>
                                        <option className="bg-[#050505]">GLOBAL PARTNERSHIPS</option>
                                    </select>
                                    <ArrowRight size={18} className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-coffee-light pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-5">
                                <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.5em] block ml-4">Intel Details</label>
                                <textarea rows={6} className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 text-sm focus:border-coffee-light focus:bg-white/[0.08] outline-none transition-all resize-none placeholder:text-white/10 text-white font-light tracking-widest" placeholder="DESCRIBE YOUR REQUEST..."></textarea>
                            </div>
                            <PremiumButton className="w-full !py-10 group bg-white text-black hover:bg-coffee-light hover:text-white">
                                TRANSMIT INQUIRY <Send className="w-5 h-5 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform duration-700" />
                            </PremiumButton>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-32 px-6 border-t border-white/5 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-coffee-light/20 to-transparent" />
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl">
                           <Coffee className="text-black w-8 h-8" />
                        </div>
                        <span className="font-display font-black text-5xl tracking-tighter uppercase italic text-white">Route<span className="text-coffee-light">30.</span></span>
                    </div>
                    <p className="text-white/30 text-xl max-w-md leading-relaxed font-light font-serif mb-16">
                        The definitive destination for the modern vanguard. Where high-concept hospitality meets international architectural minimalism.
                    </p>
                    <div className="flex gap-10">
                        {['INSTAGRAM', 'LINKEDIN', 'BEHANCE', 'VIMEO'].map((social) => (
                           <a key={social} href="#" className="text-[10px] font-black tracking-[0.5em] text-white/20 hover:text-coffee-light transition-all duration-500">
                             {social}
                           </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-display font-black uppercase text-xl italic tracking-tighter mb-12 text-white">Archives</h4>
                    <ul className="space-y-6 text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
                        {['Home', 'Menu', 'Gallery', 'About', 'Contact'].map((item) => (
                           <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-500">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-display font-black uppercase text-xl italic tracking-tighter mb-12 text-white">Protocol</h4>
                    <ul className="space-y-6 text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
                        {['Privacy Vault', 'Service Terms', 'Concierge policy', 'Cookie Intel'].map((item) => (
                            <li key={item}><a href="#" className="hover:text-white transition-colors duration-500">{item}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center gap-12">
                <p className="text-white/10 text-[10px] uppercase font-black tracking-[0.8em]">© 2024 ROUTE 30 PRESTIGE CORP. GLOBAL ESTATE.</p>
                <div className="flex gap-12 text-white/10 text-[10px] uppercase font-black tracking-[0.5em]">
                   <span className="hover:text-white transition-colors cursor-pointer">NYC</span>
                   <span className="hover:text-white transition-colors cursor-pointer">LDN</span>
                   <span className="hover:text-white transition-colors cursor-pointer">TKY</span>
                   <span className="hover:text-white transition-colors cursor-pointer">DXB</span>
                </div>
            </div>
        </footer>
    );
};

const WhatsAppButton = () => {
    return (
        <motion.a
          href="https://wa.me/1234567890"
          target="_blank"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-12 right-12 z-[100] group"
        >
          <div className="relative">
              <div className="absolute inset-0 bg-coffee-light/20 rounded-[2rem] animate-ping opacity-20 pointer-events-none" />
              <div className="absolute inset-x-0 inset-y-0 bg-coffee-light/10 rounded-[2rem] blur-2xl active:blur-3xl transition-all" />
              
              <div className="relative w-20 h-20 glass rounded-[2.2rem] flex items-center justify-center border border-white/10 group-hover:border-coffee-light/50 transition-all duration-700 shadow-huge bg-[#050505]/80 backdrop-blur-2xl">
                  <MessageCircle className="text-white w-8 h-8 group-hover:text-coffee-light transition-colors duration-500" />
              </div>
              
              <div className="absolute right-28 top-1/2 -translate-y-1/2 glass px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] text-white opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap shadow-huge border border-white/10 pointer-events-none translate-x-12 group-hover:translate-x-0">
                Direct Intel Line
              </div>
          </div>
        </motion.a>
    );
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <main className="min-h-screen bg-black" />;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <MenuItems />
      <About />
      <Gallery />
      <SocialProof />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

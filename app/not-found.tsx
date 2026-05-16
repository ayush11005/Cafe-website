'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans text-white overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coffee/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 inline-flex items-center justify-center w-32 h-32 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,255,255,0.05)]"
        >
          <Compass className="w-12 h-12 text-coffee-light animate-float" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <h1 className="text-8xl md:text-[10rem] font-display font-black uppercase italic tracking-tighter leading-none mb-4">
            404<span className="text-coffee-light">.</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.4em] text-white/40 mb-12">
            Territory Unknown
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-white/60 text-lg mb-16 font-light tracking-wide leading-relaxed"
        >
          The coordinate you requested does not exist in the Route30 archive. You may have ventured beyond the sanctuary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href="/"
            className="px-12 py-5 rounded-full bg-coffee text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-coffee-light transition-all duration-700 shadow-2xl hover:shadow-coffee/40 flex items-center justify-center gap-4 group"
          >
            <Home className="w-4 h-4" />
            Return to Sanctuary
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-12 py-5 rounded-full border border-white/10 bg-white/5 text-white font-bold uppercase tracking-[0.3em] text-xs hover:border-white/40 hover:bg-white/10 transition-all duration-700 flex items-center justify-center gap-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Cache
          </button>
        </motion.div>
      </div>

      {/* Aesthetic Border */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/10 rounded-tl-[3rem] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/10 rounded-br-[3rem] pointer-events-none" />
    </div>
  );
}

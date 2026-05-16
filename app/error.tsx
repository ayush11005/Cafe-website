'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans text-white">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-coffee/10 border border-coffee-light/20 shadow-[0_0_50px_rgba(166,124,82,0.1)]"
        >
          <AlertTriangle className="w-10 h-10 text-coffee-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-6"
        >
          System <span className="text-coffee-light">Glitch.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/50 text-lg mb-12 font-light tracking-wide"
        >
          An unexpected error interrupted the luxury experience. Our digital concierge is investigating.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => reset()}
            className="px-10 py-5 rounded-full bg-coffee text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-coffee-light transition-all duration-500 flex items-center justify-center gap-3 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            Resume Experience
          </button>
          <Link
            href="/"
            className="px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white font-bold uppercase tracking-[0.3em] text-xs hover:border-white/30 transition-all duration-500 flex items-center justify-center gap-3"
          >
            <Home className="w-4 h-4" />
            Back to Base
          </Link>
        </motion.div>
        
        {error.digest && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-[10px] uppercase font-bold tracking-[0.4em] text-white/20"
          >
            Error Hash: {error.digest}
          </motion.p>
        )}
      </div>
    </div>
  );
}

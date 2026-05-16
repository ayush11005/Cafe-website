'use client';

import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700', '800', '900'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-black text-white font-sans min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center">
          <div className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <span className="text-4xl">⚠️</span>
          </div>

          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-6">
            Critical <span className="text-red-500">Failure.</span>
          </h1>

          <p className="text-white/50 text-lg mb-12 font-light tracking-wide">
            A fundamental error occurred in the core application architecture.
          </p>

          <button
            onClick={() => reset()}
            className="px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-beige transition-all duration-500"
          >
            Attempt Recovery
          </button>
          
          {error.digest && (
            <p className="mt-12 text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">
              Diagnostic ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}

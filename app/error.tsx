'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-coffee/20 border border-coffee/30">
          <AlertCircle className="w-10 h-10 text-coffee-light" />
        </div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
          Experience <span className="text-coffee-light">Interrupted</span>
        </h1>
        <p className="text-white/50 mb-10 font-light">
          We encountered a digital turbulence. Our team is restoring the sanctuary.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 rounded-full bg-coffee text-white font-bold uppercase tracking-widest text-xs hover:bg-coffee-light transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Session
          </button>
          <Link
            href="/"
            className="w-full py-4 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

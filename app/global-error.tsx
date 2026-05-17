'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', margin: 0 }}>
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '16px' }}>
            Critical <span style={{ color: '#ef4444' }}>Error</span>
          </h1>
          <p style={{ opacity: 0.6, marginBottom: '32px' }}>
            A core application failure occurred.
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: '16px 32px', borderRadius: '9999px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            Attempt Recovery
          </button>
        </div>
      </body>
    </html>
  );
}

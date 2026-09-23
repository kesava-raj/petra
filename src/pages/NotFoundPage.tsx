import React, { useEffect } from 'react';
import { HelpCircle, Home, ArrowLeft, PhoneCall, Zap } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found (404) | Agent Pettra';
  }, []);

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--accent-red)',
          marginBottom: '24px'
        }}>
          <HelpCircle size={40} />
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          404 — Page Not Found
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '32px' }}>
          The page you are looking for does not exist, has been moved, or the link may have expired.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <button
            onClick={() => navigateTo('/')}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Home size={18} />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => navigateTo('/pricing')}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Zap size={18} />
            <span>View Pricing & Plans</span>
          </button>

          <button
            onClick={() => navigateTo('/#demo')}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <PhoneCall size={18} />
            <span>Test Live Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

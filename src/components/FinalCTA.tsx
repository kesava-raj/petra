import React from 'react';
import { PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface FinalCTAProps {
  onOpenDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDemo }) => {
  const handleCta = () => {
    trackEvent('hero_cta_click', { source: 'final_cta_section' });
    onOpenDemo();
  };

  return (
    <section 
      className="final-cta-section"
      style={{
        position: 'relative',
        padding: '100px 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <style>{`
        .final-cta-section {
          background: linear-gradient(180deg, var(--bg-darkest) 0%, rgba(37, 99, 235, 0.08) 50%, var(--bg-darkest) 100%);
        }
        [data-theme="dark"] .final-cta-section {
          background: linear-gradient(180deg, #080D1A 0%, #0F172A 50%, #080D1A 100%);
        }
      `}</style>
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '780px' }}>
        
        {/* Animated Waveform Accent Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          height: '36px',
          marginBottom: '24px'
        }}>
          {[30, 60, 90, 45, 80, 100, 70, 40, 85, 55, 75, 35].map((h, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: `${h}%`,
                background: 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)',
                borderRadius: '4px',
                opacity: 0.8
              }}
            />
          ))}
        </div>

        <h2 style={{
          fontSize: 'clamp(1.85rem, 4.5vw, 3.5rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '16px'
        }}>
          Your next customer might be calling right now.
        </h2>

        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          color: 'var(--accent-blue)',
          fontWeight: 600,
          marginBottom: '36px'
        }}>
          Give them someone to answer.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleCta}
            className="btn btn-primary btn-lg btn-pulse final-cta-btn"
            id="final-talk-to-agent-pettra"
            style={{
              boxShadow: '0 0 45px rgba(59, 130, 246, 0.5)'
            }}
          >
            <PhoneCall size={22} />
            <span>Talk to Agent Pettra</span>
          </button>
        </div>

        <p className="final-cta-microcopy">
          <span className="final-cta-phrase">
            <CheckCircle2 size={16} strokeWidth={2.2} color="var(--accent-emerald)" className="final-cta-icon" />
            <span>Experience Agent Pettra before you buy.</span>
          </span>{' '}
          <span className="final-cta-phrase">
            <span>Takes less than a minute.</span>
          </span>
        </p>

      </div>

      <style>{`
        .final-cta-microcopy {
          font-size: 0.9375rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0 auto;
          line-height: 1.5;
        }
        .final-cta-phrase {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          vertical-align: middle;
          white-space: nowrap;
        }
        .final-cta-icon {
          flex-shrink: 0;
          display: inline-block;
        }
        .final-cta-btn {
          padding: 18px 48px;
          font-size: 1.25rem;
        }
        @media (max-width: 640px) {
          .final-cta-btn {
            padding: 14px 28px;
            font-size: 1.05rem;
            width: 100%;
            max-width: 320px;
          }
        }
        @media (max-width: 360px) {
          .final-cta-phrase {
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { PhoneCall, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SolutionSectionProps {
  onOpenDemo: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenDemo }) => {
  return (
    <section 
      className="solution-section"
      style={{
        padding: '72px 0',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <style>{`
        .solution-section {
          background: linear-gradient(180deg, var(--bg-darkest) 0%, rgba(37, 99, 235, 0.06) 50%, var(--bg-darkest) 100%);
        }
        [data-theme="dark"] .solution-section {
          background: linear-gradient(180deg, rgba(13, 21, 39, 0.6) 0%, rgba(30, 58, 138, 0.2) 50%, rgba(13, 21, 39, 0.6) 100%);
        }
        .solution-prop-pill {
          padding: 16px 20px;
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .solution-prop-pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
      <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
        <div className="eyebrow" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={14} />
          <span>THE SEAMLESS SOLUTION</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '20px',
          letterSpacing: '-0.025em'
        }}>
          Let Petra Handle the Calls.
        </h2>

        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '36px',
          maxWidth: '680px',
          margin: '0 auto 36px auto'
        }}>
          Petra gives your customers someone to talk to — even when your team is busy, unavailable, or out of the office.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              trackEvent('hero_cta_click', { source: 'solution_section' });
              onOpenDemo();
            }}
            className="btn btn-primary btn-lg btn-pulse"
            id="solution-talk-to-petra"
            style={{ padding: '16px 38px' }}
          >
            <PhoneCall size={20} />
            <span>Talk to Petra</span>
          </button>
        </div>

        {/* Quick Solution Value Props */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '48px',
          textAlign: 'left'
        }}>
          <div className="solution-prop-pill">
            <Zap size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>Answers on 1st Ring</span>
          </div>

          <div className="solution-prop-pill">
            <Headphones size={20} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>Zero Robotic Menus</span>
          </div>

          <div className="solution-prop-pill">
            <ShieldCheck size={20} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 600 }}>Direct Calendar Booking</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { PhoneCall, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SolutionSectionProps {
  onOpenDemo: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenDemo }) => {
  return (
    <section 
      style={{
        padding: '72px 0',
        background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.4) 0%, rgba(30, 58, 138, 0.15) 50%, rgba(13, 21, 39, 0.4) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
        <div className="eyebrow" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
          <ShieldCheck size={14} />
          <span>THE SEAMLESS SOLUTION</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '20px',
          letterSpacing: '-0.025em'
        }}>
          Let Petra Handle the Calls.
        </h2>

        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
          color: '#CBD5E1',
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
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Zap size={20} color="#F59E0B" />
            <span style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 600 }}>Answers on 1st Ring</span>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Headphones size={20} color="#3B82F6" />
            <span style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 600 }}>Zero Robotic Menus</span>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <ShieldCheck size={20} color="#10B981" />
            <span style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 600 }}>Direct Calendar Booking</span>
          </div>
        </div>
      </div>
    </section>
  );
};

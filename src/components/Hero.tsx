import React from 'react';
import { PhoneCall, Play, Sparkles, CheckCircle2, Mic, Volume2, PhoneOff } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { StatsStrip } from './StatsStrip';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenLeadModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenLeadModal }) => {
  const handlePrimaryCta = () => {
    trackEvent('hero_cta_click', { button: 'primary_call_live_demo' });
    onOpenDemo();
  };

  const handleSecondaryCta = () => {
    trackEvent('hero_cta_click', { button: 'secondary_build_business_demo' });
    if (onOpenLeadModal) {
      onOpenLeadModal();
    } else {
      onOpenDemo();
    }
  };

  const handleSetupScroll = () => {
    trackEvent('hero_cta_click', { button: 'tertiary_see_setup' });
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      style={{ 
        position: 'relative', 
        paddingTop: '60px', 
        paddingBottom: '80px', 
        overflow: 'hidden' 
      }}
      id="hero"
    >
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Copy & CTAs */}
          <div className="hero-copy-col">
            {/* Eyebrow */}
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>24/7 AI RECEPTIONIST FOR APPOINTMENT-LED BUSINESSES</span>
            </div>

            {/* Single Primary H1 */}
            <h1 className="hero-heading">
              Turn missed calls into booked appointments.
            </h1>

            {/* Supporting Copy */}
            <p className="hero-subheading">
              Agent Pettra answers routine calls, handles common questions, books into your calendar, and transfers complex callers with context, even when your team is busy or offline.
            </p>

            {/* CTA Group: Primary "Call the Live Demo" + Secondary "Build My Business Demo" */}
            <div className="hero-cta-group">
              <button
                onClick={handlePrimaryCta}
                className="btn btn-primary btn-lg btn-pulse hero-primary-btn"
                id="hero-call-live-demo"
              >
                <PhoneCall size={20} />
                <span>Call the Live Demo</span>
              </button>

              <button
                onClick={handleSecondaryCta}
                className="btn btn-secondary btn-lg hero-secondary-btn"
                id="hero-build-business-demo"
              >
                <Sparkles size={18} />
                <span>Build My Business Demo</span>
              </button>
            </div>

            {/* Information promise link */}
            <div style={{ marginBottom: '18px' }}>
              <button
                type="button"
                onClick={handleSetupScroll}
                className="hero-setup-link"
                id="hero-see-3min-setup"
              >
                <Play size={14} />
                <span>See the 3-minute setup &amp; how it works &rarr;</span>
              </button>
            </div>

            {/* Supporting Microcopy */}
            <p className="hero-microcopy">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                <CheckCircle2 size={16} strokeWidth={2.2} color="#10B981" style={{ flexShrink: 0 }} />
                <span>Try Agent Pettra live.</span>
              </span>{' '}
              <span style={{ whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                No credit card or software installation required.
              </span>
            </p>

            {/* Key trust bullets */}
            <div className="hero-trust-bullets">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                <span>&lt;650ms Response Latency</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></span>
                <span>Two-Way Calendar Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366F1' }}></span>
                <span>Contextual Staff Handoff</span>
              </div>
            </div>
          </div>


          {/* Right Column: Hero Visual - Modern Smartphone showing active call with bubbles */}
          <div className="hero-visual-col">
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
              filter: 'blur(50px)',
              zIndex: 0,
              pointerEvents: 'none'
            }}></div>

            {/* Phone Device Mockup Container */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '320px',
              background: 'linear-gradient(180deg, #111B33 0%, #080D1A 100%)',
              borderRadius: '40px',
              padding: '12px',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 35px rgba(59, 130, 246, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              
              {/* Inner Screen */}
              <div style={{
                background: 'radial-gradient(ellipse at top, #142145 0%, #0A1021 100%)',
                borderRadius: '30px',
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '410px',
                justifyContent: 'space-between'
              }}>
                {/* Dynamic Island / Speaker Notch */}
                <div style={{
                  width: '84px',
                  height: '18px',
                  background: '#000000',
                  borderRadius: '20px',
                  marginBottom: '14px'
                }}></div>

                {/* Call Header */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img 
                    src="/logo.png" 
                    alt="Agent Pettra" 
                    width={44}
                    height={44}
                    style={{
                      width: '44px',
                      height: '44px',
                      objectFit: 'contain',
                      marginBottom: '10px',
                      filter: 'drop-shadow(0 4px 14px rgba(99, 102, 241, 0.4))'
                    }}
                  />
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#60A5FA',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    AI RECEPTIONIST
                  </div>
                  <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    PETTRA
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '4px'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'pulse 1.8s infinite' }}></span>
                    <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>Connected</span>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>•</span>
                    <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontFamily: 'monospace' }}>00:18</span>
                  </div>
                </div>

                {/* Active Animated Voice Waveform Visual */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  height: '60px',
                  margin: '16px 0',
                  width: '100%'
                }}>
                  {[45, 75, 30, 90, 60, 100, 70, 85, 40, 95, 55, 80, 50, 65].map((height, i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        height: `${height}%`,
                        background: 'linear-gradient(180deg, #3B82F6 0%, #6366F1 100%)',
                        borderRadius: '4px',
                        animation: `waveAnim 1.2s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.08}s`
                      }}
                    />
                  ))}
                </div>

                {/* Key Realtime Status Card: From "hello" to booked, routed, or resolved */}
                <div style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  textAlign: 'left',
                  backdropFilter: 'blur(8px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      Operational Pipeline
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>
                      From &ldquo;Hello&rdquo; to Booked
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#F1F5F9', margin: 0, fontWeight: 500 }}>
                    Calendar slot reserved &bull; Warm staff transfer ready
                  </p>
                </div>


                {/* Simulated In-Call Controls */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  marginTop: '16px',
                  width: '100%'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CBD5E1'
                  }}>
                    <Mic size={18} />
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)'
                  }}>
                    <PhoneOff size={20} />
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CBD5E1'
                  }}>
                    <Volume2 size={18} />
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Bubble 1: Caller */}
            <div className="hero-floating-bubble-1">
              <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Caller
              </span>
              <p style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 500, margin: 0 }}>
                &ldquo;I need an appointment for this Friday afternoon.&rdquo;
              </p>
            </div>

            {/* Floating Bubble 2: Agent Pettra with FTC AI Disclosure */}
            <div className="hero-floating-bubble-2">
              <span style={{ fontSize: '0.7rem', color: '#93C5FD', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Agent Pettra (AI Receptionist)
              </span>
              <p style={{ fontSize: '0.825rem', color: '#FFFFFF', fontWeight: 500, margin: 0, lineHeight: 1.45 }}>
                &ldquo;You are speaking with Agent Pettra, AI receptionist for Dr. Miller. I have Friday at 2:00 PM open — shall I hold that for you?&rdquo;
              </p>
            </div>


          </div>

        </div>

        {/* User-Requested Stats Strip Banner */}
        <div className="hero-stats-wrapper">
          <StatsStrip />
        </div>
      </div>

      {/* Hero CSS Keyframe Animations & Responsive Rules */}
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        .hero-stats-wrapper {
          margin-top: 64px;
          position: relative;
          z-index: 2;
        }

        .hero-copy-col {
          max-width: 620px;
        }

        .hero-heading {
          font-size: clamp(2.1rem, 4.5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 55%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subheading {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          margin-bottom: 18px;
        }

        .hero-microcopy {
          font-size: 0.875rem;
          color: #94A3B8;
          font-weight: 500;
          line-height: 1.5;
        }

        .hero-trust-bullets {
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          font-size: 0.875rem;
          color: #94A3B8;
        }

        .hero-visual-col {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-floating-bubble-1 {
          position: absolute;
          top: 6%;
          left: -32px;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 12px 16px;
          max-width: 195px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          z-index: 3;
          animation: floatSlow 4s ease-in-out infinite;
        }

        .hero-floating-bubble-2 {
          position: absolute;
          bottom: 12%;
          right: -24px;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(49, 46, 129, 0.9) 100%);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(96, 165, 250, 0.35);
          border-radius: 16px;
          padding: 12px 16px;
          max-width: 230px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          z-index: 3;
          animation: floatSlow 4s ease-in-out infinite 2s;
        }

        @keyframes waveAnim {
          0% { height: 20%; }
          100% { height: 95%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        /* Tablet / iPad (768px - 1024px) */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .hero-copy-col {
            max-width: 720px;
            margin: 0 auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-microcopy {
            justify-content: center;
          }
          .hero-trust-bullets {
            justify-content: center;
          }
        }

        /* Mobile (< 640px) */
        @media (max-width: 640px) {
          .hero-grid {
            gap: 36px;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-group .btn {
            width: 100%;
          }
          .hero-trust-bullets {
            gap: 14px;
            flex-direction: column;
            align-items: center;
          }
          .hero-floating-bubble-1 {
            left: 0;
            top: -16px;
            max-width: 175px;
            padding: 8px 12px;
          }
          .hero-floating-bubble-2 {
            right: 4px;
            bottom: 2%;
            max-width: 180px;
            padding: 8px 12px;
          }
          .hero-stats-wrapper {
            margin-top: 36px;
          }
        }

        @media (max-width: 420px) {
          .hero-floating-bubble-1 {
            display: none;
          }
          .hero-floating-bubble-2 {
            position: relative;
            right: auto;
            bottom: auto;
            margin-top: 14px;
            max-width: 260px;
          }
        }

        .hero-setup-link {
          background: none;
          border: none;
          color: var(--accent-blue);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 0;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .hero-setup-link:hover {
          color: #60A5FA;
          transform: translateX(2px);
        }

        /* Light Mode High-Contrast Rules (WCAG 2.2 AA Compliance) */
        [data-theme="light"] .hero-heading {
          background: none;
          -webkit-background-clip: unset;
          -webkit-text-fill-color: initial;
          color: #0F172A;
        }

        [data-theme="light"] .hero-subheading {
          color: #334155;
        }

        [data-theme="light"] .hero-microcopy {
          color: #64748B;
        }

        [data-theme="light"] .hero-setup-link {
          color: #2563EB;
        }

        [data-theme="light"] .hero-setup-link:hover {
          color: #1D4ED8;
        }

        [data-theme="light"] .hero-trust-bullets {
          border-top-color: rgba(15, 23, 42, 0.08);
          color: #475569;
        }

        [data-theme="light"] .hero-floating-bubble-1 {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.1);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
        }

        [data-theme="light"] .hero-floating-bubble-1 p {
          color: #0F172A !important;
        }

        [data-theme="light"] .hero-floating-bubble-1 span {
          color: #64748B !important;
        }

        [data-theme="light"] .hero-floating-bubble-2 {
          background: linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%);
          border: 1px solid rgba(37, 99, 235, 0.25);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.12);
        }

        [data-theme="light"] .hero-floating-bubble-2 p {
          color: #1E293B !important;
        }

        [data-theme="light"] .hero-floating-bubble-2 span {
          color: #2563EB !important;
        }
      `}</style>
    </section>

  );
};

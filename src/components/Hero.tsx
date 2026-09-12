import React from 'react';
import { PhoneCall, Play, Sparkles, CheckCircle2, Mic, Volume2, PhoneOff } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const handlePrimaryCta = () => {
    trackEvent('hero_cta_click', { button: 'primary_talk_to_petra' });
    onOpenDemo();
  };

  const handleSecondaryCta = () => {
    trackEvent('hero_cta_click', { button: 'secondary_see_how_it_works' });
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
              <span>YOUR 24/7 AI RECEPTIONIST</span>
            </div>

            {/* Single Primary H1 */}
            <h1 className="hero-heading">
              Never Miss a Customer Call Again.
            </h1>

            {/* Supporting Copy */}
            <p className="hero-subheading">
              Meet Petra — an AI receptionist that answers calls, talks naturally with your customers, answers questions, and books appointments for your business, 24/7.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group">
              <button
                onClick={handlePrimaryCta}
                className="btn btn-primary btn-lg btn-pulse hero-primary-btn"
                id="hero-talk-to-petra"
              >
                <PhoneCall size={20} />
                <span>Talk to Petra</span>
              </button>

              <button
                onClick={handleSecondaryCta}
                className="btn btn-secondary btn-lg hero-secondary-btn"
                id="hero-see-how-it-works"
              >
                <Play size={18} />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Supporting Microcopy */}
            <p className="hero-microcopy">
              <CheckCircle2 size={16} color="#10B981" />
              <span>Try Petra yourself. It takes less than a minute.</span>
            </p>

            {/* Key trust bullets */}
            <div className="hero-trust-bullets">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                <span>Zero Hold Times</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></span>
                <span>Automated Scheduling</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366F1' }}></span>
                <span>Natural Human Tone</span>
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
                <div>
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
                    PETRA
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

                {/* Key Realtime Status Card */}
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
                      Active Task
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>
                      Matching Schedule
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#F1F5F9', margin: 0, fontWeight: 500 }}>
                    Reserving appointment for cleaning on Friday
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

            {/* Floating Bubble 1: Customer */}
            <div className="hero-floating-bubble-1">
              <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Customer
              </span>
              <p style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 500, margin: 0 }}>
                &ldquo;I&apos;d like to book an appointment.&rdquo;
              </p>
            </div>

            {/* Floating Bubble 2: Petra */}
            <div className="hero-floating-bubble-2">
              <span style={{ fontSize: '0.7rem', color: '#93C5FD', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Petra (AI Receptionist)
              </span>
              <p style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 500, margin: 0 }}>
                &ldquo;Absolutely. What day works best for you?&rdquo;
              </p>
            </div>

          </div>

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
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
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
          top: 10%;
          left: -18px;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 12px 16px;
          max-width: 210px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          z-index: 3;
          animation: floatSlow 4s ease-in-out infinite;
        }

        .hero-floating-bubble-2 {
          position: absolute;
          bottom: 12%;
          right: -18px;
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
            left: 4px;
            top: 2%;
            max-width: 170px;
            padding: 8px 12px;
          }
          .hero-floating-bubble-2 {
            right: 4px;
            bottom: 2%;
            max-width: 180px;
            padding: 8px 12px;
          }
        }
      `}</style>
    </section>
  );
};

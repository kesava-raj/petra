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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Copy & CTAs */}
          <div style={{ maxWidth: '620px' }}>
            {/* Eyebrow */}
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>YOUR 24/7 AI RECEPTIONIST</span>
            </div>

            {/* Single Primary H1 */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 55%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Never Miss a Customer Call Again.
            </h1>

            {/* Supporting Copy */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#CBD5E1',
              lineHeight: 1.6,
              marginBottom: '36px'
            }}>
              Meet Petra — an AI receptionist that answers calls, talks naturally with your customers, answers questions, and books appointments for your business, 24/7.
            </p>

            {/* CTA Group */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '18px'
            }}>
              <button
                onClick={handlePrimaryCta}
                className="btn btn-primary btn-lg btn-pulse"
                id="hero-talk-to-petra"
                style={{
                  fontSize: '1.125rem',
                  padding: '16px 36px',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.45)'
                }}
              >
                <PhoneCall size={20} />
                <span>Talk to Petra</span>
              </button>

              <button
                onClick={handleSecondaryCta}
                className="btn btn-secondary btn-lg"
                id="hero-see-how-it-works"
              >
                <Play size={18} />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Supporting Microcopy */}
            <p style={{
              fontSize: '0.875rem',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Try Petra yourself. It takes less than a minute.</span>
            </p>

            {/* Key trust bullets */}
            <div style={{
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '0.875rem',
              color: '#94A3B8'
            }}>
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
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
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
              maxWidth: '340px',
              background: 'linear-gradient(180deg, #111B33 0%, #080D1A 100%)',
              borderRadius: '44px',
              padding: '14px',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 35px rgba(59, 130, 246, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              
              {/* Inner Screen */}
              <div style={{
                background: 'radial-gradient(ellipse at top, #142145 0%, #0A1021 100%)',
                borderRadius: '32px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '440px',
                justifyContent: 'space-between'
              }}>
                {/* Dynamic Island / Speaker Notch */}
                <div style={{
                  width: '90px',
                  height: '20px',
                  background: '#000000',
                  borderRadius: '20px',
                  marginBottom: '16px'
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
                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
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
                  gap: '5px',
                  height: '70px',
                  margin: '18px 0',
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

                {/* Call Controls Mockup */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '18px',
                  width: '100%',
                  paddingTop: '12px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
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
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                  }}>
                    <PhoneOff size={22} />
                  </div>
                  <div style={{
                    width: '44px',
                    height: '44px',
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
            <div style={{
              position: 'absolute',
              top: '12%',
              left: '-24px',
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '12px 18px',
              maxWidth: '220px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
              zIndex: 3,
              animation: 'floatSlow 4s ease-in-out infinite'
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                Customer
              </span>
              <p style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 500, margin: 0 }}>
                &ldquo;I&apos;d like to book an appointment.&rdquo;
              </p>
            </div>

            {/* Floating Bubble 2: Petra */}
            <div style={{
              position: 'absolute',
              bottom: '14%',
              right: '-24px',
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(49, 46, 129, 0.85) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              borderRadius: '16px',
              padding: '12px 18px',
              maxWidth: '240px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
              zIndex: 3,
              animation: 'floatSlow 4s ease-in-out infinite 2s'
            }}>
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

      {/* Hero CSS Keyframe Animations */}
      <style>{`
        @keyframes waveAnim {
          0% { height: 20%; }
          100% { height: 95%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          #hero [style*="left: -24px"] {
            left: 5px !important;
            top: 2% !important;
          }
          #hero [style*="right: -24px"] {
            right: 5px !important;
            bottom: 2% !important;
          }
        }
      `}</style>
    </section>
  );
};

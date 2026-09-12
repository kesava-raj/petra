import { PhoneCall, Play, Sparkles, CheckCircle2 } from 'lucide-react';
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

            {/* Interactive Showcase Phone Card with User Image & Active Audio Waveform */}
            <div 
              className="hero-phone-showcase"
              onClick={handlePrimaryCta}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePrimaryCta(); }}
              title="Click to launch interactive voice demo"
            >
              {/* High-Resolution Phone Mockup Image */}
              <img 
                src="/hero-phone.png" 
                alt="Petra AI Receptionist on iPhone with live call and appointment confirmation"
                className="hero-phone-img"
              />

              {/* Real-time Animated Audio Waveform Overlay matching user image waving animation */}
              <div
                className="hero-phone-waveform-overlay"
                aria-label="Active voice audio waveform animation"
              >
                <div className="hero-waveform-glow-backdrop" />

                {[35, 65, 95, 50, 100, 80, 45, 90, 68, 85, 55, 75, 40, 60, 32].map((h, i) => (
                  <span
                    key={i}
                    className="hero-waveform-bar"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </div>

              {/* Floating "Live Voice Demo • Click to Talk" subtle pill */}
              <div className="hero-phone-cta-pill">
                <span className="hero-live-dot" />
                <span>Live Voice Demo • Click to Talk</span>
              </div>
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

        .hero-phone-showcase {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 460px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 25px 65px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(96, 165, 250, 0.28), 0 0 45px rgba(37, 99, 235, 0.2);
          border: 2px solid rgba(96, 165, 250, 0.25);
          background: #060C1B;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
          animation: floatSlow 5s ease-in-out infinite;
        }

        .hero-phone-showcase:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 35px 80px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(96, 165, 250, 0.5), 0 0 60px rgba(59, 130, 246, 0.4);
        }

        .hero-phone-img {
          width: 100%;
          height: auto;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .hero-phone-waveform-overlay {
          position: absolute;
          left: 30.58%;
          top: 64.19%;
          transform: translate(-50%, -50%);
          width: 24%;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5px;
          z-index: 10;
          pointer-events: none;
        }

        .hero-waveform-glow-backdrop {
          position: absolute;
          inset: -6px -12px;
          background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.55) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 85%);
          filter: blur(5px);
          pointer-events: none;
        }

        .hero-waveform-bar {
          flex: 1 1 0;
          max-width: 4px;
          background: linear-gradient(180deg, #67E8F9 0%, #38BDF8 50%, #818CF8 100%);
          border-radius: 3px;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.85);
          animation: heroWaveUndulate 1.2s ease-in-out infinite alternate;
          transform-origin: center;
        }

        @keyframes heroWaveUndulate {
          0% {
            transform: scaleY(0.22);
            opacity: 0.65;
          }
          50% {
            transform: scaleY(1.08);
            opacity: 1;
            filter: drop-shadow(0 0 5px #38BDF8);
          }
          100% {
            transform: scaleY(0.38);
            opacity: 0.75;
          }
        }

        .hero-phone-cta-pill {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(96, 165, 250, 0.35);
          border-radius: 20px;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #F8FAFC;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          pointer-events: none;
          transition: all 0.25s ease;
          white-space: nowrap;
          z-index: 12;
        }

        .hero-phone-showcase:hover .hero-phone-cta-pill {
          background: rgba(37, 99, 235, 0.95);
          border-color: #60A5FA;
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.7);
          transform: translateX(-50%) translateY(-2px);
        }

        .hero-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulse 1.5s infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
          .hero-phone-showcase {
            margin: 0 auto;
            max-width: 420px;
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
          .hero-phone-showcase {
            max-width: 340px;
            border-radius: 24px;
          }
          .hero-phone-cta-pill {
            font-size: 0.72rem;
            padding: 5px 12px;
            bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
};

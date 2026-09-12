import React, { useState, useEffect } from 'react';
import { PhoneCall, Sparkles, CheckCircle2, Mail, Send } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { captureEmailIntent, submitInquiry, getCachedUserDetails } from '../utils/visitorTracker';

interface FinalCTAProps {
  onOpenDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDemo }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const cached = getCachedUserDetails();
    if (cached.email) {
      setEmail(cached.email);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    captureEmailIntent(val, 'final_cta');
  };

  const handleEmailBlur = () => {
    if (email.trim()) {
      captureEmailIntent(email.trim(), 'final_cta_blur');
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    submitInquiry({
      email: email.trim(),
      inquirySource: 'final_cta'
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

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

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            onClick={handleCta}
            className="btn btn-primary btn-lg btn-pulse final-cta-btn"
            id="final-talk-to-petra"
            style={{
              boxShadow: '0 0 45px rgba(59, 130, 246, 0.5)'
            }}
          >
            <PhoneCall size={22} />
            <span>Talk to Petra</span>
          </button>
        </div>

        {/* Final CTA Inline Inquiry / Email Capture */}
        <div className="final-inquiry-box">
          <p className="final-inquiry-title">
            Prefer a setup specialist to configure your private test line?
          </p>
          
          {submitted ? (
            <div className="final-inquiry-success">
              <CheckCircle2 size={18} color="#10B981" />
              <span>We&apos;ve sent your setup package to <strong>{email}</strong>!</span>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="final-inquiry-form">
              <input
                type="email"
                required
                placeholder="Enter work email for custom setup..."
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className="final-inquiry-input"
                aria-label="Work email for custom setup"
              />
              <button 
                type="submit" 
                disabled={submitting}
                className="btn btn-secondary final-inquiry-btn"
              >
                <span>{submitting ? 'Sending...' : 'Get Setup Link'}</span>
              </button>
            </form>
          )}
        </div>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} color="var(--accent-emerald)" />
          <span>Experience Petra before you buy. Takes less than a minute.</span>
        </p>

      </div>

      <style>{`
        .final-cta-btn {
          padding: 18px 48px;
          font-size: 1.25rem;
        }

        .final-inquiry-box {
          max-width: 520px;
          margin: 0 auto 32px auto;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 18px 22px;
          backdrop-filter: blur(12px);
        }

        [data-theme="light"] .final-inquiry-box {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(37, 99, 235, 0.2);
          box-shadow: var(--shadow-md);
        }

        .final-inquiry-title {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          font-weight: 500;
        }

        .final-inquiry-form {
          display: flex;
          gap: 10px;
        }

        .final-inquiry-input {
          flex: 1;
          padding: 11px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .final-inquiry-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        .final-inquiry-btn {
          padding: 11px 20px;
          font-size: 0.875rem;
          white-space: nowrap;
        }

        .final-inquiry-success {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 10px;
          color: #10B981;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .final-cta-btn {
            padding: 14px 28px;
            font-size: 1.05rem;
            width: 100%;
            max-width: 320px;
          }
          .final-inquiry-form {
            flex-direction: column;
          }
          .final-inquiry-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

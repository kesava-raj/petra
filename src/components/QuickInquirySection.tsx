import React, { useState } from 'react';
import { Sparkles, CheckCircle2, User, Building, Mail, Phone, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface QuickInquirySectionProps {
  onOpenVoiceDemo?: () => void;
}

export const QuickInquirySection: React.FC<QuickInquirySectionProps> = ({ onOpenVoiceDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Dental'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);

    // Track analytics event
    trackEvent('lead_submitted', {
      ...formData,
      source: 'landing_page_inquiry_section'
    });

    // Dispatch to standard conversion trackers if present
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        lead_source: 'landing_page_inquiry_section',
        email: formData.email,
        business_name: formData.businessName,
        business_type: formData.businessType
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_label: 'inquiry_section'
        });
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Inquiry Form',
          content_category: formData.businessType
        });
      }

      // Store in local storage for records
      try {
        const existing = JSON.parse(localStorage.getItem('petra_inquiries') || '[]');
        existing.unshift({
          ...formData,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('petra_inquiries', JSON.stringify(existing.slice(0, 50)));
      } catch {
        // Fallback
      }
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section 
      id="inquiry" 
      className="section-padding quick-inquiry-section"
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <style>{`
        .quick-inquiry-card {
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          border-radius: 28px;
          padding: clamp(28px, 5vw, 48px);
          box-shadow: var(--shadow-lg);
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 40px;
          align-items: center;
        }

        .quick-inquiry-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .quick-inquiry-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .quick-inquiry-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        .quick-inquiry-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-blue);
          border: 1px solid rgba(37, 99, 235, 0.2);
          margin-bottom: 12px;
        }

        @media (max-width: 860px) {
          .quick-inquiry-card {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 520px) {
          .quick-inquiry-input-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="quick-inquiry-card">
          
          {/* Left Column: Value Pitch */}
          <div>
            <div className="quick-inquiry-pill">
              <Sparkles size={13} />
              <span>CUSTOM VOICE SETUP</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              Want to hear Petra answer for your actual business?
            </h2>

            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              Tell us your business type and services. We&apos;ll configure a live preview phone number tailored to your schedule so you can call and test it yourself.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Custom trained on your real services & pricing
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Syncs with Google Calendar, Outlook, or booking software
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Zero setup fees • Ready within 2 hours
                </span>
              </div>
            </div>

            <div style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)'
            }}>
              <ShieldCheck size={16} color="var(--accent-blue)" />
              <span>We respect your privacy. No spam, ever.</span>
            </div>
          </div>

          {/* Right Column: Inquiry Form / Success State */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: 'clamp(20px, 3.5vw, 32px)'
          }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    Request Your Test Line
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Fill in your details to receive your private demo link:
                  </p>
                </div>

                {/* Row 1: Name & Business */}
                <div className="quick-inquiry-input-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                      Your Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jordan Miller"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="quick-inquiry-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                      Business Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Building size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        required
                        placeholder="Miller Dental Wellness"
                        value={formData.businessName}
                        onChange={(e) => handleFieldChange('businessName', e.target.value)}
                        className="quick-inquiry-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="quick-inquiry-input-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                      Work Email
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        required
                        placeholder="jordan@practice.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className="quick-inquiry-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                      Phone Number
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="tel"
                        required
                        placeholder="(555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="quick-inquiry-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Industry */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '4px' }}>
                    Business Category
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Briefcase size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleFieldChange('businessType', e.target.value)}
                      className="quick-inquiry-input"
                    >
                      <option value="Dental">Dental Clinic</option>
                      <option value="Medical">Medical Practice</option>
                      <option value="Salon & Spa">Salon & Spa</option>
                      <option value="Med Spa">Med Spa / Aesthetics</option>
                      <option value="Legal">Law Practice</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Home Services">Home Services / HVAC / Plumbing</option>
                      <option value="Auto Services">Auto Services</option>
                      <option value="Other">Other Appointment Business</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <span>{submitting ? 'Creating Test Line...' : 'Send Me My Test Line'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Preview Line Initialized!
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>. We&apos;ve sent your access confirmation to <strong>{formData.email}</strong> with instructions to call your dedicated test line for {formData.businessName}.
                </p>

                {onOpenVoiceDemo && (
                  <button
                    onClick={onOpenVoiceDemo}
                    className="btn btn-secondary"
                    style={{ padding: '10px 24px', fontSize: '0.875rem' }}
                  >
                    <span>Try the Instant Voice Demo</span>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

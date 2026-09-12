import React, { useState } from 'react';
import { Sparkles, CheckCircle2, User, Building, Mail, Phone, Briefcase, MessageSquare, Send, Clock, ShieldCheck, Headphones } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface InquirySectionProps {
  onOpenDemo?: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Dental',
    inquiryType: 'Custom Demo Line',
    message: ''
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

    trackEvent('lead_submitted', {
      ...formData,
      source: 'inquiry_section'
    });

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        lead_source: 'inquiry_section',
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
      className="section-padding inquiry-section"
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <style>{`
        .inquiry-card {
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          border-radius: 28px;
          padding: clamp(28px, 5vw, 48px);
          box-shadow: var(--shadow-lg);
          max-width: 1040px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 48px;
          align-items: start;
        }

        .inquiry-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .inquiry-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .inquiry-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        .inquiry-textarea {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          min-height: 90px;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .inquiry-textarea:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        .inquiry-highlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(37, 99, 235, 0.12);
          color: var(--accent-blue);
          border: 1px solid rgba(37, 99, 235, 0.25);
          margin-bottom: 14px;
        }

        .inquiry-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .inquiry-perk-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-blue);
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (max-width: 960px) {
          .inquiry-card {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 540px) {
          .inquiry-input-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>DIRECT INQUIRY</span>
          </div>
          <h2 className="section-title">
            Have questions or need a custom setup?
          </h2>
          <p className="section-subtitle">
            Get in touch with our solutions team. We&apos;ll configure a live preview phone line trained on your actual business within 2 hours.
          </p>
        </div>

        {/* Inquiry Card Container */}
        <div className="inquiry-card">
          
          {/* Left Column: What Happens Next & Value Commitments */}
          <div>
            <div className="inquiry-highlight-badge">
              <Headphones size={13} />
              <span>DEDICATED ONBOARDING</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              Let&apos;s build your 24/7 AI front desk.
            </h3>

            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              Whether you want a private test number, need custom multi-calendar routing, or want to discuss enterprise call volumes, we&apos;re here to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Fast 2-Hour Turnaround
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Receive a personalized demo phone number configured with your practice hours and FAQs.
                  </p>
                </div>
              </div>

              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon">
                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Seamless Calendar Integration
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Direct sync with Google Calendar, Outlook, and major practice scheduling systems.
                  </p>
                </div>
              </div>

              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Zero Commitment & No Spam
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Test Petra risk-free with no credit card required and strict privacy standards.
                  </p>
                </div>
              </div>
            </div>

            {onOpenDemo && (
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Want to hear Petra right now?
                </p>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="btn btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.875rem' }}
                >
                  <span>Launch Live Voice Demo</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry Form / Success State */}
          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: 'clamp(20px, 3.5vw, 32px)'
          }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    Send Your Inquiry
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Fill out the form below and an AI implementation specialist will reach out.
                  </p>
                </div>

                {/* Row 1: Name & Business */}
                <div className="inquiry-input-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jordan Miller"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="inquiry-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      Business Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Building size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        required
                        placeholder="Miller Dental Wellness"
                        value={formData.businessName}
                        onChange={(e) => handleFieldChange('businessName', e.target.value)}
                        className="inquiry-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="inquiry-input-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      Work Email *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        required
                        placeholder="jordan@practice.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className="inquiry-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="tel"
                        required
                        placeholder="(555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="inquiry-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Industry & Inquiry Type */}
                <div className="inquiry-input-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      Business Category
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Briefcase size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleFieldChange('businessType', e.target.value)}
                        className="inquiry-input"
                      >
                        <option value="Dental">Dental Clinic</option>
                        <option value="Medical">Medical Practice</option>
                        <option value="Salon & Spa">Salon & Spa</option>
                        <option value="Med Spa">Med Spa / Aesthetics</option>
                        <option value="Legal">Law Practice</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Home Services">Home Services / HVAC</option>
                        <option value="Auto Services">Auto Services</option>
                        <option value="Other">Other Appointment Business</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                      What do you need?
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Sparkles size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => handleFieldChange('inquiryType', e.target.value)}
                        className="inquiry-input"
                      >
                        <option value="Custom Demo Line">Private Test Line Setup</option>
                        <option value="Pricing & Plans">Pricing & Custom Quota</option>
                        <option value="Integration">Calendar & CRM Integration</option>
                        <option value="Enterprise">Multi-Location Practice</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Message or Special Requirements (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MessageSquare size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '14px' }} />
                    <textarea
                      placeholder="Tell us about your practice, current call handling challenges, or preferred test times..."
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      className="inquiry-textarea"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '6px', justifyContent: 'center' }}
                  id="inquiry-submit-btn"
                >
                  <Send size={18} />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  margin: '0 auto 20px auto'
                }}>
                  <CheckCircle2 size={36} />
                </div>

                <h3 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Inquiry Received!
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you, <strong>{formData.name}</strong>. We&apos;ve sent a confirmation to <strong>{formData.email}</strong>. Our onboarding team will configure your preview line for <strong>{formData.businessName}</strong> within 2 hours.
                </p>

                {onOpenDemo && (
                  <button
                    onClick={onOpenDemo}
                    className="btn btn-primary"
                    style={{ padding: '12px 28px' }}
                  >
                    <span>Test Instant Voice Demo in the Meantime</span>
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

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Building, Mail, Phone, User, Briefcase } from 'lucide-react';
import { LeadFormData } from '../types';
import { trackEvent } from '../utils/analytics';
import { captureEmailIntent, submitInquiry, getCachedUserDetails, cacheUserDetails } from '../utils/visitorTracker';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Dental'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cached = getCachedUserDetails();
      setFormData(prev => ({
        name: cached.name || prev.name,
        businessName: cached.businessName || prev.businessName,
        email: cached.email || prev.email,
        phone: cached.phone || prev.phone,
        businessType: prev.businessType
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      cacheUserDetails({ [field]: value });
      return updated;
    });

    if (field === 'email') {
      captureEmailIntent(value, 'modal');
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      captureEmailIntent(formData.email.trim(), 'modal_blur');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('lead_submitted', { ...formData });

    submitInquiry({
      ...formData,
      inquirySource: 'modal'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <style>{`
        .lead-modal-fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 520px) {
          .lead-modal-fields-row {
            grid-template-columns: 1fr;
          }
        }
        .lead-modal-input:focus {
          outline: none;
          border-color: var(--accent-blue) !important;
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }
      `}</style>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="lead-modal-card glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          aria-label="Close modal"
          className="lead-modal-close-btn"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="eyebrow" style={{ marginBottom: '12px' }}>
              <Sparkles size={14} />
              <span>CUSTOM BUSINESS SETUP</span>
            </div>

            <h3 id="lead-modal-title" style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Get Petra for Your Business
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              Provide your details and we&apos;ll configure a custom preview tailored to your appointment calendar and services.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Jordan Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="lead-modal-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Business Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Miller Dental Wellness"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="lead-modal-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem'
                    }}
                  />
                </div>
              </div>

              <div className="lead-modal-fields-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Work Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      required
                      placeholder="jordan@practice.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={handleEmailBlur}
                      className="lead-modal-input"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        fontSize: '0.9375rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="lead-modal-input"
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        fontSize: '0.9375rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Business Type
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="lead-modal-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem'
                    }}
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
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '8px', padding: '14px' }}
              >
                <span>{isSubmitting ? 'Configuring Preview...' : 'See How Petra Can Work for My Business'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              margin: '0 auto 20px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
              We&apos;re Preparing Your Custom Setup!
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '28px' }}>
              Thank you, {formData.name}. Our onboarding specialist will connect your calendar and send you a private test line for {formData.businessName} within 2 hours.
            </p>

            <button
              onClick={handleModalClose}
              className="btn btn-primary"
              style={{ padding: '12px 32px' }}
            >
              <span>Back to Demo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

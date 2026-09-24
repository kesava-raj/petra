import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Building, Mail, Phone, User, Briefcase } from 'lucide-react';
import { LeadFormData } from '../types';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: { planId: string; billingCycle: 'monthly' | 'annual' } | null;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Dental'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedLeadId, setConfirmedLeadId] = useState<string>('');

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Non-PII analytics event per compliance
    trackEvent('lead_submitted', { 
      businessType: formData.businessType,
      hasBusinessName: Boolean(formData.businessName),
      planId: selectedPlan?.planId,
      billingCycle: selectedPlan?.billingCycle
    });

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        lead_source: selectedPlan ? `pricing_${selectedPlan.planId}_${selectedPlan.billingCycle}` : 'modal',
        business_type: formData.businessType
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_label: selectedPlan ? `${selectedPlan.planId}_${selectedPlan.billingCycle}` : 'modal'
        });
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Lead Capture Modal',
          content_category: formData.businessType
        });
      }
    }

    const planText = selectedPlan 
      ? `${formatPlanName(selectedPlan.planId)} (${selectedPlan.billingCycle})`
      : 'General Custom Demo Request';

    // Submit live with unique correlation leadId and server confirmation
    const result = await submitLead({
      source: 'lead_modal',
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      businessType: formData.businessType,
      needsOrPlan: `Plan: ${planText}`,
      message: 'Submitted via Plan Selection / Build My Custom Demo modal'
    });

    setConfirmedLeadId(result.leadId);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const formatPlanName = (id: string) => {
    if (id === 'growth') return 'Growth ⭐';
    if (id === 'pro') return 'Pro';
    return 'Starter';
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'max(16px, env(safe-area-inset-top, 16px)) max(16px, env(safe-area-inset-right, 16px)) max(16px, env(safe-area-inset-bottom, 16px)) max(16px, env(safe-area-inset-left, 16px))'
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
          maxHeight: '92dvh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: '24px',
          padding: 'clamp(22px, 4vw, 36px)',
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
              Get Agent Pettra for Your Business
            </h3>

            {selectedPlan && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '12px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                color: 'var(--accent-blue)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}>
                <span>Plan: <strong>{formatPlanName(selectedPlan.planId)}</strong></span>
                <span>•</span>
                <span>{selectedPlan.billingCycle === 'annual' ? 'Annual (2 Months Free 🎉)' : 'Monthly'}</span>
              </div>
            )}

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              Provide your details and we&apos;ll configure a custom preview tailored to your appointment calendar and services.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="modal-lead-name" style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    id="modal-lead-name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    required
                    placeholder="Dr. Jordan Miller"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
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
                <label htmlFor="modal-lead-bizname" style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Business Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    id="modal-lead-bizname"
                    name="organization"
                    autoComplete="organization"
                    type="text"
                    required
                    placeholder="Miller Dental Wellness"
                    value={formData.businessName}
                    onChange={(e) => handleFieldChange('businessName', e.target.value)}
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
                  <label htmlFor="modal-lead-email" style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Work Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      id="modal-lead-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="jordan@practice.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
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
                  <label htmlFor="modal-lead-phone" style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      id="modal-lead-phone"
                      name="tel"
                      autoComplete="tel"
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
                <label htmlFor="modal-lead-biztype" style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                  Business Type
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <select
                    id="modal-lead-biztype"
                    name="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleFieldChange('businessType', e.target.value)}
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
                <span>{isSubmitting ? 'Configuring Demo...' : 'Build My Custom Demo'}</span>
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px', lineHeight: 1.45 }}>
                By submitting, you agree to receive communications regarding your demo line setup. No automated spam. Zero third-party data broker sharing. See our{' '}
                <span style={{ color: 'var(--accent-blue)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => window.location.href = '/privacy'}>
                  Privacy Policy
                </span>.
              </p>
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

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Custom Demo Line Requested!
            </h3>

            {confirmedLeadId && (
              <div style={{
                display: 'inline-block',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: 'var(--accent-blue)',
                fontWeight: 700,
                marginBottom: '16px'
              }}>
                Reference: {confirmedLeadId}
              </div>
            )}

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '28px' }}>
              Thank you, {formData.name}. Our onboarding team will configure your private test line and practice workflow for {formData.businessName || 'your business'} within 15 minutes during business hours.
            </p>

            <button
              onClick={handleModalClose}
              className="btn btn-primary"
              style={{ padding: '12px 32px' }}
            >
              <span>Back to Site</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

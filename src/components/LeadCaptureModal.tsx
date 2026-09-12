import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Building, Mail, Phone, User, Briefcase } from 'lucide-react';
import { LeadFormData } from '../types';
import { trackEvent } from '../utils/analytics';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('lead_submitted', { ...formData });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
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
      background: 'rgba(4, 7, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(59, 130, 246, 0.2)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#CBD5E1',
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

            <h3 id="lead-modal-title" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Get Petra for Your Business
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px', lineHeight: 1.5 }}>
              Provide your details and we&apos;ll configure a custom preview tailored to your appointment calendar and services.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Jordan Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '0.9375rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '6px' }}>
                  Business Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Miller Dental Wellness"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '0.9375rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '6px' }}>
                    Work Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      required
                      placeholder="jordan@practice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.9375rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.9375rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: '#CBD5E1', fontWeight: 600, marginBottom: '6px' }}>
                  Business Type
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      background: '#0D1527',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
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

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              We&apos;re Preparing Your Custom Setup!
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '28px' }}>
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

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Briefcase, 
  MessageSquare, 
  Send, 
  Clock, 
  CalendarCheck,
  ShieldCheck, 
  Headphones, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface InquirySectionProps {
  onOpenDemo?: () => void;
}

const BUSINESS_CATEGORIES = [
  'Dental Clinic',
  'Medical Practice',
  'Salon & Spa',
  'Med Spa / Aesthetics',
  'Law Practice',
  'Real Estate',
  'Home Services / HVAC',
  'Auto Services',
  'Other Appointment Business'
];

const NEED_OPTIONS = [
  { id: 'test_line', label: 'Private Test Line Setup', desc: 'Receive a dedicated number configured for your business' },
  { id: 'calendar', label: 'Calendar & EHR/CRM Integration', desc: 'Sync Google, Outlook, or booking software' },
  { id: 'pricing', label: 'Pricing & Custom Minute Quota', desc: 'Discuss high-volume or practice group plans' },
  { id: 'multilocation', label: 'Multi-Location / Enterprise', desc: 'Route calls across multiple offices or departments' },
  { id: 'general', label: 'General Questions', desc: 'Ask about AI capabilities, tone, or compliance' },
];

export const InquirySection: React.FC<InquirySectionProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: 'Dental Clinic',
    message: ''
  });

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['test_line']);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleNeed = (id: string) => {
    setSelectedNeeds(prev => {
      if (prev.includes(id)) {
        // keep at least one selected or allow empty
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);

    const payload = {
      ...formData,
      needs: selectedNeeds.map(id => NEED_OPTIONS.find(o => o.id === id)?.label).filter(Boolean),
      source: 'inquiry_section'
    };

    trackEvent('lead_submitted', {
      ...formData,
      inquiryNeeds: selectedNeeds.join(','),
      source: 'inquiry_section'
    });

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        lead_source: 'inquiry_section',
        email: formData.email,
        business_name: formData.businessName,
        business_type: formData.businessType,
        inquiry_needs: selectedNeeds
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
        const existing = JSON.parse(localStorage.getItem('agent_pettra_inquiries') || localStorage.getItem('petra_inquiries') || '[]');
        existing.unshift({
          ...payload,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('agent_pettra_inquiries', JSON.stringify(existing.slice(0, 50)));
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
          grid-template-columns: 1.05fr 1.25fr;
          gap: clamp(32px, 4vw, 48px);
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
          min-height: 80px;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .inquiry-textarea:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        /* Custom Dropdown Styling */
        .custom-dropdown-btn {
          width: 100%;
          padding: 12px 14px 12px 40px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .custom-dropdown-btn:focus,
        .custom-dropdown-btn.active {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-blue-glow);
        }

        .custom-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          border-radius: 14px;
          box-shadow: var(--shadow-lg), 0 10px 30px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(16px);
          z-index: 50;
          max-height: 250px;
          overflow-y: auto;
          padding: 6px;
          animation: dropFade 0.2s ease;
        }

        @keyframes dropFade {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .custom-dropdown-option {
          width: 100%;
          padding: 10px 14px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.15s, color 0.15s;
        }

        .custom-dropdown-option:hover {
          background: var(--bg-secondary);
          color: var(--accent-blue);
        }

        .custom-dropdown-option.selected {
          background: rgba(37, 99, 235, 0.12);
          color: var(--accent-blue);
          font-weight: 600;
        }

        /* Checkbox Grid & Cards */
        .checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .checkbox-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
        }

        .checkbox-card:hover {
          border-color: rgba(37, 99, 235, 0.4);
          background: var(--bg-card);
        }

        .checkbox-card.checked {
          background: rgba(37, 99, 235, 0.08);
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 1px var(--accent-blue);
        }

        .checkbox-indicator {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.5px solid var(--border-subtle);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          transition: all 0.2s ease;
        }

        .checkbox-card.checked .checkbox-indicator {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: #FFFFFF;
        }

        .checkbox-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .checkbox-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.3;
          margin-top: 2px;
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
          gap: 16px;
        }

        .inquiry-perk-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .inquiry-perk-icon.blue {
          background: rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.25);
          color: var(--accent-blue);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.12);
        }

        .inquiry-perk-icon.emerald {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: var(--accent-emerald);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.12);
        }

        .inquiry-perk-icon.indigo {
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          color: var(--accent-indigo);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.12);
        }

        [data-theme="dark"] .inquiry-perk-icon.blue {
          background: rgba(59, 130, 246, 0.16);
          border-color: rgba(59, 130, 246, 0.35);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
        }

        [data-theme="dark"] .inquiry-perk-icon.emerald {
          background: rgba(16, 185, 129, 0.16);
          border-color: rgba(16, 185, 129, 0.35);
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
        }

        [data-theme="dark"] .inquiry-perk-icon.indigo {
          background: rgba(99, 102, 241, 0.16);
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
        }

        .inquiry-perk-item:hover .inquiry-perk-icon {
          transform: translateY(-2px);
        }

        @media (max-width: 980px) {
          .inquiry-card {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 600px) {
          .inquiry-input-grid {
            grid-template-columns: 1fr;
          }
          .checkbox-grid {
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
          
          {/* Left Column: Value Commitments */}
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
              Whether you want a private test line, need multi-calendar routing, or want custom minutes for your practice group, we&apos;re ready to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon blue">
                  <Clock size={22} strokeWidth={2.2} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                    Fast 2&#8209;Hour Turnaround
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.55 }}>
                    Receive a personalized demo phone number configured with your practice hours and FAQs.
                  </p>
                </div>
              </div>

              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon emerald">
                  <CalendarCheck size={22} strokeWidth={2.2} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                    Seamless Calendar Integration
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.55 }}>
                    Direct sync with Google Calendar, Outlook, and major practice scheduling systems.
                  </p>
                </div>
              </div>

              <div className="inquiry-perk-item">
                <div className="inquiry-perk-icon indigo">
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                    Zero Commitment &amp; Strict Privacy
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.55 }}>
                    Test Agent Pettra risk-free with no credit card required and no spam guarantee.
                  </p>
                </div>
              </div>
            </div>

            {onOpenDemo && (
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Want to hear Agent Pettra right now?
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

                {/* Row 3: Business Category (UI Adapted Custom Dropdown) */}
                <div ref={categoryRef} style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Business Category
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className={`custom-dropdown-btn ${isCategoryOpen ? 'active' : ''}`}
                    aria-haspopup="listbox"
                    aria-expanded={isCategoryOpen}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Briefcase size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px' }} />
                      <span>{formData.businessType}</span>
                    </div>
                    <ChevronDown 
                      size={16} 
                      color="var(--text-muted)" 
                      style={{ 
                        transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </button>

                  {isCategoryOpen && (
                    <div className="custom-dropdown-menu" role="listbox">
                      {BUSINESS_CATEGORIES.map((cat) => {
                        const isSelected = formData.businessType === cat;
                        return (
                          <button
                            type="button"
                            key={cat}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              handleFieldChange('businessType', cat);
                              setIsCategoryOpen(false);
                            }}
                            className={`custom-dropdown-option ${isSelected ? 'selected' : ''}`}
                          >
                            <span>{cat}</span>
                            {isSelected && <Check size={14} color="var(--accent-blue)" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Row 4: What do you need? (UI Adapted Checkbox Cards) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                    What do you need? (Select all that apply)
                  </label>
                  
                  <div className="checkbox-grid">
                    {NEED_OPTIONS.map((opt) => {
                      const isChecked = selectedNeeds.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                          onClick={() => toggleNeed(opt.id)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              toggleNeed(opt.id);
                            }
                          }}
                          className={`checkbox-card ${isChecked ? 'checked' : ''}`}
                        >
                          <div className="checkbox-indicator">
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <div>
                            <div className="checkbox-title">{opt.label}</div>
                            <div className="checkbox-desc">{opt.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Row 5: Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
                    Message or Practice Details (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MessageSquare size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '14px' }} />
                    <textarea
                      placeholder="Tell us about your current front-desk workflow, expected call hours, or specific questions..."
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
                  style={{ width: '100%', marginTop: '4px', justifyContent: 'center' }}
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
                  Thank you, <strong>{formData.name}</strong>. We&apos;ve sent a confirmation to <strong>{formData.email}</strong>. Our team will configure your preview line for <strong>{formData.businessName}</strong> within 2 hours.
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

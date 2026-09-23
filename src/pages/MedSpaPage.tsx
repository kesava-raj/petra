import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Building2, 
  Send, 
  HeartHandshake,
  Flower2
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

interface MedSpaPageProps {
  onOpenDemo?: () => void;
}

const MEDSPA_TRANSCRIPT = [
  { sender: 'caller', text: "Hi, I'm calling to see how much your Morpheus8 radiofrequency microneedling treatment is, and if you have any consultation openings this Friday.", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the AI receptionist for Lumière Aesthetics & Wellness. I'd be happy to share our consultation details. Our Morpheus8 packages typically start at $850 per session, with custom multi-treatment packages determined during your personal evaluation. Are you a new client with our clinic?", time: "0:10" },
  { sender: 'caller', text: "Yes, this would be my first visit.", time: "0:18" },
  { sender: 'petra', text: "Welcome! For new clients, we recommend a 30-minute skin consultation with our nurse injector. This Friday, we have openings at 1:30 PM or 3:45 PM. Would either of those fit your schedule?", time: "0:26" },
  { sender: 'caller', text: "Friday at 1:30 PM works great.", time: "0:32" },
  { sender: 'petra', text: "Perfect. I have reserved Friday at 1:30 PM for you with Nurse Sarah. We will send you an SMS confirmation along with our brief pre-treatment prep notes. If you have any medical contraindications or recent procedures you'd like to discuss before Friday, I can transfer you directly to our clinical coordinator.", time: "0:42" },
  { sender: 'caller', text: "That is wonderful, thank you so much!", time: "0:47" }
];

export const MedSpaPage: React.FC<MedSpaPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    locations: '1 location',
    monthlyCalls: '100-300 calls/mo',
    bookingSystem: 'Boulevard / Vagaro / Zenoti / Mindbody'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist for Med Spas & Aesthetic Practices | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'medspa' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'medspa_page',
      businessType: 'Med Spa / Aesthetics',
      locations: formData.locations
    });

    const result = await submitLead({
      source: 'medspa_page',
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Med Spa / Aesthetics',
      needsOrPlan: `Med Spa Consultation Flow (${formData.locations}, ${formData.monthlyCalls}, System: ${formData.bookingSystem})`,
      message: 'Requested customized Med Spa consultation demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="medspa-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb Bar */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button 
            onClick={() => navigateTo('/')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          >
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Med Spas & Aesthetics</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(236, 72, 153, 0.06), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(236, 72, 153, 0.1)', color: '#DB2777', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Flower2 size={16} />
            <span>CONSULTATION-CALL HANDLING FOR MED SPA TEAMS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Turn more consultation calls into clear next steps.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            Give prospective clients immediate, practice-approved answers, consultation scheduling, and a smooth handoff when a specialist is needed—day, night, and between treatments.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('medspa-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Med Spa Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('medspa-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Request a Custom Consultation Flow</span>
            </button>
          </div>

          {/* Operational Trust Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Immediate consultation booking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Approved pricing ranges & prep FAQs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#8B5CF6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Smooth clinical escalation rules</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Operational Med Spa Workflow Proof */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Aesthetic Consultation Architecture
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              How Agent Pettra Handles Treatment Inquiries
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              Designed to preserve brand elegance and provide accurate policy answers without offering medical advice.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Treatment Triage', desc: 'Identifies interest (Injectables, Body Contouring, Laser, Facials) without diagnosing or prescribing.' },
              { step: '02', title: 'Approved Prep & Pricing', desc: 'Explains approved pricing ranges, consultation deposit policies, and basic pre-care instructions.' },
              { step: '03', title: 'Consultation Calendar Sync', desc: 'Checks live openings for aesthetic injectors or estheticians and reserves the evaluation appointment.' },
              { step: '04', title: 'Confirmation & Directions', desc: 'Sends an instant branded SMS with clinic address, arrival guidance, and cancellation policies.' },
              { step: '05', title: 'Specialist Escalation', desc: 'Warmly transfers contraindications, post-procedure questions, or complex cases to clinical staff.' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px 20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', opacity: 0.8, marginBottom: '12px' }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Med Spa Call & Transcript */}
      <section id="medspa-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Live Sample Call
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to a Consultation Booking Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Hear how Agent Pettra answers pricing questions with warmth, sets expectations, and books a high-intent consultation in under 50 seconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Flower2 size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Sample Call: Lumière Aesthetics</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: First-Time Morpheus8 Consultation Request (0:47)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Consultation Confirmed</span>
              </div>
            </div>

            {/* Transcript Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {MEDSPA_TRANSCRIPT.map((msg, i) => (
                <div 
                  key={i} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'caller' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'caller' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', gap: '8px' }}>
                    <span>{msg.sender === 'caller' ? 'Prospective Client' : 'Agent Pettra (AI Receptionist)'}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '16px',
                    fontSize: '0.925rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'caller' ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    color: msg.sender === 'caller' ? '#FFFFFF' : 'var(--text-primary)',
                    border: msg.sender === 'caller' ? 'none' : '1px solid var(--border-subtle)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-blue)" />
              <span>FTC & Privacy Notice: Clear AI disclosure given on connection. No medical or health claims are stored in ad pixels.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Qualifier Form */}
      <section id="medspa-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Request a Custom Med Spa Consultation Flow
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
              Test how Agent Pettra answers your specific treatment questions, pricing guidelines, and booking rules.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
            {!submitted ? (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Med Spa / Practice Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Lumière Aesthetics & Skin"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Work Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="elena@lumiereaesthetics.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 456-7890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Number of Locations
                    </label>
                    <select 
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>1 boutique location</option>
                      <option>2-3 locations</option>
                      <option>4+ locations / Franchise</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Monthly Inbound Calls (approx.)
                    </label>
                    <select 
                      value={formData.monthlyCalls}
                      onChange={(e) => setFormData({ ...formData, monthlyCalls: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>Under 100 calls/mo</option>
                      <option>100-300 calls/mo</option>
                      <option>300-750 calls/mo</option>
                      <option>750+ calls/mo</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn btn-primary btn-lg" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Creating Consultation Demo Line...' : 'Build My Med Spa Demo Line'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Consultation Demo Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. We are setting up a private demo phone line configured for <strong>{formData.businessName}</strong>. Our specialist will contact you with your demo line within 15 minutes during business hours.
                </p>
                <button 
                  onClick={() => navigateTo('/')}
                  className="btn btn-primary"
                  style={{ padding: '10px 24px' }}
                >
                  Back to Main Overview
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

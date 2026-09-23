import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Building2, 
  Send, 
  HeartPulse, 
  AlertCircle 
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const MEDICAL_TRANSCRIPT = [
  { sender: 'caller', text: "Hello, I'm calling to schedule an annual physical exam with Dr. Patricia Reynolds for next month.", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the AI scheduling receptionist for Highland Medical Associates. Dr. Reynolds has openings for preventative annual physicals on Tuesday, October 14th at 9:00 AM or Thursday, October 16th at 2:30 PM. Would either of those times suit you?", time: "0:10" },
  { sender: 'caller', text: "Tuesday at 9:00 AM works well. Do I need to fast before the blood work?", time: "0:18" },
  { sender: 'petra', text: "Yes, our lab recommends fasting from midnight the night before. Water is fine. I have reserved Tuesday, October 14th at 9:00 AM with Dr. Reynolds for your physical. May I have your full name and date of birth to match your patient chart?", time: "0:28" },
  { sender: 'caller', text: "Eleanor Vance, August 14th, 1982.", time: "0:35" },
  { sender: 'petra', text: "Thank you, Eleanor. Your appointment is reserved, and I've sent an instant confirmation text with parking directions to this number. If you experience acute symptoms before then, please contact our on-call nurse line.", time: "0:46" },
  { sender: 'caller', text: "Thank you so much for making that so easy.", time: "0:51" }
];

interface MedicalPageProps {
  onOpenDemo?: () => void;
}

export const MedicalPage: React.FC<MedicalPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
    providersCount: '1-3 physicians',
    monthlyCalls: '100-300 calls/mo',
    ehrSystem: 'AthenaHealth / Epic / eClinicalWorks'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist for Medical Practices & Clinics | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'medical' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'medical_page',
      businessType: 'Medical Practice',
      providersCount: formData.providersCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.practiceName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Medical Practice',
      needsOrPlan: `Medical Practice Intake (${formData.providersCount}, ${formData.monthlyCalls}, EHR: ${formData.ehrSystem})`,
      message: 'Requested customized Medical Practice reception demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="medical-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Medical Practices</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Stethoscope size={16} />
            <span>AI CALL ROUTING & APPOINTMENT INTAKE FOR MEDICAL CLINICS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Reduce routine phone load and route appointment requests safely.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            Agent Pettra answers routine administrative calls, handles clinic hours & prep questions, schedules appointments, and escalates acute patient concerns according to strict clinical rules.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('medical-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Medical Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('medical-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Build My Clinic Demo</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Zero hold times for routine scheduling</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Minimum necessary intake boundaries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#8B5CF6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Instant clinical triage escalation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Protocol */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Clinical Intake Architecture
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              How Agent Pettra Handles Inbound Patient Calls
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Intent & Acuity Screen', desc: 'Identifies new patient scheduling, follow-ups, prescription refill requests, or urgent medical symptoms.' },
              { step: '02', title: 'Clinic-Approved FAQs', desc: 'Answers questions about hours, directions, accepted insurances, and pre-visit fasting rules strictly from your practice policy.' },
              { step: '03', title: 'Provider Availability', desc: 'Checks specific physician or nurse practitioner calendar openings and collects minimal required intake.' },
              { step: '04', title: 'Appointment Reservation', desc: 'Holds the appointment slot and texts confirmation with clinic directions and portal registration links.' },
              { step: '05', title: 'Clinical Staff Transfer', desc: 'Transfers acute symptoms, prescription questions, or lab results immediately to your triage nursing staff.' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px 20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', opacity: 0.8, marginBottom: '12px' }}>
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

      {/* Transcript Demo */}
      <section id="medical-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to a Real Medical Practice Scheduling Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Hear how Agent Pettra books an annual exam, answers lab fasting rules, and verifies patient chart identity in under 55 seconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Highland Medical Associates</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: Annual Physical Booking & Lab Fasting FAQ (0:51)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Visit Scheduled</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {MEDICAL_TRANSCRIPT.map((msg, i) => (
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
                    <span>{msg.sender === 'caller' ? 'Patient' : 'Agent Pettra (AI)'}</span>
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
              <span>Compliance Notice: Agent Pettra does not provide medical diagnosis or clinical advice. Acute symptoms are routed directly to your licensed staff.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifier Form */}
      <section id="medical-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Build a Custom Medical Practice Demo Line
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              We will set up a dedicated test line configured with your providers, specialty intake questions, and escalation rules.
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
                      placeholder="Dr. Nathan Shaw"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Practice Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Highland Medical Care"
                      value={formData.practiceName}
                      onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
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
                      placeholder="nathan@highlandmed.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Practice Phone *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 345-6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Practicing Providers
                    </label>
                    <select 
                      value={formData.providersCount}
                      onChange={(e) => setFormData({ ...formData, providersCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>Solo Practitioner</option>
                      <option>1-3 physicians</option>
                      <option>4-10 physicians</option>
                      <option>Multi-specialty Clinic / Hospital Group</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Monthly Calls (approx.)
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

                <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                  <Send size={18} />
                  <span>{submitting ? 'Configuring Clinic Demo Line...' : 'Build My Medical Practice Demo Line'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Clinic Demo Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. Our clinical integration team will configure your private test line for <strong>{formData.practiceName}</strong> within 15 minutes during business hours.
                </p>
                <button onClick={() => navigateTo('/')} className="btn btn-primary" style={{ padding: '10px 24px' }}>
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

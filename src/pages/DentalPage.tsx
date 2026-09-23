import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Volume2, 
  Play, 
  Pause, 
  Building2, 
  UserCheck, 
  HelpCircle, 
  AlertTriangle,
  Stethoscope,
  Send,
  PhoneForwarded,
  FileCheck
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

interface DentalPageProps {
  onOpenDemo?: () => void;
}

const DENTAL_TRANSCRIPT = [
  { sender: 'caller', text: "Hi, I have a chipped molar from dinner last night and I really need to see Dr. Miller today if possible.", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the AI receptionist for Miller Dental Wellness. I'm sorry to hear about your tooth. We do hold urgent triage openings for chipped teeth and pain today. Are you an existing patient with us?", time: "0:08" },
  { sender: 'caller', text: "Yes, I was there about six months ago for a cleaning. My name is David Miller.", time: "0:15" },
  { sender: 'petra', text: "Thank you, David. Dr. Miller has an emergency evaluation slot open at 2:15 PM today, or with Dr. Chen at 4:30 PM. Would 2:15 PM work for you?", time: "0:23" },
  { sender: 'caller', text: "2:15 PM is perfect. Do you accept Delta Dental Premier?", time: "0:29" },
  { sender: 'petra', text: "Yes, we are in-network with Delta Dental Premier. I have reserved your 2:15 PM evaluation. I'll send a confirmation SMS to your number right now. If your pain spikes before then, please let me know and I can transfer you directly to our clinical triage team.", time: "0:38" },
  { sender: 'caller', text: "That was so fast. Thank you!", time: "0:43" }
];

export const DentalPage: React.FC<DentalPageProps> = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
    locations: '1 location',
    monthlyCalls: '100-300 calls/mo',
    currentSoftware: 'Dentrix / Eaglesoft / Open Dental'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist for Dental Practices | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'dental' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'dental_page',
      businessType: 'Dental Practice',
      locations: formData.locations
    });

    const result = await submitLead({
      source: 'dental_page',
      name: formData.name,
      businessName: formData.practiceName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Dental Practice',
      needsOrPlan: `Dental Practice Setup (${formData.locations}, ${formData.monthlyCalls}, Software: ${formData.currentSoftware})`,
      message: 'Requested customized Dental Practice demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="dental-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Dental Practices</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Stethoscope size={16} />
            <span>AI CALL COVERAGE FOR GROWING DENTAL PRACTICES</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Keep appointment requests moving, even when the front desk is busy.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            Agent Pettra answers routine calls, handles practice-approved insurance & office questions, books appointments into your calendar, and transfers clinical or urgent matters according to your rules.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('dental-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Dental Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('dental-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Build My Practice Demo</span>
            </button>
          </div>

          {/* Operational Trust Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Zero hold times for new patients</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Minimum intake & HIPAA boundaries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#8B5CF6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>After-hours & lunch coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Operational Dental Workflow Proof */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Standard Dental Reception Protocol
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              How Agent Pettra Handles Inbound Practice Calls
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              Built specifically to relieve front-desk phone congestion while respecting clinical boundaries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Intent Identification', desc: 'Distinguishes between new patient scheduling, existing recall, billing inquiry, or urgent toothache.' },
              { step: '02', title: 'Approved FAQs Only', desc: 'Answers accepted insurances, hours, location, and parking strictly from your verified practice knowledgebase.' },
              { step: '03', title: 'Availability Check', desc: 'Inspects permitted hygiene or doctor chair openings and collects only the minimum necessary intake.' },
              { step: '04', title: 'Calendar Hold & Confirmation', desc: 'Books or reserves the appointment slot and sends an instant SMS summary to the patient.' },
              { step: '05', title: 'Clinical Warm Transfer', desc: 'Transfers clinical emergencies, severe swelling, or out-of-scope calls to your on-call staff immediately.' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px 20px', position: 'relative' }}>
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

      {/* Interactive Dental Demo Call & Transcript */}
      <section id="dental-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Product Proof
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to a Real Dental Scheduling Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Notice how Agent Pettra identifies the urgent chipped tooth, confirms insurance in-network status, and reserves a chair slot in 45 seconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Sample Call: Miller Dental Wellness</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: Existing Patient Urgent Evaluation (0:45)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Appointment Booked</span>
              </div>
            </div>

            {/* Transcript Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {DENTAL_TRANSCRIPT.map((msg, i) => (
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
                    <span>{msg.sender === 'caller' ? 'Patient (David Miller)' : 'Agent Pettra (AI Receptionist)'}</span>
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

            {/* AI Disclosure Notice */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-blue)" />
              <span>FTC Compliance: Agent Pettra transparently discloses its AI identity at the start of every practice conversation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Qualifier / Custom Demo Form */}
      <section id="dental-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Build a Demo Configured for Your Dental Practice
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
              We will set up a private trial phone line matching your clinic hours, insurance providers, and scheduling rules.
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
                      placeholder="Dr. Jordan Hayes"
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
                      placeholder="Hayes Family Dental"
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
                      placeholder="jordan@hayesdental.com"
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
                      placeholder="(555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Practice Locations
                    </label>
                    <select 
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>1 location</option>
                      <option>2-3 locations</option>
                      <option>4+ locations (DSO / Group)</option>
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
                  <span>{submitting ? 'Setting Up Custom Demo Line...' : 'Build My Practice Demo Line'}</span>
                </button>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                  No software installation required. We configure a dedicated test number for your staff to trial.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Practice Demo Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. We are creating a test line tailored for <strong>{formData.practiceName}</strong>. Our clinical workflow team will reach out with your test number within 15 minutes during business hours.
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

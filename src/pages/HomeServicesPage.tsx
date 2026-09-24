import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  Wrench,
  Flame,
  AlertCircle
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

interface HomeServicesPageProps {
  onOpenDemo?: () => void;
}

const HOMESERVICES_TRANSCRIPT = [
  { sender: 'caller', text: "Hello! Our central AC unit completely stopped blowing cold air about an hour ago, and it's 88 degrees inside with my kids here.", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the AI dispatcher for Beacon Heating & Cooling. I understand how uncomfortable that is. We offer emergency same-day dispatch for cooling outages. What is your ZIP code?", time: "0:09" },
  { sender: 'caller', text: "We are in North Austin, ZIP 78759.", time: "0:16" },
  { sender: 'petra', text: "78759 is directly within our primary service territory. We have an on-call technician, Marcus, available for priority dispatch between 3:00 PM and 5:00 PM today. Does that window work for an on-site diagnosis?", time: "0:25" },
  { sender: 'caller', text: "Yes, please! How much is the diagnostic fee?", time: "0:30" },
  { sender: 'petra', text: "Our standard diagnostic visit is $89, which is applied directly toward any approved repair work. May I have your street address and best contact number?", time: "0:39" },
  { sender: 'caller', text: "It's 4210 Oak Ridge Drive, and you have my cell number.", time: "0:45" },
  { sender: 'petra', text: "Got it, 4210 Oak Ridge Drive. Marcus is booked for your 3:00 to 5:00 PM window. I've sent an instant SMS confirmation and technician tracking link to this number. If you smell burning or notice electrical sparks, please let me know to alert our master electrician.", time: "0:56" },
  { sender: 'caller', text: "Thank you so much, that's such a relief!", time: "1:01" }
];

export const HomeServicesPage: React.FC<HomeServicesPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    tradeType: 'HVAC',
    techniciansCount: '3-10 technicians',
    dispatchSoftware: 'ServiceTitan / Housecall Pro / Jobber'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Answering Service for Home Services & HVAC | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'home_services' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'home_services_page',
      businessType: `Home Services (${formData.tradeType})`,
      techniciansCount: formData.techniciansCount
    });

    const result = await submitLead({
      source: 'home_services_page',
      name: formData.name,
      businessName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      businessType: `Home Services - ${formData.tradeType}`,
      needsOrPlan: `Home Services Dispatch Flow (${formData.tradeType}, ${formData.techniciansCount}, Software: ${formData.dispatchSoftware})`,
      message: 'Requested customized Home Services call flow and test line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="home-services-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Home Services & Field Contractors</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(245, 158, 11, 0.07), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.12)', color: '#D97706', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Wrench size={16} />
            <span>AFTER-HOURS DISPATCH & INBOUND JOB CAPTURE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Answer every service call, even after hours.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            Agent Pettra captures the job details, checks service area and technician availability, books approved requests, and routes true emergencies directly to your on-call team using rules you define.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('homeservices-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Home Services Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('homeservices-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Map My Call Flow</span>
            </button>
          </div>

          {/* Operational Trust Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Immediate job booking in your dispatch window</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>ZIP code & territory validation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#8B5CF6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>On-call escalation for real emergencies</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Operational Home Services Workflow */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Field Dispatch Protocol
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              How Agent Pettra Routes and Books Inbound Jobs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              Ensure every high-ticket HVAC, plumbing, or electrical repair is captured while filtering out tire-kickers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Triage & ZIP Validation', desc: 'Captures service trade, customer address, ZIP code, urgency level, and preferred arrival window.' },
              { step: '02', title: 'Territory Confirmation', desc: 'Validates against your active service areas before promising any truck arrival or quote.' },
              { step: '03', title: 'Arrival Window Reservation', desc: 'Holds a 2-hour dispatch window based on your technician schedule and fee guidelines.' },
              { step: '04', title: 'Emergency On-Call Transfer', desc: 'Instantly transfers critical emergencies (e.g. burst pipe, no heat in freeze) to your on-call supervisor.' },
              { step: '05', title: 'Dispatch Summary & SMS', desc: 'Pushes full call transcript, audio, and customer record straight to your CRM and texts the homeowner.' },
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

      {/* Interactive Home Services Call & Transcript */}
      <section id="homeservices-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Live Sample Call
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to an Urgent HVAC Dispatch Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Observe how Agent Pettra validates the homeowner&apos;s ZIP code, confirms the diagnostic fee, and books technician Marcus in 60 seconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Sample Call: Beacon Heating & Cooling</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: Urgent AC Outage / Same-Day Dispatch (1:01)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Technician Dispatched</span>
              </div>
            </div>

            {/* Transcript Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {HOMESERVICES_TRANSCRIPT.map((msg, i) => (
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
                    <span>{msg.sender === 'caller' ? 'Homeowner' : 'Agent Pettra (AI Dispatcher)'}</span>
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

            {/* Emergency Life-Safety & Dispatch Boundary Notice */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  Emergency Life-Safety &amp; Field Dispatch Boundary
                </strong>
                Agent Pettra handles routine job intake, service territory verification, and standard appointment scheduling. For critical life-safety hazards (active gas smells, electrical fire hazards, severe structural water breaks), Agent Pettra is programmed to immediately advise callers to evacuate, dial 911, and trigger immediate high-priority escalation to your on-call master technician.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contractor Qualifier Form */}
      <section id="homeservices-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Map Your Dispatch & Call Flow
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
              We will set up a dedicated trial line configured with your service territory, pricing minimums, and on-call technician rules.
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
                      placeholder="Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Company Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Beacon Heating & Air"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
                      placeholder="marcus@beaconhvac.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Dispatch / Phone *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 789-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Primary Trade
                    </label>
                    <select 
                      value={formData.tradeType}
                      onChange={(e) => setFormData({ ...formData, tradeType: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>HVAC / Cooling & Heating</option>
                      <option>Plumbing & Drain</option>
                      <option>Electrical</option>
                      <option>Roofing & Restoration</option>
                      <option>Multi-Trade Home Services</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Field Technicians
                    </label>
                    <select 
                      value={formData.techniciansCount}
                      onChange={(e) => setFormData({ ...formData, techniciansCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      <option>1-2 technicians</option>
                      <option>3-10 technicians</option>
                      <option>10+ technicians</option>
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
                  <span>{submitting ? 'Setting Up Dispatch Line...' : 'Build My Home Services Demo Line'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Dispatch Demo Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. We are generating a dedicated dispatch demo line for <strong>{formData.companyName}</strong>. Our onboarding team will send your test line credentials within 15 minutes during business hours.
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

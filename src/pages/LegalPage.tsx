import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  AlertCircle,
  FileText,
  Lock,
  PhoneCall
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const LEGAL_TRANSCRIPT = [
  { sender: 'caller', text: "Hello, I was involved in a three-car highway collision yesterday and the other driver's insurance is pressuring me to sign a settlement release. I need to speak with an attorney immediately.", time: "0:02" },
  { sender: 'petra', text: "I'm so sorry you're dealing with that, and I'm glad you're seeking legal counsel before signing any documents. You are speaking with Agent Pettra, the intake receptionist for Vance & Harrington Law. We represent motor vehicle injury matters throughout Georgia. First, were you or anyone else evaluated at an emergency room or hospital?", time: "0:15" },
  { sender: 'caller', text: "Yes, I was taken to Northside Emergency with a fractured collarbone and severe whiplash. The accident happened yesterday on I-85 in Fulton County.", time: "0:23" },
  { sender: 'petra', text: "Thank you for sharing that. Please note that as an AI intake assistant, I cannot provide legal advice, but our managing trial partner, David Vance, reviews all serious collision cases. He has consultation openings tomorrow at 10:30 AM or 2:00 PM for an immediate case assessment. Which time works best for you?", time: "0:36" },
  { sender: 'caller', text: "Tomorrow at 10:30 AM works well. Is there an upfront fee for this consultation?", time: "0:42" },
  { sender: 'petra', text: "All personal injury consultations at Vance & Harrington are 100% complimentary and strictly confidential under attorney work-product standards. I've placed a priority hold for tomorrow at 10:30 AM. May I have your full legal name and best mobile number?", time: "0:53" },
  { sender: 'caller', text: "Marcus Holloway, at (404) 555-0182.", time: "0:58" },
  { sender: 'petra', text: "Thank you, Marcus. I have reserved your consultation with Attorney Vance and texted your confirmation with a secure upload link for your police report or insurance letters. Attorney Vance will call you directly at 10:30 AM. Please rest and take care.", time: "1:10" },
  { sender: 'caller', text: "Thank you so much. You've given me huge peace of mind.", time: "1:14" }
];

interface LegalPageProps {
  onOpenDemo?: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    firmName: '',
    email: '',
    phone: '',
    practiceArea: 'Personal Injury & Civil Litigation',
    attorneysCount: '2-5 attorneys',
    monthlyCalls: '100-300 calls/mo',
    practiceSoftware: 'Clio / MyCase / PracticePanther'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Client Intake & Answering Service for Law Firms | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'legal' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'legal_page',
      businessType: 'Law Firm',
      practiceArea: formData.practiceArea,
      attorneysCount: formData.attorneysCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.firmName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Law Firm',
      needsOrPlan: `Law Firm Intake Setup (${formData.practiceArea}, ${formData.attorneysCount}, ${formData.monthlyCalls}, Software: ${formData.practiceSoftware})`,
      message: 'Requested customized Law Firm intake protocol and demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="legal-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Law Firms & Legal Practices</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.09), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Scale size={16} />
            <span>ATTORNEY-CLIENT INTAKE PROTOCOL & 24/7 CALL CAPTURE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '940px', marginBottom: '20px' }}>
            Capture high-value legal inquiries the moment prospective clients call.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginBottom: '32px' }}>
            When prospective clients face an urgent legal crisis, they hire the first responsive firm. Agent Pettra qualifies practice area fit, screens conflicts, verifies jurisdiction, and schedules consultations 24/7 without offering unauthorized legal advice.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('legal-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Legal Intake Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('legal-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
            >
              Configure Firm Workflow
            </button>
          </div>

          {/* Operational Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366F1', marginBottom: '4px' }}>&lt; 3 Sec</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Zero missed calls when attorneys are in court or depositions</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '4px' }}>100% Guardrail</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Strict UPL compliance: no legal counsel or liability guarantees</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '4px' }}>Instant Sync</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Direct intake into Clio, MyCase, Filevine, & Outlook Calendars</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Protocol Section */}
      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              OPERATIONAL BLUEPRINT
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              The 5-Step Legal Intake Protocol
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Designed to preserve prospective client trust, verify preliminary conflict criteria, and prevent unauthorized practice of law (UPL).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Identity & UPL Disclosure</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Greets callers promptly with your firm name and explicitly disclaims that Agent Pettra is an AI intake coordinator and cannot render legal advice.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Practice Area & Jurisdiction Screen</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Categorizes caller matter (Personal Injury, Estate Planning, Family Law, Defense) and confirms incident location falls within your licensed jurisdictions.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Pre-Conflict & Incident Facts</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Gathers caller identity, opposing party name, incident date, and critical injury or claim factors for conflict checking prior to attorney engagement.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>4</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Consultation Scheduling & Fees</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Offers available calendar blocks for assigned attorneys, explains consultation fee policies (contingency, flat fee, or paid retainer), and confirms bookings.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>5</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>EHR/CRM Sync & Secure Document Link</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Pushes structured dossier to Clio, MyCase, or Smokeball; texts prospective client an intake questionnaire link to upload accident reports or court summons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section: Interactive Call Transcript */}
      <section id="legal-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AUDIO & DIALOGUE PROOF
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Hear Agent Pettra manage an urgent case inquiry
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Listen to how Agent Pettra gathers incident details, upholds non-legal advice rules, and schedules the attorney consultation.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-subtle)', padding: '28px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>
                  <Scale size={22} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Motor Vehicle Accident Case Intake</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vance & Harrington Legal • Auto Accident Litigation</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Clock size={14} />
                <span>Call Duration: 1m 14s</span>
              </div>
            </div>

            {/* Transcript Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '440px', overflowY: 'auto', paddingRight: '6px' }}>
              {LEGAL_TRANSCRIPT.map((msg, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'petra' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'petra' ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, color: msg.sender === 'petra' ? '#6366F1' : 'var(--accent-blue)' }}>
                      {msg.sender === 'petra' ? 'Agent Pettra (AI Intake)' : 'Prospective Client'}
                    </span>
                    <span>• {msg.time}</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'petra' ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: msg.sender === 'petra' ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid var(--border-subtle)',
                    borderTopLeftRadius: msg.sender === 'petra' ? '4px' : '16px',
                    borderTopRightRadius: msg.sender === 'caller' ? '4px' : '16px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* ABA Model Rule 5.5 & Legal Ethics Boundary Notice */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={18} color="#6366F1" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  ABA Model Rule 5.5 / UPL &amp; Attorney-Client Ethics Boundary
                </strong>
                Agent Pettra is strictly an administrative intake assistant and does NOT provide legal advice, assess liability, predict case outcomes, or quote non-public legal retainers. Communications with Agent Pettra do NOT establish an attorney-client relationship. All prospective caller details are screened for jurisdictional boundaries and prospective adverse parties before routing to a licensed attorney in good standing. In compliance with advertising platform policies, zero sensitive case facts or party names are transmitted to ad pixels.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Compliance & Security Guardrails */}
      <section style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ETHICAL COMPLIANCE & PRIVACY
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Built specifically to satisfy state bar association intake ethics
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <AlertCircle size={20} color="#6366F1" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>UPL Guardrail Enforced</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Agent Pettra strictly limits discussions to scheduling, general firm fees, and logistical screening. It will never provide case outcome predictions or evaluate liability.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Lock size={20} color="var(--accent-emerald)" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>SOC-2 & Confidential Storage</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Call recordings and intake notes are transmitted over TLS 1.3 encryption and stored in SOC-2 Type II compliant vaults, protecting prospective attorney-client privilege.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <FileText size={20} color="var(--accent-blue)" />
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Conflict Triage Pre-Check</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Captures the opposing party and incident entity names upfront so your conflicts coordinator or practice software can flag adverse parties prior to attorney calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="legal-form-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PRACTICE QUALIFICATION
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Configure your law firm's intake answering line
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Receive an interactive demo number pre-configured with your firm's practice areas and intake questionnaire.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Law Firm Intake Demo Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                  We have mapped your intake parameters. Reference ID: <strong style={{ color: '#6366F1' }}>{leadId}</strong>. Check your inbox for your private live testing number.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => {
                      if (onOpenDemo) onOpenDemo();
                      else navigateTo('/#demo');
                    }}
                    className="btn btn-primary"
                  >
                    Test Live Answering Right Now
                  </button>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                    Configure Another Practice
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Attorney Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Law Firm Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jenkins & Morales Law LLP"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Work Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="sjenkins@jenkinslaw.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Direct Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(404) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Primary Practice Area
                    </label>
                    <select
                      value={formData.practiceArea}
                      onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Personal Injury & Civil Litigation">Personal Injury & Torts</option>
                      <option value="Family Law & Divorce">Family Law & Divorce</option>
                      <option value="Estate Planning & Probate">Estate Planning & Probate</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Corporate / Commercial Law">Corporate / Commercial Law</option>
                      <option value="General Multi-Practice">General Practice</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Attorneys Count
                    </label>
                    <select
                      value={formData.attorneysCount}
                      onChange={(e) => setFormData({ ...formData, attorneysCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Solo Practitioner">Solo Practitioner</option>
                      <option value="2-5 attorneys">2-5 attorneys</option>
                      <option value="6-15 attorneys">6-15 attorneys</option>
                      <option value="16+ attorneys">16+ attorneys</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Practice Management Software
                    </label>
                    <select
                      value={formData.practiceSoftware}
                      onChange={(e) => setFormData({ ...formData, practiceSoftware: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Clio">Clio Manage / Grow</option>
                      <option value="MyCase">MyCase</option>
                      <option value="PracticePanther">PracticePanther</option>
                      <option value="Smokeball">Smokeball</option>
                      <option value="Filevine">Filevine</option>
                      <option value="Other / Google Calendar">Google Calendar / Other</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ marginTop: '12px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Generating Legal Intake Demo...' : 'Generate Practice Intake Line'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  Activity,
  FileCheck,
  Stethoscope,
  Heart
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const WELLNESS_TRANSCRIPT = [
  { sender: 'caller', text: "Hi, I strained my lower back lifting heavy moving boxes over the weekend and I can barely sit comfortably. Do you have any openings for an assessment this week?", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the patient intake coordinator for Elevate Physical Therapy & Spine. I'm so sorry to hear about your acute back strain. For lumbar discomfort, we schedule an initial 60-minute mobility and biomechanics evaluation with Dr. Vance, our Doctor of Physical Therapy. We have openings tomorrow at 1:30 PM or Thursday at 9:00 AM. Would either of those fit your schedule?", time: "0:21" },
  { sender: 'caller', text: "Tomorrow at 1:30 PM would be great. Do you accept Blue Cross Blue Shield PPO?", time: "0:28" },
  { sender: 'petra', text: "Yes, we are in-network with Blue Cross Blue Shield PPO, and our team verifies your exact copay or deductible prior to your arrival. We also accept HSA and FSA cards. I've placed a hold for tomorrow at 1:30 PM. May I have your full legal name and date of birth?", time: "0:42" },
  { sender: 'caller', text: "Julian Reynolds, May 14th, 1988.", time: "0:48" },
  { sender: 'petra', text: "Thank you, Julian. I've confirmed your evaluation with Dr. Vance for tomorrow at 1:30 PM. I just texted your mobile a secure link to complete your digital medical history and upload your insurance card. Please wear loose athletic attire. We look forward to helping you recover tomorrow!", time: "1:03" },
  { sender: 'caller', text: "Thank you so much, that was incredibly easy!", time: "1:07" }
];

interface WellnessPageProps {
  onOpenDemo?: () => void;
}

export const WellnessPage: React.FC<WellnessPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    modalities: 'Physical Therapy & Chiropractic',
    providerCount: '3-6 providers',
    monthlyCalls: '100-300 calls/mo',
    ehrSystem: 'Jane App / WebPT / ChiroTouch'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist & Intake for Wellness & Physical Therapy | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'wellness' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'wellness_page',
      businessType: 'Wellness Clinic',
      modalities: formData.modalities,
      providerCount: formData.providerCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.clinicName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Wellness Clinic',
      needsOrPlan: `Wellness Clinic Setup (${formData.modalities}, ${formData.providerCount}, ${formData.monthlyCalls}, EHR: ${formData.ehrSystem})`,
      message: 'Requested customized Wellness / PT intake demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="wellness-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Wellness Clinics & Physical Therapy</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <HeartPulse size={16} />
            <span>CLINICAL INTAKE & SCHEDULING FOR WELLNESS, PT & CHIROPRACTIC</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '940px', marginBottom: '20px' }}>
            Keep treatment tables full while your therapists are healing patients.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginBottom: '32px' }}>
            When clinicians are hands-on in treatment sessions, ringing front desks lead to frustrated patients and empty appointment slots. Agent Pettra triages clinical disciplines, collects insurance details, answers cash/HSA FAQs, and books 60-minute initial evaluations 24/7.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('wellness-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Clinic Intake Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('wellness-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
            >
              Configure Practice Intake
            </button>
          </div>

          {/* Operational Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '4px' }}>100% Inbound</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Never lose a patient inquiry during active rehab or adjustment sessions</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '4px' }}>Insurance Intake</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Captures Payer ID, member #, and HSA/FSA payment preferences</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '4px' }}>EHR Native</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Jane App, WebPT, Kareo, and ChiroTouch synchronized</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Wellness Protocol */}
      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              CLINICAL INTAKE PROTOCOL
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              The 5-Step Wellness Intake Workflow
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Designed with strict healthcare privacy standards to route patients to the appropriate provider and modality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Modality & Symptom Screening</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Categorizes caller reason for visit (acute injury, post-op rehab, spinal adjustment, acupuncture, wellness maintenance) without diagnosing medical conditions.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Practitioner Matching</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Routes patients according to doctor specialty (Physical Therapist vs Chiropractor vs Licensed Acupuncturist) and checks existing chart history.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Insurance & Self-Pay Explanation</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Confirms in-network health insurance carriers, collects member policy details for verification, or explains transparent cash-rate packages and HSA/FSA eligibility.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>4</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Evaluation Duration & Booking</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Applies correct appointment duration rules (e.g. 60-min Initial Evaluation vs 30-min Follow-up Adjustment) directly into clinician calendar slots.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>5</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>EHR Sync & Intake Form Delivery</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Syncs patient record with Jane App, WebPT, or ChiroTouch and texts a secure link for online intake questionnaires, pain maps, and clinic policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section: Interactive Call Transcript */}
      <section id="wellness-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INTAKE CALL DEMONSTRATION
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Hear Agent Pettra handle an acute injury booking
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Listen to how Agent Pettra gathers complaint history, checks insurance carrier compatibility, and confirms the initial physical therapy evaluation.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-subtle)', padding: '28px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
                  <HeartPulse size={22} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Acute Lumbar Strain Intake & Evaluation</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Elevate Physical Therapy & Spine</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Clock size={14} />
                <span>Call Duration: 1m 07s</span>
              </div>
            </div>

            {/* Transcript Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '440px', overflowY: 'auto', paddingRight: '6px' }}>
              {WELLNESS_TRANSCRIPT.map((msg, index) => (
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
                    <span style={{ fontWeight: 700, color: msg.sender === 'petra' ? 'var(--accent-emerald)' : 'var(--accent-blue)' }}>
                      {msg.sender === 'petra' ? 'Agent Pettra (Patient Intake)' : 'New Patient'}
                    </span>
                    <span>• {msg.time}</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'petra' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: msg.sender === 'petra' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-subtle)',
                    borderTopLeftRadius: msg.sender === 'petra' ? '4px' : '16px',
                    borderTopRightRadius: msg.sender === 'caller' ? '4px' : '16px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Notice Footer */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
              <span>Full compliance with HIPAA encryption, minimum necessary disclosure, and red-flag medical escalation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="wellness-form-section" style={{ padding: '72px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PRACTICE SETUP
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Configure your clinic's patient intake answering line
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Receive an interactive demo number configured with your clinic's treatment disciplines, insurance networks, and intake guidelines.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Wellness Clinic Intake Demo Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                  Your clinic intake configuration is stored. Reference ID: <strong style={{ color: 'var(--accent-emerald)' }}>{leadId}</strong>. We've sent your private test line and setup guide directly to your email.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => {
                      if (onOpenDemo) onOpenDemo();
                      else navigateTo('/#demo');
                    }}
                    className="btn btn-primary"
                  >
                    Test Live Voice Engine
                  </button>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                    Configure Another Clinic
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Practice Director / Owner Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. Julian Vance, DPT"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Clinic / Practice Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Elevate Physical Therapy & Spine"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
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
                      placeholder="dr.vance@elevatephysicaltherapy.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Clinic Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 345-6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Core Disciplines
                    </label>
                    <select
                      value={formData.modalities}
                      onChange={(e) => setFormData({ ...formData, modalities: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Physical Therapy Only">Physical Therapy</option>
                      <option value="Chiropractic Care Only">Chiropractic Care</option>
                      <option value="Physical Therapy & Chiropractic">PT & Chiropractic Combined</option>
                      <option value="Acupuncture & Integrative">Acupuncture & Chinese Medicine</option>
                      <option value="Multi-Disciplinary Wellness Center">Multi-Disciplinary Center</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Treating Providers
                    </label>
                    <select
                      value={formData.providerCount}
                      onChange={(e) => setFormData({ ...formData, providerCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Solo Practitioner">Solo Practitioner</option>
                      <option value="2-4 providers">2-4 providers</option>
                      <option value="5-10 providers">5-10 providers</option>
                      <option value="10+ providers / Multi-Clinic">10+ providers / Multi-Clinic</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      EHR / Practice Software
                    </label>
                    <select
                      value={formData.ehrSystem}
                      onChange={(e) => setFormData({ ...formData, ehrSystem: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Jane App">Jane App</option>
                      <option value="WebPT">WebPT</option>
                      <option value="ChiroTouch">ChiroTouch</option>
                      <option value="Kareo">Kareo / Tebra</option>
                      <option value="ClinicSource">ClinicSource</option>
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
                  <span>{submitting ? 'Generating Clinic Line...' : 'Generate Patient Intake Line'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

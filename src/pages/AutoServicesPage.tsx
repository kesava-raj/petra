import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  Car, 
  Key,
  Layers,
  Settings
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const AUTO_TRANSCRIPT = [
  { sender: 'caller', text: "Hi, I have a 2021 Honda CR-V and the front brakes started squealing loudly whenever I come to a stop. Do you have any openings to look at it this week?", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the service advisor assistant for Precision Auto Care. Squealing brakes typically indicate the pad wear indicators are alerting you before rotor damage occurs. We can inspect your braking system and rotors this Thursday. We have morning drop-off windows between 7:30 AM and 8:30 AM. Would Thursday morning fit your routine?", time: "0:18" },
  { sender: 'caller', text: "Thursday at 7:30 AM would be ideal since I can drop it off on my way to the office. Do you have an early key drop box?", time: "0:25" },
  { sender: 'petra', text: "Yes, absolutely! We have a secure 24/7 key drop box to the left of Service Bay 1. Our brake safety inspection is $65, which is credited 100% toward any brake repair work you authorize. May I have your full name and best mobile number?", time: "0:39" },
  { sender: 'caller', text: "David Chen, at (555) 432-8765.", time: "0:44" },
  { sender: 'petra', text: "Thank you, David. I've reserved your Thursday 7:30 AM bay slot for your 2021 Honda CR-V. I just texted your confirmation with our address, key-drop instructions, and digital check-in pass. Drive cautiously, and our lead technician will inspect it first thing Thursday morning.", time: "0:58" },
  { sender: 'caller', text: "Awesome, thanks for making scheduling so painless!", time: "1:02" }
];

interface AutoServicesPageProps {
  onOpenDemo?: () => void;
}

export const AutoServicesPage: React.FC<AutoServicesPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    email: '',
    phone: '',
    bayCount: '4-8 service bays',
    monthlyCalls: '200-500 calls/mo',
    shopSoftware: 'Tekmetric / Shopmonkey / Mitchell 1'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Service Advisor & Answering for Auto Repair | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'auto-services' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'auto_services_page',
      businessType: 'Auto Services',
      bayCount: formData.bayCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.shopName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Auto Services',
      needsOrPlan: `Auto Repair Setup (${formData.bayCount}, ${formData.monthlyCalls}, Software: ${formData.shopSoftware})`,
      message: 'Requested customized Auto Repair service advisor demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="auto-services-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Auto Repair & Dealership Service</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(14, 165, 233, 0.09), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(14, 165, 233, 0.12)', color: '#0284C7', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Wrench size={16} />
            <span>AI SERVICE ADVISOR & VEHICLE INTAKE SCHEDULING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '940px', marginBottom: '20px' }}>
            Fill your service bays while your technicians are turning wrenches.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginBottom: '32px' }}>
            When service advisors are busy with counter customers or road tests, ringing phones mean lost repair orders. Agent Pettra captures vehicle year/make/model, categorizes symptoms, explains diagnostic inspection policies, and books bay drop-offs 24/7.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('auto-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Auto Service Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('auto-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
            >
              Configure Shop Line
            </button>
          </div>

          {/* Operational Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284C7', marginBottom: '4px' }}>100% Answered</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Zero missed calls during peak morning drop-offs and rush hours</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '4px' }}>Vehicle Intake</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Captures Year, Make, Model, Mileage, and warning lights upfront</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '4px' }}>Shop Management</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Syncs directly with Tekmetric, Shopmonkey, & Mitchell 1</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Protocol Section */}
      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              WORK ORDER CONVERSION FLOW
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              The 5-Step Auto Service Intake Protocol
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Engineered to gather actionable diagnostic information so your technicians have the right parts and bay slots ready.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Vehicle Data Intake</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Collects Year, Make, Model, approximate mileage, and engine size to confirm shop tooling and technician certification fit.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Symptom & Urgency Triage</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Distinguishes scheduled service (oil/brakes/tires) from urgent drivability hazards (check engine flashing, overheating, sudden fluid leaks).
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Diagnostic Fee Transparency</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Clearly communicates your shop's diagnostic inspection charge and how it applies toward authorized repair work, preventing billing disputes.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>4</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Bay Drop-Off & Key Box Window</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Schedules morning drop-off slots, offers after-hours key drop envelope procedures, and arranges complimentary customer shuttle notes.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>5</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Repair Order (RO) Sync & SMS</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Creates draft repair order in Tekmetric or Shopmonkey and texts customer confirmation with shop directions and drop-off instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section: Interactive Call Transcript */}
      <section id="auto-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              SERVICE CALL PROOF
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Hear Agent Pettra handle a brake repair inquiry
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Experience how Agent Pettra identifies vehicle specifics, explains the inspection credit, and reserves the bay slot.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-subtle)', padding: '28px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                  <Car size={22} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Brake Inspection & Bay Scheduling</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Precision Auto Care • 2021 Honda CR-V</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Clock size={14} />
                <span>Call Duration: 1m 02s</span>
              </div>
            </div>

            {/* Transcript Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '440px', overflowY: 'auto', paddingRight: '6px' }}>
              {AUTO_TRANSCRIPT.map((msg, index) => (
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
                    <span style={{ fontWeight: 700, color: msg.sender === 'petra' ? '#0284C7' : 'var(--accent-blue)' }}>
                      {msg.sender === 'petra' ? 'Agent Pettra (Service Advisor)' : 'Driver'}
                    </span>
                    <span>• {msg.time}</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'petra' ? 'rgba(14, 165, 233, 0.08)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: msg.sender === 'petra' ? '1px solid rgba(14, 165, 233, 0.2)' : '1px solid var(--border-subtle)',
                    borderTopLeftRadius: msg.sender === 'petra' ? '4px' : '16px',
                    borderTopRightRadius: msg.sender === 'caller' ? '4px' : '16px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Mechanical Safety & Roadside Safety Boundary Notice */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(2, 132, 199, 0.05)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  Mechanical Safety &amp; In-Person Inspection Boundary
                </strong>
                Agent Pettra assists drivers with routine service scheduling, general shop hours, and estimated turnaround windows. Agent Pettra does NOT perform remote mechanical diagnostics, certify vehicle road-worthiness, or provide repair guarantees over the phone. All diagnostic assessments and safety repairs are performed exclusively in-person by ASE-certified technicians. In roadside emergencies, callers are directed to emergency roadside assistance or local authorities.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Form Section */}
      <section id="auto-form-section" style={{ padding: '72px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              CUSTOM SHOP SETUP
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Configure your auto shop's AI service advisor
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Get a live test phone number configured with your shop's labor rates, inspection fees, and bay capacity.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Auto Service Advisor Demo Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                  Your repair shop configuration is saved. Reference ID: <strong style={{ color: '#0284C7' }}>{leadId}</strong>. We've sent your private test line and setup instructions to your inbox.
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
                    Configure Another Location
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Shop Owner / Manager Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jason Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Shop / Center Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Miller Precision Auto Care"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
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
                      placeholder="jason@precisionautocare.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Shop Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 432-8765"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Number of Bays
                    </label>
                    <select
                      value={formData.bayCount}
                      onChange={(e) => setFormData({ ...formData, bayCount: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="1-3 service bays">1-3 service bays</option>
                      <option value="4-8 service bays">4-8 service bays</option>
                      <option value="9-16 service bays">9-16 service bays</option>
                      <option value="16+ bays / Multi-Shop MSO">16+ bays / Multi-Shop MSO</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Monthly Phone Calls
                    </label>
                    <select
                      value={formData.monthlyCalls}
                      onChange={(e) => setFormData({ ...formData, monthlyCalls: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Under 200 calls/mo">Under 200 calls/mo</option>
                      <option value="200-500 calls/mo">200-500 calls/mo</option>
                      <option value="500-1,200 calls/mo">500-1,200 calls/mo</option>
                      <option value="1,200+ calls/mo">1,200+ calls/mo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Shop Management Software
                    </label>
                    <select
                      value={formData.shopSoftware}
                      onChange={(e) => setFormData({ ...formData, shopSoftware: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Tekmetric">Tekmetric</option>
                      <option value="Shopmonkey">Shopmonkey</option>
                      <option value="Mitchell 1 / ProDemand">Mitchell 1 / ProDemand</option>
                      <option value="Protractor">Protractor</option>
                      <option value="NAPA TRACS">NAPA TRACS</option>
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
                  <span>{submitting ? 'Generating Auto Shop Line...' : 'Generate Auto Shop Demo Line'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

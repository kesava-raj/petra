import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const SALON_TRANSCRIPT = [
  { sender: 'caller', text: "Hi! Do you have an opening for a full balayage and haircut this Saturday with Chloe?", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the AI booking assistant for Velvet Hair Studio. Chloe is popular on weekends, but she has a 3-hour opening for a full balayage and haircut this Saturday starting at 1:30 PM. Would that time work for you?", time: "0:10" },
  { sender: 'caller', text: "Yes, Saturday at 1:30 PM is perfect! How much is the deposit?", time: "0:17" },
  { sender: 'petra', text: "Our weekend color appointments require a $50 deposit that applies directly toward your service. I've placed a 15-minute hold on Saturday at 1:30 PM for you with Chloe. May I have your name and cell number to text you the secure deposit link?", time: "0:28" },
  { sender: 'caller', text: "Yes, it's Jessica Taylor, and my number is (555) 890-1234.", time: "0:35" },
  { sender: 'petra', text: "Thank you, Jessica! I just sent the deposit and confirmation link to (555) 890-1234. Once completed, your chair with Chloe is 100% locked in. See you this Saturday at Velvet!", time: "0:45" },
  { sender: 'caller', text: "Awesome! Thanks so much.", time: "0:49" }
];

interface SalonsPageProps {
  onOpenDemo?: () => void;
}

export const SalonsPage: React.FC<SalonsPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    salonName: '',
    email: '',
    phone: '',
    chairsCount: '4-8 chairs',
    monthlyCalls: '100-300 calls/mo',
    bookingSystem: 'Vagaro / Boulevard / Square / Fresha'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist for Hair & Beauty Salons | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'salons' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'salons_page',
      businessType: 'Hair & Beauty Salon',
      chairsCount: formData.chairsCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.salonName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Hair & Beauty Salon',
      needsOrPlan: `Salon Booking Setup (${formData.chairsCount}, ${formData.monthlyCalls}, System: ${formData.bookingSystem})`,
      message: 'Requested customized Salon demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="salons-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Hair & Beauty Salons</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(236, 72, 153, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(236, 72, 153, 0.12)', color: '#DB2777', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Scissors size={16} />
            <span>24/7 APPOINTMENT BOOKING FOR HAIR & BEAUTY SALONS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Never lose a client booking while your hands are busy.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            When stylists are mid-foil or with a client, Agent Pettra answers immediately, checks stylist calendars, matches requested services, and sends deposit links so chairs stay booked.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('salon-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Salon Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('salon-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Build My Salon Demo</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Captures bookings while stylists are busy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Specific stylist & service matching</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#8B5CF6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>After-hours & Sunday call recovery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Protocol */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              How Agent Pettra Manages Salon Bookings
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Stylist & Service Triage', desc: 'Identifies requested service (cut, color, blowout, extensions) and preferred stylist or first available.' },
              { step: '02', title: 'Duration & Slot Matching', desc: 'Calculates necessary chair duration and inspects live openings in your salon booking system.' },
              { step: '03', title: 'Pricing & Policy Guidance', desc: 'Explains starting price ranges, deposit requirements, and cancellation policies with clarity.' },
              { step: '04', title: 'Calendar Hold & Deposit Text', desc: 'Reserves the appointment and immediately texts the client a secure deposit link.' },
              { step: '05', title: 'Staff Handoff & Special Requests', desc: 'Routes wedding party requests, color corrections, or complex inquiries to the salon manager.' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px 20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#DB2777', opacity: 0.8, marginBottom: '12px' }}>
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
      <section id="salon-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to a Salon Appointment Booking Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Hear how Agent Pettra checks Chloe&apos;s schedule, quotes the deposit policy, and locks in the Saturday chair in under 50 seconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)', color: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scissors size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Velvet Hair Studio</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: Full Balayage & Stylist Request (0:49)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Chair Reserved</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {SALON_TRANSCRIPT.map((msg, i) => (
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
                    <span>{msg.sender === 'caller' ? 'Client' : 'Agent Pettra (AI)'}</span>
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

            {/* Salon Booking & Cancellation Policy Boundary */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(236, 72, 153, 0.05)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={18} color="#EC4899" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  Salon Service Policy &amp; Deposit Transparency Boundary
                </strong>
                Agent Pettra enforces salon-approved booking rules, chair schedules, service durations, and cancellation policies. Deposit links and card authorizations are transmitted exclusively via PCI-compliant payment integrations (Square, Fresha, Boulevard). Agent Pettra adheres strictly to respectful, non-shaming beauty communication standards with zero personal attribute assertions.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Qualifier Form */}
      <section id="salon-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Build a Custom Salon Demo Line
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Test how Agent Pettra answers with your salon name, services menu, and stylist schedules.
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
                    <input type="text" required placeholder="Jessica Miller" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Salon Name *
                    </label>
                    <input type="text" required placeholder="Velvet Hair Studio" value={formData.salonName} onChange={(e) => setFormData({ ...formData, salonName: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Work Email *
                    </label>
                    <input type="email" required placeholder="jessica@velvetsalon.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Salon Phone *
                    </label>
                    <input type="tel" required placeholder="(555) 567-8901" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Number of Chairs / Stylists
                    </label>
                    <select value={formData.chairsCount} onChange={(e) => setFormData({ ...formData, chairsCount: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      <option>1-3 stylists (Suite)</option>
                      <option>4-8 chairs</option>
                      <option>9+ chairs / Multi-location</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Monthly Calls (approx.)
                    </label>
                    <select value={formData.monthlyCalls} onChange={(e) => setFormData({ ...formData, monthlyCalls: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      <option>Under 100 calls/mo</option>
                      <option>100-300 calls/mo</option>
                      <option>300-750 calls/mo</option>
                      <option>750+ calls/mo</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                  <Send size={18} />
                  <span>{submitting ? 'Setting Up Salon Demo Line...' : 'Build My Salon Demo Line'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Salon Demo Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. We are creating a test line configured for <strong>{formData.salonName}</strong>. Our team will contact you within 15 minutes during business hours.
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

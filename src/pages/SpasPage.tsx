import React, { useState, useEffect } from 'react';
import { 
  Flower2, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const SPA_TRANSCRIPT = [
  { sender: 'caller', text: "Hello, my husband and I are celebrating our anniversary this weekend and would love to book a couples massage package.", time: "0:02" },
  { sender: 'petra', text: "Happy early anniversary! You are speaking with Agent Pettra, the concierge receptionist for Solara Day Spa. Our 90-minute Signature Couples Retreat includes aromatherapy and complimentary champagne in our private suite. We have couples openings this Saturday at 2:00 PM or Sunday at 11:30 AM. Would either of those times fit your celebration?", time: "0:14" },
  { sender: 'caller', text: "Saturday at 2:00 PM would be wonderful. What is the cancellation policy?", time: "0:21" },
  { sender: 'petra', text: "We ask for 24 hours notice for any changes or cancellations with zero penalty. I've placed a hold on our private suite for Saturday at 2:00 PM. May I have your name and best mobile number for the reservation?", time: "0:32" },
  { sender: 'caller', text: "Claire Sterling, at (555) 765-4321.", time: "0:38" },
  { sender: 'petra', text: "Thank you, Claire. I've reserved the suite and texted your anniversary confirmation link with our relaxation lounge arrival guide. We look forward to welcoming you and your husband to Solara!", time: "0:49" },
  { sender: 'caller', text: "Thank you so much, that was effortless!", time: "0:53" }
];

interface SpasPageProps {
  onOpenDemo?: () => void;
}

export const SpasPage: React.FC<SpasPageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    spaName: '',
    email: '',
    phone: '',
    roomsCount: '3-6 treatment rooms',
    monthlyCalls: '100-300 calls/mo',
    bookingSystem: 'ResortSuite / Booker / Zenoti / Mindbody'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Concierge Receptionist for Luxury Spas | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'spas' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'spas_page',
      businessType: 'Luxury Spa',
      roomsCount: formData.roomsCount
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.spaName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Luxury Spa',
      needsOrPlan: `Luxury Spa Setup (${formData.roomsCount}, ${formData.monthlyCalls}, System: ${formData.bookingSystem})`,
      message: 'Requested customized Luxury Spa concierge demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="spas-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Luxury Spas</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(147, 51, 234, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(147, 51, 234, 0.12)', color: '#9333EA', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Flower2 size={16} />
            <span>WHITE-GLOVE AI CONCIERGE FOR LUXURY SPAS & RESORTS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '920px', marginBottom: '20px' }}>
            Elevate every guest touchpoint from the very first ring.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '32px' }}>
            Maintain an unhurried, serene atmosphere in your sanctuary. Agent Pettra handles treatment inquiries, packages, couples reservations, and gift card questions with refined hospitality 24/7.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('spa-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Spa Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('spa-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Calendar size={18} />
              <span>Build My Spa Demo</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Seamless couples & group reservations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="#9333EA" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Polished hospitality tone</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#3B82F6" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>24/7 after-hours guest assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Protocol */}
      <section style={{ padding: '64px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              How Agent Pettra Delivers Concierge Spa Booking
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Ritual & Service Guidance', desc: 'Explains signature massages, facials, hydrotherapy, and custom multi-service packages.' },
              { step: '02', title: 'Therapist & Room Sync', desc: 'Checks live treatment room availability and therapist gender preference rules.' },
              { step: '03', title: 'Policy & Arrival Instructions', desc: 'Details tranquil arrival guidelines, robe/locker amenities, and cancellation terms.' },
              { step: '04', title: 'Concierge Confirmation', desc: 'Locks in the reservation and texts a bespoke itinerary with parking and lounge directions.' },
              { step: '05', title: 'VIP / Event Handoff', desc: 'Seamlessly transfers bridal party packages, corporate retreats, or special requests to your spa director.' },
            ].map((s, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px 20px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#9333EA', opacity: 0.8, marginBottom: '12px' }}>
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
      <section id="spa-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Listen to a Luxury Spa Booking Call
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Hear Agent Pettra coordinate an anniversary couples massage package with warmth, elegance, and zero hold time.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(147, 51, 234, 0.1)', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Flower2 size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Solara Day Spa & Sanctuary</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scenario: Anniversary Couples Package Reservation (0:53)</div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={14} />
                <span>Suite Reserved</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto', paddingRight: '8px' }}>
              {SPA_TRANSCRIPT.map((msg, i) => (
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
                    <span>{msg.sender === 'caller' ? 'Guest' : 'Agent Pettra (Concierge AI)'}</span>
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
          </div>
        </div>
      </section>

      {/* Qualifier Form */}
      <section id="spa-form-section" style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Build a Custom Luxury Spa Concierge Line
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Experience how Agent Pettra articulates your spa rituals, package tiers, and therapist booking rules.
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
                    <input type="text" required placeholder="Julianne Moore" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Spa / Sanctuary Name *
                    </label>
                    <input type="text" required placeholder="Solara Day Spa" value={formData.spaName} onChange={(e) => setFormData({ ...formData, spaName: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Work Email *
                    </label>
                    <input type="email" required placeholder="julianne@solaraspas.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Concierge / Front Desk Phone *
                    </label>
                    <input type="tel" required placeholder="(555) 678-9012" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Treatment Rooms / Suites
                    </label>
                    <select value={formData.roomsCount} onChange={(e) => setFormData({ ...formData, roomsCount: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      <option>1-2 boutique rooms</option>
                      <option>3-6 treatment rooms</option>
                      <option>7+ suites / Resort destination</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Monthly Inbound Calls (approx.)
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
                  <span>{submitting ? 'Crafting Spa Demo Line...' : 'Build My Spa Concierge Demo Line'}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Spa Concierge Line Requested!
                </h3>
                {leadId && (
                  <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '14px' }}>
                    Reference: {leadId}
                  </div>
                )}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. Our hospitality specialist will prepare a test line tailored for <strong>{formData.spaName}</strong> within 15 minutes during business hours.
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

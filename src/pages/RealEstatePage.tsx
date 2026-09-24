import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Volume2, 
  Send, 
  MapPin,
  KeyRound,
  Users,
  Smartphone
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { submitLead } from '../services/leadService';

const REAL_ESTATE_TRANSCRIPT = [
  { sender: 'caller', text: "Hi, I'm calling from the yard sign outside 742 Evergreen Terrace. Is the property still active, and could I schedule a walkthrough this weekend?", time: "0:02" },
  { sender: 'petra', text: "Hello! You are speaking with Agent Pettra, the showing assistant for Highland Luxury Realty. Yes, 742 Evergreen Terrace is actively available! It's a 4-bedroom, 3.5-bath home with an open kitchen, heated pool, and private garden, listed at $875,000. Our listing specialist, Marcus Vance, has showing windows this Saturday at 11:00 AM or Sunday at 2:00 PM. Would either of those fit your schedule?", time: "0:17" },
  { sender: 'caller', text: "Saturday at 11:00 AM would be perfect. Do we need a pre-approval letter before touring?", time: "0:23" },
  { sender: 'petra', text: "The sellers do request a preliminary lender pre-approval or proof of funds prior to private lockbox access. I can hold the Saturday 11:00 AM slot for you right now so no one takes it. May I have your full name and mobile number?", time: "0:36" },
  { sender: 'caller', text: "Elena Rostova, at (555) 234-8901.", time: "0:41" },
  { sender: 'petra', text: "Thank you, Elena. I've reserved Saturday at 11:00 AM with Marcus Vance. I just texted your private showing confirmation with a link to the 3D virtual tour and our secure pre-approval upload form. Marcus has been alerted directly on his mobile. Enjoy your tour!", time: "0:56" },
  { sender: 'caller', text: "Terrific, thank you for making that so smooth and fast!", time: "1:00" }
];

interface RealEstatePageProps {
  onOpenDemo?: () => void;
}

export const RealEstatePage: React.FC<RealEstatePageProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    name: '',
    brokerageName: '',
    email: '',
    phone: '',
    teamSize: 'Solo Agent / Top Producer',
    activeListings: '5-15 active listings',
    monthlyCalls: '100-300 calls/mo',
    crm: 'Follow Up Boss / kvCORE / BoomTown'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  useEffect(() => {
    document.title = 'AI Receptionist & Showing Coordinator for Real Estate | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('industry_page_view', { industry: 'real-estate' });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setSubmitting(true);
    trackEvent('lead_submitted', {
      source: 'real_estate_page',
      businessType: 'Real Estate',
      teamSize: formData.teamSize,
      activeListings: formData.activeListings
    });

    const result = await submitLead({
      source: 'inquiry_section',
      name: formData.name,
      businessName: formData.brokerageName,
      email: formData.email,
      phone: formData.phone,
      businessType: 'Real Estate',
      needsOrPlan: `Real Estate Setup (${formData.teamSize}, ${formData.activeListings}, ${formData.monthlyCalls}, CRM: ${formData.crm})`,
      message: 'Requested customized Real Estate showing assistant demo line'
    });

    setLeadId(result.leadId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="real-estate-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button onClick={() => navigateTo('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Industries</span>
          <span>/</span>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Real Estate & Brokerages</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08), transparent 70%)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.12)', color: 'var(--accent-blue)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '20px' }}>
            <Home size={16} />
            <span>SHOWING COORDINATION & SIGN CALL CAPTURE 24/7</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '940px', marginBottom: '20px' }}>
            Capture every buyer and seller inquiry while you're in the field.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px', marginBottom: '32px' }}>
            When buyers call off a yard sign or listing portal, speed to lead determines who writes the offer. Agent Pettra quotes accurate property details, qualifies buyer financing, schedules showing walkthroughs, and alerts you instantly on your mobile.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('real-estate-demo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <Volume2 size={18} />
              <span>Hear the Showing Demo</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('real-estate-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-lg"
            >
              Configure Brokerage Line
            </button>
          </div>

          {/* Operational Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '4px' }}>0 Missed Calls</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Never lose a high-intent buyer during open houses or client meetings</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '4px' }}>&lt; 15 Sec</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Instant SMS dossier sent to listing agent with buyer qualification data</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '4px' }}>MLS Synced</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Accurate pricing, beds/baths, HOA fees, and showing instructions</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Real Estate Protocol */}
      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              FIELD AUTOMATION PROTOCOL
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              The 5-Step Real Estate Showing Flow
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Built specifically to eliminate phone tag between buyers, listing agents, and showing coordinators.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Address & MLS Identification</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Identifies caller inquiries by street address, listing ID, or neighborhood and delivers verified MLS facts including price, sqft, taxes, and status.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Buyer Representation & Pre-Approval</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Respectfully checks if the caller has signed a buyer broker agreement and confirms mortgage pre-approval or proof of funds status.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Showing Coordination & Lockbox Rules</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Schedules private showing windows against the listing agent's calendar or registers the caller for the next scheduled weekend Open House.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>4</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Instant Field Agent SMS Alert</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Sends a priority push notification and SMS to the designated listing agent with the prospect's contact info, buying timeframe, and appointment details.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '16px' }}>5</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>CRM Sync & Property Dossier SMS</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Creates a new contact profile in Follow Up Boss, kvCORE, or BoomTown while texting the buyer a link to floor plans, disclosures, and school ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section: Interactive Call Transcript */}
      <section id="real-estate-demo-section" style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              LIVE CALL DEMONSTRATION
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Hear Agent Pettra capture a yard sign buyer inquiry
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Notice how Agent Pettra answers questions about square footage, pre-qualifies lender status, and locks in a weekend showing.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-subtle)', padding: '28px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <Home size={22} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Sign Call & Showing Booking</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Highland Luxury Realty • 742 Evergreen Terrace</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Clock size={14} />
                <span>Call Duration: 1m 00s</span>
              </div>
            </div>

            {/* Transcript Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '440px', overflowY: 'auto', paddingRight: '6px' }}>
              {REAL_ESTATE_TRANSCRIPT.map((msg, index) => (
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
                    <span style={{ fontWeight: 700, color: msg.sender === 'petra' ? 'var(--accent-blue)' : 'var(--accent-indigo)' }}>
                      {msg.sender === 'petra' ? 'Agent Pettra (Showing AI)' : 'Prospective Buyer'}
                    </span>
                    <span>• {msg.time}</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'petra' ? 'rgba(37, 99, 235, 0.08)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: msg.sender === 'petra' ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid var(--border-subtle)',
                    borderTopLeftRadius: msg.sender === 'petra' ? '4px' : '16px',
                    borderTopRightRadius: msg.sender === 'caller' ? '4px' : '16px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Fair Housing Act & Real Estate Advertising Compliance Notice */}
            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(37, 99, 235, 0.05)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={18} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  Fair Housing Act &amp; Meta Housing Category Compliance Boundary
                </strong>
                Agent Pettra operates under strict non-discriminatory real estate protocols compliant with the Federal Fair Housing Act (42 U.S.C. 3601 et seq.) and NAR Code of Ethics. Agent Pettra provides objective property specifications, tour scheduling, and price ranges without inquiring about or making statements based on race, color, religion, sex, handicap, familial status, or national origin. Zero housing inquiries or demographic parameters are shared with advertising pixels (Meta Special Ad Category compliant).
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Form Section */}
      <section id="real-estate-form-section" style={{ padding: '72px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              CUSTOM DEMO SETUP
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Configure your brokerage or team showing line
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '1.05rem' }}>
              Provide your details to get a dedicated demo phone number tailored to your active property portfolio.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Real Estate Showing Demo Ready!
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
                  Your showing assistant profile has been mapped. Reference ID: <strong style={{ color: 'var(--accent-blue)' }}>{leadId}</strong>. We've emailed your setup link and direct testing line.
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
                    Configure Another Office
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Agent / Broker Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Brokerage or Team Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vance Luxury Group / Compass"
                      value={formData.brokerageName}
                      onChange={(e) => setFormData({ ...formData, brokerageName: e.target.value })}
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
                      placeholder="marcus@vancegroup.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Mobile Phone (for Showing Alerts) *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(555) 234-8901"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Team Structure
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Solo Agent / Top Producer">Solo Top Producer</option>
                      <option value="Small Team (2-5 agents)">Small Team (2-5 agents)</option>
                      <option value="Medium Team (6-15 agents)">Medium Team (6-15 agents)</option>
                      <option value="Full Brokerage / Franchise">Full Brokerage / Franchise</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Active Listings
                    </label>
                    <select
                      value={formData.activeListings}
                      onChange={(e) => setFormData({ ...formData, activeListings: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="1-4 listings">1-4 active listings</option>
                      <option value="5-15 active listings">5-15 active listings</option>
                      <option value="16-40 active listings">16-40 active listings</option>
                      <option value="40+ active listings">40+ active listings</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Primary CRM
                    </label>
                    <select
                      value={formData.crm}
                      onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                    >
                      <option value="Follow Up Boss">Follow Up Boss</option>
                      <option value="kvCORE">kvCORE</option>
                      <option value="BoomTown">BoomTown</option>
                      <option value="Lofty / Chime">Lofty / Chime</option>
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
                  <span>{submitting ? 'Generating Showing Line...' : 'Generate Showing Assistant Line'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

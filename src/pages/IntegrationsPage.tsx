import React, { useEffect } from 'react';
import { 
  Calendar, 
  Database, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Zap, 
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

interface IntegrationsPageProps {
  onOpenDemo?: () => void;
}

const INTEGRATIONS = [
  {
    name: 'Google Calendar',
    category: 'Calendar & Scheduling',
    type: 'Native Direct',
    status: 'Verified Live',
    desc: 'Real-time two-way synchronization. Checks conflicts in milliseconds and blocks booked appointments instantly.',
    popular: true
  },
  {
    name: 'Microsoft 365 / Outlook',
    category: 'Calendar & Scheduling',
    type: 'Native Direct',
    status: 'Verified Live',
    desc: 'Enterprise calendar integration for Outlook exchange and individual practitioner calendars.',
    popular: true
  },
  {
    name: 'HubSpot CRM',
    category: 'CRM & Pipeline',
    type: 'Native Direct',
    status: 'Verified Live',
    desc: 'Automatically logs caller identity, call recordings, sentiment, and creates qualified deal records.',
    popular: true
  },
  {
    name: 'Twilio & SIP Trunking',
    category: 'Telephony & Voice',
    type: 'Native Direct',
    status: 'Verified Live',
    desc: 'Low-latency carrier backbone with natural speech synthesis and clean mobile handoff.',
    popular: true
  },
  {
    name: 'Zapier & Make.com',
    category: 'Automation & Webhooks',
    type: 'Verified Connector',
    status: 'Verified Live',
    desc: 'Connect Agent Pettra call completion events with 5,000+ business applications.',
    popular: false
  },
  {
    name: 'Custom REST Webhooks',
    category: 'Developer APIs',
    type: 'Custom API',
    status: 'Verified Live',
    desc: 'Receive signed JSON webhooks with call duration, transcript, caller ID, and disposition tags.',
    popular: false
  },
  {
    name: 'Dentrix & Open Dental',
    category: 'Dental Practice Systems',
    type: 'EHR Connector',
    status: 'In Private Beta',
    desc: 'Direct dental patient chart matching and practice management appointment requests.',
    popular: false
  },
  {
    name: 'ServiceTitan & Jobber',
    category: 'Field Service Dispatch',
    type: 'Trade Connector',
    status: 'In Private Beta',
    desc: 'Job lead creation and emergency dispatch escalation for HVAC, plumbing, and electrical teams.',
    popular: false
  },
  {
    name: 'Jane App & Mindbody',
    category: 'Wellness & Med Spa',
    type: 'Clinic Connector',
    status: 'In Development',
    desc: 'Practitioner availability lookup and intake confirmation for aesthetic wellness clinics.',
    popular: false
  }
];

export const IntegrationsPage: React.FC<IntegrationsPageProps> = () => {
  useEffect(() => {
    document.title = 'Supported Integrations & Calendar Sync | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('page_view', { route: '/integrations' });
  }, []);

  return (
    <div className="integrations-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Integrations Directory</span>
        </div>
      </div>

      {/* Header */}
      <section style={{ paddingTop: '64px', paddingBottom: '48px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '18px' }}>
            <Layers size={16} />
            <span>CALENDAR, CRM & TELEPHONY STACK</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Connects with your calendar and workflow in minutes.
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            No complicated custom development required. Agent Pettra works alongside your existing phone system and booking tools.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              onClick={() => navigateTo('/#inquiry')}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Check Compatibility With My Stack</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section style={{ paddingBottom: '72px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {INTEGRATIONS.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {item.category}
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: item.status === 'Verified Live' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: item.status === 'Verified Live' ? '#059669' : '#D97706'
                  }}>
                    {item.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1, marginBottom: '20px' }}>
                  {item.desc}
                </p>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Connection:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Permissions Banner */}
      <section style={{ padding: '48px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <ShieldCheck size={36} color="var(--accent-blue)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Least-Privilege Security & OAuth 2.0
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 20px auto' }}>
            Agent Pettra only requests read/write access to calendar slots and never reads personal email or unrelated client records. Learn more in our Security Center.
          </p>
          <button 
            onClick={() => navigateTo('/security')}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem', padding: '8px 20px' }}
          >
            Review Security & Data Handling
          </button>
        </div>
      </section>
    </div>
  );
};

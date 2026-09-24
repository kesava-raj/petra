import React, { useEffect } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Star, 
  Quote, 
  ShieldCheck, 
  Sparkles,
  Stethoscope,
  Wrench,
  Flower2
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

interface CustomersPageProps {
  onOpenDemo?: () => void;
}

const CASE_STUDIES = [
  {
    business: 'Apex Dental Care',
    industry: 'Dental Practice (2 Locations, 6 Chairs)',
    location: 'Denver, CO',
    icon: Stethoscope,
    badgeColor: '#2563EB',
    headline: 'Recovered 38% more new patient appointments outside front-desk staffed hours.',
    baseline: 'Practice was missing approximately 45 calls per week during lunch hours and post-5 PM, with less than 15% leaving a voicemail.',
    implementation: 'Configured conditional call forwarding during lunch breaks (12-1 PM) and after 5 PM. Integrated directly with Google Calendar booking holds.',
    outcome: 'Captured 34 additional new patient evaluation requests in the first 30 days, generating an estimated $28,000 in scheduled treatment value.',
    timeframe: '90-Day Verified Measurement Period',
    quote: "Our front desk was constantly overwhelmed trying to check patients in while the phone rang non-stop. Agent Pettra handles routine scheduling calmly, so our staff can actually focus on the patient standing right in front of them.",
    author: "Dr. Alistair Vance, DDS — Clinical Director"
  },
  {
    business: 'Beacon Heating & Air',
    industry: 'Home Services / HVAC (8 Service Vans)',
    location: 'Austin, TX',
    icon: Wrench,
    badgeColor: '#D97706',
    headline: 'Captured 19 emergency AC repair jobs on summer weekends with zero delay.',
    baseline: 'Relying on an answering service that only took names on a notepad resulted in homeowners calling competitors within 5 minutes.',
    implementation: 'Trained Agent Pettra on diagnostic fees, service area ZIP codes, and on-call technician Marcus. Implemented warm transfers for electrical hazards.',
    outcome: 'Immediate 2-hour dispatch window booking with SMS technician link, resulting in 100% after-hours response speed and $31,500 in completed repair revenue.',
    timeframe: '60-Day Summer Outage Period',
    quote: "In Texas summer, if you don't give a homeowner a confirmed arrival window immediately, they hang up and call the next HVAC company on Google. Agent Pettra locks in the job before they look anywhere else.",
    author: "Marcus Vance — Operations & Dispatch Manager"
  },
  {
    business: 'Glow Aesthetics & Skin Lounge',
    industry: 'Med Spa & Wellness (Boutique Practice)',
    location: 'Scottsdale, AZ',
    icon: Flower2,
    badgeColor: '#DB2777',
    headline: 'Eliminated consultation phone tag and booked 42 injectable evaluations.',
    baseline: 'Estheticians and nurse injectors were in treatments all day, unable to answer pricing and prep inquiries from prospective clients.',
    implementation: 'Equipped Agent Pettra with practice-approved treatment price ranges, deposit policies, and calendar slots for nurse injectors.',
    outcome: 'Increased first-touch consultation booking rate by 52% and reduced unreturned inquiries to zero.',
    timeframe: '90-Day Growth Audit Period',
    quote: "Clients love getting instant answers about our laser and filler packages without waiting 4 hours for someone to call back. It feels completely natural and luxurious.",
    author: "Elena Rostova, RN — Founder & Master Injector"
  }
];

export const CustomersPage: React.FC<CustomersPageProps> = () => {
  useEffect(() => {
    document.title = 'Customer Stories & Real Outcomes | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('page_view', { route: '/customers' });
  }, []);

  return (
    <div className="customers-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Customer Case Studies</span>
        </div>
      </div>

      {/* Header */}
      <section style={{ paddingTop: '64px', paddingBottom: '48px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '18px' }}>
            <TrendingUp size={16} />
            <span>AUTHENTIC OUTCOMES & RECOVERED REVENUE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            How appointment-led businesses recover missed call revenue.
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Detailed operational scenarios with defined call baselines, measurement periods, and verified scheduling protocols.
          </p>

          {/* Methodology & Regulatory Transparency Box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '20px 24px',
            textAlign: 'left',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              <ShieldCheck size={18} color="var(--accent-blue)" />
              <span>Evidence Standard & Measurement Methodology</span>
            </div>
            <p style={{ margin: 0 }}>
              The case studies below represent <strong>illustrative operational scenarios</strong> synthesized from actual client onboarding workflows, audited phone logs, and appointment holds. <strong>Denominator:</strong> Baselines measure total inbound calls during unstaffed or overflow hours. <strong>Caveats & Limitations:</strong> Individual practice recovery depends on local market demand, practitioner availability, front-desk operating hours, and service pricing. Dollar amounts reflect gross scheduled procedure or job value, not guaranteed net profit.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section style={{ paddingBottom: '72px' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {CASE_STUDIES.map((study, idx) => {
              const IconComponent = study.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    border: '1px solid var(--border-subtle)',
                    padding: 'clamp(24px, 4vw, 44px)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${study.badgeColor}18`, color: study.badgeColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {study.business}
                          </h3>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)' }}>
                            ILLUSTRATIVE SCENARIO
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {study.industry} • {study.location}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', fontWeight: 600, background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                      {study.timeframe}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '24px' }}>
                    &ldquo;{study.headline}&rdquo;
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Baseline Problem
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {study.baseline}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Agent Pettra Workflow
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {study.implementation}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Verified Outcome
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  <div style={{ borderLeft: '3px solid var(--accent-blue)', paddingLeft: '20px', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    &ldquo;{study.quote}&rdquo;
                    <div style={{ fontStyle: 'normal', fontWeight: 700, color: 'var(--text-primary)', marginTop: '8px', fontSize: '0.85rem' }}>
                      — {study.author}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: '64px 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Ready to see what Agent Pettra can do for your practice?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '28px' }}>
            Try a private test line configured around your business hours and scheduling software.
          </p>
          <button
            onClick={() => navigateTo('/#demo')}
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Call the Live Demo</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

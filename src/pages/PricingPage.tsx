import React, { useState, useEffect } from 'react';
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  Zap, 
  Sliders, 
  Calculator,
  ChevronDown,
  Building,
  CheckCircle2
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';
import { ROICalculator } from '../components/ROICalculator';

interface PricingPageProps {
  onSelectPlan: (planId: string, billingCycle: 'monthly' | 'annual') => void;
}

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Solo & Boutique Practices',
    monthlyPrice: 99,
    annualMonthlyPrice: 79,
    includedMinutes: 300,
    estimatedCalls: '120 - 180 calls',
    overageRate: '$0.35 / min',
    description: 'Essential 24/7 call answering and calendar booking for independent practices.',
    features: [
      '300 Included Voice Minutes / mo',
      'Single Phone Line Forwarding',
      'Google & Outlook Calendar Sync',
      'Standard Knowledgebase (50 FAQs)',
      'Instant SMS Confirmation to Callers',
      'Automated Spam & Robocall Filtering',
      'Email & Slack Call Summaries',
      'Standard Business Hours Support'
    ],
    highlight: false
  },
  {
    id: 'growth',
    name: 'Growth',
    badge: 'Most Popular ⭐',
    monthlyPrice: 199,
    annualMonthlyPrice: 159,
    includedMinutes: 750,
    estimatedCalls: '300 - 450 calls',
    overageRate: '$0.30 / min',
    description: 'Complete call coverage with practice CRM integrations and warm staff transfers.',
    features: [
      '750 Included Voice Minutes / mo',
      'Up to 3 Forwarded Phone Lines',
      'Calendar & CRM Integration (HubSpot / EHR)',
      'Advanced Knowledgebase (Unlimited FAQs)',
      'Live Warm Staff Call Transfer',
      'Custom Triage & Emergency Escalation',
      'Bilingual Voice Support (English + Spanish)',
      'Priority Phone & Slack Support'
    ],
    highlight: true
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'High Volume & Multi-Location',
    monthlyPrice: 399,
    annualMonthlyPrice: 319,
    includedMinutes: 1500,
    estimatedCalls: '600 - 900 calls',
    overageRate: '$0.25 / min',
    description: 'High-volume voice capacity and multi-office routing for expanding operations.',
    features: [
      '1,500 Included Voice Minutes / mo',
      'Unlimited Phone Lines & Numbers',
      'Multi-Location Routing & Schedules',
      'Custom API & Webhook Webhooks',
      'Dedicated Onboarding Specialist',
      'Custom Voice Tuning & Persona Match',
      'Business Associate Agreement (BAA) Option',
      'Carrier-Grade High-Availability & Priority Support'
    ],
    highlight: false
  }
];

const BILLING_FAQS = [
  {
    q: 'How are voice minutes counted?',
    a: 'Minutes are calculated solely on active conversation time from the second Agent Pettra answers until the caller hangs up or transfers. Robocalls, spam bots, and silent hangups are auto-detected and never count against your quota.'
  },
  {
    q: 'What happens if we exceed our included plan minutes?',
    a: 'Your calls are never dropped or cut off. Additional minutes are billed transparently at your plan overage rate ($0.25 - $0.35/min). You will receive automated notifications when you reach 80% and 100% of your allowance.'
  },
  {
    q: 'Can we keep our existing business phone number?',
    a: 'Yes! You do not need to switch carriers or buy a new public phone number. You simply set up conditional call forwarding (e.g. on busy, unanswered, or after-hours) from your existing provider to your private Agent Pettra line in under 3 minutes.'
  },
  {
    q: 'Are there any setup fees or long-term contracts?',
    a: 'No setup fees and no long-term contracts. All monthly plans are month-to-month and can be canceled anytime with a single click. Annual plans provide 2 months free with a 30-day money-back guarantee.'
  },
  {
    q: 'How does live staff call transferring work?',
    a: 'When a caller requests a specific staff member or reports an emergency, Agent Pettra places the caller on brief hold, calls your team member, summarizes the caller name and need, and connects the call smoothly.'
  }
];

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'AI Receptionist Pricing and Call Minutes | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('page_view', { route: '/pricing' });
  }, []);

  return (
    <div className="pricing-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Pricing & Plans</span>
        </div>
      </div>

      {/* Header Banner */}
      <section style={{ paddingTop: '64px', paddingBottom: '48px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-blue)', fontSize: '0.825rem', fontWeight: 700, marginBottom: '18px' }}>
            <Zap size={16} />
            <span>TRANSPARENT, USAGE-ALIGNED PRICING</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Choose coverage that matches your call volume.
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
            Every plan includes 24/7 availability, natural voice conversation, real-time calendar booking, and clear overage rates. No hidden licensing or porting fees.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '12px', border: '1px solid var(--border-subtle)', gap: '6px' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--bg-card)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--accent-blue)' : 'transparent',
                color: billingCycle === 'annual' ? '#FFFFFF' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: billingCycle === 'annual' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Annual Prepay</span>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.25)', padding: '2px 6px', borderRadius: '4px' }}>
                2 Months Free
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section style={{ paddingBottom: '72px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
            {PLANS.map((plan) => {
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualMonthlyPrice;
              return (
                <div 
                  key={plan.id}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    border: plan.highlight ? '2px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: plan.highlight ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
                  }}
                >
                  {plan.highlight && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent-blue)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: '20px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, minHeight: '42px' }}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        ${price}
                      </span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        / month
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {billingCycle === 'annual' ? (
                        <span>Billed annually (${price * 12}/yr)</span>
                      ) : (
                        <span>Billed monthly, cancel anytime</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '10px', marginTop: '16px', fontSize: '0.825rem' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{plan.includedMinutes} mins included</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>~{plan.estimatedCalls}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{plan.overageRate}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>overage rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div style={{ flex: 1, marginBottom: '28px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                      Included Features
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      trackEvent('plan_selected', { plan: plan.id, billing: billingCycle });
                      onSelectPlan(plan.id, billingCycle);
                    }}
                    className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded ROI Calculator Section */}
      <section style={{ padding: '64px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Interactive Return On Investment
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Calculate What Missed Calls Cost Your Business
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              See how many appointments Agent Pettra recovers compared to voicemail or unreturned calls.
            </p>
          </div>

          <ROICalculator onOpenDemo={() => onSelectPlan('growth', billingCycle)} />
        </div>
      </section>

      {/* Billing & Overage FAQs */}
      <section style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Frequently Asked Billing Questions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Clear rules, no surprise charges, and transparent usage limits.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {BILLING_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'var(--text-muted)' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px 24px', fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

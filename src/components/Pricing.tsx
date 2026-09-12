import React from 'react';
import { Check, Sparkles, PhoneCall } from 'lucide-react';
import { pricingConfig } from '../config/pricing';
import { trackEvent } from '../utils/analytics';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
  onOpenDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onOpenDemo }) => {
  const handlePlanClick = (planId: string) => {
    trackEvent('pricing_cta_click', { plan: planId });
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      onOpenDemo();
    }
  };

  return (
    <section className="section-padding" id="pricing" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="section-title">
            A receptionist that works around the clock.
          </h2>
          <p className="section-subtitle">
            Scale your front-office coverage for a fraction of the cost of a traditional receptionist.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {pricingConfig.tiers.map((tier) => {
            const isPopular = tier.isPopular;
            return (
              <div
                key={tier.id}
                className={`glass-card pricing-card ${isPopular ? 'popular-tier' : ''}`}
                style={{
                  background: 'var(--bg-card)',
                  border: isPopular ? '2px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: isPopular ? 'var(--shadow-lg), var(--shadow-glow)' : 'var(--shadow-sm)'
                }}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #3B82F6, #6366F1)',
                    color: '#FFFFFF',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                    whiteSpace: 'nowrap'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', minHeight: '44px', lineHeight: 1.5 }}>
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div style={{ margin: '28px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                      ${tier.price}
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      /{tier.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {tier.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isPopular ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isPopular ? 'var(--accent-blue)' : 'var(--accent-emerald)',
                          flexShrink: 0
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePlanClick(tier.id)}
                  className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>{tier.ctaText}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing Subtext & Guarantee */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            {pricingConfig.disclaimer}
          </p>
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        .pricing-card {
          padding: 40px 32px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
        }

        /* Tablet (iPad & small laptops) */
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .pricing-card {
            padding: 32px 20px;
          }
        }

        /* Small Tablet & Mobile */
        @media (max-width: 860px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
            gap: 32px;
          }
          .pricing-card {
            padding: 36px 28px;
          }
          .pricing-card.popular-tier {
            order: -1; /* Feature the popular tier at the top on mobile */
          }
        }

        @media (max-width: 480px) {
          .pricing-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
};

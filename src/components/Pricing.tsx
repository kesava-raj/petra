import React, { useState } from 'react';
import { Check, Sparkles, PhoneCall, Clock, Gift, ArrowRight } from 'lucide-react';
import { pricingConfig } from '../config/pricing';
import { trackEvent } from '../utils/analytics';

interface PricingProps {
  onSelectPlan?: (planId: string, billingCycle: 'monthly' | 'annual') => void;
  onOpenDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onOpenDemo }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const handleToggle = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    trackEvent('pricing_view', { billingCycle: cycle });
  };

  const handlePlanClick = (planId: string, price: number) => {
    trackEvent('pricing_cta_click', { plan: planId, billingCycle, price });
    trackEvent('checkout_start', { plan: planId, billingCycle, value: price });

    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    } else {
      onOpenDemo();
    }
  };

  return (
    <section className="section-padding pricing-section" id="pricing" style={{ position: 'relative' }}>
      <style>{`
        .pricing-section {
          background: var(--bg-primary);
        }

        .pricing-toggle-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .pricing-toggle-container {
          display: inline-flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          padding: 5px;
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .pricing-toggle-btn {
          border: none;
          background: transparent;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pricing-toggle-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }

        .pricing-toggle-btn.active.annual-active {
          color: var(--accent-blue);
        }

        .pricing-annual-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(99, 102, 241, 0.15));
          color: var(--accent-blue);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .pricing-annual-banner {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-radius: 999px;
          font-size: 0.9rem;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        .pricing-card {
          padding: 38px 30px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
        }

        .pricing-strikethrough {
          font-size: 0.95rem;
          color: var(--text-muted);
          text-decoration: line-through;
          margin-bottom: 2px;
          display: block;
          font-weight: 500;
        }

        .pricing-main-price {
          font-size: clamp(2.6rem, 3.8vw, 3.25rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .pricing-period {
          font-size: 1.05rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-left: 4px;
        }

        .pricing-subprice {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--accent-blue);
          margin-top: 6px;
        }

        .pricing-save-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .pricing-minutes-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 14px 16px;
          margin: 22px 0 26px 0;
        }

        .pricing-minutes-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        .pricing-minutes-row:last-child {
          margin-bottom: 0;
        }

        /* Tablet (iPad & small laptops) */
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .pricing-card {
            padding: 30px 20px;
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
            order: -1;
          }
          .pricing-toggle-btn {
            padding: 8px 16px;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .pricing-card {
            padding: 28px 20px;
          }
          .pricing-annual-banner {
            border-radius: 16px;
            text-align: center;
            font-size: 0.8125rem;
            padding: 8px 16px;
          }
        }
      `}</style>

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

        {/* Monthly / Annual Interactive Toggle */}
        <div className="pricing-toggle-wrapper">
          <div 
            className="pricing-toggle-container"
            role="radiogroup"
            aria-label="Billing frequency selection"
          >
            <button
              type="button"
              role="radio"
              aria-checked={billingCycle === 'monthly'}
              onClick={() => handleToggle('monthly')}
              className={`pricing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              id="pricing-toggle-monthly"
            >
              <span>Monthly</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={billingCycle === 'annual'}
              onClick={() => handleToggle('annual')}
              className={`pricing-toggle-btn ${billingCycle === 'annual' ? 'active annual-active' : ''}`}
              id="pricing-toggle-annual"
            >
              <span>Annual — Save 2 Months 🎉</span>
            </button>
          </div>

          {/* Value Proposition Tagline when Annual is active */}
          {billingCycle === 'annual' && (
            <div className="pricing-annual-banner">
              <Gift size={16} color="var(--accent-emerald)" />
              <span>
                <strong>Get 12 months of Agent Pettra for the price of 10.</strong> Pay for 10 months upfront, get 2 full months free.
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {pricingConfig.tiers.map((tier) => {
            const isPopular = tier.isPopular;
            const currentPrice = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`glass-card pricing-card ${isPopular ? 'popular-tier' : ''}`}
                style={{
                  background: 'var(--bg-card)',
                  border: isPopular ? '2px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  borderRadius: '24px',
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
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', minHeight: '44px', lineHeight: 1.5, marginBottom: '20px' }}>
                    {tier.description}
                  </p>

                  {/* Price Section */}
                  <div style={{ minHeight: '118px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {billingCycle === 'annual' ? (
                      <div>
                        {/* Strikethrough monthly reference */}
                        <span className="pricing-strikethrough">
                          ~~${tier.monthlyPrice}/month~~
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                          <span className="pricing-main-price">
                            ${tier.annualPrice.toLocaleString()}
                          </span>
                          <span className="pricing-period">/year</span>
                        </div>

                        {/* Monthly equivalent breakdown */}
                        <div className="pricing-subprice">
                          That&apos;s ${tier.monthlyEquivalent.toFixed(2)}/month
                        </div>

                        {/* Annual savings pill */}
                        <div className="pricing-save-pill">
                          <span>Save ${tier.annualSaving}/year</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                          <span className="pricing-main-price">
                            ${tier.monthlyPrice}
                          </span>
                          <span className="pricing-period">/month</span>
                        </div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                          Billed monthly • Cancel anytime
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginTop: '6px', fontWeight: 600 }}>
                          Switch to Annual to save ${tier.annualSaving}/yr
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Included Minutes & Overage Highlights Box */}
                  <div className="pricing-minutes-box">
                    <div className="pricing-minutes-row">
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="var(--accent-blue)" />
                        <span>Included Minutes:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {tier.includedMinutes.toLocaleString()} min/mo
                      </span>
                    </div>

                    <div className="pricing-minutes-row">
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <PhoneCall size={14} color="var(--accent-emerald)" />
                        <span>Additional Overage:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${tier.overageRate.toFixed(2)}/min
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>
                      Exact usage limits on both billing cycles
                    </div>
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
                  onClick={() => handlePlanClick(tier.id, currentPrice)}
                  className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  id={`pricing-btn-${tier.id}`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight size={16} />
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
    </section>
  );
};

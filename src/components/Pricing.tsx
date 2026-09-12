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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          {pricingConfig.tiers.map((tier) => {
            const isPopular = tier.isPopular;
            return (
              <div
                key={tier.id}
                className="glass-card"
                style={{
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: isPopular ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isPopular 
                    ? 'linear-gradient(180deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                    : 'rgba(15, 23, 42, 0.7)',
                  boxShadow: isPopular ? '0 0 45px rgba(59, 130, 246, 0.25)' : 'none',
                  borderRadius: '24px'
                }}
              >
                {/* Popular Badge */}
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
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', minHeight: '44px', lineHeight: 1.5 }}>
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div style={{ margin: '28px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                      ${tier.price}
                    </span>
                    <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: 500 }}>
                      /{tier.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {tier.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#CBD5E1' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isPopular ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isPopular ? '#60A5FA' : '#10B981',
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
                  className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', padding: '14px 20px', fontSize: '1rem' }}
                >
                  <span>{tier.ctaText}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimer */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#64748B',
          maxWidth: '720px',
          margin: '36px auto 0 auto',
          lineHeight: 1.5
        }}>
          {pricingConfig.disclaimer}
        </p>
      </div>
    </section>
  );
};

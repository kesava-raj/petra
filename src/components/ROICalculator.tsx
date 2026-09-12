import React, { useState } from 'react';
import { Calculator, DollarSign, ArrowRight, TrendingUp, PhoneCall } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ROICalculatorProps {
  onOpenDemo: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenDemo }) => {
  const [customerValue, setCustomerValue] = useState<number>(250);
  const [missedCalls, setMissedCalls] = useState<number>(35);
  const [conversionRate, setConversionRate] = useState<number>(30);

  // Revenue = Missed Calls * (Conversion Rate / 100) * Customer Value
  const recoveredCalls = Math.round(missedCalls * (conversionRate / 100));
  const estimatedRevenue = Math.round(recoveredCalls * customerValue);

  return (
    <section className="section-padding" id="calculator" style={{ position: 'relative', background: 'rgba(8, 13, 26, 0.85)' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow" style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
            <TrendingUp size={14} />
            <span>ROI ESTIMATOR</span>
          </div>
          <h2 className="section-title">
            How much could missed calls be costing you?
          </h2>
          <p className="section-subtitle">
            Calculate the hidden revenue slipping away from unanswered inquiries each month.
          </p>
        </div>

        {/* Calculator Card Container */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '28px',
          padding: 'clamp(24px, 4vw, 44px)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left Column: Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Input 1: Average Customer Value */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="customer-value" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#CBD5E1' }}>
                  Average Customer Value
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#3B82F6' }}>
                  ${customerValue}
                </span>
              </div>
              <input
                id="customer-value"
                type="range"
                min="50"
                max="2500"
                step="25"
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#3B82F6',
                  height: '6px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                <span>$50</span>
                <span>$2,500+</span>
              </div>
            </div>

            {/* Input 2: Missed Calls per Month */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="missed-calls" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#CBD5E1' }}>
                  Missed Calls per Month
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#F59E0B' }}>
                  {missedCalls} calls
                </span>
              </div>
              <input
                id="missed-calls"
                type="range"
                min="5"
                max="200"
                step="5"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#F59E0B',
                  height: '6px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                <span>5</span>
                <span>200 calls</span>
              </div>
            </div>

            {/* Input 3: Estimated Conversion Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="conversion-rate" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#CBD5E1' }}>
                  Estimated Booking Conversion Rate
                </label>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10B981' }}>
                  {conversionRate}%
                </span>
              </div>
              <input
                id="conversion-rate"
                type="range"
                min="10"
                max="75"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#10B981',
                  height: '6px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                <span>10%</span>
                <span>75%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Output Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(16, 185, 129, 0.15) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '20px',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#93C5FD',
              marginBottom: '8px'
            }}>
              Estimated Potential Revenue From Recovered Calls
            </span>

            <div style={{
              fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#10B981',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '12px 0'
            }}>
              ${estimatedRevenue.toLocaleString()}
              <span style={{ fontSize: '1.1rem', color: '#CBD5E1', fontWeight: 600 }}>/mo</span>
            </div>

            <div style={{
              fontSize: '0.9rem',
              color: '#CBD5E1',
              marginBottom: '20px',
              padding: '6px 14px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px'
            }}>
              ≈ <strong>{recoveredCalls}</strong> additional appointments scheduled every month
            </div>

            <button
              onClick={() => {
                trackEvent('hero_cta_click', { source: 'roi_calculator' });
                onOpenDemo();
              }}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginBottom: '16px' }}
            >
              <PhoneCall size={18} />
              <span>See What Petra Can Do</span>
            </button>

            <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
              This calculator provides an illustrative estimate and does not guarantee revenue or conversion results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

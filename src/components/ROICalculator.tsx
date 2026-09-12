import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, ArrowRight, TrendingUp, PhoneCall, CheckCircle2, Mail } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { captureEmailIntent, submitInquiry, getCachedUserDetails } from '../utils/visitorTracker';

interface ROICalculatorProps {
  onOpenDemo: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenDemo }) => {
  const [customerValue, setCustomerValue] = useState<number>(250);
  const [missedCalls, setMissedCalls] = useState<number>(35);
  const [conversionRate, setConversionRate] = useState<number>(30);
  const [roiEmail, setRoiEmail] = useState('');
  const [roiSubmitting, setRoiSubmitting] = useState(false);
  const [roiSubmitted, setRoiSubmitted] = useState(false);

  useEffect(() => {
    const cached = getCachedUserDetails();
    if (cached.email) {
      setRoiEmail(cached.email);
    }
  }, []);

  const handleRoiEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRoiEmail(val);
    captureEmailIntent(val, 'roi_calculator');
  };

  const handleRoiEmailBlur = () => {
    if (roiEmail.trim()) {
      captureEmailIntent(roiEmail.trim(), 'roi_calculator_blur');
    }
  };

  const handleRoiInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roiEmail.trim()) return;

    setRoiSubmitting(true);
    submitInquiry({
      email: roiEmail.trim(),
      inquirySource: 'roi_calculator',
      estimatedRevenue,
      recoveredCalls,
      customerValue
    });

    setTimeout(() => {
      setRoiSubmitting(false);
      setRoiSubmitted(true);
    }, 400);
  };

  // Revenue = Missed Calls * (Conversion Rate / 100) * Customer Value
  const recoveredCalls = Math.round(missedCalls * (conversionRate / 100));
  const estimatedRevenue = Math.round(recoveredCalls * customerValue);

  return (
    <section className="section-padding roi-section" id="calculator" style={{ position: 'relative' }}>
      <style>{`
        .roi-section {
          background: var(--bg-primary);
        }
        .roi-calculator-card {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: center;
          padding: 44px;
          max-width: 860px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 28px;
          box-shadow: var(--shadow-lg);
        }
        .roi-label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .roi-output-card {
          border-radius: 20px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%);
          border: 1px solid rgba(37, 99, 235, 0.25);
          box-shadow: var(--shadow-md);
        }
        .roi-output-title {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letterSpacing: 0.08em;
          color: #1E40AF;
          margin-bottom: 8px;
        }
        .roi-output-badge {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding: 8px 16px;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
        }
        [data-theme="dark"] .roi-output-card {
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(16, 185, 129, 0.15) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        [data-theme="dark"] .roi-output-title {
          color: #93C5FD;
        }
        [data-theme="dark"] .roi-output-badge {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
        }
        .roi-inquiry-box {
          width: 100%;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 16px;
          backdrop-filter: blur(8px);
        }
        [data-theme="dark"] .roi-inquiry-box {
          background: rgba(15, 23, 42, 0.6);
          border-color: rgba(255, 255, 255, 0.12);
        }
        .roi-inquiry-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
          text-align: left;
        }
        .roi-inquiry-form {
          display: flex;
          gap: 8px;
        }
        .roi-inquiry-input {
          flex: 1;
          padding: 9px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 0.85rem;
        }
        .roi-inquiry-btn {
          padding: 9px 16px;
          font-size: 0.85rem;
          white-space: nowrap;
        }
        .roi-inquiry-success {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #10B981;
          font-weight: 600;
          padding: 4px 0;
        }
        @media (max-width: 860px) {
          .roi-calculator-card {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 32px 24px;
          }
        }
        @media (max-width: 480px) {
          .roi-calculator-card {
            padding: 24px 16px;
            border-radius: 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <div className="eyebrow" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
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
        <div className="roi-calculator-card">
          {/* Left Column: Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Input 1: Average Customer Value */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="customer-value" className="roi-label">
                  Average Customer Value
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
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
                  accentColor: 'var(--accent-blue)',
                  height: '6px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>$50</span>
                <span>$2,500+</span>
              </div>
            </div>

            {/* Input 2: Missed Calls per Month */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="missed-calls" className="roi-label">
                  Missed Calls per Month
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>5</span>
                <span>200 calls</span>
              </div>
            </div>

            {/* Input 3: Estimated Conversion Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="conversion-rate" className="roi-label">
                  Estimated Booking Conversion Rate
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
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
                  accentColor: 'var(--accent-emerald)',
                  height: '6px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>10%</span>
                <span>75%</span>
              </div>
            </div>

          </div>

          {/* Right Column: Output Card */}
          <div className="roi-output-card">
            <span className="roi-output-title">
              Estimated Potential Revenue From Recovered Calls
            </span>

            <div style={{
              fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--accent-emerald)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '12px 0'
            }}>
              ${estimatedRevenue.toLocaleString()}
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600 }}>/mo</span>
            </div>

            <div className="roi-output-badge">
              ≈ <strong>{recoveredCalls}</strong> additional appointments scheduled every month
            </div>

            {/* Direct Email Inquiry: Send My Custom Breakdown */}
            <div className="roi-inquiry-box">
              <div className="roi-inquiry-header">
                <Mail size={15} color="var(--accent-blue)" />
                <span>Email me this revenue recovery plan</span>
              </div>
              
              {roiSubmitted ? (
                <div className="roi-inquiry-success">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>Report sent to <strong>{roiEmail}</strong>!</span>
                </div>
              ) : (
                <form onSubmit={handleRoiInquirySubmit} className="roi-inquiry-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={roiEmail}
                    onChange={handleRoiEmailChange}
                    onBlur={handleRoiEmailBlur}
                    className="roi-inquiry-input"
                    aria-label="Email for ROI calculation report"
                  />
                  <button 
                    type="submit" 
                    disabled={roiSubmitting}
                    className="btn btn-secondary roi-inquiry-btn"
                  >
                    <span>{roiSubmitting ? 'Sending...' : 'Send Plan'}</span>
                  </button>
                </form>
              )}
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

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
              This calculator provides an illustrative estimate and does not guarantee revenue or conversion results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

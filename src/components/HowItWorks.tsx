import React from 'react';
import { Phone, Waves, Bot, CalendarCheck, ArrowRight, ArrowDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Customer Calls',
      description: 'A customer dials your existing business phone number — day or night.',
      icon: Phone,
      color: '#3B82F6',
      subtext: 'Incoming Ring'
    },
    {
      number: '02',
      title: 'Agent Pettra Answers',
      description: 'Agent Pettra answers instantly without hold times and starts a natural, warm conversation.',
      icon: Waves,
      color: '#06B6D4',
      subtext: 'Instant Pickup'
    },
    {
      number: '03',
      title: 'Agent Pettra Understands',
      description: 'Agent Pettra understands what the caller needs, answers questions, and qualifies availability.',
      icon: Bot,
      color: '#6366F1',
      subtext: 'Active Intelligence'
    },
    {
      number: '04',
      title: 'Appointment Booked',
      description: 'Agent Pettra checks real-time slots, reserves the calendar time, and sends SMS confirmation.',
      icon: CalendarCheck,
      color: '#10B981',
      subtext: 'Calendar Synced'
    }
  ];

  return (
    <section className="section-padding" id="how-it-works" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <span>AUTOMATED WORKFLOW</span>
          </div>
          <h2 className="section-title">
            From phone call to appointment in minutes.
          </h2>
          <p className="section-subtitle">
            A frictionless customer experience engineered to capture leads and fill your schedule automatically.
          </p>
        </div>

        {/* Workflow Progression Stepper Cards */}
        <div className="how-it-works-grid">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.number}>
                <div className="step-card-wrapper">
                  <div
                    className="glass-card step-card"
                    style={{
                      borderTop: `2px solid ${step.color}80`
                    }}
                  >
                    {/* Step Top Meta */}
                    <div className="step-card-header">
                      <span
                        className="step-badge"
                        style={{
                          color: step.color,
                          borderColor: `${step.color}40`,
                          background: `${step.color}12`
                        }}
                      >
                        STEP {step.number}
                      </span>

                      <div
                        className="step-icon-box"
                        style={{
                          background: `${step.color}18`,
                          borderColor: `${step.color}45`,
                          color: step.color
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <h3 className="step-title">
                      {step.title}
                    </h3>

                    <p className="step-description">
                      {step.description}
                    </p>

                    <div className="step-footer">
                      <span className="step-subtext" style={{ color: step.color }}>
                        • {step.subtext}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Right Connector Arrow (Floating cleanly between cards, never clipped) */}
                  {!isLast && (
                    <div
                      className="desktop-step-connector"
                      aria-hidden="true"
                    >
                      <ArrowRight size={15} />
                    </div>
                  )}
                </div>

                {/* Mobile / Tablet Downward Connector Arrow (Shown between stacked cards) */}
                {!isLast && (
                  <div className="mobile-step-connector" aria-hidden="true">
                    <div className="mobile-connector-line"></div>
                    <div className="mobile-connector-badge">
                      <ArrowDown size={14} />
                    </div>
                    <div className="mobile-connector-line"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style>{`
        /* How It Works Responsive Layout */
        .how-it-works-grid {
          display: grid;
          position: relative;
          gap: 28px;
        }

        .step-card-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .step-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
          border-radius: var(--radius-lg);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          overflow: visible !important; /* Prevents connector arrows from ever being cut off */
        }

        .step-card:hover {
          transform: translateY(-4px);
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .step-badge {
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 8px;
          border: 1px solid;
        }

        .step-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 10px;
          line-height: 1.25;
        }

        .step-description {
          font-size: 0.9375rem;
          color: #94A3B8;
          line-height: 1.6;
          flex-grow: 1;
        }

        .step-footer {
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .step-subtext {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Desktop Mode (4 Columns with clean floating arrows in the gap) */
        @media (min-width: 1024px) {
          .how-it-works-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
          }

          .desktop-step-connector {
            display: flex !important;
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #080D1A;
            border: 1.5px solid rgba(96, 165, 250, 0.45);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7), 0 0 12px rgba(59, 130, 246, 0.35);
            align-items: center;
            justify-content: center;
            color: #60A5FA;
            pointer-events: none;
          }

          .mobile-step-connector {
            display: none !important;
          }
        }

        /* Tablet / iPad (2x2 Grid with balanced spacing) */
        @media (min-width: 641px) and (max-width: 1023px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .desktop-step-connector {
            display: none !important;
          }

          .mobile-step-connector {
            display: none !important;
          }
        }

        /* Mobile Mode (1 Column with clean vertical connectors) */
        @media (max-width: 640px) {
          .how-it-works-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .desktop-step-connector {
            display: none !important;
          }

          .mobile-step-connector {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px 0;
          }

          .mobile-connector-line {
            width: 30px;
            height: 1px;
            background: rgba(59, 130, 246, 0.25);
          }

          .mobile-connector-badge {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #0D1527;
            border: 1px solid rgba(96, 165, 250, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #60A5FA;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }

          .step-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { Phone, Waves, Bot, CalendarCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Customer Calls',
      description: 'A customer dials your existing business phone number — day or night.',
      icon: Phone,
      color: '#3B82F6'
    },
    {
      number: '02',
      title: 'Petra Answers',
      description: 'Petra answers instantly without hold times and starts a natural, warm conversation.',
      icon: Waves,
      color: '#06B6D4'
    },
    {
      number: '03',
      title: 'Petra Understands',
      description: 'Petra understands what the caller needs, answers questions, and qualifies availability.',
      icon: Bot,
      color: '#6366F1'
    },
    {
      number: '04',
      title: 'Appointment Booked',
      description: 'Petra checks real-time slots, reserves the calendar time, and sends SMS confirmation.',
      icon: CalendarCheck,
      color: '#10B981'
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

        {/* 4 Connected Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          position: 'relative'
        }}>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="glass-card"
                style={{
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Step Number */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: step.color,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${step.color}33`
                  }}>
                    STEP {step.number}
                  </span>

                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color
                  }}>
                    <IconComponent size={20} />
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '10px'
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  color: '#94A3B8',
                  lineHeight: 1.55
                }}>
                  {step.description}
                </p>

                {/* Subtle Step Connector Indicator */}
                {index < steps.length - 1 && (
                  <div 
                    className="step-connector"
                    style={{
                      display: 'none',
                      position: 'absolute',
                      right: '-14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#0D1527',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60A5FA'
                    }}
                  >
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .step-connector {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};

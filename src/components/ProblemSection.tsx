import React from 'react';
import { PhoneMissed, Clock, Users2, AlertTriangle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      badge: 'MISSED CALLS',
      title: "The call you couldn't answer.",
      description: "You're helping an in-office client. Your phone rings. You miss the call — and the revenue walks right to your competitor.",
      icon: PhoneMissed,
      color: '#EF4444',
      bgGradient: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.12) 0%, transparent 70%)'
    },
    {
      badge: 'AFTER HOURS',
      title: "Your business closes. Your phone doesn't.",
      description: "Over 40% of appointments are requested after 5:00 PM and on weekends when your staff is home. Voicemails rarely convert.",
      icon: Clock,
      color: '#F59E0B',
      bgGradient: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.12) 0%, transparent 70%)'
    },
    {
      badge: 'RECEPTIONIST OVERLOAD',
      title: "Your team has better things to do.",
      description: "Answering the same repetitive inquiries and playing calendar tag pulls your front-desk staff away from delivering exceptional service.",
      icon: Users2,
      color: '#6366F1',
      bgGradient: 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.12) 0%, transparent 70%)'
    }
  ];

  return (
    <section className="section-padding" style={{ position: 'relative' }} id="problems">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow" style={{ color: '#F87171', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.25)' }}>
            <AlertTriangle size={14} />
            <span>THE REALITY OF MISSED OPPORTUNITY</span>
          </div>
          <h2 className="section-title">
            Your customers don&apos;t call only when you&apos;re available.
          </h2>
          <p className="section-subtitle">
            Every unanswered ring costs you real appointments, valuable patient trust, and recurring business.
          </p>
        </div>

        {/* 3 Large Cards */}
        <div className="problem-grid">
          {problems.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="glass-card problem-card"
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Background glow overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: card.bgGradient,
                  pointerEvents: 'none'
                }}></div>

                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: card.color,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    marginBottom: '20px'
                  }}>
                    {card.badge}
                  </div>

                  <h3 style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    marginBottom: '14px'
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontSize: '0.96rem',
                    color: '#94A3B8',
                    lineHeight: 1.6
                  }}>
                    {card.description}
                  </p>
                </div>

                <div style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color
                  }}>
                    <IconComponent size={22} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
                    Impact: High
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .problem-card {
          padding: 36px 30px;
          min-height: 300px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .problem-card:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 1024px) {
          .problem-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
          }
          .problem-card {
            padding: 30px 24px;
          }
        }

        @media (max-width: 640px) {
          .problem-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .problem-card {
            padding: 24px 20px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
};

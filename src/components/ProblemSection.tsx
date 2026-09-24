import React from 'react';
import { PhoneMissed, Clock, Users2, AlertTriangle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      badge: 'MISSED CALLS',
      title: "Concurrent calls during peak front-desk hours.",
      description: "When staff is assisting in-person clients, incoming calls go to voicemail. Industry call data indicates over 80% of first-time callers hang up and call the next provider.",
      icon: PhoneMissed,
      color: '#EF4444',
      bgGradient: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.12) 0%, transparent 70%)'
    },
    {
      badge: 'AFTER HOURS',
      title: "Evenings and weekend inquiry demand.",
      description: "Healthcare and field-service benchmarks show up to 40% of appointment inquiries occur after 5:00 PM or on weekends. Unassisted voicemail rarely leads to a completed booking.",
      icon: Clock,
      color: '#F59E0B',
      bgGradient: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.12) 0%, transparent 70%)'
    },
    {
      badge: 'ROUTINE INTAKE LOAD',
      title: "Repetitive screening interrupts focused operations.",
      description: "Routing simple directions, standard operating hours, and reschedule requests pulls practice staff away from complex client and patient interactions.",
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
                  background: 'var(--bg-card)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)'
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
                    background: 'var(--bg-secondary)',
                    marginBottom: '20px',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {card.badge}
                  </div>

                  <h3 style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    marginBottom: '14px'
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontSize: '0.96rem',
                    color: 'var(--text-secondary)',
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
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color
                  }}>
                    <IconComponent size={22} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
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

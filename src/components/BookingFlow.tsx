import React from 'react';
import { 
  PhoneCall, 
  Brain, 
  CalendarSearch, 
  CalendarPlus, 
  CheckCircle, 
  ArrowRight,
  User,
  Clock,
  Sparkles,
  CalendarCheck
} from 'lucide-react';

export const BookingFlow: React.FC = () => {
  const flowNodes = [
    { label: 'CALL', icon: PhoneCall, color: '#3B82F6' },
    { label: 'PETRA UNDERSTANDS', icon: Brain, color: '#6366F1' },
    { label: 'CHECKS AVAILABILITY', icon: CalendarSearch, color: '#06B6D4' },
    { label: 'BOOKS APPOINTMENT', icon: CalendarPlus, color: '#F59E0B' },
    { label: 'CUSTOMER CONFIRMED', icon: CheckCircle, color: '#10B981' },
  ];

  return (
    <section className="section-padding" style={{ position: 'relative', background: 'rgba(7, 11, 22, 0.7)' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <CalendarCheck size={14} />
            <span>INTELLIGENT SCHEDULING</span>
          </div>
          <h2 className="section-title">
            A conversation can become an appointment.
          </h2>
          <p className="section-subtitle">
            See how seamlessly Petra translates natural speech into a synchronized calendar reservation.
          </p>
        </div>

        {/* Linear Workflow Visualization */}
        <div className="booking-flow-track">
          {flowNodes.map((node, i) => {
            const Icon = node.icon;
            const isLast = i === flowNodes.length - 1;
            return (
              <React.Fragment key={i}>
                <div
                  className="booking-flow-node"
                  style={{
                    border: `1px solid ${node.color}40`,
                    boxShadow: `0 4px 20px ${node.color}18`
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `${node.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: node.color,
                    flexShrink: 0
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#F8FAFC'
                  }}>
                    {node.label}
                  </span>
                </div>

                {!isLast && (
                  <div className="booking-flow-arrow" aria-hidden="true">
                    <ArrowRight size={18} color="#64748B" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Calendar UI Demonstration Mockup Card */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: 'clamp(20px, 4vw, 36px)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(16, 185, 129, 0.15)'
        }}>
          {/* Demonstration Notice */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#60A5FA',
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '4px 10px',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <Sparkles size={12} />
            <span>Interactive Demonstration Mockup</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}>
                <CalendarCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, margin: 0 }}>
                  Appointment Reserved
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#10B981', margin: '2px 0 0 0', fontWeight: 600 }}>
                  Confirmed via Petra Voice Assistant
                </p>
              </div>
            </div>

            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}>
              SYNCED TO CALENDAR
            </span>
          </div>

          {/* Details Pill Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            margin: '24px 0'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Customer Name
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} color="#60A5FA" />
                <span style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Sarah Jenkins
                </span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Date & Time
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#10B981" />
                <span style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Thursday @ 2:30 PM
                </span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Service Type
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#F59E0B" />
                <span style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 700 }}>
                  Consultation
                </span>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#64748B',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '16px'
          }}>
            * Sample simulated appointment demonstration. Client credentials and data are protected.
          </div>
        </div>

        {/* Section 23: Calendar Integration Showcase */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          maxWidth: '740px',
          margin: '64px auto 0 auto'
        }}>
          <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Petra works around your schedule.
          </h3>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Petra can be configured to work with your appointment availability and scheduling workflow.
          </p>
        </div>
      </div>

      <style>{`
        .booking-flow-track {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 56px;
        }

        .booking-flow-node {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 16px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s ease;
        }

        .booking-flow-node:hover {
          transform: translateY(-2px);
        }

        .booking-flow-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .booking-flow-track {
            flex-direction: column;
            gap: 8px;
            margin-bottom: 36px;
          }

          .booking-flow-node {
            width: 100%;
            max-width: 300px;
            padding: 12px 18px;
            justify-content: flex-start;
          }

          .booking-flow-arrow {
            transform: rotate(90deg);
            margin: 2px 0;
          }
        }
      `}</style>
    </section>
  );
};

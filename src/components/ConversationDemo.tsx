import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Play, 
  RotateCcw, 
  PhoneCall, 
  Sparkles 
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ConversationDemoProps {
  onOpenVoiceDemo: () => void;
}

interface Dialogue {
  sender: 'customer' | 'petra';
  text: string;
}

export const ConversationDemo: React.FC<ConversationDemoProps> = ({ onOpenVoiceDemo }) => {
  const fullConversation: Dialogue[] = [
    { sender: 'customer', text: "Hi, I'd like to schedule an appointment." },
    { sender: 'petra', text: "Absolutely! I'd be happy to help. What day works best for you?" },
    { sender: 'customer', text: "Thursday afternoon." },
    { sender: 'petra', text: "I have 2:30 PM and 4:00 PM available. Which works better?" },
    { sender: 'customer', text: "2:30." },
    { sender: 'petra', text: "Perfect. Your appointment is booked for Thursday at 2:30 PM." }
  ];

  const [visibleCount, setVisibleCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    if (visibleCount < fullConversation.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, isPlaying]);

  const restartSimulation = () => {
    setVisibleCount(1);
    setIsPlaying(true);
  };

  const isCompleted = visibleCount >= fullConversation.length;

  return (
    <section className="section-padding conversation-demo-section" style={{ position: 'relative' }}>
      <style>{`
        .conversation-demo-section {
          background: var(--bg-darkest);
        }
        .conversation-card {
          max-width: 740px;
          margin: 0 auto;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: clamp(20px, 4vw, 36px);
          box-shadow: var(--shadow-lg);
        }
        [data-theme="dark"] .conversation-card {
          background: rgba(15, 23, 42, 0.85);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        .caller-bubble {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }
        .petra-bubble {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%);
          border: 1px solid rgba(37, 99, 235, 0.3);
          color: var(--text-primary);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
        }
        [data-theme="dark"] .petra-bubble {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(99, 102, 241, 0.2) 100%);
          border: 1px solid rgba(96, 165, 250, 0.35);
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
        }
        .conversation-replay-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .conversation-replay-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .appointment-confirmed-banner {
          margin-top: 16px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.2) 100%);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .appointment-confirmed-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          font-weight: 700;
          margin: 0;
        }
        .appointment-confirmed-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          color: var(--accent-emerald);
          font-weight: 600;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <MessageSquare size={14} />
            <span>REAL-TIME SIMULATION</span>
          </div>
          <h2 className="section-title">
            See Agent Pettra in Action.
          </h2>
          <p className="section-subtitle">
            Watch how naturally Agent Pettra converses, understands nuances, and books appointments seamlessly.
          </p>
        </div>

        {/* Conversation Box Interface */}
        <div className="conversation-card">

          {/* Chat Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 10px #10B981'
              }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                  Active Call Transcript Simulation
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Natural language booking flow
                </span>
              </div>
            </div>

            <button
              onClick={restartSimulation}
              className="conversation-replay-btn"
              aria-label="Replay simulation"
            >
              <RotateCcw size={14} />
              <span>Replay</span>
            </button>
          </div>

          {/* Progressive Message Bubbles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '340px' }}>
            {fullConversation.slice(0, visibleCount).map((item, index) => {
              const isPetra = item.sender === 'petra';
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isPetra ? 'flex-start' : 'flex-end',
                    animation: 'fadeIn 0.4s ease-out'
                  }}
                >
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: isPetra ? 'var(--accent-blue)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {isPetra ? 'Agent Pettra (AI Receptionist)' : 'Caller'}
                  </span>
                  <div 
                    className={isPetra ? 'petra-bubble' : 'caller-bubble'}
                    style={{
                      maxWidth: '85%',
                      padding: '14px 18px',
                      borderRadius: isPetra ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      fontSize: '0.98rem',
                      lineHeight: 1.45
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}

            {/* Appointment Confirmed Card */}
            {isCompleted && (
              <div className="appointment-confirmed-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h5 className="appointment-confirmed-title">
                      ✓ Appointment Confirmed
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
                      <span className="appointment-confirmed-meta">
                        <Calendar size={14} />
                        Thursday
                      </span>
                      <span className="appointment-confirmed-meta">
                        <Clock size={14} />
                        2:30 PM
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  Calendar Reserved
                </div>
              </div>
            )}
          </div>

          {/* Bottom Callout: Primary Voice Interaction Rule (Section 20) */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, display: 'block' }}>
                Want to hear the real voice agent live?
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Speak directly to Agent Pettra with your microphone.
              </span>
            </div>

            <button
              onClick={() => {
                trackEvent('hero_cta_click', { source: 'conversation_demo_bottom' });
                onOpenVoiceDemo();
              }}
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.9375rem' }}
            >
              <PhoneCall size={16} />
              <span>Talk to Agent Pettra Now</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

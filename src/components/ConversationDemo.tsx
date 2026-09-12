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
    <section className="section-padding" style={{ position: 'relative', background: 'rgba(8, 13, 26, 0.7)' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <MessageSquare size={14} />
            <span>REAL-TIME SIMULATION</span>
          </div>
          <h2 className="section-title">
            See Petra in Action.
          </h2>
          <p className="section-subtitle">
            Watch how naturally Petra converses, understands nuances, and books appointments seamlessly.
          </p>
        </div>

        {/* Conversation Box Interface */}
        <div style={{
          maxWidth: '740px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: ' clamp(20px, 4vw, 36px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}>

          {/* Chat Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
                <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 700, margin: 0 }}>
                  Active Call Transcript Simulation
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  Natural language booking flow
                </span>
              </div>
            </div>

            <button
              onClick={restartSimulation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#CBD5E1',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
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
                    color: isPetra ? '#60A5FA' : '#94A3B8',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {isPetra ? 'Petra (AI Receptionist)' : 'Caller'}
                  </span>
                  <div style={{
                    maxWidth: '85%',
                    padding: '14px 18px',
                    borderRadius: isPetra ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    background: isPetra 
                      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(99, 102, 241, 0.2) 100%)' 
                      : 'rgba(255, 255, 255, 0.07)',
                    border: `1px solid ${isPetra ? 'rgba(96, 165, 250, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: '#FFFFFF',
                    fontSize: '0.98rem',
                    lineHeight: 1.45,
                    boxShadow: isPetra ? '0 4px 16px rgba(37, 99, 235, 0.15)' : 'none'
                  }}>
                    {item.text}
                  </div>
                </div>
              );
            })}

            {/* Appointment Confirmed Card */}
            {isCompleted && (
              <div style={{
                marginTop: '16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.45)',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                animation: 'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
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
                    <h5 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700, margin: 0 }}>
                      ✓ Appointment Confirmed
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#D1FAE5' }}>
                        <Calendar size={14} />
                        Thursday
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#D1FAE5' }}>
                        <Clock size={14} />
                        2:30 PM
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(16, 185, 129, 0.25)',
                  color: '#A7F3D0',
                  fontSize: '0.8rem',
                  fontWeight: 600
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, display: 'block' }}>
                Want to hear the real voice agent live?
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Speak directly to Petra with your microphone.
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
              <span>Talk to Petra Now</span>
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

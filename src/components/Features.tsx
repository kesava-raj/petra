import React from 'react';
import { 
  Clock, 
  MessageCircle, 
  CalendarCheck, 
  HelpCircle, 
  Sliders, 
  BellRing,
  Sparkles 
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: '24/7 Call Answering',
      description: 'Petra can answer calls whenever your customers need you — nights, weekends, and holidays included.',
      icon: Clock,
      color: '#3B82F6'
    },
    {
      title: 'Natural Conversations',
      description: 'Customers can speak naturally instead of navigating frustrating press-1-for robotic phone menus.',
      icon: MessageCircle,
      color: '#6366F1'
    },
    {
      title: 'Appointment Booking',
      description: 'Petra can help turn conversations into scheduled appointments when connected to your scheduling workflow.',
      icon: CalendarCheck,
      color: '#10B981'
    },
    {
      title: 'Business Questions',
      description: 'Configure Petra with information about your business, services, pricing policies, hours, and FAQs.',
      icon: HelpCircle,
      color: '#06B6D4'
    },
    {
      title: 'Custom Voice Experience',
      description: 'Configure Petra’s personality, greeting, and conversation style tailored around your unique brand.',
      icon: Sliders,
      color: '#F59E0B'
    },
    {
      title: 'Call Notifications',
      description: 'Stay informed about important calls, caller details, summaries, and appointment activity instantly.',
      icon: BellRing,
      color: '#EC4899'
    }
  ];

  return (
    <section className="section-padding" id="features" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            More Than Just Answering the Phone.
          </h2>
          <p className="section-subtitle">
            An intelligent digital receptionist equipped with everything needed to represent your brand with excellence.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="glass-card feature-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${feature.color}18`,
                  border: `1px solid ${feature.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  boxShadow: `0 4px 20px ${feature.color}25`
                }}>
                  <IconComponent size={24} />
                </div>

                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em'
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  fontSize: '0.96rem',
                  color: '#94A3B8',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          padding: 36px 28px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .feature-card {
            padding: 30px 24px;
          }
        }

        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .feature-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
};

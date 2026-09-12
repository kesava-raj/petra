import React from 'react';
import { 
  Stethoscope, 
  Scissors, 
  Sparkles, 
  Scale, 
  Home, 
  Wrench, 
  HeartPulse, 
  Activity, 
  Smile, 
  Flower2 
} from 'lucide-react';

export const IndustryStrip: React.FC = () => {
  const industries = [
    { name: 'Dental Clinics', icon: Smile },
    { name: 'Medical Practices', icon: Stethoscope },
    { name: 'Hair & Beauty Salons', icon: Scissors },
    { name: 'Luxury Spas', icon: Flower2 },
    { name: 'Med Spas', icon: Sparkles },
    { name: 'Law Firms', icon: Scale },
    { name: 'Real Estate', icon: Home },
    { name: 'Home Services', icon: Wrench },
    { name: 'Auto Services', icon: Activity },
    { name: 'Wellness Clinics', icon: HeartPulse }
  ];

  return (
    <section 
      style={{
        padding: '48px 0',
        background: 'rgba(8, 13, 26, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            color: '#94A3B8'
          }}>
            Built for businesses that depend on appointments
          </p>
        </div>

        {/* Industry Cards Grid / Marquee */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {industries.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.25s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <IconComponent size={18} color="#60A5FA" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0' }}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

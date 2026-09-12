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
      className="industry-strip-section"
      style={{
        padding: '48px 0',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <style>{`
        .industry-strip-section {
          background: var(--bg-darkest);
        }
        .industry-strip-pill {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s ease;
          cursor: default;
          box-shadow: var(--shadow-sm);
        }
        .industry-strip-pill:hover {
          background: rgba(37, 99, 235, 0.1);
          border-color: var(--accent-blue);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .industry-strip-pill-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            color: 'var(--text-muted)'
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
              <div key={index} className="industry-strip-pill">
                <IconComponent size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                <span className="industry-strip-pill-text">
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

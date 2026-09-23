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
  Flower2,
  ChevronRight
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

export const IndustryStrip: React.FC = () => {
  const industries = [
    { name: 'Dental Clinics', icon: Smile, path: '/industries/dental' },
    { name: 'Medical Practices', icon: Stethoscope, path: '/industries/medical' },
    { name: 'Hair & Beauty Salons', icon: Scissors, path: '/industries/salons' },
    { name: 'Luxury Spas', icon: Flower2, path: '/industries/spas' },
    { name: 'Med Spas', icon: Sparkles, path: '/industries/med-spa' },
    { name: 'Law Firms', icon: Scale, path: '/industries/legal' },
    { name: 'Real Estate', icon: Home, path: '/industries/real-estate' },
    { name: 'Home Services', icon: Wrench, path: '/industries/home-services' },
    { name: 'Auto Services', icon: Activity, path: '/industries/auto-services' },
    { name: 'Wellness Clinics', icon: HeartPulse, path: '/industries/wellness' }
  ];

  const handlePillClick = (path: string, name: string) => {
    trackEvent('industry_page_view', { industry: name, source: 'industry_strip' });
    navigateTo(path);
  };

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
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          text-decoration: none;
        }
        .industry-strip-pill:hover {
          background: rgba(37, 99, 235, 0.1);
          border-color: var(--accent-blue);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .industry-strip-pill:hover .industry-strip-arrow {
          opacity: 1;
          transform: translateX(2px);
        }
        .industry-strip-pill-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .industry-strip-arrow {
          opacity: 0;
          transition: all 0.2s ease;
          color: var(--accent-blue);
          margin-left: 2px;
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
            Explore dedicated workflows built for appointment-driven businesses
          </p>
        </div>

        {/* Industry Cards Grid */}
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
              <button
                key={index} 
                onClick={() => handlePillClick(item.path, item.name)}
                className="industry-strip-pill"
                type="button"
                aria-label={`View AI Receptionist for ${item.name}`}
              >
                <IconComponent size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                <span className="industry-strip-pill-text">
                  {item.name}
                </span>
                <ChevronRight size={14} className="industry-strip-arrow" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

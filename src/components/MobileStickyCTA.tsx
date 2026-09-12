import React, { useState, useEffect } from 'react';
import { PhoneCall, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface MobileStickyCTAProps {
  onOpenDemo: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOpenDemo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA once user scrolls past hero
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside 
      className="mobile-sticky-cta" 
      aria-label="Quick voice call action"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '16px',
        right: '16px',
        zIndex: 90,
        display: 'none',
        animation: 'slideUp 0.3s ease-out'
      }}
    >
      <button
        onClick={() => {
          trackEvent('hero_cta_click', { source: 'mobile_sticky_cta' });
          onOpenDemo();
        }}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '16px 24px',
          fontSize: '1.05rem',
          fontWeight: 700,
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <PhoneCall size={20} />
        <span>Talk to Petra</span>
        <Sparkles size={16} color="#93C5FD" />
      </button>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 899px) {
          .mobile-sticky-cta {
            display: block !important;
          }
        }
      `}</style>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Industries', href: '#industries' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleCtaClick = () => {
    trackEvent('hero_cta_click', { source: 'navbar' });
    onOpenDemo();
    setMobileMenuOpen(false);
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(8, 13, 26, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '14px 0' : '20px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          aria-label="Petra AI Homepage"
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.4)'
          }}>
            <PhoneCall size={19} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              fontSize: '1.4rem', 
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}>
              Petra<span style={{ color: '#3B82F6' }}>.</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: '#94A3B8', 
              fontWeight: 600, 
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginTop: '3px'
            }}>
              AI Receptionist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '32px' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: '#CBD5E1',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60A5FA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleCtaClick}
            className="btn btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '0.9375rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            id="nav-talk-to-petra"
          >
            <Sparkles size={16} />
            <span>Talk to Petra</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#F8FAFC',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(8, 13, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          zIndex: 99
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#E2E8F0',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleCtaClick}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
          >
            <PhoneCall size={18} />
            Talk to Petra
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

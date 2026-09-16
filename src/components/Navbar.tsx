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
    { label: 'Inquiry', href: '#inquiry' },
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
        backgroundColor: isScrolled ? 'var(--bg-glass-strong)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        paddingTop: isScrolled ? 'calc(12px + env(safe-area-inset-top, 0px))' : 'calc(18px + env(safe-area-inset-top, 0px))',
        paddingBottom: isScrolled ? '12px' : '18px'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          aria-label="Agent Pettra AI Homepage"
        >
          <img 
            src="/logo.png" 
            alt="Agent Pettra Logo" 
            className="navbar-brand-logo"
            width={40}
            height={40}
            style={{
              width: 'clamp(34px, 3.8vw, 42px)',
              height: 'clamp(34px, 3.8vw, 42px)',
              objectFit: 'contain',
              flexShrink: 0,
              filter: 'drop-shadow(0 3px 10px rgba(99, 102, 241, 0.35))',
              transition: 'transform 0.2s ease'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              fontSize: '1.4rem', 
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}>
              Agent Pettra<span style={{ color: 'var(--accent-blue)' }}>.</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: 'var(--text-muted)', 
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
                fontWeight: 600,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleCtaClick}
            className="btn btn-primary nav-cta-btn"
            style={{
              padding: '10px 20px',
              fontSize: '0.9375rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            id="nav-talk-to-agent-pettra"
          >
            <Sparkles size={16} />
            <span className="nav-cta-text">Talk to Agent Pettra</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: '64px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 98
            }}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px 20px calc(24px + env(safe-area-inset-bottom, 0px)) 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 99,
            maxHeight: 'calc(100dvh - 70px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={handleCtaClick}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '8px', justifyContent: 'center', padding: '14px' }}
            >
              <PhoneCall size={18} />
              Talk to Agent Pettra
            </button>
          </div>
        </>
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
        @media (max-width: 520px) {
          .nav-cta-text {
            display: none;
          }
          .nav-cta-btn {
            padding: 8px 12px !important;
          }
        }
      `}</style>
    </header>
  );
};

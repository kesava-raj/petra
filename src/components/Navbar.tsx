import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { navigateTo, useCurrentRoute } from '../utils/navigation';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);

  const mainLinks = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Customers', href: '/customers' },
    { label: 'About', href: '/about' },
  ];

  const industryLinks = [
    { label: 'Dental Clinics', href: '/industries/dental', desc: 'Recall & new patient emergency triage' },
    { label: 'Medical Practices', href: '/industries/medical', desc: 'Patient intake & appointment routing' },
    { label: 'Hair & Beauty Salons', href: '/industries/salons', desc: 'Stylist matching & deposit capture' },
    { label: 'Luxury Spas', href: '/industries/spas', desc: 'White-glove concierge & packages' },
    { label: 'Med Spas & Aesthetics', href: '/industries/med-spa', desc: 'Treatment FAQs & consultations' },
    { label: 'Law Firms', href: '/industries/legal', desc: 'Case intake & UPL conflict screening' },
    { label: 'Real Estate', href: '/industries/real-estate', desc: 'Showing coordination & MLS lookup' },
    { label: 'Home Services & HVAC', href: '/industries/home-services', desc: 'After-hours job capture & dispatch' },
    { label: 'Auto Services', href: '/industries/auto-services', desc: 'Vehicle triage & bay drop-off' },
    { label: 'Wellness Clinics', href: '/industries/wellness', desc: 'PT, Chiro & rehab intake' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIndustryDropdownOpen(false);
    navigateTo(href);
  };

  const handleCtaClick = () => {
    trackEvent('hero_cta_click', { source: 'navbar' });
    onOpenDemo();
    setMobileMenuOpen(false);
    setIndustryDropdownOpen(false);
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
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/');
          }}
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
          style={{ display: 'none', alignItems: 'center', gap: '28px' }}
          className="desktop-nav"
        >
          {/* Industries Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIndustryDropdownOpen(true)}
            onMouseLeave={() => setIndustryDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: currentRoute.startsWith('/industries') ? 'var(--accent-blue)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 0'
              }}
            >
              <span>Industries</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>▾</span>
            </button>

            {industryDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-40px',
                  width: '560px',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  zIndex: 110
                }}
              >
                {industryLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'background 0.15s ease',
                      background: currentRoute === item.href ? 'rgba(37, 99, 235, 0.08)' : 'transparent'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = currentRoute === item.href ? 'rgba(37, 99, 235, 0.08)' : 'transparent')}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: currentRoute === item.href ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {mainLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: currentRoute === link.href ? 'var(--accent-blue)' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentRoute === link.href ? 'var(--accent-blue)' : 'var(--text-secondary)')}
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
            <PhoneCall size={16} />
            <span className="nav-cta-text">Call Live Demo</span>
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
            gap: '12px',
            zIndex: 99,
            maxHeight: 'calc(100dvh - 70px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
              Industries
            </div>
            {industryLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: currentRoute === item.href ? 'var(--accent-blue)' : 'var(--text-primary)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  textDecoration: 'none'
                }}
              >
                {item.label}
              </a>
            ))}

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '12px' }}>
              Pages
            </div>
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: currentRoute === link.href ? 'var(--accent-blue)' : 'var(--text-primary)',
                  padding: '8px 0',
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
              style={{ width: '100%', marginTop: '12px', justifyContent: 'center', padding: '14px' }}
            >
              <PhoneCall size={18} />
              <span>Call Live Demo</span>
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

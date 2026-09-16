import React from 'react';
import { PhoneCall, ShieldCheck, Lock, Eye, ExternalLink } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return; // standard external navigation
    }
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '72px',
      paddingBottom: 'calc(36px + env(safe-area-inset-bottom, 0px))',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)'
    }}>
      <style>{`
        .footer-link {
          color: var(--text-muted);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
          cursor: pointer;
        }
        .footer-link:hover {
          color: var(--accent-blue);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
          gap: 32px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border-subtle);
        }

        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
          .footer-brand-col {
            grid-column: span 3;
          }
        }

        @media (max-width: 680px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .footer-brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 440px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-brand-col {
            grid-column: span 1;
          }
        }
      `}</style>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => navigateTo('/')}
            >
              <img 
                src="/logo.png" 
                alt="Agent Pettra Logo" 
                width={36}
                height={36}
                style={{
                  width: '36px',
                  height: '36px',
                  objectFit: 'contain',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3))'
                }}
              />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em'
              }}>
                Agent Pettra<span style={{ color: 'var(--accent-blue)' }}>.</span>
              </span>
            </div>

            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '320px',
              marginBottom: '20px'
            }}>
              Agent Pettra is an AI receptionist built for modern businesses to answer incoming calls, handle inquiries, and schedule appointments 24/7.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              color: 'var(--accent-emerald)',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
              <span>Systems Operational • 99.99% Uptime</span>
            </div>
          </div>

          {/* 1. Company Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="footer-link">About Agent Pettra</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleLinkClick(e, '#how-it-works')} className="footer-link">How Pettra works</a></li>
              <li><a href="#inquiry" onClick={(e) => handleLinkClick(e, '#inquiry')} className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* 2. Product Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#demo" onClick={(e) => handleLinkClick(e, '#demo')} className="footer-link">AI Receptionist</a></li>
              <li><a href="#features" onClick={(e) => handleLinkClick(e, '#features')} className="footer-link">Features</a></li>
              <li><a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="footer-link">Pricing</a></li>
              <li><a href="#industries" onClick={(e) => handleLinkClick(e, '#industries')} className="footer-link">Industries</a></li>
            </ul>
          </div>

          {/* 3. Legal Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="footer-link">Terms of Service</a></li>
              <li><a href="/security" onClick={(e) => handleLinkClick(e, '/security')} className="footer-link">Security & Telephony</a></li>
              <li><a href="/privacy#cookies" onClick={(e) => handleLinkClick(e, '/privacy#cookies')} className="footer-link">Cookie Policy</a></li>
            </ul>
          </div>

          {/* 4. Trust Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Trust
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="/security#security-by-design" onClick={(e) => handleLinkClick(e, '/security#security-by-design')} className="footer-link">Security-first Architecture</a></li>
              <li><a href="/privacy#no-data-selling" onClick={(e) => handleLinkClick(e, '/privacy#no-data-selling')} className="footer-link">Zero Data Selling</a></li>
              <li><a href="/security#ai-transparency" onClick={(e) => handleLinkClick(e, '/security#ai-transparency')} className="footer-link">AI Transparency</a></li>
            </ul>
          </div>

          {/* 5. Connect Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Connect
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-link">X (Twitter)</a></li>
              <li><a href="mailto:support@agentpettra.ai" className="footer-link">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Credible North American Trust Line */}
        <div style={{
          marginTop: '36px',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          color: 'var(--text-muted)',
          fontSize: '0.8125rem'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Agent Pettra AI Receptionist. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Security-First Architecture</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>No Sale of Personal Information</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>AI-Powered & Transparent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


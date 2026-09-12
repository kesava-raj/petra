import React from 'react';
import { PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#04070E',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '72px 0 36px 0'
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <PhoneCall size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: '#FFFFFF',
                letterSpacing: '-0.03em'
              }}>
                Petra<span style={{ color: '#3B82F6' }}>.</span>
              </span>
            </div>

            <p style={{
              fontSize: '0.92rem',
              color: '#94A3B8',
              lineHeight: 1.6,
              maxWidth: '360px',
              marginBottom: '20px'
            }}>
              Petra is an AI receptionist that helps businesses answer calls and book appointments 24/7.
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
              color: '#34D399',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
              <span>Systems Operational • 99.99% Uptime</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '18px' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#how-it-works" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>How It Works</a></li>
              <li><a href="#features" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Features</a></li>
              <li><a href="#industries" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Industries</a></li>
              <li><a href="#pricing" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Pricing</a></li>
              <li><a href="#faq" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>FAQ</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '18px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>About Petra</a></li>
              <li><a href="#demo" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Voice Demo</a></li>
              <li><a href="mailto:support@petra.ai" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF', marginBottom: '18px' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Security & Telephony</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
            © 2026 Petra. All rights reserved. Built for appointment-driven businesses in the United States.
          </p>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#64748B' }}>
            <span>SOC2 Compliant Architecture</span>
            <span>•</span>
            <span>Zero Data Selling</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer-brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .footer-brand-col {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
};

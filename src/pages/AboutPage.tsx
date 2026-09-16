import React, { useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Zap, 
  Building2, 
  Scissors, 
  Stethoscope, 
  Sparkle, 
  Wrench, 
  Briefcase 
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

interface AboutPageProps {
  onOpenDemo: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenDemo }) => {
  useEffect(() => {
    document.title = 'About Agent Pettra | AI Receptionist Built for Modern Businesses';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCta = () => {
    trackEvent('hero_cta_click', { source: 'about_page' });
    onOpenDemo();
  };

  const capabilities = [
    'Answering incoming business calls',
    'Greeting customers professionally',
    'Answering common business questions',
    'Understanding customer requests',
    'Collecting basic information',
    'Helping customers schedule appointments',
    'Handling after-hours calls',
    'Routing conversations when human assistance is needed',
  ];

  const industries = [
    {
      icon: <Scissors size={24} style={{ color: 'var(--accent-blue)' }} />,
      title: 'Salons & Spas',
      desc: 'Handle appointment requests, service questions and customer calls while stylists are hands-on.'
    },
    {
      icon: <Stethoscope size={24} style={{ color: 'var(--accent-emerald)' }} />,
      title: 'Dental & Medical Practices',
      desc: 'Help answer general inquiries, practice hours, and assist with patient appointment scheduling.'
    },
    {
      icon: <Sparkle size={24} style={{ color: 'var(--accent-indigo)' }} />,
      title: 'Med Spas',
      desc: 'Respond to treatment inquiries and help clients book aesthetic consultations smoothly.'
    },
    {
      icon: <Wrench size={24} style={{ color: 'var(--accent-amber)' }} />,
      title: 'Home Services',
      desc: 'Capture urgent service requests, dispatch details, and organize incoming trade calls 24/7.'
    },
    {
      icon: <Briefcase size={24} style={{ color: 'var(--accent-cyan)' }} />,
      title: 'Professional Services',
      desc: 'Provide an always-available, polite first point of contact for consultations and inquiries.'
    },
    {
      icon: <Building2 size={24} style={{ color: 'var(--accent-rose)' }} />,
      title: 'And More',
      desc: "Pettra's capabilities can be configured around your business's custom information, services and workflows."
    }
  ];

  return (
    <div className="about-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb & Top Bar */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <button 
            onClick={() => navigateTo('/')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Home
          </button>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>About Agent Pettra</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ paddingTop: '72px', paddingBottom: '64px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              color: 'var(--accent-blue)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '24px'
            }}
          >
            <Sparkles size={16} />
            <span>ABOUT AGENT PETTRA</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            Meet Pettra — the AI receptionist built to answer when you can't.
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '720px',
            margin: '0 auto 40px'
          }}>
            Every business gets calls. Some happen while you're serving a customer. Some happen after hours. Some happen when nobody is available to pick up. Agent Pettra is designed to make sure those calls don't simply disappear.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleCta}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Talk to Pettra</span>
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigateTo('/security')}
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
            >
              <span>View Security & Architecture</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Mission Banner */}
      <section className="container" style={{ marginBottom: '72px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px, 5vw, 56px)',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-emerald)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px'
            }}>
              <Clock size={16} />
              <span>Always Available</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '18px',
              letterSpacing: '-0.02em'
            }}>
              Your business stays open.<br />
              <span style={{ color: 'var(--accent-blue)' }}>Even when you can't.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Pettra is an AI-powered receptionist that can answer business calls, have natural conversations with customers, answer frequently asked questions, and help schedule appointments — around the clock.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '14px' }}>
              Pettra gives businesses a virtual receptionist that can be available 24/7 without requiring another desk, another shift, or another person to answer every call.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border-subtle)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
              Pettra can help with:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {capabilities.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.45 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built Pettra */}
      <section className="container" style={{ maxWidth: '880px', marginBottom: '80px' }}>
        <div style={{
          borderLeft: '4px solid var(--accent-blue)',
          paddingLeft: '28px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '16px'
          }}>
            Why We Built Pettra
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Missing a call can mean missing an opportunity. A potential customer may call once, reach voicemail, and move on.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            We wanted to build something different — an AI receptionist that doesn't simply respond with scripted menus, but can actually listen, understand, and respond naturally.
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(99, 102, 241, 0.04))',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 36px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '8px' }}>
            Core Mission
          </p>
          <blockquote style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0 }}>
            "Pettra is designed around one simple idea: Every customer deserves an answer."
          </blockquote>
        </div>
      </section>

      {/* More Than an Automated Phone System (Interactive Comparison) */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
            More Than an Automated Phone System
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Traditional phone systems often make customers navigate menus, press numbers, or wait for someone to become available. Pettra is designed around conversation. A customer can simply say what they need.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Traditional Phone System */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            opacity: 0.85
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              <span>Traditional Phone System</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
              Rigid Keypad Menus & Endless Voicemails
            </h3>
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7
            }}>
              "Thank you for calling. Press 1 for hours. Press 2 for appointments. Press 3 for billing. Press 9 to repeat. Please stay on the line for the next representative..."
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              Result: 67% of callers hang up without leaving a voicemail.
            </p>
          </div>

          {/* Pettra Conversational Flow */}
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-blue)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
              <Sparkles size={16} />
              <span>Agent Pettra</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
              Natural, Two-Way Spoken Conversation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '14px 14px 14px 2px',
                padding: '12px 18px',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                alignSelf: 'flex-start',
                maxWidth: '85%'
              }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Customer:</span>
                "Hi, I'd like to book an appointment for Thursday."
              </div>
              <div style={{
                background: 'rgba(37, 99, 235, 0.12)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: '14px 14px 2px 14px',
                padding: '12px 18px',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                alignSelf: 'flex-end',
                maxWidth: '85%'
              }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-blue)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Pettra:</span>
                "Absolutely. What time works best for you?"
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', fontWeight: 600, marginTop: '20px' }}>
              The goal is to make every customer interaction feel simple, instant, and natural.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Modern Businesses */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Built for Modern Businesses
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Pettra can be adapted to different types of businesses and workflows, configured around your business's information, services, and policies.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {industries.map((ind, i) => (
            <div 
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--border-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div style={{ marginBottom: '16px' }}>{ind.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                {ind.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px, 5vw, 56px)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Our Philosophy
            </h2>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '12px' }}>
              Simple for customers. Useful for businesses. Responsible with data.
            </p>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              We believe AI should make customer interactions easier — not more complicated. That's why we're focused on building Pettra around three foundational principles:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px' }}>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Conversation First
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Customers should be able to simply talk without robotic hurdles or complicated instructions.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-indigo)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Business Focused
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Pettra should perform useful tasks like booking appointments and answering FAQs rather than just generating idle conversation.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Privacy Conscious
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Business and customer information should be handled responsibly, transparently, and never sold for advertising.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Future of the Receptionist */}
      <section className="container" style={{ maxWidth: '840px', textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
          The Future of the Receptionist
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
          Pettra isn't designed to replace the human relationships that make businesses special. It's designed to handle the repetitive first layer of communication so your team can focus on the customers who need them most.
        </p>
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '8px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 36px',
          margin: '16px auto',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Your team handles the moments that need people.
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
            Pettra handles the calls that shouldn't wait.
          </span>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(99, 102, 241, 0.1))',
          border: '1px solid rgba(37, 99, 235, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(40px, 5vw, 64px) 32px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Ready to meet Pettra?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 32px' }}>
            Experience the voice AI receptionist built for modern business phone calls.
          </p>
          <button 
            onClick={handleCta}
            className="btn btn-primary"
            style={{ padding: '16px 36px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span>Talk to Pettra</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

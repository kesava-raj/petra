import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Server, 
  Activity, 
  PhoneIncoming, 
  Mic, 
  BrainCircuit, 
  Volume2, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  Radio, 
  Eye, 
  Zap, 
  Clock 
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { trackEvent } from '../utils/analytics';

interface SecurityPageProps {
  onOpenDemo: () => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onOpenDemo }) => {
  useEffect(() => {
    document.title = 'Security & Telephony Architecture | Agent Pettra';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCta = () => {
    trackEvent('hero_cta_click', { source: 'security_page' });
    onOpenDemo();
  };

  const securityPillars = [
    {
      icon: <Lock size={22} style={{ color: 'var(--accent-blue)' }} />,
      title: 'Encrypted Connections',
      desc: 'We enforce TLS 1.3 encryption in transit for web data and secure SRTP protocol standards for audio telephony streams between supported systems.'
    },
    {
      icon: <KeyRound size={22} style={{ color: 'var(--accent-indigo)' }} />,
      title: 'Role-Based Access Controls',
      desc: 'Access to customer administrative dashboards and information is restricted according to role and operational need under strict least-privilege principles.'
    },
    {
      icon: <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)' }} />,
      title: 'Secure Authentication',
      desc: 'Account access is protected using industry-standard authentication mechanisms designed to prevent credential stuffing and unauthorized account access.'
    },
    {
      icon: <Server size={22} style={{ color: 'var(--accent-cyan)' }} />,
      title: 'Infrastructure Protection',
      desc: 'Pettra relies on established, tier-1 cloud infrastructure and enterprise telephony carriers with multi-region redundancy to operate the platform.'
    },
    {
      icon: <Activity size={22} style={{ color: 'var(--accent-amber)' }} />,
      title: 'Continuous Monitoring',
      desc: 'We continuously monitor telephony performance, system uptime, and operational events to proactively identify latency spikes or security anomalies.'
    }
  ];

  const businessControls = [
    'Business hours & holiday schedules',
    'Custom after-hours call handling',
    'Real-time appointment availability sync',
    'Escalation instructions for urgent matters',
    'Intelligent call forwarding & transfer',
    'Custom business FAQ knowledge bases',
    'Custom greetings & branded tone',
    'Business-specific vocabulary & services',
    'Human team handoff workflows'
  ];

  const flowSteps = [
    { icon: <PhoneIncoming size={20} />, label: 'Customer Calls', sub: 'Inbound PSTN / VoIP' },
    { icon: <Server size={20} />, label: 'Telephony Infrastructure', sub: 'Carrier SIP routing' },
    { icon: <Radio size={20} />, label: 'Pettra Voice Agent', sub: 'Session controller' },
    { icon: <Mic size={20} />, label: 'Speech Recognition', sub: 'Real-time transcription' },
    { icon: <BrainCircuit size={20} />, label: 'AI Processing', sub: 'Intent & action logic' },
    { icon: <Volume2 size={20} />, label: 'Voice Response', sub: 'Sub-second neural TTS' },
    { icon: <PhoneCall size={20} />, label: 'Customer', sub: 'Instant natural reply' },
  ];

  return (
    <div className="security-page" style={{ paddingBottom: '96px' }}>
      {/* Breadcrumb Bar */}
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
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Security & Telephony</span>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{ paddingTop: '72px', paddingBottom: '64px', position: 'relative' }}>
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
            <ShieldCheck size={16} />
            <span>SECURITY & TELEPHONY ARCHITECTURE</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            Built for conversations that businesses depend on.
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            marginBottom: '36px',
            maxWidth: '740px',
            margin: '0 auto 36px'
          }}>
            Pettra handles real customer conversations, which means reliability, privacy and responsible data handling are fundamental to the product. Our architecture is designed around secure access, controlled data handling and reliable telecommunications infrastructure.
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
            <a 
              href="mailto:security@agentpettra.ai"
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', textDecoration: 'none' }}
            >
              <span>Contact Security Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* Security by Design */}
      <section id="security-by-design" className="container" style={{ marginBottom: '88px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
          <div style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Technical Safeguards
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Security by Design
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every component of our voice stack is built from the ground up with defensive security, role isolation, and transparent data safeguards.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {securityPillars.map((pillar, i) => (
            <div 
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
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
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voice & Telephony Flow Diagram */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px, 5vw, 56px)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '720px', marginBottom: '36px' }}>
            <div style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Telecommunications Pipeline
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Voice & Telephony
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Pettra isn't simply a chatbot. It needs to receive a real phone call, understand what someone says, process the request and respond naturally. The complete audio pipeline executes in under 600 milliseconds.
            </p>
          </div>

          {/* Interactive Visual Flow */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 20px',
            border: '1px solid var(--border-subtle)'
          }}>
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  flex: '1 1 120px',
                  minWidth: '110px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px'
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {step.sub}
                  </div>
                </div>

                {idx < flowSteps.length - 1 && (
                  <div style={{ color: 'var(--accent-blue)', opacity: 0.6, fontSize: '1.2rem', fontWeight: 800 }} className="flow-arrow">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>
            Inbound call audio flows securely through carrier SIP interconnects directly to our voice pipeline with low-latency jitter buffering.
          </p>
        </div>
      </section>

      {/* Designed for Real Conversations */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Designed for Real Conversations
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Pettra handles conversational business interactions naturally, without forcing callers through rigid keypad trees.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {[
            { quote: "I'd like to book an appointment.", context: 'Calendar scheduling & availability' },
            { quote: "Are you open Saturday?", context: 'Business hours & location answers' },
            { quote: "How much does a haircut cost?", context: 'Custom service pricing & details' },
            { quote: "Can you schedule me for next Tuesday?", context: 'Multi-turn scheduling confirmation' },
          ].map((ex, i) => (
            <div 
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                borderLeft: '4px solid var(--accent-blue)'
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', fontStyle: 'italic' }}>
                "{ex.quote}"
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {ex.context}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '20px' }}>
          The exact capabilities depend on how each business configures its Pettra agent.
        </p>
      </section>

      {/* Compliance & Legal Guidance Section (Call Recording, AI Transparency, Outbound TCPA) */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {/* Call Recording & Transcripts */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
              <Radio size={18} />
              <span>Compliance Notice</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Call Recording & Transcripts
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
              Depending on the configuration of the service, calls may be recorded and/or transcribed for business records and quality assurance.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
              Businesses are responsible for configuring their call experience in accordance with applicable laws and providing required notices or obtaining required caller consent.
            </p>
            <div style={{ background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-indigo)', padding: '12px 16px', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Call-recording and consent requirements vary by jurisdiction (e.g. one-party vs. two-party/all-party consent states). Do not claim universal compliance from this page alone.
              </p>
            </div>
          </div>

          {/* AI Transparency */}
          <div id="ai-transparency" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
              <Eye size={18} />
              <span>Trust & Authenticity</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              AI Transparency
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
              Pettra is an AI-powered receptionist. Businesses can configure Pettra to identify itself as an AI assistant to callers at the start of each conversation.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
              We strongly recommend clear disclosure rather than attempting to make an AI system appear to be a human employee. Transparency builds lasting customer trust and avoids regulatory friction.
            </p>
            <div style={{ background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-emerald)', padding: '12px 16px', borderRadius: '4px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                Recommended greeting: "Hi, thank you for calling [Business Name]! I'm Pettra, an AI assistant. How can I help you today?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outbound Calling & TCPA Compliance (FCC Guidance) */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px 36px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <AlertTriangle size={20} style={{ color: 'var(--accent-amber)' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Outbound Calling & TCPA / FCC Regulations
            </h3>
          </div>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
            Pettra's primary receptionist workflow is designed around <strong>incoming customer calls</strong>. If outbound AI calling capabilities are introduced by a business, additional legal and compliance requirements apply under the Telephone Consumer Protection Act (TCPA).
          </p>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '18px' }}>
            The Federal Communications Commission (FCC) has confirmed that the TCPA's statutory restrictions on artificial or prerecorded voice calls encompass AI-generated voices for outbound telephone calls (Declaratory Ruling FCC-24-17A1). Outbound AI calls require prior express written consent, caller identification, and automated opt-out mechanisms.
          </p>
          <a 
            href="https://docs.fcc.gov/public/attachments/FCC-24-17A1_Rcd.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}
          >
            <span>Read FCC AI Voice Ruling (FCC-24-17A1)</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Data Handling & FTC Compliance */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px, 5vw, 56px)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Responsible AI
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Data Handling
            </h2>
            <blockquote style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--accent-blue)',
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              borderLeft: '4px solid var(--accent-blue)',
              paddingLeft: '20px'
            }}>
              "Your customer conversations are not our advertising product."
            </blockquote>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span><strong>We do not sell personal information</strong> for monetary or other commercial consideration.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span><strong>We don't build advertising profiles</strong> from customer conversations.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span><strong>Controlled usage:</strong> We process information solely as necessary to provide, secure, maintain and improve the service, subject to your configuration and our Privacy Policy.</span>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Commitment to honoring AI confidentiality in accordance with Federal Trade Commission standards.
              </span>
              <a 
                href="https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/01/ai-companies-uphold-your-privacy-confidentiality-commitments"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}
              >
                <span>FTC AI Privacy Guidance</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Business Controls Grid */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '36px' }}>
          <div style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Administrative Governance
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Business Controls
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Businesses maintain granular control over how their Pettra agent communicates, routes calls, and responds to callers:
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {businessControls.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Sliders size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Reliability: Answer -> Understand -> Respond -> Act */}
      <section className="container" style={{ marginBottom: '88px' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px, 5vw, 48px)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Reliability
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            A receptionist should not simply sound intelligent. It should be useful.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '14px 28px',
            margin: '0 auto 24px'
          }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '1.05rem' }}>Answer</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-indigo)', fontSize: '1.05rem' }}>Understand</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '1.05rem' }}>Respond</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.05rem' }}>Act</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Designed around complete execution rather than endless idle chat.
          </p>
        </div>
      </section>

      {/* Security Questions CTA */}
      <section className="container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(99, 102, 241, 0.08))',
          border: '1px solid rgba(37, 99, 235, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(40px, 5vw, 64px) 32px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Security Questions?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            If you're evaluating Pettra for your organization and need technical details, reach out to our security team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleCta}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Talk to Pettra</span>
              <ArrowRight size={18} />
            </button>
            <a 
              href="mailto:security@agentpettra.ai"
              className="btn btn-secondary"
              style={{ padding: '14px 32px', fontSize: '1.05rem', textDecoration: 'none' }}
            >
              <span>Email: security@agentpettra.ai</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .flow-arrow {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

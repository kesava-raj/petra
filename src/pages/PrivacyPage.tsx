import React, { useEffect } from 'react';
import { Shield, AlertTriangle, ExternalLink, Lock, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Agent Pettra AI Receptionist';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    { id: 'info-we-collect', title: '1. Information We Collect' },
    { id: 'how-we-use', title: '2. How We Use Information' },
    { id: 'no-data-selling', title: '3. We Do Not Sell Personal Information' },
    { id: 'voice-data', title: '4. How Voice Data Is Handled' },
    { id: 'service-providers', title: '5. Third-Party Service Providers' },
    { id: 'retention', title: '6. Data Retention' },
    { id: 'security', title: '7. Security' },
    { id: 'privacy-rights', title: '8. Your Privacy Rights' },
    { id: 'cookies', title: '9. Cookies & Tracking' },
    { id: 'children', title: "10. Children's Privacy" },
    { id: 'international', title: '11. International Data Transfers' },
    { id: 'changes', title: '12. Changes to This Policy' },
    { id: 'contact', title: '13. Contact Us' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="privacy-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Privacy Policy</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="container" style={{ maxWidth: '1080px', paddingTop: '56px', paddingBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: 'var(--accent-emerald)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <Shield size={16} />
          <span>LEGAL & PRIVACY DISCLOSURE</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: '12px'
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Last Updated: <strong>September 16, 2026</strong>
        </p>

        {/* Legal Advisory Note */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          marginBottom: '40px'
        }}>
          <AlertTriangle size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            <strong>Important Notice:</strong> This is a website-ready starting template, not a substitute for review by a lawyer familiar with the jurisdictions where you operate. Your actual vendors, retention periods, recording settings and data flows need to match the final policy.
          </p>
        </div>

        {/* Introduction */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 32px',
          marginBottom: '48px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
            Agent Pettra ("Pettra," "we," "us," or "our") provides AI-powered receptionist and conversational voice services for businesses.
            This Privacy Policy explains how we collect, use, disclose and protect information when you visit our website, use our services, interact with Pettra, or otherwise communicate with us.
          </p>
        </div>

        {/* Layout: Sidebar ToC + Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px', alignItems: 'flex-start' }} className="policy-layout">
          {/* Quick Nav Sidebar */}
          <nav 
            style={{
              position: 'sticky',
              top: '90px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
            aria-label="Table of Contents"
            className="policy-toc"
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              On this page
            </div>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-blue)';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                {s.title}
              </button>
            ))}
          </nav>

          {/* Policy Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* Section 1 */}
            <section id="info-we-collect">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                1. Information We Collect
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>
                Depending on how you interact with Pettra, we may collect:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Information You Provide
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>This may include:</p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <li>Name and business contact details</li>
                    <li>Business name and industry information</li>
                    <li>Email address and phone number</li>
                    <li>Account information and credentials</li>
                    <li>Billing and transaction information</li>
                    <li>Appointment preferences, calendar links, and availability details</li>
                    <li>Information you provide during spoken or typed conversations with Pettra</li>
                    <li>Information submitted through demo forms or inquiry forms</li>
                    <li>Customer support communications and inquiries</li>
                  </ul>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Voice and Conversation Information
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    When you interact with a Pettra-powered phone system, the system may process:
                  </p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <li>Your voice audio and acoustic features</li>
                    <li>Spoken conversation content</li>
                    <li>Machine-generated transcriptions</li>
                    <li>Call metadata (caller ID, time stamps, routing information)</li>
                    <li>Phone numbers and carrier routing paths</li>
                    <li>Call duration and connection quality metrics</li>
                    <li>Appointment information requested or confirmed</li>
                    <li>Information you voluntarily provide during the conversation</li>
                  </ul>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '12px', fontStyle: 'italic' }}>
                    Whether calls are recorded or stored depends on the specific configuration chosen by the applicable business using the Pettra service.
                  </p>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Technical Information
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    When you visit our website, we may automatically collect technical telemetry such as:
                  </p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <li>IP address and approximate geographic location derived from IP</li>
                    <li>Browser type and software version</li>
                    <li>Device model and operating system</li>
                    <li>Pages visited, session duration, and navigation paths</li>
                    <li>Referring website and campaign attribution parameters (UTMs)</li>
                    <li>Website interaction events and clickstream data</li>
                    <li>Essential cookies and performance measurement technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="how-we-use">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                2. How We Use Information
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                We may use collected information to:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                <li>Provide and operate the Pettra AI receptionist platform</li>
                <li>Answer incoming calls and process natural voice dialogue</li>
                <li>Facilitate automated appointment scheduling with calendar integrations</li>
                <li>Provide responsive customer support and onboarding assistance</li>
                <li>Maintain customer accounts, billing records, and subscriptions</li>
                <li>Process payments and fulfill transactional invoices</li>
                <li>Improve telephony reliability, transcription accuracy, and latency performance</li>
                <li>Detect abuse, fraudulent activity, and security threats</li>
                <li>Troubleshoot technical issues and network connection drops</li>
                <li>Communicate critical service updates and configuration notices</li>
                <li>Comply with applicable legal obligations and statutory reporting requirements</li>
              </ul>
              <div style={{ background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-blue)', padding: '14px 18px', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                  We do not use customer information for purposes that are incompatible with the purposes described in this Privacy Policy without appropriate notice or authorization where required.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="no-data-selling">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                3. We Do Not Sell Personal Information
              </h2>
              <div style={{
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '10px' }}>
                  No Sale of Personal Information
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6, marginBottom: '10px' }}>
                  We do not sell personal information for monetary consideration.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  We also do not provide customer conversation data to advertisers for their independent advertising purposes.
                </p>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                If our practices change, we will update this Privacy Policy and provide any notices or choices required by applicable law.
              </p>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Privacy representations made by Pettra are intended to accurately describe our actual data practices in alignment with FTC guidance.
                </span>
                <a 
                  href="https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/01/ai-companies-uphold-your-privacy-confidentiality-commitments" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}
                >
                  <span>FTC Guidance Reference</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </section>

            {/* Section 4 */}
            <section id="voice-data">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                4. How Voice Data Is Handled
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                Pettra may process voice and conversation information to provide its services. Depending on the customer's configuration, information may be processed by technology providers that support:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {['Voice processing', 'Speech-to-text', 'Text-to-speech', 'AI language processing', 'Telephony carrier routing', 'Calendar integrations', 'Cloud infrastructure'].map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px 16px', fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    • {item}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                We use service providers that process information on our behalf where necessary to operate the service under strict confidentiality terms.
              </p>
            </section>

            {/* Section 5 */}
            <section id="service-providers">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                5. Third-Party Service Providers
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                Pettra may use third-party infrastructure and service providers to operate its platform. Depending on your configuration, these may include providers for:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <li>Cloud hosting & edge computing infrastructure</li>
                <li>Telephony routing and SIP trunking</li>
                <li>Voice AI & neural audio synthesis</li>
                <li>Speech recognition & audio transcription</li>
                <li>AI language models & conversational intelligence</li>
                <li>Secure payment processors and subscription billing</li>
                <li>Authentication and access management</li>
                <li>Telemetry, error reporting, and performance analytics</li>
                <li>Calendar integrations (Google Calendar, Microsoft Outlook)</li>
                <li>Customer support ticket systems</li>
              </ul>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                These providers may process information only as necessary to provide their services to us or as otherwise permitted by applicable agreements and law.
              </p>
            </section>

            {/* Section 6 */}
            <section id="retention">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                6. Data Retention
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                We retain information only for as long as reasonably necessary for the purposes described in this policy, including providing the service, maintaining business records, resolving disputes, enforcing agreements and meeting legal obligations.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Retention periods may vary depending on the type of information and the customer's configuration. For example, call recordings, transcripts and logs may have different retention periods based on customer account settings.
              </p>
            </section>

            {/* Section 7 */}
            <section id="security">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                7. Security
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '16px' }}>
                We use reasonable technical and organizational measures designed to protect information against unauthorized access, loss, misuse or disclosure. These measures may include:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  'Encryption in transit (TLS 1.3 / SRTP)',
                  'Role-based access controls (RBAC)',
                  'Multi-factor authentication controls',
                  'Secure cloud infrastructure isolation',
                  'Comprehensive logging and monitoring',
                  'Least-privilege operational access',
                  'Automated backup and disaster recovery'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px 16px' }}>
                    <Lock size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No internet-based service can guarantee absolute security. Users are encouraged to maintain secure credentials and operational safeguards.
              </p>
            </section>

            {/* Section 8 */}
            <section id="privacy-rights">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                8. Your Privacy Rights
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                Depending on where you live and applicable law, you may have rights regarding your personal information. These may include rights to:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                <li>Know what personal information is collected and processed</li>
                <li>Request access to copies of your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Opt out of certain types of sale or sharing of personal information</li>
                <li>Limit certain uses and disclosures of sensitive personal information</li>
                <li>Receive information about how your data is used and shared</li>
              </ul>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  For example, California residents may have rights under the California Consumer Privacy Act (CCPA), including rights to know, delete, correct, and opt out of certain sale or sharing activities, subject to applicable statutory exceptions.
                </p>
                <div style={{ marginTop: '12px' }}>
                  <a 
                    href="https://www.oag.ca.gov/privacy/ccpa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    <span>California Attorney General CCPA Information</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  To submit a privacy request, please contact: <a href="mailto:privacy@agentpettra.com" style={{ color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none' }}>privacy@agentpettra.com</a>
                </span>
              </div>
            </section>

            {/* Section 9 */}
            <section id="cookies">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                9. Cookies & Tracking
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                Our website may use cookies and similar technologies to:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <li>Keep the website functioning properly and securely</li>
                <li>Understand website traffic and feature usage patterns</li>
                <li>Improve site performance and response speeds</li>
                <li>Measure marketing campaigns and attribution parameters</li>
                <li>Remember user preferences (such as light or dark theme mode)</li>
              </ul>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                You may be able to control or block cookies through your browser settings, though certain website features may not function optimally without essential cookies.
              </p>
            </section>

            {/* Section 10 */}
            <section id="children">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                10. Children's Privacy
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Pettra is intended for businesses and general adult audiences and is not directed toward children. We do not knowingly collect personal information from children in violation of applicable law. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            {/* Section 11 */}
            <section id="international">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                11. International Data Transfers
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Depending on the location of our infrastructure and service providers, information may be processed in countries other than your own. Where required by applicable law, we use appropriate safeguards for international data transfers, such as standard contractual clauses.
              </p>
            </section>

            {/* Section 12 */}
            <section id="changes">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                12. Changes to This Policy
              </h2>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this document and, where required by applicable law, provide additional notice or obtain consent.
              </p>
            </section>

            {/* Section 13 */}
            <section id="contact">
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                13. Contact Us
              </h2>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Agent Pettra Privacy Office
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} style={{ color: 'var(--accent-blue)' }} />
                    <span>Email: <a href="mailto:privacy@agentpettra.com" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>privacy@agentpettra.com</a></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-blue)', marginTop: '3px' }} />
                    <span>Agent Pettra Technologies Inc.<br />100 Pine Street, Suite 1250<br />San Francisco, CA 94111, USA</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .policy-layout {
            grid-template-columns: 1fr !important;
          }
          .policy-toc {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

import React, { useEffect } from 'react';
import { FileText, AlertCircle, ShieldAlert, PhoneOff, Mail, MapPin } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | Agent Pettra AI Receptionist';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    { id: 'about', title: '1. About Pettra' },
    { id: 'eligibility', title: '2. Eligibility' },
    { id: 'account', title: '3. Your Account' },
    { id: 'using-pettra', title: '4. Using Pettra' },
    { id: 'customer-responsibilities', title: '5. Customer Responsibilities' },
    { id: 'ai-conversations', title: '6. AI-Generated Conversations' },
    { id: 'no-professional-advice', title: '7. No Professional Advice' },
    { id: 'scheduling', title: '8. Appointment Scheduling' },
    { id: 'telephony', title: '9. Telephony' },
    { id: 'third-party', title: '10. AI and Third-Party Services' },
    { id: 'billing', title: '11. Fees and Billing' },
    { id: 'cancellation', title: '12. Cancellation' },
    { id: 'intellectual-property', title: '13. Intellectual Property' },
    { id: 'confidentiality', title: '14. Confidentiality' },
    { id: 'availability', title: '15. Service Availability' },
    { id: 'liability', title: '16. Limitation of Liability' },
    { id: 'indemnification', title: '17. Indemnification' },
    { id: 'termination', title: '18. Termination' },
    { id: 'changes', title: '19. Changes to These Terms' },
    { id: 'governing-law', title: '20. Governing Law' },
    { id: 'contact', title: '21. Contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="terms-page" style={{ paddingBottom: '96px' }}>
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
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Terms of Service</span>
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
          background: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          color: 'var(--accent-blue)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '16px'
        }}>
          <FileText size={16} />
          <span>LEGAL AGREEMENT</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: '12px'
        }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          Last Updated: <strong>September 16, 2026</strong>
        </p>

        {/* Preamble Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          marginBottom: '48px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
            These Terms of Service ("Terms") govern your access to and use of Agent Pettra's website, software, AI receptionist services and related products.
            By accessing or using Pettra, you agree to these Terms.
          </p>
        </div>

        {/* Layout: Sidebar ToC + Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px', alignItems: 'flex-start' }} className="terms-layout">
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
              gap: '6px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto'
            }}
            aria-label="Table of Contents"
            className="terms-toc"
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Terms Navigation
            </div>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '5px 8px',
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

          {/* Terms Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* 1. About Pettra */}
            <section id="about">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                1. About Pettra
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Agent Pettra provides AI-powered receptionist, voice communication, appointment and related business automation services. Pettra may answer calls, communicate with callers, provide information based on customer-provided configuration and perform supported actions such as appointment scheduling.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                2. Eligibility
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                You must have the legal capacity to enter into these Terms. If you are using Pettra on behalf of a business or organization, you represent that you have authority to bind that organization to these Terms.
              </p>
            </section>

            {/* 3. Your Account */}
            <section id="account">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                3. Your Account
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                You are responsible for:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <li>Maintaining accurate account and contact information</li>
                <li>Protecting your login credentials and administrative access tokens</li>
                <li>Managing authorized team members and user permissions</li>
                <li>Configuring your Pettra account and knowledge base appropriately</li>
                <li>Reviewing call logs and activity associated with your account</li>
              </ul>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                You are responsible for all activity conducted through your account.
              </p>
            </section>

            {/* 4. Using Pettra */}
            <section id="using-pettra">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                4. Using Pettra
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                You agree to use Pettra only for lawful business purposes. You must not use Pettra to:
              </p>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px 22px' }}>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <li>Conduct fraud or deceptive commercial practices</li>
                  <li>Impersonate individuals unlawfully</li>
                  <li>Harass, abuse, or threaten people</li>
                  <li>Conduct unlawful surveillance or unauthorized call recording</li>
                  <li>Make prohibited robocalls, spam calls, or telemarketing solicitations</li>
                  <li>Circumvent telecommunications regulations or carrier filtering</li>
                  <li>Collect personal information unlawfully</li>
                  <li>Facilitate any unlawful or illegal activity</li>
                  <li>Upload malicious code, exploits, or viruses</li>
                  <li>Abuse, overload, or stress-test the service infrastructure</li>
                </ul>
              </div>
            </section>

            {/* 5. Customer Responsibilities */}
            <section id="customer-responsibilities">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                5. Customer Responsibilities
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '12px' }}>
                The business using Pettra is responsible for configuring the system appropriately. This includes ensuring that:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <li>Business information provided to Pettra is accurate and up to date</li>
                <li>Appointment availability and calendar sync settings are accurate</li>
                <li>Call scripts, prompts, and instructions are appropriate for callers</li>
                <li>Required notices (including call-recording notices) are provided to callers</li>
                <li>Required consents are obtained under applicable federal and state laws</li>
                <li>The service is used in full compliance with applicable local and national laws</li>
              </ul>
            </section>

            {/* 6. AI-Generated Conversations */}
            <section id="ai-conversations">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                6. AI-Generated Conversations
              </h2>
              <div style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 22px',
                marginBottom: '14px'
              }}>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-primary)', lineHeight: 1.65, margin: 0 }}>
                  Pettra uses artificial intelligence to communicate with callers. Pettra's responses may occasionally be inaccurate, incomplete or inappropriate. Pettra should not be treated as a human employee or as a substitute for professional advice.
                </p>
              </div>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Businesses should configure escalation and human handoff procedures appropriate to their industry to ensure seamless resolution of complex or sensitive caller inquiries.
              </p>
            </section>

            {/* 7. No Professional Advice */}
            <section id="no-professional-advice">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                7. No Professional Advice
              </h2>
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start'
              }}>
                <ShieldAlert size={22} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Important Disclaimer on Professional Advice & Emergency Services
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '10px' }}>
                    Unless explicitly stated otherwise in a separate written agreement, Pettra does not provide professional:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {['Medical advice', 'Legal advice', 'Financial advice', 'Emergency services', 'Mental health advice'].map((t, idx) => (
                      <span key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        ✕ {t}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--accent-rose)', fontWeight: 700, margin: 0 }}>
                    For emergencies, callers must immediately contact 911 or appropriate local emergency services.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Appointment Scheduling */}
            <section id="scheduling">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                8. Appointment Scheduling
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Where appointment scheduling is enabled, Pettra may communicate with a connected calendar or scheduling system. Pettra does not guarantee that an appointment will be successfully booked in every situation. Businesses remain responsible for maintaining accurate calendars, slot availability, and appointment policies.
              </p>
            </section>

            {/* 9. Telephony */}
            <section id="telephony">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                9. Telephony
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Pettra may rely on third-party telecommunications providers for phone numbers, call routing, and SIP trunking. Phone numbers, carrier availability, call quality and connectivity may be affected by telecommunication network factors outside Pettra's control.
              </p>
            </section>

            {/* 10. AI and Third-Party Services */}
            <section id="third-party">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                10. AI and Third-Party Services
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Pettra may use third-party technologies to provide voice synthesis, AI language processing, telecommunications, cloud infrastructure, payment and other services. The availability and functionality of certain features may depend on those providers.
              </p>
            </section>

            {/* 11. Fees and Billing */}
            <section id="billing">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                11. Fees and Billing
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '10px' }}>
                Paid plans are billed according to the pricing plan selected during signup. Plans may include usage limits such as:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <li>Included voice minutes per billing period</li>
                <li>Assigned phone numbers</li>
                <li>Concurrent call channels</li>
                <li>AI processing quota</li>
                <li>Other platform resources</li>
              </ul>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Additional usage beyond plan allowances may incur overage charges where explicitly stated in the applicable pricing plan.
              </p>
            </section>

            {/* 12. Cancellation */}
            <section id="cancellation">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                12. Cancellation
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                You may cancel your subscription at any time according to the cancellation process provided within your account dashboard or by contacting support. Unless otherwise stated, cancellation does not automatically entitle you to a refund for previously charged subscription periods.
              </p>
            </section>

            {/* 13. Intellectual Property */}
            <section id="intellectual-property">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                13. Intellectual Property
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '10px' }}>
                Pettra and its underlying software, branding, designs, technology and content are owned by or licensed to us. These Terms do not transfer ownership of Pettra's intellectual property to you.
              </p>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                You retain ownership of content and business information you provide to Pettra, subject to the limited rights necessary for us to provide and maintain the service.
              </p>
            </section>

            {/* 14. Confidentiality */}
            <section id="confidentiality">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                14. Confidentiality
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Each party agrees to protect confidential information received from the other party and use it only as necessary to perform its obligations under these Terms.
              </p>
            </section>

            {/* 15. Service Availability */}
            <section id="availability">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                15. Service Availability
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '10px' }}>
                We aim to keep Pettra available and reliable with high uptime, but we do not guarantee uninterrupted service. Service availability may be affected by:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <li>Internet connectivity issues</li>
                <li>Telecommunications provider outages</li>
                <li>Cloud infrastructure disruptions</li>
                <li>Third-party AI provider latency or outages</li>
                <li>Scheduled maintenance and system updates</li>
                <li>Security incidents and emergency countermeasures</li>
                <li>Events outside our reasonable control (force majeure)</li>
              </ul>
            </section>

            {/* 16. Limitation of Liability */}
            <section id="liability">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                16. Limitation of Liability
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                To the maximum extent permitted by applicable law, Pettra and its providers will not be liable for indirect, incidental, special, consequential or punitive damages arising from your use of the service.
              </p>
            </section>

            {/* 17. Indemnification */}
            <section id="indemnification">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                17. Indemnification
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                You agree to defend and indemnify Pettra and its affiliates, officers, employees and service providers against claims, liabilities, and expenses arising from your misuse of the service, violation of these Terms, or violation of applicable laws or third-party rights.
              </p>
            </section>

            {/* 18. Termination */}
            <section id="termination">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                18. Termination
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                We may suspend or terminate accounts that violate these Terms, create security risks, engage in unlawful activity or otherwise materially abuse the service.
              </p>
            </section>

            {/* 19. Changes to These Terms */}
            <section id="changes">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                19. Changes to These Terms
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                We may update these Terms from time to time. Continued use of the service after an update becomes effective constitutes acceptance of the revised Terms to the extent permitted by law.
              </p>
            </section>

            {/* 20. Governing Law */}
            <section id="governing-law">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                20. Governing Law
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                These Terms will be governed by the laws of the State of Delaware, United States, without regard to conflict-of-law principles.
              </p>
            </section>

            {/* 21. Contact */}
            <section id="contact">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                21. Contact
              </h2>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  Agent Pettra Legal Department
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} style={{ color: 'var(--accent-blue)' }} />
                    <span>Email: <a href="mailto:legal@agentpettra.com" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>legal@agentpettra.com</a></span>
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
          .terms-layout {
            grid-template-columns: 1fr !important;
          }
          .terms-toc {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

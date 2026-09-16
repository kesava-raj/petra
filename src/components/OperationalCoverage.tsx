import React from 'react';
import { 
  PhoneCall, 
  Code2, 
  HeartHandshake, 
  BarChart3, 
  Check, 
  Sparkles 
} from 'lucide-react';

export const OperationalCoverage: React.FC = () => {
  const cards = [
    {
      tag: 'FRONT LINE',
      title: 'Answer calls and resolve intent fast',
      description: 'Pick up instantly, understand what the caller needs, and move the conversation into the right path.',
      icon: PhoneCall,
      iconColor: '#60A5FA',
      bullets: [
        'Handles inbound and overflow call volume',
        'Provides 24/7 multilingual coverage',
        'Captures missed calls into callback flows',
        'Can run outbound campaigns and follow-ups'
      ],
      commonUses: ['Support', 'Lead intake', 'Appointments']
    },
    {
      tag: 'ACTION',
      title: 'Do the work inside your stack',
      description: 'Agent Pettra does not just explain. It can look things up, create records, and move the task forward.',
      icon: Code2,
      iconColor: '#818CF8',
      bullets: [
        'Works from knowledge sources, SOPs, and workflow logic',
        'Connects to CRM, calendar, ticketing, webhooks, and databases',
        'Handles booking, order status, and case-creation actions',
        'Can trigger payments and identity-verification flows'
      ],
      commonUses: ['CRM', 'Calendar', 'Ticketing']
    },
    {
      tag: 'CONTROL',
      title: 'Hand off to humans without losing context',
      description: 'Keep people in the loop, preserve context, and stay inside the boundaries you define.',
      icon: HeartHandshake,
      iconColor: '#F472B6',
      bullets: [
        'Warm transfer with clean summaries',
        'Skill-based routing and direct transfers',
        'Guardrails and approval boundaries',
        'Branded voice, persona, and multi-agent setups'
      ],
      commonUses: ['Warm transfer', 'Guardrails', 'Brand voice']
    },
    {
      tag: 'VISIBILITY',
      title: 'Make every conversation measurable',
      description: 'See what happened, review quality, and improve the operation over time.',
      icon: BarChart3,
      iconColor: '#34D399',
      bullets: [
        'Transcripts, recordings, and automatic summaries',
        'Sentiment, QA, and performance metrics',
        'Dashboards and ROI visibility',
        'Data collection for testing and optimization'
      ],
      commonUses: ['Summaries', 'QA', 'ROI']
    }
  ];

  return (
    <section className="section-padding op-coverage-section" id="operational-coverage" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Neon Ray Flare Background */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1200px',
          height: '650px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.18) 0%, rgba(56, 189, 248, 0.1) 35%, rgba(168, 85, 247, 0.05) 55%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '820px', margin: '0 auto 56px auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} />
            <span>OPERATIONAL COVERAGE</span>
          </div>

          <h2 className="op-coverage-headline">
            Agent Pettra does not just talk.<br />
            <span className="op-gradient-text">It runs the operation.</span>
          </h2>

          <p className="section-subtitle" style={{ maxWidth: '660px', margin: '0 auto' }}>
            From answering the line to updating a record, booking a slot, or handing off safely, it keeps the work moving during the call.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="op-coverage-grid">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div key={idx} className="op-coverage-card">
                {/* Header: Round Icon + Tag Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div className="op-card-circle-icon">
                    <IconComponent size={20} color={card.iconColor} />
                  </div>
                  <span className="op-tag-badge">
                    {card.tag}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="op-card-main-title">
                  {card.title}
                </h3>
                <p className="op-card-sub-desc">
                  {card.description}
                </p>

                {/* Bullet Points */}
                <ul className="op-checklist" style={{ listStyle: 'none', padding: 0, margin: '22px 0 28px 0' }}>
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <Check size={16} color="#34D399" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span className="op-bullet-text">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Common Uses Footer */}
                <div className="op-common-uses-box">
                  <span className="op-common-uses-label">
                    COMMON USES
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {card.commonUses.map((use, uIdx) => (
                      <span key={uIdx} className="op-use-pill">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Scope Note */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            fontWeight: 500,
            margin: 0
          }}>
            Capabilities are configured around your use case, integrations, and rollout scope.
          </p>
        </div>
      </div>

      <style>{`
        .op-coverage-section {
          background: var(--bg-darkest);
        }

        .op-coverage-headline {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 850;
          color: #FFFFFF;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        [data-theme="light"] .op-coverage-headline,
        :root:not([data-theme="dark"]) .op-coverage-headline {
          color: #0F172A;
        }

        .op-gradient-text {
          background: linear-gradient(135deg, #38BDF8 0%, #34D399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        [data-theme="light"] .op-gradient-text,
        :root:not([data-theme="dark"]) .op-gradient-text {
          background: none !important;
          -webkit-background-clip: initial !important;
          -webkit-text-fill-color: #0F172A !important;
          color: #0F172A !important;
        }

        .op-coverage-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 1160px;
          margin: 0 auto;
        }

        .op-coverage-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 36px 32px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.45);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
        }

        [data-theme="light"] .op-coverage-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);
        }

        .op-coverage-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .op-coverage-card:hover {
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
        }

        .op-card-circle-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        [data-theme="light"] .op-card-circle-icon {
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.15);
        }

        .op-tag-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 4px 12px;
          color: #94A3B8;
        }

        [data-theme="light"] .op-tag-badge {
          background: rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(15, 23, 42, 0.1);
          color: #475569;
        }

        .op-card-main-title {
          font-size: clamp(1.25rem, 2.5vw, 1.45rem);
          font-weight: 750;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          line-height: 1.25;
        }

        [data-theme="light"] .op-card-main-title {
          color: #0F172A;
        }

        .op-card-sub-desc {
          font-size: 0.94rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        [data-theme="light"] .op-card-sub-desc {
          color: #475569;
        }

        .op-bullet-text {
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.5;
        }

        [data-theme="light"] .op-bullet-text {
          color: #334155;
        }

        .op-common-uses-box {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        [data-theme="light"] .op-common-uses-box {
          border-top: 1px solid rgba(15, 23, 42, 0.07);
        }

        .op-common-uses-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 10px;
        }

        [data-theme="light"] .op-common-uses-label {
          color: #94A3B8;
        }

        .op-use-pill {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          padding: 5px 14px;
          border-radius: 20px;
          transition: background 0.2s ease;
        }

        [data-theme="light"] .op-use-pill {
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.1);
          color: #1E293B;
        }

        @media (max-width: 900px) {
          .op-coverage-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .op-coverage-card {
            padding: 28px 24px;
          }
        }
      `}</style>
    </section>
  );
};

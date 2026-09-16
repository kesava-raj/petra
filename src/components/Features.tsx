import React from 'react';
import { 
  Rocket, 
  Network, 
  Zap, 
  Brain, 
  Mic, 
  Globe, 
  ShieldCheck,
  Sparkles 
} from 'lucide-react';

export const Features: React.FC = () => {
  const subFeatures = [
    {
      title: 'End-to-End Resolution',
      description: 'Move from answering to completing the job: route, book, qualify, verify, collect, and update systems.',
      icon: Network,
      iconColor: '#A5B4FC'
    },
    {
      title: 'Integrations & Live Actions',
      description: 'Trigger APIs, CRM updates, scheduling flows, database lookups, and downstream actions during the call.',
      icon: Zap,
      iconColor: '#93C5FD'
    },
    {
      title: 'Context-Aware Handoffs',
      description: 'When a human is needed, Agent Pettra transfers with the right context so the caller does not have to repeat everything.',
      icon: Brain,
      iconColor: '#C084FC'
    },
    {
      title: 'Natural Voice & Persona',
      description: 'Use brand-fit voices, cloned voices, and industry-appropriate speaking styles without sounding robotic.',
      icon: Mic,
      iconColor: '#F472B6'
    },
    {
      title: 'Multilingual by Design',
      description: 'Handle multilingual conversations, accents, and region-specific flows in one operational layer.',
      icon: Globe,
      iconColor: '#34D399'
    },
    {
      title: 'Private, Controlled Deployment',
      description: 'Choose public cloud, private cloud, or dedicated setups with governance, access control, and audit visibility.',
      icon: ShieldCheck,
      iconColor: '#FBBF24'
    }
  ];

  return (
    <section className="section-padding operational-capabilities-section" id="features" style={{ position: 'relative' }}>
      {/* Subtle Purple / Cyan Ambient Glow in Background */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          maxWidth: '1000px',
          height: '420px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.06) 45%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>OPERATIONAL CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            Built for Real-World Operations.
          </h2>
          <p className="section-subtitle">
            From answering the line to updating records, booking slots, or handing off safely, Agent Pettra keeps the work moving during every call.
          </p>
        </div>

        {/* Feature Container Grid */}
        <div className="op-capabilities-wrapper">
          {/* Top Full-Width Hero Card: 48-Hour Launch */}
          <div className="op-launch-card">
            <div className="op-launch-icon-box">
              <Rocket size={26} color="#FBBF24" />
            </div>

            <div className="op-launch-content">
              <h3 className="op-launch-title">
                48-Hour Launch
              </h3>
              <p className="op-launch-desc">
                Go live fast with a production-ready setup tailored to your workflows, routing logic, and call goals.
              </p>
            </div>

            {/* Decorative background lines mimicking the reference aesthetic */}
            <div className="op-launch-deco-lines" aria-hidden="true">
              <div className="op-deco-line line-1" />
              <div className="op-deco-line line-2" />
            </div>
          </div>

          {/* 6 Sub-Cards Grid (3 Columns x 2 Rows) */}
          <div className="op-grid">
            {subFeatures.map((feature, index) => {
              const IconComp = feature.icon;
              return (
                <div key={index} className="op-card">
                  <div className="op-card-icon-box">
                    <IconComp size={22} color={feature.iconColor} />
                  </div>

                  <h4 className="op-card-title">
                    {feature.title}
                  </h4>

                  <p className="op-card-desc">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .operational-capabilities-section {
          background: var(--bg-darkest);
        }

        .op-capabilities-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 1140px;
          margin: 0 auto;
        }

        /* Top 48-Hour Launch Card */
        .op-launch-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 28px 36px;
          border-radius: 22px;
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        [data-theme="light"] .op-launch-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
        }

        .op-launch-card:hover {
          border-color: rgba(99, 102, 241, 0.35);
          transform: translateY(-2px);
        }

        .op-launch-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(99, 102, 241, 0.16);
          border: 1px solid rgba(129, 140, 248, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
        }

        [data-theme="light"] .op-launch-icon-box {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
        }

        .op-launch-content {
          position: relative;
          z-index: 2;
          max-width: 680px;
        }

        .op-launch-title {
          font-size: clamp(1.35rem, 2.5vw, 1.65rem);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        [data-theme="light"] .op-launch-title {
          color: #0F172A;
        }

        .op-launch-desc {
          font-size: 0.96rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        [data-theme="light"] .op-launch-desc {
          color: #475569;
        }

        .op-launch-deco-lines {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0.3;
          pointer-events: none;
        }

        .op-deco-line {
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.8), transparent);
        }
        .line-1 { width: 120px; }
        .line-2 { width: 80px; margin-left: 40px; }

        /* 3-Column Grid */
        .op-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .op-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px 28px;
          border-radius: 22px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
        }

        [data-theme="light"] .op-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }

        .op-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .op-card:hover {
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
        }

        .op-card-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.14);
          border: 1px solid rgba(129, 140, 248, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .op-card-icon-box {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
        }

        .op-card-title {
          font-size: 1.25rem;
          font-weight: 750;
          color: #FFFFFF;
          letter-spacing: -0.015em;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        [data-theme="light"] .op-card-title {
          color: #0F172A;
        }

        .op-card-desc {
          font-size: 0.93rem;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0;
        }

        [data-theme="light"] .op-card-desc {
          color: #475569;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .op-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
          .op-launch-deco-lines {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .op-launch-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px 20px;
            gap: 16px;
          }
          .op-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .op-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
};


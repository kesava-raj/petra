import React, { useState } from 'react';
import { 
  Smile, 
  Scissors, 
  Stethoscope, 
  Scale, 
  Home, 
  Wrench, 
  PlusCircle, 
  Sparkles,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface IndustrySectionProps {
  onOpenDemo: () => void;
}

export const IndustrySection: React.FC<IndustrySectionProps> = ({ onOpenDemo }) => {
  const industries = [
    {
      id: 'dental',
      name: 'Dental Clinics',
      icon: Smile,
      color: '#3B82F6',
      headline: 'Keep your chairs filled and patients cared for.',
      description: 'Help patients request appointments and get answers without tying up the front desk.',
      exampleQuestion: '"Do you take Delta Dental, and can I book a cleaning on Friday?"',
      petraResponse: '"Yes, we accept Delta Dental! I can reserve Friday at 10:00 AM for your cleaning."'
    },
    {
      id: 'salon',
      name: 'Salons & Spas',
      icon: Scissors,
      color: '#EC4899',
      headline: 'Never lose a client while your hands are busy.',
      description: "Let customers book while you're busy with another client in the chair.",
      exampleQuestion: '"Can I get a blowout and color treatment this Saturday afternoon?"',
      petraResponse: '"We have an opening with Jessica this Saturday at 2:00 PM for your blowout and color."'
    },
    {
      id: 'medical',
      name: 'Medical Practices',
      icon: Stethoscope,
      color: '#10B981',
      headline: 'Reliable patient intake and routine scheduling.',
      description: 'Handle appointment requests and common questions throughout the day with poise.',
      exampleQuestion: '"I need a follow-up consultation with Dr. Miller next Tuesday."',
      petraResponse: '"Dr. Miller has 11:30 AM and 3:15 PM open next Tuesday. Which fits your schedule?"'
    },
    {
      id: 'legal',
      name: 'Legal Practices',
      icon: Scale,
      color: '#6366F1',
      headline: 'Capture high-value case inquiries instantly.',
      description: 'Capture new inquiries and collect crucial details when your team is in court or unavailable.',
      exampleQuestion: '"I need to speak with an attorney about a commercial contract dispute."',
      petraResponse: '"I can arrange an initial 30-minute consultation with our litigation partner tomorrow at 1:00 PM."'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: Home,
      color: '#F59E0B',
      headline: 'Engage active buyers and renters immediately.',
      description: 'Respond to incoming inquiries and collect important buyer information without delay.',
      exampleQuestion: '"I saw the listing on Elm Street and want to schedule a walkthrough."',
      petraResponse: '"That property is currently showing! I can schedule your private walkthrough for Wednesday at 4:30 PM."'
    },
    {
      id: 'home-services',
      name: 'Home Services',
      icon: Wrench,
      color: '#06B6D4',
      headline: 'Book dispatch jobs while out in the field.',
      description: 'Help customers request appointments and emergency estimates without waiting for a callback.',
      exampleQuestion: '"My AC stopped working, do you have any technician slots available today?"',
      petraResponse: '"We have an emergency diagnostic window between 2:00 PM and 4:00 PM today. Shall I dispatch?"'
    }
  ];

  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeIndustry = industries.find((i) => i.id === activeTab) || industries[0];
  const Icon = activeIndustry.icon;

  return (
    <section className="section-padding industry-section" id="industries" style={{ position: 'relative' }}>
      <style>{`
        .industry-section {
          background: var(--bg-darkest);
        }
        .industry-tabs-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 40px;
        }
        .industry-tab-pill {
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9375rem;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          user-select: none;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          box-shadow: var(--shadow-sm);
        }
        .industry-tab-pill:hover {
          color: var(--text-primary);
          border-color: var(--accent-blue);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .industry-tab-pill.selected {
          background: rgba(37, 99, 235, 0.12) !important;
          border: 2px solid var(--accent-blue) !important;
          color: var(--accent-blue) !important;
          box-shadow: 0 4px 16px var(--accent-blue-glow) !important;
        }
        [data-theme="dark"] .industry-tab-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94A3B8;
        }
        [data-theme="dark"] .industry-tab-pill.selected {
          background: rgba(59, 130, 246, 0.22) !important;
          border-color: #3B82F6 !important;
          color: #60A5FA !important;
        }
        .industry-showcase-card {
          max-width: 860px;
          margin: 0 auto;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: clamp(20px, 4vw, 44px);
          box-shadow: var(--shadow-lg);
          position: relative;
        }
        .industry-showcase-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: center;
        }
        .industry-preview-panel {
          background: var(--bg-secondary);
          border-radius: 18px;
          border: 1px solid var(--border-subtle);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .industry-preview-caller {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.9rem;
          color: var(--text-primary);
          border-left: 3px solid var(--accent-blue);
          box-shadow: var(--shadow-sm);
        }
        .industry-preview-petra {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.9rem;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }
        [data-theme="dark"] .industry-preview-petra {
          background: rgba(30, 58, 138, 0.3);
          color: #FFFFFF;
        }
        .industry-cta-btn {
          white-space: normal !important;
          text-align: left;
          line-height: 1.3;
        }
        @media (max-width: 900px) {
          .industry-showcase-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 640px) {
          .industry-tabs-container {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
            margin-bottom: 24px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .industry-tabs-container::-webkit-scrollbar {
            display: none;
          }
          .industry-tab-pill {
            padding: 8px 14px !important;
            font-size: 0.85rem !important;
          }
          .industry-cta-btn {
            width: 100% !important;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>INDUSTRY TAILORED</span>
          </div>
          <h2 className="section-title">
            One receptionist. Many businesses.
          </h2>
          <p className="section-subtitle">
            Whether you run a private clinic, a luxury salon, or a multi-location practice, 
            Petra adapts to your exact business vocabulary and booking rules.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="industry-tabs-container">
          {industries.map((ind) => {
            const TabIcon = ind.icon;
            const isSelected = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveTab(ind.id);
                  trackEvent('page_view', { industry_tab_selected: ind.id });
                }}
                className={`industry-tab-pill ${isSelected ? 'selected' : ''}`}
                aria-pressed={isSelected}
              >
                <TabIcon size={16} color={isSelected ? ind.color : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div 
          className="industry-showcase-card"
          style={{
            border: `1px solid ${activeIndustry.color}50`,
            boxShadow: `var(--shadow-lg), 0 0 35px ${activeIndustry.color}15`
          }}
        >
          <div className="industry-showcase-grid">
            {/* Left: Info */}
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: `${activeIndustry.color}20`,
                border: `1px solid ${activeIndustry.color}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeIndustry.color,
                marginBottom: '20px'
              }}>
                <Icon size={28} />
              </div>

              <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.65rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {activeIndustry.headline}
              </h3>

              <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                {activeIndustry.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Custom business knowledge & intake questions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>Instant slot confirmation with zero hold times</span>
                </div>
              </div>

              <button
                onClick={() => {
                  trackEvent('hero_cta_click', { source: `industry_${activeIndustry.id}` });
                  onOpenDemo();
                }}
                className="btn btn-primary industry-cta-btn"
                style={{ padding: '12px 24px' }}
              >
                <PhoneCall size={16} />
                <span>Talk to Petra for {activeIndustry.name}</span>
              </button>
            </div>

            {/* Right: Real Sample Snippet */}
            <div className="industry-preview-panel">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                LIVE CONVERSATION PREVIEW
              </span>

              {/* Customer Prompt */}
              <div className="industry-preview-caller">
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', display: 'block', fontWeight: 700 }}>Caller:</span>
                {activeIndustry.exampleQuestion}
              </div>

              {/* Petra Reply */}
              <div 
                className="industry-preview-petra"
                style={{ borderLeft: `3px solid ${activeIndustry.color}` }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-indigo)', display: 'block', fontWeight: 700 }}>Petra (AI Receptionist):</span>
                {activeIndustry.petraResponse}
              </div>
            </div>
          </div>
        </div>

        {/* And More Callout */}
        <div style={{
          textAlign: 'center',
          marginTop: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.9375rem'
        }}>
          <PlusCircle size={18} color="var(--accent-blue)" />
          <span>And more: Auto repair, chiropractic, wellness, veterinary, fitness studios, and appointment-based services.</span>
        </div>
      </div>
    </section>
  );
};

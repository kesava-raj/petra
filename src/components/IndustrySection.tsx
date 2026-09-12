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
    <section className="section-padding" id="industries" style={{ position: 'relative' }}>
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px'
        }}>
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
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isSelected ? '#3B82F6' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: isSelected ? '#FFFFFF' : '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <TabIcon size={16} color={isSelected ? ind.color : '#94A3B8'} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${activeIndustry.color}40`,
          borderRadius: '24px',
          padding: 'clamp(24px, 4vw, 44px)',
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 35px ${activeIndustry.color}15`,
          position: 'relative'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}>
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

              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
                {activeIndustry.headline}
              </h3>

              <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '24px' }}>
                {activeIndustry.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>Custom business knowledge & intake questions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>Instant slot confirmation with zero hold times</span>
                </div>
              </div>

              <button
                onClick={() => {
                  trackEvent('hero_cta_click', { source: `industry_${activeIndustry.id}` });
                  onOpenDemo();
                }}
                className="btn btn-primary"
                style={{ padding: '12px 26px' }}
              >
                <PhoneCall size={16} />
                <span>Talk to Petra for {activeIndustry.name}</span>
              </button>
            </div>

            {/* Right: Real Sample Snippet */}
            <div style={{
              background: 'rgba(10, 15, 29, 0.8)',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.05em' }}>
                LIVE CONVERSATION PREVIEW
              </span>

              {/* Customer Prompt */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '0.9rem',
                color: '#E2E8F0',
                borderLeft: '3px solid #3B82F6'
              }}>
                <span style={{ fontSize: '0.7rem', color: '#93C5FD', display: 'block', fontWeight: 600 }}>Caller:</span>
                {activeIndustry.exampleQuestion}
              </div>

              {/* Petra Reply */}
              <div style={{
                background: 'rgba(30, 58, 138, 0.25)',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '0.9rem',
                color: '#FFFFFF',
                borderLeft: `3px solid ${activeIndustry.color}`
              }}>
                <span style={{ fontSize: '0.7rem', color: '#A5B4FC', display: 'block', fontWeight: 600 }}>Petra (AI Receptionist):</span>
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
          color: '#94A3B8',
          fontSize: '0.9375rem'
        }}>
          <PlusCircle size={18} color="#60A5FA" />
          <span>And more: Auto repair, chiropractic, wellness, veterinary, fitness studios, and appointment-based services.</span>
        </div>
      </div>
    </section>
  );
};

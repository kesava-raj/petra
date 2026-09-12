import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const faqs: FAQItem[] = [
    {
      question: "Is Petra a real person?",
      answer: "No. Petra is an AI voice receptionist designed to communicate naturally with callers using conversational intelligence."
    },
    {
      question: "Can Petra book appointments?",
      answer: "Yes, when connected to a supported scheduling or calendar workflow. Petra checks real-time slot availability, books the time, and sends confirmation alerts."
    },
    {
      question: "Can I customize Petra?",
      answer: "Yes. Petra can be configured around your business information, services, pricing policies, FAQs, tone of voice, and custom booking workflows."
    },
    {
      question: "Does Petra work after business hours?",
      answer: "Petra can be available 24/7, allowing your business to answer calls, qualify leads, and schedule appointments beyond normal operating hours."
    },
    {
      question: "Can customers call Petra?",
      answer: "Yes. Petra can operate through a connected business phone number or phone forwarding from your existing office line."
    },
    {
      question: "Can I try Petra before subscribing?",
      answer: "Yes! This landing page provides a live interactive experience so you can talk to Petra and test her voice and booking flow before deciding."
    },
    {
      question: "What happens if Petra cannot handle a request?",
      answer: "Petra follows your configured fallback workflow for situations outside her capabilities — such as taking a detailed callback message, sending an instant SMS summary to your team, or routing to voicemail."
    }
  ];

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="section-padding" id="faq" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div className="section-header">
          <div className="eyebrow">
            <HelpCircle size={14} />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="section-title">
            Questions? Petra has answers.
          </h2>
          <p className="section-subtitle">
            Everything you need to know about setting up and working with your AI receptionist.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  border: isOpen ? '1px solid rgba(59, 130, 246, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    gap: '16px'
                  }}
                >
                  <span>{faq.question}</span>
                  <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: isOpen ? '#60A5FA' : '#94A3B8',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px 24px',
                    color: '#94A3B8',
                    fontSize: '0.96rem',
                    lineHeight: 1.6
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

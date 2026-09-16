import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenDemo?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenDemo }) => {
  const handleStartNow = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      const demoEl = document.getElementById('demo') || document.getElementById('voice-demo');
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const waveHeights = [20, 35, 55, 80, 100, 65, 85, 45, 95, 70, 50, 30, 40, 60, 80, 50, 30, 20, 15, 25, 45, 30, 20];

  return (
    <section className="section-padding hiw-section" id="how-it-works" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Glow */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '1000px',
          height: '500px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.06) 45%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header with Reticle and CTA */}
        <div className="hiw-header">
          {/* Target Reticle Bracket Icon */}
          <div className="hiw-reticle" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M4 12V6C4 4.89543 4.89543 4 6 4H12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 12V6C32 4.89543 31.1046 4 30 4H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M4 24V30C4 31.1046 4.89543 32 6 32H12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 24V30C32 31.1046 31.1046 32 30 32H24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="hiw-main-title">
            How It Works
          </h2>

          <p className="hiw-subtitle">
            Set up your AI assistant in 3 steps.
          </p>

          <button 
            onClick={handleStartNow}
            className="hiw-start-btn"
            id="hiw-start-now-btn"
          >
            <span>START NOW</span>
          </button>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="hiw-cards-grid">
          
          {/* =========================================================
              CARD 01: Pick The Voice
             ========================================================= */}
          <div className="hiw-card">
            <span className="hiw-step-num">01</span>
            <h3 className="hiw-card-title">Pick The Voice</h3>
            <p className="hiw-card-desc">
              Choose a preset voice or upload your own sample to define how Agent Pettra sounds.
            </p>

            {/* Visual: Animated Audio Waveform */}
            <div className="hiw-visual-stage waveform-stage">
              <div className="hiw-waveform-container" aria-label="Audio Waveform Visualization">
                {waveHeights.map((height, i) => (
                  <span
                    key={i}
                    className="hiw-wave-bar"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${(i * 0.07).toFixed(2)}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================
              CARD 02: Connect Knowledge
             ========================================================= */}
          <div className="hiw-card">
            <span className="hiw-step-num">02</span>
            <h3 className="hiw-card-title">Connect Knowledge</h3>
            <p className="hiw-card-desc">
              Connect PDFs, docs, and APIs so Agent Pettra has the right context during the call.
            </p>

            {/* Visual: Orbiting Knowledge Nodes */}
            <div className="hiw-visual-stage orbit-stage">
              <div className="hiw-orbit-container">
                {/* Orbit Path Ring */}
                <div className="hiw-orbit-ring" />

                {/* Center Node (Document) */}
                <div className="hiw-orbit-center">
                  <FileText size={18} color="#C084FC" />
                </div>

                {/* Satellite Nodes */}
                <span className="hiw-orbit-pill pill-top">URL</span>
                <span className="hiw-orbit-pill pill-right">API</span>
                <span className="hiw-orbit-pill pill-bottom">DOCX</span>
                <span className="hiw-orbit-pill pill-left">PDF</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              CARD 03: Shape The Flow
             ========================================================= */}
          <div className="hiw-card">
            <span className="hiw-step-num">03</span>
            <h3 className="hiw-card-title">Shape The Flow</h3>
            <p className="hiw-card-desc">
              Build the behavior layer and decide which steps Agent Pettra should follow next.
            </p>

            {/* Visual: Node Tree Flowchart */}
            <div className="hiw-visual-stage flow-stage">
              <div className="hiw-flowchart">
                {/* Node 1: Greeting */}
                <div className="flow-node">Greeting</div>

                {/* Connecting Stem 1 */}
                <div className="flow-stem-vertical" />

                {/* Node 2: Analyze */}
                <div className="flow-node">Analyze</div>

                {/* Branching Lines */}
                <div className="flow-branch-wrapper">
                  <div className="flow-branch-line" />
                </div>

                {/* Node 3 & 4: Inform & Route */}
                <div className="flow-split-row">
                  <div className="flow-node flow-node-sm">Inform</div>
                  <div className="flow-node flow-node-sm">Route</div>
                </div>

                {/* Converging Stem */}
                <div className="flow-stem-vertical" style={{ height: '14px' }} />

                {/* Node 5: Close */}
                <div className="flow-node">Close</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hiw-section {
          background: var(--bg-darkest);
        }

        /* Header */
        .hiw-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 56px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hiw-reticle {
          margin-bottom: 20px;
          opacity: 0.9;
        }

        [data-theme="light"] .hiw-reticle svg path {
          stroke: #0F172A;
        }

        .hiw-main-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 850;
          color: #FFFFFF;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
          line-height: 1.15;
        }

        [data-theme="light"] .hiw-main-title {
          color: #0F172A;
        }

        .hiw-subtitle {
          font-size: 1.05rem;
          color: #94A3B8;
          margin-bottom: 28px;
        }

        [data-theme="light"] .hiw-subtitle {
          color: #475569;
        }

        .hiw-start-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 36px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 750;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        [data-theme="light"] .hiw-start-btn {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        .hiw-start-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
        }

        [data-theme="light"] .hiw-start-btn:hover {
          background: #1E293B;
          transform: translateY(-2px);
        }

        /* 3-Cards Grid */
        .hiw-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1140px;
          margin: 0 auto;
        }

        .hiw-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 36px 30px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.45);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        [data-theme="light"] .hiw-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
        }

        .hiw-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .hiw-card:hover {
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
        }

        .hiw-step-num {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #818CF8;
          margin-bottom: 20px;
          display: inline-block;
        }

        .hiw-card-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        [data-theme="light"] .hiw-card-title {
          color: #0F172A;
        }

        .hiw-card-desc {
          font-size: 0.94rem;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 28px;
          min-height: 68px;
        }

        [data-theme="light"] .hiw-card-desc {
          color: #475569;
        }

        /* Visual Stage */
        .hiw-visual-stage {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: auto;
          position: relative;
        }

        /* 1. Waveform */
        .hiw-waveform-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          height: 60px;
          width: 100%;
        }

        .hiw-wave-bar {
          width: 3.5px;
          border-radius: 4px;
          background: linear-gradient(180deg, #A855F7 0%, #6366F1 100%);
          display: inline-block;
          animation: wavePulse 1.8s ease-in-out infinite alternate;
        }

        [data-theme="light"] .hiw-wave-bar {
          background: linear-gradient(180deg, #7C3AED 0%, #4F46E5 100%);
        }

        @keyframes wavePulse {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        /* 2. Knowledge Orbit */
        .hiw-orbit-container {
          position: relative;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hiw-orbit-ring {
          position: absolute;
          width: 124px;
          height: 124px;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.15);
        }

        [data-theme="light"] .hiw-orbit-ring {
          border-color: rgba(15, 23, 42, 0.18);
        }

        .hiw-orbit-center {
          position: relative;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [data-theme="light"] .hiw-orbit-center {
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.25);
        }

        .hiw-orbit-pill {
          position: absolute;
          z-index: 3;
          font-size: 0.68rem;
          font-weight: 750;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
        }

        [data-theme="light"] .hiw-orbit-pill {
          background: #FFFFFF;
          border-color: rgba(15, 23, 42, 0.15);
          color: #334155;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .pill-top { top: 0; left: 50%; transform: translateX(-50%); }
        .pill-right { right: -6px; top: 50%; transform: translateY(-50%); }
        .pill-bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
        .pill-left { left: -6px; top: 50%; transform: translateY(-50%); }

        /* 3. Flowchart */
        .hiw-flowchart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .flow-node {
          padding: 4px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.72rem;
          font-weight: 600;
          color: #CBD5E1;
          text-align: center;
        }

        [data-theme="light"] .flow-node {
          background: #F1F5F9;
          border-color: rgba(15, 23, 42, 0.1);
          color: #334155;
        }

        .flow-node-sm {
          padding: 3px 10px;
          font-size: 0.68rem;
        }

        .flow-stem-vertical {
          width: 1.5px;
          height: 12px;
          background: rgba(255, 255, 255, 0.2);
        }

        [data-theme="light"] .flow-stem-vertical {
          background: rgba(15, 23, 42, 0.2);
        }

        .flow-branch-wrapper {
          position: relative;
          width: 80px;
          height: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flow-branch-line {
          width: 100%;
          height: 1px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        [data-theme="light"] .flow-branch-line {
          border-top-color: rgba(15, 23, 42, 0.2);
        }

        .flow-split-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hiw-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .hiw-cards-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .hiw-card {
            padding: 28px 22px;
          }
          .hiw-card-desc {
            min-height: auto;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
};

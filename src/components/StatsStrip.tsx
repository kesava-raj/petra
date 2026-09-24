import React from 'react';

export const StatsStrip: React.FC = () => {
  return (
    <div className="stats-strip-container" role="region" aria-label="Key Performance Statistics">
      {/* 1. 24/7 Continuous Coverage */}
      <div className="stats-strip-item">
        <span className="stats-strip-number">24/7</span>
        <span className="stats-strip-label">CONTINUOUS COVERAGE</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.01em' }}>Zero missed after-hours calls</span>
      </div>

      {/* 2. <650ms Average Latency */}
      <div className="stats-strip-item">
        <span className="stats-strip-number">&lt;650ms</span>
        <span className="stats-strip-label">AVG RESPONSE (TTFA)</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.01em' }}>Verified sub-second turnaround</span>
      </div>

      {/* 3. 48h Typical Onboarding */}
      <div className="stats-strip-item">
        <span className="stats-strip-number">48h</span>
        <span className="stats-strip-label">TYPICAL ONBOARDING</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.01em' }}>Assisted calendar & FAQ launch</span>
      </div>

      {/* 4. 30+ Languages Supported with Flag Graphics Card */}
      <div className="stats-strip-item stats-strip-pill-card">
        {/* Ambient Flag Watermark Background */}
        <div className="stats-flags-watermark" aria-hidden="true">
          {/* US Flag */}
          <svg viewBox="0 0 32 20" width="30" height="18" fill="none" className="flag-svg">
            <rect width="32" height="20" fill="#475569" rx="2" />
            <path d="M0 3h32v2.5H0zm0 5h32v2.5H0zm0 5h32v2.5H0z" fill="#334155" />
            <rect width="13" height="10" fill="#1E293B" rx="1" />
            <circle cx="3" cy="3" r="0.8" fill="#94A3B8" />
            <circle cx="7" cy="3" r="0.8" fill="#94A3B8" />
            <circle cx="10" cy="3" r="0.8" fill="#94A3B8" />
            <circle cx="5" cy="6" r="0.8" fill="#94A3B8" />
            <circle cx="8.5" cy="6" r="0.8" fill="#94A3B8" />
          </svg>

          {/* Israel Flag */}
          <svg viewBox="0 0 32 20" width="30" height="18" fill="none" className="flag-svg">
            <rect width="32" height="20" fill="#334155" rx="2" />
            <rect y="2.5" width="32" height="2.5" fill="#64748B" />
            <rect y="15" width="32" height="2.5" fill="#64748B" />
            <path d="M16 6.5 L19 12 L13 12 Z" stroke="#94A3B8" strokeWidth="0.8" fill="none" />
            <path d="M16 13.5 L19 8 L13 8 Z" stroke="#94A3B8" strokeWidth="0.8" fill="none" />
          </svg>

          {/* UK Flag (Union Jack) */}
          <svg viewBox="0 0 32 20" width="30" height="18" fill="none" className="flag-svg">
            <rect width="32" height="20" fill="#1E293B" rx="2" />
            <path d="M0 0 L32 20 M32 0 L0 20" stroke="#475569" strokeWidth="3" />
            <path d="M0 0 L32 20 M32 0 L0 20" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M16 0 V20 M0 10 H32" stroke="#475569" strokeWidth="5" />
            <path d="M16 0 V20 M0 10 H32" stroke="#CBD5E1" strokeWidth="2.2" />
          </svg>

          {/* Striped / European Flag */}
          <svg viewBox="0 0 32 20" width="30" height="18" fill="none" className="flag-svg">
            <rect width="32" height="20" fill="#1E293B" rx="2" />
            <rect y="0" width="32" height="6.6" fill="#475569" />
            <rect y="6.6" width="32" height="6.6" fill="#94A3B8" />
            <rect y="13.2" width="32" height="6.8" fill="#334155" />
          </svg>

          {/* Tricolor Flag */}
          <svg viewBox="0 0 32 20" width="30" height="18" fill="none" className="flag-svg">
            <rect width="32" height="20" fill="#1E293B" rx="2" />
            <rect x="0" width="10.6" height="20" fill="#475569" />
            <rect x="10.6" width="10.8" height="20" fill="#CBD5E1" />
            <rect x="21.4" width="10.6" height="20" fill="#334155" />
          </svg>
        </div>

        {/* Foreground Content */}
        <div className="stats-flags-content">
          <span className="stats-strip-number">30+</span>
          <span className="stats-strip-label">LANGUAGES SUPPORTED</span>
        </div>
      </div>

      <style>{`
        .stats-strip-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          gap: 16px;
          padding: 20px 32px;
          border-radius: 24px;
          background: rgba(11, 15, 25, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          margin: 0 auto;
          width: 100%;
          max-width: 1100px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Light Theme Adaptivity */
        [data-theme="light"] .stats-strip-container {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .stats-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px 12px;
        }

        .stats-strip-number {
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        [data-theme="light"] .stats-strip-number {
          color: #0F172A;
        }

        .stats-strip-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94A3B8;
          white-space: nowrap;
        }

        [data-theme="light"] .stats-strip-label {
          color: #64748B;
        }

        /* 4th Card: Language flags capsule */
        .stats-strip-pill-card {
          position: relative;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 10px 18px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 68px;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.25);
        }

        [data-theme="light"] .stats-strip-pill-card {
          background: rgba(241, 245, 249, 0.85);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .stats-flags-watermark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0.35;
          pointer-events: none;
          transform: scale(1.05);
          filter: grayscale(0.5);
        }

        [data-theme="light"] .stats-flags-watermark {
          opacity: 0.22;
          filter: grayscale(0.8);
        }

        .flag-svg {
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .stats-flags-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: radial-gradient(circle, rgba(11, 15, 25, 0.85) 45%, transparent 100%);
          padding: 2px 14px;
          border-radius: 12px;
        }

        [data-theme="light"] .stats-flags-content {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 45%, transparent 100%);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .stats-strip-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px 16px;
            padding: 20px 24px;
          }
          .stats-strip-label {
            font-size: 0.7rem;
            letter-spacing: 0.09em;
          }
        }

        @media (max-width: 520px) {
          .stats-strip-container {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 18px 16px;
          }
          .stats-strip-item {
            padding: 6px 8px;
          }
          .stats-strip-pill-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

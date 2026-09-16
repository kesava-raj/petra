import React, { useState } from 'react';
import { Sparkles, Target, Zap, CheckCircle2, Layers } from 'lucide-react';

export const BenchmarkComparison: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <section className="section-padding benchmark-section" id="benchmarks" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Ray Flare */}
      <div 
        aria-hidden="true" 
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '1100px',
          height: '600px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.14) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* =========================================================
            CARD 1: Voice Quality vs Latency Benchmark Graph
           ========================================================= */}
        <div className="benchmark-chart-card">
          <div className="benchmark-card-header">
            <div className="eyebrow" style={{ marginBottom: '12px' }}>
              <Sparkles size={14} />
              <span>PERFORMANCE BENCHMARK</span>
            </div>
            <h2 className="benchmark-title">
              Voice Quality vs Latency
            </h2>
            <p className="benchmark-subtitle">
              A tighter benchmark view focused on response speed and performance spread.
            </p>

            {/* Legend */}
            <div className="benchmark-legend">
              <div className="legend-item">
                <span className="legend-dot dot-pettra" />
                <span>Agent Pettra benchmark point</span>
              </div>
              <div className="legend-item">
                <span className="legend-cluster">
                  <span className="cluster-dot" />
                  <span className="cluster-dot" />
                  <span className="cluster-dot" />
                </span>
                <span>Competitor benchmark cluster</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-human" />
                <span>Human benchmark point</span>
              </div>
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="chart-canvas-wrapper">
            <svg 
              viewBox="0 0 760 380" 
              className="benchmark-svg-chart"
              aria-label="Voice Quality vs Latency Scatter Chart"
              role="img"
            >
              {/* Chart Grid Lines */}
              <g className="chart-grid">
                {/* Horizontal grid lines (Score: 74, 81, 87, 94, 100) */}
                <line x1="60" y1="50" x2="720" y2="50" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="60" y1="115" x2="720" y2="115" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="60" y1="180" x2="720" y2="180" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="60" y1="245" x2="720" y2="245" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="60" y1="310" x2="720" y2="310" stroke="var(--chart-grid)" />

                {/* Vertical grid lines (Latency: 0.81s, 1.16s, 1.5s, 1.85s, 2.2s) */}
                <line x1="60" y1="50" x2="60" y2="310" stroke="var(--chart-grid)" />
                <line x1="225" y1="50" x2="225" y2="310" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="390" y1="50" x2="390" y2="310" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="555" y1="50" x2="555" y2="310" stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <line x1="720" y1="50" x2="720" y2="310" stroke="var(--chart-grid)" />
              </g>

              {/* Axis Labels */}
              <g className="chart-axis-labels">
                {/* Y-Axis Score (%) */}
                <text x="50" y="54" textAnchor="end" className="axis-num">100</text>
                <text x="50" y="119" textAnchor="end" className="axis-num">94</text>
                <text x="50" y="184" textAnchor="end" className="axis-num">87</text>
                <text x="50" y="249" textAnchor="end" className="axis-num">81</text>
                <text x="50" y="314" textAnchor="end" className="axis-num">74</text>
                <text 
                  x="-180" 
                  y="18" 
                  transform="rotate(-90)" 
                  textAnchor="middle" 
                  className="axis-title"
                >
                  Score (%)
                </text>

                {/* X-Axis Latency (s) */}
                <text x="60" y="332" textAnchor="middle" className="axis-num">0.81</text>
                <text x="225" y="332" textAnchor="middle" className="axis-num">1.16</text>
                <text x="390" y="332" textAnchor="middle" className="axis-num">1.5</text>
                <text x="555" y="332" textAnchor="middle" className="axis-num">1.85</text>
                <text x="720" y="332" textAnchor="middle" className="axis-num">2.2</text>
                <text x="390" y="362" textAnchor="middle" className="axis-title">
                  Time to First Audio (s)
                </text>
              </g>

              {/* Diagonal Benchmark Trend Reference Line */}
              <line 
                x1="120" 
                y1="100" 
                x2="650" 
                y2="250" 
                stroke="rgba(168, 85, 247, 0.25)" 
                strokeDasharray="6 6" 
                strokeWidth="1.5" 
              />

              {/* Center Target Reticle */}
              <g className="chart-reticle" transform="translate(320, 185)">
                <path d="M-18 -18 H-6 V-18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M-18 -18 V-6 H-18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M18 -18 H6 V-18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M18 -18 V-6 H18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M-18 18 H-6 V18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M-18 18 V6 H-18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M18 18 H6 V18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <path d="M18 18 V6 H18" stroke="#94A3B8" strokeWidth="2" fill="none" />
                <circle cx="0" cy="0" r="2.5" fill="#94A3B8" />
              </g>

              {/* Competitor Benchmark Cluster Dots (around 1.7s, score 82-84%) */}
              <g className="competitor-cluster" transform="translate(0, 0)">
                <circle cx="480" cy="242" r="4.5" fill="#94A3B8" opacity="0.85" />
                <circle cx="495" cy="235" r="5" fill="#CBD5E1" opacity="0.9" />
                <circle cx="510" cy="228" r="6" fill="#F1F5F9" opacity="0.95" />
                <circle cx="525" cy="238" r="5.5" fill="#94A3B8" opacity="0.85" />
                <circle cx="538" cy="244" r="5" fill="#CBD5E1" opacity="0.9" />
                <text x="510" y="210" textAnchor="middle" className="dot-label competitor-label">
                  Competitors (1.7s)
                </text>
              </g>

              {/* Human Benchmark Point (2.0s, score 89%) */}
              <g className="human-point" transform="translate(650, 165)">
                <circle cx="0" cy="0" r="16" fill="rgba(245, 158, 11, 0.18)" />
                <circle cx="0" cy="0" r="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="-18" textAnchor="middle" className="dot-label human-label">
                  Human (2s)
                </text>
              </g>

              {/* Agent Pettra Benchmark Point (0.9s, score 96%) - WINNER */}
              <g 
                className="pettra-point" 
                transform="translate(125, 95)"
                onMouseEnter={() => setActiveTooltip('pettra')}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Concentric Glow Pulse */}
                <circle cx="0" cy="0" r="24" fill="rgba(168, 85, 247, 0.2)" className="pulse-circle" />
                <circle cx="0" cy="0" r="14" fill="rgba(168, 85, 247, 0.5)" />
                <circle cx="0" cy="0" r="8" fill="#C084FC" stroke="#FFFFFF" strokeWidth="2.5" />
                <text x="0" y="-22" textAnchor="middle" className="dot-label pettra-label">
                  Agent Pettra (0.9s)
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* =========================================================
            CARD 2: Why Teams Pick Agent Pettra (Comparison Grid)
           ========================================================= */}
        <div className="why-pick-card">
          <div className="why-pick-header">
            <h3 className="why-pick-headline">
              Why teams pick Agent Pettra
            </h3>
            <p className="why-pick-subtitle">
              A faster path to production than stitching together multiple vendors and tools
            </p>
          </div>

          <div className="why-pick-grid">
            {/* Left Card: Agent Pettra (Ready) */}
            <div className="comparison-box box-pettra">
              <div className="comp-field">
                <span className="comp-label">APPROACH</span>
                <h4 className="comp-heading">Agent Pettra</h4>
              </div>

              <div className="comp-divider" />

              <div className="comp-field">
                <span className="comp-label">READINESS</span>
                <div className="readiness-ready">Ready</div>
              </div>

              <div className="comp-divider" />

              <div className="comp-field">
                <span className="comp-label">WHAT YOU GET</span>
                <p className="comp-text-highlight">
                  Voice + workflows + visibility + fast rollout in one layer
                </p>
              </div>
            </div>

            {/* Right Card: DIY stack / generic tools (Fragmented) */}
            <div className="comparison-box box-diy">
              <div className="comp-field">
                <span className="comp-label">APPROACH</span>
                <h4 className="comp-heading-muted">DIY stack / generic tools</h4>
              </div>

              <div className="comp-divider" />

              <div className="comp-field">
                <span className="comp-label">READINESS</span>
                <div className="readiness-fragmented">Fragmented</div>
              </div>

              <div className="comp-divider" />

              <div className="comp-field">
                <span className="comp-label">WHAT YOU GET</span>
                <p className="comp-text-muted">
                  Often means stitching together telephony, orchestration, integrations, QA, and observability separately
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .benchmark-section {
          background: var(--bg-darkest);
        }

        /* -------------------------------------------------------------
           BENCHMARK CHART CARD
        ------------------------------------------------------------- */
        .benchmark-chart-card {
          position: relative;
          padding: 40px 44px;
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
          margin-bottom: 36px;
        }

        [data-theme="light"] .benchmark-chart-card {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
        }

        .benchmark-card-header {
          margin-bottom: 28px;
        }

        .benchmark-title {
          font-size: clamp(1.65rem, 3vw, 2.1rem);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.025em;
          margin-bottom: 8px;
        }

        [data-theme="light"] .benchmark-title {
          color: #0F172A;
        }

        .benchmark-subtitle {
          font-size: 0.98rem;
          color: #94A3B8;
          margin-bottom: 22px;
          line-height: 1.5;
        }

        [data-theme="light"] .benchmark-subtitle {
          color: #475569;
        }

        /* Legend */
        .benchmark-legend {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 24px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        [data-theme="light"] .benchmark-legend {
          border-top-color: rgba(15, 23, 42, 0.08);
          color: #334155;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-weight: 600;
        }

        .legend-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-pettra {
          background: #C084FC;
          box-shadow: 0 0 10px #A855F7;
        }

        .dot-human {
          background: #F59E0B;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }

        .legend-cluster {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .cluster-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #94A3B8;
          display: inline-block;
        }

        /* Chart Canvas */
        .chart-canvas-wrapper {
          width: 100%;
          background: rgba(10, 15, 29, 0.65);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 12px;
        }

        [data-theme="light"] .chart-canvas-wrapper {
          background: #F8FAFC;
          border-color: rgba(15, 23, 42, 0.08);
        }

        .benchmark-svg-chart {
          width: 100%;
          height: auto;
          display: block;
        }

        :root {
          --chart-grid: rgba(255, 255, 255, 0.09);
        }
        [data-theme="light"] {
          --chart-grid: rgba(15, 23, 42, 0.08);
        }

        .axis-num {
          font-family: monospace, ui-sans-serif, system-ui;
          font-size: 11px;
          font-weight: 600;
          fill: #64748B;
        }

        .axis-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          fill: #94A3B8;
        }

        [data-theme="light"] .axis-title {
          fill: #475569;
        }

        .dot-label {
          font-family: ui-sans-serif, system-ui, -apple-system;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .pettra-label {
          fill: #E9D5FF;
          filter: drop-shadow(0 2px 8px rgba(168, 85, 247, 0.8));
        }

        [data-theme="light"] .pettra-label {
          fill: #7E22CE;
          filter: none;
        }

        .competitor-label {
          fill: #94A3B8;
        }

        .human-label {
          fill: #FDE68A;
        }

        [data-theme="light"] .human-label {
          fill: #B45309;
        }

        @keyframes reticlePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        .pulse-circle {
          animation: reticlePulse 2.8s ease-in-out infinite;
        }

        /* -------------------------------------------------------------
           WHY TEAMS PICK AGENT PETTRA CARD
        ------------------------------------------------------------- */
        .why-pick-card {
          position: relative;
          padding: 44px 44px;
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
        }

        [data-theme="light"] .why-pick-card {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
        }

        .why-pick-header {
          text-align: center;
          max-width: 740px;
          margin: 0 auto 36px auto;
        }

        .why-pick-headline {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 850;
          color: #FFFFFF;
          letter-spacing: -0.025em;
          margin-bottom: 10px;
        }

        [data-theme="light"] .why-pick-headline {
          color: #0F172A;
        }

        .why-pick-subtitle {
          font-size: 1.02rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        [data-theme="light"] .why-pick-subtitle {
          color: #475569;
        }

        .why-pick-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .comparison-box {
          border-radius: 22px;
          padding: 34px 30px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        /* Pettra Box (Highlighted) */
        .box-pettra {
          background: linear-gradient(180deg, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
          border: 1px solid rgba(168, 85, 247, 0.45);
          box-shadow: 0 0 35px -5px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        [data-theme="light"] .box-pettra {
          background: linear-gradient(180deg, rgba(243, 232, 255, 0.6) 0%, rgba(255, 255, 255, 0.98) 100%);
          border: 1.5px solid rgba(168, 85, 247, 0.5);
          box-shadow: 0 12px 30px rgba(168, 85, 247, 0.1);
        }

        .box-pettra:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 45px -5px rgba(168, 85, 247, 0.3);
        }

        /* DIY Box */
        .box-diy {
          background: rgba(15, 23, 42, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        [data-theme="light"] .box-diy {
          background: #F8FAFC;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .comp-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .comp-label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
        }

        [data-theme="light"] .comp-label {
          color: #94A3B8;
        }

        .comp-heading {
          font-size: 1.55rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }

        [data-theme="light"] .comp-heading {
          color: #0F172A;
        }

        .comp-heading-muted {
          font-size: 1.55rem;
          font-weight: 800;
          color: #CBD5E1;
          margin: 0;
          letter-spacing: -0.02em;
        }

        [data-theme="light"] .comp-heading-muted {
          color: #334155;
        }

        .comp-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          width: 100%;
        }

        [data-theme="light"] .comp-divider {
          background: rgba(15, 23, 42, 0.08);
        }

        .readiness-ready {
          font-size: clamp(1.85rem, 3vw, 2.2rem);
          font-weight: 850;
          color: #C084FC;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        [data-theme="light"] .readiness-ready {
          color: #7E22CE;
        }

        .readiness-fragmented {
          font-size: clamp(1.65rem, 2.8vw, 2rem);
          font-weight: 700;
          font-family: monospace, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas;
          color: #CBD5E1;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        [data-theme="light"] .readiness-fragmented {
          color: #64748B;
        }

        .comp-text-highlight {
          font-size: 0.98rem;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.55;
          margin: 0;
        }

        [data-theme="light"] .comp-text-highlight {
          color: #0F172A;
        }

        .comp-text-muted {
          font-size: 0.94rem;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0;
        }

        [data-theme="light"] .comp-text-muted {
          color: #64748B;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .benchmark-chart-card,
          .why-pick-card {
            padding: 28px 20px;
          }
          .why-pick-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .benchmark-legend {
            gap: 14px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import pageStyles from '../styles/pageStyles';

function PageShell({ eyebrow, title, description, onBack, children, headingAlign = 'center', headingMaxWidth = '1050px', headingClassName = '', mobileMeta = null }) {
  return (
    <div className="dedicated-page-enter" style={{ minHeight: '100vh', backgroundColor: pageStyles.bg, color: pageStyles.text, fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 64px 80px' }} className="dedicated-page-container">
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: pageStyles.lightBlue, cursor: 'pointer', padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '42px' }}>
          ← Volver
        </button>

        <div className={`dedicated-page-heading dedicated-page-heading-enter ${headingAlign === 'left' ? 'dedicated-page-heading-left' : ''} ${headingClassName}`} style={{ textAlign: headingAlign, maxWidth: headingMaxWidth, margin: '0 auto 54px' }}>
          <span className="dedicated-page-eyebrow" style={{ display: 'block', color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '18px' }}>{eyebrow}</span>
          {mobileMeta && <div className="dedicated-mobile-detail-meta" aria-label="Información del contenido">{mobileMeta}</div>}
          <h1 className="dedicated-page-title" style={{
            margin: 0,
            fontSize: 'clamp(2.15rem, 4.6vw, 4.35rem)',
            fontWeight: 400,
            letterSpacing: '0.035em',
            textTransform: 'uppercase',
            lineHeight: 1.08,
            maxWidth: '1050px',
            marginInline: 'auto',
            overflowWrap: 'anywhere',
            textWrap: 'balance'
          }}>{title}</h1>
          {description && <p style={{ margin: '24px auto 0', maxWidth: '800px', color: pageStyles.muted, fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>{description}</p>}
        </div>

        {children}
      </div>
      <style>{`
        .dedicated-page-enter {
          opacity: 1;
          transform: none;
          filter: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .dedicated-page-enter {
            animation: none !important;
          }
        }

        .dedicated-mobile-detail-meta { display: none; }
        .dedicated-page-heading { overflow: visible; }
        .dedicated-page-heading-left { margin-left: 0 !important; margin-right: auto !important; }
        .dedicated-page-heading-left .dedicated-page-title { text-align: left; }
        .dedicated-page-heading-enter {
          animation: dedicatedHeadingEnter 520ms cubic-bezier(0.22, 1, 0.36, 1) 70ms both;
        }

        @keyframes dedicatedHeadingEnter {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dedicated-page-heading-enter { animation: none !important; }
        }
        .dedicated-page-title { word-break: normal; }
        @media (max-width: 768px) {
          .dedicated-page-container { padding: 110px 20px 56px !important; }
          .dedicated-page-heading { margin-bottom: 40px !important; }
          .dedicated-page-title { font-size: clamp(2rem, 10vw, 3.1rem) !important; line-height: 1.08 !important; letter-spacing: 0.02em !important; }
          .dedicated-filter-grid { grid-template-columns: 1fr !important; }
          .dedicated-card-grid { grid-template-columns: 1fr !important; }
          .dedicated-content-grid { grid-template-columns: 1fr !important; }
          .dedicated-detail-panel { padding: 28px !important; }
          .dedicated-case-card, .dedicated-article-card { padding: 28px !important; }
        }
        .dedicated-input { width: 100%; min-width: 0; box-sizing: border-box; }
        .dedicated-select-wrap { position: relative; width: 100%; min-width: 0; }
        .dedicated-select-wrap::after { content: ''; position: absolute; right: 17px; top: 50%; width: 7px; height: 7px; border-right: 1.5px solid #9fb3cc; border-bottom: 1.5px solid #9fb3cc; transform: translateY(-65%) rotate(45deg); pointer-events: none; transition: border-color 180ms ease, transform 180ms ease; }
        .dedicated-select-wrap:focus-within::after { border-color: ${pageStyles.lightBlue}; transform: translateY(-35%) rotate(225deg); }
        .dedicated-select { appearance: none; -webkit-appearance: none; -moz-appearance: none; padding-right: 48px !important; cursor: pointer; }
        .dedicated-select::-ms-expand { display: none; }
        .dedicated-date-filter { color-scheme: dark; }
        .dedicated-input:focus { border-color: ${pageStyles.blue} !important; outline: none; }
        @media (max-width: 1100px) { .dedicated-filter-grid { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) !important; } .dedicated-date-filter { grid-column: 1 / -1; } }
      `}</style>
    </div>
  );
}


export default PageShell;

import React from 'react';
import PageShell from './PageShell';
import CasesPage from './CasesPage';
import pageStyles from '../styles/pageStyles';

function CaseDetailPage({ caso, onBack, onNavigate, cases }) {
  if (!caso) {
    return <CasesPage onBack={onBack} onNavigate={onNavigate} cases={cases} />;
  }

  return (
    <PageShell
      eyebrow={`${caso.area} · ${caso.displayDate}`}
      mobileMeta={
        <>
          <span>{caso.area}</span>
          <span>{caso.displayDate}</span>
        </>
      }
      title={caso.title}
      description={caso.summary}
      headingClassName="case-detail-heading"
      onBack={() => onNavigate('#casos')}
    >
      <div
        className="dedicated-content-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px'
        }}
      >
        {[
          ['Contexto', caso.context],
          ['Estrategia', caso.strategy],
          ['Resultado', caso.result]
        ].map(([heading, content]) => (
          <section
            key={heading}
            className="dedicated-detail-panel"
            style={{
              backgroundColor: pageStyles.panelAlt,
              border: `1px solid ${pageStyles.border}`,
              padding: '30px',
              minHeight: '250px'
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: '0 0 16px',
                color: pageStyles.lightBlue,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
              }}
            >
              {heading}
            </h2>

            <p
              style={{
                color: pageStyles.muted,
                lineHeight: 1.8,
                margin: 0
              }}
            >
              {content}
            </p>
          </section>
        ))}
      </div>

      <div
        className="case-detail-keywords"
        style={{
          marginTop: '24px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(30,58,138,0.25)',
          color: pageStyles.muted,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          fontSize: '0.8rem'
        }}
      >
        <span className="case-detail-keywords-label">Palabras clave:</span>

        <div className="case-detail-keywords-scroll">
          {caso.keywords.map((keyword) => (
            <span key={keyword} className="case-detail-keyword">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-detail-keywords {
            margin-top: 20px !important;
            padding-top: 14px !important;
          }

          .case-detail-keywords-label {
            display: block !important;
            margin-bottom: 8px !important;
            font-size: .57rem !important;
            line-height: 1 !important;
            letter-spacing: .16em !important;
            text-transform: uppercase !important;
            color: #7890ad !important;
          }

          .case-detail-keywords-scroll {
            display: flex !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            gap: 7px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            height: 38px !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 0 2px 2px 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            -webkit-overflow-scrolling: touch !important;
            touch-action: pan-x !important;
            overscroll-behavior-x: contain !important;
            scrollbar-width: none !important;
          }

          .case-detail-keywords-scroll::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          .case-detail-keyword {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            height: 28px !important;
            padding: 0 10px !important;
            border: 1px solid rgba(96,165,250,.18) !important;
            background: rgba(13,19,31,.55) !important;
            color: #cbd5e1 !important;
            font-size: .61rem !important;
            line-height: 1 !important;
          }
        }
      `}</style>

      <style>{`
        @media (max-width: 768px) {
          .case-detail-heading {
            width: 100% !important;
            margin-bottom: 26px !important;
          }

          .case-detail-heading .dedicated-page-eyebrow {
            display: none !important;
          }

          .case-detail-heading .dedicated-page-title {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            font-size: clamp(1.9rem, 8.2vw, 2.35rem) !important;
            line-height: 1.08 !important;
            letter-spacing: 0 !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
            hyphens: none !important;
            text-wrap: balance !important;
            text-align: center !important;
          }

          .case-detail-heading ~ .dedicated-page-heading p {
            margin-top: 14px !important;
          }
        }
      `}</style>
    </PageShell>
  );
}

export default CaseDetailPage;

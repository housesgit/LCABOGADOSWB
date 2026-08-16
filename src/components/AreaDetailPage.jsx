import React from 'react';
import { areaDetails } from '../data/areas';
import AreasPage from './AreasPage';
import PageShell from './PageShell';
import pageStyles from '../styles/pageStyles';

function AreaDetailPage({ area, onNavigate }) {
  const detail = areaDetails[area];

  if (!detail) {
    return (
      <AreasPage
        onBack={() => onNavigate('#inicio')}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <PageShell
      eyebrow={detail.eyebrow}
      title={detail.title}
      description={detail.intro}
      onBack={() => onNavigate('#areas')}
    >
      <div
        className="dedicated-content-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '24px'
        }}
      >
        {detail.sections.map(([heading, content]) => (
          <section
            key={heading}
            className="dedicated-detail-panel"
            style={{
              backgroundColor: pageStyles.panelAlt,
              border: `1px solid ${pageStyles.border}`,
              padding: '34px',
              minHeight: '220px'
            }}
          >
            <h2
              style={{
                margin: '0 0 16px',
                color: pageStyles.lightBlue,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.13em',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              }}
            >
              {heading}
            </h2>

            <p
              style={{
                margin: 0,
                color: pageStyles.muted,
                fontSize: '1rem',
                lineHeight: 1.85
              }}
            >
              {content}
            </p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

export default AreaDetailPage;

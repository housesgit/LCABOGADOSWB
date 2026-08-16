import React from 'react';
import PageShell from './PageShell';
import { areasList } from '../data/areas';
import pageStyles from '../styles/pageStyles';

function AreasPage({ onBack, onNavigate }) {
  return (
    <PageShell
      eyebrow="Especialidades jurídicas"
      title="Nuestras Áreas"
      description="Conozca el alcance de cada especialidad y entre directamente en el área que desea explorar."
      onBack={onBack}
    >
      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {areasList.map((area) => (
          <button
            key={area.title}
            onClick={() => onNavigate(`#area/${encodeURIComponent(area.title)}`)}
            aria-label={`Conocer ${area.title}`}
            style={{
              backgroundColor: pageStyles.panel,
              border: `1px solid ${pageStyles.border}`,
              padding: '38px',
              textAlign: 'left',
              color: pageStyles.text,
              cursor: 'pointer',
              minHeight: '245px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = pageStyles.blue;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#101a2b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = pageStyles.border;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = pageStyles.panel;
            }}
          >
            <span style={{ color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Especialidad</span>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 400, margin: '12px 0 16px' }}>{area.title}</h2>
            <p style={{ color: pageStyles.muted, lineHeight: 1.75, margin: 0 }}>{area.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: '24px', color: pageStyles.lightBlue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Conocer el área →
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
}


export default AreasPage;

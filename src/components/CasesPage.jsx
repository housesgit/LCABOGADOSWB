import React, { useState } from 'react';
import PageShell from './PageShell';
import FilterPanel from './FilterPanel';
import pageStyles from '../styles/pageStyles';

function CasesPage({ onBack, onNavigate, cases }) {  const [search, setSearch] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [date, setDate] = useState('');
  const areas = [...new Set(cases.map((item) => item.area))];

  const filtered = cases.filter((item) => {
    const q = search.trim().toLowerCase();
    const haystack = [item.title, item.summary, item.area, item.category, ...item.keywords, ...item.tags].join(' ').toLowerCase();
    return (!q || haystack.includes(q))
      && (area === 'Todas' || item.area === area)
      && (category === 'Todas' || item.category === category)
      && (!date || item.date === date);
  });

  return (
    <PageShell
      eyebrow="Experiencia y Resultados"
      title="Casos de Estudio"
      description="Explore ejemplos de asuntos organizados por especialidad, categoría, fecha y palabras clave. El contenido es demostrativo y no sustituye la valoración jurídica de un caso concreto."
      onBack={onBack}
    >
      <FilterPanel {...{ search, setSearch, area, setArea, category, setCategory, date, setDate }} areas={areas} />

      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {filtered.map((caso) => (
          <article
            key={caso.id}
            className="dedicated-case-card dedicated-mobile-click-card"
            style={{
              backgroundColor: pageStyles.panelAlt,
              border: `1px solid ${pageStyles.border}`,
              padding: '34px',
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr auto',
              position: 'relative'
            }}
          >
            <button
              className="mobile-card-link"
              onClick={() => onNavigate(`#caso/${caso.id}`)}
              aria-label={`Abrir caso: ${caso.title}`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <span style={{ backgroundColor: '#1e3a8a', color: pageStyles.lightBlue, padding: '6px 10px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {caso.area}
              </span>
              <span style={{ color: '#7890ad', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.72rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                {caso.displayDate}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 400, lineHeight: 1.35, margin: '22px 0 14px' }}>{caso.title}</h2>
            <p style={{ color: pageStyles.muted, lineHeight: 1.7, margin: 0 }}>{caso.summary}</p>

            <div className="case-tags-scroll" style={{ marginTop: '22px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {caso.tags.map((tag) => (
                <span key={tag} style={{ color: '#cbd5e1', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.68rem', border: '1px solid rgba(148,163,184,0.18)', padding: '5px 8px' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '18px', paddingTop: '16px' }}>
              <button
                onClick={() => onNavigate(`#caso/${caso.id}`)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: pageStyles.lightBlue,
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                Ver caso completo →
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '50px 0', textAlign: 'center', color: pageStyles.muted }}>
          No hay casos que coincidan con los filtros seleccionados.
        </div>
      )}
    </PageShell>
  );
}


export default CasesPage;

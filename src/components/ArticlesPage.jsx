import React, { useState } from 'react';
import PageShell from './PageShell';
import FilterPanel from './FilterPanel';
import pageStyles from '../styles/pageStyles';

function ArticlesPage({ onBack, onNavigate, articles: articleItems }) {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [date, setDate] = useState('');

  const areas = [...new Set(articleItems.map((item) => item.area))];

  const filtered = articleItems.filter((item) => {
    const q = search.trim().toLowerCase();

    const haystack = [
      item.title,
      item.snippet,
      item.area,
      item.author,
      ...item.keywords
    ]
      .join(' ')
      .toLowerCase();

    return (
      (!q || haystack.includes(q)) &&
      (area === 'Todas' || item.area === area) &&
      (
        category === 'Todas' ||
        (item.area === 'Derecho Comercial'
          ? 'Comercial'
          : 'Otra área') === category
      ) &&
      (!date || item.date === date)
    );
  });

  return (
    <PageShell
      eyebrow="Publicaciones y Análisis"
      title="Artículos y Foro Jurídico"
      description="Consulte artículos de ejemplo y filtre el contenido por fecha, área de práctica y palabras clave."
      onBack={onBack}
    >
      <FilterPanel
        {...{
          search,
          setSearch,
          area,
          setArea,
          category,
          setCategory,
          date,
          setDate
        }}
        areas={areas}
      />

      <div
        className="dedicated-card-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '24px'
        }}
      >
        {filtered.map((art) => (
          <article
            key={art.id}
            className="dedicated-mobile-click-card"
            style={{
              backgroundColor: pageStyles.panel,
              border: `1px solid ${pageStyles.border}`,
              padding: '34px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <button
              className="mobile-card-link"
              onClick={() => onNavigate(`#articulo/${art.id}`)}
              aria-label={`Abrir artículo: ${art.title}`}
            />

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  fontSize: '0.72rem',
                  color: pageStyles.blue,
                  marginBottom: '14px',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
                }}
              >
                <span>{art.displayDate}</span>
                <span>{art.author}</span>
              </div>

              <span
                style={{
                  color: '#cbd5e1',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                  fontSize: '0.7rem'
                }}
              >
                {art.area}
              </span>

              <h2
                style={{
                  color: pageStyles.text,
                  margin: '12px 0 14px',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  lineHeight: 1.45
                }}
              >
                {art.title}
              </h2>

              <p
                style={{
                  color: pageStyles.muted,
                  margin: 0,
                  lineHeight: 1.7
                }}
              >
                {art.snippet}
              </p>
            </div>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(30,58,138,0.22)'
              }}
            >
              <button
                onClick={() => onNavigate(`#articulo/${art.id}`)}
                className="cta-consultar"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
                }}
              >
                <span
                  className="hover-underline-animation"
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginRight: '8px'
                  }}
                >
                  Leer artículo completo
                </span>

                <span style={{ color: pageStyles.lightBlue }}>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            padding: '50px 0',
            textAlign: 'center',
            color: pageStyles.muted
          }}
        >
          No hay artículos que coincidan con los filtros seleccionados.
        </div>
      )}
    </PageShell>
  );
}

export default ArticlesPage;

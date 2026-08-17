import React from 'react';

function HomeArticles({ navigate }) {
  const articles = [
    {
      id: 'regulaciones-corporativas-patrimonial',
      date: 'Agosto 12, 2026',
      author: 'Dr. Socio Director',
      title:
        'Impacto de las nuevas regulaciones corporativas en el régimen patrimonial',
      snippet:
        'Análisis crítico sobre las recientes modificaciones en la responsabilidad de los administradores y la protección de bienes sociales...'
    },
    {
      id: 'estrategias-derecho-laboral',
      date: 'Julio 28, 2026',
      author: 'Equipo de Litigios',
      title:
        'Estrategias preventivas frente a contingencias en el derecho laboral moderno',
      snippet:
        'Lineamientos esenciales que toda compañía debe implementar para mitigar riesgos en procesos de reestructuración de personal...'
    }
  ];

  return (
    <section
      id="articulos"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '60px 0',
        backgroundColor: '#090d14',
        color: '#ffffff',
        borderBottom: '1px solid rgba(30, 58, 138, 0.3)'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          className="container-padding-mobile"
          style={{
            maxWidth: '1100px',
            margin: '0 auto 30px auto',
            padding: '0 64px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#60a5fa',
              display: 'block',
              marginBottom: '12px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Publicaciones y Análisis
          </span>

          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '400',
              margin: 0,
              color: '#f8fafc',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Artículos y Foro Jurídico
          </h2>
        </div>

        <div
          className="container-padding-mobile"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            paddingLeft: '64px',
            paddingRight: '64px'
          }}
        >
          {articles.map((art) => (
            <article
              key={art.id}
              style={{
                backgroundColor: '#0d131f',
                border: '1px solid rgba(30, 58, 138, 0.35)',
                padding: '40px 32px',
                borderRadius: '0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#60a5fa',
                    marginBottom: '16px',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  <span>{art.date}</span>
                  <span>{art.author}</span>
                </div>

                <h3
                  style={{
                    color: '#f8fafc',
                    margin: '0 0 16px 0',
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    lineHeight: '1.4'
                  }}
                >
                  {art.title}
                </h3>

                <p
                  style={{
                    color: '#94a3b8',
                    margin: '0 0 24px 0',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}
                >
                  {art.snippet}
                </p>
              </div>

              <div style={{ marginTop: '24px' }}>
                <a
                  href={`#articulo/${art.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`#articulo/${art.id}`);
                  }}
                  className="cta-consultar"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  <span
                    className="hover-underline-animation"
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: '500',
                      marginRight: '8px'
                    }}
                  >
                    Leer artículo completo
                  </span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: '#93c5fd' }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeArticles;

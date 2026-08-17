import React from 'react';

function HomeCases({ navigate, cases }) {
  return (
    <section
      id="casos-preview"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '60px 0',
        backgroundColor: '#06090e',
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
            Experiencia y Resultados
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
            Casos de Estudio
          </h2>
        </div>

        <div
          className="container-padding-mobile home-cases-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '32px',
            paddingLeft: '64px',
            paddingRight: '64px'
          }}
        >
          {cases.slice(0, 2).map((caso) => (
            <button
              key={caso.id}
              onClick={() => navigate(`#caso/${caso.id}`)}
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(30, 58, 138, 0.4)',
                padding: '40px',
                borderRadius: '0px',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                transition:
                  'border-color 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
                fontFamily: 'Georgia, serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa';
                e.currentTarget.style.backgroundColor = '#101a2b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'rgba(30, 58, 138, 0.4)';
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    backgroundColor: '#1e3a8a',
                    color: '#93c5fd',
                    padding: '5px 10px',
                    borderRadius: '0px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  {caso.area}
                </span>

                <h3
                  style={{
                    color: '#f8fafc',
                    margin: '20px 0 16px 0',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    letterSpacing: '0.03em',
                    lineHeight: 1.4
                  }}
                >
                  {caso.title}
                </h3>

                <p
                  style={{
                    color: '#94a3b8',
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}
                >
                  {caso.summary}
                </p>
              </div>

              <div
                style={{
                  marginTop: '26px',
                  paddingTop: '18px',
                  borderTop: '1px solid rgba(30,58,138,0.25)',
                  color: '#93c5fd',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                Ver caso completo →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCases;

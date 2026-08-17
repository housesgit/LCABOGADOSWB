import React from 'react';
import { areasList } from '../data/areas';

function HomeAreas({ navigate }) {
  return (
    <section
      id="areas-preview"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '60px 0',
        backgroundColor: '#090d14',
        color: '#ffffff',
        borderBottom: '1px solid rgba(30, 58, 138, 0.3)',
        overflow: 'hidden'
      }}
    >
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
            marginBottom: '11px',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          Especialidades
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
          Áreas de Práctica
        </h2>
      </div>

      <div
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="marquee-track">
          {[...areasList, ...areasList].map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              onClick={() =>
                navigate(`#area/${encodeURIComponent(item.title)}`)
              }
              style={{
                backgroundColor: '#0d131f',
                border: '1px solid rgba(30, 58, 138, 0.35)',
                padding: '40px 36px',
                width: '340px',
                minWidth: '340px',
                marginRight: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition:
                  'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa';
                e.currentTarget.style.backgroundColor = '#101a2b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'rgba(30, 58, 138, 0.35)';
                e.currentTarget.style.backgroundColor = '#0d131f';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <h3
                  style={{
                    color: '#f8fafc',
                    margin: '0 0 16px 0',
                    fontSize: '1.25rem',
                    fontWeight: '400',
                    letterSpacing: '0.05em'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: '#94a3b8',
                    margin: 0,
                    fontSize: '0.92rem',
                    lineHeight: '1.7',
                    fontWeight: '300'
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(30, 58, 138, 0.2)',
                  color: '#93c5fd',
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                Conocer el área →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeAreas;

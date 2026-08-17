import React from 'react';
import heroBg from '../imagendefondo1.jpg';

function HomeHero({ navigate }) {
  return (
    <>
      <style>{`
        .whatsapp-btn-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .whatsapp-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .whatsapp-text {
          display: inline-block;
          transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease;
        }

        .whatsapp-icon-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, calc(-50% + 25px)) scale(0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease;
        }

        .whatsapp-btn-wrapper:hover .whatsapp-text {
          transform: translateY(-25px);
          opacity: 0;
        }

        .whatsapp-btn-wrapper:hover .whatsapp-icon-container {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      `}</style>

      <section
        id="inicio"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          padding: '240px 64px 160px 64px',
          backgroundImage: `linear-gradient(to bottom, rgba(15, 32, 67, 0.8), rgba(6, 9, 14, 0.95)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          textAlign: 'center',
          borderBottom: '1px solid rgba(30, 58, 138, 0.4)'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: '400',
              textTransform: 'none',
              letterSpacing: '0.15em',
              color: '#93c5fd',
              display: 'block',
              marginBottom: '10px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Firma de Abogados Asociados
          </span>

          <h1
            style={{
              fontSize: 'clamp(3.5rem, 4vw, 5.5rem)',
              fontWeight: '650',
              lineHeight: 1.15,
              margin: '0 0 32px 0',
              color: '#ffffff',
              letterSpacing: '0.07em',
              textTransform: 'uppercase'
            }}
          >
            LACOUTURE &amp; CORONADO
          </h1>

          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#3b82f6',
              margin: '0 auto 25px auto'
            }}
          />

          <p
            style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              lineHeight: '1.6',
              maxWidth: '740px',
              margin: '0 auto 48px auto',
              fontWeight: '300',
              letterSpacing: '0.03em'
            }}
          >
            Brindamos asesoría y defensa jurídica integral adaptada a cada
            necesidad particular o empresarial. Respaldamos cada etapa de su
            proceso con un enfoque estratégico, transparente y orientado a
            resultados seguros.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <a
              href="https://wa.me/573113361929?text=Hola,%20me%20gustaría%20solicitar%20asesoría%20jurídica."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-wrapper"
              style={{
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                padding: '16px 36px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                borderRadius: '0px',
                border: '1px solid #3b82f6',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                display: 'inline-block',
                transition:
                  'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                minWidth: '280px',
                height: '54px',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.boxShadow =
                  'rgba(59, 130, 246, 0.4) 0 8px 15px';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1e3a8a';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="whatsapp-inner">
                <span className="whatsapp-text">
                  Escríbenos por WhatsApp
                </span>

                <div className="whatsapp-icon-container">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
              </div>
            </a>

            <a
              href="#areas"
              onClick={(e) => {
                e.preventDefault();
                navigate('#areas');
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                padding: '16px 36px',
                textDecoration: 'none',
                fontWeight: '400',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                borderRadius: '0px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                display: 'inline-block',
                height: '54px',
                boxSizing: 'border-box',
                lineHeight: '20px',
                transition:
                  'all 300ms cubic-bezier(.23, 1, 0.32, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor =
                  'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Nuestras Áreas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeHero;

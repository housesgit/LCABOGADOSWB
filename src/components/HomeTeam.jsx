import React from 'react';
import socio1 from '../LACOUTURE.jpg';
import socio2 from '../CORONADO.jpg';

function HomeTeam() {
  const partners = [
    {
      name: 'Dra. Lisbeth Lacouture',
      role: 'Socia Fundadora',
      desc: 'Especialista en estructuración patrimonial y mercantil.',
      img: socio1
    },
    {
      name: 'Dr. Jesus Coronado',
      role: 'Socio Director',
      desc: 'Amplia trayectoria en resolución de disputas corporativas.',
      img: socio2
    }
  ];

  return (
    <section
      id="equipo"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '60px 0',
        backgroundColor: '#06090e',
        color: '#ffffff',
        borderBottom: '1px solid rgba(30, 58, 138, 0.3)'
      }}
    >
      <div
        className="container-padding-mobile"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            Liderazgo y Experiencia
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
            Socios Directores
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px'
          }}
        >
          {partners.map((socio) => (
            <div
              key={socio.name}
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(30, 58, 138, 0.4)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  backgroundColor: '#1e293b',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={socio.img}
                  alt={socio.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    transition:
                      'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>

              <div
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: '#60a5fa',
                      letterSpacing: '0.2em',
                      display: 'block',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    {socio.role}
                  </span>

                  <h3
                    style={{
                      color: '#f8fafc',
                      margin: '0 0 16px 0',
                      fontSize: '1.4rem',
                      fontWeight: '500'
                    }}
                  >
                    {socio.name}
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
                    {socio.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeTeam;

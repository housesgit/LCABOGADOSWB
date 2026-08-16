import React from 'react';
import socio1 from '../LACOUTURE.jpg';
import socio2 from '../CORONADO.jpg';
import PageShell from './PageShell';
import pageStyles from '../styles/pageStyles';

function FirmPage({ onBack, onNavigate }) {
  const partners = [
    { name: 'Dra. Lisbeth Lacouture', role: 'Socia Fundadora', desc: 'Especialista en estructuración patrimonial y mercantil.', img: socio1 },
    { name: 'Dr. Jesus Coronado', role: 'Socio Director', desc: 'Amplia trayectoria en resolución de disputas corporativas.', img: socio2 }
  ];

  return (
    <PageShell
      eyebrow="Liderazgo y Experiencia"
      title="La Firma"
      description="Conozca el enfoque de Lacouture & Coronado y el equipo que acompaña cada asunto con una visión estratégica, rigurosa y orientada a resultados."
      onBack={onBack}
    >
      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '28px' }}>
        {partners.map((socio) => (
          <article key={socio.name} style={{ backgroundColor: pageStyles.panelAlt, border: `1px solid ${pageStyles.border}`, overflow: 'hidden' }}>
            <div style={{ height: '430px', backgroundColor: '#1e293b', overflow: 'hidden' }}>
              <img src={socio.img} alt={socio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{socio.role}</span>
              <h2 style={{ margin: '10px 0 14px', fontSize: '1.5rem', fontWeight: 400 }}>{socio.name}</h2>
              <p style={{ color: pageStyles.muted, lineHeight: 1.7, margin: 0 }}>{socio.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}


export default FirmPage;

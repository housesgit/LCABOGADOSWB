import React from 'react';

function HomeContact({
  handleSubmit,
  enviado,
  errorEnvio,
  enviando
}) {
  return (
    <section
      id="contacto"
      className="container-padding-mobile"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '60px 64px',
        backgroundColor: '#ffffff',
        color: '#111827'
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#1e3a8a',
              display: 'block',
              marginBottom: '12px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Asesoría Legal a su Medida
          </span>

          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '500',
              margin: '0 0 16px 0',
              color: '#0f2043',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Hablemos de su caso
          </h2>

          <p
            style={{
              color: '#4b5563',
              fontSize: '1rem',
              margin: 0,
              fontWeight: '400'
            }}
          >
            Comparta los detalles de su situación. Analizaremos su
            requerimiento con total discreción y le daremos una respuesta
            clara.
          </p>
        </div>

        {enviado && (
          <div
            style={{
              backgroundColor: '#dcfce7',
              color: '#166534',
              border: '1px solid #bbf7d0',
              padding: '20px',
              borderRadius: '0px',
              marginBottom: '31px',
              fontSize: '0.9rem',
              textAlign: 'center',
              letterSpacing: '0.05em',
              fontWeight: '500'
            }}
          >
            Su solicitud ha sido registrada con éxito. Nos pondremos en
            contacto a la brevedad.
          </div>
        )}

        {errorEnvio && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
              padding: '20px',
              marginBottom: '31px',
              fontSize: '0.9rem',
              textAlign: 'center',
              letterSpacing: '0.05em',
              fontWeight: '500'
            }}
          >
            {errorEnvio}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div>
            <label>Nombre completo o Empresa</label>

            <input
              required
              name="name"
              type="text"
              placeholder="Ej. Corporación S.A."
              style={{
                width: '100%',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                padding: '16px 20px',
                color: '#111827',
                borderRadius: '0px',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label>Correo electrónico de contacto</label>

            <input
              required
              name="email"
              type="email"
              placeholder="contacto@ejemplo.com"
              style={{
                width: '100%',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                padding: '16px 20px',
                color: '#111827',
                borderRadius: '0px',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label>Detalle de la consulta</label>

            <textarea
              required
              name="message"
              rows="5"
              placeholder="Describa brevemente su requerimiento legal..."
              style={{
                width: '100%',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                padding: '16px 20px',
                color: '#111827',
                borderRadius: '0px',
                fontSize: '0.95rem',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar Consulta'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default HomeContact;

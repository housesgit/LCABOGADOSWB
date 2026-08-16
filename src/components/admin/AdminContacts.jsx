function AdminContacts({
  contactItems,
  openContact,
  deleteContact,
  updateContactStatus
}) {
  return (
    <section className="admin-panel admin-list-panel">
      <div className="admin-panel-head">
        <div>
          <span className="admin-eyebrow">Entrada</span>
          <h3>Consultas</h3>
        </div>

        <span className="admin-status published">
          {contactItems.length} recibidas
        </span>
      </div>

      {contactItems.length === 0 ? (
        <div className="admin-empty">
          <strong>No hay consultas todavía</strong>
          <p>
            Las solicitudes enviadas desde el formulario de Contacto aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Contacto</th>
                <th>Consulta</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {contactItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name || 'Sin nombre'}</strong>
                    <small>{item.email || 'Sin correo'}</small>
                  </td>

                  <td>
                    <strong>{item.subject || 'Sin asunto'}</strong>
                    <small>{item.message || 'Sin mensaje'}</small>
                  </td>

                  <td>{item.displayDate}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        item.status === 'new'
                          ? 'published'
                          : 'draft'
                      }`}
                    >
                      {item.status === 'new' ? 'Nueva' : 'Leída'}
                    </span>
                  </td>

                  <td className="admin-actions">
                    <button onClick={() => openContact(item)}>
                      Ver
                    </button>

                    {item.status === 'new' && (
                      <button
                        onClick={() =>
                          updateContactStatus(item.id, 'read')
                        }
                      >
                        Marcar leída
                      </button>
                    )}

                    <button onClick={() => deleteContact(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminContacts;

function AdminCases({
  caseItems,
  openEditor,
  deleteItem
}) {
  return (
    <section className="admin-panel admin-list-panel">
      <div className="admin-panel-head">
        <div>
          <span className="admin-eyebrow">Contenido</span>
          <h3>Casos de estudio</h3>
        </div>

        <button
          className="admin-primary-btn compact"
          onClick={() => openEditor('case')}
        >
          + Añadir caso
        </button>
      </div>

      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Caso</th>
              <th>Área</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {caseItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title || 'Sin título'}</strong>
                  <small>{item.summary}</small>
                </td>

                <td>{item.area}</td>

                <td>{item.displayDate || item.date}</td>

                <td>
                  <span
                    className={`admin-status ${
                      item.published ? 'published' : 'draft'
                    }`}
                  >
                    {item.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>

                <td className="admin-actions">
                  <button onClick={() => openEditor('case', item)}>
                    Editar
                  </button>

                  <button onClick={() => deleteItem('case', item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminCases;

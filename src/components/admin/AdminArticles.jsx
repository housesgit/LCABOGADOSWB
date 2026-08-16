function AdminArticles({
  articleItems,
  openEditor,
  deleteItem
}) {
  return (
    <section className="admin-panel admin-list-panel">
      <div className="admin-panel-head">
        <div>
          <span className="admin-eyebrow">Contenido</span>
          <h3>Artículos</h3>
        </div>

        <button
          className="admin-primary-btn compact"
          onClick={() => openEditor('article')}
        >
          + Añadir artículo
        </button>
      </div>

      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Área</th>
              <th>Autor</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {articleItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title || 'Sin título'}</strong>
                  <small>{item.snippet}</small>
                </td>

                <td>{item.area}</td>

                <td>{item.author}</td>

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
                  <button onClick={() => openEditor('article', item)}>
                    Editar
                  </button>

                  <button onClick={() => deleteItem('article', item.id)}>
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

export default AdminArticles;

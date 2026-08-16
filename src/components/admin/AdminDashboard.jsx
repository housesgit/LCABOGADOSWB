function AdminDashboard({
  caseItems,
  articleItems,
  contactItems,
  setSection,
  openEditor
}) {
  return (
    <div className="admin-dashboard-content">
      <div className="admin-stats">
        <div>
          <span>Casos</span>
          <strong>{caseItems.length}</strong>
          <small>Gestionables</small>
        </div>

        <div>
          <span>Artículos</span>
          <strong>{articleItems.length}</strong>
          <small>Gestionables</small>
        </div>

        <div>
          <span>Publicados</span>
          <strong>
            {caseItems.filter(x => x.published).length +
              articleItems.filter(x => x.published).length}
          </strong>
          <small>Visibles en web</small>
        </div>

        <div>
          <span>Consultas</span>
          <strong>
            {contactItems.filter(x => x.status === 'new').length}
          </strong>
          <small>Nuevas</small>
        </div>
      </div>

      <div className="admin-grid-two">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-eyebrow">Contenido</span>
              <h3>Últimos movimientos</h3>
            </div>
          </div>

          <div className="admin-activity">
            <div>
              <span>Casos</span>
              <strong>{caseItems[0]?.title}</strong>
              <small>Disponible para editar</small>
            </div>

            <div>
              <span>Artículos</span>
              <strong>{articleItems[0]?.title}</strong>
              <small>Disponible para editar</small>
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-eyebrow">Acciones</span>
              <h3>Acceso rápido</h3>
            </div>
          </div>

          <div className="admin-quick">
            <button
              onClick={() => {
                setSection('cases');
                openEditor('case');
              }}
            >
              + Nuevo caso
            </button>

            <button
              onClick={() => {
                setSection('articles');
                openEditor('article');
              }}
            >
              + Nuevo artículo
            </button>

            <button onClick={() => setSection('contacts')}>
              Ver consultas
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;

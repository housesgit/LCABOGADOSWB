function AdminSettings() {
  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <span className="admin-eyebrow">Control</span>
          <h3>Configuración y usuarios</h3>
        </div>
      </div>

      <div className="admin-user-grid">
        <article>
          <span className="admin-role">SUPER ADMIN</span>
          <h4>Administrador principal</h4>
          <p>
            Acceso completo a contenido, consultas, usuarios y configuración.
          </p>
          <small>
            Cuenta individual recomendada para la persona que gestiona la web.
          </small>
        </article>

        <article>
          <span className="admin-role editor">EDITOR</span>
          <h4>Abogado 1</h4>
          <p>
            Puede crear, editar y publicar casos y artículos y revisar consultas.
          </p>
          <small>
            Cuenta individual. No comparte contraseña.
          </small>
        </article>

        <article>
          <span className="admin-role editor">EDITOR</span>
          <h4>Abogado 2</h4>
          <p>
            Puede crear, editar y publicar casos y artículos y revisar consultas.
          </p>
          <small>
            Cuenta individual. No comparte contraseña.
          </small>
        </article>
      </div>

      <div className="admin-security-note wide">
        En producción, cada persona tendrá su propio correo y contraseña
        mediante Supabase Auth. No se deben guardar contraseñas dentro de
        App.jsx ni compartir una contraseña entre los tres administradores.
      </div>
    </section>
  );
}

export default AdminSettings;

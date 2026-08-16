import React, { useEffect, useState } from 'react';
import logo from '../logo.png';
import { supabase } from '../supabaseClient';
import ArticleEditor from './ArticleEditor';
import AdminDashboard from './admin/AdminDashboard';
import AdminCases from './admin/AdminCases';
import AdminArticles from './admin/AdminArticles';
import AdminContacts from './admin/AdminContacts';
import AdminSettings from './admin/AdminSettings';
import AdminCaseEditor from './admin/AdminCaseEditor';
function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [section, setSection] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [caseItems, setCaseItems] = useState([]);
  const [articleItems, setArticleItems] = useState([]);
  const [contactItems, setContactItems] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editor, setEditor] = useState(null);
  const [editorType, setEditorType] = useState(null);
  const [adminNotice, setAdminNotice] = useState('');

  // Comprueba la sesión existente al entrar en /admin y mantiene
  // el estado sincronizado con Supabase Auth.
  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        setAuthError('No se pudo comprobar la sesión. Inténtalo de nuevo.');
        setLoggedIn(false);
      } else {
        setLoggedIn(Boolean(data?.session));
      }

      setAuthLoading(false);
    };

    loadSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      setLoggedIn(Boolean(session));

      if (event === 'SIGNED_OUT') {
        setEmail('');
        setPassword('');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

    useEffect(() => {
    if (!loggedIn) return;

    const loadContent = async () => {
      const [
        { data: articlesData, error: articlesError },
        { data: casesData, error: casesError },
        { data: contactsData, error: contactsError }
      ] = await Promise.all([
        supabase
          .from('articles')
          .select('*')
          .order('article_date', { ascending: false }),

        supabase
          .from('cases')
          .select('*')
          .order('case_date', { ascending: false }),

        supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (articlesError) {
        console.error('Error cargando artículos:', articlesError);
        setAdminNotice('No se pudieron cargar los artículos desde Supabase.');
        return;
      }

      if (casesError) {
        console.error('Error cargando casos:', casesError);
        setAdminNotice('No se pudieron cargar los casos desde Supabase.');
        return;
      }

      if (contactsError) {
        console.error('Error cargando consultas:', contactsError);
        setAdminNotice('No se pudieron cargar las consultas desde Supabase.');
        return;
      }

      const mappedArticles = (articlesData || []).map((item) => ({
        ...item,
        date: item.article_date || '',
        displayDate: item.article_date
          ? new Date(`${item.article_date}T00:00:00`).toLocaleDateString('es-ES')
          : '',
        published: item.status === 'published',
        body: item.body || '',
      }));

      const mappedCases = (casesData || []).map((item) => ({
        ...item,
        date: item.case_date || '',
        displayDate: item.case_date
          ? new Date(`${item.case_date}T00:00:00`).toLocaleDateString('es-ES')
          : '',
        published: item.status === 'published'
      }));

      const mappedContacts = (contactsData || []).map((item) => ({
        ...item,
        displayDate: item.created_at
          ? new Date(item.created_at).toLocaleString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : '',
        status: item.status || 'new'
      }));

      setArticleItems(mappedArticles);
      setCaseItems(mappedCases);
      setContactItems(mappedContacts);
    };

    loadContent();
  }, [loggedIn]);
  
    const openContact = async (contact) => {
    setSelectedContact(contact);

    // Al abrir una consulta nueva, la marcamos automáticamente como leída.
    if (contact.status !== 'new') return;

    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: 'read' })
      .eq('id', contact.id);

    if (error) {
      console.error('Error marcando consulta como leída:', error);
      setAdminNotice('No se pudo marcar la consulta como leída.');
      return;
    }

    const updatedContact = {
      ...contact,
      status: 'read'
    };

    setContactItems((current) =>
      current.map((item) =>
        item.id === contact.id
          ? updatedContact
          : item
      )
    );

    setSelectedContact(updatedContact);
  };

  const closeContact = () => {
    setSelectedContact(null);
  };

  const updateContactStatus = async (contactId, status) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', contactId);

    if (error) {
      console.error('Error actualizando estado:', error);
      setAdminNotice('No se pudo actualizar el estado de la consulta.');
      return;
    }

    setContactItems((current) =>
      current.map((item) =>
        item.id === contactId
          ? { ...item, status }
          : item
      )
    );

    setSelectedContact((current) =>
      current && current.id === contactId
        ? { ...current, status }
        : current
    );

    setAdminNotice('Estado de la consulta actualizado.');
  };

  const deleteContact = async (contactId) => {
    const confirmed = window.confirm(
      '¿Seguro que quieres eliminar esta consulta? Esta acción no se puede deshacer.'
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', contactId);

    if (error) {
      console.error('Error eliminando consulta:', error);
      setAdminNotice('No se pudo eliminar la consulta.');
      return;
    }

    setContactItems((current) =>
      current.filter((item) => item.id !== contactId)
    );

    setSelectedContact(null);
    setAdminNotice('Consulta eliminada correctamente.');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setAuthError('Introduce tu correo electrónico y contraseña.');
      return;
    }

    setAuthSubmitting(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      setAuthError('Correo electrónico o contraseña incorrectos.');
      setAuthSubmitting(false);
      return;
    }

    setPassword('');
    setAuthSubmitting(false);
  };

  const handleLogout = async () => {
    setAuthError('');

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError('No se pudo cerrar la sesión. Inténtalo de nuevo.');
    }
  };

  const openEditor = (type, item = null) => {
  setEditorType(type);

  if (type === 'article') {
    setEditor(
      item
        ? { ...item }
        : {
            id: `nuevo-articulo-${Date.now()}`,
            date: new Date().toISOString().slice(0, 10),
            displayDate: '',
            author: '',
            area: 'Derecho Comercial',
            keywords: [],
            title: '',
            slug: '',
            snippet: '',
            intro: '',
            body: '',
            published: false
          }
    );

    return;
  }

  setEditor(
    item
      ? { ...item }
      : {
          id: `nuevo-caso-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          displayDate: '',
          area: 'Derecho Comercial',
          category: 'Comercial',
          keywords: [],
          title: '',
          slug: '',
          summary: '',
          context: '',
          strategy: '',
          result: '',
          tags: [],
          published: false
        }
  );
};

  const closeEditor = () => {
    setEditor(null);
    setEditorType(null);
  };

  const saveEditor = async () => {
    if (!editor?.title?.trim()) {
      setAdminNotice('El título es obligatorio.');
      return;
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setAdminNotice('No se pudo identificar al usuario autenticado.');
      return;
    }

    if (editorType === 'case') {
      const caseData = {
        title: editor.title.trim(),
        slug: editor.slug || editor.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/^-|-$/g, ''),
        area: editor.area || null,
        category: editor.category || null,
        case_date: editor.date || null,
        summary: editor.summary || null,
        context: editor.context || null,
        strategy: editor.strategy || null,
        result: editor.result || null,
        keywords: Array.isArray(editor.keywords)
          ? editor.keywords
          : [],
        tags: Array.isArray(editor.tags)
          ? editor.tags
          : [],
        status: editor.published ? 'published' : 'draft',
        created_by: user.id
      };

      const isExistingCase =
        editor.id &&
        !String(editor.id).startsWith('nuevo-caso-');

      let data;
      let error;

      if (isExistingCase) {
        ({ data, error } = await supabase
          .from('cases')
          .update(caseData)
          .eq('id', editor.id)
          .select()
          .single());
      } else {
        ({ data, error } = await supabase
          .from('cases')
          .insert(caseData)
          .select()
          .single());
      }

      if (error) {
        console.error('Error guardando caso:', error);
        setAdminNotice(`No se pudo guardar el caso: ${error.message}`);
        return;
      }

      const mappedCase = {
        ...data,
        date: data.case_date || '',
        displayDate: data.case_date
          ? new Date(`${data.case_date}T00:00:00`).toLocaleDateString('es-ES')
          : '',
        published: data.status === 'published'
      };

      setCaseItems((prev) => {
        const exists = prev.some((item) => item.id === mappedCase.id);

        return exists
          ? prev.map((item) =>
              item.id === mappedCase.id ? mappedCase : item
            )
          : [mappedCase, ...prev];
      });

      setAdminNotice(
        isExistingCase
          ? 'Caso actualizado correctamente.'
          : 'Caso creado correctamente.'
      );

      closeEditor();
      return;
    }

    const articleData = {
      title: editor.title.trim(),
      slug: editor.slug || editor.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/^-|-$/g, ''),
      author: editor.author || null,
      area: editor.area || null,
      article_date: editor.date || null,
      snippet: editor.snippet || null,
      intro: editor.intro || null,
      body: editor.body || '',
      status: editor.published ? 'published' : 'draft',
      created_by: user.id
    };

    const isExistingArticle =
      editor.id &&
      !String(editor.id).startsWith('nuevo-articulo-');

    let data;
    let error;

    if (isExistingArticle) {
      ({ data, error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editor.id)
        .select()
        .single());
    } else {
      ({ data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single());
    }

    if (error) {
      console.error('Error guardando artículo:', error);
      setAdminNotice(`No se pudo guardar el artículo: ${error.message}`);
      return;
    }

    const mappedArticle = {
      ...data,
      date: data.article_date || '',
      displayDate: data.article_date
        ? new Date(`${data.article_date}T00:00:00`).toLocaleDateString('es-ES')
        : '',
      published: data.status === 'published',
      body: data.body || ''
    };

    setArticleItems((prev) => {
      const exists = prev.some((item) => item.id === mappedArticle.id);

      return exists
        ? prev.map((item) =>
            item.id === mappedArticle.id ? mappedArticle : item
          )
        : [mappedArticle, ...prev];
    });

    setAdminNotice(
      isExistingArticle
        ? 'Artículo actualizado correctamente.'
        : 'Artículo creado correctamente.'
    );

    closeEditor();
  };

  const deleteItem = async (type, id) => {
  if (!window.confirm('¿Seguro que quieres eliminar este elemento?')) return;

  const table = type === 'case' ? 'cases' : 'articles';

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error eliminando ${type}:`, error);
    setAdminNotice(`No se pudo eliminar: ${error.message}`);
    return;
  }

  if (type === 'case') {
    setCaseItems((prev) => prev.filter((item) => item.id !== id));
    setAdminNotice('Caso eliminado correctamente.');
  } else {
    setArticleItems((prev) => prev.filter((item) => item.id !== id));
    setAdminNotice('Artículo eliminado correctamente.');
  }
};

  if (authLoading) {
    return (
      <div className="admin-app admin-login-shell">
        <div className="admin-login-card">
          <div className="admin-login-logo-box">
            <img
              src={logo}
              alt="LC Abogados"
              className="admin-login-logo"
              style={{ width: 28, height: 28, maxWidth: 28, maxHeight: 28, minWidth: 28, minHeight: 28, objectFit: "contain", display: "block" }}
            />
          </div>
          <span className="admin-eyebrow">Área privada</span>
          <h1>Administración</h1>
          <p>Comprobando sesión...</p>
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="admin-app admin-login-shell">
        <div className="admin-login-card">
          <div className="admin-login-logo-box">
            <img
              src={logo}
              alt="LC Abogados"
              className="admin-login-logo"
              style={{ width: 28, height: 28, maxWidth: 28, maxHeight: 28, minWidth: 28, minHeight: 28, objectFit: "contain", display: "block" }}
            />
          </div>

          <span className="admin-eyebrow">Área privada</span>
          <h1>Administración</h1>
          <p>Gestiona casos, artículos y el contenido de LC Abogados desde un único panel.</p>

          <form onSubmit={handleLogin}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="nombre@lcabogados.com"
                autoComplete="email"
                required
                disabled={authSubmitting}
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={authSubmitting}
              />
            </label>

            {authError && (
              <div
                role="alert"
                style={{
                  marginTop: '10px',
                  marginBottom: '4px',
                  padding: '11px 13px',
                  borderRadius: '8px',
                  border: '1px solid rgba(185, 28, 28, 0.18)',
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: '0.78rem',
                  lineHeight: 1.45
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="admin-primary-btn"
              disabled={authSubmitting}
              style={{ opacity: authSubmitting ? 0.7 : 1 }}
            >
              {authSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="admin-security-note">
            Acceso protegido mediante Supabase Auth. Cada administrador utiliza su propia cuenta y contraseña.
          </div>

          <button
            className="admin-back-link"
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            ← Volver a la web
          </button>
        </div>
      </div>
    );
  }

  const menu = [
    ['dashboard', 'Dashboard'], ['cases', 'Casos'], ['articles', 'Artículos'], ['contacts', 'Consultas'], ['settings', 'Configuración']
  ];

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-logo-box">
            <img
              src={logo}
              alt="LC Abogados"
              style={{ width: 22, height: 22, maxWidth: 22, maxHeight: 22, minWidth: 22, minHeight: 22, objectFit: "contain", display: "block" }}
            />
          </div>
          <div>
            <strong>LC ABOGADOS</strong>
            <span>Administración</span>
          </div>
        </div>

        <nav>
          {menu.map(([key, label]) => (
            <button
              key={key}
              className={section === key ? 'active' : ''}
              onClick={() => setSection(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-user">
          <span className="admin-avatar">A</span>
          <div>
            <strong>Administrador</strong>
            <small>Acceso total</small>
          </div>
          <button title="Cerrar sesión" onClick={handleLogout}>↪</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">LC Abogados</span>
            <h2>{menu.find(([key]) => key === section)?.[1]}</h2>
          </div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            Ver sitio ↗
          </a>
        </header>

        {adminNotice && (
          <div className="admin-notice">
            {adminNotice}
            <button onClick={() => setAdminNotice('')}>×</button>
          </div>
        )}

        {section === 'dashboard' && (
          <AdminDashboard
            caseItems={caseItems}
            articleItems={articleItems}
            contactItems={contactItems}
            setSection={setSection}
            openEditor={openEditor}
          />
        )}        {section === 'cases' && (
          <AdminCases
            caseItems={caseItems}
            openEditor={openEditor}
            deleteItem={deleteItem}
          />
        )}

        {section === 'articles' && (
          <AdminArticles
            articleItems={articleItems}
            openEditor={openEditor}
            deleteItem={deleteItem}
          />
        )}

        {section === 'contacts' && (
          <AdminContacts
            contactItems={contactItems}
            openContact={openContact}
            deleteContact={deleteContact}
            updateContactStatus={updateContactStatus}
          />
        )}

        {section === 'settings' && (
          <AdminSettings />
        )}

        {editor && editorType === 'case' && (
          <AdminCaseEditor
            editor={editor}
            setEditor={setEditor}
            closeEditor={closeEditor}
            saveEditor={saveEditor}
          />
        )}
            </main>

      {editor && editorType === 'article' && (
        <ArticleEditor
          article={editor}
          setArticle={setEditor}
          onClose={closeEditor}
          onSave={saveEditor}
        />
      )}

      <style>{`
        .admin-app{min-height:100vh;background:#f5f7fb;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex}
        .admin-sidebar{width:250px;background:#07101d;color:#e2e8f0;min-height:100vh;padding:26px 18px 18px;display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0}
        .admin-brand{display:flex;align-items:center;gap:12px;padding:4px 10px 28px;border-bottom:1px solid rgba(255,255,255,.08)}
        .admin-brand img{width:28px;height:28px;object-fit:contain}.admin-brand strong{display:block;font-size:.78rem;letter-spacing:.16em}.admin-brand span{display:block;color:#7f8da2;font-size:.68rem;margin-top:4px}
        .admin-sidebar nav{display:flex;flex-direction:column;gap:6px;padding-top:22px}.admin-sidebar nav button{border:0;background:transparent;color:#9aa9bc;text-align:left;padding:12px 14px;border-radius:8px;font-size:.82rem;cursor:pointer}.admin-sidebar nav button:hover,.admin-sidebar nav button.active{background:#102038;color:#fff}
        .admin-sidebar-user{margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding:16px 6px 0;display:flex;align-items:center;gap:9px}.admin-avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#1e3a8a;color:white;font-size:.75rem}.admin-sidebar-user div{min-width:0;flex:1}.admin-sidebar-user strong,.admin-sidebar-user small{display:block}.admin-sidebar-user strong{font-size:.74rem}.admin-sidebar-user small{color:#7f8da2;font-size:.64rem;margin-top:2px}.admin-sidebar-user button{background:none;border:0;color:#94a3b8;cursor:pointer;font-size:18px}
        .admin-main{margin-left:250px;flex:1;padding:34px 44px 60px;max-width:1500px}.admin-topbar{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:28px}.admin-topbar h2{font-size:2rem;font-weight:450;margin:2px 0 0}.admin-topbar>a{color:#1e3a8a;text-decoration:none;font-size:.8rem}
        .admin-eyebrow{color:#5278aa;font-size:.64rem;text-transform:uppercase;letter-spacing:.18em}.admin-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.admin-stats>div,.admin-panel{background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 8px 28px rgba(15,23,42,.05)}.admin-stats>div{padding:20px}.admin-stats span,.admin-stats small{display:block;color:#64748b;font-size:.68rem}.admin-stats strong{display:block;font-size:2rem;font-weight:500;margin:7px 0 2px}.admin-grid-two{display:grid;grid-template-columns:1.3fr .7fr;gap:18px}.admin-panel{padding:24px}.admin-panel-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:18px}.admin-panel h3{margin:3px 0 0;font-size:1.15rem;font-weight:500}.admin-activity>div{padding:14px 0;border-top:1px solid #eef2f7}.admin-activity span,.admin-activity small{display:block;color:#64748b;font-size:.68rem}.admin-activity strong{display:block;margin:5px 0;font-size:.86rem;font-weight:500}.admin-quick{display:grid;gap:9px}.admin-quick button,.admin-secondary-btn{border:1px solid #d8e0ea;background:#fff;color:#334155;padding:11px 14px;border-radius:8px;cursor:pointer;text-align:left}.admin-primary-btn{border:0;background:#163d75;color:#fff;padding:12px 16px;border-radius:8px;cursor:pointer;font-size:.78rem}.admin-primary-btn.compact{padding:9px 13px}.admin-primary-btn:disabled{cursor:not-allowed}.admin-demo-btn{border:0;background:transparent;color:#5278aa;padding:10px;cursor:pointer;font-size:.72rem}.admin-notice{background:#eaf2ff;border:1px solid #cbdcf5;color:#234a7d;padding:11px 14px;border-radius:8px;margin-bottom:18px;font-size:.78rem;display:flex;justify-content:space-between}.admin-notice button{border:0;background:none;cursor:pointer;color:inherit}.admin-table-wrap{overflow:auto}.admin-table-wrap table{width:100%;border-collapse:collapse;font-size:.75rem}.admin-table-wrap th{text-align:left;color:#64748b;font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;padding:10px;border-bottom:1px solid #e2e8f0}.admin-table-wrap td{padding:14px 10px;border-bottom:1px solid #eef2f7;vertical-align:top}.admin-table-wrap td strong,.admin-table-wrap td small{display:block}.admin-table-wrap td small{color:#64748b;margin-top:4px;max-width:420px;line-height:1.4}.admin-status{padding:5px 8px;border-radius:999px;font-size:.62rem}.admin-status.published{background:#eaf7ef;color:#19733c}.admin-status.draft{background:#f1f5f9;color:#64748b}.admin-actions{white-space:nowrap}.admin-actions button{border:0;background:none;color:#1e3a8a;cursor:pointer;font-size:.7rem;margin-left:8px}.admin-empty{border:1px dashed #d5deea;padding:35px;border-radius:10px;text-align:center;color:#64748b}.admin-empty strong{color:#334155}.admin-empty p{max-width:620px;margin:10px auto 18px;line-height:1.6;font-size:.82rem}.admin-user-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.admin-user-grid article{border:1px solid #e2e8f0;border-radius:10px;padding:18px}.admin-role{font-size:.6rem;letter-spacing:.14em;color:#1e3a8a}.admin-role.editor{color:#64748b}.admin-user-grid h4{margin:8px 0;font-size:.9rem}.admin-user-grid p,.admin-user-grid small{color:#64748b;font-size:.74rem;line-height:1.5}.admin-user-grid small{display:block;margin-top:10px}.admin-security-note{font-size:.66rem;color:#718096;line-height:1.55;margin-top:14px}.admin-security-note.wide{margin-top:20px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px}.admin-modal-backdrop{position:fixed;inset:0;background:rgba(2,8,23,.62);display:grid;place-items:center;padding:24px;z-index:2000}.admin-modal{background:#fff;width:min(900px,100%);max-height:90vh;overflow:auto;border-radius:14px;padding:24px}.admin-modal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.admin-modal-head h3{margin:4px 0 0}.admin-modal-head>button{border:0;background:#f1f5f9;border-radius:50%;width:32px;height:32px;cursor:pointer}.admin-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.admin-form-grid label{font-size:.7rem;color:#475569}.admin-form-grid label.wide{grid-column:1/-1}.admin-form-grid input,.admin-form-grid select,.admin-form-grid textarea{display:block;width:100%;box-sizing:border-box;margin-top:6px;border:1px solid #d8e0ea;border-radius:7px;padding:10px;background:#fff;color:#0f172a;font:inherit}.admin-form-grid textarea{min-height:100px;resize:vertical}.toggle-field{grid-column:1/-1;display:flex;align-items:center;gap:8px}.toggle-field input{width:auto!important;margin:0!important}.admin-modal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:20px}.admin-login-shell{min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 0%,#13213a 0,#07101d 55%,#050b14 100%);padding:24px}.admin-login-card{width:min(420px,100%);background:rgba(255,255,255,.97);border-radius:16px;padding:34px;box-shadow:0 30px 80px rgba(0,0,0,.35)}.admin-login-logo-box{width:46px;height:46px;border-radius:10px;background:#07101d;display:grid;place-items:center;margin-bottom:18px}.admin-login-card h1{font-size:2rem;font-weight:500;margin:8px 0}.admin-login-card>p{color:#64748b;font-size:.82rem;line-height:1.55;margin:0 0 24px}.admin-login-card form{display:grid;gap:14px}.admin-login-card label{font-size:.7rem;color:#475569}.admin-login-card input{display:block;width:100%;box-sizing:border-box;margin-top:6px;border:1px solid #d8e0ea;border-radius:8px;padding:12px;background:#fff;color:#0f172a;font:inherit}.admin-login-card input:focus{outline:none;border-color:#5d84b5;box-shadow:0 0 0 3px rgba(93,132,181,.12)}.admin-login-card form .admin-primary-btn{width:100%;margin-top:2px}.admin-back-link{display:block;border:0;background:none;color:#5278aa;margin:20px auto 0;cursor:pointer;font-size:.72rem}.admin-demo-btn{display:none}
        @media (max-width: 900px){.admin-sidebar{width:210px}.admin-main{margin-left:210px;padding:28px 22px}.admin-stats{grid-template-columns:repeat(2,1fr)}.admin-grid-two,.admin-user-grid{grid-template-columns:1fr}.admin-form-grid{grid-template-columns:1fr}.admin-form-grid label.wide,.toggle-field{grid-column:auto}}
        @media (max-width: 700px){.admin-sidebar{position:static;width:100%;min-height:auto;padding:14px;box-sizing:border-box}.admin-app{display:block}.admin-sidebar nav{display:grid;grid-template-columns:repeat(2,1fr);padding-top:12px}.admin-sidebar-user{margin-top:14px}.admin-main{margin-left:0;padding:20px 14px 40px}.admin-topbar{align-items:flex-start}.admin-topbar h2{font-size:1.5rem}.admin-login-card{padding:26px 22px}.admin-table-wrap{margin:0 -8px}.admin-table-wrap table{min-width:650px}}
        
                /* RICH TEXT EDITOR */

        .rich-editor {
          width: 100%;
          margin-top: 8px;
          background: #f1f3f6;
          border: 1px solid #d8e0ea;
          border-radius: 10px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .rich-editor-toolbar {
          min-height: 52px;
          padding: 8px 10px;
          background: #ffffff;
          border-bottom: 1px solid #dfe5ec;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .rich-toolbar-group {
          display: flex;
          align-items: center;
          gap: 2px;
          padding-right: 8px;
          margin-right: 4px;
          border-right: 1px solid #e5e7eb;
        }

        .rich-toolbar-group:last-child {
          border-right: 0;
        }

        .rich-toolbar-group button {
          width: 34px;
          height: 32px;
          border: 0;
          border-radius: 5px;
          background: transparent;
          color: #334155;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
        }

        .rich-toolbar-group button:hover {
          background: #eef3f9;
        }

        .rich-toolbar-group button.active {
          background: #dbe8f7;
          color: #163d75;
        }

        .rich-toolbar-group button:disabled {
          opacity: .35;
          cursor: default;
        }

        .rich-editor > .ProseMirror {
          width: min(820px, calc(100% - 80px));
          min-height: 620px;
          margin: 34px auto;
          padding: 70px 80px;
          box-sizing: border-box;
          background: #ffffff;
          color: #1e293b;
          outline: none;
          box-shadow: 0 4px 18px rgba(15, 23, 42, .08);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          line-height: 1.8;
        }

        .rich-editor > .ProseMirror p {
          margin: 0 0 1.15em;
        }

        .rich-editor > .ProseMirror h1,
        .rich-editor > .ProseMirror h2,
        .rich-editor > .ProseMirror h3 {
          color: #0f172a;
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.25;
        }

        .rich-editor > .ProseMirror h1 {
          font-size: 2.1rem;
          margin: 0 0 24px;
        }

        .rich-editor > .ProseMirror h2 {
          font-size: 1.65rem;
          margin: 32px 0 16px;
        }

        .rich-editor > .ProseMirror h3 {
          font-size: 1.3rem;
          margin: 26px 0 12px;
        }

        .rich-editor > .ProseMirror ul,
        .rich-editor > .ProseMirror ol {
          padding-left: 28px;
          margin: 0 0 20px;
        }

        .rich-editor > .ProseMirror blockquote {
          margin: 28px 0;
          padding: 16px 22px;
          border-left: 4px solid #1e3a8a;
          background: #f7f9fc;
          color: #475569;
          font-style: italic;
        }

        .rich-editor > .ProseMirror a {
          color: #1e3a8a;
          text-decoration: underline;
        }

        .rich-editor > .ProseMirror img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 28px auto;
        }

        .rich-editor > .ProseMirror table {
          width: 100%;
          border-collapse: collapse;
          margin: 28px 0;
          table-layout: fixed;
        }

        .rich-editor > .ProseMirror th,
        .rich-editor > .ProseMirror td {
          border: 1px solid #cbd5e1;
          padding: 10px 12px;
          vertical-align: top;
          text-align: left;
        }

        .rich-editor > .ProseMirror th {
          background: #f1f5f9;
          font-weight: 600;
        }

        .rich-editor > .ProseMirror .selectedCell {
          background: #e8f0fb;
        }

        .rich-editor > .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          float: left;
          height: 0;
          pointer-events: none;
        }

        .rich-editor-footer {
          min-height: 36px;
          padding: 8px 14px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border-top: 1px solid #dfe5ec;
          color: #64748b;
          font-size: .65rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .rich-editor-loading {
          min-height: 500px;
          display: grid;
          place-items: center;
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #d8e0ea;
          border-radius: 10px;
        }

        .article-content-field {
          min-width: 0;
        }

        @media (max-width: 900px) {
          .rich-editor > .ProseMirror {
            width: calc(100% - 30px);
            padding: 45px 30px;
          }
        }

        @media (max-width: 600px) {
          .rich-editor-toolbar {
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          .rich-editor > .ProseMirror {
            width: calc(100% - 16px);
            min-height: 500px;
            margin: 16px auto;
            padding: 35px 22px;
            font-size: 16px;
          }

          .rich-editor-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

      `}</style>
    </div>
  );
}


export default AdminPage;

import React from 'react';

function AdminCaseEditor({ editor, setEditor, closeEditor, saveEditor }) {
  if (!editor) return null;

  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && closeEditor()}
    >
      <div className="admin-modal">
        <div className="admin-modal-head">
          <div>
            <span className="admin-eyebrow">Editor</span>
            <h3>{editor.title ? 'Editar caso' : 'Nuevo caso'}</h3>
          </div>

          <button onClick={closeEditor}>×</button>
        </div>

        <div className="admin-form-grid">
          <label>
            Título
            <input
              value={editor.title || ''}
              onChange={(e) =>
                setEditor({ ...editor, title: e.target.value })
              }
            />
          </label>

          <label>
            Área
            <select
              value={editor.area || ''}
              onChange={(e) =>
                setEditor({ ...editor, area: e.target.value })
              }
            >
              <option>Derecho Civil</option>
              <option>Derecho Laboral</option>
              <option>Derecho Penal</option>
              <option>Derecho Comercial</option>
              <option>Derecho Administrativo</option>
            </select>
          </label>

          <label>
            Categoría
            <input
              value={editor.category || ''}
              onChange={(e) =>
                setEditor({ ...editor, category: e.target.value })
              }
            />
          </label>

          <label>
            Fecha
            <input
              type="date"
              value={editor.date || ''}
              onChange={(e) =>
                setEditor({ ...editor, date: e.target.value })
              }
            />
          </label>

          <label className="wide">
            Resumen
            <textarea
              value={editor.summary || ''}
              onChange={(e) =>
                setEditor({ ...editor, summary: e.target.value })
              }
            />
          </label>

          <label className="wide">
            Contexto
            <textarea
              value={editor.context || ''}
              onChange={(e) =>
                setEditor({ ...editor, context: e.target.value })
              }
            />
          </label>

          <label className="wide">
            Estrategia
            <textarea
              value={editor.strategy || ''}
              onChange={(e) =>
                setEditor({ ...editor, strategy: e.target.value })
              }
            />
          </label>

          <label className="wide">
            Resultado
            <textarea
              value={editor.result || ''}
              onChange={(e) =>
                setEditor({ ...editor, result: e.target.value })
              }
            />
          </label>

          <label className="toggle-field">
            <input
              type="checkbox"
              checked={Boolean(editor.published)}
              onChange={(e) =>
                setEditor({
                  ...editor,
                  published: e.target.checked
                })
              }
            />
            Publicar en la web
          </label>
        </div>

        <div className="admin-modal-actions">
          <button
            className="admin-secondary-btn"
            onClick={closeEditor}
          >
            Cancelar
          </button>

          <button
            className="admin-primary-btn"
            onClick={saveEditor}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCaseEditor;

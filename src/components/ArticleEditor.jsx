import RichTextEditor from './RichTextEditor';

function ArticleEditor({ article, setArticle, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: '#f4f5f7',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <header
        style={{
          height: '64px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            border: 0,
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#475569'
          }}
        >
          ← Volver a artículos
        </button>

        <div
          style={{
            fontSize: '12px',
            color: '#163d75',
            letterSpacing: '0.12em',
            fontWeight: 600
          }}
        >
          LC ABOGADOS · EDITOR
        </div>

        <div style={{ width: '120px' }} />
      </header>

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '50px 24px'
        }}
      >
        <div
          style={{
            width: 'min(850px, 100%)',
            minHeight: '800px',
            margin: '0 auto',
            background: '#ffffff',
            padding: '70px 80px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)'
          }}
        >
          <input
            value={article.title || ''}
            onChange={(e) =>
              setArticle({
                ...article,
                title: e.target.value
              })
            }
            placeholder="Título del artículo"
            style={{
              width: '100%',
              border: 0,
              outline: 0,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '42px',
              lineHeight: 1.2,
              color: '#172033',
              marginBottom: '30px',
              boxSizing: 'border-box'
            }}
          />

          <RichTextEditor
            value={article.body || ''}
            onChange={(html) =>
              setArticle({
                ...article,
                body: html
              })
            }
            placeholder="Comienza a escribir..."
          />
        </div>
      </main>
    </div>
  );
}

export default ArticleEditor;

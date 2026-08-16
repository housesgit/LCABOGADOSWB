import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';


function RichTextEditor({ value, onChange, placeholder = 'Comienza a escribir...' }) {
  const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Image,
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https'
    }),

    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),

    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({
      placeholder
    })
  ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return (
      <div className="rich-editor-loading">
        Cargando editor...
      </div>
    );
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Introduce la URL:', previousUrl || '');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({ href: url })
      .run();
  };

  const addImage = () => {
    const url = window.prompt('Introduce la URL de la imagen:');

    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({ src: url })
      .run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true
      })
      .run();
  };

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar">

        <div className="rich-toolbar-group">
          <button
            type="button"
            className={editor.isActive('bold') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Negrita"
          >
            <strong>B</strong>
          </button>

          <button
            type="button"
            className={editor.isActive('italic') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Cursiva"
          >
            <em>I</em>
          </button>

          <button
            type="button"
            className={editor.isActive('underline') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Subrayado"
          >
            <u>U</u>
          </button>

          <button
            type="button"
            className={editor.isActive('strike') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Tachado"
          >
            <s>S</s>
          </button>
        </div>

        <div className="rich-toolbar-group">
          <button
            type="button"
            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            title="Título"
          >
            H2
          </button>

          <button
            type="button"
            className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            title="Subtítulo"
          >
            H3
          </button>

          <button
            type="button"
            className={editor.isActive('blockquote') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            title="Cita"
          >
            ❝
          </button>
        </div>

        <div className="rich-toolbar-group">
          <button
            type="button"
            className={editor.isActive('bulletList') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            title="Lista"
          >
            •
          </button>

          <button
            type="button"
            className={editor.isActive('orderedList') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            title="Lista numerada"
          >
            1.
          </button>
        </div>

        <div className="rich-toolbar-group">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign('left').run()
            }
            title="Alinear izquierda"
          >
            ≡
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign('center').run()
            }
            title="Centrar"
          >
            ≡
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().setTextAlign('right').run()
            }
            title="Alinear derecha"
          >
            ≡
          </button>
        </div>

        <div className="rich-toolbar-group">
          <button
            type="button"
            onClick={addLink}
            className={editor.isActive('link') ? 'active' : ''}
            title="Insertar enlace"
          >
            🔗
          </button>

          <button
            type="button"
            onClick={addImage}
            title="Insertar imagen"
          >
            🖼
          </button>

          <button
            type="button"
            onClick={addTable}
            title="Insertar tabla"
          >
            ▦
          </button>
        </div>

        <div className="rich-toolbar-group rich-toolbar-history">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Deshacer"
          >
            ↶
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rehacer"
          >
            ↷
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="rich-editor-footer">
  <span>
    {editor.getText().length} caracteres
  </span>

  <span>
    Puedes pegar contenido directamente desde Word o Google Docs.
  </span>
</div>
    </div>
  );
} 


export default RichTextEditor;

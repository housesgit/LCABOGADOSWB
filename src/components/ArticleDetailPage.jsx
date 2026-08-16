import React from 'react';
import PageShell from './PageShell';
import ArticlesPage from './ArticlesPage';
import pageStyles from '../styles/pageStyles';

function ArticleDetailPage({ article, onNavigate }) {
  if (!article) {
    return (
      <ArticlesPage
        onBack={() => onNavigate('#inicio')}
        onNavigate={onNavigate}
        articles={[]}
      />
    );
  }

  return (
    <PageShell
      eyebrow={`${article.area} · ${article.displayDate}`}
      mobileMeta={
        <>
          <span>{article.area}</span>
          <span>{article.displayDate}</span>
        </>
      }
      title={article.title}
      description={null}
      headingAlign="left"
      headingMaxWidth="920px"
      headingClassName="article-detail-heading"
      onBack={() => onNavigate('#articulos')}
    >
      <article
        className="dedicated-article-card article-editorial"
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          backgroundColor: pageStyles.panelAlt,
          border: `1px solid ${pageStyles.border}`,
          padding: '48px 54px'
        }}
      >
        <header
          className="article-editorial-meta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            paddingBottom: '18px',
            marginBottom: '34px',
            borderBottom: '1px solid rgba(30,58,138,0.25)',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.13em'
          }}
        >
          <span style={{ color: pageStyles.blue }}>{article.author}</span>
          <span style={{ color: '#7890ad', textAlign: 'right' }}>
            {article.displayDate}
          </span>
        </header>

        <p
          className="article-editorial-lead"
          style={{
            color: '#d6deea',
            lineHeight: 1.9,
            fontSize: '1.18rem',
            margin: '0 0 34px',
            fontWeight: 400
          }}
        >
          {article.intro}
        </p>

        <div
          className="article-editorial-body"
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            color: pageStyles.muted,
            lineHeight: 1.95,
            fontSize: '1rem'
          }}
          dangerouslySetInnerHTML={{ __html: article.body || '' }}
        />

        <footer
          style={{
            marginTop: '38px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(30,58,138,0.25)',
            color: '#64748b',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            fontSize: '0.78rem',
            lineHeight: 1.6
          }}
        >
          Palabras clave: {article.keywords.join(' · ')}
        </footer>
      </article>

      <style>{`
        .article-editorial { text-align: left; }
        .article-editorial p { text-align: left; }

        @media (max-width: 768px) {
          .article-editorial { padding: 30px 24px !important; }
          .article-editorial-meta {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          .article-editorial-meta span:last-child {
            text-align: left !important;
          }
          .article-editorial-lead {
            font-size: 1.08rem !important;
          }
        }
      `}</style>

      <style>{`
        /* Encabezado del artículo — SOLO TELÉFONO */
        @media (max-width: 768px) {
          .article-detail-heading {
            width: 100% !important;
            margin-bottom: 24px !important;
          }

          .article-detail-heading .dedicated-page-eyebrow {
            display: none !important;
          }

          .article-detail-heading .dedicated-page-title {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            font-size: clamp(1.78rem, 7.6vw, 2.3rem) !important;
            line-height: 1.08 !important;
            letter-spacing: 0 !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
            hyphens: none !important;
            text-align: left !important;
            text-wrap: balance !important;
          }
        }
      `}</style>
    </PageShell>
  );
}

export default ArticleDetailPage;

import React from 'react';

import AdminPage from './AdminPage';
import AreasPage from './AreasPage';
import AreaDetailPage from './AreaDetailPage';
import FirmPage from './FirmPage';
import CasesPage from './CasesPage';
import CaseDetailPage from './CaseDetailPage';
import ArticlesPage from './ArticlesPage';
import ArticleDetailPage from './ArticleDetailPage';
import PageNavbar from './PageNavbar';

export default function AppRouter({
  route,
  scrolled,
  isMenuOpen,
  setIsMenuOpen,
  navigate,
  transitionPhase,
  setScrollToContact,
  publicCaseStudies,
  publicArticles
}) {
  const navbar = (
    <PageNavbar
      scrolled={scrolled}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      navigate={navigate}
      transitionPhase={transitionPhase}
      setScrollToContact={setScrollToContact}
    />
  );

  if (route === '#admin') {
    return <AdminPage />;
  }

  if (route === '#areas' || route.startsWith('#areas?')) {
    return (
      <>
        {navbar}
        <AreasPage
          onBack={() => navigate('#inicio')}
          onNavigate={navigate}
        />
      </>
    );
  }

  if (route.startsWith('#area/')) {
    const areaName = decodeURIComponent(route.slice('#area/'.length));

    return (
      <>
        {navbar}
        <AreaDetailPage
          area={areaName}
          onNavigate={navigate}
        />
      </>
    );
  }

  if (route === '#firma') {
    return (
      <>
        {navbar}
        <FirmPage
          onBack={() => navigate('#inicio')}
          onNavigate={navigate}
        />
      </>
    );
  }

  if (route === '#casos') {
    return (
      <>
        {navbar}
        <CasesPage
          onBack={() => navigate('#inicio')}
          onNavigate={navigate}
          cases={publicCaseStudies}
        />
      </>
    );
  }

  if (route.startsWith('#caso/')) {
    const id = decodeURIComponent(route.slice('#caso/'.length));
    const caso = publicCaseStudies.find((item) => item.id === id);

    return (
      <>
        {navbar}
        <CaseDetailPage
          caso={caso}
          onNavigate={navigate}
          cases={publicCaseStudies}
        />
      </>
    );
  }

  if (route === '#articulos') {
    return (
      <>
        {navbar}
        <ArticlesPage
          onBack={() => navigate('#inicio')}
          onNavigate={navigate}
          articles={publicArticles}
        />
      </>
    );
  }

  if (route.startsWith('#articulo/')) {
    const id = decodeURIComponent(route.slice('#articulo/'.length));
    const article = publicArticles.find((item) => item.id === id);

    return (
      <>
        {navbar}
        <ArticleDetailPage
          article={article}
          onNavigate={navigate}
        />
      </>
    );
  }

  return null;
}

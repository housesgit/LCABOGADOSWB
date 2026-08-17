import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.png';
import heroBg from './imagendefondo1.jpg';
import socio1 from './LACOUTURE.jpg';
import socio2 from './CORONADO.jpg';
import { supabase } from './supabaseClient'
import RichTextEditor from './components/RichTextEditor';
import ArticleEditor from './components/ArticleEditor';
import { areasList, areaDetails } from "./data/areas";
import caseStudies from "./data/cases";
import articles from "./data/articles";
import AdminPage from './components/AdminPage';
import PageShell from './components/PageShell';
import FilterPanel from './components/FilterPanel';
import AreasPage from './components/AreasPage';
import AreaDetailPage from './components/AreaDetailPage';
import FirmPage from './components/FirmPage';
import CasesPage from './components/CasesPage';
import pageStyles from './styles/pageStyles';
import CaseDetailPage from './components/CaseDetailPage';
import ArticlesPage from './components/ArticlesPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import PageNavbar from './components/PageNavbar';
import HomeFloatingWhatsapp from './components/HomeFloatingWhatsapp';
import { RouteTransitionStyles, RouteTransition } from './components/RouteTransition';

const WHATSAPP_URL = "https://wa.me/573113361929?text=";
const whatsappGeneral = `${WHATSAPP_URL}${encodeURIComponent("Hola, me gustaría solicitar asesoría jurídica.")}`;
const submitContactForm = async ({ name, email, message }) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    })
    .select()
    .single();

  if (error) {
    console.error('Error enviando consulta:', error);
    throw error;
  }

  return data;
};



export default function App() {
  const [enviado, setEnviado] = useState(false);
const [enviando, setEnviando] = useState(false);
const [publicCaseStudies, setPublicCaseStudies] = useState(caseStudies);
const [publicArticles, setPublicArticles] = useState(articles);
const [errorEnvio, setErrorEnvio] = useState('');
const [scrollToContact, setScrollToContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [route, setRoute] = useState(() => (
    typeof window !== 'undefined'
      ? (
          window.location.pathname === '/admin'
            ? '#admin'
            : (window.location.hash || '#inicio')
        )
      : '#inicio'
  ));
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const transitionTimerRef = useRef(null);

  // ==========================================================
  // CONTACTO: después de volver a Inicio, hacemos scroll
  // hasta el formulario cuando la página ya está montada.
  // ==========================================================
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    const handleHash = () => {
      setRoute(window.location.pathname === '/admin' ? '#admin' : (window.location.hash || '#inicio'));
      setIsMenuOpen(false);
      setScrolled(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    const handlePopState = handleHash;
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handlePopState);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const navigate = (path, options = {}) => {
  if (path === '/admin') {
    window.history.pushState({}, '', '/admin');
    setRoute('#admin');
    setIsMenuOpen(false);
    setScrolled(false);
    setTransitionPhase('idle');
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (path === '/') {
    window.history.pushState({}, '', '/');
    window.location.hash = '#inicio';
    setRoute('#inicio');
    setIsMenuOpen(false);
    setScrolled(false);
    setTransitionPhase('idle');
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  if (transitionTimerRef.current) {
    clearTimeout(transitionTimerRef.current);
  }

  setIsMenuOpen(false);
  setScrolled(false);
  setTransitionPhase('cover');

  transitionTimerRef.current = setTimeout(() => {
    window.location.hash = path;
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'auto' });

    transitionTimerRef.current = setTimeout(() => {
      setTransitionPhase('reveal');

      transitionTimerRef.current = setTimeout(() => {
        setTransitionPhase('idle');

        if (options.scrollTo) {
          let attempts = 0;

          const scrollWhenReady = () => {
            const element = document.getElementById(options.scrollTo);

            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              return;
            }

            attempts += 1;

            if (attempts < 30) {
              setTimeout(scrollWhenReady, 100);
            }
          };

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              scrollWhenReady();
            });
          });
        }
      }, 700);
    }, 35);
  }, 475);
};

useEffect(() => {
  let mounted = true;

  const loadPublicCases = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('status', 'published')
      .order('case_date', { ascending: false });

    if (error) {
      console.error('Error cargando casos públicos:', error);
      return;
    }

    if (!mounted) return;

    const mappedCases = (data || []).map((item) => ({
      ...item,
      date: item.case_date || '',
      displayDate: item.case_date
        ? new Date(`${item.case_date}T00:00:00`).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : '',
      published: item.status === 'published'
    }));

    setPublicCaseStudies(mappedCases);
  };

  loadPublicCases();

  return () => {
    mounted = false;
  };
}, []);

useEffect(() => {
  let mounted = true;

  const loadPublicArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('article_date', { ascending: false });

    if (error) {
      console.error('Error cargando artículos públicos:', error);
      return;
    }

    if (!mounted) return;

    const mappedArticles = (data || []).map((item) => ({
  ...item,
  date: item.article_date || '',
  displayDate: item.article_date
    ? new Date(`${item.article_date}T00:00:00`).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '',
  published: item.status === 'published',
  body: item.body || ''
}));

    setPublicArticles(mappedArticles);
  };

  loadPublicArticles();

  return () => {
    mounted = false;
  };
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (enviando) return;

  setEnviando(true);
  setErrorEnvio('');

  const form = e.currentTarget;
  const formData = new FormData(form);

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      status: 'new'
    });

  setEnviando(false);

  if (error) {
    console.error('Error al enviar consulta:', error);
    setErrorEnvio('No fue posible enviar su consulta. Por favor, inténtelo nuevamente.');
    return;
  }

  setEnviado(true);
  form.reset();

  setTimeout(() => setEnviado(false), 5000);
};

  const navItemStyle = {
    position: 'relative',
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    paddingBottom: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px'
  };

  const menuItems = [
    { 
      label: 'Áreas', 
      href: '#areas',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect className="icon-path draw-animate" x="3" y="3" width="7" height="7"></rect>
          <rect className="icon-path draw-animate" x="14" y="3" width="7" height="7"></rect>
          <rect className="icon-path draw-animate" x="14" y="14" width="7" height="7"></rect>
          <rect className="icon-path draw-animate" x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    { 
      label: 'Firma', 
      href: '#firma',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="icon-path draw-animate" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle className="icon-path draw-animate" cx="9" cy="7" r="4"></circle>
          <path className="icon-path draw-animate" d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path className="icon-path draw-animate" d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    { 
      label: 'Casos', 
      href: '#casos',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="icon-path draw-animate" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    { 
      label: 'Artículos', 
      href: '#articulos',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="icon-path draw-animate" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline className="icon-path draw-animate" points="14 2 14 8 20 8"></polyline>
          <line className="icon-path draw-animate" x1="16" y1="13" x2="8" y2="13"></line>
          <line className="icon-path draw-animate" x1="16" y1="17" x2="8" y2="17"></line>
          <polyline className="icon-path draw-animate" points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
  label: 'Contacto',
  href: '#contacto',
  scrollToContact: true,
  icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="icon-path draw-animate" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline className="icon-path draw-animate" points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    }
  ];

  if (route === '#admin') {
    return <AdminPage />;
  }

  if (route === '#areas' || route.startsWith('#areas?')) {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
        <AreasPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route.startsWith('#area/')) {
    const areaName = decodeURIComponent(route.slice('#area/'.length));
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
        <AreaDetailPage area={areaName} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#firma') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
        <FirmPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#casos') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
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
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
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
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
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
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} setScrollToContact={setScrollToContact} />
        <ArticleDetailPage article={article} onNavigate={navigate} />
      </>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      color: '#111827', 
      fontFamily: 'Georgia, serif', 
      margin: 0, 
      padding: 0, 
      overflowX: 'hidden', 
      boxSizing: 'border-box' 
    }}>
      
      <style>{`
        @keyframes scrollHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollHorizontal 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .cta-consultar {
          border: none;
          background: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          padding: 0;
        }
        .cta-consultar svg {
          transform: translateX(-8px);
          transition: all 0.3s ease;
        }
        .cta-consultar:hover svg {
          transform: translateX(0);
        }
        .hover-underline-animation {
          position: relative;
          color: #93c5fd;
          padding-bottom: 3px;
        }
        .hover-underline-animation:after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: #93c5fd;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        .cta-consultar:hover .hover-underline-animation:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .nav-content-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .nav-label {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          max-width: 120px;
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.3s ease, 
                      transform 0.4s ease;
        }
        
        .scrolled-mode .nav-label {
          max-width: 0px;
          opacity: 0;
          transform: translateY(-15px) scale(0.8);
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes iconPopIn {
          0% { opacity: 0; transform: translateY(15px) scale(0.5); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .whatsapp-btn-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .whatsapp-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .whatsapp-text {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .whatsapp-icon-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, calc(-50% + 25px)) scale(0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .whatsapp-btn-wrapper:hover .whatsapp-text {
          transform: translateY(-25px);
          opacity: 0;
        }

        .whatsapp-btn-wrapper:hover .whatsapp-icon-container {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        @keyframes mobileMenuSmoothIn {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .mobile-dropdown-menu {
          animation: mobileMenuSmoothIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }

        /* --- CLASES DE ADAPTACIÓN MÓVIL --- */
        .hide-on-mobile { display: flex; }
        .show-on-mobile { display: none !important; }

        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .show-on-mobile {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-left: 0 !important;
          }

          .mobile-header-scrolled {
            width: 50px !important;
            height: 50px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            justify-content: center !important;
            align-items: center !important;
            left: auto !important;
            right: 20px !important;
            transform: translateX(0) !important;
            background-color: rgba(6, 9, 14, 0.95) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6) !important;
          }

          .mobile-header-scrolled .mobile-logo-container,
          .mobile-header-scrolled .mobile-nav-brand {
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.2s ease;
          }

          header {
            padding: 10px 16px !important;
            width: 100% !important;
            top: 0 !important;
            border-radius: 0 !important;
          }
          header img {
            height: 32px !important;
          }
          
          #inicio {
            padding: 160px 20px 100px 20px !important;
          }
          #inicio h1 {
            font-size: 2.5rem !important;
            letter-spacing: 0.04em !important;
          }
          #inicio p {
            font-size: 0.95rem !important;
          }
          #inicio > div > div:last-child {
            flex-direction: column !important;
            gap: 12px !important;
          }
          #inicio a {
            width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }

          .section-container, [style*="padding: '60px 0'"], [style*="padding: '60px 64px'"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .container-padding-mobile {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .mobile-dropdown-menu a {
            font-size: 1.15rem !important;
            padding: 14px 20px !important;
          }

          .dedicated-card-grid button { width: 100%; }
          #casos-preview .container-padding-mobile > button { width: 100%; }
          .marquee-track > button { -webkit-appearance: none; }
        }
      `}</style>

      <HomeFloatingWhatsapp scrolled={scrolled} />

      {/* Navbar */}
      <header className={`mobile-header-base ${scrolled ? 'mobile-header-scrolled' : ''}`} style={{ 
        width: scrolled ? '88%' : '100%', 
        maxWidth: scrolled ? '1200px' : '100%',
        boxSizing: 'border-box', 
        padding: scrolled ? '12px 36px' : '16px 64px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'fixed', 
        top: scrolled ? '16px' : '0', 
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(6, 9, 14, 0.92)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(30, 58, 138, 0.3)', 
        borderRadius: scrolled ? '8px' : '0px',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div className="mobile-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <img src={logo} alt="Lacouture & Coronado" style={{ height: scrolled ? '38px' : '48px', width: 'auto', objectFit: 'contain', transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          <span className="hide-on-mobile mobile-nav-brand" style={{ fontSize: '1.05rem', fontWeight: '600', letterSpacing: '0.18em', color: '#ffffff', textTransform: 'uppercase', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            LC ABOGADOS
          </span>
        </div>
        
        {/* Botón Hamburguesa */}
        <button 
          className="show-on-mobile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#ffffff', 
            fontSize: '22px', 
            cursor: 'pointer', 
            padding: '0', 
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center'
          }}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Navegación de Escritorio */}
        <nav className="hide-on-mobile" style={{ display: 'flex', gap: scrolled ? '24px' : '32px', alignItems: 'center', transition: 'gap 0.4s ease' }}>
          
          <a href="#inicio" onClick={(e) => { e.preventDefault(); navigate("#inicio"); }} style={navItemStyle} title={scrolled ? "Inicio" : ""}>
            <div className={`nav-content-wrapper ${scrolled ? 'scrolled-mode' : ''}`}>
              <span className="nav-label">Inicio</span>
              {scrolled && (
                <div className="nav-icon-wrapper" style={{ width: '22px', height: '22px' }}>
                  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <path style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: '400', strokeDashoffset: '0' }} d="M20 48 L64 18 L108 48 V106 H76 V78 H52 V106 H20 Z" />
                  </svg>
                </div>
              )}
            </div>
            <span style={{
              position: 'absolute', width: '100%', height: '2px', bottom: 0, left: 0,
              backgroundColor: '#60a5fa', transform: 'scaleX(0)', transformOrigin: 'bottom right',
              transition: 'transform 0.25s ease-out'
            }}
            ref={(el) => {
              if (el) {
                el.parentElement.onmouseenter = () => { el.style.transform = 'scaleX(1)'; el.style.transformOrigin = 'bottom left'; };
                el.parentElement.onmouseleave = () => { el.style.transform = 'scaleX(0)'; el.style.transformOrigin = 'bottom right'; };
              }
            }} />
          </a>

          {menuItems.map((item, idx) => (
  <a
    key={item.href}
    href={item.href}
    onClick={(e) => {
  e.preventDefault();

  if (item.href === '#contacto') {
  navigate('#inicio', { scrollTo: 'contacto' });
  return;
}

  navigate(item.href);
}}
    style={navItemStyle}
    title={scrolled ? item.label : ""}
  >
              <div className={`nav-content-wrapper ${scrolled ? 'scrolled-mode' : ''}`}>
                <span className="nav-label">{item.label}</span>
                {scrolled && (
                  <div className="nav-icon-wrapper">
                    {item.icon}
                  </div>
                )}
              </div>
              <span style={{
                position: 'absolute', width: '100%', height: '2px', bottom: 0, left: 0,
                backgroundColor: '#60a5fa', transform: 'scaleX(0)', transformOrigin: 'bottom right',
                transition: 'transform 0.25s ease-out'
              }}
              ref={(el) => {
                if (el) {
                  el.parentElement.onmouseenter = () => { el.style.transform = 'scaleX(1)'; el.style.transformOrigin = 'bottom left'; };
                  el.parentElement.onmouseleave = () => { el.style.transform = 'scaleX(0)'; el.style.transformOrigin = 'bottom right'; };
                }
              }} />
            </a>
          ))}
        </nav>
      </header>

      {/* Menú Desplegable Móvil */}
      {isMenuOpen && (
        <div className="mobile-dropdown-menu" style={{
          position: 'fixed',
          top: scrolled ? '72px' : '65px',
          right: '16px',
          width: '210px',
          backgroundColor: 'rgba(10, 15, 25, 0.96)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '8px 0',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7)'
        }}>
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); navigate("#inicio"); }}
            style={{ 
              color: '#e2e8f0', 
              textDecoration: 'none', 
              fontSize: '0.8rem', 
              fontWeight: '400', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.12em', 
              padding: '12px 20px', 
              transition: 'background 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}
          >
            Inicio
          </a>
          {menuItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              onClick={(e) => {
                e.preventDefault();

                if (item.href === '#contacto') {
                  navigate('#inicio', { scrollTo: 'contacto' });
                  return;
                }

                navigate(item.href);
              }}
              style={{ 
                color: '#e2e8f0', 
                textDecoration: 'none', 
                fontSize: '0.8rem', 
                fontWeight: '400', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.12em', 
                padding: '12px 20px', 
                transition: 'background 0.2s ease, color 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e2e8f0'; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" style={{ 
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative', 
        padding: '240px 64px 160px 64px', 
        backgroundImage: `linear-gradient(to bottom, rgba(15, 32, 67, 0.8), rgba(6, 9, 14, 0.95)), url(${heroBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: '#ffffff',
        textAlign: 'center',
        borderBottom: '1px solid rgba(30, 58, 138, 0.4)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '400', textTransform: 'none', letterSpacing: '0.15em', color: '#93c5fd', display: 'block', marginBottom: '10px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            Firma de Abogados Asociados
          </span>
          <h1 style={{ fontSize: 'clamp(3.5rem, 4vw, 5.5rem)', fontWeight: '650', lineHeight: 1.15, margin: '0 0 32px 0', color: '#ffffff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            LACOUTURE &amp; CORONADO
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#3b82f6', margin: '0 auto 25px auto' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '740px', margin: '0 auto 48px auto', fontWeight: '300', letterSpacing: '0.03em' }}>
            Brindamos asesoría y defensa jurídica integral adaptada a cada necesidad particular o empresarial. Respaldamos cada etapa de su proceso con un enfoque estratégico, transparente y orientado a resultados seguros.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            
            <a 
              href="https://wa.me/573113361929?text=Hola,%20me%20gustaría%20solicitar%20asesoría%20jurídica." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-btn-wrapper"
              style={{ backgroundColor: '#1e3a8a', color: '#ffffff', padding: '16px 36px', textDecoration: 'none', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', borderRadius: '0px', border: '1px solid #3b82f6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'inline-block', transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)', minWidth: '280px', height: '54px', boxSizing: 'border-box' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.boxShadow = 'rgba(59, 130, 246, 0.4) 0 8px 15px'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e3a8a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              
              <div className="whatsapp-inner">
                <span className="whatsapp-text">Escríbenos por WhatsApp</span>
                
                <div className="whatsapp-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
              </div>
            </a>

            <a href="#areas" onClick={(e) => { e.preventDefault(); navigate("#areas"); }} style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '16px 36px', textDecoration: 'none', fontWeight: '400', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'inline-block', height: '54px', boxSizing: 'border-box', lineHeight: '20px', transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Nuestras Áreas
            </a>
          </div>
        </div>
      </section>

      {/* Áreas de Práctica */}
      <section id="areas-preview" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 0', backgroundColor: '#090d14', color: '#ffffff', borderBottom: '1px solid rgba(30, 58, 138, 0.3)', overflow: 'hidden' }}>
        <div className="container-padding-mobile" style={{ maxWidth: '1100px', margin: '0 auto 30px auto', padding: '0 64px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#60a5fa', display: 'block', marginBottom: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Especialidades</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '400', margin: 0, color: '#f8fafc', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Áreas de Práctica</h2>
        </div>

        <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...areasList, ...areasList].map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                onClick={() => navigate(`#area/${encodeURIComponent(item.title)}`)}
                style={{
                  backgroundColor: '#0d131f',
                  border: '1px solid rgba(30, 58, 138, 0.35)',
                  padding: '40px 36px',
                  width: '340px',
                  minWidth: '340px',
                  marginRight: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#60a5fa';
                  e.currentTarget.style.backgroundColor = '#101a2b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.35)';
                  e.currentTarget.style.backgroundColor = '#0d131f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <h3 style={{ color: '#f8fafc', margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: '400', letterSpacing: '0.05em' }}>{item.title}</h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.92rem', lineHeight: '1.7', fontWeight: '300' }}>{item.desc}</p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(30, 58, 138, 0.2)', color: '#93c5fd', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Conocer el área →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Equipo */}
      <section id="equipo" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 0', backgroundColor: '#06090e', color: '#ffffff', borderBottom: '1px solid rgba(30, 58, 138, 0.3)' }}>
        <div className="container-padding-mobile" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#60a5fa', display: 'block', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Liderazgo y Experiencia</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '400', margin: 0, color: '#f8fafc', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Socios Directores</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {[
              { name: "Dra. Lisbeth Lacouture", role: "Socia Fundadora", desc: "Especialista en estructuración patrimonial y mercantil.", img: socio1 },
              { name: "Dr. Jesus Coronado", role: "Socio Director", desc: "Amplia trayectoria en resolución de disputas corporativas.", img: socio2 }
            ].map((socio, index) => (
              <div key={index} style={{ backgroundColor: '#0f172a', border: '1px solid rgba(30, 58, 138, 0.4)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ width: '100%', height: '380px', backgroundColor: '#1e293b', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={socio.img} 
                    alt={socio.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'top center',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }} 
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>

                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#60a5fa', letterSpacing: '0.2em', display: 'block', marginBottom: '10px', textTransform: 'uppercase', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{socio.role}</span>
                    <h3 style={{ color: '#f8fafc', margin: '0 0 16px 0', fontSize: '1.4rem', fontWeight: '500' }}>{socio.name}</h3>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.92rem', lineHeight: '1.7', fontWeight: '300' }}>{socio.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Estudio */}
      <section id="casos-preview" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 0', backgroundColor: '#06090e', color: '#ffffff', borderBottom: '1px solid rgba(30, 58, 138, 0.3)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="container-padding-mobile" style={{ maxWidth: '1100px', margin: '0 auto 30px auto', padding: '0 64px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#60a5fa', display: 'block', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Experiencia y Resultados</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '400', margin: 0, color: '#f8fafc', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Casos de Estudio</h2>
          </div>

          <div className="container-padding-mobile home-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '32px', paddingLeft: '64px', paddingRight: '64px' }}>
            {publicCaseStudies.slice(0, 2).map((caso) => (
              <button
                key={caso.id}
                onClick={() => navigate(`#caso/${caso.id}`)}
                style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(30, 58, 138, 0.4)',
                  padding: '40px',
                  borderRadius: '0px',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
                  fontFamily: 'Georgia, serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#60a5fa';
                  e.currentTarget.style.backgroundColor = '#101a2b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.4)';
                  e.currentTarget.style.backgroundColor = '#0f172a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#1e3a8a', color: '#93c5fd', padding: '5px 10px', borderRadius: '0px', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {caso.area}
                  </span>
                  <h3 style={{ color: '#f8fafc', margin: '20px 0 16px 0', fontSize: '1.2rem', fontWeight: '500', letterSpacing: '0.03em', lineHeight: 1.4 }}>{caso.title}</h3>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>{caso.summary}</p>
                </div>
                <div style={{ marginTop: '26px', paddingTop: '18px', borderTop: '1px solid rgba(30,58,138,0.25)', color: '#93c5fd', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Ver caso completo →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artículos */}
      <section id="articulos" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 0', backgroundColor: '#090d14', color: '#ffffff', borderBottom: '1px solid rgba(30, 58, 138, 0.3)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="container-padding-mobile" style={{ maxWidth: '1100px', margin: '0 auto 30px auto', padding: '0 64px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#60a5fa', display: 'block', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Publicaciones y Análisis</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '400', margin: 0, color: '#f8fafc', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Artículos y Foro Jurídico</h2>
          </div>

          <div className="container-padding-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', paddingLeft: '64px', paddingRight: '64px' }}>
            {[
              {
                id: "regulaciones-corporativas-patrimonial",
                date: "Agosto 12, 2026",
                author: "Dr. Socio Director",
                title: "Impacto de las nuevas regulaciones corporativas en el régimen patrimonial",
                snippet: "Análisis crítico sobre las recientes modificaciones en la responsabilidad de los administradores y la protección de bienes sociales..."
              },
              {
                id: "estrategias-derecho-laboral",
                date: "Julio 28, 2026",
                author: "Equipo de Litigios",
                title: "Estrategias preventivas frente a contingencias en el derecho laboral moderno",
                snippet: "Lineamientos esenciales que toda compañía debe implementar para mitigar riesgos en procesos de reestructuración de personal..."
              }
            ].map((art, index) => (
              <article key={index} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(30, 58, 138, 0.35)', padding: '40px 32px', borderRadius: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#60a5fa', marginBottom: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    <span>{art.date}</span>
                    <span>{art.author}</span>
                  </div>
                  <h3 style={{ color: '#f8fafc', margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: '400', lineHeight: '1.4' }}>{art.title}</h3>
                  <p style={{ color: '#94a3b8', margin: '0 0 24px 0', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '300' }}>{art.snippet}</p>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <a href={`#articulo/${art.id}`} 
                  onClick={(e) => { 
                    e.preventDefault(); navigate(`#articulo/${art.id}`); }} className="cta-consultar" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    <span className="hover-underline-animation" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '500', marginRight: '8px' }}>
                      Leer artículo completo
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#93c5fd' }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section id="contacto" className="container-padding-mobile" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 64px', backgroundColor: '#ffffff', color: '#111827' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#1e3a8a', display: 'block', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Asesoría Legal a su Medida</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '500', margin: '0 0 16px 0', color: '#0f2043', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hablemos de su caso</h2>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0, fontWeight: '400' }}>Comparta los detalles de su situación. Analizaremos su requerimiento con total discreción y le daremos una respuesta clara.</p>
          </div>
          
          {enviado && (
            
            <div style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '20px', borderRadius: '0px', marginBottom: '31px', fontSize: '0.9rem', textAlign: 'center', letterSpacing: '0.05em', fontWeight: '500' }}>
              Su solicitud ha sido registrada con éxito. Nos pondremos en contacto a la brevedad.
            </div>
          )}

{errorEnvio && (
  <div style={{
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    padding: '20px',
    marginBottom: '31px',
    fontSize: '0.9rem',
    textAlign: 'center',
    letterSpacing: '0.05em',
    fontWeight: '500'
  }}>
    {errorEnvio}
  </div>
)}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

  <div>
    <label>
      Nombre completo o Empresa
    </label>

    <input
      required
      name="name"
      type="text"
      placeholder="Ej. Corporación S.A."
      style={{
        width: '100%',
        backgroundColor: '#f9fafb',
        border: '1px solid #d1d5db',
        padding: '16px 20px',
        color: '#111827',
        borderRadius: '0px',
        fontSize: '0.95rem',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
      }}
    />
  </div>

  <div>
    <label>
      Correo electrónico de contacto
    </label>

    <input
      required
      name="email"
      type="email"
      placeholder="contacto@ejemplo.com"
      style={{
        width: '100%',
        backgroundColor: '#f9fafb',
        border: '1px solid #d1d5db',
        padding: '16px 20px',
        color: '#111827',
        borderRadius: '0px',
        fontSize: '0.95rem',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
      }}
    />
  </div>

  <div>
    <label>
      Detalle de la consulta
    </label>

    <textarea
      required
      name="message"
      rows="5"
      placeholder="Describa brevemente su requerimiento legal..."
      style={{
        width: '100%',
        backgroundColor: '#f9fafb',
        border: '1px solid #d1d5db',
        padding: '16px 20px',
        color: '#111827',
        borderRadius: '0px',
        fontSize: '0.95rem',
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
      }}
    />
  </div>

  {errorEnvio && (
    <div>
      {errorEnvio}
    </div>
  )}

  <button type="submit" disabled={enviando}>
    {enviando ? 'Enviando...' : 'Enviar Consulta'}
  </button>

</form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-padding-mobile" style={{ width: '100%', boxSizing: 'border-box', borderTop: '1px solid #e5e7eb', padding: '48px 64px', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: '1.6' }}>
            © {new Date().getFullYear()} Lacouture &amp; Coronado Abogados. Todos los derechos reservados.
          </span>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1e3a8a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: '600' }}>
            Santa Marta, Colombia
          </span>
        </div>
      </footer>
      <style>{`
        /* =========================================================
           AJUSTES FINALES — SOLO TELÉFONO
           No modifica ninguna regla de escritorio.
           ========================================================= */
        @media (max-width: 768px) {
          /* ---------- CASOS EN INICIO: LISTA VERTICAL LIMPIA ---------- */
          #casos-preview .home-cases-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
            width: 100% !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          #casos-preview .home-cases-grid > button {
            width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
            padding: 20px 18px !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            text-align: left !important;
            box-sizing: border-box !important;
          }

          #casos-preview .home-cases-grid > button > div:first-child {
            width: 100% !important;
          }

          #casos-preview .home-cases-grid > button h3 {
            margin: 13px 0 8px !important;
            font-size: 1.08rem !important;
            line-height: 1.32 !important;
          }

          #casos-preview .home-cases-grid > button p {
            margin: 0 !important;
            font-size: .88rem !important;
            line-height: 1.55 !important;
          }

          #casos-preview .home-cases-grid > button > div:last-child {
            display: none !important;
          }

          /* ---------- FILTROS MÓVILES: BARRA HORIZONTAL DESLIZABLE ---------- */
          .dedicated-filter-panel {
            position: relative !important;
            padding: 10px !important;
            margin: 0 0 22px !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 74px !important;
            min-height: 74px !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(96,165,250,.18) !important;
            background: #090d14 !important;
          }

          .dedicated-filter-panel::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 26px;
            pointer-events: none;
            background: linear-gradient(90deg, rgba(9,13,20,0), #090d14 82%);
          }

          .dedicated-filter-grid {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 8px !important;
            width: max-content !important;
            min-width: max-content !important;
            height: 52px !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 0 24px 0 0 !important;
            margin: 0 !important;
            scroll-behavior: smooth !important;
            scroll-snap-type: x proximity !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .dedicated-filter-grid::-webkit-scrollbar { display: none !important; }

          .dedicated-filter-field {
            position: relative !important;
            display: flex !important;
            flex: 0 0 auto !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 0 !important;
            width: auto !important;
            min-width: 0 !important;
            height: 44px !important;
            scroll-snap-align: start !important;
          }

          .dedicated-filter-label { display: none !important; }

          .dedicated-filter-field .dedicated-input,
          .dedicated-filter-field select,
          .dedicated-filter-field input[type="date"] {
            width: auto !important;
            min-width: 0 !important;
            height: 44px !important;
            min-height: 44px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(148,163,184,.22) !important;
            border-radius: 3px !important;
            background: #0d131f !important;
            color: #e8edf5 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            font-size: .78rem !important;
            line-height: 44px !important;
            outline: none !important;
          }

          /* Inspirado en el buscador expansible de referencia, pero adaptado a LC Abogados. */
          .dedicated-filter-field:first-child {
            width: 52px !important;
            transition: width 280ms cubic-bezier(.22,1,.36,1) !important;
            overflow: hidden !important;
            border: 1px solid rgba(148,163,184,.22) !important;
            border-radius: 999px !important;
            background: #0d131f !important;
          }

          .dedicated-filter-field:first-child::before {
            content: '';
            position: absolute;
            left: 16px;
            top: 50%;
            width: 13px;
            height: 13px;
            border: 1.5px solid #9fb3cc;
            border-radius: 50%;
            transform: translateY(-58%);
            pointer-events: none;
            z-index: 2;
          }

          .dedicated-filter-field:first-child::after {
            content: '';
            position: absolute;
            left: 28px;
            top: 28px;
            width: 6px;
            height: 1.5px;
            background: #9fb3cc;
            transform: rotate(45deg);
            transform-origin: left center;
            pointer-events: none;
            z-index: 2;
          }

          .dedicated-filter-field:first-child:focus-within {
            width: 210px !important;
          }

          .dedicated-filter-field:first-child .dedicated-input {
            width: 100% !important;
            min-width: 100% !important;
            padding: 0 14px 0 43px !important;
            border: 0 !important;
            background: transparent !important;
            color: #f8fafc !important;
          }

          .dedicated-filter-field:first-child .dedicated-input::placeholder {
            color: #7f8da2 !important;
            opacity: 1 !important;
          }

          .dedicated-filter-field:nth-child(2) select { width: 142px !important; padding: 0 34px 0 14px !important; }
          .dedicated-filter-field:nth-child(3) select { width: 148px !important; padding: 0 34px 0 14px !important; }
          .dedicated-filter-field:nth-child(4) input[type="date"] { width: 148px !important; padding: 0 12px 0 14px !important; color-scheme: dark !important; }

          .dedicated-filter-field input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: .62;
            filter: invert(75%) sepia(15%) saturate(500%) hue-rotate(175deg);
            cursor: pointer;
          }

          .dedicated-select-wrap::after {
            right: 15px !important;
            top: 50% !important;
            width: 6px !important;
            height: 6px !important;
            border-color: #8fa3bd !important;
          }

          /* ---------- PREVIEWS DE CASOS Y ARTÍCULOS: TARJETA COMO BOTÓN ---------- */
          .dedicated-mobile-click-card {
            position: relative !important;
            width: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            height: auto !important;
            padding: 20px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            gap: 0 !important;
          }

          .mobile-card-link {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            cursor: pointer !important;
            z-index: 5 !important;
          }

          .dedicated-mobile-click-card > *:not(.mobile-card-link) {
            position: relative !important;
            z-index: 1 !important;
          }

          .dedicated-mobile-click-card .mobile-card-link + div {
            margin: 0 !important;
          }

          .dedicated-mobile-click-card h2,
          .dedicated-mobile-click-card h3 {
            margin: 14px 0 10px !important;
            font-size: 1.08rem !important;
            line-height: 1.34 !important;
          }

          .dedicated-mobile-click-card p {
            margin: 0 !important;
            font-size: .9rem !important;
            line-height: 1.62 !important;
          }

          .dedicated-case-card > div:last-child,
          .dedicated-mobile-click-card .cta-consultar,
          .dedicated-mobile-click-card .hover-underline-animation {
            display: none !important;
          }

          .dedicated-case-card > div:nth-last-child(2) {
            margin-top: 14px !important;
          }

          .dedicated-case-card > div:first-of-type {
            margin-bottom: 0 !important;
          }

          /* ---------- CONTACTO DEDICADO Y CONTACTO INICIO ---------- */
          .contact-dedicated-page {
            padding-top: 82px !important;
            overflow-x: hidden !important;
          }

          .contact-dedicated-page > section {
            padding: 42px 18px 48px !important;
          }

          .contact-dedicated-page > section > div {
            width: 100% !important;
            max-width: 100% !important;
          }

          .contact-dedicated-page h1 {
            font-size: clamp(2rem, 10vw, 2.65rem) !important;
            line-height: 1.02 !important;
            letter-spacing: .02em !important;
            margin-bottom: 16px !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
          }

          .contact-dedicated-page > section > div > div:first-child {
            margin-bottom: 34px !important;
          }

          .contact-dedicated-page > section > div > div:first-child > p {
            font-size: .94rem !important;
            line-height: 1.62 !important;
            max-width: 330px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          #contacto h2 {
            font-size: clamp(2rem, 10vw, 2.6rem) !important;
            line-height: 1.05 !important;
            letter-spacing: .02em !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
          }

          #contacto > div > div:first-child {
            margin-bottom: 34px !important;
          }

          #contacto > div > div:first-child p {
            font-size: .94rem !important;
            line-height: 1.62 !important;
            max-width: 330px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-card-link,
          .dedicated-filter-label {
            display: none !important;
          }
        }

        /* =========================================================
           AJUSTE COMPACTO DE TARJETAS DE CASOS — SOLO TELÉFONO
           No modifica escritorio.
           ========================================================= */
        @media (max-width: 768px) {
          .dedicated-card-grid > .dedicated-case-card {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
            padding: 16px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:first-of-type {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
            margin: 0 !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:first-of-type span:first-child {
            padding: 5px 9px !important;
            font-size: .58rem !important;
            line-height: 1.2 !important;
            letter-spacing: .11em !important;
            max-width: 68% !important;
            box-sizing: border-box !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:first-of-type span:last-child {
            margin-left: auto !important;
            font-size: .64rem !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
          }

          .dedicated-card-grid > .dedicated-case-card h2 {
            margin: 11px 0 7px !important;
            font-size: .98rem !important;
            line-height: 1.3 !important;
            font-weight: 400 !important;
          }

          .dedicated-card-grid > .dedicated-case-card > p {
            margin: 0 !important;
            font-size: .79rem !important;
            line-height: 1.48 !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:nth-last-child(2) {
            margin-top: 10px !important;
            padding: 0 !important;
            gap: 5px !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:nth-last-child(2) span {
            padding: 4px 7px !important;
            font-size: .57rem !important;
            line-height: 1.2 !important;
          }

          .dedicated-card-grid > .dedicated-case-card > div:last-child {
            display: none !important;
          }
        }
      `}</style>
        <style>{`
          @media (max-width: 768px) {
            .dedicated-case-card .case-tags-scroll {
              width: 100% !important;
              max-width: 100% !important;
              display: flex !important;
              flex-wrap: nowrap !important;
              gap: 7px !important;
              overflow-x: auto !important;
              overflow-y: hidden !important;
              padding: 1px 2px 5px 0 !important;
              margin-top: 12px !important;
              box-sizing: border-box !important;
              -webkit-overflow-scrolling: touch !important;
              scrollbar-width: none !important;
              scroll-snap-type: x proximity !important;
            }
            .dedicated-case-card .case-tags-scroll::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
            .dedicated-case-card .case-tags-scroll > span {
              flex: 0 0 auto !important;
              white-space: nowrap !important;
              padding: 5px 8px !important;
              font-size: .62rem !important;
              line-height: 1.1 !important;
              scroll-snap-align: start !important;
            }
          }
        `}</style>

        <style>{`
          /* Ajuste final de Casos de Estudio en teléfono — solo móvil */
          @media (max-width: 768px) {
            #casos-preview {
              padding-top: 42px !important;
              padding-bottom: 24px !important;
            }

            #casos-preview > div {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
            }

            #casos-preview > div > .container-padding-mobile:first-child {
              margin: 0 0 22px !important;
              padding-left: 18px !important;
              padding-right: 18px !important;
            }

            #casos-preview .home-cases-grid {
              width: calc(100% - 36px) !important;
              max-width: calc(100% - 36px) !important;
              min-width: 0 !important;
              margin: 0 auto !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              gap: 10px !important;
              box-sizing: border-box !important;
            }

            #casos-preview .home-cases-grid > button {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 0 !important;
              padding: 16px !important;
              margin: 0 !important;
              box-sizing: border-box !important;
            }

            #casos-preview .home-cases-grid > button h3 {
              margin: 11px 0 7px !important;
              font-size: 1.02rem !important;
              line-height: 1.28 !important;
            }

            #casos-preview .home-cases-grid > button p {
              font-size: .84rem !important;
              line-height: 1.5 !important;
            }
          }
        `}</style>


      <style>{`
        /* =========================================================
           NAVBAR MÓVIL: TRANSICIÓN IGUAL A LA INTERFAZ PRINCIPAL
           Solo teléfono. No modifica escritorio.
           ========================================================= */
        @media (max-width: 768px) {
          .dedicated-navbar {
            transition:
              width 420ms cubic-bezier(0.16, 1, 0.3, 1),
              height 420ms cubic-bezier(0.16, 1, 0.3, 1),
              top 420ms cubic-bezier(0.16, 1, 0.3, 1),
              right 420ms cubic-bezier(0.16, 1, 0.3, 1),
              left 420ms cubic-bezier(0.16, 1, 0.3, 1),
              border-radius 420ms cubic-bezier(0.16, 1, 0.3, 1),
              padding 420ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1),
              background-color 420ms ease;
            will-change: width, height, top, right, left, border-radius, padding;
          }

          .dedicated-navbar .dedicated-nav-brand {
            max-width: 180px;
            opacity: 1;
            overflow: hidden;
            transform: translateX(0);
            transition:
              opacity 220ms ease,
              max-width 420ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: left center;
          }

          /* Misma simplificación móvil que la navbar de Inicio:
             barra completa -> botón circular de 50px con las tres líneas. */
          .dedicated-navbar {
            right: auto !important;
            transition:
              width 420ms cubic-bezier(0.16, 1, 0.3, 1),
              max-width 420ms cubic-bezier(0.16, 1, 0.3, 1),
              top 420ms cubic-bezier(0.16, 1, 0.3, 1),
              left 420ms cubic-bezier(0.16, 1, 0.3, 1),
              right 420ms cubic-bezier(0.16, 1, 0.3, 1),
              height 420ms cubic-bezier(0.16, 1, 0.3, 1),
              padding 420ms cubic-bezier(0.16, 1, 0.3, 1),
              border-radius 420ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .dedicated-navbar.dedicated-navbar-scrolled {
            width: 50px !important;
            max-width: 50px !important;
            height: 50px !important;
            min-height: 50px !important;
            padding: 0 !important;
            top: 16px !important;
            right: 20px !important;
            left: auto !important;
            transform: none !important;
            border-radius: 50% !important;
            justify-content: center !important;
            background-color: rgba(6, 9, 14, 0.95) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6) !important;
            border-bottom-color: rgba(30, 58, 138, 0.18) !important;
          }

          .dedicated-navbar.dedicated-navbar-scrolled .dedicated-nav-brand {
            opacity: 0 !important;
            max-width: 0 !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: translateX(-8px) scale(0.96);
            pointer-events: none;
          }

          .dedicated-navbar .mobile-page-menu {
            opacity: 1;
            width: 40px !important;
            height: 40px !important;
            flex: 0 0 40px !important;
            margin: 0 !important;
            font-size: 22px !important;
            transform: scale(1);
            transition:
              width 420ms cubic-bezier(0.16, 1, 0.3, 1),
              height 420ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .dedicated-navbar.dedicated-navbar-scrolled .mobile-page-menu {
            width: 40px !important;
            height: 40px !important;
            flex: 0 0 40px !important;
            margin: 0 !important;
            font-size: 22px !important;
            transform: scale(1);
          }

          .dedicated-navbar.dedicated-navbar-scrolled .dedicated-mobile-menu {
            top: 76px !important;
            right: 20px !important;
          }
        }
      `}</style>


      <RouteTransitionStyles />
      <RouteTransition phase={transitionPhase} />
    </div>
  );
}

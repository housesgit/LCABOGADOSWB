import React from 'react';
import logo from '../logo.png';
import DedicatedWhatsappButton from './DedicatedWhatsappButton';
import { RouteTransitionStyles, RouteTransition, dedicatedNavItems } from './RouteTransition';

function PageNavbar({ scrolled, isMenuOpen, setIsMenuOpen, navigate, transitionPhase }) {
  return (
    <>
      <header className={`dedicated-navbar ${scrolled ? 'dedicated-navbar-scrolled' : ''}`}>
        <button onClick={() => navigate('#inicio')} className="dedicated-nav-brand" aria-label="Ir al inicio">
          <img src={logo} alt="Lacouture & Coronado" />
          <span>LC ABOGADOS</span>
        </button>

        <nav className="dedicated-page-nav" aria-label="Navegación principal">
          {dedicatedNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="dedicated-nav-link"
              onClick={(e) => {
  e.preventDefault();

  if (item.href === '#contacto') {
  navigate('#inicio', { scrollTo: 'contacto' });
  return;
}

  navigate(item.href);
}}
              title={item.label}
            >
              <span className="dedicated-nav-label">{item.label}</span>
              <span className="dedicated-nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="dedicated-nav-underline" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <button className="mobile-page-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
          ☰
        </button>

        {isMenuOpen && (
          <div className="dedicated-mobile-menu">
            {dedicatedNavItems.map((item) => (
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
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <DedicatedWhatsappButton />
      <style>{`
        /* =========================================================
           ADAPTACIÓN EXCLUSIVA PARA TELÉFONO
           No altera ninguna regla de escritorio.
           ========================================================= */
        @media (max-width: 768px) {
          html, body, #root {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow-x: hidden;
          }

          *, *::before, *::after {
            box-sizing: border-box;
          }

          /* ---------- INTERFACES SECUNDARIAS ---------- */
          .dedicated-page-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 96px 18px 52px !important;
            margin: 0 !important;
          }

          .dedicated-page-heading {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto 34px !important;
          }

          .dedicated-page-heading .dedicated-page-title {
            width: 100% !important;
            max-width: 100% !important;
            font-size: clamp(2rem, 9.5vw, 3rem) !important;
            line-height: 1.06 !important;
            letter-spacing: 0.015em !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
            hyphens: none !important;
          }

          .dedicated-page-heading p {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 0.94rem !important;
            line-height: 1.7 !important;
            margin-top: 18px !important;
          }

          .dedicated-page-heading-left .dedicated-page-title {
            text-align: left !important;
          }

          .dedicated-page-heading-left {
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: left !important;
          }

          .dedicated-page-container > button:first-child {
            display: block !important;
            width: fit-content !important;
            margin: 0 auto 30px 0 !important;
            text-align: left !important;
            align-self: flex-start !important;
          }

          .dedicated-mobile-detail-meta {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 12px !important;
            width: 100% !important;
            margin: 0 0 12px !important;
            color: #718096 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            font-size: .55rem !important;
            line-height: 1.25 !important;
            letter-spacing: .14em !important;
            text-transform: uppercase !important;
          }
          .dedicated-mobile-detail-meta span {
            min-width: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .dedicated-mobile-detail-meta span:last-child {
            text-align: right !important;
            color: #66758a !important;
          }


          .dedicated-card-grid,
          .dedicated-content-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 16px !important;
            width: 100% !important;
            min-width: 0 !important;
          }

          .dedicated-case-card,
          .dedicated-article-card,
          .dedicated-detail-panel {
            width: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            padding: 24px !important;
          }

          .dedicated-detail-panel {
            min-height: 0 !important;
          }

          /* ---------- NAVBAR SECUNDARIA ---------- */
          .dedicated-navbar,
          .dedicated-navbar-scrolled {
            width: 100% !important;
            max-width: 100% !important;
            height: 62px !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            padding: 10px 16px !important;
            border-radius: 0 !important;
            box-shadow: 0 8px 25px rgba(0,0,0,.22) !important;
          }

          .dedicated-nav-brand img,
          .dedicated-navbar-scrolled .dedicated-nav-brand img {
            height: 34px !important;
            max-width: 44px !important;
          }

          .dedicated-nav-brand {
            min-width: 34px !important;
          }

          .mobile-page-menu {
            width: 42px !important;
            height: 42px !important;
            flex: 0 0 42px !important;
            font-size: 22px !important;
          }

          .dedicated-mobile-menu {
            top: 70px !important;
            right: 12px !important;
            width: min(218px, calc(100vw - 24px)) !important;
            max-width: calc(100vw - 24px) !important;
          }

          .dedicated-mobile-menu a {
            padding: 14px 18px !important;
            font-size: 0.78rem !important;
          }

          /* ---------- WHATSAPP ---------- */
          .dedicated-whatsapp {
            right: 16px !important;
            bottom: 16px !important;
            width: 45px !important;
            height: 45px !important;
            z-index: 12000 !important;
          }

          .dedicated-whatsapp-icon {
            width: 45px !important;
            min-width: 45px !important;
            height: 45px !important;
          }

          .dedicated-whatsapp-icon svg {
            width: 23px !important;
            height: 23px !important;
          }

          /* ---------- ÁREAS ---------- */
          .dedicated-card-grid button {
            width: 100% !important;
            min-height: 0 !important;
            padding: 24px !important;
          }

          .dedicated-card-grid button h2 {
            font-size: 1.3rem !important;
            line-height: 1.25 !important;
          }

          .dedicated-card-grid button p {
            font-size: 0.92rem !important;
            line-height: 1.7 !important;
          }

          /* ---------- FIRMA ---------- */
          .dedicated-card-grid article img {
            object-position: top center !important;
          }

          .dedicated-card-grid article > div:first-child {
            height: 330px !important;
          }

          .dedicated-card-grid article > div:last-child {
            padding: 24px !important;
          }

          /* ---------- CASOS ---------- */
          .dedicated-filter-panel {
            padding: 14px !important;
            margin-bottom: 24px !important;
          }

          .dedicated-filter-grid {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 10px !important;
            width: 100% !important;
          }

          .dedicated-filter-grid > * {
            width: 100% !important;
            min-width: 0 !important;
            grid-column: auto !important;
          }

          .dedicated-input {
            min-height: 48px !important;
            padding: 13px 14px !important;
            font-size: 0.88rem !important;
          }

          .dedicated-date-filter {
            grid-column: auto !important;
          }

          .dedicated-case-card > div:first-child {
            flex-wrap: wrap !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }

          .dedicated-case-card > div:first-child span:last-child {
            margin-left: auto !important;
          }

          .dedicated-case-card h2 {
            font-size: 1.22rem !important;
            line-height: 1.35 !important;
            margin: 18px 0 12px !important;
          }

          .dedicated-case-card p {
            font-size: 0.92rem !important;
            line-height: 1.7 !important;
          }

          .dedicated-case-card > div:nth-last-child(2) {
            margin-top: 18px !important;
          }

          .dedicated-case-card > div:last-child {
            margin-top: 18px !important;
            padding-top: 14px !important;
          }

          /* ---------- DETALLE DE CASO ---------- */
          .dedicated-detail-panel h2 {
            font-size: 0.9rem !important;
            line-height: 1.3 !important;
          }

          .dedicated-detail-panel p {
            font-size: 0.92rem !important;
            line-height: 1.78 !important;
          }

          /* ---------- ARTÍCULOS ---------- */
          .dedicated-article-card.article-editorial,
          .article-editorial {
            width: 100% !important;
            max-width: 100% !important;
            padding: 26px 22px !important;
            margin: 0 !important;
          }

          .article-editorial-meta {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            gap: 8px !important;
            padding-bottom: 16px !important;
            margin-bottom: 24px !important;
          }

          .article-editorial-meta span:last-child {
            text-align: left !important;
          }

          .article-editorial-lead {
            font-size: 1.06rem !important;
            line-height: 1.82 !important;
            margin-bottom: 26px !important;
          }

          .article-editorial-body {
            width: 100% !important;
            max-width: 100% !important;
          }

          .article-editorial-body p {
            font-size: 0.98rem !important;
            line-height: 1.9 !important;
            margin-bottom: 20px !important;
          }

          /* ---------- CONTACTO ---------- */
          .container-padding-mobile {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          #contacto {
            padding: 52px 18px 38px !important;
          }

          #contacto h2 {
            font-size: clamp(1.9rem, 9vw, 2.45rem) !important;
            line-height: 1.12 !important;
          }

          #contacto form input,
          #contacto form textarea {
            width: 100% !important;
            font-size: 0.92rem !important;
          }

          #contacto form button {
            width: 100% !important;
            min-height: 52px !important;
            padding: 14px 18px !important;
          }

          /* ---------- INICIO PRINCIPAL ---------- */
          #inicio {
            min-height: auto !important;
            padding: 132px 18px 72px !important;
            background-position: center center !important;
          }

          #inicio > div {
            max-width: 100% !important;
            width: 100% !important;
          }

          #inicio h1 {
            font-size: clamp(2.45rem, 12vw, 3.45rem) !important;
            line-height: 1.08 !important;
            letter-spacing: 0.025em !important;
            overflow-wrap: anywhere !important;
          }

          #inicio p {
            font-size: 0.95rem !important;
            line-height: 1.72 !important;
            margin-bottom: 34px !important;
          }

          #inicio > div > div:last-child {
            width: 100% !important;
            gap: 12px !important;
          }

          #inicio > div > div:last-child a {
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 52px !important;
            padding: 14px 16px !important;
            font-size: 0.72rem !important;
            letter-spacing: 0.12em !important;
          }

          /* ---------- SECCIONES DE INICIO ---------- */
          #areas,
          #equipo,
          #casos,
          #articulos {
            padding-top: 54px !important;
            padding-bottom: 54px !important;
          }

          #areas .container-padding-mobile,
          #equipo .container-padding-mobile,
          #casos .container-padding-mobile,
          #articulos .container-padding-mobile {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          #areas h2,
          #equipo h2,
          #casos h2,
          #articulos h2 {
            font-size: clamp(1.8rem, 8.5vw, 2.4rem) !important;
            line-height: 1.12 !important;
          }

          .marquee-track {
            animation-duration: 52s !important;
          }

          .marquee-track > button {
            width: min(84vw, 320px) !important;
            min-width: min(84vw, 320px) !important;
            flex: 0 0 min(84vw, 320px) !important;
            padding: 28px 24px !important;
          }

          #equipo > div > div:last-child {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 18px !important;
          }

          #equipo > div > div:last-child > div > div:first-child {
            height: 300px !important;
          }

          #equipo > div > div:last-child > div > div:last-child {
            padding: 24px !important;
          }

          #casos > div > div:last-child,
          #articulos > div > div:last-child {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 18px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          #casos > div > div:last-child > div,
          #articulos > div > div:last-child > article {
            padding: 26px 22px !important;
          }

          #articulos > div > div:last-child > article h3,
          #casos > div > div:last-child > div h3 {
            font-size: 1.18rem !important;
            line-height: 1.35 !important;
          }

          /* ---------- FOOTER ---------- */
          footer.container-padding-mobile {
            padding: 34px 18px !important;
          }

          /* ---------- TRANSICIÓN ---------- */
          .route-transition-logo {
            width: 68px !important;
            height: 68px !important;
          }
        }

        @media (max-width: 380px) {
          .dedicated-page-container { padding-left: 15px !important; padding-right: 15px !important; }
          #inicio { padding-left: 15px !important; padding-right: 15px !important; }
          #inicio h1 { font-size: 2.25rem !important; }
          .dedicated-whatsapp { right: 14px !important; bottom: 14px !important; }
        }
      `}</style>

      <style>{`
        /* =========================================================
           AJUSTES ADICIONALES — SOLO TELÉFONO
           ========================================================= */
        @media (max-width: 768px) {
          /* CASOS DE ESTUDIO EN INICIO: tarjetas contenidas y sin desbordamiento */
          #casos-preview {
            overflow-x: hidden !important;
          }

          #casos-preview > div {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }

          #casos-preview .home-cases-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            overflow: hidden !important;
          }

          #casos-preview .home-cases-grid > button {
            display: flex !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            padding: 18px 16px !important;
            min-height: 0 !important;
            height: auto !important;
            flex: 0 0 auto !important;
          }

          #casos-preview .home-cases-grid > button > div,
          #casos-preview .home-cases-grid > button h3,
          #casos-preview .home-cases-grid > button p {
            min-width: 0 !important;
            max-width: 100% !important;
          }

          #casos-preview .home-cases-grid > button h3 {
            margin: 12px 0 8px !important;
            font-size: 1.05rem !important;
            line-height: 1.34 !important;
            overflow-wrap: anywhere !important;
          }

          #casos-preview .home-cases-grid > button p {
            font-size: .86rem !important;
            line-height: 1.55 !important;
            overflow-wrap: anywhere !important;
          }

          /* FILTROS: una sola barra horizontal desplazable */
          .dedicated-filter-panel {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            padding: 10px 12px !important;
            margin-bottom: 22px !important;
            overflow: hidden !important;
          }

          .dedicated-filter-grid {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-end !important;
            flex-wrap: nowrap !important;
            gap: 10px !important;
            width: max-content !important;
            min-width: max-content !important;
            max-width: none !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 2px 1px 4px !important;
            scroll-snap-type: x proximity !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }

          .dedicated-filter-grid::-webkit-scrollbar {
            display: none !important;
            height: 0 !important;
          }

          .dedicated-filter-field {
            flex: 0 0 auto !important;
            width: auto !important;
            min-width: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            scroll-snap-align: start !important;
          }

          .dedicated-filter-field:nth-child(1) {
            width: 190px !important;
          }

          .dedicated-filter-field:nth-child(2) {
            width: 158px !important;
          }

          .dedicated-filter-field:nth-child(3) {
            width: 174px !important;
          }

          .dedicated-filter-field:nth-child(4) {
            width: 156px !important;
          }

          .dedicated-filter-label {
            padding-left: 2px !important;
            font-size: .58rem !important;
            letter-spacing: .17em !important;
            line-height: 1 !important;
            white-space: nowrap !important;
          }

          .dedicated-filter-field .dedicated-input,
          .dedicated-filter-field select,
          .dedicated-filter-field input[type="date"] {
            width: 100% !important;
            min-width: 0 !important;
            height: 44px !important;
            min-height: 44px !important;
            padding: 0 38px 0 13px !important;
            font-size: .82rem !important;
            line-height: 44px !important;
            box-sizing: border-box !important;
          }

          .dedicated-filter-field input[type="date"] {
            padding-right: 10px !important;
          }

          .dedicated-select-wrap::after {
            right: 14px !important;
          }

          /* ARTÍCULOS/CASOS: eliminar completamente el espacio del CTA oculto */
          .dedicated-mobile-click-card > div:last-child {
            display: none !important;
          }

          .dedicated-mobile-click-card {
            min-height: 0 !important;
            height: auto !important;
            justify-content: flex-start !important;
            box-sizing: border-box !important;
          }

          .dedicated-mobile-click-card > div:first-of-type {
            margin-bottom: 0 !important;
          }
        }
      `}</style>

      <style>{`
        /* =========================================================
           FILTROS MÓVILES — BARRA HORIZONTAL REAL
           Este bloque es exclusivamente para teléfono.
           No modifica la versión de escritorio.
           ========================================================= */
        @media (max-width: 768px) {
          .dedicated-filter-panel {
            width: 100% !important;
            max-width: 100% !important;
            height: 66px !important;
            min-height: 66px !important;
            padding: 9px !important;
            margin: 0 0 22px !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            position: relative !important;
          }

          .dedicated-filter-panel::after {
            content: '';
            position: absolute;
            z-index: 10;
            top: 0;
            right: 0;
            bottom: 0;
            width: 30px;
            pointer-events: none;
            background: linear-gradient(90deg, rgba(9,13,20,0), #090d14 88%);
          }

          .dedicated-filter-grid {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            height: 46px !important;
            min-height: 46px !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 0 28px 0 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-x: contain !important;
            touch-action: pan-x !important;
            scroll-behavior: smooth !important;
            scroll-snap-type: x proximity !important;
            scrollbar-width: none !important;
          }

          .dedicated-filter-grid::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }

          .dedicated-filter-field {
            position: relative !important;
            display: flex !important;
            flex: 0 0 auto !important;
            flex-direction: row !important;
            align-items: center !important;
            width: auto !important;
            min-width: 0 !important;
            height: 44px !important;
            margin: 0 !important;
            gap: 0 !important;
            scroll-snap-align: start !important;
          }

          .dedicated-filter-label {
            display: none !important;
          }

          .dedicated-filter-field .dedicated-input,
          .dedicated-filter-field select,
          .dedicated-filter-field input[type="date"] {
            flex: 0 0 auto !important;
            height: 44px !important;
            min-height: 44px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(148,163,184,.22) !important;
            border-radius: 4px !important;
            background: #0d131f !important;
            color: #e8edf5 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            font-size: .78rem !important;
            line-height: 44px !important;
            outline: none !important;
          }

          /* Buscar: botón compacto que se expande al tocarlo */
          .dedicated-filter-field:first-child {
            width: 46px !important;
            height: 44px !important;
            overflow: hidden !important;
            border: 1px solid rgba(148,163,184,.22) !important;
            border-radius: 999px !important;
            background: #0d131f !important;
            transition: width 280ms cubic-bezier(.22,1,.36,1) !important;
          }

          .dedicated-filter-field:first-child::before {
            content: '';
            position: absolute;
            z-index: 3;
            left: 14px;
            top: 13px;
            width: 12px;
            height: 12px;
            border: 1.5px solid #a7b6ca;
            border-radius: 50%;
            box-sizing: border-box;
            pointer-events: none;
          }

          .dedicated-filter-field:first-child::after {
            content: '';
            position: absolute;
            z-index: 3;
            left: 25px;
            top: 25px;
            width: 6px;
            height: 1.5px;
            background: #a7b6ca;
            transform: rotate(45deg);
            transform-origin: left center;
            pointer-events: none;
          }

          .dedicated-filter-field:first-child:focus-within {
            width: 205px !important;
            border-radius: 7px !important;
          }

          .dedicated-filter-field:first-child .dedicated-input {
            width: 100% !important;
            min-width: 100% !important;
            padding: 0 12px 0 40px !important;
            border: 0 !important;
            background: transparent !important;
            color: #f8fafc !important;
            line-height: 44px !important;
          }

          .dedicated-filter-field:first-child .dedicated-input::placeholder {
            color: #7f8da2 !important;
            opacity: 1 !important;
          }

          .dedicated-filter-field:nth-child(2) select {
            width: 142px !important;
            padding: 0 34px 0 13px !important;
          }

          .dedicated-filter-field:nth-child(3) select {
            width: 148px !important;
            padding: 0 34px 0 13px !important;
          }

          .dedicated-filter-field:nth-child(4) input[type="date"] {
            width: 148px !important;
            padding: 0 12px !important;
            color-scheme: dark !important;
          }

          .dedicated-select-wrap::after {
            right: 14px !important;
            top: 50% !important;
            width: 6px !important;
            height: 6px !important;
            border-right: 1.5px solid #8fa3bd !important;
            border-bottom: 1.5px solid #8fa3bd !important;
          }

          .dedicated-filter-field input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: .62 !important;
            filter: invert(75%) sepia(15%) saturate(500%) hue-rotate(175deg) !important;
          }
        }
      `}</style>
      <RouteTransitionStyles />
      <RouteTransition phase={transitionPhase} />

      <style>{`
        .dedicated-navbar {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 100%;
          height: 82px;
          padding: 16px 64px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(6, 9, 14, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(30, 58, 138, 0.3);
          z-index: 1100;
          transition: width 420ms cubic-bezier(.16,1,.3,1), max-width 420ms cubic-bezier(.16,1,.3,1), top 420ms cubic-bezier(.16,1,.3,1), height 420ms cubic-bezier(.16,1,.3,1), padding 420ms cubic-bezier(.16,1,.3,1), border-radius 420ms cubic-bezier(.16,1,.3,1), box-shadow 420ms cubic-bezier(.16,1,.3,1);
        }
        .dedicated-navbar-scrolled {
          top: 16px;
          width: 88%;
          max-width: 1200px;
          height: 60px;
          padding: 10px 32px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,.5);
        }
        .dedicated-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #fff;
        }
        .dedicated-nav-brand img { height: 46px; width: auto; object-fit: contain; transition: height 420ms cubic-bezier(.16,1,.3,1); }
        .dedicated-navbar-scrolled .dedicated-nav-brand img { height: 36px; }
        .dedicated-nav-brand span { font: 600 1.05rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; letter-spacing: .18em; }
        .dedicated-page-nav { display: flex; align-items: center; gap: 30px; }
        .dedicated-nav-link { position: relative; display: flex; align-items: center; justify-content: center; min-width: 44px; height: 34px; color: #cbd5e1; text-decoration: none; font: 500 .8rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; text-transform: uppercase; letter-spacing: .18em; }
        .dedicated-nav-label { max-width: 150px; opacity: 1; transform: translateY(0); transition: max-width 420ms cubic-bezier(.16,1,.3,1), opacity 240ms ease, transform 420ms cubic-bezier(.16,1,.3,1); white-space: nowrap; overflow: hidden; }
        .dedicated-nav-icon { position: absolute; width: 23px; height: 23px; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(8px) scale(.7); transition: opacity 260ms ease, transform 420ms cubic-bezier(.16,1,.3,1); }
        .dedicated-nav-icon svg { width: 100%; height: 100%; }
        .dedicated-navbar-scrolled .dedicated-nav-label { max-width: 0; opacity: 0; transform: translateY(-8px); }
        .dedicated-navbar-scrolled .dedicated-nav-icon { opacity: 1; transform: translateY(0) scale(1); }
        .dedicated-nav-underline { position: absolute; left: 0; right: 0; bottom: 0; height: 1.5px; background: #60a5fa; transform: scaleX(0); transform-origin: right center; transition: transform 300ms cubic-bezier(.16,1,.3,1); }
        .dedicated-nav-link:hover { color: #fff; }
        .dedicated-nav-link:hover .dedicated-nav-underline { transform: scaleX(1); transform-origin: left center; }

        /* WhatsApp — mismo aspecto y comportamiento que el botón de la interfaz principal */
        .dedicated-whatsapp-main {
          position: fixed !important;
          right: 20px !important;
          bottom: 20px !important;
          z-index: 12000 !important;
          width: 45px !important;
          height: 45px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
          border: none !important;
          border-radius: 50% !important;
          background-color: #00d757 !important;
          color: #fff !important;
          text-decoration: none !important;
          cursor: pointer !important;
          box-shadow: 2px 2px 10px rgba(0,0,0,.3) !important;
          transition: width .3s ease, border-radius .3s ease, transform .3s ease, box-shadow .3s ease !important;
          isolation: isolate;
        }
        .dedicated-whatsapp-sign {
          width: 45px !important;
          min-width: 45px !important;
          height: 45px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
        }
        .dedicated-whatsapp-sign svg {
          display: block !important;
          width: 25px !important;
          height: 25px !important;
        }
        .dedicated-whatsapp-label {
          position: absolute !important;
          left: 45px !important;
          top: 0 !important;
          height: 45px !important;
          width: 0 !important;
          display: flex !important;
          align-items: center !important;
          color: #fff !important;
          opacity: 0 !important;
          overflow: hidden !important;
          white-space: nowrap !important;
          font: 600 1.1em/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif !important;
          transition: opacity .3s ease, width .3s ease !important;
        }
        .dedicated-whatsapp-main:hover {
          width: 160px !important;
          border-radius: 40px !important;
          transform: translateY(-1px);
          box-shadow: 2px 6px 16px rgba(0,0,0,.32) !important;
        }
        .dedicated-whatsapp-main:hover .dedicated-whatsapp-label {
          width: 100px !important;
          opacity: 1 !important;
        }
        .dedicated-whatsapp-main:active {
          transform: translate(2px,2px);
        }

        .mobile-page-menu { display: none; background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; padding: 0; width: 40px; height: 40px; }
        .dedicated-mobile-menu { position: fixed; top: 66px; right: 16px; width: 210px; background: rgba(10,15,25,.97); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 8px 0; box-shadow: 0 20px 40px rgba(0,0,0,.7); }
        .dedicated-mobile-menu a { display: block; color: #e2e8f0; text-decoration: none; font: 400 .82rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; letter-spacing: .12em; padding: 13px 20px; }
        .dedicated-mobile-menu a:hover { background: rgba(255,255,255,.05); color: #fff; }
        /* =========================================================
           ÁREAS DE PRÁCTICA — CINTA HORIZONTAL
           ========================================================= */
        .marquee-track {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          width: max-content;
          min-width: 100%;
          animation: marqueeAreas 48s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-track > button {
          flex: 0 0 340px;
        }

        @keyframes marqueeAreas {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        @media (max-width: 768px) {
          /* =====================================================
             CASOS DE ESTUDIO — SOLO MÓVIL
             Un caso por fila, como una lista editorial.
             ===================================================== */
          #casos-preview > div > .home-cases-grid {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
            width: 100% !important;
            box-sizing: border-box !important;
            gap: 14px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          #casos-preview > div > .home-cases-grid > button {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            height: auto !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
            align-items: start !important;
            padding: 22px 20px !important;
            margin: 0 !important;
            text-align: left !important;
          }

          #casos-preview .home-cases-grid > button > div:first-child {
            width: 100% !important;
          }

          #casos-preview .home-cases-grid > button h3 {
            font-size: 1.05rem !important;
            line-height: 1.35 !important;
            margin: 15px 0 9px 0 !important;
          }

          #casos-preview .home-cases-grid > button p {
            font-size: .88rem !important;
            line-height: 1.55 !important;
          }

          #casos-preview .home-cases-grid > button > div:last-child {
            width: 100% !important;
            margin-top: 18px !important;
            padding-top: 13px !important;
            box-sizing: border-box !important;
            font-size: .68rem !important;
            line-height: 1.4 !important;
          }

          .dedicated-navbar, .dedicated-navbar-scrolled { top: 0; width: 100%; max-width: 100%; height: 64px; padding: 10px 16px; border-radius: 0; box-shadow: none; }
          .dedicated-nav-brand img, .dedicated-navbar-scrolled .dedicated-nav-brand img { height: 34px; }
          .dedicated-nav-brand span { display: none; }
          .dedicated-page-nav { display: none; }
          .mobile-page-menu { display: flex; align-items: center; justify-content: center; }
          .dedicated-whatsapp-main { right: 20px !important; bottom: 20px !important; width: 45px !important; height: 45px !important; }
          .dedicated-whatsapp-main:hover { width: 45px !important; border-radius: 50% !important; transform: none; }
          .dedicated-whatsapp-main:hover .dedicated-whatsapp-label { opacity: 0 !important; width: 0 !important; }
        }
      `}</style>

      <style>{`
        /* AJUSTES SOLO MÓVIL PARA LAS INTERFACES DEDICADAS */
        @media (max-width: 768px) {
          .dedicated-filter-panel {
            padding: 16px !important;
            margin-bottom: 24px !important;
            border-color: rgba(96,165,250,.18) !important;
          }
          .dedicated-filter-grid {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 14px !important;
            width: 100% !important;
          }
          .dedicated-filter-field {
            display: flex !important;
            flex-direction: column !important;
            gap: 7px !important;
            width: 100% !important;
            min-width: 0 !important;
          }
          .dedicated-filter-label {
            display: block !important;
            color: #789fd2 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            font-size: .62rem !important;
            font-weight: 600 !important;
            letter-spacing: .18em !important;
            text-transform: uppercase !important;
            line-height: 1 !important;
          }
          .dedicated-filter-field .dedicated-input,
          .dedicated-filter-field select,
          .dedicated-filter-field input[type="date"] {
            width: 100% !important;
            min-width: 0 !important;
            height: 48px !important;
            min-height: 48px !important;
            margin: 0 !important;
            padding: 0 42px 0 14px !important;
            border-radius: 2px !important;
            font-size: .86rem !important;
            line-height: 48px !important;
            box-sizing: border-box !important;
          }
          .dedicated-filter-field input[type="date"] {
            padding-right: 12px !important;
            color-scheme: dark !important;
          }
          .dedicated-filter-field input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: .72;
            filter: invert(75%) sepia(15%) saturate(500%) hue-rotate(175deg);
          }
          .dedicated-select-wrap::after {
            right: 16px !important;
            top: 50% !important;
          }
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
            padding: 0 !important;
            margin: 0 !important;
            border: 0 !important;
            background: transparent !important;
            cursor: pointer !important;
            z-index: 5 !important;
          }
          .dedicated-mobile-click-card > *:not(.mobile-card-link) {
            position: relative !important;
            z-index: 1 !important;
          }
          .dedicated-mobile-click-card h2 {
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
        }
        @media (min-width: 769px) {
          .mobile-card-link, .dedicated-filter-label { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default PageNavbar;

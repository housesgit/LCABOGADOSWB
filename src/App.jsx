import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.png';
import heroBg from './imagendefondo1.jpg';
import socio1 from './LACOUTURE.jpg';
import socio2 from './CORONADO.jpg';
import { supabase } from './supabaseClient'


const WHATSAPP_URL = 'https://wa.me/573113361929?text=';
const whatsappGeneral = `${WHATSAPP_URL}${encodeURIComponent('Hola, me gustaría solicitar asesoría jurídica.')}`;

const areasList = [
  { title: "Derecho Civil", desc: "Gestión experta en contratos, sucesiones, asuntos de familia y salvaguarda del patrimonio personal." },
  { title: "Derecho Laboral", desc: "Consultoría preventiva y representación rigurosa tanto para la protección de los derechos del trabajador como para la gestión empresarial." },
  { title: "Derecho Penal", desc: "Defensa técnica especializada y acompañamiento jurídico estratégico ante cualquier contingencia o proceso judicial." },
  { title: "Derecho Comercial", desc: "Estructuración de negocios, contratos mercantiles y blindaje jurídico para transacciones corporativas." }
];


const areaDetails = {
  "Derecho Civil": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Civil",
    intro: "Acompañamiento jurídico en las relaciones patrimoniales y personales que se desarrollan en el ámbito civil, con una visión preventiva y estratégica.",
    sections: [
      ["Alcance de la práctica", "Atendemos asuntos relacionados con contratos civiles, obligaciones, responsabilidad, sucesiones, asuntos de familia y protección del patrimonio personal."],
      ["Enfoque", "La estrategia parte de identificar riesgos, ordenar la documentación y definir con claridad las obligaciones y derechos de cada parte antes de que una controversia escale."],
      ["¿Cuándo puede ser relevante?", "Cuando existe un conflicto contractual, una reclamación de responsabilidad, una sucesión, una situación familiar con efectos patrimoniales o la necesidad de proteger un activo o derecho."],
      ["Acompañamiento", "El trabajo puede abarcar análisis documental, estructuración de alternativas, negociación y, cuando corresponda, acompañamiento en la etapa judicial."]
    ]
  },
  "Derecho Laboral": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Laboral",
    intro: "Consultoría preventiva y acompañamiento estratégico para empresas y trabajadores frente a relaciones laborales, reorganizaciones y contingencias.",
    sections: [
      ["Alcance de la práctica", "Comprende la revisión de relaciones laborales, documentación, procesos de reorganización, prevención de contingencias y manejo de controversias derivadas de la relación de trabajo."],
      ["Enfoque", "Se busca anticipar riesgos mediante procesos ordenados, documentación consistente y decisiones que tengan respaldo jurídico antes de convertirse en una reclamación."],
      ["¿Cuándo puede ser relevante?", "En procesos de contratación, cambios organizacionales, terminaciones, conflictos individuales o colectivos y situaciones donde exista exposición a reclamaciones laborales."],
      ["Acompañamiento", "La firma puede intervenir desde la prevención y revisión documental hasta la negociación y la defensa de los intereses del cliente en una controversia."]
    ]
  },
  "Derecho Penal": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Penal",
    intro: "Defensa técnica y acompañamiento estratégico frente a investigaciones, procesos y contingencias de naturaleza penal.",
    sections: [
      ["Alcance de la práctica", "La práctica se centra en la preparación de estrategias de defensa, análisis de hechos y documentos y acompañamiento durante las distintas etapas de una actuación penal."],
      ["Enfoque", "Cada asunto requiere construir una lectura precisa de los hechos, valorar la evidencia disponible y definir una estrategia coherente con el escenario procesal."],
      ["¿Cuándo puede ser relevante?", "Ante una denuncia, investigación, citación, imputación o cualquier situación en la que una persona o empresa pueda estar expuesta a consecuencias de naturaleza penal."],
      ["Acompañamiento", "El acompañamiento se estructura alrededor del análisis del caso, la preparación de la defensa y la toma de decisiones informadas durante el proceso."]
    ]
  },
  "Derecho Comercial": {
    eyebrow: "Especialidad jurídica",
    title: "Derecho Comercial",
    intro: "Estructuración de negocios y protección jurídica de operaciones comerciales, societarias y contractuales.",
    sections: [
      ["Alcance de la práctica", "Incluye estructuración de negocios, sociedades, contratos mercantiles, gobierno corporativo, negociación y prevención de riesgos en operaciones empresariales."],
      ["Enfoque", "La asesoría conecta la decisión jurídica con la realidad del negocio: objetivos comerciales, estructura societaria, riesgos, obligaciones y mecanismos de protección."],
      ["¿Cuándo puede ser relevante?", "En constitución o reorganización de sociedades, negociación de contratos, operaciones con activos, disputas entre socios, gobierno corporativo y decisiones con impacto patrimonial."],
      ["Acompañamiento", "La firma puede acompañar la etapa de diseño, negociación, documentación, prevención de contingencias y manejo estratégico de controversias."]
    ]
  }
};

const caseStudies = [
  {
    id: 'reestructuracion-patrimonial-transfronteriza',
    date: '2026-08-08',
    displayDate: 'Agosto 8, 2026',
    area: 'Derecho Comercial',
    category: 'Comercial',
    keywords: ['reestructuración', 'patrimonio', 'transfronterizo', 'sociedades', 'activos'],
    title: 'Reestructuración Patrimonial Transfronteriza',
    summary: 'Defensa y reorganización corporativa de activos industriales con operaciones en el Caribe y la región Andina, blindando el capital social.',
    context: 'Una estructura empresarial con activos distribuidos en distintas jurisdicciones requería reorganizar participaciones, contratos y riesgos patrimoniales sin detener la operación.',
    strategy: 'Se diseñó una estrategia integral de reorganización societaria, revisión contractual y coordinación de activos, priorizando la continuidad operativa y la reducción de contingencias.',
    result: 'La estructura propuesta permitió ordenar la exposición jurídica de las operaciones y establecer una hoja de ruta para la protección patrimonial y la toma de decisiones corporativas.',
    tags: ['Derecho Comercial', 'Comercial', 'Sociedades', 'Patrimonio']
  },
  {
    id: 'blindaje-contractual-infraestructura',
    date: '2026-07-21',
    displayDate: 'Julio 21, 2026',
    area: 'Derecho Administrativo',
    category: 'Otra área',
    keywords: ['contratos', 'infraestructura', 'licitaciones', 'concesiones', 'riesgos'],
    title: 'Blindaje Contractual en Sector Infraestructura',
    summary: 'Asesoría integral y prevención de riesgos legales en licitaciones y contratos de concesión pública de alta envergadura.',
    context: 'Una compañía participante en un proceso de infraestructura necesitaba evaluar riesgos contractuales, obligaciones, mecanismos de modificación y escenarios de incumplimiento.',
    strategy: 'Se realizó una revisión jurídica preventiva de las condiciones contractuales, matriz de riesgos y puntos críticos de ejecución, con especial atención a las obligaciones de las partes.',
    result: 'La revisión permitió identificar contingencias relevantes antes de la firma y ajustar la posición contractual para reducir escenarios de conflicto durante la ejecución.',
    tags: ['Derecho Administrativo', 'Infraestructura', 'Contratos', 'Licitaciones']
  },
  {
    id: 'disputa-societaria',
    date: '2026-06-14',
    displayDate: 'Junio 14, 2026',
    area: 'Derecho Comercial',
    category: 'Comercial',
    keywords: ['sociedades', 'disputa', 'accionistas', 'gobierno corporativo'],
    title: 'Controversia Societaria y Gobierno Corporativo',
    summary: 'Acompañamiento estratégico ante una disputa entre accionistas con impacto sobre decisiones de gobierno corporativo.',
    context: 'La controversia entre accionistas generó bloqueos en decisiones relevantes y aumentó el riesgo de litigio y deterioro del valor empresarial.',
    strategy: 'Se estructuró una estrategia de negociación, revisión estatutaria y protección de los intereses de la compañía y sus socios, priorizando soluciones documentadas y sostenibles.',
    result: 'Se consiguió encauzar la controversia mediante acuerdos de gobierno y mecanismos de toma de decisiones que redujeron la exposición a litigios.',
    tags: ['Derecho Comercial', 'Accionistas', 'Gobierno Corporativo']
  },
  {
    id: 'contingencia-laboral',
    date: '2026-05-30',
    displayDate: 'Mayo 30, 2026',
    area: 'Derecho Laboral',
    category: 'Otra área',
    keywords: ['laboral', 'reestructuración', 'empleados', 'contingencias'],
    title: 'Prevención de Contingencias en Reestructuración Laboral',
    summary: 'Diseño de medidas preventivas para una reorganización de personal con especial atención a riesgos laborales y documentales.',
    context: 'Una empresa afrontaba una reorganización interna y necesitaba reducir riesgos de reclamaciones derivadas de decisiones laborales.',
    strategy: 'Se revisaron procesos, soportes documentales y criterios de actuación para alinear la reorganización con una estrategia preventiva y ordenada.',
    result: 'La compañía obtuvo una ruta de actuación más clara, con documentación reforzada y criterios homogéneos para la gestión de la reorganización.',
    tags: ['Derecho Laboral', 'Prevención', 'Empresa']
  }
];

const articles = [
  {
    id: 'regulaciones-corporativas-patrimonial',
    date: '2026-08-12',
    displayDate: 'Agosto 12, 2026',
    author: 'Dr. Socio Director',
    area: 'Derecho Comercial',
    keywords: ['regulaciones', 'corporativo', 'patrimonio', 'administradores', 'sociedades'],
    title: 'Impacto de las nuevas regulaciones corporativas en el régimen patrimonial',
    snippet: 'Análisis crítico sobre las recientes modificaciones en la responsabilidad de los administradores y la protección de bienes sociales...',
    intro: 'La evolución del entorno corporativo exige que las compañías revisen de forma periódica sus estructuras de gobierno, sus mecanismos de control y la documentación que respalda las decisiones de sus administradores.',
    body: [
      'En materia societaria, la prevención jurídica no depende únicamente de reaccionar ante un conflicto. Una estructura corporativa sólida debe identificar con antelación los puntos de exposición patrimonial y los riesgos derivados de decisiones que comprometan los intereses sociales.',
      'La revisión de estatutos, contratos, poderes y protocolos internos permite establecer responsabilidades más claras y mejorar la trazabilidad de las decisiones. Esto adquiere especial relevancia cuando existen varios socios, operaciones vinculadas o activos distribuidos en diferentes vehículos societarios.',
      'La recomendación práctica es integrar la revisión jurídica al funcionamiento ordinario de la empresa, con controles periódicos y documentación suficiente para respaldar las decisiones estratégicas.'
    ]
  },
  {
    id: 'estrategias-derecho-laboral',
    date: '2026-07-28',
    displayDate: 'Julio 28, 2026',
    author: 'Equipo de Litigios',
    area: 'Derecho Laboral',
    keywords: ['laboral', 'prevención', 'reestructuración', 'riesgos', 'empresas'],
    title: 'Estrategias preventivas frente a contingencias en el derecho laboral moderno',
    snippet: 'Lineamientos esenciales que toda compañía debe implementar para mitigar riesgos en procesos de reestructuración de personal...',
    intro: 'Las decisiones laborales con impacto empresarial deben estar respaldadas por una metodología preventiva que permita identificar riesgos antes de que se conviertan en controversias.',
    body: [
      'Una política preventiva eficaz comienza por documentar adecuadamente las decisiones y mantener criterios coherentes frente a situaciones comparables. Esto reduce la incertidumbre y facilita la defensa de la empresa cuando surge una reclamación.',
      'Durante procesos de reestructuración, resulta especialmente importante revisar los procedimientos internos, la comunicación con el personal y la consistencia entre la decisión empresarial y la documentación que la soporta.',
      'La prevención no elimina todos los conflictos, pero sí puede reducir significativamente su frecuencia, su coste y la dificultad de responder a ellos.'
    ]
  },
  {
    id: 'contratos-empresa-riesgos',
    date: '2026-06-18',
    displayDate: 'Junio 18, 2026',
    author: 'Área de Derecho Comercial',
    area: 'Derecho Comercial',
    keywords: ['contratos', 'empresas', 'riesgos', 'negociación', 'comercial'],
    title: 'Cláusulas contractuales que una empresa no debería revisar a última hora',
    snippet: 'Una mirada práctica a las disposiciones contractuales que más pueden afectar la operación y la posición negociadora de una compañía...',
    intro: 'La negociación de un contrato empresarial no debería reducirse a revisar el precio y el objeto. Algunas cláusulas determinan de manera directa quién asume el riesgo cuando algo sale mal.',
    body: [
      'Las cláusulas sobre incumplimiento, terminación, responsabilidad, garantías y solución de controversias pueden cambiar de forma sustancial la posición jurídica de las partes.',
      'Una revisión temprana permite negociar con mayor margen y evitar aceptar condiciones que después resulten costosas de modificar o difíciles de ejecutar.',
      'El enfoque más eficiente consiste en analizar el contrato junto con el modelo de negocio, los riesgos operativos y la capacidad real de cumplimiento de cada parte.'
    ]
  },
  {
    id: 'litigio-preventivo-estrategia',
    date: '2026-05-09',
    displayDate: 'Mayo 9, 2026',
    author: 'Equipo de Litigios',
    area: 'Derecho Civil',
    keywords: ['litigio', 'prevención', 'civil', 'prueba', 'estrategia'],
    title: 'Del conflicto a la estrategia: por qué la preparación previa importa',
    snippet: 'La preparación probatoria y documental puede ser determinante mucho antes de que una controversia llegue a los tribunales...',
    intro: 'Cuando una controversia comienza, las decisiones tomadas durante las primeras etapas suelen ser determinantes para el camino posterior del caso.',
    body: [
      'La conservación de documentos, la identificación de hechos relevantes y la construcción temprana de una línea de tiempo permiten valorar con mayor precisión la posición jurídica de una parte.',
      'También es importante distinguir entre la información que demuestra un hecho y la que simplemente aporta contexto. Esa diferencia puede cambiar la manera en que se formula una estrategia.',
      'Una estrategia preventiva no significa asumir que habrá un juicio, sino estar preparado para defender la posición jurídica si el conflicto escala.'
    ]
  }
];


function RouteTransitionStyles() {
  return (
    <style>{`
      @keyframes routeCover {
        0% {
          transform: translate3d(0, 100%, 0);
          opacity: 0;
        }
        18% {
          opacity: 0.72;
        }
        100% {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }

      @keyframes routeReveal {
        0% {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        18% {
          opacity: 0.98;
        }
        100% {
          transform: translate3d(0, -100%, 0);
          opacity: 0;
        }
      }

      @keyframes routeLogoCover {
        0%, 52% {
          opacity: 0;
          transform: translate3d(-50%, -50%, 0) scale(0.92);
        }
        68% {
          opacity: 1;
          transform: translate3d(-50%, -50%, 0) scale(1);
        }
        100% {
          opacity: 1;
          transform: translate3d(-50%, -50%, 0) scale(1);
        }
      }

      @keyframes routeLogoReveal {
        0% {
          opacity: 1;
          transform: translate3d(-50%, -50%, 0) scale(1);
        }
        35% {
          opacity: 0.78;
          transform: translate3d(-50%, -50%, 0) scale(0.98);
        }
        100% {
          opacity: 0;
          transform: translate3d(-50%, -50%, 0) scale(0.94);
        }
      }

      .route-transition {
        position: fixed;
        inset: 0;
        z-index: 99999;
        pointer-events: none;
        will-change: transform, opacity;
        transform: translate3d(0, 100%, 0);
        background:
          radial-gradient(circle at 50% 45%, rgba(30,58,138,0.10), transparent 42%),
          linear-gradient(180deg, #070b12 0%, #06090e 55%, #05080d 100%);
        border-top: 1px solid rgba(96,165,250,0.20);
        box-shadow:
          0 -20px 70px rgba(0,0,0,0.18) inset,
          0 18px 55px rgba(0,0,0,0.22);
        backface-visibility: hidden;
      }

      .route-transition::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: min(180px, 28vw);
        height: 1px;
        transform: translate3d(-50%, -50%, 0);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(147,197,253,0.34),
          transparent
        );
        opacity: 0.55;
      }

      .route-transition-logo {
        position: absolute;
        left: 50%;
        top: 50%;
        width: clamp(62px, 7vw, 94px);
        height: clamp(62px, 7vw, 94px);
        object-fit: contain;
        transform: translate3d(-50%, -50%, 0) scale(0.92);
        opacity: 0;
        z-index: 2;
        filter: drop-shadow(0 0 22px rgba(147,197,253,0.14));
        pointer-events: none;
        will-change: transform, opacity;
      }

      .route-transition.cover .route-transition-logo {
        animation: routeLogoCover 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      .route-transition.reveal .route-transition-logo {
        opacity: 1;
        transform: translate3d(-50%, -50%, 0) scale(1);
        animation: routeLogoReveal 680ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }

      .route-transition.cover {
        animation: routeCover 460ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }

      .route-transition.reveal {
        animation: routeReveal 680ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
      }

      @media (prefers-reduced-motion: reduce) {
        .route-transition {
          animation: none !important;
          opacity: 0 !important;
        }
        .route-transition-logo {
          animation: none !important;
          opacity: 0 !important;
        }
      }
    `}</style>
  );
}

function RouteTransition({ phase }) {
  if (!phase || phase === 'idle') return null;
  return (
    <div aria-hidden="true" className={`route-transition ${phase}`}>
      <img
        src={logo}
        alt=""
        className="route-transition-logo"
      />
    </div>
  );
}

const dedicatedNavItems = [
  {
    label: 'Inicio', href: '#inicio',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5v9.25A1.25 1.25 0 0 1 19.75 21h-15A1.25 1.25 0 0 1 3.5 19.75Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    label: 'Áreas', href: '#areas',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
  },
  {
    label: 'Firma', href: '#firma',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0M16.5 4a4 4 0 0 1 0 6.2M17 14a4.8 4.8 0 0 1 4.5 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  },
  {
    label: 'Casos', href: '#casos',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  },
  {
    label: 'Artículos', href: '#articulos',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5A1.5 1.5 0 0 0 4.5 5v14A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5V8L13 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M13 3.5V8h6.5M8 12h8M8 15.5h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  },
  {
    label: 'Contacto', href: '#contacto',
    icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
];

function DedicatedWhatsappButton() {
  return (
    <a
      href={whatsappGeneral}
      target="_blank"
      rel="noopener noreferrer"
      className="dedicated-whatsapp-main"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="dedicated-whatsapp-sign" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </span>
      <span className="dedicated-whatsapp-label">WhatsApp</span>
    </a>
  );
}

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
              onClick={(e) => { e.preventDefault(); navigate(item.href); }}
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
                onClick={(e) => { e.preventDefault(); navigate(item.href); }}
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

          .marquee-track > div {
            width: min(84vw, 320px) !important;
            min-width: min(84vw, 320px) !important;
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

function ContactDedicatedPage() {
  const [enviado, setEnviado] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setEnviado(true); setTimeout(() => setEnviado(false), 5000); e.currentTarget.reset(); };
  return (
    <div className="dedicated-page-enter contact-dedicated-page" style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: '#fff', color: '#111827', fontFamily: 'Georgia, serif' }}>
      <section className="container-padding-mobile" style={{ width: '100%', boxSizing: 'border-box', padding: '60px 64px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#1e3a8a', display: 'block', marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>Asesoría Legal a su Medida</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 500, margin: '0 0 16px', color: '#0f2043', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Hablemos de su caso</h1>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>Comparta los detalles de su situación. Analizaremos su requerimiento con total discreción y le daremos una respuesta clara.</p>
          </div>
          {enviado && <div style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '20px', marginBottom: '31px', fontSize: '0.9rem', textAlign: 'center' }}>Su solicitud ha sido registrada con éxito. Nos pondremos en contacto a la brevedad.</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>Nombre completo o Empresa</label>
            <input required type="text" placeholder="Ej. Corporación S.A." style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', boxSizing: 'border-box', fontSize: '0.95rem' }} />
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '10px 0 0', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>Correo electrónico de contacto</label>
            <input required type="email" placeholder="contacto@ejemplo.com" style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', boxSizing: 'border-box', fontSize: '0.95rem' }} />
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '10px 0 0', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>Detalle de la consulta</label>
            <textarea required rows="5" placeholder="Describa brevemente su requerimiento legal..." style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', resize: 'vertical', boxSizing: 'border-box', fontSize: '0.95rem' }} />
            <button type="submit" style={{ backgroundColor: '#1e3a8a', border: '0.125em solid #1e3a8a', color: '#fff', cursor: 'pointer', padding: '1em 2.3em', margin: '12px 0 0', minHeight: '3.75em', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Enviar Consulta</button>
          </form>
        </div>
      </section>
      <style>{`@media(max-width:768px){.container-padding-mobile{padding-left:20px!important;padding-right:20px!important}}`}</style>
    </div>
  );
}

const pageStyles = {
  bg: '#06090e',
  panel: '#0d131f',
  panelAlt: '#0f172a',
  border: 'rgba(30, 58, 138, 0.4)',
  blue: '#60a5fa',
  lightBlue: '#93c5fd',
  text: '#f8fafc',
  muted: '#94a3b8'
};

function PageShell({ eyebrow, title, description, onBack, children, headingAlign = 'center', headingMaxWidth = '1050px', headingClassName = '', mobileMeta = null }) {
  return (
    <div className="dedicated-page-enter" style={{ minHeight: '100vh', backgroundColor: pageStyles.bg, color: pageStyles.text, fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '132px 64px 80px' }} className="dedicated-page-container">
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: pageStyles.lightBlue, cursor: 'pointer', padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '42px' }}>
          ← Volver
        </button>

        <div className={`dedicated-page-heading dedicated-page-heading-enter ${headingAlign === 'left' ? 'dedicated-page-heading-left' : ''} ${headingClassName}`} style={{ textAlign: headingAlign, maxWidth: headingMaxWidth, margin: '0 auto 54px' }}>
          <span className="dedicated-page-eyebrow" style={{ display: 'block', color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '18px' }}>{eyebrow}</span>
          {mobileMeta && <div className="dedicated-mobile-detail-meta" aria-label="Información del contenido">{mobileMeta}</div>}
          <h1 className="dedicated-page-title" style={{
            margin: 0,
            fontSize: 'clamp(2.15rem, 4.6vw, 4.35rem)',
            fontWeight: 400,
            letterSpacing: '0.035em',
            textTransform: 'uppercase',
            lineHeight: 1.08,
            maxWidth: '1050px',
            marginInline: 'auto',
            overflowWrap: 'anywhere',
            textWrap: 'balance'
          }}>{title}</h1>
          {description && <p style={{ margin: '24px auto 0', maxWidth: '800px', color: pageStyles.muted, fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>{description}</p>}
        </div>

        {children}
      </div>
      <style>{`
        .dedicated-page-enter {
          opacity: 1;
          transform: none;
          filter: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .dedicated-page-enter {
            animation: none !important;
          }
        }

        .dedicated-mobile-detail-meta { display: none; }
        .dedicated-page-heading { overflow: visible; }
        .dedicated-page-heading-left { margin-left: 0 !important; margin-right: auto !important; }
        .dedicated-page-heading-left .dedicated-page-title { text-align: left; }
        .dedicated-page-heading-enter {
          animation: dedicatedHeadingEnter 520ms cubic-bezier(0.22, 1, 0.36, 1) 70ms both;
        }

        @keyframes dedicatedHeadingEnter {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dedicated-page-heading-enter { animation: none !important; }
        }
        .dedicated-page-title { word-break: normal; }
        @media (max-width: 768px) {
          .dedicated-page-container { padding: 110px 20px 56px !important; }
          .dedicated-page-heading { margin-bottom: 40px !important; }
          .dedicated-page-title { font-size: clamp(2rem, 10vw, 3.1rem) !important; line-height: 1.08 !important; letter-spacing: 0.02em !important; }
          .dedicated-filter-grid { grid-template-columns: 1fr !important; }
          .dedicated-card-grid { grid-template-columns: 1fr !important; }
          .dedicated-content-grid { grid-template-columns: 1fr !important; }
          .dedicated-detail-panel { padding: 28px !important; }
          .dedicated-case-card, .dedicated-article-card { padding: 28px !important; }
        }
        .dedicated-input { width: 100%; min-width: 0; box-sizing: border-box; }
        .dedicated-select-wrap { position: relative; width: 100%; min-width: 0; }
        .dedicated-select-wrap::after { content: ''; position: absolute; right: 17px; top: 50%; width: 7px; height: 7px; border-right: 1.5px solid #9fb3cc; border-bottom: 1.5px solid #9fb3cc; transform: translateY(-65%) rotate(45deg); pointer-events: none; transition: border-color 180ms ease, transform 180ms ease; }
        .dedicated-select-wrap:focus-within::after { border-color: ${pageStyles.lightBlue}; transform: translateY(-35%) rotate(225deg); }
        .dedicated-select { appearance: none; -webkit-appearance: none; -moz-appearance: none; padding-right: 48px !important; cursor: pointer; }
        .dedicated-select::-ms-expand { display: none; }
        .dedicated-date-filter { color-scheme: dark; }
        .dedicated-input:focus { border-color: ${pageStyles.blue} !important; outline: none; }
        @media (max-width: 1100px) { .dedicated-filter-grid { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) !important; } .dedicated-date-filter { grid-column: 1 / -1; } }
      `}</style>
    </div>
  );
}

function FilterPanel({ search, setSearch, area, setArea, category, setCategory, date, setDate, areas }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <div className="dedicated-filter-panel desktop-filter-panel" style={{ backgroundColor: '#090d14', border: `1px solid ${pageStyles.border}`, padding: '24px', marginBottom: '36px', boxSizing: 'border-box', width: '100%' }}>
        <div className="dedicated-filter-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '12px', minWidth: 0 }}>
          <div className="dedicated-filter-field">
            <label className="dedicated-filter-label">Buscar</label>
            <input className="dedicated-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Palabras clave, título..." style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }} />
          </div>
          <div className="dedicated-filter-field dedicated-select-wrap">
            <label className="dedicated-filter-label">Área</label>
            <select className="dedicated-input dedicated-select" value={area} onChange={(e) => setArea(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }}>
              <option value="Todas">Todas las áreas</option>
              {areas.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="dedicated-filter-field dedicated-select-wrap">
            <label className="dedicated-filter-label">Categoría</label>
            <select className="dedicated-input dedicated-select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }}>
              <option value="Todas">Todas las categorías</option>
              <option value="Comercial">Derecho Comercial</option>
              <option value="Otra área">Otras áreas</option>
            </select>
          </div>
          <div className="dedicated-filter-field">
            <label className="dedicated-filter-label">Fecha</label>
            <input className="dedicated-input dedicated-date-filter" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ backgroundColor: '#0d131f', border: '1px solid rgba(148,163,184,0.25)', color: '#f8fafc', padding: '14px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.9rem' }} />
          </div>
        </div>
      </div>

      <div className="lc-mobile-filter-strip" aria-label="Filtros de contenido">
        <div className="lc-mobile-filter-track">
          <div className={`lc-mobile-filter-search ${mobileSearchOpen ? 'is-open' : ''}`}>
            {!mobileSearchOpen ? (
              <button type="button" className="lc-mobile-filter-search-button" onClick={() => setMobileSearchOpen(true)} aria-label="Abrir búsqueda">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            ) : (
              <>
                <svg className="lc-mobile-filter-search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                <input autoFocus type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." aria-label="Buscar palabras clave o título" />
                <button type="button" className="lc-mobile-filter-close" onClick={() => { setSearch(''); setMobileSearchOpen(false); }} aria-label="Cerrar búsqueda">×</button>
              </>
            )}
          </div>

          <label className="lc-mobile-filter-pill lc-mobile-select-pill">
            <span>Área</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtrar por área">
              <option value="Todas">Todas las áreas</option>
              {areas.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </label>

          <label className="lc-mobile-filter-pill lc-mobile-select-pill">
            <span>Categoría</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar por categoría">
              <option value="Todas">Todas</option>
              <option value="Comercial">Comercial</option>
              <option value="Otra área">Otras áreas</option>
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </label>

          <label className="lc-mobile-filter-pill lc-mobile-date-pill">
            <span>Fecha</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Filtrar por fecha" />
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 3.5v4M16 3.5v4M4 9h16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </label>
        </div>
        <div className="lc-mobile-filter-fade" aria-hidden="true" />
      </div>

      <style>{`
        .lc-mobile-filter-strip { display: none; }
        @media (max-width: 768px) {
          .desktop-filter-panel { display: none !important; }
          .lc-mobile-filter-strip {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            height: 58px !important;
            margin: 0 0 22px !important;
            padding: 6px 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            background: transparent !important;
            border: 0 !important;
          }
          .lc-mobile-filter-track {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
            min-width: 0 !important;
            height: 46px !important;
            padding: 0 34px 0 8px !important;
            box-sizing: border-box !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-x: contain !important;
            touch-action: pan-x !important;
            scrollbar-width: none !important;
          }
          .lc-mobile-filter-track::-webkit-scrollbar { display: none !important; }
          .lc-mobile-filter-search,
          .lc-mobile-filter-pill {
            flex: 0 0 auto !important;
            height: 44px !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(148,163,184,.24) !important;
            background: #0d131f !important;
            color: #dbe6f4 !important;
          }
          .lc-mobile-filter-search {
            width: 44px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            transition: width 260ms cubic-bezier(.22,1,.36,1) !important;
          }
          .lc-mobile-filter-search.is-open { width: 190px !important; justify-content: flex-start !important; border-radius: 22px !important; }
          .lc-mobile-filter-search-button { width: 42px !important; height: 42px !important; flex: 0 0 42px !important; display: flex !important; align-items: center !important; justify-content: center !important; background: transparent !important; border: 0 !important; color: #a7b8ce !important; padding: 0 !important; }
          .lc-mobile-filter-search-button svg { width: 19px !important; height: 19px !important; }
          .lc-mobile-filter-search-icon { width: 17px !important; height: 17px !important; flex: 0 0 17px !important; margin-left: 13px !important; color: #9eb1c9 !important; }
          .lc-mobile-filter-search input { width: 100% !important; min-width: 0 !important; height: 42px !important; background: transparent !important; border: 0 !important; outline: 0 !important; color: #f8fafc !important; padding: 0 6px !important; font: 400 .8rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; }
          .lc-mobile-filter-search input::placeholder { color: #78899f !important; }
          .lc-mobile-filter-close { width: 31px !important; height: 42px !important; flex: 0 0 31px !important; border: 0 !important; background: transparent !important; color: #8fa4be !important; font-size: 21px !important; line-height: 1 !important; }
          .lc-mobile-filter-pill { position: relative !important; display: flex !important; align-items: center !important; border-radius: 22px !important; padding: 0 30px 0 13px !important; width: 132px !important; }
          .lc-mobile-filter-pill span { position: absolute !important; left: 13px !important; top: 5px !important; font: 600 .45rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; letter-spacing: .16em !important; text-transform: uppercase !important; color: #7892b2 !important; pointer-events: none !important; }
          .lc-mobile-filter-pill select,
          .lc-mobile-filter-pill input { width: 100% !important; min-width: 0 !important; height: 42px !important; padding: 11px 0 0 !important; margin: 0 !important; border: 0 !important; outline: 0 !important; background: transparent !important; color: #dbe6f4 !important; font: 400 .76rem/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important; appearance: none !important; -webkit-appearance: none !important; }
          .lc-mobile-filter-pill select { color-scheme: dark !important; }
          .lc-mobile-filter-pill input[type="date"] { color-scheme: dark !important; padding-right: 0 !important; }
          .lc-mobile-filter-pill input[type="date"]::-webkit-calendar-picker-indicator { opacity: .58; filter: invert(72%) sepia(10%) saturate(450%) hue-rotate(175deg); }
          .lc-mobile-filter-pill svg { position: absolute !important; right: 10px !important; top: 50% !important; width: 13px !important; height: 13px !important; transform: translateY(-25%) !important; color: #8fa4be !important; pointer-events: none !important; }
          .lc-mobile-date-pill { width: 126px !important; }
          .lc-mobile-filter-fade { position: absolute !important; top: 0 !important; right: 0 !important; width: 26px !important; height: 100% !important; pointer-events: none !important; background: linear-gradient(90deg, rgba(9,13,20,0), rgba(9,13,20,.92) 82%) !important; }
        }
      `}</style>
    </>
  );
}

function AreasPage({ onBack, onNavigate }) {
  return (
    <PageShell
      eyebrow="Especialidades jurídicas"
      title="Nuestras Áreas"
      description="Conozca el alcance de cada especialidad y entre directamente en el área que desea explorar."
      onBack={onBack}
    >
      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {areasList.map((area) => (
          <button
            key={area.title}
            onClick={() => onNavigate(`#area/${encodeURIComponent(area.title)}`)}
            aria-label={`Conocer ${area.title}`}
            style={{
              backgroundColor: pageStyles.panel,
              border: `1px solid ${pageStyles.border}`,
              padding: '38px',
              textAlign: 'left',
              color: pageStyles.text,
              cursor: 'pointer',
              minHeight: '245px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = pageStyles.blue;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#101a2b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = pageStyles.border;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = pageStyles.panel;
            }}
          >
            <span style={{ color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Especialidad</span>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 400, margin: '12px 0 16px' }}>{area.title}</h2>
            <p style={{ color: pageStyles.muted, lineHeight: 1.75, margin: 0 }}>{area.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: '24px', color: pageStyles.lightBlue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Conocer el área →
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

function AreaDetailPage({ area, onNavigate }) {
  const detail = areaDetails[area];
  if (!detail) return <AreasPage onBack={() => onNavigate('#inicio')} onNavigate={onNavigate} />;

  return (
    <PageShell
      eyebrow={detail.eyebrow}
      title={detail.title}
      description={detail.intro}
      onBack={() => onNavigate('#areas')}
    >
      <div className="dedicated-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {detail.sections.map(([heading, content]) => (
          <section key={heading} className="dedicated-detail-panel" style={{
            backgroundColor: pageStyles.panelAlt,
            border: `1px solid ${pageStyles.border}`,
            padding: '34px',
            minHeight: '220px'
          }}>
            <h2 style={{ margin: '0 0 16px', color: pageStyles.lightBlue, fontSize: '1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.13em', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
              {heading}
            </h2>
            <p style={{ margin: 0, color: pageStyles.muted, fontSize: '1rem', lineHeight: 1.85 }}>
              {content}
            </p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function FirmPage({ onBack, onNavigate }) {
  const partners = [
    { name: 'Dra. Lisbeth Lacouture', role: 'Socia Fundadora', desc: 'Especialista en estructuración patrimonial y mercantil.', img: socio1 },
    { name: 'Dr. Jesus Coronado', role: 'Socio Director', desc: 'Amplia trayectoria en resolución de disputas corporativas.', img: socio2 }
  ];

  return (
    <PageShell
      eyebrow="Liderazgo y Experiencia"
      title="La Firma"
      description="Conozca el enfoque de Lacouture & Coronado y el equipo que acompaña cada asunto con una visión estratégica, rigurosa y orientada a resultados."
      onBack={onBack}
    >
      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '28px' }}>
        {partners.map((socio) => (
          <article key={socio.name} style={{ backgroundColor: pageStyles.panelAlt, border: `1px solid ${pageStyles.border}`, overflow: 'hidden' }}>
            <div style={{ height: '430px', backgroundColor: '#1e293b', overflow: 'hidden' }}>
              <img src={socio.img} alt={socio.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
            <div style={{ padding: '32px' }}>
              <span style={{ color: pageStyles.blue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{socio.role}</span>
              <h2 style={{ margin: '10px 0 14px', fontSize: '1.5rem', fontWeight: 400 }}>{socio.name}</h2>
              <p style={{ color: pageStyles.muted, lineHeight: 1.7, margin: 0 }}>{socio.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function CasesPage({ onBack, onNavigate }) {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [date, setDate] = useState('');
  const areas = [...new Set(caseStudies.map((item) => item.area))];

  const filtered = caseStudies.filter((item) => {
    const q = search.trim().toLowerCase();
    const haystack = [item.title, item.summary, item.area, item.category, ...item.keywords, ...item.tags].join(' ').toLowerCase();
    return (!q || haystack.includes(q))
      && (area === 'Todas' || item.area === area)
      && (category === 'Todas' || item.category === category)
      && (!date || item.date === date);
  });

  return (
    <PageShell
      eyebrow="Experiencia y Resultados"
      title="Casos de Estudio"
      description="Explore ejemplos de asuntos organizados por especialidad, categoría, fecha y palabras clave. El contenido es demostrativo y no sustituye la valoración jurídica de un caso concreto."
      onBack={onBack}
    >
      <FilterPanel {...{ search, setSearch, area, setArea, category, setCategory, date, setDate }} areas={areas} />

      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {filtered.map((caso) => (
          <article
            key={caso.id}
            className="dedicated-case-card dedicated-mobile-click-card"
            style={{
              backgroundColor: pageStyles.panelAlt,
              border: `1px solid ${pageStyles.border}`,
              padding: '34px',
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr auto',
              position: 'relative'
            }}
          >
            <button
              className="mobile-card-link"
              onClick={() => onNavigate(`#caso/${caso.id}`)}
              aria-label={`Abrir caso: ${caso.title}`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
              <span style={{ backgroundColor: '#1e3a8a', color: pageStyles.lightBlue, padding: '6px 10px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {caso.area}
              </span>
              <span style={{ color: '#7890ad', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.72rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                {caso.displayDate}
              </span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 400, lineHeight: 1.35, margin: '22px 0 14px' }}>{caso.title}</h2>
            <p style={{ color: pageStyles.muted, lineHeight: 1.7, margin: 0 }}>{caso.summary}</p>

            <div className="case-tags-scroll" style={{ marginTop: '22px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {caso.tags.map((tag) => (
                <span key={tag} style={{ color: '#cbd5e1', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.68rem', border: '1px solid rgba(148,163,184,0.18)', padding: '5px 8px' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '18px', paddingTop: '16px' }}>
              <button
                onClick={() => onNavigate(`#caso/${caso.id}`)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: pageStyles.lightBlue,
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                Ver caso completo →
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '50px 0', textAlign: 'center', color: pageStyles.muted }}>
          No hay casos que coincidan con los filtros seleccionados.
        </div>
      )}
    </PageShell>
  );
}

function CaseDetailPage({ caso, onBack, onNavigate }) {
  if (!caso) return <CasesPage onBack={onBack} onNavigate={onNavigate} />;

  return (
    <PageShell
      eyebrow={`${caso.area} · ${caso.displayDate}`}
      mobileMeta={<>
        <span>{caso.area}</span><span>{caso.displayDate}</span>
      </>}
      title={caso.title}
      description={caso.summary}
      headingClassName="case-detail-heading"
      onBack={() => onNavigate('#casos')}
    >
      <div className="dedicated-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
        {[
          ['Contexto', caso.context],
          ['Estrategia', caso.strategy],
          ['Resultado', caso.result]
        ].map(([heading, content]) => (
          <section key={heading} className="dedicated-detail-panel" style={{ backgroundColor: pageStyles.panelAlt, border: `1px solid ${pageStyles.border}`, padding: '30px', minHeight: '250px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px', color: pageStyles.lightBlue, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
              {heading}
            </h2>
            <p style={{ color: pageStyles.muted, lineHeight: 1.8, margin: 0 }}>{content}</p>
          </section>
        ))}
      </div>

      <div className="case-detail-keywords" style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(30,58,138,0.25)', color: pageStyles.muted, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.8rem' }}>
        <span className="case-detail-keywords-label">Palabras clave:</span>
        <div className="case-detail-keywords-scroll">
          {caso.keywords.map((keyword) => (
            <span key={keyword} className="case-detail-keyword">{keyword}</span>
          ))}
        </div>
      </div>

      <style>{`
        /* Palabras clave del caso — adaptación exclusiva para teléfono */
        @media (max-width: 768px) {
          .case-detail-keywords {
            margin-top: 16px !important;
            padding-top: 14px !important;
            overflow: hidden !important;
          }
          .case-detail-keywords-label {
            display: block !important;
            margin-bottom: 8px !important;
            font-size: .57rem !important;
            line-height: 1 !important;
            letter-spacing: .16em !important;
            text-transform: uppercase !important;
            color: #7890ad !important;
          }
          .case-detail-keywords-scroll {
            display: flex !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            gap: 7px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            height: 38px !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 0 2px 2px 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            -webkit-overflow-scrolling: touch !important;
            touch-action: pan-x !important;
            overscroll-behavior-x: contain !important;
            scrollbar-width: none !important;
          }
          .case-detail-keywords-scroll::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .case-detail-keyword {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            height: 28px !important;
            padding: 0 10px !important;
            border: 1px solid rgba(96,165,250,.18) !important;
            background: rgba(13,19,31,.55) !important;
            color: #cbd5e1 !important;
            font-size: .61rem !important;
            line-height: 1 !important;
          }
        }
      `}</style>

      <style>{`
        /* Encabezado del caso — SOLO TELÉFONO */
        @media (max-width: 768px) {
          .case-detail-heading {
            width: 100% !important;
            margin-bottom: 26px !important;
          }
          .case-detail-heading .dedicated-page-eyebrow {
            display: none !important;
          }
          .case-detail-heading .dedicated-page-title {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            font-size: clamp(1.9rem, 8.2vw, 2.35rem) !important;
            line-height: 1.08 !important;
            letter-spacing: 0 !important;
            overflow-wrap: normal !important;
            word-break: normal !important;
            hyphens: none !important;
            text-wrap: balance !important;
            text-align: center !important;
          }
          .case-detail-heading ~ .dedicated-page-heading p {
            margin-top: 14px !important;
          }
        }
      `}</style>
    </PageShell>
  );
}

function ArticlesPage({ onBack, onNavigate }) {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [date, setDate] = useState('');
  const areas = [...new Set(articles.map((item) => item.area))];
  const filtered = articles.filter((item) => {
    const q = search.trim().toLowerCase();
    const haystack = [item.title, item.snippet, item.area, item.author, ...item.keywords].join(' ').toLowerCase();
    return (!q || haystack.includes(q)) && (area === 'Todas' || item.area === area) && (category === 'Todas' || (item.area === 'Derecho Comercial' ? 'Comercial' : 'Otra área') === category) && (!date || item.date === date);
  });
  return (
    <PageShell eyebrow="Publicaciones y Análisis" title="Artículos y Foro Jurídico" description="Consulte artículos de ejemplo y filtre el contenido por fecha, área de práctica y palabras clave." onBack={onBack}>
      <FilterPanel {...{ search, setSearch, area, setArea, category, setCategory, date, setDate }} areas={areas} />
      <div className="dedicated-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {filtered.map((art) => (
          <article key={art.id} className="dedicated-mobile-click-card" style={{ backgroundColor: pageStyles.panel, border: `1px solid ${pageStyles.border}`, padding: '34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <button
              className="mobile-card-link"
              onClick={() => onNavigate(`#articulo/${art.id}`)}
              aria-label={`Abrir artículo: ${art.title}`}
            />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontSize: '0.72rem', color: pageStyles.blue, marginBottom: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                <span>{art.displayDate}</span><span>{art.author}</span>
              </div>
              <span style={{ color: '#cbd5e1', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.7rem' }}>{art.area}</span>
              <h2 style={{ color: pageStyles.text, margin: '12px 0 14px', fontSize: '1.3rem', fontWeight: 400, lineHeight: 1.45 }}>{art.title}</h2>
              <p style={{ color: pageStyles.muted, margin: 0, lineHeight: 1.7 }}>{art.snippet}</p>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(30,58,138,0.22)' }}>
              <button onClick={() => onNavigate(`#articulo/${art.id}`)} className="cta-consultar" style={{ background: 'none', border: 'none', padding: 0, color: '#fff', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                <span className="hover-underline-animation" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginRight: '8px' }}>Leer artículo completo</span>
                <span style={{ color: pageStyles.lightBlue }}>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ padding: '50px 0', textAlign: 'center', color: pageStyles.muted }}>No hay artículos que coincidan con los filtros seleccionados.</div>}
    </PageShell>
  );
}

function ArticleDetailPage({ article, onNavigate }) {
  if (!article) return <ArticlesPage onBack={() => onNavigate('#inicio')} onNavigate={onNavigate} />;

  return (
    <PageShell
      eyebrow={`${article.area} · ${article.displayDate}`}
      mobileMeta={<>
        <span>{article.area}</span><span>{article.displayDate}</span>
      </>}
      title={article.title}
      description={null}
      headingAlign="left"
      headingMaxWidth="920px"
      headingClassName="article-detail-heading"
      onBack={() => onNavigate('#articulos')}
    >
      <article className="dedicated-article-card article-editorial" style={{
        maxWidth: '880px',
        margin: '0 auto',
        backgroundColor: pageStyles.panelAlt,
        border: `1px solid ${pageStyles.border}`,
        padding: '48px 54px'
      }}>
        <header className="article-editorial-meta" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          paddingBottom: '18px',
          marginBottom: '34px',
          borderBottom: '1px solid rgba(30,58,138,0.25)',
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.13em'
        }}>
          <span style={{ color: pageStyles.blue }}>{article.author}</span>
          <span style={{ color: '#7890ad', textAlign: 'right' }}>{article.displayDate}</span>
        </header>

        <p className="article-editorial-lead" style={{
          color: '#d6deea',
          lineHeight: 1.9,
          fontSize: '1.18rem',
          margin: '0 0 34px',
          fontWeight: 400
        }}>
          {article.intro}
        </p>

        <div className="article-editorial-body" style={{ maxWidth: '760px', margin: '0 auto' }}>
          {article.body.map((paragraph, idx) => (
            <p key={idx} style={{
              color: pageStyles.muted,
              lineHeight: 1.95,
              fontSize: '1rem',
              margin: idx === article.body.length - 1 ? '0' : '0 0 24px'
            }}>
              {paragraph}
            </p>
          ))}
        </div>

        <footer style={{ marginTop: '38px', paddingTop: '20px', borderTop: '1px solid rgba(30,58,138,0.25)', color: '#64748b', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: '0.78rem', lineHeight: 1.6 }}>
          Palabras clave: {article.keywords.join(' · ')}
        </footer>
      </article>

      <style>{`
        .article-editorial { text-align: left; }
        .article-editorial p { text-align: left; }
        @media (max-width: 768px) {
          .article-editorial { padding: 30px 24px !important; }
          .article-editorial-meta { align-items: flex-start !important; flex-direction: column !important; gap: 8px !important; }
          .article-editorial-meta span:last-child { text-align: left !important; }
          .article-editorial-lead { font-size: 1.08rem !important; }
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


function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [section, setSection] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [caseItems, setCaseItems] = useState(caseStudies.map((item) => ({ ...item, published: true })));
  const [articleItems, setArticleItems] = useState(articles.map((item) => ({ ...item, published: true })));
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
    setEditor(item ? { ...item } : (type === 'case' ? {
      id: `nuevo-caso-${Date.now()}`, date: new Date().toISOString().slice(0,10), displayDate: '', area: 'Derecho Comercial', category: 'Comercial',
      keywords: [], title: '', summary: '', context: '', strategy: '', result: '', tags: [], published: false
    } : {
      id: `nuevo-articulo-${Date.now()}`, date: new Date().toISOString().slice(0,10), displayDate: '', author: '', area: 'Derecho Comercial',
      keywords: [], title: '', snippet: '', intro: '', body: [''], published: false
    }));
  };

  const closeEditor = () => { setEditor(null); setEditorType(null); };

  const saveEditor = () => {
    if (!editor?.title?.trim()) return setAdminNotice('El título es obligatorio.');
    if (editorType === 'case') {
      setCaseItems((prev) => {
        const exists = prev.some((item) => item.id === editor.id);
        return exists ? prev.map((item) => item.id === editor.id ? editor : item) : [...prev, editor];
      });
    } else {
      setArticleItems((prev) => {
        const exists = prev.some((item) => item.id === editor.id);
        return exists ? prev.map((item) => item.id === editor.id ? editor : item) : [...prev, editor];
      });
    }
    setAdminNotice('Cambios guardados en esta sesión de demostración. La persistencia real se conectará a Supabase.');
    closeEditor();
  };

  const deleteItem = (type, id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este elemento?')) return;
    if (type === 'case') setCaseItems((prev) => prev.filter((item) => item.id !== id));
    else setArticleItems((prev) => prev.filter((item) => item.id !== id));
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

        {section === 'dashboard' && <div className="admin-dashboard-content">
          <div className="admin-stats">
            <div><span>Casos</span><strong>{caseItems.length}</strong><small>Gestionables</small></div>
            <div><span>Artículos</span><strong>{articleItems.length}</strong><small>Gestionables</small></div>
            <div><span>Publicados</span><strong>{caseItems.filter(x=>x.published).length + articleItems.filter(x=>x.published).length}</strong><small>Visibles en web</small></div>
            <div><span>Consultas</span><strong>—</strong><small>Pendientes de conectar</small></div>
          </div>

          <div className="admin-grid-two">
            <section className="admin-panel">
              <div className="admin-panel-head">
                <div><span className="admin-eyebrow">Contenido</span><h3>Últimos movimientos</h3></div>
              </div>
              <div className="admin-activity">
                <div><span>Casos</span><strong>{caseItems[0]?.title}</strong><small>Disponible para editar</small></div>
                <div><span>Artículos</span><strong>{articleItems[0]?.title}</strong><small>Disponible para editar</small></div>
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div><span className="admin-eyebrow">Acciones</span><h3>Acceso rápido</h3></div>
              </div>
              <div className="admin-quick">
                <button onClick={() => { setSection('cases'); openEditor('case'); }}>+ Nuevo caso</button>
                <button onClick={() => { setSection('articles'); openEditor('article'); }}>+ Nuevo artículo</button>
                <button onClick={() => setSection('contacts')}>Ver consultas</button>
              </div>
            </section>
          </div>
        </div>}

        {section === 'cases' && <section className="admin-panel admin-list-panel">
          <div className="admin-panel-head">
            <div><span className="admin-eyebrow">Contenido</span><h3>Casos de estudio</h3></div>
            <button className="admin-primary-btn compact" onClick={() => openEditor('case')}>+ Añadir caso</button>
          </div>
          <div className="admin-table-wrap">
            <table>
              <thead><tr><th>Caso</th><th>Área</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
              <tbody>
                {caseItems.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.title || 'Sin título'}</strong><small>{item.summary}</small></td>
                    <td>{item.area}</td>
                    <td>{item.displayDate || item.date}</td>
                    <td><span className={`admin-status ${item.published ? 'published' : 'draft'}`}>{item.published ? 'Publicado' : 'Borrador'}</span></td>
                    <td className="admin-actions">
                      <button onClick={() => openEditor('case', item)}>Editar</button>
                      <button onClick={() => deleteItem('case', item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>}

        {section === 'articles' && <section className="admin-panel admin-list-panel">
          <div className="admin-panel-head">
            <div><span className="admin-eyebrow">Contenido</span><h3>Artículos</h3></div>
            <button className="admin-primary-btn compact" onClick={() => openEditor('article')}>+ Añadir artículo</button>
          </div>
          <div className="admin-table-wrap">
            <table>
              <thead><tr><th>Artículo</th><th>Área</th><th>Autor</th><th>Estado</th><th></th></tr></thead>
              <tbody>
                {articleItems.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.title || 'Sin título'}</strong><small>{item.snippet}</small></td>
                    <td>{item.area}</td>
                    <td>{item.author}</td>
                    <td><span className={`admin-status ${item.published ? 'published' : 'draft'}`}>{item.published ? 'Publicado' : 'Borrador'}</span></td>
                    <td className="admin-actions">
                      <button onClick={() => openEditor('article', item)}>Editar</button>
                      <button onClick={() => deleteItem('article', item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>}

        {section === 'contacts' && <section className="admin-panel">
          <div className="admin-panel-head">
            <div><span className="admin-eyebrow">Entrada</span><h3>Consultas</h3></div>
          </div>
          <div className="admin-empty">
            <strong>Conexión pendiente</strong>
            <p>La interfaz ya está preparada para mostrar las consultas recibidas desde Contacto. En la siguiente fase conectaremos el formulario a la base de datos y al correo de la firma.</p>
            <button className="admin-secondary-btn" onClick={() => setSection('settings')}>Ver arquitectura</button>
          </div>
        </section>}

        {section === 'settings' && <section className="admin-panel">
          <div className="admin-panel-head">
            <div><span className="admin-eyebrow">Control</span><h3>Configuración y usuarios</h3></div>
          </div>
          <div className="admin-user-grid">
            <article><span className="admin-role">SUPER ADMIN</span><h4>Administrador principal</h4><p>Acceso completo a contenido, consultas, usuarios y configuración.</p><small>Cuenta individual recomendada para la persona que gestiona la web.</small></article>
            <article><span className="admin-role editor">EDITOR</span><h4>Abogado 1</h4><p>Puede crear, editar y publicar casos y artículos y revisar consultas.</p><small>Cuenta individual. No comparte contraseña.</small></article>
            <article><span className="admin-role editor">EDITOR</span><h4>Abogado 2</h4><p>Puede crear, editar y publicar casos y artículos y revisar consultas.</p><small>Cuenta individual. No comparte contraseña.</small></article>
          </div>
          <div className="admin-security-note wide">En producción, cada persona tendrá su propio correo y contraseña mediante Supabase Auth. No se deben guardar contraseñas dentro de App.jsx ni compartir una contraseña entre los tres administradores.</div>
        </section>}

        {editor && <div className="admin-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeEditor()}>
          <div className="admin-modal">
            <div className="admin-modal-head">
              <div>
                <span className="admin-eyebrow">Editor</span>
                <h3>{editorType === 'case' ? (editor.title ? 'Editar caso' : 'Nuevo caso') : (editor.title ? 'Editar artículo' : 'Nuevo artículo')}</h3>
              </div>
              <button onClick={closeEditor}>×</button>
            </div>

            <div className="admin-form-grid">
              <label>Título<input value={editor.title || ''} onChange={e => setEditor({...editor, title:e.target.value})}/></label>
              <label>Área<select value={editor.area || ''} onChange={e => setEditor({...editor, area:e.target.value})}><option>Derecho Civil</option><option>Derecho Laboral</option><option>Derecho Penal</option><option>Derecho Comercial</option><option>Derecho Administrativo</option></select></label>

              {editorType === 'case'
                ? <>
                    <label>Categoría<input value={editor.category || ''} onChange={e => setEditor({...editor, category:e.target.value})}/></label>
                    <label>Fecha<input type="date" value={editor.date || ''} onChange={e => setEditor({...editor, date:e.target.value})}/></label>
                    <label className="wide">Resumen<textarea value={editor.summary || ''} onChange={e => setEditor({...editor, summary:e.target.value})}/></label>
                    <label className="wide">Contexto<textarea value={editor.context || ''} onChange={e => setEditor({...editor, context:e.target.value})}/></label>
                    <label className="wide">Estrategia<textarea value={editor.strategy || ''} onChange={e => setEditor({...editor, strategy:e.target.value})}/></label>
                    <label className="wide">Resultado<textarea value={editor.result || ''} onChange={e => setEditor({...editor, result:e.target.value})}/></label>
                  </>
                : <>
                    <label>Autor<input value={editor.author || ''} onChange={e => setEditor({...editor, author:e.target.value})}/></label>
                    <label>Fecha<input type="date" value={editor.date || ''} onChange={e => setEditor({...editor, date:e.target.value})}/></label>
                    <label className="wide">Resumen<textarea value={editor.snippet || ''} onChange={e => setEditor({...editor, snippet:e.target.value})}/></label>
                    <label className="wide">Introducción<textarea value={editor.intro || ''} onChange={e => setEditor({...editor, intro:e.target.value})}/></label>
                    <label className="wide">Contenido<textarea value={(editor.body || []).join('\n\n')} onChange={e => setEditor({...editor, body:e.target.value.split(/\n\s*\n/)})}/></label>
                  </>}

              <label className="toggle-field">
                <input type="checkbox" checked={Boolean(editor.published)} onChange={e => setEditor({...editor, published:e.target.checked})}/>
                Publicar en la web
              </label>
            </div>

            <div className="admin-modal-actions">
              <button className="admin-secondary-btn" onClick={closeEditor}>Cancelar</button>
              <button className="admin-primary-btn" onClick={saveEditor}>Guardar cambios</button>
            </div>
          </div>
        </div>}
      </main>

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
      `}</style>
    </div>
  );
}


  const menu = [
    ['dashboard', 'Dashboard'], ['cases', 'Casos'], ['articles', 'Artículos'], ['contacts', 'Consultas'], ['settings', 'Configuración']
  ];

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand"><div className="admin-brand-logo-box"><img src={logo} alt="LC Abogados" style={{ width: 22, height: 22, maxWidth: 22, maxHeight: 22, minWidth: 22, minHeight: 22, objectFit: "contain", display: "block" }} /></div><div><strong>LC ABOGADOS</strong><span>Administración</span></div></div>
        <nav>{menu.map(([key, label]) => <button key={key} className={section === key ? 'active' : ''} onClick={() => setSection(key)}>{label}</button>)}</nav>
        <div className="admin-sidebar-user"><span className="admin-avatar">A</span><div><strong>Administrador</strong><small>Acceso total</small></div><button title="Cerrar sesión" onClick={() => setLoggedIn(false)}>↪</button></div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-eyebrow">LC Abogados</span><h2>{menu.find(([key]) => key === section)?.[1]}</h2></div>
          <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>Ver sitio ↗</a>
        </header>

        {adminNotice && <div className="admin-notice">{adminNotice}<button onClick={() => setAdminNotice('')}>×</button></div>}

        {section === 'dashboard' && <div className="admin-dashboard-content">
          <div className="admin-stats"><div><span>Casos</span><strong>{caseItems.length}</strong><small>Gestionables</small></div><div><span>Artículos</span><strong>{articleItems.length}</strong><small>Gestionables</small></div><div><span>Publicados</span><strong>{caseItems.filter(x=>x.published).length + articleItems.filter(x=>x.published).length}</strong><small>Visibles en web</small></div><div><span>Consultas</span><strong>—</strong><small>Pendientes de conectar</small></div></div>
          <div className="admin-grid-two"><section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Contenido</span><h3>Últimos movimientos</h3></div></div><div className="admin-activity"><div><span>Casos</span><strong>{caseItems[0]?.title}</strong><small>Disponible para editar</small></div><div><span>Artículos</span><strong>{articleItems[0]?.title}</strong><small>Disponible para editar</small></div></div></section><section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Acciones</span><h3>Acceso rápido</h3></div></div><div className="admin-quick"><button onClick={() => { setSection('cases'); openEditor('case'); }}>+ Nuevo caso</button><button onClick={() => { setSection('articles'); openEditor('article'); }}>+ Nuevo artículo</button><button onClick={() => setSection('contacts')}>Ver consultas</button></div></section></div>
        </div>}

        {section === 'cases' && <section className="admin-panel admin-list-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Contenido</span><h3>Casos de estudio</h3></div><button className="admin-primary-btn compact" onClick={() => openEditor('case')}>+ Añadir caso</button></div><div className="admin-table-wrap"><table><thead><tr><th>Caso</th><th>Área</th><th>Fecha</th><th>Estado</th><th></th></tr></thead><tbody>{caseItems.map(item => <tr key={item.id}><td><strong>{item.title || 'Sin título'}</strong><small>{item.summary}</small></td><td>{item.area}</td><td>{item.displayDate || item.date}</td><td><span className={`admin-status ${item.published ? 'published' : 'draft'}`}>{item.published ? 'Publicado' : 'Borrador'}</span></td><td className="admin-actions"><button onClick={() => openEditor('case', item)}>Editar</button><button onClick={() => deleteItem('case', item.id)}>Eliminar</button></td></tr>)}</tbody></table></div></section>}

        {section === 'articles' && <section className="admin-panel admin-list-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Contenido</span><h3>Artículos</h3></div><button className="admin-primary-btn compact" onClick={() => openEditor('article')}>+ Añadir artículo</button></div><div className="admin-table-wrap"><table><thead><tr><th>Artículo</th><th>Área</th><th>Autor</th><th>Estado</th><th></th></tr></thead><tbody>{articleItems.map(item => <tr key={item.id}><td><strong>{item.title || 'Sin título'}</strong><small>{item.snippet}</small></td><td>{item.area}</td><td>{item.author}</td><td><span className={`admin-status ${item.published ? 'published' : 'draft'}`}>{item.published ? 'Publicado' : 'Borrador'}</span></td><td className="admin-actions"><button onClick={() => openEditor('article', item)}>Editar</button><button onClick={() => deleteItem('article', item.id)}>Eliminar</button></td></tr>)}</tbody></table></div></section>}

        {section === 'contacts' && <section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Entrada</span><h3>Consultas</h3></div></div><div className="admin-empty"><strong>Conexión pendiente</strong><p>La interfaz ya está preparada para mostrar las consultas recibidas desde Contacto. En la siguiente fase conectaremos el formulario a la base de datos y al correo de la firma.</p><button className="admin-secondary-btn" onClick={() => setSection('settings')}>Ver arquitectura</button></div></section>}

        {section === 'settings' && <section className="admin-panel"><div className="admin-panel-head"><div><span className="admin-eyebrow">Control</span><h3>Configuración y usuarios</h3></div></div><div className="admin-user-grid"><article><span className="admin-role">SUPER ADMIN</span><h4>Administrador principal</h4><p>Acceso completo a contenido, consultas, usuarios y configuración.</p><small>Cuenta individual recomendada para la persona que gestiona la web.</small></article><article><span className="admin-role editor">EDITOR</span><h4>Abogado 1</h4><p>Puede crear, editar y publicar casos y artículos y revisar consultas.</p><small>Cuenta individual. No comparte contraseña.</small></article><article><span className="admin-role editor">EDITOR</span><h4>Abogado 2</h4><p>Puede crear, editar y publicar casos y artículos y revisar consultas.</p><small>Cuenta individual. No comparte contraseña.</small></article></div><div className="admin-security-note wide">En producción, cada persona tendrá su propio correo y contraseña mediante Supabase Auth. No se deben guardar contraseñas dentro de App.jsx ni compartir una contraseña entre los tres administradores.</div></section>}

        {editor && <div className="admin-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeEditor()}><div className="admin-modal"><div className="admin-modal-head"><div><span className="admin-eyebrow">Editor</span><h3>{editorType === 'case' ? (editor.title ? 'Editar caso' : 'Nuevo caso') : (editor.title ? 'Editar artículo' : 'Nuevo artículo')}</h3></div><button onClick={closeEditor}>×</button></div><div className="admin-form-grid">
          <label>Título<input value={editor.title || ''} onChange={e => setEditor({...editor, title:e.target.value})}/></label>
          <label>Área<select value={editor.area || ''} onChange={e => setEditor({...editor, area:e.target.value})}><option>Derecho Civil</option><option>Derecho Laboral</option><option>Derecho Penal</option><option>Derecho Comercial</option><option>Derecho Administrativo</option></select></label>
          {editorType === 'case' ? <><label>Categoría<input value={editor.category || ''} onChange={e => setEditor({...editor, category:e.target.value})}/></label><label>Fecha<input type="date" value={editor.date || ''} onChange={e => setEditor({...editor, date:e.target.value})}/></label><label className="wide">Resumen<textarea value={editor.summary || ''} onChange={e => setEditor({...editor, summary:e.target.value})}/></label><label className="wide">Contexto<textarea value={editor.context || ''} onChange={e => setEditor({...editor, context:e.target.value})}/></label><label className="wide">Estrategia<textarea value={editor.strategy || ''} onChange={e => setEditor({...editor, strategy:e.target.value})}/></label><label className="wide">Resultado<textarea value={editor.result || ''} onChange={e => setEditor({...editor, result:e.target.value})}/></label></> : <><label>Autor<input value={editor.author || ''} onChange={e => setEditor({...editor, author:e.target.value})}/></label><label>Fecha<input type="date" value={editor.date || ''} onChange={e => setEditor({...editor, date:e.target.value})}/></label><label className="wide">Resumen<textarea value={editor.snippet || ''} onChange={e => setEditor({...editor, snippet:e.target.value})}/></label><label className="wide">Introducción<textarea value={editor.intro || ''} onChange={e => setEditor({...editor, intro:e.target.value})}/></label><label className="wide">Contenido<textarea value={(editor.body || []).join('\n\n')} onChange={e => setEditor({...editor, body:e.target.value.split(/\n\s*\n/)})}/></label></>}
          <label className="toggle-field"><input type="checkbox" checked={Boolean(editor.published)} onChange={e => setEditor({...editor, published:e.target.checked})}/> Publicar en la web</label>
        </div><div className="admin-modal-actions"><button className="admin-secondary-btn" onClick={closeEditor}>Cancelar</button><button className="admin-primary-btn" onClick={saveEditor}>Guardar cambios</button></div></div></div>}
      </main>

      <style>{`
        .admin-app{min-height:100vh;background:#f5f7fb;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex}
        .admin-sidebar{width:250px;background:#07101d;color:#e2e8f0;min-height:100vh;padding:26px 18px 18px;display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0}
        .admin-brand{display:flex;align-items:center;gap:12px;padding:4px 10px 28px;border-bottom:1px solid rgba(255,255,255,.08)}
        .admin-brand img{width:28px;height:28px;object-fit:contain}.admin-brand strong{display:block;font-size:.78rem;letter-spacing:.16em}.admin-brand span{display:block;color:#7f8da2;font-size:.68rem;margin-top:4px}
        .admin-sidebar nav{display:flex;flex-direction:column;gap:6px;padding-top:22px}.admin-sidebar nav button{border:0;background:transparent;color:#9aa9bc;text-align:left;padding:12px 14px;border-radius:8px;font-size:.82rem;cursor:pointer}.admin-sidebar nav button:hover,.admin-sidebar nav button.active{background:#102038;color:#fff}
        .admin-sidebar-user{margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding:16px 6px 0;display:flex;align-items:center;gap:9px}.admin-avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#1e3a8a;color:white;font-size:.75rem}.admin-sidebar-user div{min-width:0;flex:1}.admin-sidebar-user strong,.admin-sidebar-user small{display:block}.admin-sidebar-user strong{font-size:.74rem}.admin-sidebar-user small{color:#7f8da2;font-size:.64rem;margin-top:2px}.admin-sidebar-user button{background:none;border:0;color:#94a3b8;cursor:pointer;font-size:18px}
        .admin-main{margin-left:250px;flex:1;padding:34px 44px 60px;max-width:1500px}.admin-topbar{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:28px}.admin-topbar h2{font-size:2rem;font-weight:450;margin:2px 0 0}.admin-topbar>a{color:#1e3a8a;text-decoration:none;font-size:.8rem}
        .admin-eyebrow{color:#5278aa;font-size:.64rem;text-transform:uppercase;letter-spacing:.18em}.admin-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.admin-stats>div,.admin-panel{background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 8px 28px rgba(15,23,42,.05)}.admin-stats>div{padding:20px}.admin-stats span,.admin-stats small{display:block;color:#64748b;font-size:.68rem}.admin-stats strong{display:block;font-size:2rem;font-weight:500;margin:7px 0 2px}.admin-grid-two{display:grid;grid-template-columns:1.3fr .7fr;gap:18px}.admin-panel{padding:24px}.admin-panel-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:18px}.admin-panel h3{margin:3px 0 0;font-size:1.15rem;font-weight:500}.admin-activity>div{padding:14px 0;border-top:1px solid #eef2f7}.admin-activity span,.admin-activity small{display:block;color:#64748b;font-size:.66rem}.admin-activity strong{display:block;margin:4px 0;font-size:.86rem;font-weight:500}.admin-quick{display:grid;gap:10px}.admin-quick button,.admin-secondary-btn{border:1px solid #dbe3ee;background:#fff;color:#0f172a;border-radius:8px;padding:12px;text-align:left;cursor:pointer}.admin-primary-btn{border:0;background:#173b78;color:#fff;border-radius:8px;padding:12px 16px;cursor:pointer}.admin-primary-btn.compact{padding:10px 13px;font-size:.75rem}.admin-secondary-btn{font-size:.78rem}.admin-notice{margin-bottom:18px;background:#eff6ff;border:1px solid #bfdbfe;color:#23466f;padding:12px 14px;border-radius:8px;display:flex;justify-content:space-between;gap:12px;font-size:.78rem}.admin-notice button{border:0;background:none;cursor:pointer;color:inherit}
        .admin-list-panel{padding-bottom:10px}.admin-table-wrap{overflow:auto}.admin-table-wrap table{width:100%;border-collapse:collapse}.admin-table-wrap th,.admin-table-wrap td{text-align:left;padding:13px 10px;border-top:1px solid #edf1f6;font-size:.76rem;vertical-align:top}.admin-table-wrap th{color:#7a8799;font-size:.63rem;text-transform:uppercase;letter-spacing:.1em}.admin-table-wrap td strong,.admin-table-wrap td small{display:block}.admin-table-wrap td small{color:#7a8799;margin-top:4px;max-width:420px}.admin-actions{white-space:nowrap}.admin-actions button{border:0;background:none;color:#1e3a8a;cursor:pointer;margin-left:10px;font-size:.72rem}.admin-status{display:inline-flex;padding:5px 8px;border-radius:999px;font-size:.62rem}.admin-status.published{background:#e7f7ef;color:#13704a}.admin-status.draft{background:#f1f5f9;color:#64748b}
        .admin-empty{padding:34px 0}.admin-empty strong{font-size:1rem}.admin-empty p{color:#64748b;max-width:700px;line-height:1.7}.admin-user-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.admin-user-grid article{border:1px solid #e3e9f0;border-radius:10px;padding:18px}.admin-role{font-size:.62rem;letter-spacing:.16em;color:#1e3a8a}.admin-role.editor{color:#55708f}.admin-user-grid h4{margin:9px 0 7px;font-size:.95rem}.admin-user-grid p{margin:0;color:#64748b;font-size:.78rem;line-height:1.6}.admin-user-grid small{display:block;color:#8a96a6;font-size:.68rem;margin-top:10px}.admin-security-note{margin-top:16px;padding:11px 12px;background:#f8fafc;border:1px solid #e5eaf0;border-radius:8px;color:#64748b;font-size:.68rem;line-height:1.55}.admin-security-note.wide{margin-top:18px}

        .admin-login-logo-box{width:28px;height:28px;min-width:28px;min-height:28px;max-width:28px;max-height:28px;overflow:hidden;display:block;margin-bottom:16px}.admin-login-logo{width:28px !important;height:28px !important;max-width:28px !important;max-height:28px !important;min-width:28px !important;min-height:28px !important;object-fit:contain !important;display:block !important}
        .admin-brand-logo-box{width:22px;height:22px;min-width:22px;min-height:22px;max-width:22px;max-height:22px;overflow:hidden;display:flex;align-items:center;justify-content:center}.admin-brand-logo-box img{width:22px !important;height:22px !important;max-width:22px !important;max-height:22px !important;min-width:22px !important;min-height:22px !important;object-fit:contain !important;display:block !important}
        .admin-login-shell{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 30%,rgba(30,58,138,.08),transparent 38%),#07101d}.admin-login-card{width:min(440px,100%);background:rgba(255,255,255,.98);border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:38px;box-shadow:0 30px 70px rgba(0,0,0,.28)}.admin-login-logo{width:40px;height:40px;object-fit:contain;margin-bottom:16px}.admin-login-card h1{font-weight:500;font-size:2rem;margin:6px 0 10px}.admin-login-card>p{color:#64748b;font-size:.87rem;line-height:1.7;margin-bottom:24px}.admin-login-card form{display:grid;gap:14px}.admin-login-card label{display:grid;gap:7px;color:#475569;font-size:.72rem}.admin-login-card input,.admin-form-grid input,.admin-form-grid textarea,.admin-form-grid select{font:inherit;border:1px solid #d8e0ea;background:#fbfcfe;border-radius:8px;padding:12px 13px;outline:none;color:#0f172a}.admin-login-card input:focus,.admin-form-grid input:focus,.admin-form-grid textarea:focus,.admin-form-grid select:focus{border-color:#6d91c7;box-shadow:0 0 0 3px rgba(59,130,246,.08)}.admin-demo-btn{width:100%;margin-top:10px;background:transparent;border:1px solid #d8e0ea;border-radius:8px;padding:11px;color:#455468;cursor:pointer}.admin-back-link{display:block;background:none;border:0;padding:0;margin:18px auto 0;color:#48698f;cursor:pointer;font-size:.72rem}.admin-modal-backdrop{position:fixed;inset:0;background:rgba(2,6,23,.58);display:grid;place-items:center;padding:20px;z-index:5000}.admin-modal{width:min(840px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:14px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.3)}.admin-modal-head{display:flex;justify-content:space-between;align-items:flex-start}.admin-modal-head h3{margin:4px 0 18px}.admin-modal-head button{border:0;background:none;font-size:24px;cursor:pointer;color:#64748b}.admin-form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.admin-form-grid label{display:grid;gap:7px;font-size:.7rem;color:#475569}.admin-form-grid .wide,.admin-form-grid .toggle-field{grid-column:1/-1}.admin-form-grid textarea{min-height:110px;resize:vertical}.admin-form-grid .toggle-field{display:flex;align-items:center;gap:8px}.admin-form-grid .toggle-field input{width:auto}.admin-modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;border-top:1px solid #edf1f6;padding-top:16px}
        @media(max-width:900px){.admin-sidebar{width:210px}.admin-main{margin-left:210px;padding:26px}.admin-stats{grid-template-columns:repeat(2,1fr)}.admin-grid-two,.admin-user-grid{grid-template-columns:1fr}.admin-form-grid{grid-template-columns:1fr}.admin-form-grid .wide,.admin-form-grid .toggle-field{grid-column:auto}}
        @media(max-width:700px){.admin-app{display:block}.admin-sidebar{position:sticky;width:100%;min-height:0;height:auto;padding:12px 14px;z-index:20}.admin-brand{padding:0 0 12px;border-bottom:0}.admin-sidebar nav{flex-direction:row;overflow:auto;padding:8px 0 0}.admin-sidebar nav button{white-space:nowrap}.admin-sidebar-user{display:none}.admin-main{margin-left:0;padding:20px 14px 40px}.admin-topbar{align-items:flex-start}.admin-topbar h2{font-size:1.55rem}.admin-stats{grid-template-columns:1fr 1fr}.admin-panel{padding:17px}.admin-table-wrap{margin:0 -17px;padding:0 17px}.admin-login-card{padding:26px}.admin-modal-backdrop{padding:10px}.admin-modal{padding:18px;max-height:94vh}}
      `}</style>
    </div>
  );
}

export default function App() {
  const [enviado, setEnviado] = useState(false);
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

  const navigate = (path) => {
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
    if (window.location.hash === path) {
      setRoute(path);
      setIsMenuOpen(false);
      setScrolled(false);
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

      // La nueva interfaz se monta mientras la pantalla sigue completamente cubierta.
      // Luego retiramos la cubierta lentamente para que la navegación se sienta continua.
      transitionTimerRef.current = setTimeout(() => {
        setTransitionPhase('reveal');

        transitionTimerRef.current = setTimeout(() => {
          setTransitionPhase('idle');
        }, 700);
      }, 35);
    }, 475);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
    e.currentTarget.reset();
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
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <AreasPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route.startsWith('#area/')) {
    const areaName = decodeURIComponent(route.slice('#area/'.length));
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <AreaDetailPage area={areaName} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#firma') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <FirmPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#casos') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <CasesPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route.startsWith('#caso/')) {
    const id = decodeURIComponent(route.slice('#caso/'.length));
    const caso = caseStudies.find((item) => item.id === id);
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <CaseDetailPage caso={caso} onBack={() => navigate('#casos')} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#articulos') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <ArticlesPage onBack={() => navigate('#inicio')} onNavigate={navigate} />
      </>
    );
  }

  if (route.startsWith('#articulo/')) {
    const id = decodeURIComponent(route.slice('#articulo/'.length));
    const article = articles.find((item) => item.id === id);
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <ArticleDetailPage article={article} onNavigate={navigate} />
      </>
    );
  }

  if (route === '#contacto') {
    return (
      <>
        <PageNavbar scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} transitionPhase={transitionPhase} />
        <ContactDedicatedPage />
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

        /* --- BOTÓN FLOTANTE DE WHATSAPP (Escritorio cuando scrolled) --- */
        .floating-whatsapp-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          animation: floatBtnAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* --- BOTÓN FLOTANTE DE WHATSAPP (Móvil cuando scrolled) --- */
        .floating-whatsapp-mobile {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          align-items: center;
          justify-content: flex-end;
          animation: floatBtnAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes floatBtnAppear {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .Btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition-duration: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          background-color: #00d757;
          text-decoration: none;
        }

        .sign {
          width: 45px;
          height: 45px;
          min-width: 45px;
          transition-duration: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sign svg {
          width: 25px;
          height: 25px;
        }

        .sign svg path {
          fill: white;
        }

        .text {
          position: absolute;
          left: 45px;
          width: 0px;
          opacity: 0;
          color: white;
          font-size: 1.1em;
          font-weight: 600;
          transition-duration: 0.3s;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow: hidden;
          text-align: left;
        }

        .Btn:hover {
          width: 160px;
          border-radius: 40px;
          transition-duration: 0.3s;
        }

        .Btn:hover .sign {
          transition-duration: 0.3s;
        }

        .Btn:hover .text {
          opacity: 1;
          width: 100px;
          transition-duration: 0.3s;
        }

        .Btn:active {
          transform: translate(2px, 2px);
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

          .floating-whatsapp-container {
            display: none !important;
          }

          .floating-whatsapp-mobile {
            display: flex !important;
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

      {/* Botón flotante animado de WhatsApp (Escritorio) */}
      {scrolled && (
        <div className="floating-whatsapp-container">
          <a 
            href="https://wa.me/573113361929?text=Hola,%20me%20gustaría%20solicitar%20asesoría%20jurídica." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="Btn"
            aria-label="Escríbenos por WhatsApp"
          >
            <div className="sign">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="text">WhatsApp</span>
          </a>
        </div>
      )}

      {/* Botón flotante animado de WhatsApp (Móvil) */}
      {scrolled && (
        <div className="floating-whatsapp-mobile">
          <a 
            href="https://wa.me/573113361929?text=Hola,%20me%20gustaría%20solicitar%20asesoría%20jurídica." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="Btn"
            aria-label="Escríbenos por WhatsApp"
          >
            <div className="sign">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="text">WhatsApp</span>
          </a>
        </div>
      )}

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
            <a key={idx} href={item.href} onClick={(e) => { e.preventDefault(); navigate(item.href); }} style={navItemStyle} title={scrolled ? item.label : ""}>
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
              onClick={(e) => { e.preventDefault(); navigate(item.href); }}
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
            {caseStudies.slice(0, 2).map((caso) => (
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
                  <a href={`#articulo/${art.id}`} onClick={(e) => { e.preventDefault(); navigate(`#articulo/${art.id}`); }} className="cta-consultar" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Nombre completo o Empresa</label>
              <input required type="text" placeholder="Ej. Corporación S.A." style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', borderRadius: '0px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Correo electrónico de contacto</label>
              <input required type="email" placeholder="contacto@ejemplo.com" style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', borderRadius: '0px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', color: '#374151', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Detalle de la consulta</label>
              <textarea required rows="5" placeholder="Describa brevemente su requerimiento legal..." style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '16px 20px', color: '#111827', borderRadius: '0px', fontSize: '0.95rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}></textarea>
            </div>
            
            <button 
              type="submit" 
              style={{ 
                appearance: 'none',
                backgroundColor: '#1e3a8a',
                border: '0.125em solid #1e3a8a',
                borderRadius: '0px',
                boxSizing: 'border-box',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.8rem',
                fontWeight: '600',
                lineHeight: 'normal',
                margin: '12px 0 0 0',
                minHeight: '3.75em',
                minWidth: '0',
                outline: 'none',
                padding: '1em 2.3em',
                textAlign: 'center',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                transition: 'all 300ms cubic-bezier(.23, 1, 0.32, 1)',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'manipulation',
                willChange: 'transform',
                boxShadow: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.borderColor = '#1d4ed8';
                e.currentTarget.style.boxShadow = 'rgba(29, 78, 216, 0.35) 0 8px 15px';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = '#1e3a8a';
                e.currentTarget.style.borderColor = '#1e3a8a';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Enviar Consulta</button>
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

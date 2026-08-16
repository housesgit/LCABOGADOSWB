import React from 'react';
import logo from '../logo.png';

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
  scrollToContact: true,
  icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
];


export { RouteTransitionStyles, RouteTransition, dedicatedNavItems };

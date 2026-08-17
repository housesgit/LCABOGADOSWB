import React from 'react';

const whatsappUrl =
  'https://wa.me/573113361929?text=Hola,%20me%20gustaría%20solicitar%20asesoría%20jurídica.';

function WhatsAppLink() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="home-whatsapp-btn"
      aria-label="Escríbenos por WhatsApp"
    >
      <div className="home-whatsapp-sign">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>

      <span className="home-whatsapp-text">WhatsApp</span>
    </a>
  );
}

function HomeFloatingWhatsapp({ scrolled }) {
  if (!scrolled) return null;

  return (
    <>
      <style>{`
        .home-whatsapp-desktop {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          animation: homeWhatsappAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .home-whatsapp-mobile {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          align-items: center;
          justify-content: flex-end;
          animation: homeWhatsappAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes homeWhatsappAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .home-whatsapp-btn {
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

        .home-whatsapp-sign {
          width: 45px;
          height: 45px;
          min-width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .home-whatsapp-sign svg {
          width: 25px;
          height: 25px;
        }

        .home-whatsapp-sign svg path {
          fill: white;
        }

        .home-whatsapp-text {
          position: absolute;
          left: 45px;
          width: 0;
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

        .home-whatsapp-btn:hover {
          width: 160px;
          border-radius: 40px;
        }

        .home-whatsapp-btn:hover .home-whatsapp-text {
          opacity: 1;
          width: 100px;
        }

        .home-whatsapp-btn:active {
          transform: translate(2px, 2px);
        }

        @media (max-width: 768px) {
          .home-whatsapp-desktop {
            display: none !important;
          }

          .home-whatsapp-mobile {
            display: flex !important;
          }
        }
      `}</style>

      <div className="home-whatsapp-desktop">
        <WhatsAppLink />
      </div>

      <div className="home-whatsapp-mobile">
        <WhatsAppLink />
      </div>
    </>
  );
}

export default HomeFloatingWhatsapp;

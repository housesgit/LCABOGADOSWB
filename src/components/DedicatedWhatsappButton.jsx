import React from 'react';

const WHATSAPP_URL = "https://wa.me/573113361929?text=";
const whatsappGeneral = `${WHATSAPP_URL}${encodeURIComponent("Hola, me gustaría solicitar asesoría jurídica.")}`;

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

export default DedicatedWhatsappButton;

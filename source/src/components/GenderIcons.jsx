import React from "react";

export const BabyBoyIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Orejas de Osito */}
    <circle cx="25" cy="25" r="12" fill="#8D6E63" />
    <circle cx="75" cy="25" r="12" fill="#8D6E63" />
    <circle cx="25" cy="25" r="7" fill="#A1887F" />
    <circle cx="75" cy="25" r="7" fill="#A1887F" />

    {/* Cara del Oso */}
    <circle cx="50" cy="55" r="40" fill="#8D6E63" />
    
    {/* Hocico */}
    <circle cx="50" cy="65" r="15" fill="#D7CCC8" />
    <path d="M46 62 Q50 65 54 62" fill="#333" /> {/* Nariz pequeña */}

    {/* Moño de color para NIÑO (Azul) */}
    <path d="M35 15 L50 25 L65 15 L65 35 L50 25 L35 35 Z" fill="#90ADC6" />
    <circle cx="50" cy="25" r="4" fill="#64B5F6" />

    {/* Ojos */}
    <circle cx="35" cy="52" r="4" fill="#333" />
    <circle cx="65" cy="52" r="4" fill="#333" />

    {/* Sonrisa sutil */}
    <path d="M45 72 Q50 76 55 72" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BabyGirlIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Orejas de Osito */}
    <circle cx="25" cy="25" r="12" fill="#A1887F" />
    <circle cx="75" cy="25" r="12" fill="#A1887F" />
    <circle cx="25" cy="25" r="7" fill="#BCAAA4" />
    <circle cx="75" cy="25" r="7" fill="#BCAAA4" />

    {/* Cara del Oso */}
    <circle cx="50" cy="55" r="40" fill="#A1887F" />
    
    {/* Hocico */}
    <circle cx="50" cy="65" r="15" fill="#EEEBE9" />
    <path d="M46 62 Q50 65 54 62" fill="#333" />

    {/* Moño de color para NIÑA (Rosa) */}
    <path d="M35 15 L50 25 L65 15 L65 35 L50 25 L35 35 Z" fill="#E195AB" />
    <circle cx="50" cy="25" r="4" fill="#F06292" />

    {/* Ojos con pestañas */}
    <circle cx="35" cy="52" r="4" fill="#333" />
    <circle cx="65" cy="52" r="4" fill="#333" />
    <path d="M30 48 L33 50" stroke="#333" strokeWidth="1.5" />
    <path d="M70 48 L67 50" stroke="#333" strokeWidth="1.5" />

    {/* Sonrisa sutil */}
    <path d="M45 72 Q50 76 55 72" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
  </svg>
);


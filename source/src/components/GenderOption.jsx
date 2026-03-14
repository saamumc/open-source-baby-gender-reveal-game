import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";

const BabyGirlIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Orejas Traseras (Sombra) */}
    <circle cx="28" cy="38" r="22" fill="#B08968" />
    <circle cx="92" cy="38" r="22" fill="#B08968" />
    
    {/* Interior de las Orejas (Capas de profundidad) */}
    <circle cx="28" cy="38" r="14" fill="#E8D0B3" />
    <path d="M 20 38 Q 28 28 36 38" stroke="#9A7B5E" strokeWidth="2" fill="none" />
    <circle cx="92" cy="38" r="14" fill="#E8D0B3" />
    <path d="M 84 38 Q 92 28 100 38" stroke="#9A7B5E" strokeWidth="2" fill="none" />

    {/* Cabeza Principal */}
    <circle cx="60" cy="65" r="42" fill="#C29A74" />

    {/* Textura de Pelaje (Mejillas y Copete) */}
    <path d="M 18 65 Q 10 70 18 78 Q 12 83 22 86" fill="#C29A74" stroke="none" />
    <path d="M 102 65 Q 110 70 102 78 Q 108 83 98 86" fill="#C29A74" stroke="none" />
    <path d="M 50 25 Q 60 15 70 25 Q 65 20 60 25 Z" fill="#B08968" />

    {/* Moño Detallado en la Cabeza (Niña) */}
    <g transform="translate(60 22) scale(1.1)">
      {/* Capa trasera del moño */}
      <path d="M -30 -15 C -15 -25, -5 -15, 0 -5 C 5 -25, 15 -25, 30 -15 C 25 5, 5 15, 0 5 C -5 15, -25 5, -30 -15 Z" fill="#FF9EBF" />
      {/* Capa frontal del moño (Pliegues) */}
      <path d="M -25 -10 C -15 -18, -5 -10, 0 0 C 5 -10, 15 -18, 25 -10 C 20 5, 5 10, 0 0 C -5 10, -20 5, -25 -10 Z" fill="#FF1493" />
      {/* Detalles de arrugas de tela */}
      <path d="M -15 -5 L -5 0 M -18 0 L -8 2" stroke="#FF9EBF" strokeWidth="1.5" fill="none" />
      <path d="M 15 -5 L 5 0 M 18 0 L 8 2" stroke="#FF9EBF" strokeWidth="1.5" fill="none" />
      {/* Centro del moño */}
      <circle cx="0" cy="0" r="7" fill="#FF69B4" />
      <circle cx="-2" cy="-2" r="2" fill="white" opacity="0.6" />
    </g>

    {/* Hocico 3D */}
    <ellipse cx="60" cy="80" rx="22" ry="16" fill="#FFF0D4" />
    <ellipse cx="60" cy="82" rx="18" ry="12" fill="#FFE6C2" />

    {/* Nariz con Brillo */}
    <path d="M 52 72 Q 60 68 68 72 L 64 76 Q 60 80 56 76 Z" fill="#5C4033" />
    <circle cx="56" cy="72" r="2" fill="white" opacity="0.8" />

    {/* Boca detallada */}
    <path d="M 60 77 L 60 84 M 50 82 Q 60 92 70 82" stroke="#5C4033" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 57 88 Q 60 90 63 88" stroke="#FF9EBF" strokeWidth="2" fill="none" strokeLinecap="round" /> {/* Lengüita */}

    {/* Ojos expresivos con pestañas gruesas */}
    <g className="eyes">
      <circle cx="44" cy="58" r="6" fill="#333" />
      <circle cx="76" cy="58" r="6" fill="#333" />
      {/* Brillos (Catchlights) */}
      <circle cx="42" cy="56" r="2" fill="white" />
      <circle cx="45" cy="59" r="1" fill="white" />
      <circle cx="74" cy="56" r="2" fill="white" />
      <circle cx="77" cy="59" r="1" fill="white" />
      {/* Pestañas detalladas */}
      <path d="M 40 54 L 35 50 M 43 52 L 40 47 M 46 53 L 45 48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 54 L 85 50 M 77 52 L 80 47 M 74 53 L 75 48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Rubor pronunciado */}
    <ellipse cx="38" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
    <ellipse cx="82" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
  </svg>
);

const BabyBoyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Orejas Traseras */}
    <circle cx="28" cy="38" r="22" fill="#8E6A4B" />
    <circle cx="92" cy="38" r="22" fill="#8E6A4B" />
    
    {/* Interior de las Orejas */}
    <circle cx="28" cy="38" r="14" fill="#D2B48C" />
    <path d="M 20 38 Q 28 28 36 38" stroke="#7A5A3D" strokeWidth="2" fill="none" />
    <circle cx="92" cy="38" r="14" fill="#D2B48C" />
    <path d="M 84 38 Q 92 28 100 38" stroke="#7A5A3D" strokeWidth="2" fill="none" />

    {/* Cabeza Principal */}
    <circle cx="60" cy="65" r="42" fill="#A67B5B" />

    {/* Textura de Pelaje (Copete desordenado) */}
    <path d="M 18 65 Q 10 70 18 78 Q 12 83 22 86" fill="#A67B5B" stroke="none" />
    <path d="M 102 65 Q 110 70 102 78 Q 108 83 98 86" fill="#A67B5B" stroke="none" />
    {/* Copete puntiagudo de niño */}
    <path d="M 45 28 L 50 18 L 55 25 L 60 15 L 65 25 L 70 18 L 75 28 Z" fill="#8E6A4B" />

    {/* Hocico 3D */}
    <ellipse cx="60" cy="80" rx="22" ry="16" fill="#FFF0D4" />
    <ellipse cx="60" cy="82" rx="18" ry="12" fill="#FFE6C2" />

    {/* Nariz con Brillo */}
    <path d="M 52 72 Q 60 68 68 72 L 64 76 Q 60 80 56 76 Z" fill="#4A3320" />
    <circle cx="56" cy="72" r="2" fill="white" opacity="0.8" />

    {/* Boca detallada (Sonrisa más amplia) */}
    <path d="M 60 77 L 60 84 M 48 80 Q 60 90 72 80" stroke="#4A3320" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Hoyuelos */}
    <path d="M 45 78 C 45 80, 48 82, 48 82" stroke="#8E6A4B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 75 78 C 75 80, 72 82, 72 82" stroke="#8E6A4B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Ojos y Cejas de niño */}
    <g className="eyes">
      <circle cx="44" cy="58" r="6" fill="#333" />
      <circle cx="76" cy="58" r="6" fill="#333" />
      {/* Brillos */}
      <circle cx="42" cy="56" r="2" fill="white" />
      <circle cx="45" cy="59" r="1" fill="white" />
      <circle cx="74" cy="56" r="2" fill="white" />
      <circle cx="77" cy="59" r="1" fill="white" />
      {/* Cejas expresivas */}
      <path d="M 38 48 Q 44 45 50 48" stroke="#4A3320" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 82 48 Q 76 45 70 48" stroke="#4A3320" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>

    {/* Moño Elegante en el Cuello (Corbatín) */}
    <g transform="translate(60 105) scale(1.2)">
      {/* Capa trasera oscura */}
      <path d="M -22 -10 L 0 0 L 22 -10 L 22 10 L 0 0 L -22 10 Z" fill="#2E4B9A" />
      {/* Capa frontal clara */}
      <path d="M -18 -6 L 0 0 L 18 -6 L 18 6 L 0 0 L -18 6 Z" fill="#4169E1" />
      {/* Pliegues del corbatín */}
      <path d="M -10 -2 L -5 0 M -10 2 L -5 0" stroke="#2E4B9A" strokeWidth="1" fill="none" />
      <path d="M 10 -2 L 5 0 M 10 2 L 5 0" stroke="#2E4B9A" strokeWidth="1" fill="none" />
      {/* Nudo central */}
      <rect x="-4" y="-5" width="8" height="10" rx="3" fill="#1E449A" />
      <line x1="-2" y1="-5" x2="-2" y2="5" stroke="#4169E1" strokeWidth="1" />
    </g>
  </svg>
);
export default GenderOption;

// El resto de tu componente GenderOption, GlowingBackground, etc., 
// se mantiene EXACTAMENTE IGUAL. Sólo reemplaza las funciones de arriba.

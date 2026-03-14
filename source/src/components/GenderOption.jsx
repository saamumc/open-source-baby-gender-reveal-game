import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// --- ICONO NIÑA ULTRA DETALLADO ---
const BabyGirlIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle cx="28" cy="38" r="22" fill="#B08968" />
    <circle cx="92" cy="38" r="22" fill="#B08968" />
    <circle cx="28" cy="38" r="14" fill="#E8D0B3" />
    <path d="M 20 38 Q 28 28 36 38" stroke="#9A7B5E" strokeWidth="2" fill="none" />
    <circle cx="92" cy="38" r="14" fill="#E8D0B3" />
    <path d="M 84 38 Q 92 28 100 38" stroke="#9A7B5E" strokeWidth="2" fill="none" />
    <circle cx="60" cy="65" r="42" fill="#C29A74" />
    <path d="M 18 65 Q 10 70 18 78 Q 12 83 22 86" fill="#C29A74" />
    <path d="M 102 65 Q 110 70 102 78 Q 108 83 98 86" fill="#C29A74" />
    <path d="M 50 25 Q 60 15 70 25 Q 65 20 60 25 Z" fill="#B08968" />
    <g transform="translate(60 22) scale(1.1)">
      <path d="M -30 -15 C -15 -25, -5 -15, 0 -5 C 5 -25, 15 -25, 30 -15 C 25 5, 5 15, 0 5 C -5 15, -25 5, -30 -15 Z" fill="#FF9EBF" />
      <path d="M -25 -10 C -15 -18, -5 -10, 0 0 C 5 -10, 15 -18, 25 -10 C 20 5, 5 10, 0 0 C -5 10, -20 5, -25 -10 Z" fill="#FF1493" />
      <path d="M -15 -5 L -5 0 M -18 0 L -8 2" stroke="#FF9EBF" strokeWidth="1.5" fill="none" />
      <path d="M 15 -5 L 5 0 M 18 0 L 8 2" stroke="#FF9EBF" strokeWidth="1.5" fill="none" />
      <circle cx="0" cy="0" r="7" fill="#FF69B4" />
      <circle cx="-2" cy="-2" r="2" fill="white" opacity="0.6" />
    </g>
    <ellipse cx="60" cy="80" rx="22" ry="16" fill="#FFF0D4" />
    <ellipse cx="60" cy="82" rx="18" ry="12" fill="#FFE6C2" />
    <path d="M 52 72 Q 60 68 68 72 L 64 76 Q 60 80 56 76 Z" fill="#5C4033" />
    <circle cx="56" cy="72" r="2" fill="white" opacity="0.8" />
    <path d="M 60 77 L 60 84 M 50 82 Q 60 92 70 82" stroke="#5C4033" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 57 88 Q 60 90 63 88" stroke="#FF9EBF" strokeWidth="2" fill="none" strokeLinecap="round" />
    <g>
      <circle cx="44" cy="58" r="6" fill="#333" />
      <circle cx="76" cy="58" r="6" fill="#333" />
      <circle cx="42" cy="56" r="2" fill="white" />
      <circle cx="74" cy="56" r="2" fill="white" />
      <path d="M 40 54 L 35 50 M 43 52 L 40 47 M 46 53 L 45 48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 54 L 85 50 M 77 52 L 80 47 M 74 53 L 75 48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </g>
    <ellipse cx="38" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
    <ellipse cx="82" cy="70" rx="8" ry="5" fill="#FFB6C1" opacity="0.6" />
  </svg>
);

// --- ICONO NIÑO ULTRA DETALLADO ---
const BabyBoyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    <circle cx="28" cy="38" r="22" fill="#8E6A4B" />
    <circle cx="92" cy="38" r="22" fill="#8E6A4B" />
    <circle cx="28" cy="38" r="14" fill="#D2B48C" />
    <path d="M 20 38 Q 28 28 36 38" stroke="#7A5A3D" strokeWidth="2" fill="none" />
    <circle cx="92" cy="38" r="14" fill="#D2B48C" />
    <path d="M 84 38 Q 92 28 100 38" stroke="#7A5A3D" strokeWidth="2" fill="none" />
    <circle cx="60" cy="65" r="42" fill="#A67B5B" />
    <path d="M 18 65 Q 10 70 18 78 Q 12 83 22 86" fill="#A67B5B" />
    <path d="M 102 65 Q 110 70 102 78 Q 108 83 98 86" fill="#A67B5B" />
    <path d="M 45 28 L 50 18 L 55 25 L 60 15 L 65 25 L 70 18 L 75 28 Z" fill="#8E6A4B" />
    <ellipse cx="60" cy="80" rx="22" ry="16" fill="#FFF0D4" />
    <ellipse cx="60" cy="82" rx="18" ry="12" fill="#FFE6C2" />
    <path d="M 52 72 Q 60 68 68 72 L 64 76 Q 60 80 56 76 Z" fill="#4A3320" />
    <circle cx="56" cy="72" r="2" fill="white" opacity="0.8" />
    <path d="M 60 77 L 60 84 M 48 80 Q 60 90 72 80" stroke="#4A3320" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 45 78 C 45 80, 48 82, 48 82" stroke="#8E6A4B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 75 78 C 75 80, 72 82, 72 82" stroke="#8E6A4B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <g>
      <circle cx="44" cy="58" r="6" fill="#333" />
      <circle cx="76" cy="58" r="6" fill="#333" />
      <circle cx="42" cy="56" r="2" fill="white" />
      <circle cx="74" cy="56" r="2" fill="white" />
      <path d="M 38 48 Q 44 45 50 48" stroke="#4A3320" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 82 48 Q 76 45 70 48" stroke="#4A3320" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    <g transform="translate(60 105) scale(1.2)">
      <path d="M -22 -10 L 0 0 L 22 -10 L 22 10 L 0 0 L -22 10 Z" fill="#2E4B9A" />
      <path d="M -18 -6 L 0 0 L 18 -6 L 18 6 L 0 0 L -18 6 Z" fill="#4169E1" />
      <rect x="-4" y="-5" width="8" height="10" rx="3" fill="#1E449A" />
    </g>
  </svg>
);

// --- COMPONENTE GENDER OPTION ---
const GenderOption = ({ type, selected, onClick, label }) => {
  return (
    <OptionContainer
      onClick={onClick}
      $isSelected={selected}
      $type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <IconWrapper>
        {type === "girl" ? <BabyGirlIcon /> : <BabyBoyIcon />}
      </IconWrapper>
      <LabelText>{label}</LabelText>
      {selected && (
        <CheckBadge
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          $type={type}
        >
          ✓
        </CheckBadge>
      )}
    </OptionContainer>
  );
};

// --- ESTILOS ---
const OptionContainer = styled(motion.div)`
  background: white;
  padding: 2.5rem 1.5rem;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  position: relative;
  width: 100%;
  max-width: 200px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 4px solid ${props => 
    props.$isSelected 
      ? (props.$type === "girl" ? "#FFB6C1" : "#AED9E0") 
      : "transparent"};
  background: ${props => 
    props.$isSelected 
      ? (props.$type === "girl" ? "#FFF9FA" : "#F7FBFC") 
      : "white"};
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  color: #5D4037;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CheckBadge = styled(motion.div)`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 40px;
  height: 40px;
  background: ${props => props.$type === "girl" ? "#FF69B4" : "#4169E1"};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  border: 3px solid white;
`;

export default GenderOption;

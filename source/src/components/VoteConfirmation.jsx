import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";

// IMPORTANTE: Traemos los iconos reales para mantener la estética y evitar errores
import { BabyBoyIcon, BabyGirlIcon } from "./GenderOption";

const VoteConfirmation = ({ selected }) => {
  const { width, height } = useWindowSize();

  const elegantConfettiColors = [
    '#D4AF37', '#F5F5DC', '#D2B48C', '#8D6E63', '#FFFDD0', '#E195AB', '#90ADC6'
  ];

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          run={true}
          colors={elegantConfettiColors}
        />
        <ConfirmationCard
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
          }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
        >
          <IconWrapper
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              },
            }}
            $type={selected}
          >
            {/* REEMPLAZO: Emojis por Componentes SVG */}
            {selected === "girl" ? <BabyGirlIcon /> : <BabyBoyIcon />}
          </IconWrapper>
          
          <TextContainer>
            <MessageText
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            >
              ¡Gracias por tu voto!
            </MessageText>
            <SubText
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            >
              Tu predicción ha sido guardada con éxito. <br/> ¡Qué emoción!
            </SubText>
          </TextContainer>

          <StyledLink 
            to="/results"
            as={motion.button}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Resultados
          </StyledLink>
        </ConfirmationCard>
      </Overlay>
    </AnimatePresence>
  );
};

// --- ESTILOS ---
// (Mantenemos tus estilos, solo ajusté IconWrapper para que el SVG encaje bien)

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(62, 49, 43, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ConfirmationCard = styled(motion.div)`
  background: #FFFAF0;
  padding: 3rem 2rem;
  border-radius: 32px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(210, 180, 140, 0.3);
`;

const IconWrapper = styled(motion.div)`
  background: ${props => props.$type === "girl" ? "#FDF2F5" : "#F0F7FA"};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  padding: 15px; /* Espacio para que el SVG no toque los bordes */
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div` gap: 10px; `;
const MessageText = styled(motion.h2)` color: #5D4037; font-weight: 800; `;
const SubText = styled(motion.p)` color: #8D6E63; `;

const StyledLink = styled(Link)`
  background: #8D6E63;
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

export default VoteConfirmation;

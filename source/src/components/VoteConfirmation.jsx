import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";

const VoteConfirmation = ({ selected }) => {
  const { width, height } = useWindowSize();

  // Paleta de colores elegante para el confeti (Dorados, beiges, cafés claros y un toque de rosa/azul)
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
            {/* Si eligió niña sale un moño, si eligió niño un osito */}
            {selected === "girl" ? "🎀" : "🧸"}
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

// --- ESTILOS ELEGANTES ---

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Un fondo oscuro pero en tono cálido (café muy oscuro) en lugar de negro puro */
  background: rgba(62, 49, 43, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmationCard = styled(motion.div)`
  background: #FFFAF0; /* Un blanco floral/crema muy elegante */
  padding: 3rem 2rem;
  border-radius: 32px;
  text-align: center;
  max-width: 90%;
  width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 1px solid rgba(210, 180, 140, 0.3); /* Borde sutil color canela */
`;

const IconWrapper = styled(motion.div)`
  font-size: 4.5rem;
  /* Fondo circular suave que cambia ligeramente según la elección, pero se mantiene pastel */
  background: ${(props) => 
    props.$type === "girl" 
      ? "linear-gradient(135deg, #FDF2F5, #F5D0E1)" 
      : "linear-gradient(135deg, #F0F7FA, #D0E4F5)"};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 4px solid #FFFFFF;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageText = styled(motion.h2)`
  font-size: 2rem;
  color: #5D4037; /* Café oscuro elegante */
  margin: 0;
  font-weight: 700;
`;

const SubText = styled(motion.p)`
  font-size: 1.1rem;
  color: #8D6E63; /* Café medio */
  margin: 0;
  line-height: 1.5;
`;

const StyledLink = styled(motion(Link))`
  display: inline-block;
  /* Botón color café/canela para mantener la paleta neutra */
  background: linear-gradient(135deg, #A1887F, #8D6E63);
  color: white;
  text-decoration: none;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(141, 110, 99, 0.3);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 25px rgba(141, 110, 99, 0.4);
  }
`;

export default VoteConfirmation;

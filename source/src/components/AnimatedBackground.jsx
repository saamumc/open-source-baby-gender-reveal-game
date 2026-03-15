import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const { selectedGender, isVoteSubmitted } = useSelector((state) => state.vote);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // --- Lógica de Colores Existente ---
  const getParticleColor = () => {
    if (isVoteSubmitted) return "#D4AF37";
    if (!selectedGender) return "#C2B280";
    return selectedGender === "girl" ? "#E195AB" : "#90ADC6";
  };

  const getBackgroundColor = () => {
    if (isVoteSubmitted) return "#FFFDF0";
    if (!selectedGender) return "#F5F5DC";
    return selectedGender === "girl" ? "#FDF2F5" : "#F0F7FA";
  };

  const options = {
    fullScreen: { enable: true, zIndex: -2 }, // Movido a -2 para estar detrás de los ositos
    particles: {
      color: { value: getParticleColor() },
      number: { value: isVoteSubmitted ? 100 : 35, density: { enable: true, area: 800 } },
      shape: { type: isVoteSubmitted ? ["circle", "star"] : "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: isVoteSubmitted ? { min: 2, max: 4 } : { min: 1, max: 3 }, random: true },
      move: { enable: true, speed: isVoteSubmitted ? 4 : 1.2, direction: isVoteSubmitted ? "top" : "none", outModes: { default: "out" } },
      links: { enable: !isVoteSubmitted, distance: 150, color: getParticleColor(), opacity: 0.2, width: 1 },
    },
    background: { color: getBackgroundColor() },
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" } },
      modes: { bubble: { size: 6, distance: 200, duration: 2, opacity: 0.8 } },
    },
    detectRetina: true,
  };

  // --- Configuración de Animación para Elementos Flotantes ---
  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <BackgroundWrapper>
      <Particles 
        id="tsparticles" 
        init={particlesInit} 
        options={options} 
      />
      
      {/* Ositos y Nubes Flotantes */}
      <FloatingElementsContainer>
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          alt="Osito Azul"
          variants={floatingAnimation}
          animate="animate"
          style={{ top: '10%', right: '10%', width: '120px' }}
        />
        <FloatingImg
          as={motion.img}
          src="/osito_rosa.png"
          alt="Osito Rosa"
          variants={floatingAnimation}
          animate="animate"
          style={{ bottom: '15%', left: '5%', width: '130px' }}
          transition={{ delay: 1 }}
        />
        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          alt="Nube"
          variants={floatingAnimation}
          animate="animate"
          style={{ top: '15%', left: '10%', width: '150px', opacity: 0.6 }}
          transition={{ delay: 2 }}
        />
        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          alt="Estrella"
          variants={{
            animate: {
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
              transition: { duration: 3, repeat: Infinity }
            }
          }}
          animate="animate"
          style={{ top: '40%', right: '20%', width: '40px' }}
        />
      </FloatingElementsContainer>
    </BackgroundWrapper>
  );
};

// --- ESTILOS ---

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const FloatingElementsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Para que no bloquee los clics en los botones */
`;

const FloatingImg = styled.img`
  position: absolute;
  user-select: none;
`;

export default AnimatedBackground;

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

  // Configuración de colores dinámica
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
    fullScreen: { enable: true, zIndex: -2 }, // Detrás de todo
    particles: {
      color: { value: getParticleColor() },
      number: { value: isVoteSubmitted ? 100 : 35, density: { enable: true, area: 800 } },
      shape: { type: isVoteSubmitted ? ["circle", "star"] : "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: isVoteSubmitted ? { min: 2, max: 4 } : { min: 1, max: 3 }, random: true },
      move: { 
        enable: true, 
        speed: isVoteSubmitted ? 4 : 1.2, 
        direction: isVoteSubmitted ? "top" : "none", 
        outModes: { default: "out" } 
      },
      links: { enable: !isVoteSubmitted, distance: 150, color: getParticleColor(), opacity: 0.2, width: 1 },
    },
    background: { color: getBackgroundColor() },
  };

  // Variantes de animación para los elementos flotantes
  const floatVariants = {
    animate: (custom) => ({
      y: [0, custom.y, 0],
      x: [0, custom.x, 0],
      rotate: [0, custom.r, 0],
      transition: {
        duration: custom.d,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <BackgroundWrapper>
      <Particles id="tsparticles" init={particlesInit} options={options} />
      
      <FloatingElementsContainer>
        {/* Nube Grande arriba a la izquierda */}
        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: -15, x: 10, r: 2, d: 8 }}
          variants={floatVariants}
          animate="animate"
          style={{ top: '5%', left: '5%', width: '180px', opacity: 0.7 }}
        />

        {/* Osito Azul arriba a la derecha */}
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          custom={{ y: -25, x: -15, r: 3, d: 6 }}
          variants={floatVariants}
          animate="animate"
          style={{ top: '10%', right: '8%', width: '110px' }}
        />

        {/* Estrella Grande en el centro */}
        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          variants={{
            animate: {
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.9, 0.4],
              transition: { duration: 4, repeat: Infinity }
            }
          }}
          animate="animate"
          style={{ top: '45%', right: '15%', width: '45px' }}
        />

        {/* Osito Rosa abajo a la izquierda */}
        <FloatingImg
          as={motion.img}
          src="/osito_rosa.png"
          custom={{ y: 20, x: 15, r: -4, d: 7 }}
          variants={floatVariants}
          animate="animate"
          style={{ bottom: '10%', left: '10%', width: '120px' }}
        />
      </FloatingElementsContainer>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1;
`;

const FloatingElementsContainer = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; // No bloquea los botones de votación
`;

const FloatingImg = styled.img`
  position: absolute;
  user-select: none;
`;

export default AnimatedBackground;

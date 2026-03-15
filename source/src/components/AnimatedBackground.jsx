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
    fullScreen: { enable: true, zIndex: -2 }, 
    particles: {
      color: { value: getParticleColor() },
      number: { value: isVoteSubmitted ? 80 : 25, density: { enable: true, area: 800 } },
      shape: { type: isVoteSubmitted ? ["circle", "star"] : "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: { min: 1, max: 3 }, random: true },
      move: { enable: true, speed: 0.8, direction: "none", outModes: { default: "out" } },
    },
    background: { color: getBackgroundColor() },
  };

  const floatVariants = {
    animate: (custom) => ({
      y: [0, custom.y, 0],
      x: [0, custom.x, 0],
      rotate: [0, custom.r || 0, 0],
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
        {/* Nube Grande - Corregido a .png */}
        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: -10, x: 15, d: 10 }}
          variants={floatVariants}
          animate="animate"
          style={{ top: '8%', left: '5%', width: '160px', opacity: 0.6 }}
        />

        {/* Osito Azul (Lado derecho superior) - Corregido a .png */}
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          custom={{ y: -20, x: -10, r: 2, d: 7 }}
          variants={floatVariants}
          animate="animate"
          style={{ top: '15%', right: '5%', width: '130px' }}
        />

        {/* Estrella (Cerca de los resultados) - Corregido a .png */}
        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          variants={{
            animate: {
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.1, 0.9],
              transition: { duration: 5, repeat: Infinity }
            }
          }}
          animate="animate"
          style={{ top: '45%', right: '12%', width: '40px' }}
        />

        {/* Osito Rosa (Lado izquierdo inferior) - Corregido a .png */}
        <FloatingImg
          as={motion.img}
          src="/osito_rosa.png"
          custom={{ y: 25, x: 10, r: -3, d: 8 }}
          variants={floatVariants}
          animate="animate"
          style={{ bottom: '10%', left: '8%', width: '140px' }}
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
  pointer-events: none;
  z-index: 0; 
`;

const FloatingImg = styled.img`
  position: absolute;
  user-select: none;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
`;

export default AnimatedBackground;

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

  const options = {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      color: { value: getParticleColor() },
      number: { value: isVoteSubmitted ? 80 : 25, density: { enable: true, area: 800 } },
      shape: { type: isVoteSubmitted ? ["circle", "star"] : "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: { min: 1, max: 3 }, random: true },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        outModes: { default: "out" }
      }
    },
    background: { color: "transparent" }
  };

  // VARIANTES OPTIMIZADAS PARA GPU
  const chaoticVariants = {
    animate: (custom) => ({
      x: [0, custom.x * 5, -custom.x * 5, custom.x * 2, 0],
      y: [0, custom.y * 5, -custom.y * 5, custom.y * 2, 0],
      rotate: [0, custom.r || 0, -(custom.r || 0), 0],
      transition: {
        duration: custom.d || 12,
        repeat: Infinity,
        ease: "linear",
      }
    })
  };

  return (
    <BackgroundWrapper>
      <Particles id="tsparticles" init={particlesInit} options={options} />

      <FloatingElementsContainer>
        {/* OSITO ROSA */}
        <FloatingImg
          as={motion.img}
          src="/osito_rosa.png"
          custom={{ y: 8, x: 7, r: -5, d: 18 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "10%", left: "8%", width: "130px" }}
        />

        {/* OSITO AZUL */}
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          custom={{ y: 7, x: 8, r: 6, d: 20 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "15%", right: "5%", width: "120px" }}
        />

        {/* NUBES */}
        {[
          { top: "8%", left: "5%", w: "160px", op: 0.6, c: { y: 5, x: 10, d: 35 } },
          { bottom: "35%", left: "3%", w: "140px", op: 0.5, c: { y: 4, x: 9, d: 40 } },
          { top: "50%", right: "25%", w: "150px", op: 0.4, c: { y: 6, x: 8, d: 45 } },
          { bottom: "15%", right: "35%", w: "130px", op: 0.6, c: { y: 5, x: 9, d: 38 } },
          { top: "5%", right: "35%", w: "145px", op: 0.5, c: { y: 5, x: 8, d: 42 } },
        ].map((nube, i) => (
          <FloatingImg
            key={`nube-${i}`}
            as={motion.img}
            src="/nube_grande_1.png"
            custom={nube.c}
            variants={chaoticVariants}
            animate="animate"
            style={{ 
              top: nube.top, 
              bottom: nube.bottom, 
              left: nube.left, 
              right: nube.right, 
              width: nube.w, 
              opacity: nube.op 
            }}
          />
        ))}

        {/* ESTRELLAS */}
        {[
          { top: "35%", right: "12%", w: "40px", c: { y: 7, x: 12, d: 18 } },
          { bottom: "40%", left: "15%", w: "35px", c: { y: 8, x: 11, d: 20 } },
          { top: "65%", left: "40%", w: "45px", c: { y: 9, x: 10, d: 22 } },
          { bottom: "60%", right: "40%", w: "38px", c: { y: 7, x: 9, d: 21 } },
          { top: "20%", left: "50%", w: "42px", c: { y: 8, x: 10, d: 19 } },
        ].map((star, i) => (
          <FloatingImg
            key={`star-${i}`}
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={star.c}
            variants={chaoticVariants}
            animate="animate"
            style={{ 
              top: star.top, 
              bottom: star.bottom, 
              left: star.left, 
              right: star.right, 
              width: star.w 
            }}
          />
        ))}
      </FloatingElementsContainer>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Cambiado a -1 para asegurar que no bloquee interacciones */
  overflow: hidden;
`;

const FloatingElementsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingImg = styled.img`
  position: absolute;
  user-select: none;
  /* El filtro drop-shadow es costoso, pero will-change ayuda a la GPU */
  will-change: transform;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
`;

export default AnimatedBackground;

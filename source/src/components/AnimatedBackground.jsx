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

  // --- VARIANTES CON RANGO AMPLIO (TODA LA PANTALLA) ---
  const chaoticVariants = {
    animate: (custom) => ({
      x: [
        "0%", 
        `${custom.xRange * 0.8}%`, 
        `${-custom.xRange * 0.5}%`, 
        `${custom.xRange * 0.3}%`, 
        "0%"
      ],
      y: [
        "0%", 
        `${-custom.yRange * 0.6}%`, 
        `${custom.yRange * 0.8}%`, 
        `${-custom.yRange * 0.4}%`, 
        "0%"
      ],
      rotate: [0, custom.r || 10, -(custom.r || 10), 5, 0],
      transition: {
        duration: custom.d || 25, // Duraciones más largas para que el recorrido grande no sea frenético
        repeat: Infinity,
        ease: "easeInOut",
      }
    })
  };

  return (
    <BackgroundWrapper>
      <Particles id="tsparticles" init={particlesInit} options={options} />

      <FloatingElementsContainer>
        {/* OSITO ROSA - Recorrido amplio */}
        <FloatingImg
          as={motion.img}
          src="/osito_rosa.png"
          custom={{ yRange: 50, xRange: 40, r: 15, d: 22 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "15%", left: "10%", width: "130px" }}
        />

        {/* OSITO AZUL - Recorrido amplio */}
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          custom={{ yRange: 60, xRange: 50, r: -15, d: 25 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "15%", right: "10%", width: "120px" }}
        />

        {/* NUBES CON MOVIMIENTOS DIFERENCIADOS */}
        {[
          { top: "10%", left: "5%", w: "160px", op: 0.5, c: { yRange: 30, xRange: 60, d: 40 } },
          { bottom: "20%", right: "5%", w: "150px", op: 0.4, c: { yRange: 40, xRange: 50, d: 50 } },
          { top: "45%", left: "40%", w: "140px", op: 0.3, c: { yRange: 70, xRange: 30, d: 45 } },
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

        {/* ESTRELLAS - Dispersas y con gran rango */}
        {[
          { top: "30%", left: "20%", w: "40px", c: { yRange: 80, xRange: 80, d: 20 } },
          { bottom: "30%", right: "20%", w: "35px", c: { yRange: 70, xRange: 70, d: 18 } },
          { top: "70%", left: "50%", w: "45px", c: { yRange: 50, xRange: 90, d: 22 } },
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
  z-index: -1;
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
  will-change: transform;
  /* Mantenemos el drop-shadow pero suave para no afectar performance */
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.03));
`;

export default AnimatedBackground;

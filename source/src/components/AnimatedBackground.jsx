import React, { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedBackground = () => {
  const { selectedGender, isVoteSubmitted } = useSelector((state) => state.vote);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      color: { value: isVoteSubmitted ? "#D4AF37" : (selectedGender === "girl" ? "#E195AB" : "#90ADC6") },
      number: { value: isVoteSubmitted ? 60 : 20, density: { enable: true, area: 800 } },
      move: { enable: true, speed: 0.6 }, // Un poco más lento para no distraer
      opacity: { value: 0.25 }
    },
    background: { color: "transparent" }
  }), [isVoteSubmitted, selectedGender]);

  // VARIANTES DE ANIMACIÓN (Caótica y Amplia)
  const chaoticVariants = {
    animate: (custom) => ({
      x: ["0%", `${custom.xDir * 65}%`, `${-custom.xDir * 35}%`, "0%"],
      y: ["0%", `${custom.yDir * 65}%`, `${-custom.yDir * 35}%`, "0%"],
      rotate: [0, custom.r, -custom.r, 0],
      scale: [1, 1.05, 0.95, 1], // Ligero efecto de profundidad
      transition: {
        duration: custom.d,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.delay || 0
      }
    })
  };

  return (
    <BackgroundWrapper>
      <Particles id="tsparticles" init={particlesInit} options={options} />

      <AnimatePresence mode="wait">
        <FloatingElementsContainer key={selectedGender ? `gender-${selectedGender}` : "default-set"}>
          
          {/* OSO NIÑO - Esquina Superior Izquierda (Real) */}
          <FloatingImg
            as={motion.img}
            src="/osito_azul.png"
            custom={{ xDir: 1, yDir: 1, r: 12, d: 26, delay: 0 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "10%", left: "10%", width: "130px" }}
          />

          {/* OSO NIÑA - Esquina Inferior Derecha (Real) */}
          <FloatingImg
            as={motion.img}
            src="/osito_rosa.png"
            custom={{ xDir: -1, yDir: -1, r: -12, d: 29, delay: 2 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "10%", right: "10%", width: "130px" }}
          />

          {/* --- NUBES GIGANTES Y DE DISTINTOS TAMAÑOS --- */}
          
          {/* Nube Máxima - Arriba Derecha */}
          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: 0.3, yDir: 0.2, r: 0, d: 45 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "15%", right: "10%", width: "500px", opacity: 0.55 }}
          />

          {/* Nube Grande - Abajo Izquierda */}
          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: -0.3, yDir: -0.2, r: 0, d: 55 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "20%", left: "8%", width: "450px", opacity: 0.45 }}
          />

          {/* Nube Mediana - Centro Derecha */}
          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: -0.2, yDir: 0.3, r: 0, d: 60, delay: 5 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "45%", right: "-5%", width: "350px", opacity: 0.35 }}
          />

          {/* --- ESTRELLAS GRANDES Y VISIBLES --- */}
          
          {/* Estrella Máxima - Centro Izquierda */}
          <FloatingImg
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={{ xDir: 0.8, yDir: -0.8, r: 25, d: 18 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "55%", left: "15%", width: "110px" }}
          />

          {/* Estrella Grande - Arriba Centro */}
          <FloatingImg
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={{ xDir: -0.6, yDir: 0.9, r: -20, d: 21, delay: 3 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "35%", right: "25%", width: "95px" }}
          />

          {/* Estrella Mediana - Abajo Centro */}
          <FloatingImg
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={{ xDir: 1, yDir: 0.5, r: 15, d: 24, delay: 6 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "35%", left: "40%", width: "80px" }}
          />

        </FloatingElementsContainer>
      </AnimatePresence>
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
  background-color: transparent;
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
  filter: drop-shadow(0 12px 25px rgba(0,0,0,0.07));
`;

export default AnimatedBackground;



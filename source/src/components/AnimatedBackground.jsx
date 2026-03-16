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
      number: { value: isVoteSubmitted ? 60 : 25, density: { enable: true, area: 800 } },
      move: { enable: true, speed: 0.8 },
      opacity: { value: 0.3 }
    },
    background: { color: "transparent" }
  }), [isVoteSubmitted, selectedGender]);

  const chaoticVariants = {
    animate: (custom) => ({
      x: ["0%", `${custom.xDir * 70}%`, `${-custom.xDir * 30}%`, "0%"],
      y: ["0%", `${custom.yDir * 70}%`, `${-custom.yDir * 30}%`, "0%"],
      rotate: [0, custom.r, -custom.r, 0],
      scale: [1, 1.1, 0.9, 1], // Efecto de profundidad
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

      {/* La key dinámica ayuda a resetear el componente y eliminar duplicados */}
      <AnimatePresence mode="wait">
        <FloatingElementsContainer key={selectedGender ? "gender-set" : "default-set"}>
          
          {/* OSO NIÑO - Esquina Superior Izquierda */}
          {/* (Asumiendo que el fantasma de niña está en la Inferior Izquierda y el de niño en la Superior Derecha) */}
          <FloatingImg
            as={motion.img}
            src="/osito_azul.png"
            custom={{ xDir: 1, yDir: 1, r: 15, d: 25, delay: 0 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "8%", left: "8%", width: "140px" }}
          />

          {/* OSO NIÑA - Esquina Inferior Derecha */}
          <FloatingImg
            as={motion.img}
            src="/osito_rosa.png"
            custom={{ xDir: -1, yDir: -1, r: -15, d: 28, delay: 2 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "8%", right: "8%", width: "140px" }}
          />

          {/* NUBES MÁS GRANDES Y VISIBLES */}
          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: 0.4, yDir: 0.3, r: 0, d: 40 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "20%", right: "15%", width: "250px", opacity: 0.6 }}
          />

          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: -0.4, yDir: -0.3, r: 0, d: 50 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "25%", left: "10%", width: "280px", opacity: 0.5 }}
          />

          {/* ESTRELLAS MÁS GRANDES */}
          <FloatingImg
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={{ xDir: 1, yDir: -1, r: 20, d: 15 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "50%", left: "15%", width: "60px" }}
          />

          <FloatingImg
            as={motion.img}
            src="/estrella_grande_1.png"
            custom={{ xDir: -1, yDir: 1, r: -20, d: 18 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "40%", right: "20%", width: "75px" }}
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
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.08));
`;

export default AnimatedBackground;


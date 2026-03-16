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

  // ANIMACIÓN QUE RECORRE TODA LA PANTALLA
  const chaoticVariants = {
    animate: (custom) => ({
      x: [
        "0vw",
        `${custom.x}vw`,
        `${-custom.x}vw`,
        `${custom.x / 2}vw`,
        "0vw"
      ],
      y: [
        "0vh",
        `${custom.y}vh`,
        `${-custom.y}vh`,
        `${custom.y / 2}vh`,
        "0vh"
      ],
      rotate: [0, custom.r || 0, -(custom.r || 0), 0],
      transition: {
        duration: custom.d || 12,
        repeat: Infinity,
        ease: "linear"
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
          custom={{ y: 40, x: 35, r: -5, d: 18 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "10%", left: "8%", width: "130px" }}
        />

        {/* OSITO AZUL */}
        <FloatingImg
          as={motion.img}
          src="/osito_azul.png"
          custom={{ y: 35, x: 40, r: 6, d: 20 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "15%", right: "5%", width: "120px" }}
        />

        {/* NUBES */}

        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: 25, x: 50, d: 35 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "8%", left: "5%", width: "160px", opacity: 0.6 }}
        />

        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: 20, x: 45, d: 40 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "35%", left: "3%", width: "140px", opacity: 0.5 }}
        />

        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: 30, x: 40, d: 45 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "50%", right: "25%", width: "150px", opacity: 0.4 }}
        />

        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: 28, x: 48, d: 38 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "15%", right: "35%", width: "130px", opacity: 0.6 }}
        />

        <FloatingImg
          as={motion.img}
          src="/nube_grande_1.png"
          custom={{ y: 25, x: 42, d: 42 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "5%", right: "35%", width: "145px", opacity: 0.5 }}
        />

        {/* ESTRELLAS */}

        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          custom={{ y: 35, x: 60, d: 18 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "35%", right: "12%", width: "40px" }}
        />

        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          custom={{ y: 40, x: 55, d: 20 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "40%", left: "15%", width: "35px" }}
        />

        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          custom={{ y: 45, x: 50, d: 22 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "65%", left: "40%", width: "45px" }}
        />

        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          custom={{ y: 38, x: 48, d: 21 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ bottom: "60%", right: "40%", width: "38px" }}
        />

        <FloatingImg
          as={motion.img}
          src="/estrella_grande_1.png"
          custom={{ y: 42, x: 52, d: 19 }}
          variants={chaoticVariants}
          animate="animate"
          style={{ top: "20%", left: "50%", width: "42px" }}
        />

      </FloatingElementsContainer>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
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
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
`;

export default AnimatedBackground;
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

  const chaoticVariants = {
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
        {/* --- 10 ELEMENTOS PARA EL CAOS --- */}
        
        {/* Nubes */}
        <FloatingImg as={motion.img} src="/nube_grande_1.png" custom={{ y: -20, x: 20, d: 12 }} variants={chaoticVariants} animate="animate" style={{ top: '5%', left: '2%', width: '150px', opacity: 0.5 }} />
        <FloatingImg as={motion.img} src="/nube_grande_1.png" custom={{ y: 15, x: -25, d: 15 }} variants={chaoticVariants} animate="animate" style={{ top: '60%', right: '5%', width: '130px', opacity: 0.4 }} />

        {/* Ositos Azules */}
        <FloatingImg as={motion.img} src="/osito_azul.png" custom={{ y: -30, x: -15, r: 5, d: 7 }} variants={chaoticVariants} animate="animate" style={{ top: '10%', right: '10%', width: '110px' }} />
        <FloatingImg as={motion.img} src="/osito_azul.png" custom={{ y: 20, x: 30, r: -5, d: 9 }} variants={chaoticVariants} animate="animate" style={{ bottom: '20%', right: '15%', width: '90px' }} />
        <FloatingImg as={motion.img} src="/osito_azul.png" custom={{ y: -15, x: -20, r: 10, d: 11 }} variants={chaoticVariants} animate="animate" style={{ top: '40%', left: '5%', width: '100px' }} />

        {/* Ositos Rosas */}
        <FloatingImg as={motion.img} src="/osito_rosa.png" custom={{ y: 25, x: 15, r: -3, d: 8 }} variants={chaoticVariants} animate="animate" style={{ bottom: '10%', left: '8%', width: '120px' }} />
        <FloatingImg as={motion.img} src="/osito_rosa.png" custom={{ y: -40, x: -10, r: 4, d: 6 }} variants={chaoticVariants} animate="animate" style={{ top: '20%', left: '20%', width: '95px' }} />
        <FloatingImg as={motion.img} src="/osito_rosa.png" custom={{ y: 30, x: -25, r: -8, d: 10 }} variants={chaoticVariants} animate="animate" style={{ top: '50%', right: '25%', width: '105px' }} />

        {/* Estrellas */}
        <FloatingImg as={motion.img} src="/estrella_grande_1.png" custom={{ y: -10, x: 10, d: 5 }} variants={chaoticVariants} animate="animate" style={{ top: '35%', right: '12%', width: '40px' }} />
        <FloatingImg as={motion.img} src="/estrella_grande_1.png" custom={{ y: 15, x: -10, d: 4 }} variants={chaoticVariants} animate="animate" style={{ bottom: '40%', left: '15%', width: '35px' }} />
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

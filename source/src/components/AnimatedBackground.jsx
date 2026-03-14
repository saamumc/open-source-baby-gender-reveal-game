import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AnimatedBackground = () => {
  // Obtenemos los estados de Redux
  const { selectedGender, isVoteSubmitted } = useSelector((state) => state.vote);

  // Inicialización de partículas
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Colores (Estética basada en tonos tierra y neutros)
  const getParticleColor = () => {
    if (isVoteSubmitted) return "#D4AF37"; // Dorado festivo
    if (!selectedGender) return "#C2B280"; // Arena inicial
    return selectedGender === "girl" ? "#E195AB" : "#90ADC6";
  };

  const getBackgroundColor = () => {
    if (isVoteSubmitted) return "#FFFDF0";
    if (!selectedGender) return "#F5F5DC";
    return selectedGender === "girl" ? "#FDF2F5" : "#F0F7FA";
  };

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      color: { value: getParticleColor() },
      number: {
        value: isVoteSubmitted ? 100 : 35,
        density: { enable: true, area: 800 },
      },
      shape: {
        type: isVoteSubmitted ? ["circle", "star"] : "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: isVoteSubmitted ? { min: 2, max: 4 } : { min: 1, max: 3 },
        random: true,
      },
      move: {
        enable: true,
        speed: isVoteSubmitted ? 4 : 1.2,
        direction: isVoteSubmitted ? "top" : "none",
        outModes: { default: "out" },
      },
      links: {
        enable: !isVoteSubmitted,
        distance: 150,
        color: getParticleColor(),
        opacity: 0.2,
        width: 1,
      },
    },
    background: {
      color: getBackgroundColor(),
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { size: 6, distance: 200, duration: 2, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesContainer $isSubmitted={isVoteSubmitted}>
      <Particles 
        id="tsparticles" // ID único obligatorio para evitar bugs de duplicación
        init={particlesInit} 
        options={options} 
      />
    </ParticlesContainer>
  );
};

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Aseguramos que siempre esté detrás de las cards */
  transition: all 0.8s ease-in-out;
  
  animation: ${(props) =>
    props.$isSubmitted ? "celebrate 3s ease-in-out infinite" : "none"};

  @keyframes celebrate {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.03); }
    100% { filter: brightness(1); }
  }
`;

export default AnimatedBackground;

import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AnimatedBackground = () => {
  const { selectedGender, isVoteSubmitted } = useSelector(
    (state) => state.vote
  );
  const { theme } = useSelector((state) => state.ui);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Lógica de colores para las partículas (tonos tierra y neutros)
  const getParticleColor = () => {
    if (isVoteSubmitted) return "#D4AF37"; // Dorado para la celebración
    if (!selectedGender) return "#C2B280"; // Arena/Beige oscuro para el estado inicial
    return selectedGender === "girl" ? "#E195AB" : "#90ADC6"; // Rosa/Azul sutiles
  };

  // Lógica para el fondo (Beige cálido)
  const getBackgroundColor = () => {
    if (isVoteSubmitted) return "#FFFDF0"; // Crema muy claro al ganar
    if (!selectedGender) return "#F5F5DC"; // Beige clásico (como en la foto)
    return selectedGender === "girl" ? "#FDF2F5" : "#F0F7FA"; // Tintes suaves al seleccionar
  };

  const getParticleConfig = () => ({
    particles: {
      color: {
        value: getParticleColor(),
      },
      number: {
        value: isVoteSubmitted ? 120 : 40, // Más partículas al celebrar
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: isVoteSubmitted ? ["circle", "star"] : "circle",
      },
      opacity: {
        value: 0.4,
        random: true,
      },
      size: {
        value: isVoteSubmitted ? { min: 2, max: 5 } : { min: 1, max: 3 },
        random: true,
      },
      move: {
        enable: true,
        speed: isVoteSubmitted ? 5 : 1.5, // Más rápido al enviar el voto
        direction: isVoteSubmitted ? "top" : "none",
        random: true,
        straight: false,
        outModes: "out",
      },
      links: {
        enable: !isVoteSubmitted, // Desactivar líneas en la celebración para que parezca confeti
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
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          size: 6,
          distance: 200,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
  });

  return (
    <ParticlesContainer $isSubmitted={isVoteSubmitted}>
      <Particles init={particlesInit} options={getParticleConfig()} />
    </ParticlesContainer>
  );
};

// Estilos del contenedor
const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: background-color 0.8s ease-in-out;
  
  /* Animación sutil de brillo si ya se envió el voto */
  animation: ${(props) =>
    props.$isSubmitted ? "celebrate 2s ease-in-out infinite" : "none"};

  @keyframes celebrate {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.05); }
    100% { filter: brightness(1); }
  }

  /* Para asegurar que los canvas de tsparticles ocupen todo el espacio */
  & > div {
    height: 100%;
    width: 100%;
  }
`;

export default AnimatedBackground;

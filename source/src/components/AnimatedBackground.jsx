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
      number: { value: isVoteSubmitted ? 80 : 25, density: { enable: true, area: 800 } },
      move: { enable: true, speed: 0.8 },
      opacity: { value: 0.3 }
    },
    background: { color: "transparent" }
  }), [isVoteSubmitted, selectedGender]);

  const chaoticVariants = {
    animate: (custom) => ({
      x: ["0%", `${custom.xDir * custom.range}%`, `${-custom.xDir * (custom.range * 0.5)}%`, "0%"],
      y: ["0%", `${custom.yDir * custom.range}%`, `${-custom.yDir * (custom.range * 0.5)}%`, "0%"],
      rotate: [0, custom.r, -custom.r, 0],
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

      <AnimatePresence>
        <FloatingElementsContainer key="bg-elements">
          
          {/* ESQUINA SUPERIOR IZQUIERDA - OSO ROSA 1 */}
          <FloatingImg
            as={motion.img}
            src="/osito_rosa.png"
            custom={{ xDir: 1, yDir: 1, range: 60, r: 15, d: 28, delay: 0 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "5%", left: "5%", width: "120px" }}
          />

          {/* ESQUINA SUPERIOR DERECHA - OSO AZUL 1 */}
          <FloatingImg
            as={motion.img}
            src="/osito_azul.png"
            custom={{ xDir: -1, yDir: 1, range: 70, r: -15, d: 32, delay: 2 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "5%", right: "5%", width: "120px" }}
          />

          {/* ESQUINA INFERIOR IZQUIERDA - OSO AZUL 2 */}
          <FloatingImg
            as={motion.img}
            src="/osito_azul.png"
            custom={{ xDir: 1, yDir: -1, range: 65, r: 10, d: 30, delay: 5 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "5%", left: "5%", width: "110px", opacity: 0.9 }}
          />

          {/* ESQUINA INFERIOR DERECHA - OSO ROSA 2 */}
          <FloatingImg
            as={motion.img}
            src="/osito_rosa.png"
            custom={{ xDir: -1, yDir: -1, range: 75, r: -10, d: 26, delay: 3 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "5%", right: "5%", width: "110px", opacity: 0.9 }}
          />

          {/* NUBES AMBIENTALES (CENTRALES) */}
          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: 0.5, yDir: 0.2, range: 30, r: 0, d: 45 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ top: "40%", left: "30%", width: "200px", opacity: 0.3 }}
          />

          <FloatingImg
            as={motion.img}
            src="/nube_grande_1.png"
            custom={{ xDir: -0.5, yDir: -0.3, range: 40, r: 0, d: 50 }}
            variants={chaoticVariants}
            animate="animate"
            style={{ bottom: "30%", right: "20%", width: "180px", opacity: 0.2 }}
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
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.06));
`;

export default AnimatedBackground;

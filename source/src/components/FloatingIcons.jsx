import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const FloatingIcons = () => {
  const { selectedGender, isVoteSubmitted } = useSelector((state) => state.vote);

  // Lista de tus archivos reales en la carpeta public
  const assets = [
    { src: "/osito_azul.png", size: 120, top: "10%", left: "75%" },
    { src: "/osito_rosa.png", size: 130, top: "65%", left: "5%" },
    { src: "/nube_grande_1.png", size: 170, top: "5%", left: "10%", opacity: 0.6 },
    { src: "/estrella_grande_1.png", size: 45, top: "40%", left: "80%" },
  ];

  return (
    <Container>
      {assets.map((asset, index) => (
        <FloatingAsset
          key={index}
          as={motion.img}
          src={asset.src}
          style={{ 
            top: asset.top, 
            left: asset.left, 
            width: `${asset.size}px`,
            opacity: asset.opacity || 1 
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, index % 2 === 0 ? 5 : -5, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0; /* Lo bajamos para que no tape los botones */
`;

const FloatingAsset = styled.img`
  position: absolute;
  user-select: none;
  /* Eliminamos el color fijo para que se vea la imagen original */
`;

export default FloatingIcons;

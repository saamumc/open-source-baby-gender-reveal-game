import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBabyCarriage, FaCheckCircle, FaCloudShowersHeavy } from "react-icons/fa";

const WhatToBring = () => {
  const navigate = useNavigate();

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentCard>
        <BackButton onClick={() => navigate("/")}>
          <FaArrowLeft /> Volver
        </BackButton>

        <Title>Sugerencia de Regalo</Title>
        <HighlightText>
          <FaCloudShowersHeavy /> ¡Ayúdanos a preparar su llegada con una dulce "Lluvia de Pañales"!
        </HighlightText>

        <Section>
          <p>
            Para nosotros lo más importante es el bienestar del bebé. Por eso, 
            si deseas tener un detalle, te agradecemos de corazón tener en cuenta la línea 
            <strong> Huggies Dermacare</strong>. Está diseñada especialmente para proteger su piel desde el primer día.
          </p>
        </Section>

        <Grid>
          <GiftCard color="#d78398" bg="rgba(245, 193, 208, 0.4)">
            <IconHeader color="#b05c74">
              <FaBabyCarriage size={24} />
              <h3>Si crees que es NIÑA</h3>
            </IconHeader>
            <ul>
              <li><FaCheckCircle color="#b05c74" /> Pañitos Huggies Dermacare</li>
            </ul>
          </GiftCard>

          <GiftCard color="#83b8d7" bg="rgba(193, 227, 245, 0.4)">
            <IconHeader color="#4a84a6">
              <FaBabyCarriage size={24} />
              <h3>Si crees que es NIÑO</h3>
            </IconHeader>
            <ul>
              <li><FaCheckCircle color="#4a84a6" /> Pañales Huggies Dermacare</li>
            </ul>
          </GiftCard>
        </Grid>

        <Note>
          * Esta línea asegura que la piel del recién nacido se mantenga protegida y sin irritaciones. ¡Gracias por tu cariño!
        </Note>
      </ContentCard>
    </Container>
  );
};

// --- ESTILOS CON DIFUMINADO ACUARELA (MENOS TRANSPARENTE) ---

const Container = styled(motion.div)`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  padding: 2rem 1.5rem; 
  
  /* EFECTO ACUARELA MÁS PRESENTE */
  background-color: #ffffff;
  background-image: 
    radial-gradient(circle at 5% 10%, rgba(193, 227, 245, 0.7) 0%, transparent 40%),
    radial-gradient(circle at 95% 90%, rgba(245, 193, 208, 0.7) 0%, transparent 40%);
  
  position: relative;
  overflow: hidden;
`;

const ContentCard = styled.div`
  /* Menos transparente (60%) para que los colores acuarela resalten la tarjeta */
  background: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px);
  
  border-radius: 40px; 
  padding: 3rem 2rem; 
  width: 100%; 
  max-width: 500px; 
  color: #5d4637; 
  text-align: center; 
  
  border: 1px solid rgba(255, 255, 255, 0.8); 
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.5); 
  color: #8c6a53; 
  border: 1px solid rgba(140, 106, 83, 0.2); 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  cursor: pointer; 
  margin-bottom: 2rem; 
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s;
  &:hover { 
    background: white;
    transform: translateX(-3px); 
  }
`;

const Title = styled.h1` 
  color: #7a6352; 
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  margin-bottom: 1rem;
`;

const HighlightText = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 1.2rem;
  border-radius: 20px;
  color: #8c6a53;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed rgba(140, 106, 83, 0.3);
`;

const Section = styled.div`
  color: #6d5849; 
  line-height: 1.7; 
  font-size: 1rem; 
  margin-bottom: 2rem; 
  text-align: center;
  padding: 0 10px;

  strong { color: #5d4637; font-weight: 700; }
`;

const Grid = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
`;

const GiftCard = styled.div`
  /* Colores de fondo basados en el género con transparencia suave */
  background: ${props => props.bg}; 
  border: 1px solid rgba(255, 255, 255, 0.5); 
  border-radius: 25px; 
  padding: 1.5rem; 
  text-align: left;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  ul { list-style: none; padding: 0; margin: 0; }
  li { 
    color: #5d4637; 
    font-size: 1.05rem; 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    font-weight: 600;
  }
`;

const IconHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: ${props => props.color};
  h3 { 
    margin: 0; 
    font-size: 1.2rem; 
    font-family: 'Georgia', serif;
  }
`;

const Note = styled.p` 
  color: #a68974; 
  font-size: 0.85rem; 
  margin-top: 2.5rem; 
  font-style: italic; 
  line-height: 1.4;
`;

export default WhatToBring;

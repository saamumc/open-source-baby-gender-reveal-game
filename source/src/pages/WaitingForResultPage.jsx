import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBabyCarriage, FaCheckCircle } from "react-icons/fa";

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
          <FaArrowLeft /> Volver al Inicio
        </BackButton>

        <Title>¿Qué traer?</Title>
        <Subtitle>Tu detalle es muy especial para nosotros</Subtitle>

        <Section>
          <p>
            Para nosotros lo más importante es el bienestar del bebé. Por eso, 
            si deseas traer un detalle, te agradecemos tener en cuenta que hemos 
            elegido la línea <strong>Huggies Dermacare</strong>, ya que está 
            diseñada para que el bebé no tenga ningún problema en su piel.
          </p>
        </Section>

        <Grid>
          <GiftCard color="#C08081">
            <IconHeader color="#C08081">
              <FaBabyCarriage size={24} />
              <h3>Si crees que es NIÑA</h3>
            </IconHeader>
            <ul>
              <li><FaCheckCircle color="#C08081" /> Pañitos Huggies Dermacare</li>
            </ul>
          </GiftCard>

          <GiftCard color="#4682B4">
            <IconHeader color="#4682B4">
              <FaBabyCarriage size={24} />
              <h3>Si crees que es NIÑO</h3>
            </IconHeader>
            <ul>
              <li><FaCheckCircle color="#4682B4" /> Pañales Huggies Dermacare</li>
            </ul>
          </GiftCard>
        </Grid>

        <Note>
          * El uso de esta línea específica asegura que la piel del recién nacido 
          se mantenga protegida y sin irritaciones.
        </Note>
      </ContentCard>
    </Container>
  );
};

// --- ESTILOS (Sincronizados con HomePage) ---

const Container = styled(motion.div)`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  padding: 2rem 1rem; 
  background: #f2e8df; /* Mismo fondo que HomePage */
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.7); 
  backdrop-filter: blur(10px); 
  border-radius: 30px; 
  padding: 2.5rem; 
  width: 100%; 
  max-width: 500px; 
  color: #8c6a53; 
  text-align: center; 
  border: 1px solid #d9c7b8; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const BackButton = styled.button`
  background: transparent; 
  color: #a68974; 
  border: none; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  cursor: pointer; 
  margin-bottom: 1.5rem; 
  font-size: 0.95rem;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const Title = styled.h1` 
  color: #8c6a53; 
  font-family: 'Georgia', serif; 
  font-size: 2.4rem; 
  margin-bottom: 0.5rem; 
`;

const Subtitle = styled.p` 
  color: #a68974; 
  margin-bottom: 2rem; 
  font-weight: 500;
`;

const Section = styled.div`
  background: white; 
  padding: 1.5rem; 
  border-radius: 20px; 
  color: #a68974; 
  line-height: 1.5; 
  font-size: 0.95rem; 
  margin-bottom: 2rem; 
  border: 1px solid #d9c7b8;
  text-align: left;
  strong { color: #8c6a53; }
`;

const Grid = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
`;

const GiftCard = styled.div`
  background: white; 
  border: 1px solid #d9c7b8; 
  border-radius: 20px; 
  padding: 1.5rem; 
  text-align: left;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  
  ul { list-style: none; padding: 0; margin: 0; }
  li { 
    color: #8c6a53; 
    font-size: 0.95rem; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    font-weight: 500;
  }
`;

const IconHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: ${props => props.color};
  h3 { margin: 0; font-size: 1.1rem; font-family: 'Georgia', serif; }
`;

const Note = styled.p` 
  color: #a68974; 
  font-size: 0.85rem; 
  margin-top: 2rem; 
  font-style: italic; 
  line-height: 1.4;
`;

export default WhatToBring;

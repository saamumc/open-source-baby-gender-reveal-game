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

// --- ESTILOS ULTRA TRANSPARENTES (Sincronizados con HomePage) ---

const Container = styled(motion.div)`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  padding: 2rem 1rem; 
  /* Fondo muy ligero para que resalte el AnimatedBackground */
  background: rgba(242, 232, 223, 0.25); 
  position: relative;
  overflow: hidden;
`;

const ContentCard = styled.div`
  /* Transparencia extrema (4%) */
  background: rgba(255, 255, 255, 0.04); 
  
  /* El desenfoque es clave para la legibilidad */
  backdrop-filter: blur(6px); 
  -webkit-backdrop-filter: blur(6px);
  
  border-radius: 30px; 
  padding: 2.5rem; 
  width: 100%; 
  max-width: 500px; 
  color: #5d4637; /* Color un poco más oscuro para que resalte */
  text-align: center; 
  
  /* Bordes casi invisibles */
  border: 1px solid rgba(255, 255, 255, 0.15); 
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  z-index: 10;
`;

const BackButton = styled.button`
  background: transparent; 
  color: #8c6a53; 
  border: none; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  cursor: pointer; 
  margin-bottom: 1.5rem; 
  font-size: 0.95rem;
  font-weight: 700; /* Más grueso para leerlo mejor sobre transparencia */
  transition: transform 0.2s;
  &:hover { transform: translateX(-3px); }
`;

const Title = styled.h1` 
  color: #8c6a53; 
  font-family: 'Georgia', serif; 
  font-size: 2.4rem; 
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;

const Subtitle = styled.p` 
  color: #a68974; 
  margin-bottom: 2rem; 
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
`;

const Section = styled.div`
  /* Fondo interno muy suave */
  background: rgba(255, 255, 255, 0.2); 
  padding: 1.5rem; 
  border-radius: 20px; 
  color: #4a382b; 
  line-height: 1.5; 
  font-size: 1rem; 
  margin-bottom: 2rem; 
  border: 1px solid rgba(217, 199, 184, 0.3);
  text-align: left;
  font-weight: 500;
  strong { color: #5d4637; }
`;

const Grid = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
`;

const GiftCard = styled.div`
  /* Tarjetas individuales también transparentes */
  background: rgba(255, 255, 255, 0.35); 
  border: 1px solid rgba(217, 199, 184, 0.4); 
  border-radius: 20px; 
  padding: 1.5rem; 
  text-align: left;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  
  ul { list-style: none; padding: 0; margin: 0; }
  li { 
    color: #4a382b; 
    font-size: 1rem; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
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
    font-size: 1.15rem; 
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
  }
`;

const Note = styled.p` 
  color: #5d4637; 
  font-size: 0.9rem; 
  margin-top: 2rem; 
  font-style: italic; 
  line-height: 1.4;
  font-weight: 500;
`;

export default WhatToBring;

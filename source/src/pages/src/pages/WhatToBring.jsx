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
          <FaArrowLeft /> Volver
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
            <FaBabyCarriage size={30} />
            <h3>Si crees que es NIÑA</h3>
            <ul>
              <li><FaCheckCircle /> Pañales Huggies Dermacare</li>
              <li><FaCheckCircle /> Pañitos Huggies Dermacare</li>
            </ul>
          </GiftCard>

          <GiftCard color="#4682B4">
            <FaBabyCarriage size={30} />
            <h3>Si crees que es NIÑO</h3>
            <ul>
              <li><FaCheckCircle /> Pañales Huggies Dermacare</li>
              <li><FaCheckCircle /> Pañitos Huggies Dermacare</li>
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

// --- ESTILOS ---
const Container = styled(motion.div)`
  display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem 1rem; background: #0f0f0f;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 30px; padding: 2rem; width: 100%; max-width: 500px; text-align: center;
`;

const BackButton = styled.button`
  background: transparent; color: #888; border: none; display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 1rem; font-size: 0.9rem;
`;

const Title = styled.h1` color: white; font-family: serif; font-size: 2.2rem; margin-bottom: 0.5rem; `;
const Subtitle = styled.p` color: #aaa; margin-bottom: 2rem; `;

const Section = styled.div`
  background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 20px; color: #ccc; line-height: 1.6; font-size: 0.95rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.05);
  strong { color: white; }
`;

const Grid = styled.div` display: flex; flex-direction: column; gap: 15px; `;

const GiftCard = styled.div`
  background: ${props => props.color}22; border: 1px solid ${props => props.color}55; border-radius: 20px; padding: 1.5rem; text-align: left;
  h3 { color: ${props => props.color}; margin: 10px 0; font-size: 1.1rem; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { color: white; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
`;

const Note = styled.p` color: #666; font-size: 0.8rem; margin-top: 1.5rem; font-style: italic; `;

export default WhatToBring;

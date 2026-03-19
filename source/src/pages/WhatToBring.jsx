import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBabyCarriage, FaCloudShowersHeavy, FaCheck, FaSearch } from "react-icons/fa";

const WhatToBring = () => {
  const navigate = useNavigate();

  // ENLACE DE BÚSQUEDA PROPORCIONADO
  const searchUrl = "https://www.google.com/search?q=pa%C3%B1ales+dermacare&ie=UTF-8&oe=UTF-8&hl=en-us&client=safari";

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentCard>
        <HeaderRow>
          <BackButton onClick={() => navigate("/")}>
            <FaArrowLeft /> Volver
          </BackButton>
        </HeaderRow>

        <Title>Sugerencia de Regalo</Title>
        
        <MainIconWrapper>
           <FaCloudShowersHeavy size={40} color="#a68974" />
        </MainIconWrapper>

        <HighlightText>
          ¡Ayúdanos a preparar su llegada con una dulce "Lluvia de Pañales"!
        </HighlightText>

        <GiftBox>
          <GiftTitle>
            <FaBabyCarriage /> Nuestra sugerencia:
          </GiftTitle>
          <ItemName>
            <FaCheck color="#25d366" /> Pañales Huggies Dermacare
          </ItemName>
          <StagesInfo>Etapas: 1, 2, 3 o 4</StagesInfo>
          
          <SearchButton 
            href={searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaSearch size={14} />
            Ver opciones y ejemplos
          </SearchButton>
        </GiftBox>

        <AclaracionSection>
          <p>
            <strong>Nota importante:</strong> Hemos elegido esta línea para proteger la delicada piel del bebé. 
            <br/><br/>
            Si deseas apoyarnos con un paquete, <strong>te agradecemos considerar diferentes etapas (1, 2, 3 o 4)</strong>. Esto nos ayudará a estar prevenidos para su crecimiento y asegurar que tenga pañales adecuados en cada fase. ✨
          </p>
        </AclaracionSection>

      </ContentCard>
    </Container>
  );
};

// --- ESTILOS ---

const Container = styled(motion.div)`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  padding: 2.5rem 1.5rem; 
  background-color: #ffffff;
  background-image: 
    radial-gradient(circle at 10% 10%, rgba(193, 227, 245, 0.8) 0%, transparent 45%),
    radial-gradient(circle at 90% 90%, rgba(245, 193, 208, 0.8) 0%, transparent 45%);
  position: relative;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.7); 
  backdrop-filter: blur(12px); 
  -webkit-backdrop-filter: blur(12px);
  border-radius: 40px; 
  padding: 3.5rem 2rem; 
  width: 100%; 
  max-width: 450px; 
  text-align: center; 
  border: 1px solid rgba(255, 255, 255, 0.9); 
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const BackButton = styled.button`
  background: white; 
  color: #8c6a53; 
  border: 1px solid rgba(140, 106, 83, 0.1); 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  cursor: pointer; 
  margin-bottom: 2rem; 
  padding: 8px 18px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s;
  &:hover { transform: translateX(-3px); background: #fafafa; }
`;

const Title = styled.h1` 
  color: #7a6352; 
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const MainIconWrapper = styled.div`
  margin: 1rem 0;
  opacity: 0.8;
`;

const HighlightText = styled.p`
  color: #8c6a53;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const GiftBox = styled.div`
  background: linear-gradient(135deg, rgba(193, 227, 245, 0.3) 0%, rgba(245, 193, 208, 0.3) 100%);
  border: 1px solid white;
  padding: 2rem 1.5rem;
  border-radius: 30px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GiftTitle = styled.div`
  color: #5d4637;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
`;

const ItemName = styled.h2`
  color: #4a84a6; 
  font-size: 1.25rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
`;

const StagesInfo = styled.p`
  color: #5d4637;
  font-size: 0.95rem;
  margin-top: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  opacity: 0.8;
`;

const SearchButton = styled(motion.a)`
  background: rgba(255, 255, 255, 0.5);
  color: #5d4637;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  transition: background 0.3s;
  &:hover { background: rgba(255, 255, 255, 0.8); }
`;

const AclaracionSection = styled.div`
  background: rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px dashed rgba(140, 106, 83, 0.2);
  
  p {
    color: #6d5849;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    text-align: left;
  }

  strong { color: #5d4637; }
`;

export default WhatToBring;



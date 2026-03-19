import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBabyCarriage, FaCloudShowersHeavy, FaCheck, FaSearch, FaInfoCircle } from "react-icons/fa";

const rainAnimation = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(5px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
`;

const WhatToBring = () => {
  const navigate = useNavigate();

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
           <FaCloudShowersHeavy size={45} color="#a68974" />
        </MainIconWrapper>

        <HighlightText>
          ¡Ayúdanos a preparar su llegada con una dulce "Lluvia de Pañales"!
        </HighlightText>

        <GiftBox
          initial={{ scale: 0.98 }}
          animate={{ scale: [0.98, 1, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <GiftTitle>
            <FaBabyCarriage /> Nuestra sugerencia:
          </GiftTitle>
          <ItemName>
            <FaCheck color="#25d366" /> Pañales Huggies Dermacare
          </ItemName>
          
          <StageBadgeContainer>
            <StageBadge>Etapa 1</StageBadge>
            <StageBadge>Etapa 2</StageBadge>
            <StageBadge>Etapa 3</StageBadge>
            <StageBadge>Etapa 4</StageBadge>
          </StageBadgeContainer>
          
          <SearchButton 
            href={searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch size={14} />
            Ver opciones y ejemplos
          </SearchButton>
        </GiftBox>

        <AclaracionSection>
          <NoteHeader>
            <FaInfoCircle /> Nota importante
          </NoteHeader>
          <p>
            Hemos elegido esta línea para proteger la delicada piel del bebé. 
            <br/><br/>
            Si deseas apoyarnos, <strong>te agradecemos considerar diferentes etapas</strong>. Esto nos ayudará a estar prevenidos para su crecimiento y asegurar que tenga pañales adecuados en cada fase. ✨
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
    radial-gradient(circle at 10% 10%, rgba(193, 227, 245, 0.6) 0%, transparent 45%),
    radial-gradient(circle at 90% 90%, rgba(245, 193, 208, 0.6) 0%, transparent 45%);
  position: relative;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(15px); 
  -webkit-backdrop-filter: blur(15px);
  border-radius: 40px; 
  padding: 3rem 2rem; 
  width: 100%; 
  max-width: 450px; 
  text-align: center; 
  border: 1px solid rgba(255, 255, 255, 0.8); 
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
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.3s;
  &:hover { background: #fafafa; transform: translateX(-3px); }
`;

const Title = styled.h1` 
  color: #5d4a3e; 
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const MainIconWrapper = styled.div`
  margin: 1rem 0;
  animation: ${rainAnimation} 3s ease-in-out infinite;
`;

const HighlightText = styled.p`
  color: #8c6a53;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const GiftBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%);
  border: 2px solid white;
  padding: 2rem 1.5rem;
  border-radius: 30px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.03);
`;

const GiftTitle = styled.div`
  color: #8c6a53;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 800;
`;

const ItemName = styled.h2`
  color: #4a84a6; 
  font-size: 1.3rem;
  margin: 0 0 1.2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 800;
`;

const StageBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const StageBadge = styled.span`
  background: rgba(140, 106, 83, 0.1);
  color: #8c6a53;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(140, 106, 83, 0.05);
`;

const SearchButton = styled(motion.a)`
  background: #8c6a53;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(140, 106, 83, 0.2);
`;

const AclaracionSection = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 1.5rem;
  border-radius: 25px;
  border: 1px dashed rgba(140, 106, 83, 0.2);
  
  p {
    color: #6d5849;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
    text-align: left;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5d4a3e;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export default WhatToBring;



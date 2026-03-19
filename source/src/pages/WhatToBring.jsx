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
           <FaCloudShowersHeavy size={40} color="#a68974" />
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
            <FaCheck color="#25d366" /> Huggies Dermacare
          </ItemName>
          
          <StageBadgeContainer>
            <StageBadge>E1</StageBadge>
            <StageBadge>E2</StageBadge>
            <StageBadge>E3</StageBadge>
            <StageBadge>E4</StageBadge>
          </StageBadgeContainer>
          
          <SearchButton 
            href={searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch size={12} />
            Ver opciones
          </SearchButton>
        </GiftBox>

        <AclaracionSection>
          <NoteHeader>
            <FaInfoCircle /> Nota importante
          </NoteHeader>
          <p>
            Elegimos esta línea para proteger su piel. 
            Si deseas apoyarnos, <strong>agradecemos considerar diferentes etapas</strong>. ✨
          </p>
        </AclaracionSection>

      </ContentCard>
    </Container>
  );
};

// --- ESTILOS COMPACTOS ---

const Container = styled(motion.div)`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  padding: 1rem; 
  background: transparent;
  position: relative;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.01); /* Casi invisible */
  backdrop-filter: blur(5px); 
  -webkit-backdrop-filter: blur(5px);
  border-radius: 40px; 
  padding: 2rem 1.5rem; 
  width: 92%; 
  max-width: 380px; /* Tamaño reducido igual que la HomePage */
  text-align: center; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2); 
  color: #8c6a53; 
  border: 1px solid rgba(140, 106, 83, 0.1); 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  cursor: pointer; 
  margin-bottom: 1.5rem; 
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s;
  &:hover { background: white; }
`;

const Title = styled.h1` 
  color: #5d4a3e; 
  font-family: 'Georgia', serif; 
  font-size: 1.8rem; 
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const MainIconWrapper = styled.div`
  margin: 0.5rem 0;
  animation: ${rainAnimation} 3s ease-in-out infinite;
`;

const HighlightText = styled.p`
  color: #8c6a53;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const GiftBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1.5rem 1rem;
  border-radius: 30px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GiftTitle = styled.div`
  color: #8c6a53;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
`;

const ItemName = styled.h2`
  color: #4a84a6; 
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
`;

const StageBadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 1.2rem;
`;

const StageBadge = styled.span`
  background: white;
  color: #8c6a53;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

const SearchButton = styled(motion.a)`
  background: #8c6a53;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AclaracionSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 20px;
  border: 1px dashed rgba(140, 106, 83, 0.2);
  
  p {
    color: #6d5849;
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #5d4a3e;
  font-weight: 800;
  font-size: 0.75rem;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

export default WhatToBring;


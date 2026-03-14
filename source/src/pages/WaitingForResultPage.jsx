import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
// CORRECCIÓN: Importación desde el archivo correcto
// Agrega "../components/" para que suba un nivel de carpeta y entre a components
import { BabyGirlIcon, BabyBoyIcon } from "../components/GenderOption";

const WaitingForResultPage = () => {
  const { t } = useTranslation();

  return (
    <WaitingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentWrapper>
        <AnimationContainer>
          <IconsContainer>
            <BabyIcon
              animate={{ x: [-30, 10], rotate: [-5, 5] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <BabyBoyIcon />
            </BabyIcon>
            <BabyIcon
              animate={{ x: [10, -30], rotate: [5, -5] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <BabyGirlIcon />
            </BabyIcon>
            
            <HeartContainer>
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  animate={{ scale: [0, 1, 0], y: [-20, -100], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  💝
                </Heart>
              ))}
            </HeartContainer>
          </IconsContainer>
        </AnimationContainer>

        <MessageText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("vote.waitingForVotesToFinish")}
        </MessageText>

        <SubText>{t("vote.votingInProgress")}</SubText>

        <InfiniteProgressBar
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </ContentWrapper>
    </WaitingContainer>
  );
};

// --- ESTILOS ---
const WaitingContainer = styled(motion.div)` padding: 2rem; width: 100%; display: flex; justify-content: center; `;
const ContentWrapper = styled.div` 
  display: flex; flex-direction: column; align-items: center; gap: 2rem; 
  background: rgba(255, 255, 255, 0.8); padding: 3rem; border-radius: 30px; position: relative; overflow: hidden;
`;
const AnimationContainer = styled.div` position: relative; height: 150px; display: flex; align-items: center; `;
const IconsContainer = styled.div` display: flex; gap: 2rem; position: relative; `;
const BabyIcon = styled(motion.div)` width: 80px; height: 80px; `;
const HeartContainer = styled.div` position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; `;
const Heart = styled(motion.div)` position: absolute; font-size: 1.5rem; `;
const MessageText = styled(motion.h2)` 
  font-size: 1.5rem; font-weight: 800; color: #8D775F; margin: 0; text-align: center;
`;
const SubText = styled.p` color: #A69076; margin: 0; font-weight: 600; `;
const InfiniteProgressBar = styled(motion.div)`
  position: absolute; bottom: 0; left: 0; width: 50%; height: 6px;
  background: linear-gradient(90deg, #FFB6C1, #89CFF0);
`;

export default WaitingForResultPage;

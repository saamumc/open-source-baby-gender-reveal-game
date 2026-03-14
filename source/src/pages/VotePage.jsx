import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import GenderOption from "../components/GenderOption";
import VoteConfirmation from "../components/VoteConfirmation";
import { selectGender, submitVote, resetVote } from "../store/voteSlice";
import { useTranslation } from "../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

const VotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);
  const { showVotingScreen } = useSelector((state) => state.results);
  const { t } = useTranslation();

  useEffect(() => {
    if (!showVotingScreen) {
      navigate("/");
    }
  }, [showVotingScreen, navigate]);

  useEffect(() => {
    dispatch(resetVote());
  }, [dispatch]);

  const handleSelect = (gender) => {
    dispatch(selectGender(gender));
  };

  const handleSubmit = () => {
    if (selectedGender) {
      dispatch(submitVote());
    }
  };

  if (!showVotingScreen) return null;
  if (hasVoted) return <VoteConfirmation />;

  return (
    <PageWrapper>
      {/* Elementos decorativos de fondo (opcional, si no los tienes en el layout global) */}
      <FloatingIcons /> 
      
      <GlassCard>
        <TitleSection>
          <MainTitle>Baby Gender Vote</MainTitle>
          <SubTitle>Please select a gender prediction</SubTitle>
        </TitleSection>

        <OptionsContainer>
          <GenderOption
            type="girl"
            selected={selectedGender === "girl"}
            onSelect={() => handleSelect("girl")}
          />
          <GenderOption
            type="boy"
            selected={selectedGender === "boy"}
          onSelect={() => handleSelect("boy")}
          />
        </OptionsContainer>

        <SubmitButton
          disabled={!selectedGender}
          onClick={handleSubmit}
          whileTap={selectedGender ? { scale: 0.95 } : {}}
        >
          {t("votePage.submitButton")}
        </SubmitButton>
      </GlassCard>
    </PageWrapper>
  );
};

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E6D5F7; /* Color lila de fondo */
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 30px;
  padding: 40px 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  box-shadow: 0 8px 32px 0 rgba(142, 106, 181, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TitleSection = styled.div`
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(to right, #e91e63, #9c27b0, #3f51b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.7;
`;

const SubTitle = styled.p`
  background: rgba(255, 255, 255, 0.6);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  display: inline-block;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Apilados verticalmente como en la foto */
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const SubmitButton = styled(motion.button)`
  background: rgba(180, 180, 180, 0.5);
  color: #fff;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 80%;
  transition: all 0.3s ease;
  
  /* Esto emula el texto grisáceo "votePage.submitButton" de la imagen */
  &:disabled {
    opacity: 0.6;
  }
`;

const FloatingIcons = styled.div`
  /* Estilo para los iconos morados que flotan de fondo */
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
  /* Aquí podrías añadir un SVG de fondo o iconos dispersos */
`;

export default VotePage;

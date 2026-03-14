import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";
import GenderOption from "../components/GenderOption";
import VoteConfirmation from "../components/VoteConfirmation";
import { selectGender, submitVote, resetVote } from "../store/voteSlice";
import { useNavigate } from "react-router-dom";

const VotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);
  const { showVotingScreen } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(resetVote());
  }, [dispatch]);

  useEffect(() => {
    if (showVotingScreen === false) {
      navigate("/");
    }
  }, [showVotingScreen, navigate]);

  const playPop = () => {
    const audio = new Audio("/sounds/pop.mp3"); 
    audio.play().catch(() => console.log("Audio interactivo requerido primero"));
  };

  const handleSelect = (gender) => {
    playPop(); 
    dispatch(selectGender(gender));
  };

  const handleSubmit = () => {
    if (selectedGender) {
      const color = selectedGender === "girl" ? "#FFB6C1" : "#89CFF0";
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [color, "#FFFFFF", "#F9F6F1"]
      });
      dispatch(submitVote());
    }
  };

  if (showVotingScreen === false) return null;
  if (hasVoted) return <VoteConfirmation selected={selectedGender} />;

  return (
    <PageWrapper>
      <GlassCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <TitleSection>
          <MainTitle>Valentina & Janppier</MainTitle>
          <SubTitle>¿Qué crees que será el bebé?</SubTitle>
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

        <AnimatePresence>
          {selectedGender && (
            <MessageSection
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <MessageLabel>Déjales un mensaje a los papás:</MessageLabel>
              <StyledTextArea
                placeholder="Ej: ¡Muero por conocerte! Presiento que serás una princesa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </MessageSection>
          )}
        </AnimatePresence>

        <SubmitButton
          disabled={!selectedGender}
          onClick={handleSubmit}
          whileTap={selectedGender ? { scale: 0.98 } : {}}
          $active={!!selectedGender}
        >
          {selectedGender ? "¡Confirmar mi apuesta!" : "Elige una opción"}
        </SubmitButton>
      </GlassCard>
    </PageWrapper>
  );
};

// --- ESTILOS QUE FALTABAN ---

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%);
  padding: 20px;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const TitleSection = styled.div` margin-bottom: 2rem; `;
const MainTitle = styled.h1` color: #4b3f6b; font-size: 1.8rem; margin-bottom: 0.5rem; `;
const SubTitle = styled.p` color: #888; font-size: 1rem; `;
const OptionsContainer = styled.div` display: flex; gap: 20px; justify-content: center; margin-bottom: 2rem; `;
const MessageSection = styled(motion.div)` margin-bottom: 1.5rem; overflow: hidden; `;
const MessageLabel = styled.label` display: block; color: #4b3f6b; margin-bottom: 0.5rem; font-size: 0.9rem; `;
const StyledTextArea = styled.textarea` width: 100%; padding: 12px; border-radius: 15px; border: 1px solid #ddd; resize: none; height: 80px; `;
const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(45deg, #ff9a9e, #fad0c4)' : '#ccc'};
  color: white;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export default VotePage;

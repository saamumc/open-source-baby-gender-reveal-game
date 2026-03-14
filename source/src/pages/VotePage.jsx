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

  // Efecto de sonido
  const playPop = () => {
    const audio = new Audio("/sounds/pop.mp3"); 
    audio.play().catch(e => console.log("Audio play blocked o archivo no encontrado"));
  };

  useEffect(() => {
    if (!showVotingScreen) {
      navigate("/");
    }
    dispatch(resetVote());
  }, [showVotingScreen, navigate, dispatch]);

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

      console.log("Mensaje del invitado:", message);
      dispatch(submitVote());
    }
  };

  if (!showVotingScreen) return null;
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

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F9F6F1;
  padding: 20px;
`;

const GlassCard = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 35px;
  padding: 40px 25px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  box-shadow: 0 15px 35px rgba(141, 119, 95, 0.1);
  border: 1px solid rgba(141, 119, 95, 0.05);
`;

const TitleSection = styled.div`
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8D775F;
  margin-bottom: 5px;
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  color: #A69076;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const MessageSection = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const MessageLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #8D775F;
  margin-bottom: 8px;
  font-weight: 600;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 1.5px solid #EAE2D8;
  border-radius: 12px;
  padding: 12px;
  font-family: inherit;
  resize: none;
  height: 80px;
  background: #FDFBFA;
  color: #5D4D3D;
  &:focus {
    outline: none;
    border-color: #8D775F;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${(props) => (props.$active ? "#8D775F" : "#D1C7BD")};
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 100%;
  transition: background 0.3s ease;
`;

export default VotePage;

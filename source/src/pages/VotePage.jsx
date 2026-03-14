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

  // 1. Reseteo de voto SOLO al cargar la página por primera vez
  useEffect(() => {
    dispatch(resetVote());
  }, [dispatch]);

  // 2. Redirección si la votación se cierra desde Firebase
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

      // Aquí podrías enviar el 'message' a Firebase si lo necesitas
      console.log("Mensaje guardado:", message); 
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

// ... (Tus estilos están perfectos, no hace falta cambiarlos)

export default VotePage;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";
import GenderOption from "../components/GenderOption";
import { selectGender, submitVote, resetVote } from "../store/voteSlice";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground"; 

const VotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [name, setName] = useState(""); 
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);
  const { showVotingScreen } = useSelector((state) => state.results);

  useEffect(() => {
    const alreadyVoted = localStorage.getItem("baby_shower_voted");
    if (alreadyVoted) {
      navigate("/results");
    } else {
      dispatch(resetVote());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (showVotingScreen === false) {
      navigate("/");
    }
  }, [showVotingScreen, navigate]);

  const handleSelect = (gender) => {
    const audio = new Audio("/sounds/pop.mp3");
    audio.play().catch(() => {});
    dispatch(selectGender(gender));
  };

  const handleSubmit = async () => {
    if (selectedGender && name.trim() !== "" && !isProcessing) {
      setIsProcessing(true); 
      
      const color = selectedGender === "girl" ? "#FFB6C1" : "#89CFF0";
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [color, "#FFFFFF", "#F9F6F1"]
      });

      try {
        await dispatch(submitVote({ 
          name: name,
          gender: selectedGender, 
          message: message 
        }));
        localStorage.setItem("baby_shower_voted", "true");
      } catch (error) {
        console.error("Error al votar:", error);
        setIsProcessing(false);
      }
    }
  };

  if (showVotingScreen === false) return null;

  return (
    <PageWrapper>
      <AnimatedBackground />

      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {(hasVoted || localStorage.getItem("baby_shower_voted")) ? (
          <>
            <SuccessIcon>✨</SuccessIcon>
            <MainTitle>¡Voto Registrado!</MainTitle>
            <SubTitle style={{ marginBottom: '30px' }}>
              ¡Gracias por participar! Solo se permite un voto por persona.
            </SubTitle>
            
            <SubmitButton 
              $active={true} 
              onClick={() => navigate("/results")}
            >
              Ver Resultados
            </SubmitButton>
          </>
        ) : (
          <>
            <TitleSection>
              <MainTitle>Tu Apuesta</MainTitle>
              <SubTitle>Valentina & Janppier</SubTitle>
            </TitleSection>

            <InputSection>
              <MessageLabel>Tu Nombre:</MessageLabel>
              <StyledInput
                type="text"
                placeholder="Escribe tu nombre aquí..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputSection>

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
                  <MessageLabel>Mensaje opcional:</MessageLabel>
                  <StyledTextArea
                    placeholder="Ej: ¡Presiento que será una princesa!..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </MessageSection>
              )}
            </AnimatePresence>

            <SubmitButton
              disabled={!selectedGender || !name.trim() || isProcessing}
              onClick={handleSubmit}
              whileTap={selectedGender && name.trim() ? { scale: 0.98 } : {}}
              $active={!!selectedGender && !!name.trim()}
            >
              {isProcessing ? "ENVIANDO..." : (selectedGender && name.trim()) ? "CONFIRMAR APUESTA" : "ESCRIBE TU NOMBRE Y ELIGE"}
            </SubmitButton>
          </>
        )}
      </GlassCard>
    </PageWrapper>
  );
};

// --- ESTILOS 98% TRANSPARENTES (Estilo HomePage) ---

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent; 
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
`;

const GlassCard = styled(motion.div)`
  /* TRANSPARENCIA AL 98% (0.02) */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  padding: 3.5rem 2.5rem;
  border-radius: 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  position: relative;
`;

const TitleSection = styled.div` margin-bottom: 2.5rem; `;

const MainTitle = styled.h1` 
  color: #5d4a3e; 
  font-family: 'Georgia', serif; 
  font-size: 2.4rem; 
  margin: 0;
  font-weight: 400;
`;

const SubTitle = styled.p` 
  color: #7a6352; 
  font-size: 0.9rem; 
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const InputSection = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 20px;
  /* Fondo muy sutil para el input */
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(140, 106, 83, 0.15);
  font-size: 1rem;
  color: #4a3b30;
  font-family: inherit;
  backdrop-filter: blur(5px);
  
  &::placeholder { color: rgba(122, 99, 82, 0.5); }
  &:focus { outline: none; border-color: rgba(140, 106, 83, 0.4); background: rgba(255, 255, 255, 0.4); }
`;

const MessageLabel = styled.label` 
  display: block; 
  color: #5d4a3e; 
  margin-bottom: 0.6rem; 
  font-size: 0.9rem; 
  font-weight: 600; 
  margin-left: 5px;
`;

const OptionsContainer = styled.div` 
  display: flex; 
  gap: 15px; 
  justify-content: center; 
  margin-bottom: 2rem; 
`;

const MessageSection = styled(motion.div)` 
  margin-bottom: 2rem; 
  overflow: hidden; 
  text-align: left; 
`;

const StyledTextArea = styled.textarea` 
  width: 100%; 
  padding: 16px; 
  border-radius: 20px; 
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(140, 106, 83, 0.15);
  color: #4a3b30; 
  resize: none; 
  height: 90px; 
  font-family: inherit;
  backdrop-filter: blur(5px);

  &::placeholder { color: rgba(122, 99, 82, 0.5); }
  &:focus { outline: none; border-color: rgba(140, 106, 83, 0.4); background: rgba(255, 255, 255, 0.4); }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 18px;
  border-radius: 50px;
  border: none;
  /* Botón con opacidad para que no rompa la transparencia extrema */
  background: ${props => props.$active ? 'rgba(122, 99, 82, 0.9)' : 'rgba(122, 99, 82, 0.2)'};
  color: ${props => props.$active ? 'white' : 'rgba(122, 99, 82, 0.5)'};
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  
  &:disabled { cursor: not-allowed; }
  &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
`;

const SuccessIcon = styled.div` font-size: 3.5rem; margin-bottom: 1.5rem; `;

export default VotePage;

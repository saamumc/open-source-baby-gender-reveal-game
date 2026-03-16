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
  
  // ESTADOS LOCALES
  const [name, setName] = useState(""); // Nuevo: Estado para el nombre
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);
  const { showVotingScreen } = useSelector((state) => state.results);

  // Redirección si ya existe la marca en LocalStorage
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
    // Validamos que tenga género seleccionado y nombre escrito
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
        // Enviamos nombre, género y mensaje al backend/store
        await dispatch(submitVote({ 
          name: name, // Se agrega el nombre
          gender: selectedGender, 
          message: message 
        }));
        
        // Bloqueo definitivo en el navegador
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {(hasVoted || localStorage.getItem("baby_shower_voted")) ? (
          <>
            <SuccessIcon>✨</SuccessIcon>
            <MainTitle>¡Voto Registrado!</MainTitle>
            <SubTitle style={{ marginBottom: '20px' }}>
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
              <MainTitle>Valentina & Janppier</MainTitle>
              <SubTitle>¿Qué crees que será el bebé?</SubTitle>
            </TitleSection>

            {/* CAMPO DE NOMBRE */}
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
              {isProcessing ? "Enviando apuesta..." : (selectedGender && name.trim()) ? "¡Confirmar mi apuesta!" : "Escribe tu nombre y elige"}
            </SubmitButton>
          </>
        )}
      </GlassCard>
    </PageWrapper>
  );
};

// --- ESTILOS ---

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent; 
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  text-align: center;
  border: 1px solid rgba(217, 199, 184, 0.5);
  z-index: 1;
`;

const InputSection = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid #d9c7b8;
  font-size: 1rem;
  color: #8c6a53;
  &:focus { outline: none; border-color: #a68974; }
`;

const SuccessIcon = styled.div` font-size: 3.5rem; margin-bottom: 1rem; `;
const TitleSection = styled.div` margin-bottom: 1.5rem; `;
const MainTitle = styled.h1` color: #8c6a53; font-family: 'Georgia', serif; font-size: 2.2rem; margin-bottom: 0.5rem; `;
const SubTitle = styled.p` color: #a68974; font-size: 1.1rem; line-height: 1.4; `;

const OptionsContainer = styled.div` display: flex; gap: 20px; justify-content: center; margin-bottom: 1.5rem; `;
const MessageSection = styled(motion.div)` margin-bottom: 1.5rem; overflow: hidden; text-align: left; `;
const MessageLabel = styled.label` display: block; color: #8c6a53; margin-bottom: 0.5rem; font-size: 0.95rem; font-weight: 600; `;

const StyledTextArea = styled.textarea` 
  width: 100%; padding: 15px; border-radius: 15px; border: 1px solid #d9c7b8; 
  background: white; color: #8c6a53; resize: none; height: 80px; font-family: inherit;
  &:focus { outline: none; border-color: #a68974; }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? '#8c6a53' : '#d9c7b8'};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default VotePage;


import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";
import GenderOption from "../components/GenderOption";
import { selectGender, submitVote, resetVote } from "../store/voteSlice";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground"; 

// --- IMPORTACIONES DE FIREBASE ---
import { db } from "../firebase/config";
import { ref, set, increment, update, get } from "firebase/database";

const VotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isSubmitting = useRef(false);
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
    if (isProcessing) return;
    const audio = new Audio("/sounds/pop.mp3");
    audio.play().catch(() => {});
    dispatch(selectGender(gender));
  };

  const handleSubmit = async () => {
    if (isSubmitting.current || isProcessing || !selectedGender || name.trim() === "") return;

    isSubmitting.current = true;
    setIsProcessing(true); 

    localStorage.setItem("baby_shower_voted", "true");
    
    const deviceUUID = localStorage.getItem("device_uuid") || crypto.randomUUID();
    if (!localStorage.getItem("device_uuid")) {
      localStorage.setItem("device_uuid", deviceUUID);
    }

    try {
      const voteCheckRef = ref(db, `userVotes/${deviceUUID}`);
      const snapshot = await get(voteCheckRef);
      
      if (snapshot.exists()) {
        console.warn("Voto ya existente.");
      } else {
        const color = selectedGender === "girl" ? "#FFB6C1" : "#89CFF0";
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: [color, "#FFFFFF", "#F9F6F1"]
        });

        await set(ref(db, `userVotes/${deviceUUID}`), {
          name: name.trim(),
          gender: selectedGender,
          message: message.trim(),
          timestamp: Date.now(),
          uuid: deviceUUID
        });

        const updates = {};
        updates[`results/voteCounts/${selectedGender}`] = increment(1);
        await update(ref(db), updates);
      }

      dispatch(submitVote({ 
        name: name.trim(),
        gender: selectedGender, 
        message: message.trim() 
      }));
      
      setTimeout(() => navigate("/results"), 2000);

    } catch (error) {
      console.error("Error al votar:", error);
      localStorage.removeItem("baby_shower_voted");
      isSubmitting.current = false;
      setIsProcessing(false);
      alert("Error de conexión. Reintenta.");
    }
  };

  if (showVotingScreen === false) return null;

  return (
    <PageWrapper>
      <AnimatedBackground />

      <GlassCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {(hasVoted || localStorage.getItem("baby_shower_voted")) ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SuccessIcon>✨</SuccessIcon>
            <MainTitle>¡Listo!</MainTitle>
            <SubTitle style={{ marginBottom: '20px' }}>
              Tu apuesta ha sido registrada.
            </SubTitle>
            <SubmitButton 
              $active={true} 
              onClick={() => navigate("/results")}
            >
              Ver Resultados
            </SubmitButton>
          </motion.div>
        ) : (
          <>
            <TitleSection>
              <MainTitle>Tu Apuesta</MainTitle>
              <SubTitle>Valentina & Janppier</SubTitle>
            </TitleSection>

            <InputSection>
              <MessageLabel>Nombre:</MessageLabel>
              <StyledInput
                type="text"
                placeholder="¿Quién eres?..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
              />
            </InputSection>

            <OptionsContainer>
              <GenderOption
                type="girl"
                selected={selectedGender === "girl"}
                onSelect={() => handleSelect("girl")}
                disabled={isProcessing}
              />
              <GenderOption
                type="boy"
                selected={selectedGender === "boy"}
                onSelect={() => handleSelect("boy")}
                disabled={isProcessing}
              />
            </OptionsContainer>

            <AnimatePresence>
              {selectedGender && (
                <MessageSection
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <MessageLabel>Mensaje (opcional):</MessageLabel>
                  <StyledTextArea
                    placeholder="Ej: ¡Presiento que será una princesa!..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isProcessing}
                  />
                </MessageSection>
              )}
            </AnimatePresence>

            <SubmitButton
              disabled={!selectedGender || !name.trim() || isProcessing}
              onClick={handleSubmit}
              $active={!!selectedGender && !!name.trim() && !isProcessing}
            >
              {isProcessing ? "ENVIANDO..." : "CONFIRMAR APUESTA"}
            </SubmitButton>
          </>
        )}
      </GlassCard>
    </PageWrapper>
  );
};

// --- ESTILOS COMPACTOS ---

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  background: transparent;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 2.5rem 1.5rem;
  border-radius: 40px;
  width: 92%;
  max-width: 380px; /* Consistente con el resto */
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
`;

const TitleSection = styled.div` margin-bottom: 1.5rem; `;
const MainTitle = styled.h1` color: #5d4a3e; font-family: 'Georgia', serif; font-size: 2rem; margin: 0; `;
const SubTitle = styled.p` color: #7a6352; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 0.4rem; `;

const InputSection = styled.div` margin-bottom: 1.5rem; text-align: left; `;
const MessageLabel = styled.label` display: block; color: #5d4a3e; margin-bottom: 0.4rem; font-size: 0.8rem; font-weight: 700; margin-left: 5px; `;

const StyledInput = styled.input`
  width: 100%; padding: 12px 16px; border-radius: 15px; 
  background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(140, 106, 83, 0.1);
  font-size: 0.95rem; color: #4a3b30;
  &:focus { outline: none; background: white; }
`;

const OptionsContainer = styled.div` display: flex; gap: 12px; justify-content: center; margin-bottom: 1.5rem; `;
const MessageSection = styled(motion.div)` margin-bottom: 1.5rem; text-align: left; overflow: hidden; `;

const StyledTextArea = styled.textarea` 
  width: 100%; padding: 12px; border-radius: 15px; 
  background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(140, 106, 83, 0.1);
  color: #4a3b30; resize: none; height: 70px; font-family: inherit; font-size: 0.9rem;
  &:focus { outline: none; background: white; }
`;

const SubmitButton = styled(motion.button)`
  width: 100%; padding: 16px; border-radius: 50px; border: none;
  background: ${props => props.$active ? '#8c6a53' : '#d9c7b8'};
  color: white; font-weight: 800; font-size: 0.85rem; letter-spacing: 1px;
  cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
`;

const SuccessIcon = styled.div` font-size: 3rem; margin-bottom: 1rem; `;

export default VotePage;

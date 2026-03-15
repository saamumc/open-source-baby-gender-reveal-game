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

  // 1. Verificar si ya votó anteriormente al cargar la página
  useEffect(() => {
    const alreadyVoted = localStorage.getItem("baby_shower_voted");
    if (alreadyVoted) {
      // Si ya votó, lo mandamos a resultados o mostramos la confirmación
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
      // 2. Ejecutar efectos visuales
      const color = selectedGender === "girl" ? "#FFB6C1" : "#89CFF0";
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [color, "#FFFFFF", "#F9F6F1"]
      });

      // 3. Guardar marca local para impedir re-voto
      localStorage.setItem("baby_shower_voted", "true");

      // 4. Disparar el mensaje a WhatsApp (Opcional, si quieres que se abra al votar)
      const phoneNumber = "573214559144"; 
      const wpMessage = encodeURIComponent(`¡Hola! Ya voté por ${selectedGender === 'girl' ? 'NIÑA' : 'NIÑO'}. Mi mensaje: ${message}`);
      window.open(`https://wa.me/${phoneNumber}?text=${wpMessage}`, "_blank");

      // 5. Enviar a Redux/Firebase
      dispatch(submitVote());
    }
  };

  if (showVotingScreen === false) return null;

  // 6. Esta es la "pantallita" que pedías que saliera después de votar
  if (hasVoted) {
    return (
      <VoteConfirmation 
        selected={selectedGender} 
        customMessage="¡Ya sabemos lo que crees que va a ser! Ve a la página de resultados. Solo se permite un voto por persona."
      />
    );
  }

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

// --- ESTILOS ACTUALIZADOS (Mismo estilo que HomePage) ---

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2e8df; /* Fondo crema de la invitación */
  padding: 20px;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
  text-align: center;
  border: 1px solid #d9c7b8;
`;

const TitleSection = styled.div` margin-bottom: 2rem; `;
const MainTitle = styled.h1` color: #8c6a53; font-family: 'Georgia', serif; font-size: 2rem; margin-bottom: 0.5rem; `;
const SubTitle = styled.p` color: #a68974; font-size: 1.1rem; `;

const OptionsContainer = styled.div` 
  display: flex; 
  gap: 20px; 
  justify-content: center; 
  margin-bottom: 2rem; 
`;

const MessageSection = styled(motion.div)` margin-bottom: 1.5rem; overflow: hidden; `;

const MessageLabel = styled.label` 
  display: block; 
  color: #8c6a53; 
  margin-bottom: 0.8rem; 
  font-size: 0.95rem; 
  font-weight: 600;
`;

const StyledTextArea = styled.textarea` 
  width: 100%; 
  padding: 15px; 
  border-radius: 15px; 
  border: 1px solid #d9c7b8; 
  background: white;
  color: #8c6a53;
  resize: none; 
  height: 90px;
  font-family: inherit;
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
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
`;

export default VotePage;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaBabyCarriage, FaWhatsapp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
import { setShowVotingScreen } from "../store/resultsSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({});

  const whatsappNumber = "573196911965"; 
  const message = encodeURIComponent("¡Hola Samuel y Sara! Confirmo mi asistencia a la revelación de sexo de Valentina y Janppier.");

  useEffect(() => {
    const eventDate = new Date("April 18, 2026 15:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (distance < 0) { 
        clearInterval(timer); 
        setTimeLeft({ expired: true }); 
      } else { 
        setTimeLeft({ days, hours }); 
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Función corregida para asegurar la redirección
  const handleVoteClick = () => {
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    dispatch(setShowVotingScreen(true)); 
    
    // Aumentamos ligeramente el tiempo para asegurar que el estado se limpie
    setTimeout(() => {
      navigate("/vote");
    }, 200);
  };

  return (
    <HomeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ContentCard>
        <NamesTitle>Valentina & Janppier</NamesTitle>
        <Divider />
        
        <CountdownSection>
          {timeLeft.expired ? "¡Es hoy!" : `Faltan ${timeLeft.days} días y ${timeLeft.hours} horas`}
        </CountdownSection>

        <MainContent>
          <PhotoWrapper>
            <img 
              src="/revelacion.jpg" 
              alt="Valentina y Janppier" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </PhotoWrapper>

          <InvitationText>
            Invitación de los tíos <strong>Samuel y Sara</strong> para conocer el sexo del bebé.
          </InvitationText>

          <DressCodeBox>
            <p><strong>Vestimenta:</strong> Blanco / Beige / Denim</p>
          </DressCodeBox>

          <DetailsBox>
            <FaMapMarkerAlt color="#8c6a53" /> La Serena, Parcela #14 sitio 2 - 5:00 PM
          </DetailsBox>

          <GiftButton onClick={() => navigate("/traer")}>
            <FaBabyCarriage /> ¿QUÉ TRAER?
          </GiftButton>

          <ConfirmButton onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")}>
            <FaWhatsapp /> CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <ActionsGrid>
          <ActionButton onClick={handleVoteClick} color="#4682B4">
            <FaVoteYea /> VOTAR
          </ActionButton>
          <ActionButton onClick={() => navigate("/results")} color="#C08081">
            <FaChartBar /> RESULTADOS
          </ActionButton>
        </ActionsGrid>
      </ContentCard>
    </HomeContainer>
  );
};

// --- STYLED COMPONENTS (Paleta de la invitación: Crema, Café, Neutro) ---

const HomeContainer = styled(motion.div)` 
  display: flex; justify-content: center; align-items: center; 
  padding: 2rem 1rem; background: #f2e8df; min-height: 100vh; 
`;

const ContentCard = styled.div` 
  background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); 
  border-radius: 30px; padding: 2rem; width: 100%; max-width: 500px; 
  color: #8c6a53; text-align: center; border: 1px solid #d9c7b8;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

const NamesTitle = styled.h1` font-family: 'Pacifico', cursive, serif; font-size: 2.2rem; margin: 0; `;

const Divider = styled.hr` border: 0; height: 1px; background: #d9c7b8; margin: 1rem 0; `;

const CountdownSection = styled.div` 
  background: #a68974; color: white; padding: 0.8rem; 
  border-radius: 15px; margin-bottom: 1rem; font-weight: bold; 
`;

const MainContent = styled.div` margin-bottom: 1.5rem; `;

const PhotoWrapper = styled.div` 
  width: 100%; height: 320px; border-radius: 20px; overflow: hidden; 
  margin-bottom: 1rem; border: 5px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const InvitationText = styled.p` font-size: 1rem; color: #8c6a53; margin-bottom: 1rem; `;

const DressCodeBox = styled.div` 
  background: #fdfaf7; padding: 0.8rem; border-radius: 12px; 
  margin-bottom: 1rem; font-size: 0.85rem; border: 1px solid #d9c7b8;
`;

const DetailsBox = styled.div` font-size: 0.9rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 8px; `;

const GiftButton = styled.button`
  background: white; color: #8c6a53; border: 1px solid #d9c7b8;
  padding: 1rem; border-radius: 15px; width: 100%; margin-top: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: bold;
  &:hover { background: #f2e8df; }
`;

const ConfirmButton = styled.button` 
  background: #25D366; color: white; border: none; padding: 1rem; 
  border-radius: 15px; width: 100%; margin-top: 10px; font-weight: bold; 
  display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; 
`;

const ActionsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.5rem; `;

const ActionButton = styled.button` 
  background: ${props => props.color}; color: white; border: none; padding: 1rem; 
  border-radius: 15px; cursor: pointer; display: flex; flex-direction: column; 
  align-items: center; gap: 5px; font-weight: bold; transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
`;

export default HomePage;

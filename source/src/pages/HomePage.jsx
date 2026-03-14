import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaClock, FaHeart, FaWhatsapp, FaBabyCarriage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
import { setShowVotingScreen } from "../store/resultsSlice";

// IMPORTANTE: Asegúrate que el nombre del archivo en la carpeta sea idéntico (mayúsculas/minúsculas)
import videoRevelacion from "../screenshots/Revelacion.mp4";

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
      if (distance < 0) { clearInterval(timer); setTimeLeft({ expired: true }); }
      else { setTimeLeft({ days, hours }); }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVoteClick = () => {
    // Forzamos la limpieza y activamos el permiso antes de navegar
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    dispatch(setShowVotingScreen(true)); 
    
    // Pequeño delay para asegurar que el estado de Redux se asiente antes de que el guardián de App.jsx lo lea
    setTimeout(() => {
      navigate("/vote");
    }, 100);
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
            <video autoPlay loop muted playsInline style={{width:'100%', height:'100%', objectFit:'cover'}}>
              <source src={videoRevelacion} type="video/mp4" />
            </video>
          </PhotoWrapper>

          <InvitationText>
            Invitación de los tíos <strong>Samuel y Sara</strong> para conocer el sexo del bebé.
          </InvitationText>

          <DressCodeBox>
            <p><strong>Niño:</strong> Prenda Azul 💙 | <strong>Niña:</strong> Prenda Rosada 💗</p>
          </DressCodeBox>

          <DetailsBox>
            <FaMapMarkerAlt /> La Calera, Cundinamarca - 3:00 PM
          </DetailsBox>

          {/* NUEVO BOTÓN QUÉ TRAER */}
          <GiftButton onClick={() => navigate("/traer")}>
            <FaBabyCarriage /> ¿QUÉ TRAER?
          </GiftButton>

          <ConfirmButton onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")}>
            <FaWhatsapp /> CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <ActionsGrid>
          <ActionButton onClick={handleVoteClick} gradient="linear-gradient(135deg, #4682B4, #2c5272)">
            <FaVoteYea /> VOTAR
          </ActionButton>
          <ActionButton onClick={() => navigate("/results")} gradient="linear-gradient(135deg, #C08081, #8a5a5b)">
            <FaChartBar /> RESULTADOS
          </ActionButton>
        </ActionsGrid>
      </ContentCard>
    </HomeContainer>
  );
};

// Estilos rápidos para el botón nuevo
const GiftButton = styled.button`
  background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid #444;
  padding: 1rem; border-radius: 15px; width: 100%; margin-top: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
`;

// ... (El resto de tus styled-components se mantienen igual)
const HomeContainer = styled(motion.div)` display: flex; justify-content: center; padding: 2rem 1rem; background: #0f0f0f; min-height: 100vh; `;
const ContentCard = styled.div` background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); border-radius: 30px; padding: 2rem; width: 100%; max-width: 500px; color: white; `;
const NamesTitle = styled.h1` font-family: serif; font-size: 2.2rem; `;
const Divider = styled.hr` border: 0; height: 1px; background: #333; margin: 1rem 0; `;
const CountdownSection = styled.div` background: #1a1a1a; padding: 1rem; border-radius: 15px; margin-bottom: 1rem; `;
const MainContent = styled.div` margin-bottom: 1.5rem; `;
const PhotoWrapper = styled.div` width: 100%; height: 300px; border-radius: 20px; overflow: hidden; margin-bottom: 1rem; `;
const InvitationText = styled.p` font-size: 0.9rem; color: #ccc; margin-bottom: 1rem; `;
const DressCodeBox = styled.div` background: #222; padding: 0.8rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.85rem; `;
const DetailsBox = styled.div` font-size: 0.9rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 8px; `;
const ConfirmButton = styled.button` background: #25D366; color: white; border: none; padding: 1rem; border-radius: 15px; width: 100%; margin-top: 10px; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; `;
const ActionsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.5rem; `;
const ActionButton = styled.button` background: ${props => props.gradient}; color: white; border: none; padding: 1rem; border-radius: 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 5px; font-weight: bold; `;

export default HomePage;

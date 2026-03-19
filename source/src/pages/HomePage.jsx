import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaBabyCarriage, FaWhatsapp, FaCalendarAlt, FaGift } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
import { setShowVotingScreen } from "../store/resultsSlice";
import AnimatedBackground from "../components/AnimatedBackground";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({});

  const fotoRevelacion = "/Revelacion.jpg";
  const whatsappNumber = "573196911965"; 
  const googleMapsUrl = "https://maps.app.goo.gl/vL7T6E6ZJv7qYvY99"; 

  const whatsappMessage = encodeURIComponent(
    "¡Hola! Confirmo mi asistencia a la revelación de género de Valentina y Janppier. 👶🎉"
  );

  useEffect(() => {
    const eventDate = new Date("April 18, 2026 15:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVoteClick = () => {
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    dispatch(setShowVotingScreen(true));

    setTimeout(() => {
      navigate("/vote");
    }, 200);
  };

  return (
    <HomeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatedBackground />

      <ContentCard>
        <NamesTitle>
          Valentina <span>&</span> Janppier
        </NamesTitle>

        <DateHighlight>
          <FaCalendarAlt size={16} />
          SÁBADO, 18 DE ABRIL
        </DateHighlight>

        <CountdownSection>
          {timeLeft.expired
            ? "¡Llegó el gran día!"
            : `Faltan ${timeLeft.days} días y ${timeLeft.hours} horas`}
        </CountdownSection>

        <MainContent>
          <PhotoWrapper>
            <img
              src={fotoRevelacion}
              alt="Valentina y Janppier"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300?text=Cargando+Invitacion...";
              }}
            />
          </PhotoWrapper>

          <TextBlock>
            <InvitationHeader>¡La familia crece!</InvitationHeader>
            <InvitationBody>
              Los abuelitos y tíos te invitamos a descubrir si el mundo se pintará de azul o rosa.
              <br/>
              <strong>¡Tu presencia hará este momento inolvidable!</strong>
            </InvitationBody>
          </TextBlock>

          <TextBlock>
            <DressCodeHeader>✨ Dress Code:</DressCodeHeader>
            <DressCodeBody>
              Usa una <strong>prenda base blanca</strong> para que los colores brillen. 🤍
            </DressCodeBody>
          </TextBlock>

          <LocationBox 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaMapMarkerAlt size={18} color="#7a6352" />
            <p><strong>La Calera, Cundinamarca</strong> - 3:00 PM</p>
            <LocationTip>Toca para ver la ubicación 📍</LocationTip>
          </LocationBox>

          <ConfirmButton
            onClick={() =>
              window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
            }
          >
            <FaWhatsapp size={20} />
            CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <GiftButtonContainer
           onClick={() => navigate("/traer")}
           initial={{ scale: 1 }}
           animate={{ 
             scale: [1, 1.03, 1],
             boxShadow: [
               "0 4px 15px rgba(0,0,0,0.02)",
               "0 8px 25px rgba(212, 175, 55, 0.15)",
               "0 4px 15px rgba(0,0,0,0.02)"
             ]
           }}
           transition={{ 
             duration: 2, 
             repeat: Infinity, 
             ease: "easeInOut" 
           }}
        >
            <IconBadge>
              <FaGift size={12} color="white" />
            </IconBadge>
            <FaBabyCarriage size={22} />
            <span>Sugerencia de Regalo</span>
        </GiftButtonContainer>

        <ActionsGrid>
          <BlueActionButton onClick={handleVoteClick}>
            <FaVoteYea size={20} />
            VOTAR
          </BlueActionButton>

          <PinkActionButton onClick={() => navigate("/results")}>
            <FaChartBar size={20} />
            RESULTADOS
          </PinkActionButton>
        </ActionsGrid>

      </ContentCard>
    </HomeContainer>
  );
};

// --- ESTILOS OPTIMIZADOS ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 100vh;
  position: relative;
  background: transparent; 
`;

const ContentCard = styled.div`
  /* Fondo casi invisible para que se vean los osos */
  background: rgba(255, 255, 255, 0.01); 
  backdrop-filter: blur(4px); /* Desenfoque mínimo */
  -webkit-backdrop-filter: blur(4px);
  border-radius: 40px;
  padding: 1.5rem; /* Padding reducido para que la tarjeta sea más pequeña */
  width: 92%;
  max-width: 380px; /* Reducido de 480px a 380px */
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif; 
  font-size: 1.8rem;
  margin: 0;
  color: #5d4a3e;
  font-weight: 400;
  span {
    color: rgba(93, 74, 62, 0.3);
    font-size: 1.4rem;
  }
`;

const DateHighlight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 0.9rem;
  color: #5d4a3e;
  letter-spacing: 1px;
`;

const CountdownSection = styled.div`
  color: #7a6352;
  margin: 0.2rem 0 1.5rem 0;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 0.7rem;
  text-transform: uppercase;
  opacity: 0.7;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 220px; /* Foto más pequeña */
  border-radius: 15px; 
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
  img { width: 100%; height: auto; display: block; }
`;

const TextBlock = styled.div` width: 100%; text-align: center; `;

const InvitationHeader = styled.h2`
  font-size: 1.1rem;
  color: #5d4a3e;
  margin-bottom: 0.3rem;
`;

const InvitationBody = styled.p`
  font-size: 0.85rem;
  color: #4a3b30;
  line-height: 1.4;
`;

const DressCodeHeader = styled.h3`
  font-size: 0.9rem;
  color: #5d4a3e;
  margin-bottom: 0.2rem;
`;

const DressCodeBody = styled.p`
  font-size: 0.8rem;
  color: #4a3b30;
`;

const LocationBox = styled(motion.a)`
  display: flex;
  flex-direction: column;
  padding: 8px 15px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  p { margin: 0; font-size: 0.8rem; color: #4a3b30; }
`;

const LocationTip = styled.span`
  font-size: 0.6rem;
  color: #7a6352;
  font-weight: 700;
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.8);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  width: 100%;
  max-width: 240px;
  cursor: pointer;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 1rem;
  width: 100%;
`;

const ActionButton = styled.button`
  border: none;
  padding: 0.7rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const BlueActionButton = styled(ActionButton)`
  background: rgba(193, 227, 245, 0.4);
  color: #2c5d7a;
`;

const PinkActionButton = styled(ActionButton)`
  background: rgba(245, 193, 208, 0.4);
  color: #8a3d53;
`;

const GiftButtonContainer = styled(motion.button)`
  background: rgba(255, 255, 255, 0.3);
  border: 1.5px solid rgba(212, 175, 55, 0.2);
  color: #7a6352;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  position: relative;
  
  span {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const IconBadge = styled.div`
  position: absolute;
  top: -8px;
  right: 12px;
  background: #d4af37;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default HomePage;

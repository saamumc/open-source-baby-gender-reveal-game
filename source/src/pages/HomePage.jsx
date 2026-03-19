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
  const whatsappNumber = "573102021939"; 
  const googleMapsUrl = "https://maps.app.goo.gl/stUaX2dsSYYjrAhL6?g_st=ic"; 

  const whatsappMessage = encodeURIComponent(
    "¡Hola! Confirmo mi asistencia a la revelación de género de Valentina y Janppier. 👶🎉 (agrega tu nombre y los confirmados)"
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
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconBadge>
              <FaGift size={10} color="white" />
            </IconBadge>
            <FaBabyCarriage size={18} />
            <span>Sugerencia de Regalo</span>
          </GiftButtonContainer>

          <TextBlock>
            <InvitationHeader>¡La familia crece!</InvitationHeader>
            <InvitationBody>
              Te invitamos a descubrir si el mundo se pintará de azul o rosa. 
              <strong> ¡Tu presencia lo hará inolvidable!</strong>
            </InvitationBody>
          </TextBlock>

          <TextBlock>
            <DressCodeHeader>✨ Dress Code:</DressCodeHeader>
            <DressCodeBody>
              Acompáñanos con una <strong>prenda base blanca</strong> 🤍
            </DressCodeBody>
          </TextBlock>

          <LocationBox 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaMapMarkerAlt size={16} color="#7a6352" />
            <p><strong>La Calera</strong> - 3:00 PM</p>
            <LocationTip>Toca para ver el mapa 📍</LocationTip>
          </LocationBox>

          <ConfirmButton
            onClick={() =>
              window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
            }
          >
            <FaWhatsapp size={18} />
            CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>
      </ContentCard>

      <StickyActions>
        <FloatingVote 
          onClick={handleVoteClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaVoteYea size={22} />
          ¿NIÑO O NIÑA? ¡VOTA AQUÍ!
        </FloatingVote>
        <ResultsSmall onClick={() => navigate("/results")}>
          Ver resultados actuales <FaChartBar />
        </ResultsSmall>
      </StickyActions>

    </HomeContainer>
  );
};

// --- ESTILOS ---

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
  background: rgba(255, 255, 255, 0.01); 
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 40px;
  padding: 1.5rem;
  width: 92%;
  max-width: 380px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
  position: relative;
  margin-bottom: 120px; 
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
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 0.7rem;
  text-transform: uppercase;
  opacity: 0.7;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 200px; 
  border-radius: 15px; 
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 0.5rem;
  img { width: 100%; height: auto; display: block; }
`;

const TextBlock = styled.div` width: 100%; text-align: center; `;

const InvitationHeader = styled.h2`
  font-size: 1.1rem;
  color: #5d4a3e;
  margin-bottom: 0.2rem;
  font-weight: 700;
`;

const InvitationBody = styled.p`
  font-size: 0.85rem;
  color: #4a3b30;
  line-height: 1.4;
  margin: 0;
`;

const DressCodeHeader = styled.h3`
  font-size: 0.9rem;
  color: #5d4a3e;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
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
  margin: 0.5rem 0;
  p { margin: 0; font-size: 0.85rem; color: #4a3b30; }
`;

const LocationTip = styled.span`
  font-size: 0.6rem;
  color: #7a6352;
  font-weight: 800;
  text-transform: uppercase;
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.8);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  width: 100%;
  max-width: 220px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s;
  &:hover { background: #25d366; }
`;

const GiftButtonContainer = styled(motion.button)`
  background: rgba(255, 255, 255, 0.4);
  border: 1.5px solid rgba(212, 175, 55, 0.2);
  color: #7a6352;
  padding: 0.8rem;
  border-radius: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 240px;
  position: relative;
  span {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const IconBadge = styled.div`
  position: absolute;
  top: -6px;
  right: 10px;
  background: #d4af37;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StickyActions = styled.div`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`;

const FloatingVote = styled(motion.button)`
  background: linear-gradient(90deg, #c1e3f5 0%, #f5c1d0 100%);
  color: #5d4a3e;
  border: none;
  padding: 1.1rem;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  cursor: pointer;
  border: 2px solid white;
`;

const ResultsSmall = styled.button`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: none;
  color: #7a6352;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 6px 15px;
  cursor: pointer;
  align-self: center;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

export default HomePage;

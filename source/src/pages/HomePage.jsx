import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaBabyCarriage, FaWhatsapp } from "react-icons/fa";
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
  // NUEVO ENLACE DE UBICACIÓN
  const googleMapsUrl = "https://maps.app.goo.gl/LrzpVsM6h4xb8QLv5?g_st=ic";

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
              Los abuelitos y tíos te invitamos a descubrir si el mundo se pintará de azul o rosa para nuestro primer niet@ y sobrin@. 
              <br/>
              <strong>¡Tu presencia hará este momento inolvidable!</strong>
            </InvitationBody>
          </TextBlock>

          <TextBlock>
            <DressCodeHeader>✨ Dress Code:</DressCodeHeader>
            <DressCodeBody>
              Acompáñanos con una <strong>prenda base de color blanco</strong> para que los colores de la revelación brillen más que nunca. 🤍
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

        <ActionsGrid>
          <BlueActionButton onClick={handleVoteClick}>
            <FaVoteYea size={22} />
            VOTAR
          </BlueActionButton>

          <PinkActionButton onClick={() => navigate("/results")}>
            <FaChartBar size={22} />
            RESULTADOS
          </PinkActionButton>
        </ActionsGrid>

        <GiftButton onClick={() => navigate("/traer")}>
            <FaBabyCarriage size={18} />
            Sugerencia de Regalo
        </GiftButton>
      </ContentCard>
    </HomeContainer>
  );
};

// --- ESTILOS ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 1.5rem;
  min-height: 100vh;
  position: relative;
  background: transparent; 
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.02); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 40px;
  padding: 3.5rem 2rem;
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif; 
  font-size: 2.5rem;
  margin: 0;
  color: #5d4a3e;
  font-weight: 400;
  span {
    color: rgba(93, 74, 62, 0.3);
    font-size: 1.8rem;
  }
`;

const CountdownSection = styled.div`
  color: #7a6352;
  margin: 0.5rem 0 2.5rem 0;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 280px; 
  border-radius: 20px; 
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.03);
  img { width: 100%; height: auto; display: block; }
`;

const TextBlock = styled.div` width: 100%; text-align: center; `;

const InvitationHeader = styled.h2`
  font-size: 1.2rem;
  color: #5d4a3e;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const InvitationBody = styled.p`
  font-size: 0.95rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
`;

const DressCodeHeader = styled.h3`
  font-size: 1rem;
  color: #5d4a3e;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const DressCodeBody = styled.p`
  font-size: 0.9rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.6;
`;

const LocationBox = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 1rem 0;
  color: #4a3b30;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 20px;
  border: 1px solid rgba(122, 99, 82, 0.1);
  transition: all 0.3s ease;
  &:hover { background: rgba(255, 255, 255, 0.3); }
  p { margin: 0; font-size: 0.9rem; }
`;

const LocationTip = styled.span`
  font-size: 0.7rem;
  color: #7a6352;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  opacity: 0.7;
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.85);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  transition: all 0.3s ease;
  &:hover { background: #25d366; transform: translateY(-2px); }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 2rem;
  width: 100%;
`;

const ActionButton = styled.button`
  border: none;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
`;

const BlueActionButton = styled(ActionButton)`
  background: rgba(193, 227, 245, 0.3);
  color: #2c5d7a;
  border: 1px solid rgba(193, 227, 245, 0.2);
  &:hover { background: rgba(193, 227, 245, 0.5); }
`;

const PinkActionButton = styled(ActionButton)`
  background: rgba(245, 193, 208, 0.3);
  color: #8a3d53;
  border: 1px solid rgba(245, 193, 208, 0.2);
  &:hover { background: rgba(245, 193, 208, 0.5); }
`;

const GiftButton = styled.button`
  background: transparent;
  border: none;
  color: #7a6352;
  text-decoration: underline;
  margin-top: 2rem;
  cursor: pointer;
  font-size: 0.85rem;
  opacity: 0.7;
`;

export default HomePage;

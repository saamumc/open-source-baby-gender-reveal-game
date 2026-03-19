import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaVoteYea, 
  FaChartBar, 
  FaMapMarkerAlt, 
  FaBabyCarriage, 
  FaWhatsapp,
  FaGift 
} from "react-icons/fa";
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
  const message = encodeURIComponent(
    "¡Hola Samuel y Sara! Confirmo mi asistencia a la revelación de sexo de Valentina y Janppier."
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
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
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
    setTimeout(() => navigate("/vote"), 200);
  };

  return (
    <HomeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatedBackground />

      <ContentCard>
        <NamesTitle>Valentina & Janppier</NamesTitle>
        <Divider />

        <CountdownSection>
          {timeLeft.expired ? "¡Es hoy!" : `Faltan ${timeLeft.days} días y ${timeLeft.hours} horas`}
        </CountdownSection>

        <MainContent>
          <PhotoWrapper>
            <img
              src={fotoRevelacion}
              alt="Valentina y Janppier"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=Cargando+Invitacion...";
              }}
            />
          </PhotoWrapper>

          <InvitationText>
            Los <strong>abuelitos y tíos</strong> queremos invitarte a la revelación de género del bebé.
          </InvitationText>

          {/* --- SECCIÓN DE REGALO ULTRA RESALTADA --- */}
          <GiftHighlightCard
            initial={{ scale: 0.95 }}
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Badge>¡Sugerencia Importante!</Badge>
            <GiftIconWrapper>
               <FaGift size={28} color="#d4af37" />
            </GiftIconWrapper>
            <GiftText>
              Para facilitarte la elección, hemos preparado una lista de <strong>Sugerencias de Regalo</strong>.
            </GiftText>
            <PulseButton
              onClick={() => navigate("/traer")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBabyCarriage size={22} /> 
              VER QUÉ TRAER
            </PulseButton>
          </GiftHighlightCard>

          <DressCodeBox>
            <p>
              <strong>Prenda base:</strong> Trae tu <strong>chaqueta, bufanda o camisa en color blanco</strong>.
            </p>
          </DressCodeBox>

          <DetailsBox>
            <FaMapMarkerAlt color="#8c6a53" /> La Calera, Cundinamarca - 3:00 PM
          </DetailsBox>

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

// --- ESTILOS ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: transparent; 
  min-height: 100vh;
  position: relative;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.4); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 2.5rem 1.5rem;
  width: 100%;
  max-width: 480px;
  color: #8c6a53;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  z-index: 1;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2.2rem;
  color: #5d4a3e;
  margin-bottom: 0.5rem;
`;

const Divider = styled.div`
  width: 50px;
  height: 2px;
  background: #d9c7b8;
  margin: 1rem auto;
`;

const CountdownSection = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #a68974;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

const MainContent = styled.div` margin-top: 1rem; `;

const PhotoWrapper = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const InvitationText = styled.p`
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  color: #5d4a3e;
`;

/* --- ESTILOS DE LA TARJETA DE REGALO (LA QUE NO PUEDEN IGNORAR) --- */

const GiftHighlightCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(253, 242, 245, 0.9) 0%, rgba(240, 247, 250, 0.9) 100%);
  border: 2px solid #d4af37;
  border-radius: 25px;
  padding: 1.5rem;
  margin: 2rem 0;
  position: relative;
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.15);
`;

const Badge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #d4af37;
  color: white;
  padding: 4px 15px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
`;

const GiftIconWrapper = styled.div`
  margin-bottom: 10px;
  animation: bounce 2s infinite;
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

const GiftText = styled.p`
  font-size: 0.95rem;
  color: #5d4a3e;
  margin-bottom: 1rem;
  line-height: 1.4;
  strong { color: #8c6a53; }
`;

const PulseButton = styled(motion.button)`
  background: #8c6a53;
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(140, 106, 83, 0.4);
`;

/* --- OTROS COMPONENTES --- */

const DressCodeBox = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  border: 1px dashed #d9c7b8;
`;

const DetailsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #5d4a3e;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  border: none;
  background: #25D366;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
  margin-bottom: 1.5rem;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const ActionButton = styled.button`
  padding: 12px;
  border-radius: 15px;
  border: 1.5px solid ${props => props.color};
  background: transparent;
  color: ${props => props.color};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover { background: ${props => props.color}; color: white; }
`;

export default HomePage;

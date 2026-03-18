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
            ? "¡Es hoy!"
            : `Faltan ${timeLeft.days} días y ${timeLeft.hours} horas`}
        </CountdownSection>

        <MainContent>
          <PhotoWrapper>
            <img
              src={fotoRevelacion}
              alt="Valentina y Janppier"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/200?text=Cargando...";
              }}
            />
          </PhotoWrapper>

          <InfoCard>
            <InvitationText>
              ¡La familia crece y queremos compartirlo contigo! <br/>
              Acompáñanos a descubrir si será <span style={{color: "#4a84a6", fontWeight: "bold"}}>azul</span> o <span style={{color: "#b05c74", fontWeight: "bold"}}>rosa</span>.
            </InvitationText>
          </InfoCard>

          <InfoCard>
            <DressCodeText>
              ✨ <strong>Dress Code:</strong> Te pedimos venir con una <strong>prenda superior blanca</strong>. 🤍
            </DressCodeText>
          </InfoCard>

          <LocationBox>
            <FaMapMarkerAlt size={18} color="#7a6352" />
            <p><strong>La Calera, Cundinamarca</strong> - 3:00 PM</p>
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

// --- ESTILOS CON 98% DE TRANSPARENCIA ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 100vh;
  position: relative;
  background: transparent; /* Fondo totalmente libre para los ositos */
`;

const ContentCard = styled.div`
  /* TRANSPARENCIA AL 98% (0.02 de opacidad) */
  background: rgba(255, 255, 255, 0.02); 
  
  /* El desenfoque es vital aquí para que el texto sea legible sobre el fondo */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  border-radius: 40px;
  padding: 3rem 2rem;
  width: 100%;
  max-width: 480px;
  text-align: center;
  
  /* Un borde de "hilo de luz" muy sutil */
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif; 
  font-size: 2.4rem;
  margin: 0;
  color: #5d4a3e; /* Color más oscuro para resaltar sobre la transparencia */
  font-weight: 400;

  span {
    color: rgba(93, 74, 62, 0.3);
    font-size: 1.8rem;
  }
`;

const CountdownSection = styled.div`
  color: #7a6352;
  margin: 0.5rem 0 2rem 0;
  font-weight: 500;
  letter-spacing: 1.5px;
  font-size: 0.85rem;
  text-transform: uppercase;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; 
`;

const PhotoWrapper = styled.div`
  width: 130px; 
  height: 130px;
  border-radius: 50%; 
  overflow: hidden;
  margin-bottom: 1rem;
  border: 4px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* TARJETAS INTERNAS TOTALMENTE TRANSPARENTES */
const InfoCard = styled.div`
  background: transparent; 
  border: none;
  padding: 0.5rem;
  width: 100%;
`;

const InvitationText = styled.p`
  font-size: 1rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.5;
  font-weight: 500;
`;

const DressCodeText = styled.p`
  font-size: 0.9rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.5;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 1rem 0;
  color: #4a3b30;
  font-size: 0.9rem;
  
  p { margin: 0; }
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.85); /* Verde con un toque de transparencia */
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #25d366;
    transform: translateY(-2px);
  }
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
  background: rgba(193, 227, 245, 0.3); /* Transparencia acuarela azul */
  color: #2c5d7a;
  border: 1px solid rgba(193, 227, 245, 0.2);
  
  &:hover {
    background: rgba(193, 227, 245, 0.5);
  }
`;

const PinkActionButton = styled(ActionButton)`
  background: rgba(245, 193, 208, 0.3); /* Transparencia acuarela rosa */
  color: #8a3d53;
  border: 1px solid rgba(245, 193, 208, 0.2);
  
  &:hover {
    background: rgba(245, 193, 208, 0.5);
  }
`;

const GiftButton = styled.button`
  background: transparent;
  border: none;
  color: #7a6352;
  text-decoration: underline;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: 0.7;
`;

export default HomePage;


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

  // Mensaje predeterminado para WhatsApp codificado correctamente
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
            ? "¡El gran día ha llegado!"
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

          {/* TEXTO REDUCIDO Y AL GRANO */}
          <InfoCard>
            <InvitationText>
              ¡La familia crece y queremos compartirlo contigo! <br/>
              Acompáñanos a descubrir si nuestro mundo se pintará de <span style={{color: "#83b8d7", fontWeight: "bold"}}>azul</span> o <span style={{color: "#d78398", fontWeight: "bold"}}>rosa</span>.
            </InvitationText>
          </InfoCard>

          {/* DRESS CODE REDUCIDO */}
          <InfoCard>
            <DressCodeText>
              ✨ <strong>Dress Code:</strong> Para que los colores de la revelación resalten, te pedimos venir con una <strong>prenda superior de color blanco</strong>. 🤍
            </DressCodeText>
          </InfoCard>

          <LocationBox>
            <FaMapMarkerAlt size={20} color="#a68974" />
            <p><strong>La Calera, Cundinamarca</strong><br/>3:00 PM</p>
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

// --- ESTILOS EFECTO ACUARELA Y GLASSMORPHISM ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  /* EFECTO ACUARELA DE FONDO: Azul arriba a la izquierda, Rosa abajo a la derecha, Blanco al medio */
  background-color: #ffffff;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(193, 227, 245, 0.6) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(245, 193, 208, 0.6) 0%, transparent 50%);
`;

const ContentCard = styled.div`
  /* EFECTO CRISTAL (Glassmorphism) para que se fusione con la acuarela */
  background: rgba(255, 255, 255, 0.45); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border-radius: 40px;
  padding: 3rem 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  
  border: 1px solid rgba(255, 255, 255, 0.8); /* Borde blanco sutil */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif; 
  font-size: 2.6rem;
  margin: 0;
  color: #7a6352; 
  font-weight: 400;

  span {
    font-family: 'Arial', sans-serif;
    color: rgba(122, 99, 82, 0.4);
    font-size: 2rem;
    margin: 0 10px;
    font-weight: 300;
  }
`;

const CountdownSection = styled.div`
  color: #a68974;
  margin: 1rem 0 2rem 0;
  font-weight: 400;
  letter-spacing: 2px;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem; /* Espaciado automático entre los elementos */
`;

const PhotoWrapper = styled.div`
  width: 140px; 
  height: 140px;
  border-radius: 50%; /* Circular */
  overflow: hidden;
  margin-bottom: 1rem;
  border: 6px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* NUEVOS "CUADRITOS" ELEGANTES */
const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
`;

const InvitationText = styled.p`
  font-size: 1.05rem;
  color: #6d5849;
  margin: 0;
  line-height: 1.6;
`;

const DressCodeText = styled.p`
  font-size: 0.95rem;
  color: #6d5849;
  margin: 0;
  line-height: 1.6;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 1rem 0;
  color: #6d5849;
  
  p {
    margin: 0;
    font-size: 0.95rem;
    text-align: left;
    line-height: 1.4;
  }
`;

const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #25d366 0%, #20b858 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.2);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
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
  padding: 1.2rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
`;

const BlueActionButton = styled(ActionButton)`
  background: rgba(193, 227, 245, 0.5); /* Azul acuarela semitransparente */
  color: #4a84a6;
  border: 1px solid rgba(193, 227, 245, 0.8);
  
  &:hover {
    background: rgba(193, 227, 245, 0.8);
    transform: translateY(-2px);
  }
`;

const PinkActionButton = styled(ActionButton)`
  background: rgba(245, 193, 208, 0.4); /* Rosa acuarela semitransparente */
  color: #b05c74;
  border: 1px solid rgba(245, 193, 208, 0.7);
  
  &:hover {
    background: rgba(245, 193, 208, 0.7);
    transform: translateY(-2px);
  }
`;

const GiftButton = styled.button`
  background: transparent;
  border: 1px solid rgba(166, 137, 116, 0.3);
  border-radius: 30px;
  color: #8c6a53;
  padding: 0.8rem 1.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`;

export default HomePage;

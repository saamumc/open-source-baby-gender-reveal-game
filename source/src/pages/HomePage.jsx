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
        <NamesTitle>Valentina & Janppier</NamesTitle>

        <Divider />

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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400?text=Cargando+Invitacion...";
              }}
            />
          </PhotoWrapper>

          <InvitationText>
            Los <strong>abuelitos y tíos</strong> La familia crece y la felicidad se multiplica! Los abuelitos y tíos estamos felices de invitarte a la revelación de género de quien será nuestro primer nieto y sobrino. Ha sido una espera llena de ternura y queremos compartir contigo este momento inolvidable donde descubriremos si el mundo se pintará de azul o rosa para nosotros. ¡Tu presencia hará este día aún más especial!"


          </InvitationText>

          <DressCodeBox>
            <p>
              <strong>Prenda base:</strong> Trae tu{" "}
              <strong>Para que el color de la revelación brille más que nunca, queremos pedirte que nos acompañes con una prenda base de color blanco. Puede ser tu chaqueta, camisa o camiseta favorita… lo importante es que vengas con toda la actitud a celebrar este momento tan especial con nosotros.

¡Gracias por ser parte de este día y ayudarnos a que todo se vea simplemente perfecto!
                 </strong>.
            </p>
          </DressCodeBox>

          <DetailsBox>
            <FaMapMarkerAlt color="#8c6a53" />
            La Calera, Cundinamarca - 3:00 PM
          </DetailsBox>

          <GiftButton onClick={() => navigate("/traer")}>
            <FaBabyCarriage />
            Sugerencia De Regalo
          </GiftButton>

          <ConfirmButton
            onClick={() =>
              window.open(
                `https://wa.me/3102021939?text=Tios y Abuelitos confirmo mi asistencia`
,
                "_blank"
              )
            }
          >
            <FaWhatsapp />
            CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <ActionsGrid>
          <ActionButton onClick={handleVoteClick} color="#4682B4">
            <FaVoteYea />
            VOTAR
          </ActionButton>

          <ActionButton onClick={() => navigate("/results")} color="#C08081">
            <FaChartBar />
            RESULTADOS
          </ActionButton>
        </ActionsGrid>
      </ContentCard>
    </HomeContainer>
  );
};

// --- ESTILOS CON +45% DE TRANSPARENCIA EXTRA ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  /* Reducido a 0.25 para que el fondo sea casi totalmente el del componente AnimatedBackground */
  background: rgba(242, 232, 223, 0.25); 
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentCard = styled.div`
  /* Reducido a 0.04 para que sea una capa de cristal ultra delgada */
  background: rgba(255, 255, 255, 0.04); 
  
  /* El desenfoque se mantiene para que el texto sea legible sobre los osos */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  border-radius: 30px;
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  color: #8c6a53;
  text-align: center;
  
  /* Borde muy tenue */
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: "Georgia", serif;
  font-size: 2.4rem;
  margin: 0;
  color: #8c6a53;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: rgba(140, 106, 83, 0.15);
  margin: 1rem 0;
`;

const CountdownSection = styled.div`
  /* Transparencia aplicada también aquí para no tapar tanto el paso de los osos */
  background: rgba(166, 137, 116, 0.7);
  color: white;
  padding: 0.8rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const MainContent = styled.div`
  margin-bottom: 1.5rem;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InvitationText = styled.p`
  font-size: 1.1rem;
  color: #4a382b; /* Oscurecido para compensar la transparencia extrema del fondo */
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-weight: 600;
`;

const DressCodeBox = styled.div`
  /* Caja interna más ligera */
  background: rgba(255, 255, 255, 0.25);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  border: 1px solid rgba(217, 199, 184, 0.3);
  color: #8c6a53;
  text-align: left;
`;

const DetailsBox = styled.div`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: bold;
`;

const GiftButton = styled.button`
  background: rgba(255, 255, 255, 0.6);
  color: #8c6a53;
  border: 1px solid rgba(217, 199, 184, 0.6);
  padding: 1.2rem;
  border-radius: 15px;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
`;

const ConfirmButton = styled.button`
  background: #25d366;
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 15px;
  width: 100%;
  margin-top: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.15);
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  background: ${(props) => props.color};
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  transition: all 0.2s;
  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

export default HomePage;


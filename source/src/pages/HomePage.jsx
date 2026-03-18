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
          {/* FOTO CUADRADA RECUPERADA */}
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

          {/* TODO EL TEXTO ORIGINAL REINCORPORADO Y ORGANIZADO */}
          <TextBlock>
            <InvitationHeader>Los abuelitos y tíos</InvitationHeader>
            <InvitationBody>
              ¡La familia crece y la felicidad se multiplica! Los abuelitos y tíos estamos felices de invitarte a la revelación de género de quien será nuestro primer nieto y sobrino. Ha sido una espera llena de ternura y queremos compartir contigo este momento inolvidable donde descubriremos si el mundo se pintará de azul o rosa para nosotros.
              <br/><br/>
              <strong>¡Tu presencia hará este día aún más especial!</strong>
            </InvitationBody>
          </TextBlock>

          <TextBlock>
            <DressCodeHeader>✨ Dress Code:</DressCodeHeader>
            <DressCodeBody>
              Para que el color de la revelación brille más que nunca, queremos pedirte que nos acompañes con una <strong>prenda base de color blanco</strong>. Puede ser tu chaqueta, camisa o camiseta favorita… lo importante es que vengas con toda la actitud a celebrar este momento tan especial con nosotros.
              <br/><br/>
              <em>¡Gracias por ser parte de este día y ayudarnos a que todo se vea simplemente perfecto!🤍</em>
            </DressCodeBody>
          </TextBlock>

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

// --- ESTILOS CORREGIDOS Y HERMOSOS (98% TRANSPARENTE) ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem; /* Más espacio en los bordes de la pantalla */
  min-height: 100vh;
  position: relative;
  background: transparent; 
`;

const ContentCard = styled.div`
  /* TRANSPARENCIA AL 98% (0.02 de opacidad) */
  background: rgba(255, 255, 255, 0.02); 
  
  /* Desenfoque de fondo para legibilidad */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border-radius: 40px;
  padding: 4rem 2.5rem; /* Más acolchado interno para dar aire al texto */
  width: 100%;
  max-width: 520px; /* Un poco más ancha para acomodar el texto */
  text-align: center;
  
  /* Borde de "hilo de luz" ultra sutil */
  border: 1px solid rgba(255, 255, 255, 0.1); 
  z-index: 10;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
`;

const NamesTitle = styled.h1`
  font-family: 'Georgia', serif; 
  font-size: 2.6rem;
  margin: 0;
  color: #5d4a3e; /* Marrón oscuro para resaltar */
  font-weight: 400;

  span {
    color: rgba(93, 74, 62, 0.3);
    font-size: 2rem;
  }
`;

const CountdownSection = styled.div`
  color: #7a6352;
  margin: 0.5rem 0 3rem 0; /* Más espacio abajo */
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 0.85rem;
  text-transform: uppercase;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* Espaciado automático generoso entre secciones */
`;

/* FOTO CUADRADA ELEGANTE */
const PhotoWrapper = styled.div`
  width: 100%; /* Ocupa el ancho disponible */
  max-width: 320px; /* Tamaño máximo elegante */
  height: auto; /* Altura automática basada en la foto */
  border-radius: 20px; /* Bordes suavemente redondeados, no circulares */
  overflow: hidden;
  margin-bottom: 2rem; /* Espacio abajo */
  border: 6px solid rgba(255, 255, 255, 0.5); /* Borde esmerilado */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Asegura que la foto cuadrada se vea completa */
    display: block;
  }
`;

/* BLOQUE DE TEXTO CON MUCHO AIRE */
const TextBlock = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InvitationHeader = styled.h2`
  font-size: 1.3rem;
  color: #5d4a3e;
  margin: 0 0 1rem 0;
  font-weight: 600;
`;

const InvitationBody = styled.p`
  font-size: 1rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.8; /* ¡Mucho espacio entre líneas para legibilidad! */
  font-weight: 400;
`;

const DressCodeHeader = styled.h3`
  font-size: 1.1rem;
  color: #5d4a3e;
  margin: 0 0 1rem 0;
  font-weight: 600;
`;

const DressCodeBody = styled.p`
  font-size: 0.95rem;
  color: #4a3b30;
  margin: 0;
  line-height: 1.7; /* Espaciado cómodo */
  
  strong {
    color: #4682B4; /* Un toque de azul para 'blanco', guiño al género */
  }
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 1.5rem 0;
  color: #4a3b30;
  font-size: 0.95rem;
  
  p { margin: 0; }
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.9); /* Verde WhatsApp */
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
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
  margin-top: 3rem; /* Mucho espacio arriba */
  width: 100%;
}
`;

const ActionButton = styled.button`
  border: none;
  padding: 1.2rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
`;

const BlueActionButton = styled(ActionButton)`
  background: rgba(193, 227, 245, 0.3); /* Transparencia azul pastel */
  color: #2c5d7a;
  border: 1px solid rgba(193, 227, 245, 0.2);
  
  &:hover {
    background: rgba(193, 227, 245, 0.5);
  }
`;

const PinkActionButton = styled(ActionButton)`
  background: rgba(245, 193, 208, 0.3); /* Transparencia rosa pastel */
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
  margin-top: 2rem; /* Espacio arriba */
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0.7;
`;

export default HomePage;



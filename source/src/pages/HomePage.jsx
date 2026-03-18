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
  // Este número es de WhatsApp, lo usaré para la confirmación
  const whatsappNumber = "573196911965";

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
          Valentina <span style={{ color: "rgba(166, 137, 116, 0.4)", margin: "0 10px" }}>&</span> Janppier
        </NamesTitle>

        <Divider />

        <CountdownSection>
          {timeLeft.expired
            ? "¡Es hoy!"
            : `Faltan ${timeLeft.days} días & ${timeLeft.hours} horas`}
        </CountdownSection>

        <MainContent>
          <PhotoWrapper>
            <img
              src={fotoRevelacion}
              alt="Valentina y Janppier"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/200?text=Cargando+Invitacion...";
              }}
            />
          </PhotoWrapper>

          <InvitationText>
            ¡La familia crece y la felicidad se multiplica! Los abuelitos y tíos estamos felices de invitarte a la revelación de género de quien será nuestro primer nieto y sobrino. Ha sido una espera llena de ternura y queremos compartir contigo este momento inolvidable donde descubriremos si el mundo se pintará de azul o rosa para nosotros.
            ¡Tu presencia hará este día aún más especial!
          </InvitationText>

          <DressCodeText>
            <strong>Prenda base:</strong> Para que el color de la revelación brille más que nunca, queremos pedirte que nos acompañes con una prenda base de <strong>color blanco</strong>. Puede ser tu chaqueta, camisa o camiseta favorita... lo importante es que vengas con toda la actitud a celebrar este momento tan especial con nosotros.

¡Gracias por ser parte de este día y ayudarnos a que todo se vea simplemente perfecto!
          </DressCodeText>

          <DetailsBox>
            <FaMapMarkerAlt color="#8c6a53" />
            La Calera, Cundinamarca - 3:00 PM
          </DetailsBox>

          <ConfirmButton
            onClick={() =>
              window.open(
                `https://wa.me/3102021939?text=Tios y Abuelitos confirmo mi asistencia`,
                "_blank"
              )
            }
          >
            <FaWhatsapp />
            CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <ActionsGrid>
          <BlueActionButton onClick={handleVoteClick}>
            <FaVoteYea />
            VOTAR
          </BlueActionButton>

          <PinkActionButton onClick={() => navigate("/results")}>
            <FaChartBar />
            RESULTADOS
          </PinkActionButton>
        </ActionsGrid>

        <GiftButton onClick={() => navigate("/traer")}>
            <FaBabyCarriage />
            SUGERENCIA DE REGALO
          </GiftButton>
      </ContentCard>
    </HomeContainer>
  );
};

// --- ESTILOS TRANSFORMADOS PARA SER DEMASIADO HERMOSOS ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem; /* Más espacio en los bordes de la pantalla */
  background: rgba(248, 241, 235, 0.4); /* Un fondo más cremoso y claro */
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.12); /* Más brillante, menos ultra-transparente */
  backdrop-filter: blur(8px); /* Mayor desenfoque para suavizar el fondo animado */
  -webkit-backdrop-filter: blur(8px);
  
  border-radius: 40px; /* Bordes más suaves y redondeados */
  padding: 4rem 3rem; /* Espaciado interno generoso para respirar */
  width: 100%;
  max-width: 600px; /* Ligeramente más ancho para que el texto no se vea apachurrado */
  color: #a68974; /* Un marrón más suave y claro */
  text-align: center;
  
  border: none; /* Eliminamos el borde rígido */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.02); /* Sombra muy sutil */
  z-index: 10;
  position: relative;
`;

const NamesTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif; /* Usamos una serif más elegante si está disponible, sino una serif básica */
  font-size: 2.8rem; /* Más grande, para que sea el foco */
  margin: 0;
  color: #a68974; /* Un marrón más claro y suave */
  letter-spacing: 1px;
  font-weight: 300; /* Más delgada para elegancia */
  text-shadow: none; /* Sin sombras exageradas */
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: rgba(140, 106, 83, 0.25); /* Un divisor más tenue */
  width: 80%; /* Más estrecho, más elegante */
  margin: 2rem auto; /* Más espacio vertical */
`;

const CountdownSection = styled.div`
  background: none; /* Eliminamos el cuadro de fondo pesado */
  color: #a68974; /* Usamos el color base más claro */
  padding: 0;
  border-radius: 0;
  margin-bottom: 2.5rem; /* Más espacio */
  font-weight: 300; /* Más delgada */
  letter-spacing: 2px; /* Más espacio entre letras para legibilidad */
  font-size: 0.9rem;
`;

const MainContent = styled.div`
  margin-bottom: 2.5rem;
`;

const PhotoWrapper = styled.div`
  width: 160px; /* Reducción drástica del tamaño para que sea un detalle elegante */
  height: 160px;
  border-radius: 50%; /* Foto circular para suavidad */
  overflow: hidden;
  margin: 0 auto 3rem; /* Centrado y con muchísimo espacio abajo */
  border: 8px solid rgba(255, 255, 255, 0.8); /* Borde más elegante y grueso */
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05); /* Sombra suave */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InvitationText = styled.p`
  font-size: 1rem; /* Tamaño más estándar y legible */
  color: #a68974; /* Usamos el marrón más claro */
  margin-bottom: 2.5rem; /* Más espacio */
  line-height: 1.8; /* ¡Muchísimo más espacio entre líneas! */
  font-weight: 400; /* Peso normal */
  letter-spacing: 0.5px; /* Ligeramente espaciado para evitar el efecto "apachurrado" */
`;

const DressCodeText = styled.p`
  background: none; /* Eliminamos el cuadro de fondo pesado */
  border: none; /* Eliminamos el borde */
  padding: 0;
  border-radius: 0;
  margin-bottom: 2.5rem; /* Más espacio */
  font-size: 0.9rem;
  color: #a68974; /* Usamos el marrón más claro */
  text-align: center; /* Centrado para flujo */
  line-height: 1.8; /* Espaciado entre líneas para legibilidad */

  strong {
    color: #4c3e34; /* Un marrón oscuro sutil para énfasis */
  }

  strong:last-child {
    color: #4682B4; /* Un toque de azul pastel para "color blanco", un guiño al género */
  }
`;

const DetailsBox = styled.div`
  font-size: 0.9rem;
  margin-bottom: 2.5rem; /* Más espacio */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 300; /* Más delgada */
  color: #a68974; /* Marrón claro */
`;

const ConfirmButton = styled.button`
  background: rgba(37, 211, 102, 0.7); /* Un verde más suave y transparente */
  color: white;
  border: none;
  padding: 1.2rem 2.5rem; /* Más acolchado lateral para aire */
  border-radius: 50px; /* Botón tipo píldora muy suave */
  width: auto; /* Ancho automático, no ocupa todo */
  max-width: 350px; /* Límite para que sea elegante */
  margin-top: 3rem; /* Muchísimo espacio arriba */
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.1); /* Sombra más tenue */
  transition: all 0.3s ease;
  &:hover {
    background: rgba(37, 211, 102, 0.9);
    transform: translateY(-2px);
  }
`;

const GiftButton = styled.button`
  background: none; /* Sin fondo sólido */
  border: 1px solid rgba(140, 106, 83, 0.2); /* Borde tenue marrón */
  border-radius: 50px; /* Píldora */
  color: #a68974; /* Marrón claro */
  padding: 1rem 2rem; /* Acolchado elegante */
  width: auto; /* No ocupa todo */
  max-width: 300px;
  margin: 10px auto; /* Centrado */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 300; /* Más delgada */
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(140, 106, 83, 0.4);
    transform: translateY(-2px);
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Más espacio entre los botones principales */
  margin-top: 3.5rem; /* Más espacio arriba */
`;

const ActionButton = styled.button`
  border: none;
  padding: 1.2rem 2rem; /* Más acolchado lateral */
  border-radius: 50px; /* Píldora suave */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  transition: all 0.2s;
  font-size: 0.9rem;
  letter-spacing: 1px;
`;

const BlueActionButton = styled(ActionButton)`
  background: #e1f1f8; /* Un azul pastel ultra suave */
  color: #4682B4; /* Un azul más fuerte para el texto */
  &:hover {
    background: #d4e8f1;
    transform: scale(1.02);
  }
`;

const PinkActionButton = styled(ActionButton)`
  background: #fdf1f4; /* Un rosa pastel ultra suave */
  color: #C08081; /* Un rosa más fuerte para el texto */
  &:hover {
    background: #fce8ee;
    transform: scale(1.02);
  }
`;

export default HomePage;

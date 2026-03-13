import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaClock, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
// Importación clave para evitar el rebote al votar. 
// Si da error de compilación, revisa que este archivo exista en tu proyecto.
import { setShowVotingScreen } from "../store/resultsSlice"; 

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({});

  // Configuración de la fecha del evento: 18 de Abril de 2026, 3:00 PM
  useEffect(() => {
    const eventDate = new Date("April 18, 2026 15:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({ days, hours });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVoteClick = () => {
    // 1. Limpiamos cualquier rastro de votos previos en el navegador
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    
    // 2. IMPORTANTE: Activamos el permiso para ver la pantalla de votos
    // Esto evita el "rebote" que te expulsaba de la página de votación.
    if (typeof setShowVotingScreen === 'function') {
      dispatch(setShowVotingScreen(true));
    }
    
    // 3. Navegamos a la votación
    navigate("/vote");
  };

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ContentCard>
        {/* ENCABEZADO PERSONALIZADO */}
        <HeaderSection>
          <NamesTitle>Valentina & Janppier</NamesTitle>
          <ColorsSubtitle>
            <ColorSpan color="#4682B4">Azul Acero</ColorSpan> o <ColorSpan color="#C08081">Rosa Viejo</ColorSpan>
          </ColorsSubtitle>
          <Divider />
        </HeaderSection>

        {/* CONTADOR DE DÍAS (CUENTA REGRESIVA) */}
        <CountdownSection>
          <FaClock style={{ marginBottom: '10px', color: '#ccc' }} />
          {timeLeft.expired ? (
            <CountdownText>¡Llegó el gran día!</CountdownText>
          ) : (
            <CountdownText>
              Faltan <span>{timeLeft.days}</span> días y <span>{timeLeft.hours}</span> horas
            </CountdownText>
          )}
        </CountdownSection>

        {/* SECCIÓN DE VIDEO Y DETALLES */}
        <MainContent>
          <PhotoWrapper
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* VIDEO: autoPlay, loop, muted para reproducción automática en móviles */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="https://via.placeholder.com/400x500?text=Cargando+Video..."
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              {/* Ruta directa a la carpeta public */}
              <source src="/revelacion.mp4" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </PhotoWrapper>

          {/* NUEVOS TEXTOS DE INVITACIÓN */}
          <InvitationText>
            <FaHeart style={{ color: '#ff6b6b', marginRight: '8px' }} />
            Esta es una invitación de parte de los tíos <strong>Samuel y Sara</strong> para conocer el sexo del bebé de...
          </InvitationText>

          <DressCodeBox>
            <p>
              <strong style={{ color: '#4682B4' }}>Si crees que es niño:</strong> lleva una prenda azul.
            </p>
            <p style={{ marginTop: '8px' }}>
              <strong style={{ color: '#C08081' }}>Si crees que es niña:</strong> lleva una prenda rosada.
            </p>
          </DressCodeBox>

          <DetailsBox>
            <DetailItem>
              <FaMapMarkerAlt />
              <div>
                <strong>Lugar del Evento:</strong>
                <p>La Calera, Cundinamarca</p>
                <p>18 de Abril - 3:00 PM</p>
              </div>
            </DetailItem>
          </DetailsBox>

          {/* BOTÓN CÓMO LLEGAR (Link genérico, cámbialo por el real) */}
          <LocationButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open("https://maps.app.goo.gl/ZbW4X6uM6uM6uM6u6", "_blank")}
          >
            <FaMapMarkerAlt size={16} />
            CÓMO LLEGAR (WAZE / MAPS)
          </LocationButton>
        </MainContent>

        {/* BOTONES DE ACCIÓN */}
        <ActionsGrid>
          <ActionButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            gradient="linear-gradient(135deg, #4682B4, #2c5272)"
            onClick={handleVoteClick}
          >
            <FaVoteYea size={24} />
            <span>VOTAR AHORA</span>
          </ActionButton>

          <ActionButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            gradient="linear-gradient(135deg, #C08081, #8a5a5b)"
            onClick={() => navigate("/results")}
          >
            <FaChartBar size={24} />
            <span>RESULTADOS</span>
          </ActionButton>
        </ActionsGrid>
      </ContentCard>
    </HomeContainer>
  );
};

// --- ESTILOS (Añádelos abajo del componente) ---

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #0f0f0f; /* Fondo oscuro */
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 2.5rem 1.5rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

const HeaderSection = styled.div`
  margin-bottom: 1.5rem;
`;

const NamesTitle = styled.h1`
  font-family: 'serif';
  font-size: clamp(1.8rem, 7vw, 2.8rem);
  color: white;
  margin-bottom: 0.5rem;
`;

const ColorsSubtitle = styled.p`
  font-size: 1.1rem;
  color: #aaa;
`;

const ColorSpan = styled.span`
  color: ${props => props.color};
  font-weight: bold;
`;

const CountdownSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
`;

const CountdownText = styled.p`
  color: white;
  font-size: 1.1rem;
  span {
    color: #4682B4;
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #444, transparent);
  margin: 15px 0;
`;

const MainContent = styled.div`
  margin-bottom: 2rem;
`;

const PhotoWrapper = styled(motion.div)`
  width: 100%;
  max-width: 280px;
  height: 350px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InvitationText = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  padding: 0 10px;
  
  strong {
    color: white;
    font-weight: 600;
  }
`;

const DressCodeBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.95rem;
  color: #eee;
  text-align: left;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
`;

const DetailsBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 15px;
  color: white;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: left;
  svg { color: #4682B4; font-size: 1.3rem; }
  strong { display: block; font-size: 0.9rem; }
  p { margin: 0; color: #888; font-size: 0.85rem; }
`;

const LocationButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: #4682B4;
  border: 1px solid #4682B4;
  padding: 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: #4682B4;
    color: white;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 1rem;
  background: ${props => props.gradient};
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export default HomePage;

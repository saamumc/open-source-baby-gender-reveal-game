import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaVoteYea, FaChartBar, FaMapMarkerAlt, FaClock, FaHeart, FaWhatsapp, FaBabyCarriage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
import { setShowVotingScreen } from "../store/resultsSlice";

// IMPORTACIÓN DEL VIDEO DESDE TU CARPETA SCREENSHOTS
import videoRevelacion from "../screenshots/revelacion.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({});

  // CONFIGURACIÓN WHATSAPP
  const whatsappNumber = "573196911965"; 
  const message = encodeURIComponent("¡Hola Samuel y Sara! Confirmo mi asistencia a la revelación de sexo de Valentina y Janppier. ¡Ahí estaremos!");

  // CONFIGURACIÓN DEL CONTADOR (18 DE ABRIL)
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
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    dispatch(setShowVotingScreen(true));
    navigate("/vote");
  };

  return (
    <HomeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <ContentCard>
        <HeaderSection>
          <NamesTitle>Valentina & Janppier</NamesTitle>
          <ColorsSubtitle>
            <ColorSpan color="#4682B4">Azul Acero</ColorSpan> o <ColorSpan color="#C08081">Rosa Viejo</ColorSpan>
          </ColorsSubtitle>
          <Divider />
        </HeaderSection>

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

        <MainContent>
          <PhotoWrapper whileHover={{ scale: 1.02 }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={videoRevelacion} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </PhotoWrapper>

          <InvitationText>
            <FaHeart style={{ color: '#ff6b6b', marginRight: '8px' }} />
            Esta es una invitación de parte de los tíos <strong>Samuel y Sara</strong> para conocer el sexo del bebé de Valentina y Janppier.
          </InvitationText>

          <DressCodeBox>
            <p><strong style={{ color: '#4682B4' }}>Si crees que es niño:</strong> lleva una prenda azul.</p>
            <p style={{ marginTop: '8px' }}><strong style={{ color: '#C08081' }}>Si crees que es niña:</strong> lleva una prenda rosada.</p>
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

          {/* BOTÓN DE QUÉ TRAER */}
          <GiftButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/traer")}
          >
            <FaBabyCarriage size={20} />
            ¿QUÉ TRAER?
          </GiftButton>

          {/* BOTÓN DE WHATSAPP PARA CONFIRMAR */}
          <ConfirmButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")}
          >
            <FaWhatsapp size={20} />
            CONFIRMAR ASISTENCIA
          </ConfirmButton>
        </MainContent>

        <ActionsGrid>
          <ActionButton 
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            gradient="linear-gradient(135deg, #4682B4, #2c5272)" 
            onClick={handleVoteClick}
          >
            <FaVoteYea size={24} />
            <span>VOTAR AHORA</span>
          </ActionButton>
          
          <ActionButton 
            as={motion.button}
            whileHover={{ scale: 1.05 }}
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

// --- ESTILOS ---
const HomeContainer = styled(motion.div)`
  display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 2rem 1rem; background: #0f0f0f;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 30px; padding: 2.5rem 1.5rem; width: 100%; max-width: 500px; text-align: center; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
`;

const HeaderSection = styled.div` margin-bottom: 1.5rem; `;
const NamesTitle = styled.h1` font-family: serif; font-size: 2.5rem; color: white; margin: 0; `;
const ColorsSubtitle = styled.p` color: #aaa; margin-top: 5px; `;
const ColorSpan = styled.span` color: ${props => props.color}; font-weight: bold; `;
const Divider = styled.hr` border: 0; height: 1px; background: linear-gradient(to right, transparent, #444, transparent); margin: 15px 0; `;

const CountdownSection = styled.div` background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 15px; margin-bottom: 2rem; border: 1px dashed #444; `;
const CountdownText = styled.p` color: white; font-size: 1.1rem; span { color: #4682B4; font-size: 1.4rem; font-weight: bold; } `;

const MainContent = styled.div` margin-bottom: 2rem; `;
const PhotoWrapper = styled(motion.div)` width: 100%; max-width: 280px; height: 350px; margin: 0 auto 1.5rem; border-radius: 20px; overflow: hidden; border: 3px solid #333; `;

const InvitationText = styled.p` color: #ccc; margin-bottom: 1.5rem; line-height: 1.4; padding: 0 10px; strong { color: white; } `;

const DressCodeBox = styled.div` background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 15px; margin-bottom: 1rem; border: 1px solid #333; text-align: left; font-size: 0.9rem; `;

const DetailsBox = styled.div` background: #1a1a1a; padding: 1rem; border-radius: 15px; color: white; margin-bottom: 10px; border: 1px solid #333; `;
const DetailItem = styled.div` display: flex; align-items: center; justify-content: center; gap: 10px; text-align: left; svg { color: #4682B4; } p { margin: 0; color: #888; font-size: 0.8rem; } `;

const GiftButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 1.1rem; border-radius: 15px; font-weight: bold; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px;
`;

const ConfirmButton = styled(motion.button)`
  background: #25D366; color: white; border: none; padding: 1.1rem; border-radius: 15px; font-weight: bold; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
`;

const ActionsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; `;
const ActionButton = styled.button` display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 1rem; background: ${props => props.gradient}; color: white; border: none; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 0.85rem; `;

export default HomePage;

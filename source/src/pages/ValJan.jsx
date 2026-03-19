import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const votesRef = ref(db, "userVotes");
    
    const unsubscribe = onValue(votesRef, (snapshot) => {
      setLoading(true);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            name: item.name || item.Name || item.nombre || "Invitado Especial",
            text: item.message || item.mensaje || "",
            gender: item.selectedGender || item.gender || "unknown"
          };
        })
        .filter(v => v.name !== "Invitado Especial" || v.text.length > 0)
        .reverse();
        
        setMessages(list);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PageWrapper>
      <AnimatedBackground />
      
      <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Header>
          <MainTitle>Valentina <span>&</span> Janppier</MainTitle>
          <SubTitle>Libro de visitas y apuestas</SubTitle>
        </Header>

        <MessageGrid>
          {messages.length > 0 ? (
            messages.map((m) => (
              <Card key={m.id} gender={m.gender} whileHover={{ y: -5 }}>
                <UserHeader>
                  <Avatar gender={m.gender}>
                    {m.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <UserInfo>
                    <Name>{m.name}</Name>
                    <VoteBadge gender={m.gender}>
                      {m.gender === "boy" ? "Apuesta: NIÑO 🧸" : "Apuesta: NIÑA 🎀"}
                    </VoteBadge>
                  </UserInfo>
                </UserHeader>
                
                <MessageBody>
                  {m.text ? (
                    <Text>"{m.text}"</Text>
                  ) : (
                    <NoText>Dejó su apuesta con mucho cariño ✨</NoText>
                  )}
                </MessageBody>
              </Card>
            ))
          ) : (
            <NoMessages>
              {loading ? "Cargando mensajes..." : "Aún no hay mensajes. ¡Sé el primero!"}
            </NoMessages>
          )}
        </MessageGrid>
      </Container>
    </PageWrapper>
  );
};

// --- ESTILOS CRISTALINOS ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: transparent;
  position: relative;
`;

const Container = styled(motion.div)`
  padding: 3rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-family: 'Georgia', serif;
  color: #5d4a3e;
  font-size: 2.2rem;
  margin: 0;
  font-weight: 400;
  span {
    color: rgba(93, 74, 62, 0.3);
    font-size: 1.8rem;
  }
`;

const SubTitle = styled.p`
  color: #7a6352;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
  font-weight: 700;
`;

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
`;

const Card = styled(motion.div)`
  /* Transparencia para ver los ositos de fondo */
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  border-radius: 25px;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  /* Indicador lateral sutil */
  border-left: 5px solid ${props => props.gender === 'boy' ? 'rgba(193, 227, 245, 0.5)' : 'rgba(245, 193, 208, 0.5)'};
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  background: ${props => props.gender === 'boy' ? '#c1e3f5' : '#f5c1d0'};
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Name = styled.span`
  font-weight: 800;
  color: #5d4a3e;
  font-size: 0.95rem;
  text-transform: capitalize;
`;

const VoteBadge = styled.span`
  font-size: 0.65rem;
  color: #7a6352;
  font-weight: 700;
  opacity: 0.8;
  text-transform: uppercase;
`;

const MessageBody = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 12px;
  border-radius: 15px;
  flex-grow: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Text = styled.p`
  color: #4a3b30;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
  font-size: 0.85rem;
`;

const NoText = styled.p`
  color: rgba(122, 99, 82, 0.4);
  font-size: 0.75rem;
  margin: 0;
`;

const NoMessages = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: #7a6352;
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 600;
`;

export default ValJan;

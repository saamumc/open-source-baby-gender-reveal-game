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
          <MainTitle>Valentina & Janppier</MainTitle>
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
                      {m.gender === "boy" ? "Apuesta por: NIÑO 🧸" : "Apuesta por: NIÑA 🎀"}
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

// --- ESTILOS 98% TRANSPARENTES ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow-x: hidden;
`;

const Container = styled(motion.div)`
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const MainTitle = styled.h1`
  font-family: 'Georgia', serif;
  color: #5d4a3e;
  font-size: 2.8rem;
  margin: 0;
  font-weight: 400;
`;

const SubTitle = styled.p`
  color: #7a6352;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-top: 0.8rem;
`;

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const Card = styled(motion.div)`
  /* Transparencia extrema para ver los ositos */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  border-radius: 30px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  
  /* Indicador de género sutil en el borde superior */
  border-top: 4px solid ${props => props.gender === 'boy' ? 'rgba(137, 207, 240, 0.5)' : 'rgba(255, 182, 193, 0.5)'};
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  background: ${props => props.gender === 'boy' ? 'rgba(137, 207, 240, 0.8)' : 'rgba(255, 182, 193, 0.8)'};
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Name = styled.span`
  font-weight: 700;
  color: #5d4a3e;
  font-size: 1.05rem;
  text-transform: capitalize;
`;

const VoteBadge = styled.span`
  font-size: 0.7rem;
  color: #7a6352;
  font-weight: 600;
  opacity: 0.8;
`;

const MessageBody = styled.div`
  /* Fondo del mensaje semi-transparente */
  background: rgba(255, 255, 255, 0.2);
  padding: 18px;
  border-radius: 20px;
  flex-grow: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Text = styled.p`
  color: #4a3b30;
  font-style: italic;
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const NoText = styled.p`
  color: rgba(122, 99, 82, 0.5);
  font-size: 0.85rem;
  margin: 0;
`;

const NoMessages = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px;
  color: #7a6352;
  font-size: 1.1rem;
  font-style: italic;
`;

export default ValJan;


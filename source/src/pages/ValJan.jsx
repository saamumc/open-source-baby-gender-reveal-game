import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const votesRef = ref(db, "votes");
    onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convertimos el objeto en array y filtramos los que tengan texto
        const list = Object.values(data)
          .filter((v) => v.message && v.message.trim() !== "")
          .reverse(); // Los más nuevos arriba
        setMessages(list);
      }
    });
  }, []);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header>
        <h1>Para Valentina & Janppier</h1>
        <p>Mensajes llenos de amor de sus invitados</p>
      </Header>

      <MessageGrid>
        {messages.map((m, i) => (
          <Card key={i} gender={m.gender} whileHover={{ scale: 1.02 }}>
            <Badge gender={m.gender}>
              {m.gender === "boy" ? "Votó por NIÑO 🧸" : "Votó por NIÑA 🎀"}
            </Badge>
            <Text>"{m.message}"</Text>
            <Time>Enviado con amor</Time>
          </Card>
        ))}
      </MessageGrid>
      
      {messages.length === 0 && (
        <NoMessages>Aún no han llegado mensajes. ¡Pronto se llenará!</NoMessages>
      )}
    </Container>
  );
};

// --- ESTILOS ---
const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.2rem; }
  p { color: #a68974; font-style: italic; }
`;

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-left: 8px solid ${props => props.gender === 'boy' ? '#A3C1AD' : '#F4C2C2'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Badge = styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${props => props.gender === 'boy' ? '#5D7E69' : '#C08081'};
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Text = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 10px 0;
  font-family: 'Courier New', Courier, monospace;
`;

const Time = styled.span`
  font-size: 0.8rem;
  color: #bbb;
  text-align: right;
`;

const NoMessages = styled.p`
  text-align: center;
  color: #a68974;
  margin-top: 50px;
`;

export default ValJan;

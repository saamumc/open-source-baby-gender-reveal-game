import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const votesRef = ref(db, "votes");
      const unsubscribe = onValue(votesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convertimos el objeto en array de forma segura
          const list = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))
          .filter((v) => v.message && v.message.trim() !== "")
          .reverse(); 
          
          setMessages(list);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error en Firebase:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error de inicialización:", err);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Header><h1>Cargando mensajes...</h1></Header>
      </Container>
    );
  }

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header>
        <h1>Para Valentina & Janppier</h1>
        <p>Mensajes llenos de amor de sus invitados</p>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <Card key={m.id || i} gender={m.gender} whileHover={{ scale: 1.02 }}>
              <Badge gender={m.gender}>
                {m.gender === "boy" ? "Votó por NIÑO 🧸" : "Votó por NIÑA 🎀"}
              </Badge>
              <Text>"{m.message}"</Text>
              <Time>Recibido</Time>
            </Card>
          ))
        ) : (
          <NoMessagesCard>
            <p>Aún no han llegado mensajes.</p>
            <p>¡Pronto aparecerán aquí!</p>
          </NoMessagesCard>
        )}
      </MessageGrid>
    </Container>
  );
};

// --- ESTILOS ---
const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  z-index: 20; /* Aseguramos que esté sobre el fondo */
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.2rem; margin-bottom: 10px; }
  p { color: #a68974; font-style: italic; }
`;

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-left: 8px solid ${props => props.gender === 'boy' ? '#A3C1AD' : '#F4C2C2'};
  display: flex;
  flex-direction: column;
`;

const Badge = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${props => props.gender === 'boy' ? '#5D7E69' : '#C08081'};
  margin-bottom: 15px;
`;

const Text = styled.p`
  color: #444;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 15px;
  font-style: italic;
`;

const Time = styled.span`
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  margin-top: auto;
`;

const NoMessagesCard = styled.div`
  grid-column: 1 / -1;
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: #8c6a53;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

export default ValJan;


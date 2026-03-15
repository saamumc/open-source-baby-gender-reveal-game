import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const votesRef = ref(db, "votes");
    const unsubscribe = onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Convertimos el objeto en array y buscamos el mensaje
        const list = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            // Buscamos 'message' o 'mensaje' (por si acaso)
            message: item.message || item.mensaje || "",
            gender: item.gender || item.voto || "unknown"
          };
        })
        // Solo mostramos los que tengan algo de texto escrito
        .filter((v) => v.message.trim() !== "")
        .reverse(); 
        
        setMessages(list);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Container><Header><h1>Cargando mensajes...</h1></Header></Container>;

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header>
        <h1>Para Valentina & Janppier</h1>
        <p>Mensajes llenos de amor de sus invitados</p>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card key={m.id} gender={m.gender} whileHover={{ scale: 1.02 }}>
              <Badge gender={m.gender}>
                {m.gender === "boy" ? "Votó por NIÑO 🧸" : m.gender === "girl" ? "Votó por NIÑA 🎀" : "Votó"}
              </Badge>
              <Text>"{m.message}"</Text>
              <Time>Recibido ✨</Time>
            </Card>
          ))
        ) : (
          <NoMessagesCard>
            <p>Aún no hay mensajes con texto.</p>
            <p>Asegúrate de escribir algo en el campo de mensaje al votar.</p>
          </NoMessagesCard>
        )}
      </MessageGrid>
    </Container>
  );
};

// --- ESTILOS ---
const Container = styled(motion.div)`
  padding: 2rem; max-width: 900px; margin: 0 auto; min-height: 100vh; position: relative; z-index: 20;
`;
const Header = styled.div`
  text-align: center; margin-bottom: 3rem;
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.2rem; }
  p { color: #a68974; font-style: italic; }
`;
const MessageGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;
`;
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 25px; border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 8px solid ${props => 
    props.gender === 'boy' ? '#A3C1AD' : props.gender === 'girl' ? '#F4C2C2' : '#ddd'};
`;
const Badge = styled.span`
  font-size: 0.75rem; font-weight: bold; margin-bottom: 15px; display: block;
  color: ${props => props.gender === 'boy' ? '#5D7E69' : '#C08081'};
`;
const Text = styled.p` color: #444; font-size: 1.1rem; line-height: 1.5; font-style: italic; `;
const Time = styled.span` font-size: 0.7rem; color: #999; margin-top: 15px; display: block; `;
const NoMessagesCard = styled.div`
  grid-column: 1 / -1; background: white; padding: 40px; border-radius: 20px; text-align: center; color: #8c6a53;
`;

export default ValJan;

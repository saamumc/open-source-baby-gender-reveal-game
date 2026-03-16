import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const votesRef = ref(db, "userVotes");
    
    const unsubscribe = onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const list = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            name: item.name || "Invitado Anónimo", // Mostramos el nombre guardado
            text: item.message || "",
            gender: item.selectedGender || "unknown"
          };
        })
        // Opcional: Si quieres mostrar TODOS aunque no dejen mensaje, quita el filter.
        // Aquí lo dejo para que muestre solo a los que escribieron algo.
        .filter(v => v.text && v.text.toString().trim().length > 0)
        .reverse();
        
        setMessages(list);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header>
        <h1>Valentina & Janppier</h1>
        <p>¿Quiénes han dejado sus apuestas y mensajes?</p>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card key={m.id} gender={m.gender}>
              <UserInfo>
                <Name>{m.name}</Name>
                <Badge gender={m.gender}>
                  {m.gender === "boy" ? "Cree que es NIÑO 🧸" : "Cree que es NIÑA 🎀"}
                </Badge>
              </UserInfo>
              <QuoteIcon>“</QuoteIcon>
              <Text>{m.text}</Text>
            </Card>
          ))
        ) : (
          <NoMessages>
            {loading ? <p>Cargando mensajes...</p> : (
              <>
                <p>Aún no hay mensajes con nombres.</p>
                <p style={{fontSize: '0.8rem', marginTop: '10px', fontWeight: 'normal'}}>
                  Los votos nuevos aparecerán aquí con el nombre del invitado.
                </p>
              </>
            )}
          </NoMessages>
        )}
      </MessageGrid>
    </Container>
  );
};

// --- ESTILOS ACTUALIZADOS ---

const Container = styled(motion.div)` 
  padding: 2rem 1rem; 
  max-width: 1000px; 
  margin: 0 auto; 
  min-height: 100vh; 
  position: relative; 
  z-index: 10; 
`;

const Header = styled.div` 
  text-align: center; 
  margin-bottom: 3rem; 
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.5rem; } 
  p { color: #a68974; font-size: 1.2rem; } 
`;

const MessageGrid = styled.div` 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 25px; 
`;

const Card = styled.div` 
  background: rgba(255, 255, 255, 0.9); 
  padding: 25px; 
  border-radius: 25px; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.05); 
  border-top: 8px solid ${props => props.gender === 'boy' ? '#89CFF0' : '#FFB6C1'}; 
  position: relative;
  transition: transform 0.2s;
  &:hover { transform: translateY(-5px); }
`;

const UserInfo = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px dashed #d9c7b8;
  padding-bottom: 10px;
`;

const Name = styled.h3`
  color: #8c6a53;
  margin: 0;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Badge = styled.span` 
  font-size: 0.75rem; 
  font-weight: bold; 
  color: ${props => props.gender === 'boy' ? '#5da9cd' : '#e08da0'}; 
  display: block; 
  margin-top: 4px;
`;

const QuoteIcon = styled.span`
  font-size: 3rem;
  color: rgba(140, 106, 83, 0.1);
  position: absolute;
  top: 60px;
  left: 20px;
  font-family: serif;
`;

const Text = styled.p` 
  color: #555; 
  font-style: italic; 
  font-size: 1.05rem; 
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const NoMessages = styled.div` 
  grid-column: 1 / -1; 
  text-align: center; 
  padding: 60px; 
  color: #8c6a53; 
  background: rgba(255,255,255,0.5);
  border-radius: 30px;
`;

export default ValJan;

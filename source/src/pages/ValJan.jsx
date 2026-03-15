import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CAMBIO IMPORTANTE: Ahora lee de 'userVotes' como en tu imagen
    const votesRef = ref(db, "userVotes");
    
    const unsubscribe = onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const list = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            // Buscamos el mensaje (si es que existe)
            text: item.message || item.mensaje || "",
            gender: item.selectedGender || "unknown"
          };
        })
        // Solo mostramos los que SI tengan un mensaje escrito
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
        <p>Mensajes de amor para el bebé</p>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card key={m.id} gender={m.gender}>
              <Badge gender={m.gender}>
                {m.gender === "boy" ? "Votó por NIÑO 🧸" : "Votó por NIÑA 🎀"}
              </Badge>
              <Text>"{m.text}"</Text>
            </Card>
          ))
        ) : (
          <NoMessages>
            <p>Aún no hay mensajes.</p>
            <p style={{fontSize: '0.8rem', marginTop: '10px', fontWeight: 'normal'}}>
              Nota: Los votos anteriores no tenían mensaje. ¡Prueba haciendo uno nuevo!
            </p>
          </NoMessages>
        )}
      </MessageGrid>
    </Container>
  );
};

const Container = styled(motion.div)` padding: 2rem 1rem; max-width: 900px; margin: 0 auto; min-height: 100vh; position: relative; z-index: 10; `;
const Header = styled.div` text-align: center; margin-bottom: 2rem; h1 { font-family: 'Georgia', serif; color: #8c6a53; } p { color: #a68974; } `;
const MessageGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; `;
const Card = styled.div` background: white; padding: 20px; border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-left: 10px solid ${props => props.gender === 'boy' ? '#89CFF0' : '#FFB6C1'}; `;
const Badge = styled.span` font-size: 0.7rem; font-weight: bold; color: #8c6a53; display: block; margin-bottom: 10px; `;
const Text = styled.p` color: #555; font-style: italic; font-size: 1.1rem; `;
const NoMessages = styled.div` grid-column: 1 / -1; text-align: center; padding: 40px; color: #8c6a53; font-weight: bold; `;

export default ValJan;

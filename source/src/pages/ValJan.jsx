import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    const votesRef = ref(db, "votes");
    
    onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Convertimos el objeto en array de forma ultra-flexible
        const list = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            // Buscamos el mensaje en cualquier variante de nombre
            text: item.message || item.mensaje || item.text || "",
            gender: item.gender || "unknown"
          };
        })
        // Filtramos para que SOLO aparezcan los que escribieron algo
        .filter(v => v.text && v.text.toString().trim().length > 0)
        .reverse(); // Los más nuevos arriba
        
        setMessages(list);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error en Firebase:", error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header>
        <h1>Valentina & Janppier</h1>
        <p>Libro de mensajes de los invitados</p>
        <RefreshButton onClick={fetchMessages}>
          {loading ? "Cargando..." : "🔄 Actualizar Mensajes"}
        </RefreshButton>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card key={m.id} gender={m.gender} whileHover={{ scale: 1.02 }}>
              <Badge gender={m.gender}>
                {m.gender === "boy" ? "Votó por NIÑO 🧸" : "Votó por NIÑA 🎀"}
              </Badge>
              <Text>"{m.text}"</Text>
              <FooterCard>Recibido con amor ✨</FooterCard>
            </Card>
          ))
        ) : (
          <NoMessages>
            {!loading && (
              <>
                <p>Todavía no hay mensajes guardados.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                  Asegúrate de escribir en el cuadro de texto antes de dar clic en "Confirmar apuesta".
                </p>
              </>
            )}
          </NoMessages>
        )}
      </MessageGrid>
    </Container>
  );
};

// --- ESTILOS ---
const Container = styled(motion.div)`
  padding: 2rem 1rem; max-width: 900px; margin: 0 auto; min-height: 100vh; position: relative; z-index: 30;
`;

const Header = styled.div`
  text-align: center; margin-bottom: 2rem;
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.2rem; }
  p { color: #a68974; font-style: italic; margin-bottom: 20px; }
`;

const RefreshButton = styled.button`
  background: white; border: 1px solid #d9c7b8; padding: 8px 16px; border-radius: 20px;
  color: #8c6a53; font-size: 0.8rem; cursor: pointer; font-weight: bold;
  &:hover { background: #fdfaf7; }
`;

const MessageGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;
`;

const Card = styled(motion.div)`
  background: white; padding: 25px; border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 5px solid ${props => 
    props.gender === 'boy' ? '#89CFF0' : props.gender === 'girl' ? '#FFB6C1' : '#d9c7b8'};
`;

const Badge = styled.span`
  font-size: 0.7rem; font-weight: bold; display: block; margin-bottom: 12px;
  color: ${props => props.gender === 'boy' ? '#4682B4' : '#C08081'};
`;

const Text = styled.p`
  color: #555; font-size: 1.1rem; line-height: 1.5; font-family: 'Courier New', Courier, monospace;
`;

const FooterCard = styled.div`
  margin-top: 15px; font-size: 0.7rem; color: #bbb; text-align: right;
`;

const NoMessages = styled.div`
  grid-column: 1 / -1; text-align: center; padding: 50px; background: rgba(255,255,255,0.5);
  border-radius: 20px; color: #8c6a53; font-weight: bold;
`;

export default ValJan;

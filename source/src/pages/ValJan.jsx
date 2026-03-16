import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";

const ValJan = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referencia al nodo donde están todos los votos
    const votesRef = ref(db, "userVotes");
    
    const unsubscribe = onValue(votesRef, (snapshot) => {
      setLoading(true);
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Convertimos el objeto de Firebase en un Array
        const list = Object.keys(data).map(key => {
          const item = data[key];
          
          // Debug para ver qué llega exactamente (puedes verlo en F12)
          console.log("Voto recibido:", item);

          return {
            id: key,
            // Buscamos 'name' con minúscula, 'Name' con mayúscula o 'nombre'
            name: item.name || item.Name || item.nombre || "Invitado Especial",
            text: item.message || item.mensaje || "",
            gender: item.selectedGender || item.gender || "unknown"
          };
        })
        // Filtramos para mostrar solo los que tengan nombre o mensaje
        .filter(v => v.name !== "Invitado Especial" || v.text.length > 0)
        .reverse(); // Los más nuevos arriba
        
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
        <p>Libro de visitas y apuestas</p>
      </Header>

      <MessageGrid>
        {messages.length > 0 ? (
          messages.map((m) => (
            <Card key={m.id} gender={m.gender}>
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
                  <NoText>Solo dejó su apuesta ✨</NoText>
                )}
              </MessageBody>
            </Card>
          ))
        ) : (
          <NoMessages>
            {loading ? "Cargando apuestas..." : "Esperando los primeros votos..."}
          </NoMessages>
        )}
      </MessageGrid>
    </Container>
  );
};

// --- ESTILOS ---

const Container = styled(motion.div)`
  padding: 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 { font-family: 'Georgia', serif; color: #8c6a53; font-size: 2.5rem; margin-bottom: 0.5rem; }
  p { color: #a68974; font-size: 1.1rem; }
`;

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  border-bottom: 6px solid ${props => props.gender === 'boy' ? '#89CFF0' : '#FFB6C1'};
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  background: ${props => props.gender === 'boy' ? '#89CFF0' : '#FFB6C1'};
  font-size: 1.2rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: bold;
  color: #8c6a53;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const VoteBadge = styled.span`
  font-size: 0.75rem;
  color: #a68974;
  font-weight: 600;
`;

const MessageBody = styled.div`
  background: #fdfaf8;
  padding: 15px;
  border-radius: 12px;
  flex-grow: 1;
`;

const Text = styled.p`
  color: #555;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
`;

const NoText = styled.p`
  color: #ccc;
  font-size: 0.85rem;
  margin: 0;
`;

const NoMessages = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 50px;
  color: #a68974;
`;

export default ValJan;

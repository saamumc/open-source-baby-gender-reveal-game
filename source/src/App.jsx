import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import WhatToBring from "./pages/WhatToBring";
import ControlPanel from "./pages/ControlPanel";

// CORRECCIÓN: Asegúrate de que el nombre (db o database) coincida con tu config
import { db } from "./firebase/config"; 
import { ref, onValue } from "firebase/database";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Excluir rutas administrativas o informativas
    if (location.pathname === "/control-panel" || location.pathname === "/traer") {
      return;
    }

    // Referencia a los ajustes de resultados/estado del juego
    const resultsRef = ref(db, "results");
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Si el juego no ha empezado y el usuario intenta entrar a votar, se devuelve al inicio
        if (data.showVotingScreen === false && location.pathname === "/vote") {
            console.log("Acceso a votación restringido: El juego no ha iniciado.");
            navigate("/");
        }
      }
    }, (error) => {
      console.error("Error conectando con Firebase:", error);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  return (
    <AppContainer>
      <AnimatedBackground />
      <FloatingIconsWrapper>
        <FloatingIcons />
      </FloatingIconsWrapper>

      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/control-panel" element={<ControlPanel />} />
          <Route path="/traer" element={<WhatToBring />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

// --- ESTILOS ---
const AppContainer = styled.div`
  min-height: 100vh; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  padding: 1rem; 
  position: relative; 
  overflow: hidden; 
  background: #F9F6F1; // Cambiado a un tono crema acorde al Baby Shower
  color: #333;
`;

const MainContent = styled.div` 
  width: 100%; 
  max-width: 800px; 
  z-index: 10; 
  position: relative; 
  margin: 0 auto; 
`;

const FloatingIconsWrapper = styled.div` 
  position: fixed; 
  top: 0; left: 0; right: 0; bottom: 0; 
  z-index: 5; 
  pointer-events: none; 
`;

export default App;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import WhatToBring from "./pages/WhatToBring";
import ControlPanel from "./pages/ControlPanel";

import { db } from "./firebase/config"; 
import { ref, onValue } from "firebase/database";
import { updateResults } from "./store/resultsSlice";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Este estado evita que la app te obligue a quedarte en resultados si quieres volver al inicio
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);
  
  useEffect(() => {
    const resultsRef = ref(db, "results");
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // 1. Sincronizamos con Redux
        dispatch(updateResults(data));

        // 2. LÓGICA DE NAVEGACIÓN PROTEGIDA
        // Si estamos en el panel, en "qué traer" O VOTANDO, no interrumpimos al usuario
        if (
          location.pathname === "/control-panel" || 
          location.pathname === "/traer" || 
          location.pathname === "/vote"
        ) {
          return;
        }

        // --- SALTO INTELIGENTE A RESULTADOS ---
        // Solo redirige si el admin activa resultados y el usuario NO está en la página de votos
        if (data.showResultPage === true && !hasAutoRedirected) {
            setHasAutoRedirected(true); 
            if (location.pathname !== "/results") {
              navigate("/results");
            }
        }

        // Si el admin apaga los resultados, reseteamos el candado para la próxima activación
        if (data.showResultPage === false && hasAutoRedirected) {
            setHasAutoRedirected(false);
        }

        // --- CIERRE DE SEGURIDAD PARA VOTACIÓN ---
        // Solo sacamos al usuario de /vote si el admin explícitamente cierra la pantalla de votación
        if (data.showVotingScreen === false && location.pathname === "/vote") {
            navigate("/");
        }
      }
    }, (error) => {
      console.error("Error conectando con Firebase:", error);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate, dispatch, hasAutoRedirected]);

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
  background: #F9F6F1; 
  color: #333;
`;

const MainContent = styled.div` 
  width: 100%; 
  max-width: 800px; 
  z-index: 10; 
  position: relative; 
  margin: 0 auto; 
  background: transparent;
`;

const FloatingIconsWrapper = styled.div` 
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  z-index: 5; 
  pointer-events: none; 
`;

export default App;


import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"; // <--- IMPORTANTE
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import WhatToBring from "./pages/WhatToBring";
import ControlPanel from "./pages/ControlPanel";

import { db } from "./firebase/config"; 
import { ref, onValue } from "firebase/database";
import { updateResults } from "./store/resultsSlice"; // <--- IMPORTANTE: Importa la acción corregida

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // <--- Inicializamos el disparador de Redux
  
  useEffect(() => {
    // Referencia al nodo principal de resultados en Firebase
    const resultsRef = ref(db, "results");
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // 1. ACTUALIZAR REDUX AL INSTANTE
        // Esto es lo que faltaba. Sin esto, Redux no se entera del cambio en la DB.
        dispatch(updateResults(data));

        // 2. LÓGICA DE NAVEGACIÓN
        if (location.pathname === "/control-panel" || location.pathname === "/traer") {
          return;
        }

        // Si el juego se cierra y el usuario está en /vote, lo sacamos
        if (data.showVotingScreen === false && location.pathname === "/vote") {
            console.log("Acceso a votación restringido.");
            navigate("/");
        }
      }
    }, (error) => {
      console.error("Error conectando con Firebase:", error);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate, dispatch]);

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

// --- ESTILOS (Sin cambios) ---
const AppContainer = styled.div`
  min-height: 100vh; display: flex; justify-content: center; align-items: center;
  padding: 1rem; position: relative; overflow: hidden; background: #F9F6F1; color: #333;
`;
const MainContent = styled.div` width: 100%; max-width: 800px; z-index: 10; position: relative; margin: 0 auto; `;
const FloatingIconsWrapper = styled.div` position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 5; pointer-events: none; `;

export default App;


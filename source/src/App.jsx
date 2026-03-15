import React, { useEffect } from "react";
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
  
  useEffect(() => {
    const resultsRef = ref(db, "results");
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // 1. Actualizamos el estado global (Redux)
        dispatch(updateResults(data));

        // 2. LÓGICA DE NAVEGACIÓN AUTOMÁTICA
        // Excluimos rutas administrativas para no interrumpir al admin
        if (location.pathname === "/control-panel" || location.pathname === "/traer") {
          return;
        }

        // --- SALTO A RESULTADOS ---
        // Si activas showResultPage en Firebase y el usuario NO está en results, lo mandamos
        if (data.showResultPage === true && location.pathname !== "/results") {
            console.log("¡Resultados activados! Redirigiendo a la revelación...");
            navigate("/results");
        }

        // --- REGRESO AL INICIO ---
        // Si apagas los resultados y el usuario sigue ahí, lo devolvemos al inicio
        if (data.showResultPage === false && location.pathname === "/results") {
            navigate("/");
        }

        // --- CIERRE DE VOTACIÓN ---
        // Si cierras la votación y el usuario está intentando votar, lo sacamos
        if (data.showVotingScreen === false && location.pathname === "/vote") {
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

// --- ESTILOS ---
const AppContainer = styled.div`
  min-height: 100vh; display: flex; justify-content: center; align-items: center;
  padding: 1rem; position: relative; overflow: hidden; background: #F9F6F1; color: #333;
`;
const MainContent = styled.div` width: 100%; max-width: 800px; z-index: 10; position: relative; margin: 0 auto; `;
const FloatingIconsWrapper = styled.div` position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 5; pointer-events: none; `;

export default App;

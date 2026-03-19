import React, { useEffect, useState, useRef } from "react";
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
import ValJan from "./pages/ValJan";

import { db } from "./firebase/config"; 
import { ref, onValue } from "firebase/database";
import { updateResults } from "./store/resultsSlice";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [firebaseData, setFirebaseData] = useState(null);
  const isInitialLoad = useRef(true);

  // --- EFECTO 1: SOLO ESCUCHA DATOS (Se ejecuta UNA vez) ---
  useEffect(() => {
    const resultsRef = ref(db, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(updateResults(data)); // Actualiza Redux
        setFirebaseData(data); // Guarda local para la lógica de navegación abajo
      }
    });
    return () => unsubscribe();
  }, [dispatch]); // Solo depende de dispatch, no de la ruta.

  // --- EFECTO 2: LÓGICA DE NAVEGACIÓN (Depende de los datos y la ruta) ---
  useEffect(() => {
    if (!firebaseData) return;

    const { showResultPage, showVotingScreen } = firebaseData;

    // Excepciones de navegación
    const isExceptionPage = [
      "/control-panel", 
      "/traer", 
      "/vote", 
      "/val-jan"
    ].includes(location.pathname);

    // Redirección automática a resultados si está activado globalmente
    if (showResultPage && !isExceptionPage && location.pathname !== "/results") {
      navigate("/results");
    }

    // Sacar de votación si se cerró el proceso
    if (showVotingScreen === false && location.pathname === "/vote") {
      navigate("/");
    }

  }, [firebaseData, location.pathname, navigate]);

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
          <Route path="/val-jan" element={<ValJan />} />
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

const MainContent = styled.div` 
  width: 100%; max-width: 800px; z-index: 10; position: relative; margin: 0 auto; background: transparent;
`;

const FloatingIconsWrapper = styled.div` 
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 5; pointer-events: none; 
`;

export default App;


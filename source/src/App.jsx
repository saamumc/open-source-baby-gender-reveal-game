import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
// Estas rutas ahora deben ser relativas a la carpeta source/src
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import { storage, STORAGE_KEYS } from "./utils/storage";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import WhatToBring from "./pages/WhatToBring";
import ControlPanel from "./pages/ControlPanel";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase/config";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Eliminamos showResultPage si no se usa para evitar errores de compilación
  
  useEffect(() => {
    if (location.pathname === "/control-panel" || location.pathname === "/traer") {
      return;
    }

    const resultsRef = ref(database, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.showGameStarted === false && location.pathname === "/vote") {
          navigate("/");
      }
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

const AppContainer = styled.div`
  min-height: 100vh; display: flex; justify-content: center; align-items: center;
  padding: 1rem; position: relative; overflow: hidden; background: #121212; color: white;
`;

const MainContent = styled.div` width: 100%; max-width: 800px; z-index: 10; position: relative; margin: 0 auto; `;
const FloatingIconsWrapper = styled.div` position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 5; pointer-events: none; `;

export default App;

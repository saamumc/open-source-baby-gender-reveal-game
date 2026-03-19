import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import WhatToBring from "./pages/WhatToBring";
import ControlPanel from "./pages/ControlPanel";
import ValJan from "./pages/ValJan";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extraemos el estado de Redux
  const { showResultPage, showVotingScreen, loading } = useSelector((state) => state.results);

  useEffect(() => {
    // CLAVE: Si todavía está cargando datos de Firebase, no redirigimos a nadie.
    if (loading) return;

    const path = location.pathname;

    // 1. ZONAS LIBRES: Aquí nadie es redirigido automáticamente.
    const isExcluded = [
      "/control-panel", 
      "/val-jan", 
      "/traer",
      "/" 
    ].includes(path);

    // 2. FLUJO DE REVELACIÓN (Results)
    if (showResultPage && !isExcluded && path !== "/results") {
      navigate("/results");
      return;
    }

    // Si se apaga la revelación y están en /results, los mandamos al Home
    if (!showResultPage && path === "/results") {
      navigate("/");
      return;
    }

    // 3. FLUJO DE VOTACIÓN (Protección)
    // Solo expulsamos si loading es false Y showVotingScreen es explícitamente false.
    if (showVotingScreen === false && path === "/vote") {
      navigate("/");
    }

  }, [showResultPage, showVotingScreen, loading, location.pathname, navigate]);

  // Pantalla de carga para evitar el parpadeo y errores de redirección inicial
  if (loading) {
    return (
      <AppContainer>
        <AnimatedBackground />
        <LoadingText>Preparando la fiesta...</LoadingText>
      </AppContainer>
    );
  }

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
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 5;
  pointer-events: none; 
`;

const LoadingText = styled.h3`
  color: #8c6a53;
  font-family: 'Georgia', serif;
  z-index: 100;
  text-align: center;
`;

export default App;

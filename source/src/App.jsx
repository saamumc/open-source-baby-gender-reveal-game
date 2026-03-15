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
import ValJan from "./pages/ValJan"; // Importado correctamente


import { db } from "./firebase/config"; 
import { ref, onValue } from "firebase/database";
import { updateResults } from "./store/resultsSlice";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isInitialLoad = useRef(true);
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);
  
  useEffect(() => {
    const resultsRef = ref(db, "results");
    
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(updateResults(data));

        if (isInitialLoad.current) {
          isInitialLoad.current = false;
          if (data.showResultPage === true) {
            setHasAutoRedirected(true);
          }
          return;
        }

        // Agregamos /val-jan a las excepciones para que no te saque de la página de mensajes
        if (
          location.pathname === "/control-panel" || 
          location.pathname === "/traer" || 
          location.pathname === "/vote" ||
          location.pathname === "/val-jan"
        ) {
          return;
        }

        if (data.showResultPage === true && !hasAutoRedirected) {
            setHasAutoRedirected(true); 
            if (location.pathname !== "/results") {
              navigate("/results");
            }
        }

        if (data.showResultPage === false) {
            setHasAutoRedirected(false);
        }

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
          {/* AQUÍ ESTÁ LA NUEVA RUTA */}
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

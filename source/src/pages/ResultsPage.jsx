import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { updateResults } from "../store/resultsSlice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

import { BabyBoyIcon, BabyGirlIcon } from "../components/GenderOption";
// Eliminamos la importación de WaitingForResultPage si esta causa el redireccionamiento
import LoadingScreen from "../components/LoadingScreen"; // O un componente simple de "Cargando"

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { voteCounts, showResultPage, loading } = useSelector((state) => state.results);
  const [manualAdjustments, setManualAdjustments] = useState({ boy: 0, girl: 0 });

  useEffect(() => {
    // Escuchar cambios en los resultados
    const resultsRef = ref(db, "results");
    const unsubscribeResults = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateResults(snapshot.val())); 
      }
    });

    // Escuchar ajustes manuales
    const adjustmentsRef = ref(db, "manualAdjustments");
    const unsubscribeAdjustments = onValue(adjustmentsRef, (snapshot) => {
      if (snapshot.exists()) setManualAdjustments(snapshot.val());
    });

    return () => {
      unsubscribeResults();
      unsubscribeAdjustments();
    };
  }, [dispatch]);

  // CORRECCIÓN CLAVE: 
  // Si showResultPage es false, NO redirigimos. 
  // Simplemente mostramos un mensaje de "Preparando resultados..." 
  // Esto evita que App.jsx se vuelva loco intentando entrar y ResultsPage intentando salir.
  if (!showResultPage) {
    return (
      <PageBackground>
        <ResultsContainer>
          <HeaderSection>
            <MainTitle>Esperando resultados...</MainTitle>
            <SubTitle>Los resultados se mostrarán pronto</SubTitle>
            <LoaderMargin>
               {/* Un spinner simple o texto */}
               <p>Sincronizando con la base de datos...</p>
            </LoaderMargin>
            <NavigationButton to="/">Volver al Inicio</NavigationButton>
          </HeaderSection>
        </ResultsContainer>
      </PageBackground>
    );
  }

  const boyVotes = (voteCounts?.boy || 0) + (manualAdjustments.boy || 0);
  const girlVotes = (voteCounts?.girl || 0) + (manualAdjustments.girl || 0);
  const totalVotes = boyVotes + girlVotes;

  const calculatePercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const data = {
    labels: ["Niño", "Niña"],
    datasets: [{
      data: [boyVotes, girlVotes],
      backgroundColor: ["rgba(137, 207, 240, 0.7)", "rgba(255, 182, 193, 0.7)"],
      borderColor: ["#89CFF0", "#FFB6C1"],
      borderWidth: 2,
      borderRadius: 12,
      barThickness: 50,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { font: { size: 14, weight: "bold" } } },
    },
  };

  return (
    <PageBackground>
      <ResultsContainer 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <ContentWrapper>
          <HeaderSection>
            <MainTitle>Resultados Actuales</MainTitle>
            <SubTitle>Valentina & Janppier</SubTitle>
          </HeaderSection>

          <StatsGrid>
            <StatCard>
              <StatIconWrapper>🏆</StatIconWrapper>
              <StatInfo>
                <StatLabel>Tendencia</StatLabel>
                <StatValue $highlight>
                  {boyVotes === girlVotes ? "¡Empate!" : (boyVotes > girlVotes ? "Niño 👶" : "Niña 👧")}
                </StatValue>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIconWrapper>👥</StatIconWrapper>
              <StatInfo>
                <StatLabel>Votos Totales</StatLabel>
                <StatValue>{totalVotes}</StatValue>
              </StatInfo>
            </StatCard>
          </StatsGrid>

          <ChartSection>
            <ChartWrapper>
              <Bar data={data} options={options} height={220} />
            </ChartWrapper>

            <DetailedStats>
              <GenderStatCard>
                <GenderIcon $boy><BabyBoyIcon /></GenderIcon>
                <StatDetails>
                  <StatTitle>{boyVotes} Votos</StatTitle>
                  <Percentage $boy>{calculatePercentage(boyVotes)}%</Percentage>
                </StatDetails>
              </GenderStatCard>

              <GenderStatCard>
                <GenderIcon><BabyGirlIcon /></GenderIcon>
                <StatDetails>
                  <StatTitle>{girlVotes} Votos</StatTitle>
                  <Percentage>{calculatePercentage(girlVotes)}%</Percentage>
                </StatDetails>
              </GenderStatCard>
            </DetailedStats>
          </ChartSection>

          <NavigationButton to="/">
            🏠 VOLVER AL INICIO
          </NavigationButton>
        </ContentWrapper>
      </ResultsContainer>
    </PageBackground>
  );
};

// --- ESTILOS ---
const LoaderMargin = styled.div` margin: 2rem 0; color: #a68974; `;
const PageBackground = styled.div` min-height: 100vh; background: #f2e8df; display: flex; align-items: center; justify-content: center; padding: 20px; `;
const ResultsContainer = styled(motion.div)` background: rgba(255, 255, 255, 0.7); border-radius: 30px; padding: 2.5rem; width: 100%; max-width: 600px; backdrop-filter: blur(10px); border: 1px solid #d9c7b8; box-shadow: 0 10px 30px rgba(0,0,0,0.05); `;
const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;
const HeaderSection = styled.div` text-align: center; `;
const MainTitle = styled.h1` color: #8c6a53; font-family: 'Georgia', serif; font-size: 1.8rem; margin: 0; `;
const SubTitle = styled.p` color: #a68974; font-size: 1.1rem; `;
const ChartWrapper = styled.div` background: white; border-radius: 25px; padding: 1.5rem; `;
const StatsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const StatCard = styled.div` background: white; border-radius: 20px; padding: 1rem; display: flex; align-items: center; gap: 0.8rem; `;
const StatIconWrapper = styled.div` width: 40px; height: 40px; border-radius: 50%; background: #f8f1eb; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; `;
const StatInfo = styled.div` display: flex; flex-direction: column; `;
const StatLabel = styled.div` font-size: 0.7rem; color: #a68974; text-transform: uppercase; font-weight: bold; `;
const StatValue = styled.div` font-size: 1rem; font-weight: bold; color: ${props => props.$highlight ? "#8c6a53" : "#555"}; `;
const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1.2rem; `;
const DetailedStats = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media (max-width: 480px) { grid-template-columns: 1fr; } `;
const GenderStatCard = styled.div` background: white; border-radius: 20px; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; `;
const GenderIcon = styled.div` width: 50px; height: 50px; svg { width: 100%; height: 100%; } `;
const StatDetails = styled.div` display: flex; flex-direction: column; `;
const StatTitle = styled.div` font-size: 0.8rem; color: #888; font-weight: 600; `;
const Percentage = styled.div` font-size: 1.6rem; font-weight: 900; color: ${props => props.$boy ? "#89CFF0" : "#FFB6C1"}; `;
const NavigationButton = styled(Link)` background: #8c6a53; color: white; text-decoration: none; padding: 1.1rem; border-radius: 20px; text-align: center; font-weight: bold; display: block; &:hover { background: #765945; transform: translateY(-2px); } `;

export default ResultsPage;

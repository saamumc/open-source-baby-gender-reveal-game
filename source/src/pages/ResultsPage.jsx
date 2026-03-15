import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { updateResults } from "../store/resultsSlice";
// 1. IMPORTAMOS EL FONDO ANIMADO
import AnimatedBackground from "../components/AnimatedBackground";

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

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { voteCounts, showResultPage } = useSelector((state) => state.results);
  const [manualAdjustments, setManualAdjustments] = useState({ boy: 0, girl: 0 });

  useEffect(() => {
    const resultsRef = ref(db, "results");
    const unsubscribeResults = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateResults(snapshot.val())); 
      }
    });

    const adjustmentsRef = ref(db, "manualAdjustments");
    const unsubscribeAdjustments = onValue(adjustmentsRef, (snapshot) => {
      if (snapshot.exists()) setManualAdjustments(snapshot.val());
    });

    return () => {
      unsubscribeResults();
      unsubscribeAdjustments();
    };
  }, [dispatch]);

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
      {/* 2. AGREGAMOS EL FONDO ANIMADO DETRÁS */}
      <AnimatedBackground />

      <ResultsContainer 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        {!showResultPage ? (
          <HeaderSection>
            <MainTitle>Esperando resultados...</MainTitle>
            <SubTitle>Valentina & Janppier</SubTitle>
            <LoaderMargin>
               <p>Los resultados se revelarán pronto. ¡Mantente conectado!</p>
            </LoaderMargin>
            <NavigationButton to="/">🏠 VOLVER AL INICIO</NavigationButton>
          </HeaderSection>
        ) : (
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
        )}
      </ResultsContainer>
    </PageBackground>
  );
};

// --- ESTILOS ACTUALIZADOS ---
const LoaderMargin = styled.div` margin: 2rem 0; color: #a68974; font-weight: 500; `;

const PageBackground = styled.div` 
  min-height: 100vh; 
  background: transparent; /* 3. TRANSPARENTE PARA VER LOS OSITOS */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 20px; 
  position: relative;
  overflow: hidden;
`;

const ResultsContainer = styled(motion.div)` 
  /* 4. TARJETA TRASLÚCIDA */
  background: rgba(255, 255, 255, 0.8); 
  border-radius: 30px; 
  padding: 2.5rem; 
  width: 100%; 
  max-width: 600px; 
  backdrop-filter: blur(10px); 
  border: 1px solid rgba(217, 199, 184, 0.5); 
  box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
  z-index: 1;
`;

const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;
const HeaderSection = styled.div` text-align: center; `;
const MainTitle = styled.h1` color: #8c6a53; font-family: 'Georgia', serif; font-size: 1.8rem; margin: 0; `;
const SubTitle = styled.p` color: #a68974; font-size: 1.1rem; `;

const ChartWrapper = styled.div` 
  background: rgba(255, 255, 255, 0.9); 
  border-radius: 25px; 
  padding: 1.5rem; 
  box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
`;

const StatsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const StatCard = styled.div` background: white; border-radius: 20px; padding: 1rem; display: flex; align-items: center; gap: 0.8rem; `;
const StatIconWrapper = styled.div` width: 40px; height: 40px; border-radius: 50%; background: #f8f1eb; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; `;
const StatInfo = styled.div` display: flex; flex-direction: column; `;
const StatLabel = styled.div` font-size: 0.7rem; color: #a68974; text-transform: uppercase; font-weight: bold; `;
const StatValue = styled.div` font-size: 1rem; font-weight: bold; color: ${props => props.$highlight ? "#8c6a53" : "#555"}; `;
const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1.2rem; `;
const DetailedStats = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media (max-width: 480px) { grid-template-columns: 1fr; } `;
const GenderStatCard = styled.div` background: white; border-radius: 20px; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; `;

const GenderIcon = styled.div` 
  width: 50px; 
  height: 50px; 
  svg { width: 100%; height: 100%; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); } 
`;

const StatDetails = styled.div` display: flex; flex-direction: column; `;
const StatTitle = styled.div` font-size: 0.8rem; color: #888; font-weight: 600; `;
const Percentage = styled.div` font-size: 1.6rem; font-weight: 900; color: ${props => props.$boy ? "#89CFF0" : "#FFB6C1"}; `;
const NavigationButton = styled(Link)` background: #8c6a53; color: white; text-decoration: none; padding: 1.1rem; border-radius: 20px; text-align: center; font-weight: bold; display: block; transition: all 0.3s ease; &:hover { background: #765945; transform: translateY(-2px); } `;

export default ResultsPage;

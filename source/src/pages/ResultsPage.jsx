import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { updateResults } from "../store/resultsSlice";
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
      backgroundColor: [
        "rgba(137, 207, 240, 0.6)", // Azul difuminado
        "rgba(255, 182, 193, 0.6)"  // Rosa difuminado
      ],
      borderColor: ["#89CFF0", "#FFB6C1"],
      borderWidth: 2,
      borderRadius: 20,
      barThickness: 45,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#5d4a3e',
        bodyColor: '#5d4a3e',
        cornerRadius: 12,
        padding: 12
      }
    },
    scales: {
      y: { display: false },
      x: { 
        grid: { display: false }, 
        ticks: { color: "#7a6352", font: { size: 14, weight: "600" } } 
      },
    },
  };

  return (
    <PageBackground>
      <AnimatedBackground />

      <ResultsContainer 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
      >
        {!showResultPage ? (
          <HeaderSection>
            <MainTitle>Esperando...</MainTitle>
            <SubTitle>Valentina & Janppier</SubTitle>
            <LoaderMargin>
               <p>Los resultados se revelarán pronto. <br/> ¡Mantente conectado!</p>
            </LoaderMargin>
            <NavigationButton to="/">VOLVER AL INICIO</NavigationButton>
          </HeaderSection>
        ) : (
          <ContentWrapper>
            <HeaderSection>
              <MainTitle>Resultados</MainTitle>
              <SubTitle>Valentina & Janppier</SubTitle>
            </HeaderSection>

            <StatsGrid>
              <StatCard>
                <StatIconWrapper>🏆</StatIconWrapper>
                <StatInfo>
                  <StatLabel>Tendencia</StatLabel>
                  <StatValue $highlight>
                    {boyVotes === girlVotes ? "¡Empate!" : (boyVotes > girlVotes ? "Niño" : "Niña")}
                  </StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIconWrapper>👥</StatIconWrapper>
                <StatInfo>
                  <StatLabel>Votos</StatLabel>
                  <StatValue>{totalVotes}</StatValue>
                </StatInfo>
              </StatCard>
            </StatsGrid>

            <ChartSection>
              <ChartWrapper>
                <Bar data={data} options={options} height={200} />
              </ChartWrapper>

              <DetailedStats>
                <GenderStatCard $boy>
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
              VOLVER AL INICIO
            </NavigationButton>
          </ContentWrapper>
        )}
      </ResultsContainer>
    </PageBackground>
  );
};

// --- ESTILOS UNIFICADOS (98% TRANSPARENCIA) ---

const PageBackground = styled.div` 
  min-height: 100vh; 
  background: transparent; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 2rem 1.5rem; 
  position: relative;
  overflow: hidden;
`;

const ResultsContainer = styled(motion.div)` 
  /* TRANSPARENCIA AL 98% */
  background: rgba(255, 255, 255, 0.02); 
  backdrop-filter: blur(12px); 
  -webkit-backdrop-filter: blur(12px);

  border-radius: 40px; 
  padding: 3.5rem 2rem; 
  width: 100%; 
  max-width: 500px; 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  box-shadow: 0 10px 30px rgba(0,0,0,0.03); 
  z-index: 10;
  position: relative;
`;

const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;

const HeaderSection = styled.div` text-align: center; margin-bottom: 1rem; `;

const MainTitle = styled.h1` 
  color: #5d4a3e; 
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  margin: 0; 
  font-weight: 400;
`;

const SubTitle = styled.p` 
  color: #7a6352; 
  font-size: 0.9rem; 
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0.5rem;
`;

const ChartWrapper = styled.div` 
  background: rgba(255, 255, 255, 0.2); 
  border-radius: 25px; 
  padding: 1.5rem; 
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
`;

const StatsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;

const StatCard = styled.div` 
  background: rgba(255, 255, 255, 0.3); 
  border-radius: 20px; 
  padding: 1rem; 
  display: flex; 
  align-items: center; 
  gap: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatIconWrapper = styled.div` 
  width: 35px; 
  height: 35px; 
  border-radius: 50%; 
  background: rgba(255, 255, 255, 0.5); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 1rem; 
`;

const StatInfo = styled.div` display: flex; flex-direction: column; text-align: left; `;
const StatLabel = styled.div` font-size: 0.65rem; color: #7a6352; text-transform: uppercase; font-weight: 700; `;
const StatValue = styled.div` font-size: 1rem; font-weight: bold; color: #5d4a3e; `;

const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1.2rem; `;

const DetailedStats = styled.div` 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 1rem; 
`;

const GenderStatCard = styled.div` 
  background: ${props => props.$boy ? 'rgba(193, 227, 245, 0.25)' : 'rgba(245, 193, 208, 0.25)'};
  border-radius: 25px; 
  padding: 1.2rem; 
  display: flex; 
  align-items: center; 
  gap: 0.8rem; 
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const GenderIcon = styled.div` 
  width: 40px; 
  height: 40px; 
  svg { width: 100%; height: 100%; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05)); } 
`;

const StatDetails = styled.div` display: flex; flex-direction: column; text-align: left; `;
const StatTitle = styled.div` font-size: 0.75rem; color: #7a6352; font-weight: 600; `;
const Percentage = styled.div` font-size: 1.5rem; font-weight: 900; color: ${props => props.$boy ? "#4a84a6" : "#b05c74"}; `;

const NavigationButton = styled(Link)` 
  background: rgba(122, 99, 82, 0.9); 
  color: white; 
  text-decoration: none; 
  padding: 1.1rem; 
  border-radius: 50px; 
  text-align: center; 
  font-weight: 700; 
  font-size: 0.9rem;
  display: block; 
  transition: all 0.3s ease; 
  margin-top: 1rem;
  &:hover { background: #5d4a3e; transform: translateY(-2px); } 
`;

const LoaderMargin = styled.div` 
  margin: 2.5rem 0; 
  color: #7a6352; 
  font-weight: 500; 
  line-height: 1.6;
  font-size: 0.95rem;
`;

export default ResultsPage;


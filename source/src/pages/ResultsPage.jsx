import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

// IMPORTANTE: Asegúrate de que el archivo se llame GenderOption.jsx exactamente
import { BabyBoyIcon, BabyGirlIcon } from "../components/GenderOption";
import WaitingForResultPage from "./WaitingForResultPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const ResultsPage = () => {
  const { voteCounts, showResultPage } = useSelector((state) => state.results);
  const [manualAdjustments, setManualAdjustments] = useState({ boy: 0, girl: 0 });

  useEffect(() => {
    const adjustmentsRef = ref(db, "manualAdjustments");
    const unsubscribe = onValue(adjustmentsRef, (snapshot) => {
      if (snapshot.exists()) setManualAdjustments(snapshot.val());
    }, (error) => console.error("Error Firebase:", error));
    return () => unsubscribe();
  }, []);

  // Si la página de resultados no está activa en Firebase, mostramos la de espera
  if (!showResultPage) return <WaitingForResultPage />;

  const boyVotes = (voteCounts.boy || 0) + (manualAdjustments.boy || 0);
  const girlVotes = (voteCounts.girl || 0) + (manualAdjustments.girl || 0);
  const totalVotes = boyVotes + girlVotes;

  const calculatePercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const data = {
    labels: ["Niño", "Niña"],
    datasets: [{
      data: [boyVotes, girlVotes],
      backgroundColor: ["rgba(64, 169, 255, 0.7)", "rgba(255, 143, 203, 0.7)"],
      borderColor: ["#2979FF", "#FF69B4"],
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
    <ResultsContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ContentWrapper>
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

        <NavigationButton to="/">VOLVER AL INICIO</NavigationButton>
      </ContentWrapper>
    </ResultsContainer>
  );
};

// --- ESTILOS (Ajustados para evitar conflictos de props) ---

const ResultsContainer = styled(motion.div)` 
  background: rgba(255, 255, 255, 0.2); 
  border-radius: 30px; 
  padding: 2rem; 
  width: 95%; 
  max-width: 600px; 
  margin: 20px auto; 
  backdrop-filter: blur(15px); 
  border: 1px solid rgba(255,255,255,0.3);
`;

const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;

const ChartWrapper = styled.div` 
  background: white; 
  border-radius: 25px; 
  padding: 1.5rem; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
`;

const StatsGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;

const StatCard = styled.div` 
  background: white; 
  border-radius: 20px; 
  padding: 1rem; 
  display: flex; 
  align-items: center; 
  gap: 0.8rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.03);
`;

const StatIconWrapper = styled.div` 
  width: 45px; height: 45px; border-radius: 50%; 
  background: #f8f9fa; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; 
`;

const StatInfo = styled.div` display: flex; flex-direction: column; `;
const StatLabel = styled.div` font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 1px; `;
const StatValue = styled.div` font-size: 1.1rem; font-weight: bold; color: ${props => props.$highlight ? "#8d775f" : "#333"}; `;

const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1.2rem; `;

const DetailedStats = styled.div` 
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; 
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const GenderStatCard = styled.div` 
  background: white; border-radius: 20px; padding: 1.2rem; 
  display: flex; align-items: center; gap: 1rem; 
`;

const GenderIcon = styled.div` 
  width: 60px; height: 60px; 
  svg { width: 100%; height: 100%; }
`;

const StatDetails = styled.div` display: flex; flex-direction: column; `;
const StatTitle = styled.div` font-size: 0.85rem; color: #666; font-weight: 600; `;
const Percentage = styled.div` 
  font-size: 1.8rem; font-weight: 900; 
  color: ${props => props.$boy ? "#40A9FF" : "#FF8FCB"}; 
`;

const NavigationButton = styled(Link)` 
  background: #8d775f; color: white; text-decoration: none; 
  padding: 1.2rem; border-radius: 20px; text-align: center; 
  font-weight: bold; transition: all 0.3s;
  &:hover { background: #7a6652; transform: translateY(-2px); }
`;

export default ResultsPage;

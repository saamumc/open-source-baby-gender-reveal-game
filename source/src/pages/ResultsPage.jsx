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
  const { voteCounts } = useSelector((state) => state.results);
  const { showResultPage } = useSelector((state) => state.results);
  const [manualAdjustments, setManualAdjustments] = useState({
    boy: 0,
    girl: 0,
  });

  useEffect(() => {
    const adjustmentsRef = ref(db, "manualAdjustments");
    const unsubscribe = onValue(
      adjustmentsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setManualAdjustments(snapshot.val());
        }
      },
      (error) => {
        console.error("Error al obtener ajustes manuales:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!showResultPage) {
    return <WaitingForResultPage />;
  }

  const boyVotes = (voteCounts.boy || 0) + (manualAdjustments.boy || 0);
  const girlVotes = (voteCounts.girl || 0) + (manualAdjustments.girl || 0);
  const totalVotes = boyVotes + girlVotes;

  const calculatePercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const data = {
    labels: ["Niño", "Niña"],
    datasets: [
      {
        label: "Votos",
        data: [boyVotes, girlVotes],
        backgroundColor: ["rgba(64, 169, 255, 0.7)", "rgba(255, 143, 203, 0.7)"],
        borderColor: ["rgba(41, 121, 255, 1)", "rgba(255, 105, 180, 1)"],
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { font: { size: 14, weight: "600" } } },
    },
  };

  const getWinningGender = () => {
    if (boyVotes === girlVotes) return "Empate";
    return boyVotes > girlVotes ? "Niño" : "Niña";
  };

  return (
    <ResultsContainer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <ContentWrapper>
        <StatsGrid>
          <StatCard highlight>
            <StatIconWrapper winner>🏆</StatIconWrapper>
            <StatInfo>
              <StatLabel>A la cabeza</StatLabel>
              <StatValue highlight>
                {getWinningGender() === "Empate" 
                  ? "¡Empate!" 
                  : `${getWinningGender()} ${boyVotes > girlVotes ? "👶" : "👧"}`}
              </StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIconWrapper>👥</StatIconWrapper>
            <StatInfo>
              <StatLabel>Total Votos</StatLabel>
              <StatValue>{totalVotes}</StatValue>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <ChartWrapper>
            <Bar data={data} options={options} height={250} />
          </ChartWrapper>

          <DetailedStats>
            <GenderStatCard boy>
              <GenderIcon boy>
                <span style={{ fontSize: "2.5rem" }}>🧸</span>
              </GenderIcon>
              <StatDetails>
                <StatTitle>{boyVotes} Votos</StatTitle>
                <Percentage boy>{calculatePercentage(boyVotes)}%</Percentage>
              </StatDetails>
            </GenderStatCard>

            <GenderStatCard girl>
              <GenderIcon girl>
                <span style={{ fontSize: "2.5rem" }}>🎀</span>
              </GenderIcon>
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

// --- ESTILOS ---
const ResultsContainer = styled(motion.div)` background: rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 2rem; width: 90%; max-width: 800px; margin: 20px auto; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.1); `;
const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;
const ChartWrapper = styled.div` background: white; border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); `;
const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; `;
const StatCard = styled.div` background: white; border-radius: 20px; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); `;
const StatIconWrapper = styled.div` width: 50px; height: 50px; border-radius: 50%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; `;
const StatInfo = styled.div` display: flex; flex-direction: column; `;
const StatLabel = styled.div` font-size: 0.85rem; color: #666; `;
const StatValue = styled.div` font-size: 1.4rem; font-weight: bold; color: ${props => props.highlight ? "#b666d2" : "#333"}; `;
const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1rem; `;
const DetailedStats = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media (max-width: 500px) { grid-template-columns: 1fr; } `;
const GenderStatCard = styled.div` background: white; border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; `;
const GenderIcon = styled.div` width: 70px; height: 70px; border-radius: 50%; background: ${props => props.boy ? "rgba(64, 169, 255, 0.1)" : "rgba(255, 143, 203, 0.1)"}; display: flex; align-items: center; justify-content: center; `;
const StatDetails = styled.div` display: flex; flex-direction: column; `;
const StatTitle = styled.div` font-size: 0.9rem; color: #666; font-weight: 600; `;
const Percentage = styled.div` font-size: 2.2rem; font-weight: 900; color: ${props => props.boy ? "#40A9FF" : "#FF8FCB"}; `;
const NavigationButton = styled(Link)` background: linear-gradient(135deg, #b666d2, #4b3f6b); color: white; text-decoration: none; padding: 1rem 2rem; border-radius: 50px; text-align: center; font-weight: bold; margin-top: 1rem; transition: transform 0.2s; &:hover { transform: scale(1.05); } `;

export default ResultsPage;

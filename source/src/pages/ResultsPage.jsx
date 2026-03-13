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
import { BabyGirlIcon, BabyBoyIcon } from "../components/GenderIcons";
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

  // Escuchar ajustes manuales desde Firebase
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

  // Cálculos de votos totales
  const boyVotes = (voteCounts.boy || 0) + (manualAdjustments.boy || 0);
  const girlVotes = (voteCounts.girl || 0) + (manualAdjustments.girl || 0);
  const totalVotes = boyVotes + girlVotes;

  const calculatePercentage = (votes) => {
    const numVotes = parseInt(votes || 0, 10);
    if (totalVotes === 0) return 0;
    return Math.round((numVotes / totalVotes) * 100);
  };

  const data = {
    labels: ["Niño", "Niña"],
    datasets: [
      {
        label: "Votos",
        data: [boyVotes, girlVotes],
        backgroundColor: [
          "rgba(64, 169, 255, 0.7)",
          "rgba(255, 143, 203, 0.7)",
        ],
        borderColor: ["rgba(41, 121, 255, 1)", "rgba(255, 105, 180, 1)"],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        padding: 10,
        borderWidth: 1,
      },
    },
    scales: {
      y: { display: false },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 14, weight: "600" },
          color: "#333",
        },
      },
    },
  };

  const getWinningGender = () => {
    if (boyVotes === girlVotes) return "Empate";
    return boyVotes > girlVotes ? "Niño" : "Niña";
  };

  const getLeadPercentage = () => {
    if (totalVotes === 0) return 0;
    const difference = Math.abs(boyVotes - girlVotes);
    return Math.round((difference / totalVotes) * 100);
  };

  return (
    <ResultsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ContentWrapper>
        <StatsGrid>
          <StatCard highlight>
            <StatIconWrapper winner>
              <span role="img" aria-label="trophy" style={{ fontSize: "1.5em" }}>🏆</span>
            </StatIconWrapper>
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
            <StatIconWrapper>
              <span role="img" aria-label="votos" style={{ fontSize: "1.5em" }}>👥</span>
            </StatIconWrapper>
            <StatInfo>
              <StatLabel>Total Votos</StatLabel>
              <StatValue>{totalVotes}</StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIconWrapper>
              <span role="img" aria-label="porcentaje" style={{ fontSize: "1.5em" }}>📊</span>
            </StatIconWrapper>
            <StatInfo>
              <StatLabel>Ventaja por</StatLabel>
              <StatValue>{getLeadPercentage()}%</StatValue>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <ChartWrapper>
            <Bar data={data} options={options} height={250} />
          </ChartWrapper>

          <DetailedStats>
            <GenderStatCard boy>
              <GenderIcon boy><BabyBoyIcon /></GenderIcon>
              <StatDetails>
                <StatTitle>{boyVotes} Votos</StatTitle>
                <StatNumbers>
                  <Percentage boy>{calculatePercentage(boyVotes)}%</Percentage>
                </StatNumbers>
              </StatDetails>
            </GenderStatCard>

            <GenderStatCard girl>
              <GenderIcon girl><BabyGirlIcon /></GenderIcon>
              <StatDetails>
                <StatTitle>{girlVotes} Votos</StatTitle>
                <StatNumbers>
                  <Percentage>{calculatePercentage(girlVotes)}%</Percentage>
                </StatNumbers>
              </StatDetails>
            </GenderStatCard>
          </DetailedStats>
        </ChartSection>

        <NavigationButton
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VOLVER AL INICIO
        </NavigationButton>
      </ContentWrapper>
    </ResultsContainer>
  );
};

// --- ESTILOS MANTENIDOS ---
const ResultsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; width: 100%; max-width: 800px; margin: 0 auto; backdrop-filter: blur(10px);
`;

const ContentWrapper = styled.div` display: flex; flex-direction: column; gap: 1rem; `;
const ChartWrapper = styled.div` border-radius: 16px; padding: 1.2rem; `;
const StatIconWrapper = styled.div`
  background: ${(props) => props.winner ? "rgba(255, 215, 0, 0.2)" : "rgba(147, 112, 219, 0.2)"};
  color: ${(props) => (props.winner ? "#FFD700" : "#9370DB")};
  width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
`;

const StatValue = styled.div` font-size: 1.5rem; font-weight: bold; color: ${(props) => (props.highlight ? "#9370DB" : "#666")}; `;

const GenderIcon = styled.div`
  background: ${(props) => props.boy ? "rgba(64, 169, 255, 0.2)" : "rgba(255, 143, 203, 0.2)"};
  color: ${(props) => (props.boy ? "#40A9FF" : "#FF8FCB")};
  width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  svg { width: 100%; height: 100%; }
`;

const NavigationButton = styled(motion(Link))`
  background: linear-gradient(135deg, #ff69b4, #4169e1); color: white; text-decoration: none; padding: 0.8rem 1.5rem; border-radius: 50px; text-align: center; font-weight: 600; width: 200px; margin: 0.5rem auto 0;
`;

const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; `;
const StatCard = styled.div` background: rgba(255, 255, 255, 0.95); border-radius: 20px; padding: 1rem; display: flex; align-items: center; gap: 0.8rem; `;
const StatInfo = styled.div` display: flex; flex-direction: column; `;
const StatLabel = styled.div` font-size: 0.8rem; color: #666; font-weight: 500; `;
const ChartSection = styled.div` display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; `;
const DetailedStats = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media (max-width: 480px) { grid-template-columns: 1fr; } `;
const GenderStatCard = styled.div` background: rgba(255, 255, 255, 0.95); border-radius: 20px; padding: 1rem; display: flex; align-items: center; gap: 1rem; `;
const StatDetails = styled.div` display: flex; flex-direction: column; `;
const StatTitle = styled.div` font-size: 1rem; font-weight: 600; color: #333; `;
const StatNumbers = styled.div` display: flex; align-items: center; gap: 0.5rem; `;
const Percentage = styled.span` font-size: 1.8rem; font-weight: bold; color: ${(props) => (props.boy ? "#40A9FF" : "#FF8FCB")}; `;

export default ResultsPage;

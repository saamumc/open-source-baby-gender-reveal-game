import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  setShowResultPage,
  setShowVotingScreen,
  resetResults,
  setShowGameStarted,
} from "../store/resultsSlice";
import {
  setResetConfirmationOpen,
  setResetSuccessShow,
} from "../store/uiSlice";
import ResetConfirmation from "../components/ResetConfirmation";
import { db } from "../firebase/config";
import { ref, get, set } from "firebase/database";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const { voteCounts, showResultPage, showVotingScreen, showGameStarted } =
    useSelector((state) => state.results);
  const { resetConfirmation } = useSelector((state) => state.ui);
  const [manualAdjustments, setManualAdjustments] = useState({
    boy: 0,
    girl: 0,
  });

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const resultsRef = ref(db, "results");
        const snapshot = await get(resultsRef);
        const data = snapshot.val();
        if (data) {
          dispatch(setShowResultPage(data.showResultPage ?? false));
          dispatch(setShowVotingScreen(data.showVotingScreen ?? false));
          dispatch(setShowGameStarted(data.showGameStarted ?? false));
        }
      } catch (error) {
        console.error("Error fetching initial states:", error);
      }
    };
    fetchInitialStates();
  }, [dispatch]);

  const handleManualVoteChange = async (gender, value) => {
    const numValue = parseInt(value) || 0;
    try {
      const adjustmentsRef = ref(db, "manualAdjustments");
      const newAdjustments = { ...manualAdjustments, [gender]: numValue };
      await set(adjustmentsRef, newAdjustments);
      setManualAdjustments(newAdjustments);
    } catch (error) {
      console.error("Error updating manual adjustments:", error);
    }
  };

  const handleVisibilityToggle = (action, currentValue) => {
    const newValue = !currentValue;
    if (action === "result") dispatch(setShowResultPage(newValue));
    if (action === "voting") dispatch(setShowVotingScreen(newValue));
    if (action === "gameStarted") dispatch(setShowGameStarted(newValue));
  };

  return (
    <>
      <Container initial="hidden" animate="visible">
        <ContentCard>
          <Title>Panel de Control</Title>

          <ResetSection>
            <ResetButton onClick={() => dispatch(setResetConfirmationOpen(true))}>
              <ResetButtonContent>
                <ResetIcon>↺</ResetIcon> Reiniciar Juego
              </ResetButtonContent>
            </ResetButton>
            <ResetDescription>Esto borrará todos los votos actuales</ResetDescription>
          </ResetSection>

          <Section>
            <SectionTitle><span>Ajustes Manuales</span></SectionTitle>
            <VoteAdjustmentGrid>
              {/* CARD NIÑO */}
              <VoteCard>
                <IconWrapper boy>
                  <span style={{ fontSize: "3rem" }}>🧸</span>
                </IconWrapper>
                <VoteControls>
                  <VoteButton onClick={() => handleManualVoteChange("boy", manualAdjustments.boy - 1)}>-</VoteButton>
                  <VoteInput type="number" value={manualAdjustments.boy} onChange={(e) => handleManualVoteChange("boy", e.target.value)} />
                  <VoteButton onClick={() => handleManualVoteChange("boy", manualAdjustments.boy + 1)}>+</VoteButton>
                </VoteControls>
              </VoteCard>

              {/* CARD NIÑA */}
              <VoteCard>
                <IconWrapper girl>
                  <span style={{ fontSize: "3rem" }}>🎀</span>
                </IconWrapper>
                <VoteControls>
                  <VoteButton onClick={() => handleManualVoteChange("girl", manualAdjustments.girl - 1)}>-</VoteButton>
                  <VoteInput type="number" value={manualAdjustments.girl} onChange={(e) => handleManualVoteChange("girl", e.target.value)} />
                  <VoteButton onClick={() => handleManualVoteChange("girl", manualAdjustments.girl + 1)}>+</VoteButton>
                </VoteControls>
              </VoteCard>
            </VoteAdjustmentGrid>
          </Section>

          <Section>
            <SectionTitle><span>Controles de Pantalla</span></SectionTitle>
            <ControlsGrid>
              {[
                { label: "Resultados", key: "result", value: showResultPage },
                { label: "Votación", key: "voting", value: showVotingScreen },
                { label: "Inicio", key: "gameStarted", value: showGameStarted },
              ].map((screen) => (
                <ControlCard key={screen.key}>
                  <ControlLabel>{screen.label}</ControlLabel>
                  <ToggleSwitch isOn={screen.value} onClick={() => handleVisibilityToggle(screen.key, screen.value)} />
                </ControlCard>
              ))}
            </ControlsGrid>
          </Section>
        </ContentCard>
      </Container>

      <ResetConfirmation
        isOpen={resetConfirmation.isOpen}
        onClose={() => dispatch(setResetConfirmationOpen(false))}
        onConfirm={() => {
          dispatch(resetResults());
          dispatch(setResetConfirmationOpen(false));
          dispatch(setResetSuccessShow(true));
          setTimeout(() => dispatch(setResetSuccessShow(false)), 3000);
        }}
        totalVotes={voteCounts}
      />
    </>
  );
};

// --- ESTILOS ---
const Container = styled(motion.div)` padding: 1rem; width: 100%; max-width: 800px; margin: 0 auto; `;
const ContentCard = styled.div` background: white; border-radius: 24px; padding: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.1); `;
const Title = styled.h1` text-align: center; color: #b666d2; `;
const Section = styled.section` margin-top: 2rem; `;
const SectionTitle = styled.h2` font-size: 1.2rem; margin-bottom: 1rem; `;
const VoteAdjustmentGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; `;
const VoteCard = styled.div` background: #f8f9fa; padding: 1rem; border-radius: 15px; display: flex; flex-direction: column; align-items: center; `;
const IconWrapper = styled.div` margin-bottom: 10px; color: ${props => props.boy ? "#1E88E5" : "#FF69B4"}; `;
const VoteControls = styled.div` display: flex; align-items: center; gap: 10px; `;
const VoteButton = styled.button` width: 30px; height: 30px; border-radius: 50%; border: none; background: #b666d2; color: white; cursor: pointer; `;
const VoteInput = styled.input` width: 50px; text-align: center; border: 1px solid #ddd; border-radius: 5px; `;
const ControlsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; `;
const ControlCard = styled.div` background: #f8f9fa; padding: 10px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; `;
const ControlLabel = styled.span` font-size: 0.8rem; `;
const ToggleSwitch = styled.div` width: 40px; height: 20px; background: ${props => props.isOn ? "#b666d2" : "#ccc"}; border-radius: 10px; position: relative; cursor: pointer; &:after { content: ''; position: absolute; width: 16px; height: 16px; background: white; border-radius: 50%; top: 2px; left: ${props => props.isOn ? "22px" : "2px"}; transition: 0.3s; } `;
const ResetSection = styled.section` text-align: center; padding: 1rem; background: #fff5f5; border-radius: 15px; border: 1px dashed #feb2b2; `;
const ResetButton = styled.button` background: #f56565; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-weight: bold; `;
const ResetButtonContent = styled.div` display: flex; align-items: center; gap: 5px; `;
const ResetIcon = styled.span` font-size: 1.2rem; `;
const ResetDescription = styled.p` font-size: 0.7rem; color: #c53030; margin-top: 5px; `;

export default ControlPanel;

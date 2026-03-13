import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import GenderOption from "../components/GenderOption";
import VoteConfirmation from "../components/VoteConfirmation";
import { selectGender, submitVote, resetVote } from "../store/voteSlice";
import { useTranslation } from "../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

const VotePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);
  const { showVotingScreen } = useSelector((state) => state.results);
  const { t } = useTranslation();

  useEffect(() => {
    if (!showVotingScreen) {
      navigate("/");
    }
  }, [showVotingScreen, navigate]);

  useEffect(() => {
    dispatch(resetVote());
  }, []);

  const handleSelect = (gender) => {
    dispatch(selectGender(gender));
  };

  const handleSubmit = () => {
    if (selectedGender) {
      dispatch(submitVote());
    }
  };

  if (!showVotingScreen) {
    return null;
  }

  if (hasVoted) {
    return <VoteConfirmation />;
  }

  return (
    <ContentCard>
      <HeaderSection>
        <Header />
      </HeaderSection>

      <OptionsSection>
        <OptionsContainer>
          <GenderOption
            type="girl"
            selected={selectedGender === "girl"}
            onSelect={() => handleSelect("girl")}
          />
          <GenderOption
            type="boy"
            selected={selectedGender === "boy"}
            onSelect={() => handleSelect("boy")}
          />
        </OptionsContainer>

        <SubmitButtonWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SubmitButton
            disabled={!selectedGender}
            onClick={handleSubmit}
            whileHover={selectedGender ? { scale: 1.05 } : {}}
            whileTap={selectedGender ? { scale: 0.95 } : {}}
          >
            {t("votePage.submitButton")}
          </SubmitButton>
        </SubmitButtonWrapper>
      </OptionsSection>
    </ContentCard>
  );
};

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  padding: min(1.5rem, 4vw);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderSection = styled.section`
  margin-bottom: min(2rem, 5vw);
  flex-shrink: 0;
`;

const OptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 90vw), 1fr));
  gap: min(2rem, 5vw);
  justify-items: center;
  align-items: center;
  width: 100%;
  margin: auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SubmitButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  position: relative;
  overflow: visible;
  width: min(300px, 90%);
  margin: 0 auto;
`;

const SubmitButton = styled(motion.button)`
  background: ${(props) =>
    props.disabled
      ? "linear-gradient(135deg, #cccccc, #999999)"
      : "linear-gradient(135deg, #4682B4, #2c5272)"};
  color: white;
  border: none;
  padding: min(1.2rem, 3vw) min(2.5rem, 6vw);
  border-radius: 50px;
  font-size: min(1.3rem, 5vw);
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: relative;
  z-index: 4;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.disabled
      ? "0 4px 15px rgba(0, 0, 0, 0.2)"
      : "0 4px 25px rgba(70, 130, 180, 0.4)"};
  width: min(300px, 90%);
  margin: 0 auto;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
  }
`;

export default VotePage;
export default VotePage;

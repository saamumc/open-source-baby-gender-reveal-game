import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voteCounts: {
    boy: 0,
    girl: 0,
  },
  showResultPage: false,
  showVotingScreen: false,
  showGameStarted: false,
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    updateResults: (state, action) => {
      const data = action.payload;
      if (data) {
        state.showResultPage = data.showResultPage ?? state.showResultPage;
        state.showVotingScreen = data.showVotingScreen ?? state.showVotingScreen;
        state.showGameStarted = data.showGameStarted ?? state.showGameStarted;
        
        if (data.voteCounts) {
          state.voteCounts.boy = data.voteCounts.boy || 0;
          state.voteCounts.girl = data.voteCounts.girl || 0;
        }
      }
    },
    updateVoteCounts: (state, action) => {
      state.voteCounts.boy = action.payload.boy ?? 0;
      state.voteCounts.girl = action.payload.girl ?? 0;
    },
    setShowResultPage: (state, action) => {
      state.showResultPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShowVotingScreen: (state, action) => {
      state.showVotingScreen = action.payload;
    },
    setShowGameStarted: (state, action) => {
      state.showGameStarted = action.payload;
    },
    // Movimos resetResults aquí adentro para mayor consistencia
    resetResults: (state) => {
      state.voteCounts = { boy: 0, girl: 0 };
    }
  }
});

export const {
  updateResults,
  updateVoteCounts,
  setShowResultPage,
  setLoading,
  setError,
  setShowVotingScreen,
  setShowGameStarted,
  resetResults // Ahora se exporta desde aquí
} = resultsSlice.actions;

export default resultsSlice.reducer;


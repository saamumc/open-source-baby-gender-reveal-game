import { createSlice, createAction } from "@reduxjs/toolkit";

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
        // Actualizamos solo si el valor existe en Firebase para no sobreescribir con undefined
        if (data.showResultPage !== undefined) state.showResultPage = data.showResultPage;
        if (data.showVotingScreen !== undefined) state.showVotingScreen = data.showVotingScreen;
        if (data.showGameStarted !== undefined) state.showGameStarted = data.showGameStarted;
        
        // Sincronización de votos
        if (data.voteCounts) {
          state.voteCounts.boy = data.voteCounts.boy ?? state.voteCounts.boy;
          state.voteCounts.girl = data.voteCounts.girl ?? state.voteCounts.girl;
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
  },
  extraReducers: (builder) => {
    builder.addCase(resetResults, (state) => {
      state.voteCounts = { boy: 0, girl: 0 };
    });
  },
});

export const {
  updateResults,
  updateVoteCounts,
  setShowResultPage,
  setLoading,
  setError,
  setShowVotingScreen,
  setShowGameStarted,
} = resultsSlice.actions;

export const resetResults = createAction("results/resetResults");
export default resultsSlice.reducer;


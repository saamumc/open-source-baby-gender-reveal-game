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
  name: "results", // Nombre simplificado para evitar errores de nombres largos
  initialState,
  reducers: {
    // ESTA ES LA FUNCIÓN QUE VERCEL BUSCABA
    updateResults: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
          // Mantenemos voteCounts si no viene en el payload para no borrar los votos
          voteCounts: action.payload.voteCounts || state.voteCounts,
        };
      }
      return state;
    },
    updateVoteCounts: (state, action) => {
      state.voteCounts = {
        boy: action.payload.boy || 0,
        girl: action.payload.girl || 0,
      };
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
      state.voteCounts = {
        boy: 0,
        girl: 0,
      };
    });
  },
});

export const {
  updateResults, // Exportada para que coincida con la importación en ResultsPage.jsx
  updateVoteCounts,
  setShowResultPage,
  setLoading,
  setError,
  setShowVotingScreen,
  setShowGameStarted,
} = resultsSlice.actions;

export const resetResults = createAction("results/resetResults");

export default resultsSlice.reducer;


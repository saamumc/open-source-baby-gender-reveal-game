import { createSlice } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "../utils/storage";

const loadInitialState = () => {
  const savedState = storage.get(STORAGE_KEYS.VOTE_STATE);
  return (
    savedState || {
      name: "",           // 1. Agregamos campo de nombre
      selectedGender: null,
      message: "", 
      hasVoted: false,
      uuid: storage.getUUID(),
      timestamp: null,
    }
  );
};

const initialState = loadInitialState();

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    // 2. Modificamos para recibir name y message
    submitVote: (state, action) => {
      state.hasVoted = true; 
      state.name = action.payload?.name || "";       // Guardamos el nombre
      state.message = action.payload?.message || ""; // Guardamos el mensaje
      state.timestamp = Date.now();
      
      // Guardamos el estado completo en el almacenamiento local
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    resetVote: (state) => {
      state.name = "";            // Limpiamos el nombre
      state.selectedGender = null;
      state.message = ""; 
      state.hasVoted = false;
      state.timestamp = null;
      state.uuid = storage.getUUID();
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    setFirebaseDeleteStatus: (state, action) => {
      state.firebaseDeleteStatus = action.payload;
    },
  },
});

export const { selectGender, submitVote, resetVote, setFirebaseDeleteStatus } =
  voteSlice.actions;
export default voteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "../utils/storage";

const loadInitialState = () => {
  const savedState = storage.get(STORAGE_KEYS.VOTE_STATE);
  return (
    savedState || {
      selectedGender: null,
      message: "", // Agregamos campo de mensaje aquí
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
    // Modificamos submitVote para que acepte el mensaje en el payload
    submitVote: (state, action) => {
      state.hasVoted = true; 
      state.message = action.payload?.message || ""; // Guardamos el mensaje
      state.timestamp = Date.now();
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    resetVote: (state) => {
      state.selectedGender = null;
      state.message = ""; // Limpiamos el mensaje al resetear
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

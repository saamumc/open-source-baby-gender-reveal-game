import { createSlice } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "../utils/storage";

const loadInitialState = () => {
  const savedState = storage.get(STORAGE_KEYS.VOTE_STATE);
  
  // Verificamos si ya hay un UUID en el storage, si no, creamos uno fijo
  let deviceUUID = localStorage.getItem("device_uuid");
  if (!deviceUUID) {
    deviceUUID = crypto.randomUUID(); 
    localStorage.setItem("device_uuid", deviceUUID);
  }

  return (
    savedState || {
      name: "",
      selectedGender: null,
      message: "", 
      hasVoted: false,
      uuid: deviceUUID, // Siempre usamos el ID del dispositivo
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
    submitVote: (state, action) => {
      state.hasVoted = true; 
      state.name = action.payload?.name || "";
      state.message = action.payload?.message || ""; 
      state.timestamp = Date.now();
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    resetVote: (state) => {
      state.name = "";
      state.selectedGender = null;
      state.message = ""; 
      state.hasVoted = false;
      state.timestamp = null;
      // No reseteamos el UUID para que siga siendo el mismo dispositivo
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
  },
});

export const { selectGender, submitVote, resetVote } = voteSlice.actions;
export default voteSlice.reducer;

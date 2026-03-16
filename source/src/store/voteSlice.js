import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  // Generamos o recuperamos el ID del dispositivo para que no cambie al recargar
  let deviceUUID = localStorage.getItem("device_uuid");
  if (!deviceUUID) {
    deviceUUID = crypto.randomUUID(); 
    localStorage.setItem("device_uuid", deviceUUID);
  }

  return {
    name: "",
    selectedGender: null,
    message: "", 
    hasVoted: false,
    uuid: deviceUUID, 
    timestamp: null,
    firebaseDeleteStatus: "idle", // Estado para el componente de Reset
  };
};

const initialState = loadInitialState();

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    submitVote: (state, action) => {
      state.hasVoted = true; 
      state.name = action.payload?.name || "";
      state.message = action.payload?.message || ""; 
      state.timestamp = Date.now();
    },
    // ESTA ES LA FUNCIÓN QUE VERCEL NO ENCONTRABA
    setFirebaseDeleteStatus: (state, action) => {
      state.firebaseDeleteStatus = action.payload;
    },
    resetVote: (state) => {
      state.name = "";
      state.selectedGender = null;
      state.message = ""; 
      state.hasVoted = false;
      state.timestamp = null;
      state.firebaseDeleteStatus = "idle";
      // El UUID se mantiene para que el dispositivo siga siendo el mismo
    },
  },
});

export const { 
  selectGender, 
  submitVote, 
  setFirebaseDeleteStatus, // <--- Exportación necesaria
  resetVote 
} = voteSlice.actions;

export default voteSlice.reducer;

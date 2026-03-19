import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; // Asegúrate de que esta ruta sea correcta
import { ref, push, set } from "firebase/database";

// 1. CREAMOS EL PROCESO DE ENVÍO A FIREBASE (Thunk)
export const submitVoteToFirebase = createAsyncThunk(
  "vote/submitVoteToFirebase",
  async (voteData, { rejectWithValue }) => {
    try {
      const votesRef = ref(db, "userVotes");
      const newVoteRef = push(votesRef);
      
      // Guardamos el objeto completo en Firebase
      await set(newVoteRef, {
        name: voteData.name,
        gender: voteData.gender,
        message: voteData.message,
        timestamp: Date.now(),
        uuid: localStorage.getItem("device_uuid")
      });

      return voteData;
    } catch (error) {
      console.error("Error en Firebase:", error);
      return rejectWithValue(error.message);
    }
  }
);

const loadInitialState = () => {
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
    firebaseDeleteStatus: "idle",
    loading: false, // Nuevo estado para el botón
  };
};

const voteSlice = createSlice({
  name: "vote",
  initialState: loadInitialState(),
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    // Este ya no lo usaremos para enviar, sino para limpiar localmente si fuera necesario
    submitVote: (state, action) => {
      state.hasVoted = true; 
    },
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
    },
  },
  // 2. MANEJAMOS EL RESULTADO DEL ENVÍO
  extraReducers: (builder) => {
    builder
      .addCase(submitVoteToFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitVoteToFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.hasVoted = true;
        state.name = action.payload.name;
        state.message = action.payload.message;
        state.selectedGender = action.payload.gender;
      })
      .addCase(submitVoteToFirebase.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { 
  selectGender, 
  submitVote, 
  setFirebaseDeleteStatus, 
  resetVote 
} = voteSlice.actions;

export default voteSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, push, set, increment, update } from "firebase/database";

// Thunk para guardar en Firebase (Nombre, Género y Mensaje)
export const submitVote = createAsyncThunk(
  "vote/submitVote",
  async ({ name, gender, message }, { rejectWithValue }) => {
    try {
      // 1. Guardar el detalle del voto
      const votesRef = ref(db, "userVotes");
      const newVoteRef = push(votesRef);
      await set(newVoteRef, {
        name,
        gender,
        message,
        timestamp: Date.now(),
        uuid: localStorage.getItem("device_uuid")
      });

      // 2. Incrementar contador global para las gráficas
      await update(ref(db, 'results/voteCounts'), {
        [gender]: increment(1)
      });

      return { name, gender, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    name: "",
    selectedGender: null,
    message: "",
    hasVoted: false,
    loading: false,
    firebaseDeleteStatus: "idle" // Necesario para ResetConfirmation
  },
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    // Esta es la función que Vercel no encontraba:
    setFirebaseDeleteStatus: (state, action) => {
      state.firebaseDeleteStatus = action.payload;
    },
    resetVote: (state) => {
      state.name = "";
      state.selectedGender = null;
      state.message = "";
      state.hasVoted = false;
      state.loading = false;
      state.firebaseDeleteStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitVote.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(submitVote.fulfilled, (state, action) => {
        state.loading = false;
        state.hasVoted = true;
        state.name = action.payload.name;
        state.message = action.payload.message;
      })
      .addCase(submitVote.rejected, (state) => { 
        state.loading = false; 
      });
  },
});

// Exportamos todas las acciones que los componentes necesitan
export const { 
  selectGender, 
  resetVote, 
  setFirebaseDeleteStatus 
} = voteSlice.actions;

export default voteSlice.reducer;

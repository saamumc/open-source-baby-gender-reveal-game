import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, push, set, increment, update } from "firebase/database";

// ESTA ES LA FUNCIÓN QUE REALMENTE GUARDA TODO
export const submitVote = createAsyncThunk(
  "vote/submitVote",
  async ({ name, gender, message }, { rejectWithValue }) => {
    try {
      // 1. Guardar el mensaje detallado en 'userVotes' (Nombre, Género, Mensaje)
      const votesRef = ref(db, "userVotes");
      const newVoteRef = push(votesRef);
      await set(newVoteRef, {
        name,
        gender,
        message,
        timestamp: Date.now(),
        uuid: localStorage.getItem("device_uuid")
      });

      // 2. Aumentar el contador global en 'results/voteCounts' (Para las gráficas)
      const countsRef = ref(db, `results/voteCounts`);
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
    loading: false
  },
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    resetVote: (state) => {
      state.selectedGender = null;
      state.hasVoted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitVote.pending, (state) => { state.loading = true; })
      .addCase(submitVote.fulfilled, (state) => {
        state.loading = false;
        state.hasVoted = true;
      })
      .addCase(submitVote.rejected, (state) => { state.loading = false; });
  },
});

export const { selectGender, resetVote } = voteSlice.actions;
export default voteSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, increment, update, get } from "firebase/database";

export const submitVote = createAsyncThunk(
  "vote/submitVote",
  async ({ name, gender, message }, { rejectWithValue }) => {
    try {
      const uuid = localStorage.getItem("device_uuid");
      
      // 1. Referencia única basada en el UUID del dispositivo
      const voteRef = ref(db, `userVotes/${uuid}`);
      
      // 2. Verificamos si ya existe para no duplicar el contador global
      const snapshot = await get(voteRef);
      
      if (snapshot.exists()) {
        return rejectWithValue("Ya has registrado un voto desde este dispositivo.");
      }

      // 3. Guardar el detalle del voto usando SET (no push)
      await set(voteRef, {
        name,
        gender,
        message,
        timestamp: Date.now(),
        uuid: uuid
      });

      // 4. Incrementar contador global
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
    firebaseDeleteStatus: "idle" 
  },
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
    },
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

export const { 
  selectGender, 
  resetVote, 
  setFirebaseDeleteStatus 
} = voteSlice.actions;

export default voteSlice.reducer;

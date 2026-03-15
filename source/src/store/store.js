import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE PARA ENVIAR VOTOS ---
const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    const { selectedGender, uuid, message, timestamp } = state;

    set(ref(db, `userVotes/${uuid}`), {
      selectedGender,
      message: message || "", 
      uuid,
      timestamp: timestamp || Date.now(),
      hasVoted: true
    });

    const currentCounts = store.getState().results.voteCounts;
    const newCounts = {
      ...currentCounts,
      [selectedGender]: (currentCounts[selectedGender] || 0) + 1
    };
    update(ref(db, "results/voteCounts"), newCounts);
  }

  return result;
};

// --- 2. ACCIONES DEL PANEL DE CONTROL (Exportadas para que el panel funcione) ---
export const toggleVoting = (status) => {
  update(ref(db, "results"), { showVotingScreen: status });
};

export const toggleResults = (status) => {
  update(ref(db, "results"), { showResultPage: status });
};

export const resetGame = () => {
  set(ref(db, "userVotes"), {}); // Borra los votos
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 }); // Resetea barras
};

// --- 3. CONFIGURACIÓN DEL STORE ---
export const store = configureStore({
  reducer: {
    vote: voteReducer,
    results: resultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(firebaseMiddleware),
});

// --- 4. ESCUCHA DE CAMBIOS EN TIEMPO REAL ---
const resultsRef = ref(db, "results");
onValue(resultsRef, (snapshot) => {
  if (snapshot.exists()) {
    store.dispatch(updateResults(snapshot.val()));
  }
});

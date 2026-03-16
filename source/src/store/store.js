import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE PARA ENVIAR VOTOS A FIREBASE ---
const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    // Extraemos el nombre junto con los demás datos
    const { selectedGender, uuid, message, timestamp, name } = state;

    // Guardamos en la lista de votos individuales
    set(ref(db, `userVotes/${uuid}`), {
      name: name || "Anónimo", 
      selectedGender,
      message: message || "", 
      uuid,
      timestamp: timestamp || Date.now(),
      hasVoted: true
    });

    // Actualizamos el contador global (Barras de progreso)
    const currentCounts = store.getState().results.voteCounts;
    const newCounts = {
      ...currentCounts,
      [selectedGender]: (currentCounts[selectedGender] || 0) + 1
    };
    update(ref(db, "results/voteCounts"), newCounts);
  }

  return result;
};

// --- 2. ACCIONES DEL PANEL DE CONTROL ---
export const toggleVoting = (status) => {
  update(ref(db, "results"), { showVotingScreen: status });
};

export const toggleResults = (status) => {
  update(ref(db, "results"), { showResultPage: status });
};

export const resetGame = () => {
  set(ref(db, "userVotes"), {}); 
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 });
};

// --- 3. CONFIGURACIÓN DEL STORE (CON EXPORT PARA VERCEL) ---
// Agregamos 'export' aquí para solucionar el error de Rollup/Vercel
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

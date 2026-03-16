import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update, get } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE CON RE-CONTEO Y BLOQUEO ---
const firebaseMiddleware = (store) => (next) => async (action) => {
  if (action.type === "vote/submitVote") {
    // CANDADO 1: Si ya existe la marca en el navegador, bloqueamos el proceso
    if (localStorage.getItem("baby_shower_voted") === "true") {
      console.warn("Voto duplicado bloqueado localmente.");
      return; 
    }

    const state = store.getState().vote;
    const { selectedGender, uuid, message, name } = state;

    try {
      // A. Guardamos el voto (Firebase sobrescribirá si el UUID es igual)
      const voteRef = ref(db, `userVotes/${uuid}`);
      await set(voteRef, {
        name: name || "Anónimo",
        selectedGender,
        message: message || "",
        uuid,
        timestamp: Date.now(),
        hasVoted: true
      });

      // B. RE-CONTEO REAL: Contamos lo que hay físicamente en Firebase
      const allVotesRef = ref(db, "userVotes");
      const snapshot = await get(allVotesRef);
      
      if (snapshot.exists()) {
        const allVotes = snapshot.val();
        const counts = { boy: 0, girl: 0 };

        Object.values(allVotes).forEach(vote => {
          if (vote.selectedGender === "boy") counts.boy++;
          if (vote.selectedGender === "girl") counts.girl++;
        });

        // Actualizamos el contador oficial
        await update(ref(db, "results/voteCounts"), counts);
      }

      // CANDADO 2: Marcamos el dispositivo como "Ya votó"
      localStorage.setItem("baby_shower_voted", "true");

    } catch (error) {
      console.error("Error sincronizando con Firebase:", error);
    }
  }

  return next(action);
};

// --- 2. ACCIONES DEL PANEL ---
export const toggleVoting = (status) => {
  update(ref(db, "results"), { showVotingScreen: status });
};

export const toggleResults = (status) => {
  update(ref(db, "results"), { showResultPage: status });
};

export const resetGame = () => {
  // Limpiamos Firebase
  set(ref(db, "userVotes"), {}); 
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 });
  // NOTA: Para volver a votar tú, debes borrar el LocalStorage manualmente
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

// --- 4. ESCUCHA EN TIEMPO REAL ---
const resultsRef = ref(db, "results");
onValue(resultsRef, (snapshot) => {
  if (snapshot.exists()) {
    store.dispatch(updateResults(snapshot.val()));
  }
});

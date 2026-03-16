import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update, get } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE BLINDADO ---
const firebaseMiddleware = (store) => (next) => async (action) => {
  // Solo actuamos cuando la acción es submitVote
  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    const { selectedGender, uuid, message, name } = state;

    // A. Verificación en LocalStorage (Primer candado)
    const alreadyVotedLocal = localStorage.getItem("baby_shower_voted");
    if (alreadyVotedLocal === "true") {
      console.warn("Voto bloqueado: Ya votaste desde este dispositivo.");
      return; // Detiene la acción, no llega al reducer ni a Firebase
    }

    try {
      // B. Verificación en Firebase (Segundo candado por si borran LocalStorage)
      const voteRef = ref(db, `userVotes/${uuid}`);
      const snapshot = await get(voteRef);

      if (snapshot.exists()) {
        console.warn("Voto bloqueado: Este ID ya existe en la base de datos.");
        localStorage.setItem("baby_shower_voted", "true");
        return;
      }

      // C. Si pasa los filtros, registramos el voto
      const timestamp = Date.now();
      
      await set(voteRef, {
        name: name || "Anónimo",
        selectedGender,
        message: message || "",
        uuid,
        timestamp,
        hasVoted: true
      });

      // D. Actualizamos los contadores globales
      const currentCounts = store.getState().results.voteCounts;
      const newCounts = {
        ...currentCounts,
        [selectedGender]: (currentCounts[selectedGender] || 0) + 1
      };
      await update(ref(db, "results/voteCounts"), newCounts);

      // E. Marcamos como votado con éxito
      localStorage.setItem("baby_shower_voted", "true");
      
    } catch (error) {
      console.error("Error al procesar el voto:", error);
      return; // Si hay error, no dejamos que la acción continúe
    }
  }

  // Solo si no es un voto duplicado, permitimos que Redux actualice el estado
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
  set(ref(db, "userVotes"), {}); 
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 });
  // NOTA: Para volver a votar tú mismo, debes borrar el LocalStorage de tu navegador manualmente
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


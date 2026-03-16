import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update, get } from "firebase/database"; // Añadimos 'get'
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE CON RE-CONTEO AUTOMÁTICO ---
const firebaseMiddleware = (store) => (next) => async (action) => {
  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    const { selectedGender, uuid, message, name } = state;

    // Bloqueo local para evitar spam de clics
    if (localStorage.getItem("baby_shower_voted") === "true") return;

    try {
      // A. Guardamos/Actualizamos el voto individual
      const voteRef = ref(db, `userVotes/${uuid}`);
      await set(voteRef, {
        name: name || "Anónimo",
        selectedGender,
        message: message || "",
        uuid,
        timestamp: Date.now(),
        hasVoted: true
      });

      // B. RE-CALCULAR EL CONTEO TOTAL DESDE LA REALIDAD
      // En lugar de sumar +1, contamos los documentos reales en Firebase
      const allVotesRef = ref(db, "userVotes");
      const snapshot = await get(allVotesRef);
      
      if (snapshot.exists()) {
        const allVotes = snapshot.val();
        const counts = { boy: 0, girl: 0 };

        // Contamos físicamente cada voto en la base de datos
        Object.values(allVotes).forEach(vote => {
          if (vote.selectedGender === "boy") counts.boy++;
          if (vote.selectedGender === "girl") counts.girl++;
        });

        // Sobrescribimos el contador con el valor real
        await update(ref(db, "results/voteCounts"), counts);
      }

      // C. Marcamos como votado con éxito
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
  set(ref(db, "userVotes"), {}); 
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 });
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

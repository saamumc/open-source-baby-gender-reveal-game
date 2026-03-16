import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; 
import { ref, set, onValue, update } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// --- 1. MIDDLEWARE PARA ENVIAR VOTOS A FIREBASE (CON BLOQUEO DE DUPLICADOS) ---
const firebaseMiddleware = (store) => (next) => (action) => {
  if (action.type === "vote/submitVote") {
    // A. Verificación de seguridad: ¿Ya existe la marca en este navegador?
    const alreadyVoted = localStorage.getItem("baby_shower_voted");
    if (alreadyVoted === "true") {
      console.warn("Bloqueo de seguridad: Intento de voto duplicado detectado.");
      return; // Detiene la ejecución aquí mismo
    }

    const state = store.getState().vote;
    const { selectedGender, uuid, message, timestamp, name } = state;

    // B. Guardamos en Firebase usando el UUID como llave fija.
    // Si el usuario logra enviar otro voto, Firebase sobrescribe el anterior 
    // en lugar de sumar uno nuevo, manteniendo el conteo real.
    set(ref(db, `userVotes/${uuid}`), {
      name: name || "Anónimo", 
      selectedGender,
      message: message || "", 
      uuid,
      timestamp: timestamp || Date.now(),
      hasVoted: true
    });

    // C. Actualizamos el contador global
    const currentCounts = store.getState().results.voteCounts;
    const newCounts = {
      ...currentCounts,
      [selectedGender]: (currentCounts[selectedGender] || 0) + 1
    };
    update(ref(db, "results/voteCounts"), newCounts);

    // D. Dejamos la marca física en el dispositivo para bloquear la UI
    localStorage.setItem("baby_shower_voted", "true");
  }

  return next(action);
};

// --- 2. ACCIONES DEL PANEL DE CONTROL ---
export const toggleVoting = (status) => {
  update(ref(db, "results"), { showVotingScreen: status });
};

export const toggleResults = (status) => {
  update(ref(db, "results"), { showResultPage: status });
};

export const resetGame = () => {
  // Al resetear el juego, también deberías limpiar el localStorage si estás probando
  set(ref(db, "userVotes"), {}); 
  set(ref(db, "results/voteCounts"), { boy: 0, girl: 0 });
};

// --- 3. CONFIGURACIÓN DEL STORE (CON EXPORT PARA VERCEL) ---
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

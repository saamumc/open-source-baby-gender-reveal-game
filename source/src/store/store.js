import { configureStore } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; // Ruta corregida para Vercel
import { ref, set, onValue, update } from "firebase/database";
import voteReducer from "./voteSlice";
import resultsReducer from "./resultsSlice";
import { updateResults } from "./resultsSlice";

// 1. Definimos el Middleware (El cartero que lleva los mensajes a Firebase)
const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    const { selectedGender, uuid, message, timestamp } = state;

    // Guardamos en la carpeta userVotes que vimos en tu captura
    set(ref(db, `userVotes/${uuid}`), {
      selectedGender: selectedGender,
      message: message || "", 
      uuid: uuid,
      timestamp: timestamp || Date.now(),
      hasVoted: true
    });

    // Actualizamos el conteo para las barras
    const currentCounts = store.getState().results.voteCounts;
    const newCounts = {
      ...currentCounts,
      [selectedGender]: (currentCounts[selectedGender] || 0) + 1
    };
    update(ref(db, "results/voteCounts"), newCounts);
  }

  return result;
};

// 2. Creamos y EXPORTAMOS el Store (Lo que buscaba main.jsx)
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

// 3. Escuchamos los cambios globales de Firebase
const resultsRef = ref(db, "results");
onValue(resultsRef, (snapshot) => {
  if (snapshot.exists()) {
    store.dispatch(updateResults(snapshot.val()));
  }
});

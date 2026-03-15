import { db } from "./config";
import { ref, set, onValue, update } from "firebase/database";
import { updateResults } from "../store/resultsSlice";

export const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Cuando se dispara la acción de votar
  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    const { selectedGender, uuid, message, timestamp } = state;

    // 1. Guardar el voto con mensaje en userVotes
    set(ref(db, `userVotes/${uuid}`), {
      selectedGender,
      message: message || "", // <--- AQUÍ SE ENVÍA EL MENSAJE
      uuid,
      timestamp,
      hasVoted: true
    });

    // 2. Actualizar el conteo global (Esto hace que las barras suban)
    const currentCounts = store.getState().results.voteCounts;
    const newCounts = {
      ...currentCounts,
      [selectedGender]: (currentCounts[selectedGender] || 0) + 1
    };

    update(ref(db, "results/voteCounts"), newCounts);
  }

  return result;
};

export const initializeFirebaseListeners = (store) => {
  const resultsRef = ref(db, "results");
  onValue(resultsRef, (snapshot) => {
    if (snapshot.exists()) {
      store.dispatch(updateResults(snapshot.val()));
    }
  });
};

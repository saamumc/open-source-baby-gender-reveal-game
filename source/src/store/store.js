// --- 1. MIDDLEWARE PARA ENVIAR VOTOS ---
const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "vote/submitVote") {
    const state = store.getState().vote;
    // AGREGAMOS 'name' a la desestructuración
    const { selectedGender, uuid, message, timestamp, name } = state;

    // Enviamos el objeto a Firebase incluyendo el NOMBRE
    set(ref(db, `userVotes/${uuid}`), {
      name: name || "Anónimo", // Guardamos el nombre (o un default por si acaso)
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

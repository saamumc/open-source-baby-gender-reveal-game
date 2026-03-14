import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { initializeFirebaseListeners } from "./firebase/firebaseMiddleware";

// Inicializamos los listeners y guardamos la función de limpieza
const cleanup = initializeFirebaseListeners(store);

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento root. Verifica tu index.html");
}

// Limpieza para desarrollo (Vite/HMR)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (cleanup) cleanup();
  });
}

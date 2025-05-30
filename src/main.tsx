import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import store, { persistor } from "./redux/store.ts";
import { ToastProvider } from './context/ToastContext.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

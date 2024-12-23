import App from "@/App";
import { Provider as ReduxProvider } from 'react-redux';
import { Persistor } from "redux-persist/es/types";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore } from "./app/store";

export const Provider = ({ store, persistor }: { store: AppStore, persistor: Persistor }) => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App store={store} />
    </PersistGate>
  </ReduxProvider>
);
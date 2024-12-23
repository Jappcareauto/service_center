import { setupListeners } from '@reduxjs/toolkit/query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { persistStore } from 'redux-persist'
import { extraArgument } from './app/extraArgument.ts'
import { createStore } from './app/store.ts'
import './index.css'
import { Provider } from './Provider.tsx'

const store = createStore(
  extraArgument
)

setupListeners(store.dispatch)

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} persistor={persistor} />
  </StrictMode>,
)

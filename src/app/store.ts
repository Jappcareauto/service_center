import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import {
  FLUSH,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  PAUSE,
} from "redux-persist/es/constants";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { isDevMode } from "./config/Base";
import { rootReducer } from "./reducers/Reducers";
import { listenerMiddleware } from "./listenerMiddleware";
import { Dependencies } from "./Dependencies";


const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (
  extraArgument: Dependencies,
) => configureStore({
  reducer: persistedReducer,
  devTools: isDevMode,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
      immutableCheck: {
        warnAfter: 300,
      },
    })
      .prepend(listenerMiddleware.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof createStore>

export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;


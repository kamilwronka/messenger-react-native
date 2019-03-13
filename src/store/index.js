import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./combineReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  pReducer,
  compose(applyMiddleware(thunk, promiseMiddleware))
);

export const persistor = persistStore(store);

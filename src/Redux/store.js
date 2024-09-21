import { configureStore } from "@reduxjs/toolkit";
import createSagaMissleware from "redux-saga";

import rootSaga from "./root.saga";
import rootReducer from "./root.reducer";

const sagaMiddleware = createSagaMissleware();

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: () => [sagaMiddleware],
  // middleware: ((getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: false,
  //   }).concat(sagaMiddleware)),
});

sagaMiddleware.run(rootSaga);

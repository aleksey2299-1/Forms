import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./reducers/forms/formsSlice";
import filledFormsReducer from "./reducers/filledForms/filledFormsSlice";
import requestReducer from "./reducers/request/requestSlice";

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    filledForms: filledFormsReducer,
    request: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

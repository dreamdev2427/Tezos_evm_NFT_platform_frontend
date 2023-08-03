import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "./userAccount";
import blockchainDappReducer from "./blockchainDapp";

export const store = configureStore({
  reducer: {
    user: userAccountReducer,
    blockchainDapp: blockchainDappReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

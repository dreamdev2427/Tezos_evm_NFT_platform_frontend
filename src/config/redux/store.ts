import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "./userAccount";
import blockchainDappReducer from "./blockchainDapp";
import tezosReducer from "./tezos_reducer";

export const store = configureStore({
  reducer: {
    tezosUser: tezosReducer,
    user: userAccountReducer,
    blockchainDapp: blockchainDappReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

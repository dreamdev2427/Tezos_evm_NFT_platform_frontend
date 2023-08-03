import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeBlockchain } from "../../types";
import type { RootState } from "./store";

const initialState: { blockchain: TypeBlockchain } = {
  blockchain: "Avalanche",
};

//Slice for setting blockchain
export const blockchainDappSlice = createSlice({
  name: "blockchainDapp",

  initialState,

  reducers: {
    setBlockchainDapp: (state, action: PayloadAction<TypeBlockchain>) => {
      // eslint-disable-next-line no-param-reassign
      state.blockchain = action.payload;
    },
  },
});

export const { setBlockchainDapp } = blockchainDappSlice.actions;

export const selectBlockchainDapp = (
  state: RootState
): TypeBlockchain | undefined => {
  return state.blockchainDapp.blockchain;
};

export default blockchainDappSlice.reducer;

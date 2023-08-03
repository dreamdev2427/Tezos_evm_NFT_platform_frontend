import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface IUserWallet {
  address: string;
  balanceTemporary: string;
  chainIdTemporary: number;
}

export interface IUserAccount {
  id: string;
  email: string;
  authToken: string;
}

const initialState: { account?: IUserAccount; wallet?: IUserWallet } = {
  account: undefined,
  wallet: undefined,
};

//Slice for setting user's wallet
export const userAccountSlice = createSlice({
  name: "userAccount",

  initialState,

  reducers: {
    //  Set blockchain info
    setAddress: (state, action: PayloadAction<IUserWallet>) => {
      // eslint-disable-next-line no-param-reassign
      state.wallet = action.payload;
    },

    //  User login
    setUserLogin: (state, action: PayloadAction<IUserAccount>) => {
      // eslint-disable-next-line no-param-reassign
      state.account = action.payload;
    },

    //  User logout
    setUserLogout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.account = undefined;
    },
  },
});

export const { setAddress } = userAccountSlice.actions;
export const { setUserLogin, setUserLogout } = userAccountSlice.actions;

export const selectWallet = (state: RootState): IUserWallet | undefined => {
  if (state.user.wallet) {
    return state.user.wallet;
  }
};

export const selectAccount = (state: RootState): IUserAccount | undefined => {
  if (state.user.account) return state.user.account;
};

export default userAccountSlice.reducer;

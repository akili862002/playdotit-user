import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICommonState {
  isOpenFloatingSearch: boolean;
}

const initialState: ICommonState = {
  isOpenFloatingSearch: false,
};

export const commonSlices = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setOpenFloatingSearch: (state, action: PayloadAction<boolean>) => {
      state.isOpenFloatingSearch = action.payload;
    },
  },
});

export const { setOpenFloatingSearch } = commonSlices.actions;

export default commonSlices.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICommonState {
  isOpenFloatingSearch: boolean;
  isDarkMode: boolean;
}

const initialState: ICommonState = {
  isOpenFloatingSearch: false,
  isDarkMode: false,
};

export const commonSlices = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setOpenFloatingSearch: (state, action: PayloadAction<boolean>) => {
      state.isOpenFloatingSearch = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setOpenFloatingSearch, setIsDarkMode } = commonSlices.actions;

export default commonSlices.reducer;

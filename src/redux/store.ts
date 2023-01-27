import { configureStore } from "@reduxjs/toolkit";
import playlist from "./slices/playlist";
import common from "./slices/common";

const store = configureStore({
  reducer: { playlist, common },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;

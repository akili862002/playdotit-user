import { configureStore } from "@reduxjs/toolkit";
import playlist from "./slices/playlist";

const store = configureStore({
  reducer: { playlist },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlaylist, ISong } from "typings";

interface IPlaylistState {
  playlist: IPlaylist | null;
  currentSong: ISong | null;
  playing: boolean;
}

const initialState: IPlaylistState = {
  playlist: null,
  currentSong: null,
  playing: false,
};

export const playlistSlices = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<IPlaylist>) => {
      state.playlist = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<ISong>) => {
      state.currentSong = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },
});

export const { setPlaylist, setCurrentSong, setPlaying } =
  playlistSlices.actions;

export default playlistSlices.reducer;

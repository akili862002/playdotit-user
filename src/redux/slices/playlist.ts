import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IPlaylist, ISong } from "typings";
import { arrayMove } from "util/arrayMove";
import { Queue } from "util/queue";

interface IPlaylistState {
  playlist: IPlaylist;
  currentSong: ISong | null;
  playing: boolean;
  isSync: boolean;
  isShuffle: boolean;
}

const initialState: IPlaylistState = {
  playlist: {
    _id: "",
    name: "",
    createdAt: "",
    songs: [],
  },
  currentSong: null,
  playing: false,
  isSync: false,
  isShuffle: false,
};

export const playlistSlices = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<IPlaylist>) => {
      state.playlist = action.payload;
    },
    setCurrentSong: (
      state,
      action: PayloadAction<{ song: ISong; playing?: boolean }>,
    ) => {
      const { song, playing = true } = action.payload;
      state.currentSong = song;
      state.playing = playing;

      // Set current playing song to bottom, and change other
      state.playlist.songs = arrayMove(
        state.playlist.songs,
        0,
        state.playlist.songs.length,
      );
      // Every current playing song will be on top!
      state.playlist.songs = arrayMove(
        state.playlist.songs,
        state.playlist.songs.findIndex(item => item._id === song._id),
        0,
      );
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    setSync: (state, action: PayloadAction<boolean>) => {
      state.isSync = action.payload;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    enqueueSongToPlaylist: (state, action: PayloadAction<ISong>) => {
      if (!state.playlist?.songs) return;
      const queue = new Queue(state.playlist.songs);

      if (
        queue.findIndex(
          item => item.youtubeURL === action.payload.youtubeURL,
        ) >= 0
      ) {
        toast.error("This song was existed!", {});
        return;
      }

      queue.push(action.payload);
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },
    moveItemDnD: (
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) => {
      const queue = new Queue(state.playlist.songs);
      const { from, to } = action.payload;
      queue.arrayMove(from, to);
      state.playlist.songs = queue.arr;
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },
    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      const queue = new Queue(state.playlist.songs);
      queue.removeItem(song => song._id !== action.payload.id);
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },
    renamePlaylist: (state, action: PayloadAction<string>) => {
      state.playlist.name = action.payload;
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },

    savePlaylist: state => {
      saveDataToLocalStorage(state.playlist._id, state.playlist);
    },
  },
});

const saveDataToLocalStorage = (key: string, playlist: IPlaylist) => {
  window.localStorage.setItem(key || "1234-234", JSON.stringify(playlist));
};

export const {
  setPlaylist,
  setCurrentSong,
  setPlaying,
  setSync,
  setShuffle,
  enqueueSongToPlaylist,
  moveItemDnD,
  deleteSong,
  renamePlaylist,
  savePlaylist,
} = playlistSlices.actions;

export default playlistSlices.reducer;

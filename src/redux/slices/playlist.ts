import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlaylist, ISong } from "@/typings";
import { Queue } from "@/util/queue";

interface IPlaylistState {
  playlist: IPlaylist;
  currentSong: ISong | null;
  prevSong: ISong | null;
  playing: boolean;
  isSync: boolean;
  isShuffle: boolean;
  historyStack: ISong[];
  isRequestToNextSong: boolean;
  volume: number;
}

const initialState: IPlaylistState = {
  playlist: {
    _id: "",
    playingSongIndex: 0,
    storedId: "",
    name: "",
    createdAt: "",
    songs: [],
  },
  historyStack: [],
  prevSong: null,
  currentSong: null,
  playing: false,
  isSync: false,
  isShuffle: false,
  isRequestToNextSong: false,
  volume: 0.8,
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
      // Push to history first!
      if (state.currentSong && state.prevSong?._id !== state.currentSong._id) {
        state.prevSong = state.currentSong;
        state.historyStack.push(state.prevSong);
      }

      state.currentSong = song;
      state.playing = playing;

      // Update index of current playing song of playlist
      const index = state.playlist.songs.findIndex((item) => item._id === song._id);
      if (index >= 0) {
        state.playlist.playingSongIndex = index;
      }

      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    backToPreviousSong: (state) => {
      if (state.historyStack.length)
        state.currentSong = state.historyStack.pop() as ISong;
    },
    setRequestNextSong: (state, action: PayloadAction<boolean>) => {
      state.isRequestToNextSong = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    togglePlaying: (state) => {
      state.playing = !state.playing;
    },
    setSync: (state, action: PayloadAction<boolean>) => {
      const isSync = action.payload;
      state.isSync = isSync;
      if (isSync) state.isShuffle = false;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      const isShuffle = action.payload;
      state.isShuffle = isShuffle;
      if (isShuffle) state.isSync = false;
    },
    enqueueSongToPlaylist: (state, action: PayloadAction<ISong>) => {
      if (!state.playlist?.songs) return;
      const queue = new Queue(state.playlist.songs);

      if (queue.findIndex((item) => item.youtubeURL === action.payload.youtubeURL) >= 0) {
        return;
      }

      if (queue.isEmpty()) {
        state.currentSong = action.payload;
        state.playing = true;
      }

      queue.push(action.payload);

      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    unshiftSongToPlaylist: (state, action: PayloadAction<ISong>) => {
      if (!state.playlist?.songs) return;
      const queue = new Queue(state.playlist.songs);

      if (queue.findIndex((item) => item.youtubeURL === action.payload.youtubeURL) >= 0) {
        return;
      }

      queue.unshift(action.payload);
      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    moveItemDnD: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const queue = new Queue(state.playlist.songs);
      const { from, to } = action.payload;
      queue.arrayMove(from, to);
      state.playlist.songs = queue.arr;
      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      const queue = new Queue(state.playlist.songs);
      queue.removeItem((song) => song._id === action.payload.id);
      state.playlist.songs = queue.arr;
      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    renamePlaylist: (state, action: PayloadAction<string>) => {
      state.playlist.name = action.payload;
      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    savePlaylist: (state) => {
      saveDataToLocalStorage(state.playlist.storedId, state.playlist);
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

const saveDataToLocalStorage = (key: string, playlist: IPlaylist) => {
  window.localStorage.setItem(key, JSON.stringify(playlist));
};

export const {
  setPlaylist,
  setCurrentSong,
  setPlaying,
  togglePlaying,
  setSync,
  setShuffle,
  backToPreviousSong,
  enqueueSongToPlaylist,
  unshiftSongToPlaylist,
  moveItemDnD,
  deleteSong,
  renamePlaylist,
  savePlaylist,
  setRequestNextSong,
  setVolume,
} = playlistSlices.actions;

export default playlistSlices.reducer;

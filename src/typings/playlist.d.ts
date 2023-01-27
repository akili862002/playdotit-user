import { ISong, ISongInput } from "./song";

export interface IPlaylist {
  _id: string;
  storedId: string;
  name: string;
  playingSongIndex?: number;
  songs: ISong[];
  createdAt: string;
}

export interface ISharedPlaylist {
  sharedId: string;
  name: string;
  songs: ISongInput[];
}

export interface ICreatePlaylist {
  playlist: ISharedPlaylist;
}

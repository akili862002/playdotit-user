export interface IPlaylist {
  _id: string;
  name: string;
  createdAt: string;
  songs: ISong[];
}

export interface ISong {
  _id: string;
  name: string;
  author: string;
  thumbnail: string;
  youtubeURL: string;
}

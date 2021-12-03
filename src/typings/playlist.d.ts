export interface IPlaylist {
  name: string;
  createdAt: Date;
  songs: ISong[];
}

export interface ISong {
  _id: string;
  name: string;
  author: string;
  thumbnail: string;
  youtubeURL: string;
}

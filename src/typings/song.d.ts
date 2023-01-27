export interface ISong {
  _id?: string;
  name: string;
  author: string;
  thumbnail: string;
  youtubeURL: string;
  totalUsed?: number;
}

export interface ISongInput {
  name: string;
  author: string;
  thumbnail: string;
  youtubeURL: string;
}

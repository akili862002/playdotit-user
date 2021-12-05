import { IPlaylist } from "typings";
import { randomId } from "util/randomId";

export const fakePlaylist: IPlaylist = {
  _id: randomId(),
  name: "My album",
  createdAt: new Date().toString(),
  songs: [
    {
      _id: randomId(),
      name: "Darkside",
      author: "Alan walker",
      youtubeURL: "",
      thumbnail:
        "https://avatar-ex-swe.nixcdn.com/song/2018/07/27/a/c/0/1/1532624735084_640.jpg",
    },
    {
      _id: randomId(),
      name: "Swedish House Mafia ft. John Martin - Don't You...",
      author: "John Martin",
      youtubeURL: "",
      thumbnail: "https://i.ytimg.com/vi/1y6smkh6c-0/maxresdefault.jpg",
    },
    {
      _id: randomId(),
      name: "Imagine Dragons & JID - Enemy",
      author: "League of Legends",
      youtubeURL: "",
      thumbnail: "https://i.ytimg.com/vi/D9G1VOjN_84/maxresdefault.jpg",
    },
  ],
};

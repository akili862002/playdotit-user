import { ISong } from "@/typings";
import { IListResponse } from "@/typings/common";
import { axiosCaller } from "@/util/api";
import { copyObject } from "@/util/objects";

export const getSuggestionsAPI = async (payload: { page: number; size: number }) => {
  const listSongs = await axiosCaller<IListResponse<ISong>>({
    path: "/song/suggestions",
    method: "POST",
    payload: payload,
  });
  return listSongs;
};

export const createSongAPI = async (args: {
  song: ISong;
  point?: number;
}): Promise<boolean> => {
  const payload = {
    song: copyObject(args.song),
    point: args.point || 5,
  };

  delete payload.song._id;
  delete payload.song.totalUsed;

  const newSong = await axiosCaller({
    path: "/song/create",
    method: "POST",
    payload,
  });
  return Boolean(newSong);
};

export const reportSongAPI = async (payload: { youtubeURL: string }) => {
  const listSongs = await axiosCaller<IListResponse<ISong>>({
    path: "/song/report",
    method: "POST",
    payload: payload,
  });
  return listSongs;
};

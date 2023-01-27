import { SHARED_SIGN } from "@/constants/share";
import { ICreatePlaylist, IPlaylist, ISharedPlaylist } from "@/typings";
import { IListResponse } from "@/typings/common";
import { axiosCaller } from "@/util/api";

type ICreatePlaylistResult = {
  id: string;
};

const getShareIdSign = (id: string) => {
  const arr = id.split("-");
  const sign = arr[arr.length - 1];

  if (!sign.includes(SHARED_SIGN)) return "";
  return sign;
};

export const createSharePlaylistLinkAPI = async (
  playlist: IPlaylist,
  ownerSharedSign: string,
): Promise<ICreatePlaylistResult | null> => {
  const id = playlist._id;

  let sharedId = playlist._id;

  const sharedSign = getShareIdSign(id);

  console.log({ id, sharedSign, ownerSharedSign });

  if (!sharedSign) {
    sharedId = `${sharedId}-${ownerSharedSign}`;
    // If this shared playlist is created by another one, just change that sign to me
  } else if (sharedSign !== ownerSharedSign) {
    sharedId = sharedId.replace(sharedSign, ownerSharedSign);
  }
  // If this shared playlist created by me, just do nothing;

  const payload: ICreatePlaylist = {
    playlist: {
      sharedId,
      name: playlist.name,
      songs: playlist.songs.map((song) => ({
        name: song.name,
        author: song.author,
        thumbnail: song.thumbnail,
        youtubeURL: song.youtubeURL,
      })),
    },
  };

  const result = await axiosCaller<ICreatePlaylistResult>({
    path: "/share/create",
    method: "POST",
    payload,
  });

  return result;
};

export const getSharedPlaylistAPI = async (payload: {
  id: string;
}): Promise<ISharedPlaylist | null> => {
  const result = await axiosCaller<ISharedPlaylist>({
    path: "/share/get",
    method: "POST",
    payload,
  });

  return result;
};

export const getAllSharedPlaylistsAPI = async (payload: {
  page: number;
  size: number;
}): Promise<IListResponse<ISharedPlaylist> | null> => {
  try {
    const result = await axiosCaller<IListResponse<ISharedPlaylist>>({
      path: "/share/get-all",
      method: "POST",
      payload,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

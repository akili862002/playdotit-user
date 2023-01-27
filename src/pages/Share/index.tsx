import { PLAYLIST_LOCAL_STORAGE_KEY_SIGN } from "@/constants/localStorage";
import SadFaceIcon from "@/icons/SadFace";
import { useEffect, useState } from "react";
import { getSharedPlaylistAPI } from "@/services/sharePlaylist";
import { IPlaylist } from "@/typings";
import { useNavigate, useParams } from "react-router";

interface IShareProps {}

const Share: React.FC<IShareProps> = (props) => {
  const [isFail, setIsFail] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) handleGetPlaylist();
  }, [id]);

  const handleGetPlaylist = async () => {
    try {
      const sharedPlaylist = await getSharedPlaylistAPI({ id: String(id) });
      if (!sharedPlaylist) throw "Error";

      const _id = sharedPlaylist.sharedId;

      const newPlaylist: IPlaylist = {
        _id,
        name: sharedPlaylist.name,
        storedId: PLAYLIST_LOCAL_STORAGE_KEY_SIGN + _id,
        playingSongIndex: 0,
        songs: sharedPlaylist.songs,
        createdAt: new Date().toDateString(),
      };

      window.localStorage.setItem(newPlaylist.storedId, JSON.stringify(newPlaylist));

      nav(`/playlist?id=${id}`);
    } catch (error) {
      setIsFail(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-15 text-gray dark:text-silver">
      {!isFail ? (
        <>
          <ShareIcon />
          <h1 className="font-bold text-xxl">Sharing Playlist...</h1>
          <p className="mt-1 text-lg font-medium text-gray">
            Đang lấy playlist, vui lòng chờ...
          </p>
        </>
      ) : (
        <>
          <SadFaceIcon className="w-10 h-10" />
          <h1 className="mt-3 font-bold text-xxl">404 Not found!</h1>
          <p className="mt-1 text-lg font-medium text-gray">
            Không tìm thấy playlist được chia sẽ!
          </p>
        </>
      )}
    </div>
  );
};

export default Share;

const ShareIcon: React.FC<{}> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 animate-bounce "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
};

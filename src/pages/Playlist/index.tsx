import { PLAYLIST_LOCAL_STORAGE_KEY_SIGN } from "@/constants/localStorage";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong, setPlaylist } from "@/redux/slices/playlist";
import { IPlaylist } from "@/typings";
import MiniMusicPlayer from "./MiniMusicPlayer";
import MusicPlayer from "./MusicPlayer";
import QueueSongs from "./QueueSongs";
import Suggestions from "./Suggestions";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

interface IPlaylistProps {}

const Playlist: React.FC<IPlaylistProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [storedPlaylist, _] = useLocalStorage<IPlaylist | null>(
    String(PLAYLIST_LOCAL_STORAGE_KEY_SIGN + id),
    null
  );

  useEffect(() => {
    if (storedPlaylist) {
      dispatch(setPlaylist(storedPlaylist));
      dispatch(
        setCurrentSong({
          song:
            storedPlaylist.songs[storedPlaylist.playingSongIndex || 0] || null,
          playing: false,
        })
      );
    }
  }, [storedPlaylist]);

  return (
    <div className="mt-8 mb-10 ">
      <MusicPlayer />
      <QueueSongs />
      <Suggestions />
      <MiniMusicPlayer />
    </div>
  );
};

export default Playlist;

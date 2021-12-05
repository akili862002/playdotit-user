import { fakePlaylist } from "constants/fakePlaylist";
import { PLAYLIST_KEY } from "constants/localStorage";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { setPlaylist } from "redux/slices/playlist";
import { IPlaylist } from "typings";
import MusicPlayer from "./MusicPlayer";
import QueueSongs from "./QueueSongs";
import "./styles.scss";

interface IPlaylistProps extends RouteComponentProps {}

const Playlist: React.FC<IPlaylistProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { id = "" } = match.params as { id: string };

  const [storedPlaylist, _] = useLocalStorage<IPlaylist | null>(id, null);

  useEffect(() => {
    if (storedPlaylist) {
      dispatch(setPlaylist(storedPlaylist));
    }
  }, [storedPlaylist]);

  return (
    <div className="mt-8 mb-10">
      <MusicPlayer />
      <QueueSongs />
      {/* <Suggestions /> */}
    </div>
  );
};

export default withRouter(Playlist);

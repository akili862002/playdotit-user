import { fakePlaylist } from "constants/fakePlaylist";
import { PLAYLIST_KEY } from "constants/localStorage";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { IPlaylist } from "typings";
import MusicPlayer from "./MusicPlayer";
import QueueSongs from "./QueueSongs";
import "./styles.scss";

interface IPlaylistProps extends RouteComponentProps {}

const Playlist: React.FC<IPlaylistProps> = ({ match }) => {
  const { id = "" } = match.params as { id: string };

  const [playlist, setPlaylist] = useLocalStorage<IPlaylist | null>(id, null);

  useEffect(() => {
    setPlaylist(fakePlaylist);
  }, []);

  return (
    <div className="mt-8">
      <MusicPlayer />
      <QueueSongs />
      {/* <Suggestions /> */}
    </div>
  );
};

export default withRouter(Playlist);

import PlaylistSongCard from "components/PlaylistSongCard";
import { fakePlaylist } from "constants/fakePlaylist";
import { SortableContainer, SortEnd } from "react-sortable-hoc";
import ListLayout from "layouts/List";
import { IPlaylist } from "typings";
import { randomId } from "util/randomId";
import { arrayMove } from "util/arrayMove";
import useLocalStorage from "hooks/useLocalStorage";
import { RouteComponentProps, withRouter } from "react-router";

interface IQueueSongsProps extends RouteComponentProps {}

const QueueSongs: React.FC<IQueueSongsProps> = ({ match }) => {
  const { id = "" } = match.params as { id: string };

  const [playlist, setPlaylist] = useLocalStorage<IPlaylist | null>(id, null);

  const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (!playlist) return;
    playlist.songs = arrayMove(fakePlaylist.songs, oldIndex, newIndex);
    setPlaylist({ ...playlist });
  };

  return (
    <ListLayout
      // leftSide={<div>Left</div>}
      className="mt-5"
      title="Playlist"
    >
      <RenderListItems
        helperClass="object-dragging"
        distance={1}
        onSortEnd={handleSortEnd}
        playlist={playlist}
      />
    </ListLayout>
  );
};

export default withRouter(QueueSongs);

const RenderListItems = SortableContainer(
  ({ playlist }: { playlist: IPlaylist | null }) => {
    if (!playlist) return null;

    return (
      <ul className="w-full flex flex-col">
        {playlist?.songs?.map((song, index) => (
          <PlaylistSongCard
            index={index}
            song={song}
            onClick={() => {}}
            onWatchMV={() => {}}
            onMoveToTop={() => {}}
            onRemove={() => {}}
          />
        ))}
      </ul>
    );
  },
);

import PlaylistSongCard from "components/PlaylistSongCard";
import { SortableContainer, SortEnd } from "react-sortable-hoc";
import ListLayout from "layouts/List";
import { IPlaylist } from "typings";
import { arrayMove } from "util/arrayMove";
import useLocalStorage from "hooks/useLocalStorage";
import { RouteComponentProps, withRouter } from "react-router";

interface IQueueSongsProps extends RouteComponentProps {}

const QueueSongs: React.FC<IQueueSongsProps> = ({ match }) => {
  const { id = "" } = match.params as { id: string };

  const [playlist, setPlaylist] = useLocalStorage<IPlaylist | null>(id, null);

  const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (!playlist) return;
    playlist.songs = arrayMove(playlist.songs, oldIndex, newIndex);
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
      <ul className="flex flex-col w-full">
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

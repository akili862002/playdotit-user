import PlaylistSongCard from "components/PlaylistSongCard";
import { SortableContainer, SortEnd } from "react-sortable-hoc";
import ListLayout from "layouts/List";
import { IPlaylist } from "typings";
import { RouteComponentProps, withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/store";
import { deleteSong, moveItemDnD, setCurrentSong } from "redux/slices/playlist";
import BaseButton from "components/BaseButton";
import SVG from "components/SVG";
import { setOpenFloatingSearch } from "redux/slices/common";

interface IQueueSongsProps extends RouteComponentProps {}

const QueueSongs: React.FC<IQueueSongsProps> = ({ match }) => {
  const dispatch = useDispatch();

  const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    dispatch(moveItemDnD({ from: oldIndex, to: newIndex }));
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
      />
      <div className="flex items-center justify-center w-full mt-5 ">
        <BaseButton
          onClick={() => dispatch(setOpenFloatingSearch(true))}
          className="flex flex-row items-center justify-center gap-1 py-1 w-17 bg-alice-blue rounded-4"
        >
          <SVG name="common/search" />
          <p className="text-sm font-bold text-black">Add my song</p>
        </BaseButton>
      </div>
    </ListLayout>
  );
};

export default withRouter(QueueSongs);

const RenderListItems = SortableContainer(() => {
  const dispatch = useDispatch();
  const { currentSong, playing, playlist } = useSelector(
    (state: IRootState) => state.playlist,
  );

  return (
    <ul className="flex flex-col w-full">
      {playlist?.songs?.map((song, index) => (
        <PlaylistSongCard
          key={song._id}
          active={currentSong?._id === song._id}
          playing={playing}
          index={index}
          song={song}
          onClick={() => {
            dispatch(setCurrentSong(song));
          }}
          onWatchMV={() => {}}
          onMoveToTop={() => {}}
          onRemove={() => {
            dispatch(deleteSong({ id: song._id }));
          }}
        />
      ))}
      {!playlist?.songs.length && <EmptySongsAlert />}
    </ul>
  );
});

const EmptySongsAlert: React.FC<{}> = props => {
  return (
    <div className="flex flex-col items-center w-full mt-5">
      <h2 className="mb-2 text-xl font-bold text-gray">
        Your playlist is empty now!
      </h2>
      <p className="text-sm font-light text-silver">
        Please click the button below to add your favorite songs
      </p>
    </div>
  );
};

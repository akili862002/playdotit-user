import IconButton from "components/IconButton";
import SVG from "components/SVG";
import { SortableElement } from "react-sortable-hoc";
import { ISong } from "typings";
import "./styles.scss";

interface IPlaylistSongCardProps {
  className?: string;
  song: ISong;
  onClick: () => void;
  onWatchMV: () => void;
  onMoveToTop: () => void;
  onRemove: () => void;
}

const PlaylistSongCard: React.FC<IPlaylistSongCardProps> = ({
  className = "",
  song,
  onClick,
  onMoveToTop,
  onWatchMV,
  onRemove,
}) => {
  if (!song) return null;
  const { name, author, thumbnail } = song;
  return (
    <div
      className={
        "w-full playlist-song-card hover:shadow-md rounded-8 hover:bg-white py-1 cursor-pointer " +
        className
      }
    >
      <div
        className="grid items-center gap-1"
        style={{ gridTemplateColumns: "36px 45px 1fr 122px" }}
      >
        <div className="flex justify-center items-center">
          <SVG name="card/movable" />
        </div>
        <div className="w-4.5 h-4.5 ">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover rounded-8"
          />
        </div>
        <div className="flex flex-col gap-0.5 justify-center w-min">
          <h5 className="text-lg font-bold truncate overflow-hidden">{name}</h5>
          <p className="text-xs text-gray truncate">{author}</p>
        </div>
        <div className="pr-2 flex flex-row items-center gap-1.5">
          <IconButton tooltip="Watch MV" onClick={() => onWatchMV()}>
            <SVG name="card/mv" />
          </IconButton>
          <IconButton tooltip="Remove" onClick={() => onRemove()}>
            <SVG name="card/trash" />
          </IconButton>
          <IconButton tooltip="Move to top" onClick={() => onMoveToTop()}>
            <SVG name="card/to-top" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SortableElement(PlaylistSongCard);

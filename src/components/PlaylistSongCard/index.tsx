import IconButton from "components/IconButton";
import SVG from "components/SVG";
import { SortableElement, WrappedComponent } from "react-sortable-hoc";
import { ISong } from "typings";
import PlayingGif from "assets/gif/playing.gif";
import PlayIcon from "assets/svg/player/white-play.svg";
import "./styles.scss";

interface IPlaylistSongCardProps {
  songIndex: number;
  className?: string;
  song: ISong;
  active: boolean;
  playing: boolean;
  onClick: () => void;
  onWatchMV: () => void;
  onMoveToTop: () => void;
  onRemove: () => void;
}

const PlaylistSongCard: React.FC<IPlaylistSongCardProps> = ({
  songIndex,
  className = "",
  song,
  active,
  playing,
  onClick,
  onMoveToTop,
  onWatchMV,
  onRemove,
}) => {
  if (!song) return null;
  const { name, author, thumbnail } = song;
  return (
    <div
      className={`w-full playlist-song-card hover:shadow-md rounded-8 py-1 cursor-pointer ${
        active ? "bg-alice-blue" : "hover:bg-white"
      } ${className}`}
      onClick={onClick}
    >
      <div
        className="grid items-center gap-1"
        style={{ gridTemplateColumns: "36px 45px 1fr 122px" }}
      >
        <div className="flex items-center justify-center">
          <SVG name="card/movable" />
        </div>
        <div className="w-4.5 h-4.5 rounded-8 overflow-hidden relative">
          <img
            src={thumbnail}
            alt={name}
            className="object-cover w-full h-full "
          />
          {active && playing && <PlayingIconAnimation />}
          {active && !playing && <PlayButton />}
        </div>
        <div className="flex flex-col gap-0.5 justify-center w-min">
          <h5 className="overflow-hidden text-lg font-bold truncate max-w-10 md:max-w-45">
            {name}
          </h5>
          <p className="text-xs truncate text-gray">{author}</p>
        </div>
        <div className="pr-2 flex flex-row items-center gap-1.5">
          <IconButton
            tooltip="Watch MV"
            onClick={e => {
              e.stopPropagation();
              onWatchMV();
            }}
          >
            <SVG name="card/mv" />
          </IconButton>
          <IconButton
            tooltip="Remove"
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <SVG name="card/trash" />
          </IconButton>
          <IconButton
            disable={songIndex < 2}
            tooltip="Move to next song"
            onClick={e => {
              e.stopPropagation();
              onMoveToTop();
            }}
          >
            <SVG name="card/to-top" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SortableElement(PlaylistSongCard);

const PlayingIconAnimation: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 cursor-pointer"
    >
      <img className="w-2 h-2" src={PlayingGif} alt="" />
    </div>
  );
};

const PlayButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 cursor-pointer"
    >
      <img className="w-2 h-2" src={PlayIcon} alt="" />
    </div>
  );
};

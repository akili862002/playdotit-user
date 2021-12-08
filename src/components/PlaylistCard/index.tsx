import BaseButton from "components/BaseButton";
import IconButton from "components/IconButton";
import SVG from "components/SVG";
import { IPlaylist } from "typings";

interface IPlaylistCardProps {
  playlist: IPlaylist;
  onClick?: () => void;
  onRemove: () => void;
}

const PlaylistCard: React.FC<IPlaylistCardProps> = ({
  playlist,
  onClick,
  onRemove,
}) => {
  const { name } = playlist;
  return (
    <div className="w-full cursor-pointer group">
      <div className="relative w-full overflow-hidden shadow-sm aspect-w-1 aspect-h-1 rounded-15">
        <img
          className="absolute object-cover duration-300 transform group-hover:scale-110"
          src="https://i.ytimg.com/vi/L3wKzyIN1yk/maxresdefault.jpg"
          alt={name}
        />
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30">
          <button
            className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/4 top-1/2 hover:opacity-60"
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <SVG name="playlist/remove" className="w-2.5 h-2.5" />
          </button>
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 hover:opacity-60"
            onClick={onClick}
          >
            <SVG name="playlist/play" className="w-5 h-5" />
          </div>
        </div>
      </div>
      <h2 className="mt-1 text-lg font-semibold text-center">{name}</h2>
    </div>
  );
};

export default PlaylistCard;

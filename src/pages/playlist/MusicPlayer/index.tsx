import Player from "components/Player";
import { useEffect, useRef, useState } from "react";
import PlayingGif from "assets/gif/playing.gif";
import PlayIcon from "assets/svg/player/white-play.svg";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/store";
import SongSkeletonImage from "assets/jpg/skeleton.jpg";
import { renamePlaylist, setPlaying } from "redux/slices/playlist";
import { useTitle } from "hooks/useTitle";
import { toast } from "react-toastify";

interface IMusicPlayerProps {}

const MusicPlayer: React.FC<IMusicPlayerProps> = props => {
  const dispatch = useDispatch();
  const { playlist, currentSong, playing } = useSelector(
    (state: IRootState) => state.playlist,
  );
  const playlistNameRef = useRef<HTMLInputElement>(null);

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(currentSong?.name || "");
  }, [currentSong]);

  return (
    <section className="grid w-full grid-cols-12 gap-2 ">
      <div className="flex flex-col items-center w-full col-span-4">
        <div
          className={`w-full aspect-w-1 relative aspect-h-1 overflow-hidden transition-all duration-700 group ${
            playing ? "animate-spin-slow " : ""
          }`}
          style={{ borderRadius: playing ? "999px" : "15px" }}
        >
          <img
            src={currentSong?.thumbnail || SongSkeletonImage}
            alt={currentSong?.name}
            className="object-cover w-full h-full transition duration-500 transform shadow-md pointer-events-none select-none group-hover:scale-110"
          />
          {playing ? (
            <PlayingIconAnimation
              onClick={() => {
                setPlaying(false);
              }}
            />
          ) : (
            <PlayButton
              onClick={() => {
                currentSong && setPlaying(true);
              }}
            />
          )}
        </div>
        <input
          ref={playlistNameRef}
          type="text"
          className="mt-1.5 text-3xl font-bold text-center"
          defaultValue={playlist?.name}
          onBlur={() => {
            if (!playlistNameRef.current?.value) return;

            const val = playlistNameRef.current?.value || "";
            if (!val || val.length > 20) {
              toast.error("Invalid playlist name!");
              playlistNameRef.current.value = playlist.name;
              return;
            }

            dispatch(renamePlaylist(val));
          }}
        />
      </div>
      <div className="flex flex-col justify-between w-full col-span-8">
        <div>
          <h2
            className="text-5xl font-bold paragraph-with-2-line"
            style={{ lineHeight: "1.3" }}
          >
            {currentSong?.name || "Waiting..."}
          </h2>
          <h3 className="text-gray text-sm mt-0.5">
            {currentSong?.author || "Select your music"}
          </h3>
        </div>
        <Player />
      </div>
    </section>
  );
};

export default MusicPlayer;

const PlayingIconAnimation: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer"
    >
      <div className="absolute flex items-center justify-center w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 border border-white border-solid rounded-full left-1/2 top-1/2">
        <img className="w-2 h-2" src={PlayingGif} alt="" />
      </div>
    </div>
  );
};

const PlayButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="absolute top-0 left-0 hidden w-full h-full bg-black bg-opacity-50 cursor-pointer group-hover:block"
    >
      <div className="absolute flex items-center justify-center w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 border border-white border-solid rounded-full left-1/2 top-1/2">
        <img className="w-1.5 h-1.5" src={PlayIcon} alt="" />
      </div>
    </div>
  );
};

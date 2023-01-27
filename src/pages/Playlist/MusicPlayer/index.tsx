import Player from "@/components/Player";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { renamePlaylist, setPlaying } from "@/redux/slices/playlist";
import ToggleTextField from "@/components/ToggleTextField";
import SmallPlayIcon from "@/icons/SmallPlay";
import PlayingGif from "@/assets/gif/playing.gif";

import cn from "classnames";
import { useLocales } from "@/hooks/useLanguage";

interface IMusicPlayerProps {}

const MusicPlayer: React.FC<IMusicPlayerProps> = (props) => {
  const { t } = useLocales(["playlist"]);
  const dispatch = useDispatch();
  const { playlist, currentSong, playing } = useSelector(
    (state: IRootState) => state.playlist
  );

  return (
    <section className="flex flex-col items-center w-full grid-cols-12 gap-2 dark:text-white sm:grid ">
      <div className="flex flex-col items-center w-24 col-span-4 sm:w-full">
        <div
          className={`w-full aspect-w-1 relative aspect-h-1 overflow-hidden  duration-700 group ${
            playing ? "animate-spin-slow " : ""
          }`}
          style={{ borderRadius: playing ? "999px" : "15px" }}
        >
          <img
            src={currentSong?.thumbnail || "/jpg/skeleton.jpg"}
            alt={currentSong?.name}
            className="object-cover w-full h-full transition-transform duration-500 transform shadow-md pointer-events-none select-none group-hover:scale-110"
          />
          {playing ? (
            <PlayingIconAnimation
              onClick={() => {
                dispatch(setPlaying(false));
              }}
            />
          ) : (
            <PlayButton
              onClick={() => {
                currentSong && dispatch(setPlaying(true));
              }}
            />
          )}
        </div>
        <ToggleTextField
          type="text"
          className="mt-1.5 text-3xl font-bold text-center"
          inputClassName={cn(
            "text-3xl py-0 focus:outline-none font-bold text-center dark:bg-black"
          )}
          defaultValue={playlist?.name}
          maxLength={20}
          onSave={(val) => {
            dispatch(renamePlaylist(val));
          }}
        />
      </div>
      <div className="flex flex-col justify-around w-full h-full col-span-8">
        <div>
          <h2
            className="font-bold sm:text-5xl text-xxl paragraph-with-2-line"
            style={{ lineHeight: "1.3" }}
          >
            {currentSong?.name || t("playlist.waiting")}
          </h2>
          <h3 className="text-gray text-sm mt-0.5 dark:text-silver">
            {currentSong?.author || t("playlist.select-your-music")}
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
        <SmallPlayIcon className="w-1.5 h-1.5" />
      </div>
    </div>
  );
};

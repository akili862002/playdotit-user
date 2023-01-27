import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import cn from "classnames";
import {
  backToPreviousSong,
  setPlaying,
  setRequestNextSong,
} from "@/redux/slices/playlist";
import PrevIcon from "@/icons/Prev";
import BaseButton from "@/components/BaseButton";
import PauseIcon from "@/icons/Pause";
import PlayerPlayIcon from "@/icons/PlayerPlay";
import NextIcon from "@/icons/Next";
import { useState } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import SkeletonImage from "@/assets/jpg/skeleton.jpg";
import PlayingGif from "@/assets/gif/playing.gif";

interface IMiniMusicPlayerProps {}

const MiniMusicPlayer: React.FC<IMiniMusicPlayerProps> = (props) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const { currentSong, playing, historyStack, playlist } = useSelector(
    (state: IRootState) => state.playlist
  );

  useEventListener(
    "scroll",
    (e) => {
      const scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setIsShow(scroll > 400);
    },
    { runInFirstRender: true }
  );

  if (!isShow) return null;

  const handleNextSong = () => {
    dispatch(setRequestNextSong(true));
  };

  const handlePreviousSong = () => {
    dispatch(backToPreviousSong());
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div
      className="fixed right-0 grid items-center w-8 gap-2 p-1 duration-300 bg-white shadow-md h-9 group dark:bg-light-dark rounded-l-15 bottom-5 hover:w-30"
      style={{
        gridTemplateColumns: "60px 1fr",
      }}
    >
      <div
        className={cn(
          "h-6 w-6 overflow-hidden relative rounded-full ",
          playing ? "animate-spin-slow" : ""
        )}
      >
        <img
          className="object-cover w-full h-full"
          src={currentSong?.thumbnail || SkeletonImage}
          alt=""
        />

        {playing && (
          <PlayingIconAnimation
            onClick={() => {
              scrollToTop();
            }}
          />
        )}
      </div>
      <div className="flex-col hidden w-full group-hover:flex dark:text-white">
        <p
          className="font-medium truncate cursor-pointer text-md max-w-20"
          onClick={scrollToTop}
        >
          {currentSong?.name}
        </p>
        <div className="flex flex-row items-center justify-between w-full px-2 ">
          <BaseButton
            disabled={historyStack.length === 0}
            onClick={handlePreviousSong}
          >
            <PrevIcon />
          </BaseButton>
          <BaseButton
            className="flex items-center justify-center w-5 h-5"
            onClick={() => {
              dispatch(setPlaying(!playing));
            }}
          >
            {playing ? (
              <PauseIcon className="w-5 h-5 " />
            ) : (
              <PlayerPlayIcon className="w-5 h-5" />
            )}
          </BaseButton>
          <BaseButton
            disabled={!playlist.songs.length}
            onClick={handleNextSong}
          >
            <NextIcon />
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default MiniMusicPlayer;

const PlayingIconAnimation: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer"
    >
      <div className="absolute flex items-center justify-center w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 border border-white border-solid rounded-full left-1/2 top-1/2">
        <img className="w-1.5 h-1.5" src={PlayingGif} />
      </div>
    </div>
  );
};

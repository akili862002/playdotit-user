import BaseButton from "@/components/BaseButton";
import { IconButton } from "@/components/IconButton";
import Slider from "@/components/Slider";
import Spinner from "@/components/Spinner";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  backToPreviousSong,
  setCurrentSong,
  setPlaying,
  setRequestNextSong,
  setShuffle,
  setSync,
  setVolume,
  togglePlaying,
} from "@/redux/slices/playlist";
import { IRootState } from "@/redux/store";
import SyncIcon from "@/icons/Sync";
import ShuffleIcon from "@/icons/Shuffle";
import { getRandomInt } from "@/util/random";
import PrevIcon from "@/icons/Prev";
import PauseIcon from "@/icons/Pause";
import NextIcon from "@/icons/Next";
import PlayerPlayIcon from "@/icons/PlayerPlay";

import YoutubeIcon from "@/icons/Youtube";
import Volume from "@/components/Volume";
import { useActiveElement } from "@/hooks/useActiveElement";
import { useEventListener } from "@/hooks/useEventListener";
import { ISong } from "@/typings";
import { useLocales } from "@/hooks/useLanguage";
import toast from "react-hot-toast";
import withErrorBoundary from "@/HOC/withErrorBoundary";

interface IPlayerProps {}
const VOLUME_STEP = 0.1;

const Player: React.FC<IPlayerProps> = () => {
  const dispatch = useDispatch();
  const { t } = useLocales(["playlist"]);
  const {
    playing,
    currentSong,
    isRequestToNextSong,
    isShuffle,
    isSync,
    playlist,
    historyStack,
    prevSong,
    volume,
  } = useSelector((state: IRootState) => state.playlist);
  const { youtubeURL } = currentSong || {};
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const [randomListSongs, setRandomListSongs] = useState<ISong[]>(
    playlist.songs || []
  );
  const activeElement = useActiveElement();

  useEffect(() => {
    if (currentSong) {
      setPlayedSeconds(0);
      document.title = `${currentSong.name} | Playdotit`;
    } else {
      document.title = "Playdotit";
    }
  }, [currentSong]);

  useEffect(() => {
    if (isRequestToNextSong) {
      handleNextSong();
      dispatch(setRequestNextSong(false));
    }
  }, [isRequestToNextSong]);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (activeElement) return;

    const keyboardAction: Record<string, Function> = {
      " ": () => currentSong && dispatch(togglePlaying()),
      ArrowRight: () => handleNextSong(),
      n: () => handleNextSong(),
      ArrowLeft: () => handlePreviousSong(),
      p: () => handlePreviousSong(),
      ArrowUp: () =>
        dispatch(
          setVolume(volume + VOLUME_STEP > 1 ? 1 : volume + VOLUME_STEP)
        ),
      ArrowDown: () =>
        dispatch(
          setVolume(volume - VOLUME_STEP < 0 ? 0 : volume - VOLUME_STEP)
        ),
      l: () => dispatch(setSync(!isSync)),
      r: () => dispatch(setShuffle(!isShuffle)),
    };

    if (keyboardAction[e.key]) {
      keyboardAction[e.key]();
      e.preventDefault();
    }
  });

  useEffect(() => {
    if (playlist?.songs?.length) {
      setRandomListSongs(playlist.songs);
    }
  }, [playlist.songs]);

  const seekTo = (seconds: number) => {
    setPlayedSeconds(seconds);
    playerRef.current?.seekTo(seconds);
  };

  const handleEndedSong = () => {
    setTimeout(() => {
      handleNextSong();
    }, 2000);
  };

  const handleNextSong = () => {
    if (!playlist.songs.length) return;

    if (isSync) {
      return seekTo(0);
    }
    if (playlist.songs.length == 1) {
      dispatch(setPlaying(false));
      seekTo(0);
      return;
    }
    if (isShuffle) {
      const randIndex = getRandomInt(0, randomListSongs.length - 1);
      dispatch(
        setCurrentSong({
          song: randomListSongs[randIndex],
        })
      );

      // Remove that song
      let listRand = [...randomListSongs];
      listRand.splice(randIndex, 1);
      if (!listRand.length) {
        listRand = playlist.songs;
      }
      setRandomListSongs(listRand);

      return;
    }

    let currentSongIndex = playlist.songs.findIndex(
      (item) => item._id === currentSong?._id
    );

    // Handle case: if current songs is from Suggestions or removed
    if (currentSongIndex === -1) {
      let prevSongIndex = playlist.songs.findIndex(
        (item) => item._id === prevSong?._id
      );
      currentSongIndex = prevSongIndex;
    }

    dispatch(
      setCurrentSong({
        song: playlist.songs[getNextSongIndex(currentSongIndex)],
      })
    );
  };

  const getNextSongIndex = (currIndex: number) => {
    let nextIndex = (currIndex + 1) % playlist.songs.length;

    if (nextIndex < 0 || nextIndex > playlist.songs.length - 1) return 0;

    return nextIndex;
  };

  const handlePreviousSong = () => {
    dispatch(backToPreviousSong());
  };

  return (
    <div className="relative w-full">
      <div className="absolute w-1 h-1 opacity-0 pointer-events-none">
        <ReactPlayer
          width={30}
          height={30}
          ref={playerRef}
          url={youtubeURL}
          controls={false}
          playing={playing}
          playsinline={playing}
          onEnded={handleEndedSong}
          loop={isSync}
          pip={false}
          volume={volume}
          onPause={() => dispatch(setPlaying(false))}
          onPlay={() => dispatch(setPlaying(true))}
          onError={(err) => {
            console.error(err);
            toast.error(
              "Đã có lỗi xẩy ra khi phát bài này. Chúng tôi sẽ cố gắng sửa sớm nhất!",
              {
                position: "bottom-center",
                duration: 2000,
              }
            );
            handleNextSong();
          }}
          onReady={({ getDuration }) => {
            setDuration(getDuration());
            setLoading(false);
          }}
          onProgress={({ playedSeconds }) => {
            setPlayedSeconds(playedSeconds);
          }}
          config={{
            file: {
              attributes: {
                crossorigin: "anonymous",
              },
            },
          }}
        />
      </div>
      <div>
        <div className="flex flex-row justify-between mb-1 text-sm dark:text-silver text-gray ">
          <p>{formatSecToMin(playedSeconds)}</p>
          <p>{formatSecToMin(duration)}</p>
        </div>
        <Slider
          value={playedSeconds}
          max={duration}
          min={0}
          step={1}
          onChange={(val) => seekTo(val)}
        />
        <div className="w-full px-0 mt-2 sm:px-2">
          <div className="flex flex-row items-center justify-between w-full">
            <Volume
              value={volume * 100}
              onChange={(val) => setVolume(val / 100)}
            />
            <IconButton
              tooltip={t("playlist.shuffle")}
              onClick={() => dispatch(setShuffle(!isShuffle))}
            >
              <ShuffleIcon
                className={
                  isShuffle
                    ? "text-black dark:text-white"
                    : "text-silver dark:text-gray "
                }
              />
            </IconButton>
            <IconButton
              disabled={historyStack.length === 0}
              tooltip={t("playlist.prev")}
              onClick={handlePreviousSong}
            >
              <PrevIcon />
            </IconButton>
            <BaseButton
              className="flex items-center justify-center w-7 h-7"
              onClick={() => {
                if (loading || !currentSong) return;
                dispatch(setPlaying(!playing));
              }}
            >
              {loading && currentSong ? (
                <Spinner />
              ) : playing ? (
                <PauseIcon className=" w-7 h-7" />
              ) : (
                <PlayerPlayIcon className="w-7 h-7" />
              )}
            </BaseButton>
            <IconButton
              disabled={!playlist.songs.length}
              tooltip={t("playlist.next")}
              onClick={handleNextSong}
            >
              <NextIcon />
            </IconButton>
            <IconButton
              tooltip={t("playlist.sync")}
              onClick={() => dispatch(setSync(!isSync))}
            >
              <SyncIcon
                className={
                  isSync
                    ? "text-black dark:text-white animate-spin-md"
                    : "text-silver dark:text-gray "
                }
              />
            </IconButton>
            <a href={currentSong?.youtubeURL} target="_blank">
              <IconButton
                tooltip="Youtube video"
                onClick={() => {
                  dispatch(setPlaying(false));
                }}
              >
                <YoutubeIcon className="text-gray " />
              </IconButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(Player);

const formatSecToMin = (seconds: number) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

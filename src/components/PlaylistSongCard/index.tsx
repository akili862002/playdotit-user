import { IconButton } from "@/components/IconButton";
import { ISong } from "@/typings";
import MovableIcon from "@/icons/Movable";
import TrashIcon from "@/icons/Trash";
import SmallPlayIcon from "@/icons/SmallPlay";
import SongIcon from "@/icons/Song";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { useLocales } from "@/hooks/useLanguage";
import PlayingGif from "@/assets/gif/playing.gif";
import DownloadIcon from "@/icons/Download";

interface IPlaylistSongCardProps {
  songIndex: number;
  className?: string;
  song: ISong;
  active: boolean;
  playing: boolean;
  onClick: () => void;
  onRemove: () => void;
  onActive: (childRect: { top: number; bottom: number }) => void;
}

const PlaylistSongCard: React.FC<IPlaylistSongCardProps> = ({
  className = "",
  song,
  active,
  playing,
  onClick,
  onRemove,
  onActive,
}) => {
  if (!song) return null;
  const [isConfirmRemove, setIsConfirmRemove] = useState(false);
  const { t } = useLocales(["common", "playlist"]);
  const { name, author, thumbnail, youtubeURL } = song;
  const [isLoadImageError, setIsLoadImageError] = useState(false);
  const songRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && songRef.current) {
      var childRect = songRef.current.getBoundingClientRect();
      onActive({
        top: childRect.top,
        bottom: childRect.bottom,
      });
    }
  }, [active]);

  let videoId = youtubeURL?.split("v=")[1];
  if (!videoId) {
    const splitURL = youtubeURL.split(/\//g);
    videoId = splitURL[splitURL.length - 1];
  }

  return (
    <div
      ref={songRef}
      className={cn(
        " playlist-song-card max-w-full group relative rounded-8 py-1 cursor-pointer",
        active && "dark:bg-light-dark bg-alice-blue",
        !active && "hover:bg-alice-blue dark:hover:bg-light-dark",
        className
      )}
      onClick={onClick}
    >
      <div className="container flex items-center w-full max-w-full gap-1 ">
        <div
          className={cn(
            "sm:flex w-3 flex-shrink-0 hidden items-center justify-center dark:text-white",
            active && playing && "animate-bounce"
          )}
        >
          {active ? <SongIcon /> : <MovableIcon />}
        </div>
        <div className="w-4.5 h-4.5 ml-1 rounded-8 flex-shrink-0 overflow-hidden relative">
          <img
            src={isLoadImageError ? "/jpg/skeleton.jpg" : thumbnail}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => setIsLoadImageError(true)}
            loading="lazy"
          />
          {active && playing && <PlayingIconAnimation />}
          {active && !playing && <PlayButton />}
        </div>
        <div className="space-y-0.5 justify-center max-w-[calc(100%-100px)]">
          <h5 className="text-lg font-medium truncate sm:font-semibold dark:text-white">
            {name}
          </h5>
          <p className="text-xs truncate text-gray dark:text-silver">
            {author}
          </p>
        </div>
        <div className="sm:opacity-0 opacity-100 bg-black sm:bg-light-dark pl-3 rounded-r-8 right-0 h-full absolute flex group-hover:opacity-100 flex-row justify-between items-center gap-0.5 ">
          <IconButton
            tooltip={t("playlist.download")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <a
              href={`https://www.y2mate.com/vi/youtube-mp3/${videoId}`}
              target="_blank"
            >
              <DownloadIcon className="text-silver" />
            </a>
          </IconButton>
          <IconButton
            tooltip={
              !isConfirmRemove ? t("playlist.remove") : t("common.confirm")
            }
            onClick={(e) => {
              e.stopPropagation();

              if (!isConfirmRemove) {
                setIsConfirmRemove(true);
                setTimeout(() => {
                  setIsConfirmRemove(false);
                }, 1500);
              } else {
                onRemove();
              }
            }}
          >
            <TrashIcon
              className={isConfirmRemove ? "text-danger" : "text-silver"}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSongCard;

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
      <SmallPlayIcon className="w-2 h-2" />
    </div>
  );
};

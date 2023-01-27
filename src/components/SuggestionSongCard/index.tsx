import { IconButton } from "@/components/IconButton";
import { ISong } from "@/typings";
import SmallPlayIcon from "@/icons/SmallPlay";

import SongIcon from "@/icons/Song";
import AddSongIcon from "@/icons/AddSong";
import cn from "classnames";
import { useState } from "react";
import ReportIcon from "@/icons/Report";
import PlayingGif from "@/assets/gif/playing.gif";
import { useLocales } from "@/hooks/useLanguage";

interface ISuggestionSongCardProps {
  className?: string;
  song: ISong;
  active: boolean;
  playing: boolean;
  onClick: () => void;
  onAddSong: () => void;
  onReport: () => void;
}

const SuggestionSongCard: React.FC<ISuggestionSongCardProps> = ({
  className = "",
  song,
  active,
  playing,
  onClick,
  onAddSong,
  onReport,
}) => {
  if (!song) return null;
  const { t } = useLocales(["playlist"]);
  const { name, author, thumbnail } = song;
  const [isLoadImageError, setIsLoadImageError] = useState(false);
  const [isConfirmReport, setIsConfirmReport] = useState(false);

  return (
    <div
      className={`w-full hover:shadow-md rounded-8 py-1 cursor-pointer ${
        active
          ? "dark:bg-light-dark bg-alice-blue"
          : "hover:bg-white dark:hover:bg-light-dark"
      } ${className}`}
      onClick={onClick}
    >
      <div
        className="container grid items-center w-full max-w-full gap-1"
        style={{
          gridTemplateColumns: "36px 45px 1fr auto",
        }}
      >
        <div
          className={cn(
            "flex items-center justify-center text-gray dark:text-silver",
            playing && "animate-bounce"
          )}
        >
          <SongIcon />
        </div>
        <div className="w-4.5 h-4.5 rounded-8 overflow-hidden relative">
          <img
            src={isLoadImageError ? "/jpg/skeleton.jpg" : thumbnail}
            alt={name}
            className="object-cover w-full h-full "
            onError={(e) => setIsLoadImageError(true)}
            loading="lazy"
          />
          {active && playing && <PlayingIconAnimation />}
          {active && !playing && <PlayButton />}
        </div>
        <div className="flex flex-col gap-0.5 justify-center w-min max-w-15 md:max-w-45">
          <h5 className="overflow-hidden text-lg font-medium truncate sm:font-semibold dark:text-white ">
            {name}
          </h5>
          <p className="text-xs truncate dark:text-silver text-gray">
            {author}
          </p>
        </div>
        <div className="pr-2 flex text-gray dark:text-silver flex-row items-center gap-0.5 sm:gap-1.5">
          <IconButton
            tooltip={
              isConfirmReport ? t("playlist.confirm") : t("playlist.report")
            }
            onClick={(e) => {
              e.stopPropagation();
              if (!isConfirmReport) {
                setIsConfirmReport(true);
                setTimeout(() => {
                  setIsConfirmReport(false);
                }, 1200);
              } else {
                onReport();
              }
            }}
          >
            <ReportIcon className={isConfirmReport ? "text-danger" : ""} />
          </IconButton>
          <IconButton
            tooltip={t("playlist.add")}
            onClick={(e) => {
              e.stopPropagation();
              onAddSong();
            }}
          >
            <AddSongIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SuggestionSongCard;

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

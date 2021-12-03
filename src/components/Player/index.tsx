import BaseButton from "components/BaseButton";
import IconButton from "components/IconButton";
import Slider from "components/Slider";
import Spinner from "components/Spinner";
import SVG from "components/SVG";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface IPlayerProps {}

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

const Player: React.FC<IPlayerProps> = props => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="relative w-full">
      <div className="absolute w-1 h-1 opacity-0 pointer-events-none">
        <ReactPlayer
          ref={playerRef}
          url="https://youtu.be/M-P4QBt-FWw"
          controls={false}
          playing={playing}
          playsinline={playing}
          onEnded={() => {
            setTimeout(() => {
              setPlayedSeconds(0);
              setPlaying(false);
            }, 1000);
          }}
          loop={loop}
          pip={false}
          onReady={({ getDuration }) => {
            console.log("Ready!, ");
            setDuration(getDuration());
            setLoading(false);
          }}
          onProgress={({ played, playedSeconds }) => {
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
        <div className="flex flex-row justify-between text-sm text-gray mb-0.5">
          <p>{formatSecToMin(playedSeconds)}</p>
          <p>{formatSecToMin(duration)}</p>
        </div>
        <Slider
          value={playedSeconds}
          max={duration}
          min={0}
          step={1}
          onChange={val => {
            setPlayedSeconds(val);
            playerRef.current?.seekTo(val, "seconds");
          }}
        />
        <div className="w-full mt-2 px-7">
          <div className="flex flex-row items-center justify-between w-full">
            <IconButton tooltip="Shuffle">
              <SVG name="player/shuffle" />
            </IconButton>
            <IconButton tooltip="Previous">
              <SVG name="player/prev" />
            </IconButton>
            <BaseButton
              className="flex items-center justify-center w-7 h-7"
              onClick={() => {
                if (loading) return;
                setPlaying(!playing);
              }}
            >
              {loading ? (
                <Spinner />
              ) : (
                <SVG
                  name={playing ? "player/pause" : "player/play"}
                  className="w-7 h-7"
                />
              )}
            </BaseButton>
            <IconButton tooltip="Next">
              <SVG name="player/next" />
            </IconButton>
            <IconButton tooltip="Sync">
              <SVG name="player/sync" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

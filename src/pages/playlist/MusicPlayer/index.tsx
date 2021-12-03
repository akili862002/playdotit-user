import Player from "components/Player";
import { fakePlaylist } from "constants/fakePlaylist";
import { useState } from "react";
import { IPlaylist, ISong } from "typings";

interface IMusicPlayerProps {}

const MusicPlayer: React.FC<IMusicPlayerProps> = props => {
  const [currentSong, setCurrentSong] = useState<ISong>(fakePlaylist.songs[0]);
  const [playlist, setPlaylist] = useState<IPlaylist>(fakePlaylist);

  return (
    <section className="grid w-full grid-cols-12 gap-2 ">
      <div className="flex flex-col items-center w-full col-span-4">
        <div className="w-full aspect-w-1 aspect-h-1">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.name}
            className="object-cover w-full h-full shadow-md pointer-events-none select-none rounded-15"
          />
        </div>
        <h1 className="mt-1.5 text-3xl font-bold">{playlist.name}</h1>
      </div>
      <div className="flex flex-col justify-between w-full col-span-8">
        <div>
          <h2 className="text-5xl font-bold">{currentSong.name}</h2>
          <h3 className="text-gray text-sm -mt-0.5">{currentSong.author}</h3>
        </div>
        <Player />
      </div>
    </section>
  );
};

export default MusicPlayer;

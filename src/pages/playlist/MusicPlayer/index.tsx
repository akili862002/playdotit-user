import { fakePlaylist } from "constants/fakePlaylist";
import { useState } from "react";
import { IPlaylist, ISong } from "typings";

interface IMusicPlayerProps {}

const MusicPlayer: React.FC<IMusicPlayerProps> = props => {
  const [currentSong, setCurrentSong] = useState<ISong>(fakePlaylist.songs[0]);
  const [playlist, setPlaylist] = useState<IPlaylist>(fakePlaylist);

  return (
    <section className="w-full grid grid-cols-12 gap-2 ">
      <div className="col-span-4 w-full flex flex-col items-center">
        <div className=" w-full aspect-w-1 aspect-h-1">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.name}
            className="w-full h-full object-cover rounded-15 shadow-md select-none pointer-events-none"
          />
        </div>
        <h1 className="mt-1.5 text-3xl font-bold">{playlist.name}</h1>
      </div>
      <div className="col-span-8 w-full flex-col flex justify-between">
        <div>
          <h2 className="text-5xl font-bold">{currentSong.name}</h2>
          <h3 className="text-gray text-sm -mt-0.5">{currentSong.author}</h3>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;

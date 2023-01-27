import PlaylistSongCard from "@/components/PlaylistSongCard";
import ListLayout from "@/layouts/List";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import {
  deleteSong,
  moveItemDnD,
  setCurrentSong,
  setPlaylist,
} from "@/redux/slices/playlist";
import { setOpenFloatingSearch } from "@/redux/slices/common";
import { useDevice } from "@/hooks/useDevice";
import PlusIcon from "@/icons/Plus";

import { createSongAPI } from "@/services/songs";
import Button from "@/components/Button";
import { useResponsive } from "@/hooks/useResponsive";
import SharePlaylist from "./SharePlaylist";
import { useEffect, useRef, useState } from "react";
import { useLocales } from "@/hooks/useLanguage";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { arrayMove } from "@/util/arrayMove";
import { cn } from "@/util/classnames.utils";

interface IQueueSongsProps {}

const QueueSongs: React.FC<IQueueSongsProps> = () => {
  const { t } = useLocales(["playlist"]);
  const { playlist } = useSelector((state: IRootState) => state.playlist);
  const dispatch = useDispatch();

  return (
    <ListLayout
      className="mt-5 "
      title="Playlist"
      subTitle={`(${playlist.songs.length})`}
      rightSide={<SharePlaylist />}
    >
      <RenderListItems />
      <div className="flex items-center justify-center w-full mt-5 ">
        <Button
          onClick={() => dispatch(setOpenFloatingSearch(true))}
          className="w-20"
          icon={<PlusIcon className="w-2 h-2" />}
        >
          {t("playlist.add-my-song")}
        </Button>
      </div>
    </ListLayout>
  );
};

export default QueueSongs;

const RenderListItems = () => {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { currentSong, playing, playlist } = useSelector(
    (state: IRootState) => state.playlist
  );
  const { downPhone } = useResponsive();
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    listContainerRef.current?.addEventListener("scroll", () => {
      const scrollTop = listContainerRef.current?.scrollTop || 0;
      setIsScrollDown(scrollTop > 15);
    });
  }, []);

  const handleScrollToSongActive = (childRect: {
    top: number;
    bottom: number;
  }) => {
    if (!listContainerRef.current) return;
    var parentViewableArea = {
      height: listContainerRef.current.clientHeight,
      width: listContainerRef.current.clientWidth,
    };

    const listRect = listContainerRef.current?.getBoundingClientRect();
    const isViewable =
      childRect.top >= listRect.top &&
      childRect.bottom <= listRect.top + parentViewableArea.height;

    if (!isViewable) {
      const scrollTop = childRect.top - listRect.top;
      const scrollBot = childRect.bottom - listRect.bottom;
      if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
        listContainerRef.current.scrollTop += scrollTop;
      } else {
        listContainerRef.current.scrollTop += scrollTop;
      }
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(
      moveItemDnD({
        from: result.source.index,
        to: result.destination.index,
      })
    );
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: isScrollDown
            ? "radial-gradient(farthest-side at 50% 0,rgba(0,0,0,.2),transparent)"
            : "none",
        }}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="queue-songs">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // ref={listContainerRef}
              className="flex flex-col w-full"
            >
              {playlist?.songs?.map((song, index) => (
                <Draggable key={song?._id} draggableId={song._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="h-7"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <PlaylistSongCard
                        className={cn(
                          snapshot.isDragging &&
                            "dark:bg-light-dark bg-white shadow-md"
                        )}
                        active={currentSong?._id === song._id}
                        playing={playing}
                        songIndex={index}
                        song={song}
                        onClick={() => {
                          dispatch(setCurrentSong({ song }));
                          createSongAPI({ song, point: 5 });
                        }}
                        onRemove={() => {
                          dispatch(deleteSong({ id: song._id || "" }));
                          createSongAPI({ song, point: -2 });
                        }}
                        onActive={handleScrollToSongActive}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {!playlist?.songs.length && <EmptySongsAlert />}
    </div>
  );
};

const EmptySongsAlert: React.FC<{}> = () => {
  const { isMac } = useDevice();
  const { t } = useLocales(["playlist"]);

  const shortcut = isMac ? "⌘ + K" : "Alt + K";

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <h2 className="mb-1 text-xl font-bold text-gray dark:text-silver">
        {t("playlist.empty-alert-title")}
      </h2>
      <p className="text-sm font-light text-silver dark:text-gray">
        {t("playlist.empty-alert-message").replace("$1", shortcut)}
      </p>
    </div>
  );
};

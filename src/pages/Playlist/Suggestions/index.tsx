import Button from "@/components/Button";
import SuggestionSongCard from "@/components/SuggestionSongCard";
import RefreshIcon from "@/icons/Refresh";
import ListLayout from "@/layouts/List";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enqueueSongToPlaylist,
  setCurrentSong,
  unshiftSongToPlaylist,
} from "@/redux/slices/playlist";
import { IRootState } from "@/redux/store";
import { createSongAPI, getSuggestionsAPI, reportSongAPI } from "@/services/songs";
import { ISong } from "@/typings";
import { IListResponse } from "@/typings/common";
import { useLocales } from "@/hooks/useLanguage";
import toast from "react-hot-toast";

interface ISuggestionsProps {}

const SIZE = 10;

const Suggestions: React.FC<ISuggestionsProps> = (props) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { t } = useLocales(["playlist"]);
  const { currentSong, playlist, playing } = useSelector(
    (state: IRootState) => state.playlist,
  );

  const [listSongs, setListSongs] = useState<IListResponse<ISong> | null>({
    results: [],
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    invokeGetAllSuggestions(page);
  }, [page]);

  const invokeGetAllSuggestions = async (page: number) => {
    setLoading(true);
    const listSongs = await getSuggestionsAPI({ page, size: SIZE });
    setListSongs(listSongs);
    setLoading(false);
    setIsFirstLoad(false);
  };

  const nextPage = () => {
    const isLastPage = Math.ceil(listSongs?.totalCount || 0) / SIZE < page + 1;
    setPage(isLastPage ? 0 : page + 1);
  };

  const removeSongOutOfList = (index: number) => {
    if (!listSongs?.results?.length) return;

    listSongs.results.splice(index, 1);
    setListSongs({
      results: listSongs.results,
      totalCount: listSongs.totalCount - 1,
    });

    if (listSongs.results.length === 0) nextPage();
  };

  return (
    <ListLayout
      className="mt-5"
      title={t("playlist.suggestions")}
      subTitle={`(${SIZE}/${listSongs?.totalCount})`}
      rightSide={
        <Button
          className="mb-0.5 py-1 px-2"
          loading={loading}
          icon={<RefreshIcon className="w-2 h-2" />}
          onClick={() => nextPage()}
        >
          <p className="hidden sm:block">{isFirstLoad ? t("playlist.loading") : t("playlist.refresh")}</p>
        </Button>
      }
    >
      {listSongs?.results?.map((song, index) => (
        <SuggestionSongCard
          key={song?._id}
          song={song}
          playing={currentSong?._id === song._id && playing}
          active={currentSong?._id === song._id}
          onClick={() => {
            dispatch(setCurrentSong({ song, playing: true }));
          }}
          onAddSong={() => {
            if (playing) {
              dispatch(enqueueSongToPlaylist(song));
            } else {
              dispatch(unshiftSongToPlaylist(song));
              dispatch(setCurrentSong({ song, playing: true }));
            }
            createSongAPI({ song, point: 4 });
            removeSongOutOfList(index);
          }}
          onReport={() => {
            reportSongAPI({ youtubeURL: song.youtubeURL });
            removeSongOutOfList(index);
            toast.success(
              "Cảm ơn bạn đã báo vi phạm bài hát này, chúng tôi sẽ xem xét chúng!",
              {
                position: "bottom-left",
                duration: 6000,
              },
            );
          }}
        />
      ))}
    </ListLayout>
  );
};

export default Suggestions;

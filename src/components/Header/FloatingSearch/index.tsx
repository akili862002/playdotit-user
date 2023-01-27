import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog as DialogUI, Transition } from "@headlessui/react";
import { useDebounced } from "@/hooks/useDebounced";
import axios, { AxiosResponse } from "axios";
import { YOUTUBE_API_KEYS } from "@/constants/env";
import { ISong, IYoutubeSearchItem, IYoutubeSearchResponse } from "@/typings";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSongToPlaylist } from "@/redux/slices/playlist";
import { randomId } from "@/util/random";
import Spinner from "@/components/Spinner";
import { htmlDecode } from "@/util/htmlDecode";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDevice } from "@/hooks/useDevice";
import { createSongAPI } from "@/services/songs";
import withErrorBoundary from "@/HOC/withErrorBoundary";
import { IRootState } from "@/redux/store";
import { toast } from "react-hot-toast";
import SongIcon from "@/icons/Song";
import BaseButton from "@/components/BaseButton";
import { useLocales } from "@/hooks/useLanguage";
import SearchIcon from "@/icons/Search";

interface ILoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const FloatingSearch = (
  props: PropsWithChildren<ILoginDialogProps>
): JSX.Element => {
  const { open, onClose } = props;
  const { isDarkMode } = useSelector((state: IRootState) => state.common);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <DialogUI as="div" className="fixed inset-0 z-100" onClose={handleClose}>
        <div className="min-h-screen px-2 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogUI.Overlay
              className="fixed inset-0 "
              style={{
                backgroundColor: isDarkMode ? "#13131389" : "#13131344",
              }}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen " aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`
              inline-block mt-3 sm:mt-8 text-left align-middle transition-all transform  
              w-full max-w-sm 
            `}
            >
              <MainContent onClose={onClose} />
            </div>
          </Transition.Child>
        </div>
      </DialogUI>
    </Transition>
  );
};

export default withErrorBoundary(FloatingSearch);

const MainContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  var [apiKey, setApiKey] = useLocalStorage(
    "YoutubeAPIKey",
    YOUTUBE_API_KEYS[0]
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [isRefreshInput, setIsRefreshInput] = useState(false);

  const { searchResults, inputText, setInputText } =
    useDebounced<IYoutubeSearchItem>(async (text, youtubeKey) => {
      if (!text) return [];
      try {
        const response: AxiosResponse<IYoutubeSearchResponse> = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${text}&type=video&key=${youtubeKey}`
        );
        setLoading(false);
        return response?.data?.items;
      } catch (error) {
        console.log(
          "[FETCH ERROR] Fetch search from youtube api error ---> changed key!"
        );
        setLoading(false);
        const currentKeyIndex =
          YOUTUBE_API_KEYS.findIndex((key) => key === youtubeKey) || 0;
        const nextIndex = (currentKeyIndex + 1) % YOUTUBE_API_KEYS.length;

        setApiKey(YOUTUBE_API_KEYS[nextIndex]);
        return [];
      }
    }, apiKey);

  useEffect(() => {
    const changeSelectedSongKeyPress = (e: KeyboardEvent) => {
      if (!searchResults.result) return;
      const len = searchResults.result.length;
      switch (e.key) {
        case "ArrowDown":
          setSelectIndex((i) => (i + 1) % len);
          break;
        case "ArrowUp":
          setSelectIndex((i) => (i + len - 1) % len);
          break;
        case "Enter":
          addSongToQueue(searchResults.result[selectIndex]);
          break;
        default:
          break;
      }
    };

    document.body.addEventListener("keydown", changeSelectedSongKeyPress);
    return () => {
      document.body.removeEventListener("keydown", changeSelectedSongKeyPress);
    };
  }, [searchResults, selectIndex]);

  const addSongToQueue = (songYoutubeData: IYoutubeSearchItem) => {
    if (!songYoutubeData) return;
    setInputText("");
    setSelectIndex(0);
    const song: ISong = {
      _id: randomId(),
      name: htmlDecode(songYoutubeData?.snippet?.title) || "",
      author: songYoutubeData?.snippet?.channelTitle,
      thumbnail: songYoutubeData?.snippet?.thumbnails?.high?.url,
      youtubeURL: `https://www.youtube.com/watch?v=${songYoutubeData.id.videoId}`,
    };
    dispatch(enqueueSongToPlaylist(song));

    createSongAPI({ song, point: 3 });

    toast.success("Thêm bài hát thành công!", {
      position: "bottom-center",
    });
    setIsRefreshInput(true);
    setIsRefreshInput(false);
    // onClose();
  };

  return (
    <>
      <Searchbox
        isRefreshInput={isRefreshInput}
        loading={loading}
        inputText={inputText}
        onChange={(text) => {
          if (!loading) setLoading(true);
          setInputText(text);
        }}
      />
      <div className="flex flex-col w-full gap-1 mt-2">
        {searchResults.result?.map((item, index) => (
          <SearchResultItem
            key={item.id.videoId}
            item={item}
            active={index === selectIndex}
            onClick={() => addSongToQueue(item)}
            onHover={() => setSelectIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

const SearchResultItem: React.FC<{
  item: IYoutubeSearchItem;
  active: boolean;
  onClick: () => void;
  onHover: () => void;
}> = ({ item, active, onClick, onHover }) => {
  const {
    snippet: { title, channelTitle, thumbnails },
  } = item || {};

  return (
    <BaseButton
      className={`bg-white items-center cursor-pointer px-1.5 py-1 gap-1 w-full rounded-8 grid ${
        active && "scale-105 shadow-sm z-10 duration-200"
      }`}
      style={{ gridTemplateColumns: "50px 1fr 24px" }}
      onClick={() => onClick()}
      onMouseOver={onHover}
    >
      <div className="w-5 h-5 overflow-hidden rounded-5 ">
        <img
          src={thumbnails.medium.url}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-left">
        <p className="font-semibold text-black text-md sm:text-lg">
          {htmlDecode(title)}
        </p>
        <p className="text-xs text-gray">{channelTitle}</p>
      </div>
      {active && <SongIcon className="text-black animate-bounce w-2.5 h-2.5" />}
    </BaseButton>
  );
};

const Searchbox: React.FC<{
  isRefreshInput: boolean;
  loading: boolean;
  inputText: string;
  onChange: (text: string) => void;
}> = ({ onChange, inputText, loading, isRefreshInput }) => {
  const { t } = useLocales(["common"]);
  const { isMac } = useDevice();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRefreshInput && inputRef.current) {
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }
  }, [isRefreshInput]);

  return (
    <label
      className="bg-white w-full grid items-center pr-1.5 pl-0.5 rounded-8 py-1.5 shadow-md"
      style={{ gridTemplateColumns: "40px 1fr" }}
    >
      {loading && inputText ? (
        <Spinner size={24} className="w-2.5 h-2.5 ml-1" />
      ) : (
        <SearchIcon className="w-2.5 h-2.5 ml-1" />
      )}
      <input
        ref={inputRef}
        value={inputText}
        className="w-full ml-1 text-lg font-medium outline-none placeholder:text-silver bg-none "
        placeholder={`${t("common.search-placeholder")} (${
          isMac ? "⌘ + K" : "Ctrl + K"
        })`}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

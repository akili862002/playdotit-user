import SearchIcon from "@/icons/Search";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode, setOpenFloatingSearch } from "@/redux/slices/common";
import { IRootState } from "@/redux/store";
import FloatingSearch from "./FloatingSearch";
import { useDevice } from "@/hooks/useDevice";
import { PATHS } from "@/routes";
import { IconButton } from "@/components/IconButton";
import LanguageModifier from "@/components/LanguageModifier";
import ErrorBoundary from "@/components/ErrorBoundary";
import DarkIcon from "@/icons/Dark";
import LightIcon from "@/icons/Light";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IS_DARK_MODE_KEY } from "@/constants/localStorage";
import BaseButton from "@/components/BaseButton";
import cn from "classnames";
import LogoIcon from "./icons";
import { Link } from "react-router-dom";
import { useLocales } from "@/hooks/useLanguage";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const { isDarkMode } = useSelector((state: IRootState) => state.common);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    setIsScrollDown(window.scrollY > 70);
    window.addEventListener("scroll", () => {
      setIsScrollDown(window.scrollY > 70);
    });
  }, []);

  return (
    <>
      <div className="h-5.5 w-full relative"></div>
      <header
        className={cn(
          "fixed inset-0 z-40 w-full px-1 h-5.5 flex items-center justify-center backdrop-background",
          isScrollDown && "scrolled"
        )}
      >
        <div className="flex flex-row items-center justify-between w-full max-w-md ">
          <Link to="/">
            <a href="/">
              <BaseButton>
                <LogoIcon className="dark:invert" />
              </BaseButton>
            </a>
          </Link>
          <div className="flex flex-row items-center gap-1.5 sm:gap-3 dark:text-silver">
            <Links />
            <ErrorBoundary>
              <SearchBox />
            </ErrorBoundary>
            <ErrorBoundary>
              <ThemeMode />
            </ErrorBoundary>
            <ErrorBoundary>
              <LanguageModifier />
            </ErrorBoundary>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);

const SearchBox = () => {
  const dispatch = useDispatch();
  const { isMac } = useDevice();

  const { isOpenFloatingSearch } = useSelector(
    (state: IRootState) => state.common
  );

  // check url include "playlist"
  const isPlaylistDetailPage = window.location.href.includes("playlist");

  useEffect(() => {
    const openSearchBoxWhenPressKey = (e: KeyboardEvent) => {
      // For mac
      if (e.key === "k" && e.metaKey) handleOpenFloatingSearch();
      // For window
      else if (e.key === "k" && (e.ctrlKey || e.altKey))
        handleOpenFloatingSearch();
    };

    document.body.addEventListener("keydown", openSearchBoxWhenPressKey);

    return () =>
      document.body.removeEventListener("keydown", openSearchBoxWhenPressKey);
  }, [isPlaylistDetailPage]);

  const handleOpenFloatingSearch = () => {
    isPlaylistDetailPage && dispatch(setOpenFloatingSearch(true));
  };

  return (
    <>
      <IconButton
        className="dark:hover:text-white"
        tooltip={`Search (${isMac ? "⌘ + K" : "Alt + K"})`}
        onClick={handleOpenFloatingSearch}
      >
        <SearchIcon />
      </IconButton>
      <FloatingSearch
        open={isOpenFloatingSearch}
        onClose={() => dispatch(setOpenFloatingSearch(false))}
      />
    </>
  );
};

const Links: React.FC<{}> = (props) => {
  const { t } = useLocales(["common"]);
  const [currIndexRoute, setCurrIndexRoute] = useState<null | number>(null);

  const routes = [
    {
      name: t("common.my-playlists"),
      link: PATHS.HOME,
    },
  ];

  // useEffect(() => {
  //   for (let i = 0; i < routes.length; i++) {
  //     const link = routes[i].link;
  //     if (  .asPath === link) {
  //       return setCurrIndexRoute(i);
  //     }
  //   }
  //   setCurrIndexRoute(null);
  // }, [router.asPath]);

  return (
    <div className="text-md  text-silver sm:flex hidden flex-row items-center gap-1.5">
      {routes.map(({ name, link }, index) => (
        <Link key={name} to={link}>
          <a
            className={`hover:text-black dark:hover:text-white cursor-pointer ${
              index === currIndexRoute &&
              "text-black dark:text-white font-semibold"
            }`}
          >
            {name}
          </a>
        </Link>
      ))}
    </div>
  );
};

const ThemeMode: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: IRootState) => state.common);
  const [_, setInitIsDarkMode] = useLocalStorage(IS_DARK_MODE_KEY, false);
  const isInitialed = useRef(false);

  useEffect(() => {
    if (!isInitialed.current) {
      let initIsDarkMode = false;
      if (
        localStorage.getItem(IS_DARK_MODE_KEY) === "true" ||
        (!(IS_DARK_MODE_KEY in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        initIsDarkMode = true;
      }

      dispatch(setIsDarkMode(initIsDarkMode));
      document.body.classList.toggle("dark", initIsDarkMode);
      isInitialed.current = true;
      return;
    }

    setInitIsDarkMode(isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <IconButton
      tooltip={isDarkMode ? "Light" : "Dark"}
      onClick={() => {
        dispatch(setIsDarkMode(!isDarkMode));
      }}
      className="text-gray"
    >
      {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </IconButton>
  );
};

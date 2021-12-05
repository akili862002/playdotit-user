import SVG from "components/SVG";
import { useState } from "react";
import FloatingSearch from "./FloatingSearch";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <header className="max-w-md w-full h-5.5 flex flex-row justify-between items-center">
      <a href="/">
        <SVG name="common/logo" className="w-auto h-3" />
      </a>
      <SearchBox />
    </header>
  );
};

export default Header;

const SearchBox: React.FC<{}> = props => {
  const [isOpenSearch, setIsOpenSearch] = useState(true);

  return (
    <>
      <div
        onClick={() => setIsOpenSearch(!isOpenSearch)}
        className="cursor-pointer bg-alice-blue  text-sm text-silver w-7/12 flex flex-row items-center px-1 py-0.5 gap-1.5 rounded-4"
      >
        <SVG name="common/search" className="search-box__icon" />
        <p className="placeholder">Find my song</p>
      </div>
      <FloatingSearch
        open={isOpenSearch}
        onClose={() => setIsOpenSearch(false)}
      />
    </>
  );
};

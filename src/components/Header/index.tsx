import SVG from "components/SVG";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setOpenFloatingSearch } from "redux/slices/common";
import { IRootState } from "redux/store";
import FloatingSearch from "./FloatingSearch";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <header className="max-w-md w-full px-1 h-5.5 flex flex-row justify-between items-center">
      <a href="/">
        <SVG name="common/logo" className="w-auto h-3" />
      </a>
      <SearchBox />
    </header>
  );
};

export default Header;

const SearchBox: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const { isOpenFloatingSearch } = useSelector(
    (state: IRootState) => state.common,
  );

  return (
    <>
      <div
        onClick={() => dispatch(setOpenFloatingSearch(true))}
        className="cursor-pointer bg-alice-blue  text-sm text-silver w-7/12 flex flex-row items-center px-1 py-0.5 gap-1.5 rounded-4"
      >
        <SVG name="common/search" className="search-box__icon" />
        <p className="placeholder">Find my song</p>
      </div>
      <FloatingSearch
        open={isOpenFloatingSearch}
        onClose={() => dispatch(setOpenFloatingSearch(false))}
      />
    </>
  );
};

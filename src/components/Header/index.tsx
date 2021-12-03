import SVG from "components/SVG";
import "./styles.scss";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <header className="main-header">
      <a href="/">
        <SVG name="common/logo" className="logo" />
      </a>
      <SearchBox />
    </header>
  );
};

export default Header;

const SearchBox: React.FC<{}> = props => {
  return (
    <div className="search-box__container">
      <SVG name="common/search" className="search-box__icon" />
      <p className="placeholder">Find my song</p>
    </div>
  );
};

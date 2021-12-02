import SVG from "components/SVG";
import "./styles.scss";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <header className="main-header">
      <a href="/">
        <SVG name="common/logo" className="logo" />
      </a>
    </header>
  );
};

export default Header;

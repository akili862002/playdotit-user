import Header from "components/Header";
import "./styles.scss";

interface IMainLayoutProps {}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-layout__container">{children}</main>
    </>
  );
};

export default MainLayout;

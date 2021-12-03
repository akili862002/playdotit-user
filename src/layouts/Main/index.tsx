import Header from "components/Header";

interface IMainLayoutProps {}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-md w-full h-full px-2">{children}</main>
    </>
  );
};

export default MainLayout;

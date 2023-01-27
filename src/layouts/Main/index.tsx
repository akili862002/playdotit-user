import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import cn from "classnames";
import Footer from "@/components/Footer";
import { PropsWithChildren } from "react";

interface IMainLayoutProps {}

const MainLayout: React.FC<PropsWithChildren<IMainLayoutProps>> = ({
  children,
}) => {
  const { isDarkMode } = useSelector((state: IRootState) => state.common);

  return (
    <>
      <Header />
      <main
        className={cn(
          "w-full mr-auto ml-auto h-full max-w-md px-1.5 pb-5 min-h-[calc(100vh-130px)]",
          isDarkMode && "dark"
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

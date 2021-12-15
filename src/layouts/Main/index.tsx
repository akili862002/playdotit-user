import Header from "components/Header";

interface IMainLayoutProps {}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-full h-full max-w-md px-2 pb-5">{children}</main>

      <p className="absolute text-sm bottom-1 left-1">
        © Play.it is designed and created by{" "}
        <a href="https://www.facebook.com/rengar.the/">Dung Nguyen</a>*,{" "}
        <a href="">Quoc Duy</a>, Quoc Anh and Phuoc Toan
      </p>
    </>
  );
};

export default MainLayout;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastWrapperProps {}

const ToastWrapper: React.FC<IToastWrapperProps> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </>
  );
};

export default ToastWrapper;

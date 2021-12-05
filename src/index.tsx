import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <ReduxProvider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
    <ToastContainer />
  </ReduxProvider>,
  document.getElementById("root"),
);

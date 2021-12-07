import ReactDOM from "react-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import store from "redux/store";
import ToastWrapper from "./components/ToastWrapper";

ReactDOM.render(
  <ReduxProvider store={store}>
    <ToastWrapper>
      <App />
    </ToastWrapper>
  </ReduxProvider>,
  document.getElementById("root"),
);

import "../styles/reset.css";
import "../styles/fonts.css";
import "material-design-icons/iconfont/material-icons.css";
import "../styles/global.scss";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

import { AppComponent } from "next/dist/next-server/lib/router/router";
import "../styles/globals.css";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;

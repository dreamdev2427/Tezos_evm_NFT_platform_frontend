import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/index.css";
import { Provider } from "react-redux";
import { Navbar } from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { store } from "../config/redux";
// import { checkIfWalletIsConnected } from "../utils";
// import NotLogged from "../components/NotLogged";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // const [isConnected, setConnected] = useState(false);

  /**
   * Check if a wallet is connected
   */
  // const checkConnected = async (): Promise<void> => {
  //   const connected = await checkIfWalletIsConnected();
  //   if (connected) {
  //     setConnected(true);
  //   }
  // };

  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL); // Log for production purpose

  // useEffect(() => {
  //   checkConnected();
  // }, []);

  // if (!isConnected) return <NotLogged />;

  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Provider store={store}>
        <div className="flex flex-col h-screen justify-between">
          <Navbar />

          <div className="layout">
            <Component {...pageProps} />
          </div>

          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;

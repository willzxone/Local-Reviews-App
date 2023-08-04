import * as React from "react";
import "tailwindcss/tailwind.css";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { Provider, useDispatch } from "react-redux";
import { wrapper } from "../../store/index";
import { useEffect } from "react";
import { authActions } from "../../store/slices/AuthSlice";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    ...rest
  } = props;

  const { store } = wrapper.useWrappedStore(rest);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

// const disptach = useDispatch();

// const checkIfUserLoggedIn = async () => {
//   try {
//     // api request to api/user in nextjs
//     const { data } = await axios.post("http://localhost:3000/api/user");

//     // set user and access token in state
//     disptach(authActions.setUser(data.user));
//     disptach(authActions.setAccessToken(data.access));
//   } catch (error) {
//     if (error.response && error.response.data) {
//       //setError(error.response.data.message);
//       return;
//     } else if (error.request) {
//       //setError("Something went wrong");
//       return;
//     } else {
//       //setError("Something went wrong");
//       return;
//     }
//   }
// };
// useEffect(() => checkIfUserLoggedIn(), []);

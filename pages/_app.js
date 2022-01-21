import "../styles/globals.css";
import "../styles/pages/home/home.css";
import "../styles/pages/forms/form.css";
import "../styles/pages/users/user.css";
import "../styles/pages/chat/chat.css";
import "../styles/pages/settings/settings.css";

import AuthContextProvider from "../Firebase/Context";
import UserDataProvider from "../Firebase/UserContext";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <AuthContextProvider>
        <UserDataProvider>
          <Component {...pageProps} />
        </UserDataProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;

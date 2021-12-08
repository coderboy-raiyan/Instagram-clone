import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../Styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </NextAuthProvider>
  );
}

export default MyApp;

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { Inter } from "next/font/google";

import { trpc } from "~/utils/trpc";

import "~/styles/globals.css";
import { Provider } from "jotai";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  session: Session | null;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<Props>) => {
  return (
    <main className={inter.className}>
      <Provider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);

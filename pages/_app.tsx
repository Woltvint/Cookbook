import '@/styles/globals.css'
import '@/styles/scrollbar.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Navbar } from '@/src/navbar';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          primaryColor: "dark",
          primaryShade: 5,
          colorScheme: 'dark',
          colors: {
            "dark": ["#fff3e2", "#A6A7AB","#909296","#5C5F66","#373A40","#2C2E33","#C92A2A","#1A1B1E"]
          },
          globalStyles: (theme) => ({
            "searchBar": {
              backgroundColor: "#FFFFFF"
            }
          })
        
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar /*links={[{label: "Home", link: "/"}]}*/ />
        <div className={"container"}>
        <main className={"main"}>
        <Component {...pageProps} />
        </main>
        </div>
      </MantineProvider>
  );
}

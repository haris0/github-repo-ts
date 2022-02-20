import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from 'services/apollo-client';
import ThemeContextProvider, { useTheme } from 'context/ThemeContext';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from 'components/Navbar/Navbar';
import Head from 'next/head';

type props = {
  children: ReactNode;
};

const ThemeController = ({ children }: props) => {
  const theme = useTheme();
  console.log(theme);

  return (
    <div className={`app-${theme}`}>
      { children }
    </div>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <ThemeContextProvider>
      <ThemeController>
        <Head>
          <title>Github Repo</title>
          <meta name="description" content="Show repository list from a github account" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavigationBar />
        <Component {...pageProps} />
      </ThemeController>
    </ThemeContextProvider>
  </ApolloProvider>
);

export default MyApp;

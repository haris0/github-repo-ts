import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from 'services/apollo-client';
import ThemeContextProvider, { useTheme } from 'context/ThemeContext';
import { ReactNode } from 'react';

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
        <Component {...pageProps} />
      </ThemeController>
    </ThemeContextProvider>
  </ApolloProvider>
);

export default MyApp;

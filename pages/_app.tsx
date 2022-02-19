import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from 'services/apollo-client';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;

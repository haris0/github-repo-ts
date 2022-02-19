import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Github Repo</title>
      <meta name="description" content="Show repository list from a github account" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      Hello World
    </main>
  </div>
);

export default Home;

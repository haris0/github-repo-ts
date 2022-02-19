import ClientOnly from 'components/ClientOnly';
import SearchResult from 'components/SearchResult';
import { useDebouncedEffect } from 'mixin';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchKey, setSearchKey] = useState('');
  const handleKeyWord = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKey(value);
  };

  const [debouncedKey, setDebouncedKey] = useState('');

  useDebouncedEffect(async () => {
    setDebouncedKey(searchKey);
    router.push({
      pathname: '/',
      query: searchKey ? { keyword: searchKey } : {},
    }, undefined, { shallow: true });
  }, [searchKey], 1000);

  useEffect(() => {
    setSearchKey(keyword as string || '');
  }, [keyword]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Repo</title>
        <meta name="description" content="Show repository list from a github account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input
          type="text"
          value={searchKey}
          onChange={handleKeyWord}
        />

        {debouncedKey && (
          <ClientOnly>
            <SearchResult keyword={debouncedKey} />
          </ClientOnly>
        )}
      </main>
    </div>
  );
};

export default Home;

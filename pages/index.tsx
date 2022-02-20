import ClientOnly from 'components/ClientOnly';
import SearchResult from 'components/SearchResult';
import { useTheme } from 'context/ThemeContext';
import { useDebouncedEffect } from 'mixin';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
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
    <main>
      <Container className="container-custom">
        <div className={styles.search_panel}>
          <div className="search_title">
            <h2>Search Github Account</h2>
          </div>
          <div className="search_input">
            <input
              type="text"
              className={`${styles.search_input} ${styles[`search_${theme}`]}`}
              placeholder="Type account name or userid..."
              value={searchKey}
              onChange={handleKeyWord}
            />
          </div>
        </div>
        <div className={styles.results_panel}>
          {debouncedKey && (
            <ClientOnly>
              <SearchResult keyword={debouncedKey} />
            </ClientOnly>
          )}
          {!debouncedKey && (
            <div className={styles.no_search}>
              <Image
                src="/images/github.png"
                width="170"
                height="170"
              />
            </div>
          )}
        </div>
      </Container>
    </main>
  );
};

export default Home;

import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import client from 'services/apollo-client';
import { UserRepositories } from 'services/queries';
import { IUserDetailRes } from 'types/User.type';
import styles from 'styles/User.module.scss';
import ReposCard from 'components/ReposCard/ReposCard';
import { useTheme } from 'context/ThemeContext';
import { useState } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{
    params: { userId: 'haris0' },
  }];

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userId = params?.userId as string || '';

  const { data: userDetail } = await client.query<IUserDetailRes>({
    query: gql(UserRepositories),
    variables: {
      login: userId,
      first: 15,
      isFork: false,
      orderBy: {
        field: 'UPDATED_AT',
        direction: 'DESC',
      },
    },
  });

  return {
    props: {
      userDetail,
    },
  };
};

const UserDetail: NextPage<{userDetail: IUserDetailRes}> = ({ userDetail }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(userDetail);

  const handlePrev = async (userId: string, firstCursor: string) => {
    const { data } = await client.query<IUserDetailRes>({
      query: gql(UserRepositories),
      variables: {
        login: userId,
        last: 15,
        isFork: false,
        before: firstCursor,
        orderBy: {
          field: 'UPDATED_AT',
          direction: 'DESC',
        },
      },
    });

    setUserData(data);
    window.scrollTo(0, 0);
  };

  const handleNext = async (userId: string, lastCursor: string) => {
    const { data } = await client.query<IUserDetailRes>({
      query: gql(UserRepositories),
      variables: {
        login: userId,
        first: 15,
        isFork: false,
        after: lastCursor,
        orderBy: {
          field: 'UPDATED_AT',
          direction: 'DESC',
        },
      },
    });

    setUserData(data);
    window.scrollTo(0, 0);
  };

  return (
    <main>
      <Container className="container-custom">
        <div className={styles.user_profile}>
          <div className={styles.user_data}>
            <div className={styles.avatar_wrap}>
              <div className={styles.avatar}>
                <Image
                  src={userData.user.avatarUrl}
                  placeholder="blur"
                  blurDataURL={userData.user.avatarUrl}
                  alt={userData.user.login}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className={styles.name}>
              {userData.user?.name && (
                <b className={styles.user_name}>{userData.user?.name}</b>
              )}
              <span className={styles.user_id}>{userData.user.login}</span>
            </div>
            <div className={styles.bio}>
              {userData.user.bio}
            </div>
            <div className={styles.location}>
              {userData.user.location}
            </div>
          </div>
          <div className={styles.user_repos}>
            <h4>
              Repositories:
            </h4>
            <div style={{ marginTop: '.5rem' }}>
              {!!userData.user.repositories.nodes.length && (
                <div className={styles.repo_list}>
                  {userData.user.repositories.nodes.map((repository) => (
                    <ReposCard
                      key={repository.id}
                      repository={repository}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.nav_button}>
            <button
              type="button"
              onClick={() => handlePrev(
                userData.user.login,
                userData.user.repositories.pageInfo.startCursor,
              )}
              disabled={!userData.user.repositories.pageInfo.hasPreviousPage}
              className={`${styles.prev} ${styles[`button_${theme}`]}`}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => handleNext(
                userData.user.login,
                userData.user.repositories.pageInfo.endCursor,
              )}
              disabled={!userData.user.repositories.pageInfo.hasNextPage}
              className={`${styles.next} ${styles[`button_${theme}`]}`}
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default UserDetail;

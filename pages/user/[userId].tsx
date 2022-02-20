import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import client from 'services/apollo-client';
import { UserRepositories } from 'services/queries';
import { IUserDetailRes } from 'types/User.type';
import styles from 'styles/User.module.scss';

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
      first: 20,
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
  const { user } = userDetail;
  const repositories = userDetail.user.repositories.nodes;
  return (
    <main>
      <Container className="container-custom">
        <div className={styles.user_profile}>
          <div className={styles.user_data}>
            <div className={styles.avatar_wrap}>
              <div className={styles.avatar}>
                <Image
                  src={user.avatarUrl}
                  placeholder="blur"
                  blurDataURL={user.avatarUrl}
                  alt={user.login}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className={styles.name}>
              {user?.name && (
                <b className={styles.user_name}>{user?.name}</b>
              )}
              <span className={styles.user_id}>{user.login}</span>
            </div>
            <div className={styles.bio}>
              {user.bio}
            </div>
            <div className={styles.location}>
              {user.location}
            </div>
          </div>
          <div className={styles.user_repos}>
            <h4>
              Repositories:
            </h4>
            <div style={{ marginTop: '.5rem' }}>
              {!!repositories.length && (
                repositories.map((repository) => (
                  <div key={repository.name}>
                    {repository.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default UserDetail;

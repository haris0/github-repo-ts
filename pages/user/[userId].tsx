import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import client from 'services/apollo-client';
import { UserRepositories } from 'services/queries';
import { IUserDetailRes } from 'types/User.type';

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
  const repositories = userDetail.user.repositories.nodes;
  return (
    <div>
      User Page {userDetail.user.login} repositories:
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
  );
};

export default UserDetail;

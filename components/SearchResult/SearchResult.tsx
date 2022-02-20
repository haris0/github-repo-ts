import { gql, useQuery } from '@apollo/client';
import UserCard from 'components/UserCard/UserCard';
import { Spinner } from 'react-bootstrap';
import { SearchGithubAccount } from 'services/queries';
import { ISearchRes } from 'types/Search.type';
import styles from './SearchResult.module.scss';

type props = {
  keyword: string
}

const SearchResult = ({ keyword }: props) => {
  const { loading, error, data } = useQuery<ISearchRes>(gql(SearchGithubAccount), {
    variables: {
      first: 20,
      query: keyword,
      type: 'USER',
    },
  });

  return (
    <div className={styles.search_result}>
      {loading && !data && (
        <div className={styles.loading}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {data && !loading && !error && (
        <div className={styles.user_list}>
          {data?.search.nodes.map((user) => (
            <div key={user.id}>
              {user.id && (
                <UserCard
                  user={user}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

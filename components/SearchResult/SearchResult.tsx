import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';
import { SearchGithubAccount } from 'services/queries';
import { ISearchRes } from 'types/Search.type';

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
    <div>
      {loading && !data && (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {data && !loading && !error && (
        data?.search.nodes.map((user) => (
          <Link href={`/user/${user.login}`} passHref key={user.login}>
            <a href={`/user/${user.login}`}>
              <div>
                {user.login}
              </div>
            </a>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResult;

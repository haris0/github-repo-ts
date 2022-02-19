import { gql, useQuery } from '@apollo/client';
import { SearchGithubAccount } from 'services/queries';
import { ISearchRes } from 'types';

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

  if (data && !loading && !error) {
    console.log(data);
  }

  return (
    <div>
      {data && !loading && !error && (
        data?.search.nodes.map((user) => (
          <div key={user.login}>
            {user.login}
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResult;

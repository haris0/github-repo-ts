export const SearchGithubAccount = `
  query SearchGithubAccount(
    $first: Int
    $query: String!
    $type: SearchType!
    $after: String
    $before: String
  ){
    search(
      first: $first
      query: $query
      type: $type
      after: $after
      before: $before
    ) {
      nodes {
        ... on User {
          avatarUrl
          bio
          name
          login
          location
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      userCount
    }
  }
`;

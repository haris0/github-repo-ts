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

export const UserRepositories = `
  query UserRepositories(
    $login: String!
    $first: Int
    $isFork: Boolean
    $after: String
    $before: String
    $orderBy: RepositoryOrder
  ){
    user(login: $login) {
      login
      name
      email
      location
      repositories(
        first: $first
        isFork: $isFork
        after: $after
        before: $before
        orderBy : $orderBy
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        nodes {
          name
          url
          descriptionHTML
          updatedAt
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

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
          id
          avatarUrl
          bio
          name
          login
          location
          repositories (isFork: false) {
            totalCount
          }
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
      id
      avatarUrl
      login
      name
      email
      location
      bio
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
          id
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

export interface Repositories {
  totalCount: number;
}
export interface Node {
  id: number;
  avatarUrl: string;
  bio?: string;
  name?: string;
  login: string;
  location?: string;
  repositories: Repositories;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Search {
  nodes: Node[];
  pageInfo: PageInfo;
  userCount: number;
}

export interface ISearchRes {
  search: Search;
}

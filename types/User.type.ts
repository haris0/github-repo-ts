export interface PrimaryLanguage {
  name: string;
}

export interface Node {
  name: string;
  url: string;
  descriptionHTML: string;
  updatedAt: Date;
  primaryLanguage: PrimaryLanguage | null;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Repositories {
  pageInfo: PageInfo;
  totalCount: number;
  nodes: Node[];
}

export interface User {
  login: string;
  name: string;
  email: string;
  location: string;
  repositories: Repositories;
}

export interface IUserDetailRes {
  user: User;
}

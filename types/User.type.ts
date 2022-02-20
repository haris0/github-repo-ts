export interface PrimaryLanguage {
  name: string;
}

export interface Node {
  id: number;
  name: string;
  url: string;
  description: string;
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
  id: number;
  avatarUrl: string;
  login: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  repositories: Repositories;
}

export interface IUserDetailRes {
  user: User;
}

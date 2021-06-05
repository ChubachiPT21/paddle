export interface ISource {
  id: number
  title: string
  count: number
}

export type IFeed = {
  id: number
  title: string
  sourceId: number
  url: string
  contents: string
  imageUrl: string
}

export type IAuthentication = {
  email: string
  password: string
}

export type IUser = {
  email: string
  token: string
}

export enum FeedActionTypes {
  FETCH_FEEDS_START = '@@feeds/FETCH_FEEDS_START',
  FETCH_FEEDS_SUCCESS = '@@feeds/FETCH_FEEDS_SUCCESS',
  FETCH_FEEDS_ERROR = '@@feeds/FETCH_FEEDS_ERROR',
}

export enum SourceActionTypes {
  FETCH_SOURCES_START = '@@sources/FETCH_SOURCES_START',
  FETCH_SOURCES_SUCCESS = '@@sources/FETCH_SOURCES_SUCCESS',
  FETCH_SOURCES_ERROR = '@@sources/FETCH_SOURCES_ERROR',
}

export enum AuthenticationActionTypes {
  AUTHENTICATION_START = '@@sign/AUTHENTICATION_START',
  AUTHENTICATION_SUCCESS = '@@sign/AUTHENTICATION_SUCCESS',
  AUTHENTICATION_ERROR = '@@sign/AUTHENTICATION_ERROR',
}
export enum PreviewActionTypes {
  FETCH_RSS_START = '@@source/FETCH_RSS_START',
  FETCH_RSS_SUCCESS = '@@source/FETCH_RSS_SUCCESS',
  FETCH_RSS_ERROR = '@@source/FETCH_RSS_ERROR',
}

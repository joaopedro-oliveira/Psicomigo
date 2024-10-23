import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  errors?: Maybe<Scalars['String']['output']>;
  noErrors: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFollowing: FollowResponse;
  addProfilePicture: Scalars['Boolean']['output'];
  changePassword: UserResponse;
  createMessage: Message;
  createPost: Post;
  deleteMessage: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
  uploadImageInPost: Scalars['Boolean']['output'];
  vote: Scalars['Boolean']['output'];
};


export type MutationAddFollowingArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateMessageArgs = {
  content: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
  picture?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  usernameOrEmail: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int']['input'];
  value: Scalars['Int']['input'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean']['output'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  classification?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Scalars['String']['output']>;
  points: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  textSnippet: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  voteStatus?: Maybe<Scalars['Int']['output']>;
};

export type PostInput = {
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  message?: Maybe<Message>;
  messages: ScrollingMessage;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  profilePosts: PaginatedPosts;
  searchUser?: Maybe<Array<User>>;
  trends: Array<Post>;
  user?: Maybe<User>;
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  profile?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProfilePostsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type QuerySearchUserArgs = {
  searchString: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};

export type ScrollingMessage = {
  __typename?: 'ScrollingMessage';
  hasMore: Scalars['Boolean']['output'];
  messages: Array<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  followerCount: Scalars['Int']['output'];
  followers: Array<User>;
  following: Array<User>;
  id: Scalars['Int']['output'];
  messages: Message;
  profilePicture: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, profilePicture: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, profilePicture: string } | null };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  profilePicture
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($userId: String!) {
  user(userId: $userId) {
    id
    username
    email
    createdAt
    profilePicture
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
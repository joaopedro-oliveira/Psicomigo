import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  errors?: Maybe<Scalars['String']>;
  noErrors: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFollowing: FollowResponse;
  addProfilePicture: Scalars['Boolean'];
  changePassword: UserResponse;
  criarQuestionario: Array<Questionario>;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  savePushToken: Scalars['Boolean'];
};


export type MutationAddFollowingArgs = {
  userId: Scalars['Float'];
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
  userId: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: Opcoes;
};


export type MutationSavePushTokenArgs = {
  deviceId: Scalars['String'];
  token: Scalars['String'];
};

export type Opcoes = {
  confirmarSenha: Scalars['String'];
  cpf: Scalars['String'];
  crm: Scalars['String'];
  dataNascimento: Scalars['DateTime'];
  email: Scalars['String'];
  genero: Scalars['String'];
  password: Scalars['String'];
  tipo: Scalars['String'];
  username: Scalars['String'];
};

export type OpcoesResposta = {
  __typename?: 'OpcoesResposta';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  pergunta: Pergunta;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Pergunta = {
  __typename?: 'Pergunta';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  opcoes_respostas?: Maybe<Array<OpcoesResposta>>;
  pergunta: Scalars['String'];
  perguntaAtiva: Scalars['Boolean'];
  questionario?: Maybe<Questionario>;
  resposta: Resposta;
  tipo: Scalars['String'];
  topico: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPushToken?: Maybe<Token>;
  helloOpR: Scalars['String'];
  helloPergunta: Scalars['String'];
  helloQuesitonario: Scalars['String'];
  helloResposta: Scalars['String'];
  me?: Maybe<User>;
  medico?: Maybe<Array<User>>;
  pacientes?: Maybe<Array<User>>;
  pacientesDoutor?: Maybe<Array<User>>;
  perguntas?: Maybe<Array<Pergunta>>;
  questionario?: Maybe<Questionario>;
  questionarios: Array<Questionario>;
  searchUser?: Maybe<Array<User>>;
  user?: Maybe<User>;
};


export type QueryGetPushTokenArgs = {
  deviceId: Scalars['String'];
};


export type QueryPerguntasArgs = {
  topicos?: InputMaybe<Array<Scalars['String']>>;
};


export type QuerySearchUserArgs = {
  searchString: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Questionario = {
  __typename?: 'Questionario';
  createdAt: Scalars['String'];
  dataReposta?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  pergunta?: Maybe<Array<Pergunta>>;
  peso: Scalars['Float'];
  respondido: Scalars['Boolean'];
  resposta?: Maybe<Array<Resposta>>;
  updatedAt: Scalars['String'];
  usuarioId: Scalars['Int'];
};

export type Resposta = {
  __typename?: 'Resposta';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  opcao_resposta_id: Scalars['Float'];
  pergunta: Pergunta;
  questionario: Questionario;
  resposta_livre: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  enviaQuestionario: Questionario;
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  cpf: Scalars['String'];
  createdAt: Scalars['DateTime'];
  crm: Scalars['String'];
  dataNascimento: Scalars['DateTime'];
  email: Scalars['String'];
  genero: Scalars['String'];
  id: Scalars['Int'];
  medico?: Maybe<User>;
  paciente_ativo: Scalars['Boolean'];
  pacientes: Array<User>;
  profilePicture: Scalars['String'];
  tipo: Scalars['String'];
  topicosPaciente: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, profilePicture: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: Opcoes;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null | undefined } };

export type SavePushTokenMutationVariables = Exact<{
  deviceId: Scalars['String'];
  token: Scalars['String'];
}>;


export type SavePushTokenMutation = { __typename?: 'Mutation', savePushToken: boolean };

export type GetPushTokenQueryVariables = Exact<{
  deviceId: Scalars['String'];
}>;


export type GetPushTokenQuery = { __typename?: 'Query', getPushToken?: { __typename?: 'Token', token?: string | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, profilePicture: string } | null | undefined };

export type QuestionarioQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionarioQuery = { __typename?: 'Query', questionario?: { __typename?: 'Questionario', id: number, usuarioId: number, respondido: boolean, pergunta?: Array<{ __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', id: number, text: string }> | null | undefined }> | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, profilePicture: string } | null | undefined };

export type EnviaQuestionariosSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EnviaQuestionariosSubscription = { __typename?: 'Subscription', enviaQuestionario: { __typename?: 'Questionario', id: number, usuarioId: number, respondido: boolean, dataReposta?: any | null | undefined, peso: number, pergunta?: Array<{ __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', id: number, text: string }> | null | undefined }> | null | undefined } };

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
    mutation Register($options: Opcoes!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SavePushTokenDocument = gql`
    mutation savePushToken($deviceId: String!, $token: String!) {
  savePushToken(deviceId: $deviceId, token: $token)
}
    `;

export function useSavePushTokenMutation() {
  return Urql.useMutation<SavePushTokenMutation, SavePushTokenMutationVariables>(SavePushTokenDocument);
};
export const GetPushTokenDocument = gql`
    query getPushToken($deviceId: String!) {
  getPushToken(deviceId: $deviceId) {
    token
  }
}
    `;

export function useGetPushTokenQuery(options: Omit<Urql.UseQueryArgs<GetPushTokenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPushTokenQuery>({ query: GetPushTokenDocument, ...options });
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
export const QuestionarioDocument = gql`
    query questionario {
  questionario {
    id
    usuarioId
    respondido
    pergunta {
      id
      pergunta
      tipo
      topico
      opcoes_respostas {
        id
        text
      }
    }
  }
}
    `;

export function useQuestionarioQuery(options: Omit<Urql.UseQueryArgs<QuestionarioQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuestionarioQuery>({ query: QuestionarioDocument, ...options });
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
export const EnviaQuestionariosDocument = gql`
    subscription enviaQuestionarios {
  enviaQuestionario {
    id
    usuarioId
    pergunta {
      id
      pergunta
      tipo
      topico
      opcoes_respostas {
        id
        text
      }
    }
    respondido
    dataReposta
    peso
  }
}
    `;

export function useEnviaQuestionariosSubscription<TData = EnviaQuestionariosSubscription>(options: Omit<Urql.UseSubscriptionArgs<EnviaQuestionariosSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<EnviaQuestionariosSubscription, TData>) {
  return Urql.useSubscription<EnviaQuestionariosSubscription, TData, EnviaQuestionariosSubscriptionVariables>({ query: EnviaQuestionariosDocument, ...options }, handler);
};
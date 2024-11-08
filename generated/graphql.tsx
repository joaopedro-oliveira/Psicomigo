import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  atualizarPergunta?: Maybe<Pergunta>;
  changePassword: UserResponse;
  criarPergunta: Pergunta;
  criarQuestionario: Array<Questionario>;
  deletarPergunta: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  responderPergunta: Scalars['Boolean'];
  savePushToken: Scalars['Boolean'];
};


export type MutationAddFollowingArgs = {
  userId: Scalars['Float'];
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
  userId: Scalars['Int'];
};


export type MutationAtualizarPerguntaArgs = {
  id: Scalars['Int'];
  input: PerguntaInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCriarPerguntaArgs = {
  input: PerguntaInput;
};


export type MutationDeletarPerguntaArgs = {
  id: Scalars['Int'];
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


export type MutationResponderPerguntaArgs = {
  input: RespostaInput;
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

export type OpcoesRespostaInput = {
  id?: InputMaybe<Scalars['Float']>;
  text: Scalars['String'];
};

export type OpcoesRespostaInputRe = {
  id?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type OpcoesRespostaInterface = {
  __typename?: 'OpcoesRespostaInterface';
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type Pergunta = {
  __typename?: 'Pergunta';
  createdAt: Scalars['String'];
  creatorId: Scalars['Int'];
  id: Scalars['Int'];
  opcoes_respostas?: Maybe<Array<OpcoesResposta>>;
  pergunta: Scalars['String'];
  perguntaAtiva: Scalars['Boolean'];
  tipo: Scalars['String'];
  topico: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PerguntaInput = {
  opcoes_respostas?: InputMaybe<Array<OpcoesRespostaInput>>;
  pergunta: Scalars['String'];
  perguntaAtiva: Scalars['Boolean'];
  tipo: Scalars['String'];
  topico: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPushToken?: Maybe<Token>;
  helloOpR: Scalars['String'];
  helloQuesitonario: Scalars['String'];
  helloResposta: Scalars['String'];
  me?: Maybe<User>;
  medico?: Maybe<Array<User>>;
  pacientes?: Maybe<Array<User>>;
  pacientesDoutor?: Maybe<Array<User>>;
  pergunta?: Maybe<Pergunta>;
  perguntas?: Maybe<Array<Pergunta>>;
  perguntasJob?: Maybe<Array<Pergunta>>;
  questionario?: Maybe<Questionario>;
  questionarios: Array<Questionario>;
  searchUser?: Maybe<Array<User>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryGetPushTokenArgs = {
  deviceId: Scalars['String'];
};


export type QueryPerguntaArgs = {
  perguntaId: Scalars['Int'];
};


export type QueryPerguntasJobArgs = {
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
  peso: Scalars['Float'];
  respondido: Scalars['Boolean'];
  respostas?: Maybe<Array<Resposta>>;
  updatedAt: Scalars['String'];
  usuarioId: Scalars['Int'];
};

export type Resposta = {
  __typename?: 'Resposta';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  opcao_resposta?: Maybe<Array<OpcoesRespostaInterface>>;
  opcao_resposta_escolhida?: Maybe<Array<OpcoesRespostaInterface>>;
  pergunta: Scalars['String'];
  pergunta_id: Scalars['Int'];
  questionario?: Maybe<Questionario>;
  respondido: Scalars['Boolean'];
  resposta_livre?: Maybe<Scalars['String']>;
  tipo: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RespostaInput = {
  opcaoResposta?: InputMaybe<Array<OpcoesRespostaInputRe>>;
  respostaId: Scalars['Int'];
  respostaLivre?: InputMaybe<Scalars['String']>;
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

export type PerguntaPadraoFragment = { __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, perguntaAtiva: boolean, creatorId: number, createdAt: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', text: string, id: number }> | null | undefined };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, tipo: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, tipo: string } | null | undefined };

export type RespostaPadraoFragment = { __typename?: 'Questionario', respostas?: Array<{ __typename?: 'Resposta', id: number, pergunta: string, pergunta_id: number, tipo: string, respondido: boolean, resposta_livre?: string | null | undefined, opcao_resposta?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined, opcao_resposta_escolhida?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined }> | null | undefined };

export type AtualizarPerguntasMutationVariables = Exact<{
  input: PerguntaInput;
  id: Scalars['Int'];
}>;


export type AtualizarPerguntasMutation = { __typename?: 'Mutation', atualizarPergunta?: { __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, perguntaAtiva: boolean, creatorId: number, createdAt: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', text: string, id: number }> | null | undefined } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, tipo: string } | null | undefined } };

export type CriarPerguntaMutationVariables = Exact<{
  input: PerguntaInput;
}>;


export type CriarPerguntaMutation = { __typename?: 'Mutation', criarPergunta: { __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, perguntaAtiva: boolean, creatorId: number, createdAt: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', text: string, id: number }> | null | undefined } };

export type CriarQuestionarioMutationVariables = Exact<{ [key: string]: never; }>;


export type CriarQuestionarioMutation = { __typename?: 'Mutation', criarQuestionario: Array<{ __typename?: 'Questionario', id: number, usuarioId: number, peso: number, respondido: boolean, dataReposta?: any | null | undefined, respostas?: Array<{ __typename?: 'Resposta', id: number, pergunta: string, pergunta_id: number, tipo: string, respondido: boolean, resposta_livre?: string | null | undefined, opcao_resposta?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined, opcao_resposta_escolhida?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined }> | null | undefined }> };

export type DeletarPerguntaMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletarPerguntaMutation = { __typename?: 'Mutation', deletarPergunta: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, tipo: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: Opcoes;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, tipo: string } | null | undefined } };

export type ResponderPerguntaMutationVariables = Exact<{
  input: RespostaInput;
}>;


export type ResponderPerguntaMutation = { __typename?: 'Mutation', responderPergunta: boolean };

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


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, tipo: string } | null | undefined };

export type PerguntaQueryVariables = Exact<{
  perguntaId: Scalars['Int'];
}>;


export type PerguntaQuery = { __typename?: 'Query', pergunta?: { __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, perguntaAtiva: boolean, creatorId: number, createdAt: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', text: string, id: number }> | null | undefined } | null | undefined };

export type PerguntasQueryVariables = Exact<{ [key: string]: never; }>;


export type PerguntasQuery = { __typename?: 'Query', perguntas?: Array<{ __typename?: 'Pergunta', id: number, pergunta: string, tipo: string, topico: string, perguntaAtiva: boolean, creatorId: number, createdAt: string, opcoes_respostas?: Array<{ __typename?: 'OpcoesResposta', text: string, id: number }> | null | undefined }> | null | undefined };

export type QuestionarioQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionarioQuery = { __typename?: 'Query', questionario?: { __typename?: 'Questionario', id: number, usuarioId: number, respondido: boolean, dataReposta?: any | null | undefined, respostas?: Array<{ __typename?: 'Resposta', id: number, pergunta: string, pergunta_id: number, tipo: string, respondido: boolean, resposta_livre?: string | null | undefined, opcao_resposta?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined, opcao_resposta_escolhida?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined }> | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, profilePicture: string } | null | undefined };

export type EnviaQuestionariosSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EnviaQuestionariosSubscription = { __typename?: 'Subscription', enviaQuestionario: { __typename?: 'Questionario', id: number, usuarioId: number, respondido: boolean, dataReposta?: any | null | undefined, respostas?: Array<{ __typename?: 'Resposta', id: number, pergunta: string, pergunta_id: number, tipo: string, resposta_livre?: string | null | undefined, opcao_resposta?: Array<{ __typename?: 'OpcoesRespostaInterface', id?: number | null | undefined, text?: string | null | undefined }> | null | undefined }> | null | undefined } };

export const PerguntaPadraoFragmentDoc = gql`
    fragment PerguntaPadrao on Pergunta {
  id
  pergunta
  tipo
  topico
  opcoes_respostas {
    text
    id
  }
  perguntaAtiva
  creatorId
  createdAt
}
    `;
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
  tipo
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
export const RespostaPadraoFragmentDoc = gql`
    fragment RespostaPadrao on Questionario {
  respostas {
    id
    pergunta
    pergunta_id
    tipo
    opcao_resposta {
      id
      text
    }
    opcao_resposta_escolhida {
      id
      text
    }
    respondido
    resposta_livre
  }
}
    `;
export const AtualizarPerguntasDocument = gql`
    mutation atualizarPerguntas($input: PerguntaInput!, $id: Int!) {
  atualizarPergunta(input: $input, id: $id) {
    ...PerguntaPadrao
  }
}
    ${PerguntaPadraoFragmentDoc}`;
export type AtualizarPerguntasMutationFn = Apollo.MutationFunction<AtualizarPerguntasMutation, AtualizarPerguntasMutationVariables>;

/**
 * __useAtualizarPerguntasMutation__
 *
 * To run a mutation, you first call `useAtualizarPerguntasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAtualizarPerguntasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [atualizarPerguntasMutation, { data, loading, error }] = useAtualizarPerguntasMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAtualizarPerguntasMutation(baseOptions?: Apollo.MutationHookOptions<AtualizarPerguntasMutation, AtualizarPerguntasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AtualizarPerguntasMutation, AtualizarPerguntasMutationVariables>(AtualizarPerguntasDocument, options);
      }
export type AtualizarPerguntasMutationHookResult = ReturnType<typeof useAtualizarPerguntasMutation>;
export type AtualizarPerguntasMutationResult = Apollo.MutationResult<AtualizarPerguntasMutation>;
export type AtualizarPerguntasMutationOptions = Apollo.BaseMutationOptions<AtualizarPerguntasMutation, AtualizarPerguntasMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CriarPerguntaDocument = gql`
    mutation criarPergunta($input: PerguntaInput!) {
  criarPergunta(input: $input) {
    ...PerguntaPadrao
  }
}
    ${PerguntaPadraoFragmentDoc}`;
export type CriarPerguntaMutationFn = Apollo.MutationFunction<CriarPerguntaMutation, CriarPerguntaMutationVariables>;

/**
 * __useCriarPerguntaMutation__
 *
 * To run a mutation, you first call `useCriarPerguntaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCriarPerguntaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [criarPerguntaMutation, { data, loading, error }] = useCriarPerguntaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCriarPerguntaMutation(baseOptions?: Apollo.MutationHookOptions<CriarPerguntaMutation, CriarPerguntaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CriarPerguntaMutation, CriarPerguntaMutationVariables>(CriarPerguntaDocument, options);
      }
export type CriarPerguntaMutationHookResult = ReturnType<typeof useCriarPerguntaMutation>;
export type CriarPerguntaMutationResult = Apollo.MutationResult<CriarPerguntaMutation>;
export type CriarPerguntaMutationOptions = Apollo.BaseMutationOptions<CriarPerguntaMutation, CriarPerguntaMutationVariables>;
export const CriarQuestionarioDocument = gql`
    mutation criarQuestionario {
  criarQuestionario {
    id
    usuarioId
    ...RespostaPadrao
    peso
    respondido
    dataReposta
  }
}
    ${RespostaPadraoFragmentDoc}`;
export type CriarQuestionarioMutationFn = Apollo.MutationFunction<CriarQuestionarioMutation, CriarQuestionarioMutationVariables>;

/**
 * __useCriarQuestionarioMutation__
 *
 * To run a mutation, you first call `useCriarQuestionarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCriarQuestionarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [criarQuestionarioMutation, { data, loading, error }] = useCriarQuestionarioMutation({
 *   variables: {
 *   },
 * });
 */
export function useCriarQuestionarioMutation(baseOptions?: Apollo.MutationHookOptions<CriarQuestionarioMutation, CriarQuestionarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CriarQuestionarioMutation, CriarQuestionarioMutationVariables>(CriarQuestionarioDocument, options);
      }
export type CriarQuestionarioMutationHookResult = ReturnType<typeof useCriarQuestionarioMutation>;
export type CriarQuestionarioMutationResult = Apollo.MutationResult<CriarQuestionarioMutation>;
export type CriarQuestionarioMutationOptions = Apollo.BaseMutationOptions<CriarQuestionarioMutation, CriarQuestionarioMutationVariables>;
export const DeletarPerguntaDocument = gql`
    mutation deletarPergunta($id: Int!) {
  deletarPergunta(id: $id)
}
    `;
export type DeletarPerguntaMutationFn = Apollo.MutationFunction<DeletarPerguntaMutation, DeletarPerguntaMutationVariables>;

/**
 * __useDeletarPerguntaMutation__
 *
 * To run a mutation, you first call `useDeletarPerguntaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletarPerguntaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletarPerguntaMutation, { data, loading, error }] = useDeletarPerguntaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletarPerguntaMutation(baseOptions?: Apollo.MutationHookOptions<DeletarPerguntaMutation, DeletarPerguntaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletarPerguntaMutation, DeletarPerguntaMutationVariables>(DeletarPerguntaDocument, options);
      }
export type DeletarPerguntaMutationHookResult = ReturnType<typeof useDeletarPerguntaMutation>;
export type DeletarPerguntaMutationResult = Apollo.MutationResult<DeletarPerguntaMutation>;
export type DeletarPerguntaMutationOptions = Apollo.BaseMutationOptions<DeletarPerguntaMutation, DeletarPerguntaMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: Opcoes!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResponderPerguntaDocument = gql`
    mutation responderPergunta($input: RespostaInput!) {
  responderPergunta(input: $input)
}
    `;
export type ResponderPerguntaMutationFn = Apollo.MutationFunction<ResponderPerguntaMutation, ResponderPerguntaMutationVariables>;

/**
 * __useResponderPerguntaMutation__
 *
 * To run a mutation, you first call `useResponderPerguntaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResponderPerguntaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [responderPerguntaMutation, { data, loading, error }] = useResponderPerguntaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResponderPerguntaMutation(baseOptions?: Apollo.MutationHookOptions<ResponderPerguntaMutation, ResponderPerguntaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResponderPerguntaMutation, ResponderPerguntaMutationVariables>(ResponderPerguntaDocument, options);
      }
export type ResponderPerguntaMutationHookResult = ReturnType<typeof useResponderPerguntaMutation>;
export type ResponderPerguntaMutationResult = Apollo.MutationResult<ResponderPerguntaMutation>;
export type ResponderPerguntaMutationOptions = Apollo.BaseMutationOptions<ResponderPerguntaMutation, ResponderPerguntaMutationVariables>;
export const SavePushTokenDocument = gql`
    mutation savePushToken($deviceId: String!, $token: String!) {
  savePushToken(deviceId: $deviceId, token: $token)
}
    `;
export type SavePushTokenMutationFn = Apollo.MutationFunction<SavePushTokenMutation, SavePushTokenMutationVariables>;

/**
 * __useSavePushTokenMutation__
 *
 * To run a mutation, you first call `useSavePushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePushTokenMutation, { data, loading, error }] = useSavePushTokenMutation({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSavePushTokenMutation(baseOptions?: Apollo.MutationHookOptions<SavePushTokenMutation, SavePushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePushTokenMutation, SavePushTokenMutationVariables>(SavePushTokenDocument, options);
      }
export type SavePushTokenMutationHookResult = ReturnType<typeof useSavePushTokenMutation>;
export type SavePushTokenMutationResult = Apollo.MutationResult<SavePushTokenMutation>;
export type SavePushTokenMutationOptions = Apollo.BaseMutationOptions<SavePushTokenMutation, SavePushTokenMutationVariables>;
export const GetPushTokenDocument = gql`
    query getPushToken($deviceId: String!) {
  getPushToken(deviceId: $deviceId) {
    token
  }
}
    `;

/**
 * __useGetPushTokenQuery__
 *
 * To run a query within a React component, call `useGetPushTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPushTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPushTokenQuery({
 *   variables: {
 *      deviceId: // value for 'deviceId'
 *   },
 * });
 */
export function useGetPushTokenQuery(baseOptions: Apollo.QueryHookOptions<GetPushTokenQuery, GetPushTokenQueryVariables> & ({ variables: GetPushTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPushTokenQuery, GetPushTokenQueryVariables>(GetPushTokenDocument, options);
      }
export function useGetPushTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPushTokenQuery, GetPushTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPushTokenQuery, GetPushTokenQueryVariables>(GetPushTokenDocument, options);
        }
export function useGetPushTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPushTokenQuery, GetPushTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPushTokenQuery, GetPushTokenQueryVariables>(GetPushTokenDocument, options);
        }
export type GetPushTokenQueryHookResult = ReturnType<typeof useGetPushTokenQuery>;
export type GetPushTokenLazyQueryHookResult = ReturnType<typeof useGetPushTokenLazyQuery>;
export type GetPushTokenSuspenseQueryHookResult = ReturnType<typeof useGetPushTokenSuspenseQuery>;
export type GetPushTokenQueryResult = Apollo.QueryResult<GetPushTokenQuery, GetPushTokenQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PerguntaDocument = gql`
    query Pergunta($perguntaId: Int!) {
  pergunta(perguntaId: $perguntaId) {
    ...PerguntaPadrao
  }
}
    ${PerguntaPadraoFragmentDoc}`;

/**
 * __usePerguntaQuery__
 *
 * To run a query within a React component, call `usePerguntaQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerguntaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerguntaQuery({
 *   variables: {
 *      perguntaId: // value for 'perguntaId'
 *   },
 * });
 */
export function usePerguntaQuery(baseOptions: Apollo.QueryHookOptions<PerguntaQuery, PerguntaQueryVariables> & ({ variables: PerguntaQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerguntaQuery, PerguntaQueryVariables>(PerguntaDocument, options);
      }
export function usePerguntaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerguntaQuery, PerguntaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerguntaQuery, PerguntaQueryVariables>(PerguntaDocument, options);
        }
export function usePerguntaSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PerguntaQuery, PerguntaQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PerguntaQuery, PerguntaQueryVariables>(PerguntaDocument, options);
        }
export type PerguntaQueryHookResult = ReturnType<typeof usePerguntaQuery>;
export type PerguntaLazyQueryHookResult = ReturnType<typeof usePerguntaLazyQuery>;
export type PerguntaSuspenseQueryHookResult = ReturnType<typeof usePerguntaSuspenseQuery>;
export type PerguntaQueryResult = Apollo.QueryResult<PerguntaQuery, PerguntaQueryVariables>;
export const PerguntasDocument = gql`
    query Perguntas {
  perguntas {
    ...PerguntaPadrao
  }
}
    ${PerguntaPadraoFragmentDoc}`;

/**
 * __usePerguntasQuery__
 *
 * To run a query within a React component, call `usePerguntasQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerguntasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerguntasQuery({
 *   variables: {
 *   },
 * });
 */
export function usePerguntasQuery(baseOptions?: Apollo.QueryHookOptions<PerguntasQuery, PerguntasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerguntasQuery, PerguntasQueryVariables>(PerguntasDocument, options);
      }
export function usePerguntasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerguntasQuery, PerguntasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerguntasQuery, PerguntasQueryVariables>(PerguntasDocument, options);
        }
export function usePerguntasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PerguntasQuery, PerguntasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PerguntasQuery, PerguntasQueryVariables>(PerguntasDocument, options);
        }
export type PerguntasQueryHookResult = ReturnType<typeof usePerguntasQuery>;
export type PerguntasLazyQueryHookResult = ReturnType<typeof usePerguntasLazyQuery>;
export type PerguntasSuspenseQueryHookResult = ReturnType<typeof usePerguntasSuspenseQuery>;
export type PerguntasQueryResult = Apollo.QueryResult<PerguntasQuery, PerguntasQueryVariables>;
export const QuestionarioDocument = gql`
    query questionario {
  questionario {
    id
    usuarioId
    respondido
    ...RespostaPadrao
    dataReposta
  }
}
    ${RespostaPadraoFragmentDoc}`;

/**
 * __useQuestionarioQuery__
 *
 * To run a query within a React component, call `useQuestionarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionarioQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionarioQuery(baseOptions?: Apollo.QueryHookOptions<QuestionarioQuery, QuestionarioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionarioQuery, QuestionarioQueryVariables>(QuestionarioDocument, options);
      }
export function useQuestionarioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionarioQuery, QuestionarioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionarioQuery, QuestionarioQueryVariables>(QuestionarioDocument, options);
        }
export function useQuestionarioSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QuestionarioQuery, QuestionarioQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QuestionarioQuery, QuestionarioQueryVariables>(QuestionarioDocument, options);
        }
export type QuestionarioQueryHookResult = ReturnType<typeof useQuestionarioQuery>;
export type QuestionarioLazyQueryHookResult = ReturnType<typeof useQuestionarioLazyQuery>;
export type QuestionarioSuspenseQueryHookResult = ReturnType<typeof useQuestionarioSuspenseQuery>;
export type QuestionarioQueryResult = Apollo.QueryResult<QuestionarioQuery, QuestionarioQueryVariables>;
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const EnviaQuestionariosDocument = gql`
    subscription enviaQuestionarios {
  enviaQuestionario {
    id
    usuarioId
    respondido
    respostas {
      id
      pergunta
      pergunta_id
      opcao_resposta {
        id
        text
      }
      tipo
      resposta_livre
    }
    dataReposta
  }
}
    `;

/**
 * __useEnviaQuestionariosSubscription__
 *
 * To run a query within a React component, call `useEnviaQuestionariosSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEnviaQuestionariosSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnviaQuestionariosSubscription({
 *   variables: {
 *   },
 * });
 */
export function useEnviaQuestionariosSubscription(baseOptions?: Apollo.SubscriptionHookOptions<EnviaQuestionariosSubscription, EnviaQuestionariosSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EnviaQuestionariosSubscription, EnviaQuestionariosSubscriptionVariables>(EnviaQuestionariosDocument, options);
      }
export type EnviaQuestionariosSubscriptionHookResult = ReturnType<typeof useEnviaQuestionariosSubscription>;
export type EnviaQuestionariosSubscriptionResult = Apollo.SubscriptionResult<EnviaQuestionariosSubscription>;
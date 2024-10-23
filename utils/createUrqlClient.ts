import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {router} from "expo-router";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
  // AddProfilePictureMutation,
  // AddProfilePictureMutationVariables,
  // DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "../utils/betterUpdateQuery";
// import { gql, subscriptionExchange } from "@urql/core";
import { isServer } from "./isServer";
// import { createClient as createWSClient } from "graphql-ws";
//import { SubscriptionClient } from "subscriptions-transport-ws";
//import { devtoolsExchange } from "@urql/devtools";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

// const wsClient = process.browser ? createWSClient({
//   url: 'ws://localhost:4000/graphql',
// }): null

const invalidateProfilePosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
  cache.invalidate("Query", "posts", {
    limit: 15,
    profile: false,
  });
};

const invalidatePosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
  cache.invalidate("Query", "posts", {
    limit: 15,
    profile: false,
  });
};

const invalidateMessages = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "messages");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "messages", fi.arguments || {});
  });
  cache.invalidate("Query", "messages", {
    limit: 15,
  });
};

// const subscriptionClient = process.browser
//   ? new SubscriptionClient("ws://localhost:4000/graphql", {
//       reconnect: true,
//     })
//   : null;

export const errorEnchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("Not authenticated")) {
          router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isFieldDataInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isFieldDataInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

const messagesScrolling = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isFieldDataInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "messages"
    );
    info.partial = !isFieldDataInTheCache;
    let hasMore = true;
    const results: string[] = [];

    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "messages") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "ScrollingMessage",
      hasMore,
      messages: results,
    };
  };
};

export const createUrqlClient: any = (ssrExchange: any, ctx: any) => {
  let cookie = "";

  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      // cacheExchange({
      //   keys: {
      //     PaginatedPosts: () => null,
      //   },
      //   resolvers: {
      //     Query: {
      //       // posts: cursorPagination(),
      //       // messages: messagesScrolling(),
      //     },
      //   },
      //   updates: {
      //     Mutation: {
      //       // addProfilePicture: (_result, args, cache, info) => {
      //       //   cache.invalidate({
      //       //     __typename: "getUser",
      //       //     userId: (args as AddProfilePictureMutationVariables).userId,
      //       //   });
      //       // },

      //       // deletePost: (_result, args, cache, info) => {
      //       //   cache.invalidate({
      //       //     __typename: "Post",
      //       //     id: (args as DeletePostMutationVariables).id,
      //       //   });
      //       // },
      //       // vote: (_result, args, cache, info) => {
      //       //   const { postId, value } = args as VoteMutationVariables;
      //       //   const data = cache.readFragment(
      //       //     gql`
      //       //       fragment _ on Post {
      //       //         id
      //       //         points
      //       //         voteStatus
      //       //       }
      //       //     `,
      //       //     { id: postId }
      //       //   );
      //       //   if (data) {
      //       //     if (data.voteStatus === value) {
      //       //       return;
      //       //     }
      //       //     const newPoints =
      //       //       (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
      //       //     cache.writeFragment(
      //       //       gql`
      //       //         fragment _ on Post {
      //       //           points
      //       //           voteStatus
      //       //         }
      //       //       `,
      //       //       { id: postId, points: newPoints, voteStatus: value }
      //       //     );
      //       //   }
      //       // },

      //       // createPost: (_result, args, cache, info) => {
      //       //   invalidatePosts(cache);
      //       // },

      //       // createMessage: (_result, args, cache, info) => {
      //       //   invalidateMessages(cache);
      //       // },

      //       logout: (_result, args, cache, info) => {
      //         betterUpdateQuery<LogoutMutation, MeQuery>(
      //           cache,
      //           { query: MeDocument },
      //           _result,
      //           () => ({ me: null })
      //         );
      //       },
      //       login: (_result, args, cache, info) => {
      //         betterUpdateQuery<LoginMutation, MeQuery>(
      //           cache,
      //           { query: MeDocument },
      //           _result,
      //           (result, query) => {
      //             if (result.login.errors) {
      //               return query;
      //             } else {
      //               return {
      //                 me: result.login.user,
      //               };
      //             }
      //           }
      //         );
      //       },
      //       register: (_result, args, cache, info) => {
      //         betterUpdateQuery<RegisterMutation, MeQuery>(
      //           cache,
      //           { query: MeDocument },
      //           _result,
      //           (result, query) => {
      //             if (result.register.errors) {
      //               return query;
      //             } else {
      //               return {
      //                 me: result.register.user,
      //               };
      //             }
      //           }
      //         );
      //       },
      //     },
      //   },
      // }),
      errorEnchange,
      ssrExchange

      // multipartFetchExchange,
      // subscriptionExchange({
      //   // forwardSubscription: (operation) => ({
      //   //   subscribe: (sink) => ({
      //   //     unsubscribe: wsClient!.subscribe(operation, sink),
      //   //   }),
      //   forwardSubscription: (operation) =>
      //     subscriptionClient!.request(operation),
      // }),
    ],
  };
};

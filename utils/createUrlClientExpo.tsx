import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "@/generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, fetchExchange } from "urql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";

const isServer = () => typeof window === "undefined";
let cookie: any;

async function getCookie() {
  const cookie = await AsyncStorage.getItem("cookie");
  return cookie;
}

const GetCookie: any = () => {
  if (isServer()) {
    cookie = getCookie();
  }
};

export const client = createClient({
  url: "http://192.168.0.252:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
    headers: cookie
      ? {
          cookie,
        }
      : (cookie = GetCookie),
  },
  exchanges: [
    fetchExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          // posts: cursorPagination(),
          // messages: messagesScrolling(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
  ],
});

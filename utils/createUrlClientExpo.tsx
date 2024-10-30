import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "@/generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, fetchExchange, subscriptionExchange } from "urql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { Client, createClient as createSubClient } from "graphql-ws";
import { Platform } from "react-native";
const isServer = () => typeof window === "undefined";
let cookie: any;

async function getCookie() {
  const cookie = await AsyncStorage.getItem("cookie");
  return cookie;
}

const GetCookie: any = () => {
  // if (isServer()) {
  cookie = getCookie();
  console.log("cookie" + getCookie());
  // }
};

const invalidateQuestionario = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "questionario"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "questionario", fi.arguments || {});
  });
  cache.invalidate("Query", "questionario");
};

const subscriptionClient: Client = createSubClient({
  url: "ws://192.168.0.252:4000/graphql",
});

export const client = createClient({
  // url: "http://localhost:4000/graphql",
  url: process.env.EXPO_PUBLIC_API_URL!,
  // Platform.OS === "web"
  //   ? process.env.EXPO_PUBLIC_DEV_WEB_URL
  //   : process.env.EXPO_PUBLIC_DEV_DEVICE_URL,
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
            console.log("chache exchanged?");
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

    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => {
          const { query, variables } = operation;
          const unsubscribe = subscriptionClient.subscribe(
            {
              // id: key.toString(), // Optional, but helpful for tracking
              query: query as string, // Ensure query is a string
              variables: variables as Record<string, any> | undefined,
            },
            {
              next: sink.next.bind(sink),
              error: sink.error.bind(sink),
              complete: sink.complete.bind(sink),
            }
          );
          return { unsubscribe };
        },
      }),
    }),
  ],
});

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeBaseProvider } from "native-base";
import NotificationListener from "./notificationListener";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "graphql-ws";
import { Platform } from "react-native";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { persistCache } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.EXPO_PUBLIC_DEV_SUBSCRIPTION_URL as string,
    })
  );

  const httpLink = new HttpLink({
    uri:
      Platform.OS === "web"
        ? process.env.EXPO_PUBLIC_DEV_WEB_URL!
        : process.env.EXPO_PUBLIC_DEV_DEVICE_URL!,
    credentials: "include",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
  let cache = new InMemoryCache();
  const client = new ApolloClient({
    link: splitLink,
    // uri,
    cache,
    credentials: "include",
    devtools: { enabled: true },
  });

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  // const [loadingCache, setLoadingCache] = useState(true);

  // useEffect(() => {
  //   persistCache({
  //     cache,
  //     storage: AsyncStorage,
  //   }).then(() => setLoadingCache(false));
  // }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(register)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
        <NotificationListener />
      </NativeBaseProvider>
    </ApolloProvider>
  );
}

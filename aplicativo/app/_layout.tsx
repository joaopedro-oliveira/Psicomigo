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
import { NativeBaseProvider, Skeleton, VStack } from "native-base";
import NotificationListener from "./notificationListener";
import { ApolloLink, ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "graphql-ws";
import { Platform } from "react-native";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { persistCache } from "apollo3-cache-persist";
import { LocaleConfig } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SkeletonLoader from "@/components/SkeletonLoader";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.EXPO_PUBLIC_DEV_SUBSCRIPTION_URL as string,
    })
  );

  // const delayLink = new ApolloLink((operation, forward) => {
  //   return new Observable((observer) => {
  //     const delay = 3000; // 3-second delay
  //     setTimeout(() => {
  //       forward(operation).subscribe(observer);
  //     }, delay);
  //   });
  // });

  const httpLink = new HttpLink({
    uri:
      Platform.OS === "web"
        ? process.env.EXPO_PUBLIC_DEV_WEB_URL!
        : process.env.EXPO_PUBLIC_DEV_DEVICE_URL!,
    credentials: "include",
  });

  // const httpLink = new HttpLink({
  //   uri: process.env.EXPO_PUBLIC_API_URL,
  //   // credentials: "include",
  // });

  // const wsLink = new GraphQLWsLink(
  //   createClient({
  //     url: process.env.EXPO_PUBLIC_API_SUBSCRIPTION_URL as string,
  //   })
  // );

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
  let cache = new InMemoryCache({});
  const client = new ApolloClient({
    // link: ApolloLink.from([delayLink, httpLink]),
    link: splitLink,
    // uri,
    cache,

    credentials: "include",
    devtools: { enabled: true },
  });

  const colorScheme = useColorScheme();

  LocaleConfig.locales["pt-br"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt-br";

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
    return (
      <NativeBaseProvider>
        <SkeletonLoader />
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack initialRouteName="(tabs)">
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="(register)"
                options={{ headerShown: false }}
              />
            </Stack>
          </ThemeProvider>
          <NotificationListener />
        </GestureHandlerRootView>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}

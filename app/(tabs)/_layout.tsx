import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeBaseProvider } from "native-base";
import { useMeQuery } from "@/generated/graphql";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { data, loading: fetching } = useMeQuery();

  if (fetching) return null;

  return (
    <NativeBaseProvider>
      {data!.me?.tipo === "Paciente" ? (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: () => null,
              // title: "Home",
              // headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              tabBarLabel: () => null,
              // title: "Home",
              // headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "calendar" : "calendar-outline"}
                  color={color}
                />
              ),
            }}
          />

          {/* <Tabs.Screen
            name="teste"
            options={{
              // title: "Explore",
              tabBarIcon: ({ color, focused }) => null,
            }}
          /> */}

          <Tabs.Screen
            name="(perguntas)"
            options={{
              // title: "Explore",
              href: null,
              tabBarIcon: ({ color, focused }) => null,
            }}
          />
        </Tabs>
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: () => null,

              // title: "Home",
              // headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="(perguntas)"
            options={{
              // title: "Explore",
              tabBarIcon: ({ color, focused }) => null,
            }}
          />
        </Tabs>
      )}
    </NativeBaseProvider>
  );
}

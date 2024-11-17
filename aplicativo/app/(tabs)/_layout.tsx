import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeBaseProvider } from "native-base";
import { useMeQuery } from "@/generated/graphql";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { data, loading: fetching } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });

  if (fetching) return null;

  return (
    <NativeBaseProvider>
      {data?.me?.tipo === "Paciente" ? (
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
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "calendar" : "calendar-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="usuario/[id]"
            options={{
              tabBarLabel: () => null,
              href: null,
            }}
          />

          <Tabs.Screen
            name="(perguntas)"
            options={{
              href: null,
              tabBarIcon: () => null,
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
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="usuario/[id]"
            options={{
              href: null,
              tabBarIcon: () => null,
            }}
          />

          <Tabs.Screen
            name="(perguntas)"
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "book" : "book-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              tabBarLabel: () => null,
              href: null,
              tabBarIcon: () => null,
            }}
          />
        </Tabs>
      )}
    </NativeBaseProvider>
  );
}

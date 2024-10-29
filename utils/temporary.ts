import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {
  useEnviaQuestionariosSubscription,
  useMeQuery,
  useGetPushTokenQuery,
  useSavePushTokenMutation,
} from "@/generated/graphql"; // Assuming these hooks are generated correctly
import getDeviceID from "@/utils/getDeviceID";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationListener() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [{ data }] = useEnviaQuestionariosSubscription();
  const [{ data: meData }] = useMeQuery();
  const [, savePushToken] = useSavePushTokenMutation();

  useEffect(() => {
    if (data?.enviaQuestionario) {
      if (!meData?.me) return;

      if (meData.me.id === data.enviaQuestionario.usuarioId) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Novo questionário!" + data.enviaQuestionario.id,
            body:
              "Id do usuário:" + data.enviaQuestionario.usuarioId.toString(),
          },
          trigger: null,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        setExpoPushToken(token.toString());
        console.log(token.toString());
        const deviceId = await getDeviceID();
        savePushToken({ deviceId, token: token.toString() });

        // Fetch the push token based on the device ID
        fetchPushToken(deviceId);
      }
    });

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Function to fetch the push token using the device ID
  const fetchPushToken = async (deviceId: string) => {
    const [{ data: tokenData }] = await useGetPushTokenQuery({
      variables: { deviceId },
    });

    if (tokenData?.getPushToken?.token) {
      const token = tokenData.getPushToken.token; // Adjust this according to your GraphQL response structure
      console.log(token);
      setExpoPushToken(token);
    }
  };

  return null;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    // Get the push token directly here instead of using a hook
    try {
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

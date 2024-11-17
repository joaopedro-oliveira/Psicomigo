import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {
  useEnviaNotificacaoSubscription,
  useEnviaQuestionariosSubscription,
  useMeQuery,
} from "@/generated/graphql";
import { useNavigation } from "expo-router";
import { useApolloClient } from "@apollo/client";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const navigation = useNavigation();
  const { data } = useEnviaQuestionariosSubscription();
  const { data: meData } = useMeQuery();
  const { data: notificacoes } = useEnviaNotificacaoSubscription();
  const apollo = useApolloClient();

  type messageType = {
    to?: string;
    sound: string;
    title: string;
    body: string;
    data: {};
  };

  async function sendPushNotification(message: messageType) {
    message.to = expoPushToken;
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      redirect: "follow",
    });
  }

  useEffect(() => {
    if (data?.enviaQuestionario) {
      if (!meData?.me) return;

      apollo.cache.evict({ fieldName: "questionario" });

      if (Platform.OS === "web") return;

      if (meData.me.id === data.enviaQuestionario.usuarioId) {
        const message = {
          sound: "default",
          title: "Original Title",
          body: "And here is the body!",
          data: { someData: "goes here", nagivate: "history" },
        };

        sendPushNotification(message);
      }
    }
  }, [data]);

  useEffect(() => {
    if (notificacoes?.enviaNotificacao) {
      if (!meData?.me) return;
      if (Platform.OS === "web") return;

      const usuarioDentroDosIds = notificacoes.enviaNotificacao.userIds?.find(
        (id) => id === meData.me?.id
      );
      console.log(usuarioDentroDosIds);
      if (usuarioDentroDosIds) {
        Notifications.scheduleNotificationAsync({
          content: {
            sound: "default",
            title: notificacoes.enviaNotificacao.title,
            body: notificacoes.enviaNotificacao.body,
            data: { nagivate: notificacoes.enviaNotificacao.data?.value },
            launchImageName: "AppIcon.png",
          },
          trigger: { seconds: 2 },
        });
      }
    }
  }, [notificacoes]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

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
        const { data } = response.notification.request.content;
        if (data?.nagivate) {
          navigation.navigate(`${data.nagivate}` as never); // Navigate to the specified screen
        }
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
    console.log(finalStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

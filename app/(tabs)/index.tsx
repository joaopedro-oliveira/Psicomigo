import { useState, useEffect, useRef, Suspense } from "react";
import { Image } from "react-native";
import tw from "twrnc";
import {
  useQuestionarioQuery,
  useMeQuery,
  useCriarPerguntaMutation,
  Resposta,
  useResponderPerguntaMutation,
  useLogoutMutation,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import CustomButton from "@/components/CustomButtton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApolloClient } from "@apollo/client";
import { ScrollView as RNScrollView } from "react-native";
import { useIsAuth } from "@/utils/useIsAuth";
import { VisaoUsuario } from "@/components/VisaoUsuario";
import { VisaoMedico } from "@/components/VisaoMedico";
import { Text } from "native-base";

const HomeScreen = () => {
  useIsAuth();
  const { data: meData, loading: fetching } = useMeQuery({ skip: isServer() });
  const [criarQuestionario] = useCriarPerguntaMutation();
  const apollo = useApolloClient();
  const [logout] = useLogoutMutation();

  return (
    <ThemedView
      style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto`}
    >
      <CustomButton
        title="Criar Q"
        onPress={criarQuestionario}
        style={tw`absolute right-0 bottom-0 z-2 mb-4 mr-4`}
      />
      <CustomButton
        title="Logout"
        onPress={async () => {
          logout();
          await apollo.resetStore();
        }}
        style={tw`absolute left-0 bottom-0 z-2 mb-4 ml-4`}
      />

      <ThemedView
        style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center`}
      >
        {fetching ? (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
            Loading
          </ThemedText>
        ) : meData?.me ? (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-xl`}>
            {meData.me.username}
          </ThemedText>
        ) : (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
            No User
          </ThemedText>
        )}
        <Image
          source={require("@/assets/images/AppIcon.png")}
          style={tw`mr-7 ml-auto w-[56px] h-[56px]`}
        />
      </ThemedView>

      {meData?.me?.tipo === "Doutor" ? (
        <Suspense fallback={<Loading />}>
          <VisaoMedico />
        </Suspense>
      ) : (
        <VisaoUsuario />
      )}
    </ThemedView>
  );
};

function Loading() {
  return <Text>🌀 Loading...</Text>;
}

export default HomeScreen;

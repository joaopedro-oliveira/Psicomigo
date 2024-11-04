import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useEnviaQuestionariosSubscription,
  useLogoutMutation,
  useMeQuery,
  usePerguntasQuery,
  useQuestionarioQuery,
} from "@/generated/graphql";
import { useIsAuth } from "@/utils/useIsAuth";
import { isServer } from "@/utils/isServer";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { Box, FlatList, TextField, View } from "native-base";
import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButtton";
import Mensagem from "@/components/Mensagem";
import * as Device from "expo-device";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PerguntaComponent from "@/components/perguntasComponents/perguntaChat";
import { Link, router, useNavigation } from "expo-router";

type OpcoesResposta = {
  __typename?: "OpcoesResposta";
  id: number;
  text: string;
};

type Pergunta = {
  __typename?: "Pergunta";
  id: number;
  pergunta: string;
  tipo: string;
  topico: string;
  opcoes_respostas?: OpcoesResposta[] | null;
};

export default function Perguntas() {
  // useIsAuth();
  const navigation = useNavigation();

  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data: meData, loading: meFetching } = useMeQuery({
    skip: isServer(),
  });
  const { data, loading: fetching } = usePerguntasQuery();
  if (fetching) return null;

  return (
    <ThemedView style={tw`h-full w-full bg-white`}>
      {/* <CustomButton
        title=""
        onPress={criarQuestionario}
        style={tw`absolute right-0 bottom-0 mb-4 mr-4`}
      /> */}

      <ThemedView
        style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center`}
      >
        <>
          {meFetching ? (
            <ThemedText
              type="subtitle"
              style={tw`text-black ml-7 mr-auto text-2xl`}
            >
              Loading
            </ThemedText>
          ) : !meData?.me ? (
            <ThemedText
              type="subtitle"
              style={tw`text-black ml-7 mr-auto text-2xl`}
            >
              No User
            </ThemedText>
          ) : (
            <ThemedText
              type="subtitle"
              style={tw`text-gray-400 ml-7 mr-auto text-xl`}
            >
              {meData.me.username.charAt(0).toUpperCase() +
                meData.me.username.slice(1).toLowerCase() +
                ""}
            </ThemedText>
          )}
        </>

        <Image
          source={require("@/assets/images/AppIcon.png")}
          style={tw`mr-7 w-[56px] h-[56px]`}
        />
      </ThemedView>
      <SafeAreaView
        style={tw`w-full min-h-20 my-4 mx-[10%] ios:mx-[8%] ios:w-[90%] justify-center`}
      >
        {Platform.OS !== "web" ? (
          <>
            <TouchableOpacity
              style={tw`flex-row mt-auto h-12 w-12 justify-center items-center rounded-lg bg-[#4894FE]`}
              onPress={() => navigation.navigate("CadastrarPerguntas" as never)}
            >
              <Ionicons name="add" size={24} color={"white"} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={tw`flex-row mt-auto`}>
              <CustomButton
                onPress={() =>
                  navigation.navigate("CadastrarPerguntas" as never)
                }
                title="Adicionar Pergunta"
                style={tw`rounded-xl bg-[#4894FE] `}
              ></CustomButton>
            </View>
          </>
        )}
      </SafeAreaView>
      <FlatList
        data={data?.perguntas}
        // height={"30"}
        style={tw`flex-col mx-[10%] ios:mx-[5%] ios:w-[90%] my-auto `}
        renderItem={({ item, index }) => {
          return (
            // <Pergunta
            //   device={Platform.OS}
            //   pergunta={item}
            //   key={index}
            // ></Pergunta>
            <PerguntaComponent pergunta={item}></PerguntaComponent>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

// export default Perguntas;

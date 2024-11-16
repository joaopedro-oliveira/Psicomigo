import { Image, Platform, SafeAreaView, StyleSheet } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useLogoutMutation,
  useMeQuery,
  usePerguntasQuery,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import { FlatList, View } from "native-base";
import CustomButton from "@/components/CustomButtton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PerguntaComponent from "@/components/perguntasComponents/perguntaChat";
import { useNavigation } from "expo-router";
import { useApolloClient } from "@apollo/client";

export default function Perguntas() {
  const apollo = useApolloClient();
  const navigation = useNavigation();

  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data: meData, loading: meFetching } = useMeQuery({
    skip: isServer(),
  });
  const { data, loading: fetching } = usePerguntasQuery();
  if (fetching) return null;

  return (
    <ThemedView style={tw`h-full w-full bg-white`}>
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
            <ThemedView
              style={tw`flex-row bg-transparent items-center text-center`}
            >
              <ThemedText
                type="subtitle"
                style={tw`text-gray-400 ml-7 mr-auto text-xl`}
              >
                {meData.me.username.charAt(0).toUpperCase() +
                  meData.me.username.slice(1).toLowerCase() +
                  ""}
              </ThemedText>
              <CustomButton
                style={tw`bg-transparent  p-0 m-0 `}
                onPress={async () => {
                  logout();
                  await apollo.resetStore();
                }}
              >
                <ThemedText type="link" style={tw`text-center text-base`}>
                  Sair
                </ThemedText>
              </CustomButton>
            </ThemedView>
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
              />
            </View>
          </>
        )}
      </SafeAreaView>
      <FlatList
        data={data?.perguntas}
        style={tw`flex-col mx-[10%] ios:mx-[5%] ios:w-[90%] my-auto `}
        renderItem={({ item, index }) => {
          return <PerguntaComponent pergunta={item} />;
        }}
      />
    </ThemedView>
  );
}

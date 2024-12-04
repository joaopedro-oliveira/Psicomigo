import { Suspense } from "react";
import { Image, Touchable } from "react-native";
import tw from "twrnc";
import {
  useMeQuery,
  useCriarPerguntaMutation,
  useLogoutMutation,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import CustomButton from "@/components/CustomButtton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApolloClient } from "@apollo/client";
import { useIsAuth } from "@/utils/useIsAuth";
import { VisaoUsuario } from "@/components/VisaoUsuario";
import { VisaoMedico } from "@/components/VisaoMedico";
import { Text } from "native-base";
import { LoadingSkeletonMedico } from "@/components/LoadingSkeletonMedico";
import SkeletonLoader from "@/components/SkeletonLoader";
import { LoadingSkeletonPaciente } from "@/components/LoadingSkeletonPaciente";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  useIsAuth();
  const { data: meData, loading: fetching } = useMeQuery({
    skip: isServer(),
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const [criarQuestionario] = useCriarPerguntaMutation();
  const apollo = useApolloClient();
  const [logout] = useLogoutMutation();

  if (fetching) {
    return <SkeletonLoader />;
  }
  if (!fetching && (!meData?.me || !meData.me.tipo))
    return <Text>No User</Text>;

  const userType = meData!.me!.tipo;

  return (
    <ThemedView style={tw`h-full w-full bg-white shadow-md p-2 web:m-auto`}>
      {/* <TouchableOpacity
        style={tw`absolute w-7 h-7 items-center  bg-black`}
        onPress={() => {
          criarQuestionario();
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity> */}

      <ThemedView
        style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center`}
      >
        {fetching ? (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
            Loading
          </ThemedText>
        ) : meData?.me ? (
          <ThemedView
            style={tw`flex-row bg-transparent items-center text-center`}
          >
            <ThemedText
              style={[
                tw`text-black text-lg align-middle ml-5 mr-2 text-center `,
                {
                  fontFamily: "PoppinsSemiBold",
                },
              ]}
            >
              {meData.me.username}
            </ThemedText>
            <CustomButton
              style={tw`bg-transparent  p-0 m-0 `}
              onPress={async () => {
                await logout();
                await apollo.resetStore();
              }}
            >
              <ThemedText type="link" style={tw`text-center text-base`}>
                Sair
              </ThemedText>
            </CustomButton>
          </ThemedView>
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
      {meData!.me!.tipo === "Doutor" ? (
        <Suspense fallback={<LoadingSkeletonMedico />}>
          <VisaoMedico />
        </Suspense>
      ) : (
        meData && (
          <Suspense fallback={<LoadingSkeletonPaciente />}>
            <VisaoUsuario user={meData} />
          </Suspense>
        )
      )}
    </ThemedView>
  );
};

export default HomeScreen;

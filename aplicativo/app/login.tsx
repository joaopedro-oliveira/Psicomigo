import { Image, StyleSheet, SafeAreaView } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { ScrollView, Text } from "native-base";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const params = useLocalSearchParams();
  const next = params.next;

  return (
    <ThemedView>
      <ScrollView
        style={tw`h-full w-full bg-white  rounded-xl shadow-md p-2 `}
        contentContainerStyle={tw`flex-grow-1`}
      >
        <ThemedView
          style={tw`m-auto bg-white web:bg-transparent px-2 w-full  h-[500px] flex`}
        >
          <ThemedView style={tw`flex-row items-center bg-transparent`}>
            <ThemedText
              style={[
                tw`text-black text-3xl ml-auto`,
                { fontFamily: "PoppinsRegular" },
              ]}
            >
              Psicomigo
            </ThemedText>
            <Image
              source={require("@/assets/images/AppIcon.png")}
              style={tw` mr-auto ml-3 w-[56px] h-[56px]`}
            />
          </ThemedView>
          <ThemedText
            style={[
              tw`text-xl  mt-20 text-black mx-auto`,
              { fontFamily: "PoppinsSemiBold" },
            ]}
          >
            Entre com sua conta!
          </ThemedText>

          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: "questionario" });
                  cache.evict({ fieldName: "medico" });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                if (typeof next === "string") {
                  router.push({ pathname: `./(tabs)/${next}` });
                } else {
                  router.push("/(tabs)/");
                }
              }
            }}
          >
            {({ handleSubmit }) => (
              <>
                <KeyboardWrapper style={tw`m-0 p-0`}>
                  <SafeAreaView
                    style={tw`mt-8 flex justify-center w-[75%] mx-auto`}
                  >
                    <ThemedText style={tw` text-black text-4 `}>
                      Email
                    </ThemedText>
                    <ThemedTextInputField
                      style={tw`w-full  h-12 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`}
                      name="usernameOrEmail"
                      placeholder="Ex: john.doe@email.com"
                      _mask={false}
                    />

                    <ThemedText style={tw`mt-4 text-black `}>Senha</ThemedText>
                    <ThemedTextInputField
                      style={tw`w-full h-12 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`}
                      name="password"
                      placeholder="*********"
                      secureTextEntry={true}
                      _mask={false}
                    />
                  </SafeAreaView>
                </KeyboardWrapper>

                <CustomButton
                  onPress={handleSubmit}
                  title="ENTRAR"
                  style={tw`rounded-xl mt-18 mt-10 w-[82.5%] bg-[#4894FE] mx-auto`}
                ></CustomButton>
              </>
            )}
          </Formik>

          <SafeAreaView
            style={tw`mt-4 flex-row justify-center w-[75%] mx-auto flex-nowrap`}
          >
            <ThemedText
              numberOfLines={1}
              adjustsFontSizeToFit
              ellipsizeMode="tail"
              style={tw`text-black mr-1 text-base `}
            >
              Não possui uma conta?
            </ThemedText>
            <Link href={"/register"} style={tw` leading-normal`}>
              <ThemedText
                adjustsFontSizeToFit
                numberOfLines={1}
                type="link"
                ellipsizeMode="tail"
                style={tw`text-base`}
              >
                Cadastre-se!
              </ThemedText>
            </Link>
          </SafeAreaView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default Login;

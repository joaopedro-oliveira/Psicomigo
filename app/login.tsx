import { Image, StyleSheet, SafeAreaView } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useLoginMutation } from "@/generated/graphql";
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
    <KeyboardWrapper>
      <ScrollView
        style={tw`h-full w-full bg-white web:h-[80%] web:w-[25%] rounded-xl shadow-md p-2 web:m-auto`}
        contentContainerStyle={tw`flex-grow-1`}
      >
        <ThemedView
          style={tw`m-auto bg-white web:bg-transparent px-2 w-full  h-[458px] flex`}
        >
          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw` mx-auto w-[56px] h-[56px]`}
          />
          <ThemedText
            style={[
              tw`text-3xl web:text-[160%] mt-16 text-black mx-auto`,
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
                update: (cache) => {
                  cache.evict({ fieldName: "me" });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                //   //worked.
                // console.log(response.data.login.user);
                if (typeof next === "string") {
                  router.push({ pathname: `./(tabs)/${next}` });
                } else {
                  router.push("/(tabs)/");
                }
              }
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
            }) => (
              <>
                <SafeAreaView
                  style={tw`mt-8 flex justify-center w-[75%] mx-auto`}
                >
                  <ThemedText style={tw` text-black text-4 `}>Email</ThemedText>
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
    </KeyboardWrapper>
  );
};

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

export default Login;

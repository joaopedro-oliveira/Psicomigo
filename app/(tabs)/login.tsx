import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import tw from "twrnc";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { createUrqlClient } from "@/utils/createUrqlClient";





const Login = () => {
  
  const router = useRouter();
  const [, login] = useLoginMutation();
  const params = useLocalSearchParams();
  const next = params.next;  
 
  return (

    <ThemedView style={tw`h-full w-full bg-white font-poppins`}>
      <ThemedView style={tw`m-auto bg-white px-2 w-full h-[458px] flex`}>
        <Image
          source={require("@/assets/images/AppIcon.png")}
          style={tw` mx-auto w-[56px] h-[56px]`}
        />
        <ThemedText type="title" style={tw` mt-16 text-black mx-auto`}>
          Entre com sua conta!
        </ThemedText>
        

        <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login(values);
                console.log(response)
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));

                } else if (response.data?.login.user) {
                //   //worked.
                  if (typeof next === "string") {
                    router.push({pathname: `./${next}`});
                  } else {
                    router.push("/");
                  }
                }
              }}
            >

      {({ isSubmitting, handleChange, handleBlur, handleSubmit, values }) => (
        <>
        <SafeAreaView style={tw`mt-8 flex justify-center w-[75%] mx-auto`}>
          <ThemedText style={tw` text-black text-4 `}>Email</ThemedText>
          <TextInput
            style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-blue-300`}
            placeholder="Ex: john.doe@email.com"
            onChangeText={handleChange('usernameOrEmail')}
            onBlur={handleBlur('usernameOrEmail')}
            value={values.usernameOrEmail}
          />
          <ThemedText style={tw`mt-4 text-black `}>Senha</ThemedText>
          <TextInput
            style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa]`}
            //onChangeText={onChangeNumber}
            //value={number}
            placeholder="*********"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
        </SafeAreaView>

        <CustomButton onPress={handleSubmit} title="ENTRAR"  style={tw`rounded-xl mt-18 w-[82.5%] bg-[#4894FE] mx-auto`}></CustomButton>
        </>
        )}
         </Formik>






         
        <SafeAreaView style={tw`mt-4 flex-row justify-center w-[75%] mx-auto `}>
          <ThemedText style={tw`text-black mr-1`}>Não possui uma conta?</ThemedText>
          <Link href={'/(tabs)/register'} style={tw`text-base leading-normal`}>
            <ThemedText  type="link" style={tw`text-md`}>Cadastre-se!</ThemedText>
          </Link>
        </SafeAreaView>
      </ThemedView>
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


export default Login;

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./register";
import PrimeiroPasso from "./primeiroPasso";
import { useRegisterMutation } from "@/generated/graphql";
import { Opcoes_Registro } from "@/utils/tipos";
import { toErrorMap } from "@/utils/toErrorMap";
import { Formik } from "formik";
import { useNavigation } from "expo-router";

export default function RegisterLayout() {
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
  const [, register] = useRegisterMutation();
  const params = useLocalSearchParams();
  const next = params.next;
  const router = useRouter();
  const navigation = useNavigation();

  const initialValues: Opcoes_Registro = {
    email: "",
    username: "",
    password: "",
    confirmarSenha: "",
    cpf: "",
    crm: "",
    tipo: "Paciente",
    genero: "M",
    dataNascimento: undefined,
  };

  return (
    <NativeBaseProvider>
      <Formik<Opcoes_Registro>
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          values.dataNascimento = new Date();
          const response = await register({ options: values });
          console.log(response);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
            response.data.register.errors.every((error) => {
              if (
                ["username", "password", "email", "confirmarSenha"].includes(
                  error.field
                )
              ) {
                navigation.navigate("Register" as never);
                return true; // or false depending on your logic
              }
            });
          } else if (response.data?.register.user) {
            //   //worked.
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
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Register"
            >
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="PrimeiroPasso" component={PrimeiroPasso} />
            </Stack.Navigator>
          </>
        )}
      </Formik>
    </NativeBaseProvider>
  );
}

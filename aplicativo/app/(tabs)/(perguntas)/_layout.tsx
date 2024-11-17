import React from "react";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import Perguntas from ".";
import CadastrarPerguntas from "./cadastrarPergunta";
import Pergunta from "./pergunta/[id]";

const TabLayout = () => {
  const Stack = createStackNavigator();
  return (
    <NativeBaseProvider>
      <Stack.Navigator
        initialRouteName="Perguntas"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Perguntas"
          component={Perguntas}
          options={{
            headerTitle: "Perguntas",
            headerTitleStyle: { fontFamily: "PoppinsRegular" },
          }}
        />
        <Stack.Screen
          name="CadastrarPerguntas"
          options={{
            headerTitle: "Cadastrar perguntas",
            headerShown: true,

            headerTitleStyle: { fontFamily: "PoppinsRegular" },
          }}
          component={CadastrarPerguntas}
        />
        <Stack.Screen
          name="pergunta/[id]"
          options={{
            headerTitle: "Atualizar pergunta",
            headerShown: true,
            headerTitleStyle: { fontFamily: "PoppinsRegular" },
          }}
          component={Pergunta}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
};

export default TabLayout;

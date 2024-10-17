import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput,
  Button,
  View,
} from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Container, FormControl, Select, Text } from 'native-base';


const Register: React.FC<{ navigation: any }> = ({navigation}) => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setconfirmarSenha] = useState('');

  return (
    <ThemedView style={tw`h-full w-full bg-white font-poppins`}>
      <ThemedView style={tw`m-auto bg-white px-2 w-full h-[90%] flex`}>
        <View style={tw`flex-row`}>
          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mt-6 ml-auto mr-7 start-left w-[56px] h-[56px]`}
          />
        </View>

        <FormControl style={tw`flex justify-center w-[75%] mx-auto`}>
          <ThemedText type="title" style={tw` mt-10 text-black`}>
            Crie sua conta
          </ThemedText>
          <ThemedText  style={tw`mt-8 ml-0.5 text-lg text-black `}>Nome</ThemedText>
            <TextInput
              value={nome}
              onChangeText={(nome) => setNome(nome)}
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-blue-300`}
              placeholder="Ex: john doe"
              //onChangeText={onChangeText}
              //value={text}
            />
            <ThemedText  style={tw` mt-2 ml-0.5 text-lg text-black `}>Email </ThemedText>
            <TextInput
              value={email}
              onChangeText={(email) => setNome(email)}
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-[#888888]`}
              placeholder="Ex: john.doe@email.com"
              //onChangeText={onChangeText}
              //value={text}
            />
            <ThemedText style={tw`mt-4 text-black `}>Senha</ThemedText>
            <TextInput
              value={senha}
              onChangeText={(senha) => setNome(senha)}
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa]`}
              //onChangeText={onChangeNumber}
              //value={number}
              placeholder="**********"
              keyboardType="default"
            />
            <ThemedText style={tw`mt-4 text-black `}>Confirmar senha</ThemedText>
            <TextInput
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa]`}
              value={confirmarSenha}
              onChangeText={(confirmarSenha) => setNome(confirmarSenha)}
              placeholder="**********"
              keyboardType="default"
            />
            <CustomButton onPress={() => {router.navigate('/(tabs)/secondStep')}} title="Próximo"  style={tw`text- rounded-xl mt-7 w-full bg-[#4894FE] mx-auto`}></CustomButton>

           
        </FormControl>
        <SafeAreaView style={tw`mt-auto flex-row justify-center w-[75%] mx-auto `}>
              <ThemedText style={tw`text-black mr-1`}>Possui uma conta?</ThemedText>
              <Link asChild={true} href={'/(tabs)'} style={tw`text-base leading-normal`}>
                <ThemedText  type="link" style={tw`text-md`}>Entre</ThemedText>
              </Link>
          </SafeAreaView>
        {/*   
          <SafeAreaView style={tw`mt-8 flex justify-center w-[75%] mx-auto`}>
            <ThemedText style={tw` text-black text-4 `}>Email</ThemedText>
            <TextInput
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-blue-300`}
              placeholder="Ex: john.doe@email.com"
              //onChangeText={onChangeText}
              //value={text}
            />
            <ThemedText style={tw`mt-4 text-black `}>Senha</ThemedText>
            <TextInput
              style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa]`}
              //onChangeText={onChangeNumber}
              //value={number}
              placeholder="Use uma senha forte!"
              keyboardType="default"
            />
          </SafeAreaView>
  
          <CustomButton onPress={() => {alert("123")}} title="ENTRAR"  style={tw`rounded-xl mt-18 w-[82.5%] bg-[#4894FE] mx-auto`}></CustomButton>
          <SafeAreaView style={tw`mt-4 flex-row justify-center w-[75%] mx-auto `}>
            <ThemedText style={tw`text-black mr-1`}>Não possui uma conta?</ThemedText>
            <Link asChild={true} href={'/(tabs)/register'} style={tw`text-base leading-normal`}>
              <ThemedText  type="link" style={tw`text-lg`}>Cadastre-se!</ThemedText>
            </Link>
          </SafeAreaView> */}
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

export default Register
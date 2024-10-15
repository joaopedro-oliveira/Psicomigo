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
import { Link } from "expo-router";

export default function HomeScreen() {
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

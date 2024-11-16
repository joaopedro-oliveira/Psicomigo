import { Image, SafeAreaView, View } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";

const Stack = createStackNavigator();

const Register: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <ThemedView style={tw`h-full w-full bg-white`}>
      <ThemedView
        style={tw`mx-auto bg-white px-2 w-full h-[85%] mt-8 ios:mt-12 flex`}
      >
        <View style={tw`flex-row`}>
          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mt-6 ml-auto mr-7 w-[56px] h-[56px]`}
          />
        </View>

        <SafeAreaView style={tw`flex justify-center w-[85%] mx-auto`}>
          <ThemedText type="title" style={tw`mt-10 text-black`}>
            Crie sua conta
          </ThemedText>

          <>
            <ThemedText style={tw`mt-2 ml-0.5 text-lg text-[#888888]`}>
              Nome{" "}
            </ThemedText>
            <ThemedTextInputField
              _mask={false}
              name="username"
              style={tw`w-full h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa]`}
              placeholder="Ex: João Pedro"
              keyboardType="email-address"
            />
            <ThemedText style={tw` mt-4 ml-0.5 text-lg text-[#888888] `}>
              Email{" "}
            </ThemedText>
            <ThemedTextInputField
              name="email"
              _mask={false}
              style={tw`w-full h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa] `}
              placeholder="Ex: john.doe@email.com"
            />
            <ThemedText style={tw`mt-5 text-[#888888] `}>Senha</ThemedText>
            <ThemedTextInputField
              name="password"
              _mask={false}
              style={tw`w-full h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa]`}
              placeholder="**********"
              keyboardType="default"
              secureTextEntry={true}
            />
            <ThemedText style={tw`mt-5 text-[#888888] `}>
              Confirmar senha
            </ThemedText>
            <ThemedTextInputField
              name="confirmarSenha"
              _mask={false}
              style={tw`w-full h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa]`}
              placeholder="**********"
              keyboardType="default"
              secureTextEntry={true}
            />
          </>
        </SafeAreaView>
        <View style={tw`flex-row mt-auto w-[75%] mx-auto justify-center`}>
          <CustomButton
            onPress={() => navigation.navigate("PrimeiroPasso")}
            title="Proximo"
            style={tw`rounded-xl mt-18 w-[82.5%] bg-[#4894FE] mx-auto`}
          ></CustomButton>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default Register;

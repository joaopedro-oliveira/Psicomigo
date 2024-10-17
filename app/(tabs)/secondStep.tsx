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
import { Container, FormControl, Select, Text } from "native-base";

const SecondStep: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [gender, setGender] = useState("");
  const [crm, setCrm] = useState("");
  const [role, setRole] = useState("patient");

  
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
  
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });
  

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
          <ThemedText type="title" style={tw`mt-10 text-black`}>
            Crie sua conta
          </ThemedText>
          <ThemedText style={tw`mt-8 ml-0.5 text-lg text-black `}>
            Sexo
          </ThemedText>
          <Select
            //   className=''
            style={tw`w-full h-10 texr-md rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-blue-300`}
            placeholder="Escolha seu genêro"
            selectedValue={gender}
            onValueChange={(gender) => setGender(gender)}
          >
            <Select.Item label="Masculino" value="M" />
            <Select.Item label="Feminino" value="F" />
            <Select.Item label="Outros" value="O" />
          </Select>

          <ThemedText style={tw` mt-2 ml-0.5 text-lg text-black `}>
            CRM
          </ThemedText>

          <TextInput
            value={crm}
            onChangeText={(crm) => setCrm(crm)}
            style={tw`w-full h-10 p-2.5 border mt-1 border-neutral-400 rounded bg-[#fafafa] hover:bg-neutral-600 placeholder:text-[#888888]`}
            placeholder="123456..."
            //onChangeText={onChangeText}
            //value={text}
          />

          {/* <CustomButton
            onPress={() => {
              router.navigate("/(tabs)/");
            }}
            title="Próximo"
            style={tw`text- rounded-xl mt-7 w-full bg-[#4894FE] mx-auto`}
          ></CustomButton> */}
          
          <View style={styles.buttonContainer}>
            <CustomButton style={tw`rounded-xl mt-7 bg-[#4894FE] mx-auto`} title="Previous" onPress={()=>router.navigate('/(tabs)/register')} />
            <CustomButton style={tw`rounded-xl mt-7 bg-[#4894FE] mx-auto`} title="Next" onPress={()=>router.navigate('/(tabs)/')} />
          </View>

        </FormControl>
        <SafeAreaView
          style={tw`mt-auto flex-row justify-center w-[75%] mx-auto `}
        >
          <ThemedText style={tw`text-black mr-1`}>Possui uma conta?</ThemedText>
          {/* <Link href={"/(tabs)"} style={tw`text-base leading-normal`}>
            <ThemedText type="link" style={tw`text-md`}>
              Entre
            </ThemedText>
          </Link> */}


        </SafeAreaView>
       
      </ThemedView>
    </ThemedView>
  );
}
  export default SecondStep
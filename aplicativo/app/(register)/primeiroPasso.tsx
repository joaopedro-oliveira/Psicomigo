import { Image, SafeAreaView, View } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Opcoes_Registro } from "@/utils/tipos";
import { useFormikContext } from "formik";
import { Picker } from "@react-native-picker/picker";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";

const PrimeiroPasso: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext<Opcoes_Registro>();

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

        <SafeAreaView style={tw`flex justify-center w-[90%] mx-auto`}>
          <ThemedText type="title" style={tw`mt-10 text-black`}>
            Crie sua conta
          </ThemedText>

          <ThemedText style={tw`text-[#888888] mt-8 ml-0.5 text-xl`}>
            Sexo
          </ThemedText>

          <Picker
            itemStyle={tw` h-20 text-base web:bg-[#fafafa]`}
            id="genero"
            style={tw`web:p-2 text-base w-full border-gray-200 web:mt-4 ios:h-20 web:h-14 rounded-xl web:bg-[#fafafa]`}
            selectedValue={values.genero}
            onValueChange={(itemValue, itemIndex) =>
              setFieldValue("genero", itemValue)
            }
          >
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Feminino" value="F" />
            <Picker.Item label="Outros" value="O" />
          </Picker>

          <ThemedText style={tw`text-[#888888] mt-2 ml-0.5 text-lg`}>
            Tipo Cadastro
          </ThemedText>

          <Picker
            itemStyle={tw` h-20 text-base web:bg-[#fafafa]`}
            id="tipo"
            style={tw`web:p-2 text-base w-full border-gray-200 web:mt-4 ios:h-20 web:h-14 rounded-xl web:bg-[#fafafa]`}
            placeholder="Tipo de cadastro"
            selectedValue={values.tipo}
            onValueChange={(itemValue, itemIndex) =>
              setFieldValue("tipo", itemValue)
            }
          >
            <Picker.Item label="Doutor" value="Doutor" />
            <Picker.Item label="Paciente" value="Paciente" />
          </Picker>

          <ThemedText style={tw`mt-5 text-[#888888] mx-[1.25%]`}>
            CRM Doutor
          </ThemedText>

          <ThemedTextInputField
            _mask={false}
            value={values.crm}
            id="crm"
            name="crm"
            onChangeText={handleChange("crm")}
            style={tw`w-[97.5%] mx-auto h-14 border p-2.5 mt-1 border-gray-200 rounded-xl bg-[#fafafa]`}
            placeholder="123456..."
          />

          <ThemedText style={tw`mt-5 text-[#888888] mx-[1.25%]`}>
            CPF
          </ThemedText>
          <View>
            <ThemedTextInputField
              name="cpf"
              _mask={true}
              type="cpf"
              id="cpf"
              value={values.cpf}
              onChangeText={handleChange("cpf")}
              style={tw`w-[97.5%] mx-auto h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa]`}
              placeholder="123.456.789-10"
            />
          </View>
        </SafeAreaView>
        <View style={tw`flex-row mt-auto w-[75%] mx-auto justify-center`}>
          <CustomButton
            style={tw`font- justify-center rounded-xl mt-7 h-12 bg-[#4894FE] w-full mr-1`}
            title="Cadastrar!"
            onPress={handleSubmit}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
};
export default PrimeiroPasso;

import CustomButton from "@/components/CustomButtton";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { ThemedView } from "@/components/ThemedView";
import { useCriarPerguntaMutation, useMeQuery } from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import { PerguntaInput } from "@/utils/tipos";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { FieldArray, Formik } from "formik";
import { Image, ScrollView, View } from "native-base";
import React from "react";
import { Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const initialValues: PerguntaInput = {
  pergunta: "",
  tipo: "resposta livre",
  topico: "Geral",
  opcoes_respostas: [],
  perguntaAtiva: true,
};

interface CadastrarPerguntasProps {
  navigation: any;
}
const CadastrarPerguntas: React.FC<CadastrarPerguntasProps> = ({
  navigation,
}) => {
  const { data: meData, loading: meFetching } = useMeQuery({
    skip: isServer(),
  });
  const [criarPerguntas] = useCriarPerguntaMutation();

  return (
    <>
      <ScrollView
        style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 `}
        contentContainerStyle={tw`flex-grow-1`}
      >
        <ThemedView
          style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center `}
        >
          <>
            {meFetching ? (
              <ThemedText
                type="subtitle"
                style={tw`text-black ml-7 mr-auto text-2xl`}
              >
                Loading
              </ThemedText>
            ) : !meData?.me ? (
              <ThemedText
                type="subtitle"
                style={tw`text-black ml-7 mr-auto text-2xl`}
              >
                No User
              </ThemedText>
            ) : (
              <ThemedText
                type="subtitle"
                style={tw`text-gray-400 ml-7 mr-auto text-xl`}
              >
                {meData.me.username.charAt(0).toUpperCase() +
                  meData.me.username.slice(1).toLowerCase() +
                  ""}
              </ThemedText>
            )}
          </>

          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mr-7 w-[56px] h-[56px]`}
            alt="App Icon"
          />
        </ThemedView>
        <Formik<PerguntaInput>
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (values.tipo === "resposta livre") {
              values.opcoes_respostas = [];
            }
            const response = await criarPerguntas({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: "perguntas" });
              },
            });
            if (response.errors || !response.data?.criarPergunta.id) {
              console.log(response.errors);
            } else if (response.data?.criarPergunta) {
              navigation.navigate("Perguntas");
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue, handleChange }) => (
            <SafeAreaView style={tw`flex justify-center w-[85%] mx-auto `}>
              <ThemedText
                style={[
                  tw` text-black text-4 `,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Pergunta
              </ThemedText>
              <KeyboardWrapper>
                <ThemedTextInputField
                  style={[
                    tw`w-full  h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                    { fontFamily: "PoppinsRegular" },
                  ]}
                  name="pergunta"
                  _mask={false}
                  placeholder="Insira aqui sua pergunta"
                />
              </KeyboardWrapper>
              <ThemedText
                style={[
                  tw` text-black text-4 mt-4`,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Tipo
              </ThemedText>
              <Picker
                itemStyle={tw` h-20 text-base web:bg-[#fafafa]`}
                id="tipo"
                style={tw`web:p-2 text-base w-full border-gray-400 web:mt-4 ios:h-20 web:h-14 rounded-xl web:bg-[#fafafa]`}
                selectedValue={values.tipo}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue("tipo", itemValue)
                }
              >
                <Picker.Item
                  label="Multípla-escolha"
                  value="múltipla escolha"
                />
                <Picker.Item label="Escolha Única" value="escolha única" />
                <Picker.Item label="Resposta Livre" value="resposta livre" />
              </Picker>

              <ThemedText
                style={[
                  tw` text-black text-4 `,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Topico
              </ThemedText>
              <Picker
                itemStyle={tw` h-20 text-base web:bg-[#fafafa]`}
                id="topico"
                style={tw`web:p-2 text-base w-full border-gray-400 web:mt-4 ios:h-20 web:h-14 rounded-xl web:bg-[#fafafa]`}
                selectedValue={values.topico}
                onValueChange={(itemValue) =>
                  setFieldValue("topico", itemValue)
                }
              >
                <Picker.Item label="Geral" value="Geral" />
                <Picker.Item label="Ansiedade Generalizada" value="Ansiedade" />
                <Picker.Item
                  label="Transtorno Depressivo Maior"
                  value="Transtorno Depressivo Maior"
                />
                <Picker.Item
                  label="Transtorno de Estresse Pós-Traumático (TEPT)"
                  value="Transtorno de Estresse Pós-Traumático (TEPT)"
                />
                <Picker.Item
                  label="Transtorno Obsessivo-Compulsivo (TOC)"
                  value="Transtorno Obsessivo-Compulsivo (TOC)"
                />
                <Picker.Item
                  label="Transtorno de Déficit de Atenção/Hiperatividade (TDAH)"
                  value="Transtorno de Déficit de Atenção/Hiperatividade (TDAH)"
                />
                <Picker.Item label="Fobia Social" value="Fobia Social" />
                <Picker.Item
                  label="Transtornos de Alimentação"
                  value="Transtornos de Alimentação"
                />
                <Picker.Item
                  label="Transtorno Bipolar"
                  value="Transtorno Bipolar"
                />
                <Picker.Item
                  label="Transtorno de Personalidade Limite (TPL)"
                  value="Transtorno de Personalidade Limite (TPL)"
                />
                <Picker.Item label="Esquizofrenia" value="Esquizofrenia" />

                <Picker.Item label="Outros" value="Outros" />
              </Picker>
              <View style={tw`mt-2 web:mt-4 flex-row items-center `}>
                <ThemedText
                  style={[
                    tw` text-black text-4 mt-2 web:mt-4 mr-2`,
                    { fontFamily: "PoppinsRegular" },
                  ]}
                >
                  Pergunta ativa?
                </ThemedText>
                <Pressable
                  role="checkbox"
                  aria-checked={values.perguntaAtiva}
                  style={[
                    tw`flex-row mt-auto h-8 w-8 justify-center items-center rounded-lg ${
                      values.perguntaAtiva
                        ? "bg-[#4894FE]"
                        : " border-gray-200 border bg-gray-100"
                    }`,
                    { fontFamily: "PoppinsRegular" },
                  ]}
                  id="perguntaAtiva"
                  onPress={() => {
                    setFieldValue("perguntaAtiva", !values.perguntaAtiva);
                    handleChange("perguntaAtiva");
                  }}
                >
                  {values.perguntaAtiva && (
                    <Ionicons name="checkmark" size={24} color="white" />
                  )}
                </Pressable>
              </View>
              <ThemedText
                style={[
                  tw` text-black text-4 mt-6 web:mt-4 mr-2 ${
                    values.tipo === "resposta livre" ? "hidden" : ""
                  }`,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Opcoes Resposta
              </ThemedText>
              <FieldArray name="opcoes_respostas">
                {({ push, remove }) => (
                  <View
                    style={tw`${
                      values.tipo === "resposta livre" ? "hidden" : ""
                    }`}
                  >
                    {values.opcoes_respostas?.map((option, index) => (
                      <View
                        style={tw`flex-row items-center justify-center`}
                        key={index}
                      >
                        <KeyboardWrapper>
                          <TextInput
                            style={[
                              tw`w-[90%] web:w-[97.5%] h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                              { fontFamily: "PoppinsRegular" },
                            ]}
                            placeholder={`Opcão de resposta ${index + 1}`}
                            onChangeText={(text) =>
                              setFieldValue(
                                `opcoes_respostas.${index}.text`,
                                text
                              )
                            }
                            value={option.text}
                          />
                        </KeyboardWrapper>
                        <Pressable
                          style={tw`flex-row ml-1 h-8 w-8 justify-center items-center rounded-lg bg-[#4894FE]`}
                          onPress={() => remove(index)}
                        >
                          <Ionicons name="remove" size={24} color={"white"} />
                        </Pressable>
                      </View>
                    ))}
                    <Pressable
                      style={tw`flex-row mt-2 h-8 w-8 justify-center items-center rounded-lg bg-[#4894FE] disabled:bg-neutral-600`}
                      onPress={() => push({ text: "" })}
                      disabled={values.tipo === "resposta livre"}
                    >
                      <Ionicons name="add" size={24} color={"white"} />
                    </Pressable>
                  </View>
                )}
              </FieldArray>
              <View
                style={tw`mb-6 flex-row mt-auto w-[75%] mx-auto justify-center`}
              >
                <CustomButton
                  style={tw` justify-center rounded-xl mt-7 h-12 bg-[#4894FE] w-full mr-1`}
                  title="Adicionar"
                  onPress={handleSubmit}
                />
              </View>
            </SafeAreaView>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default CadastrarPerguntas;

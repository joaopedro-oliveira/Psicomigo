import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";
import {
  useAtualizarPerguntasMutation,
  useMeQuery,
  usePerguntaQuery,
} from "@/generated/graphql";
import { Image } from "native-base";
import CustomButton from "@/components/CustomButtton";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Formik, FieldArray } from "formik";
import { gql } from "urql";
import { useEffect, useState } from "react";
import { PerguntaInput } from "@/utils/tipos";

const Pergunta = ({}) => {
  const { id } = useGlobalSearchParams();
  const [_id, setId] = useState(-1);

  useEffect(() => {
    // console.log(id);
    if (id) {
      const id_ = typeof id === "string" ? parseInt(id) : -1;
      if (id_) {
        setId(id_);
      }
    }
  }, [id]);

  // console.log(_id);
  // if (id) {
  //   id_ = typeof id === "string" ? parseInt(id) : -1;
  // }

  const { data: meData, loading: meFetching } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });
  const { data, loading: fetching } = usePerguntaQuery({
    variables: { perguntaId: _id },
    notifyOnNetworkStatusChange: true,
  });

  const [atualizarPergunta] = useAtualizarPerguntasMutation();

  if (fetching) return null;
  if (!data)
    return (
      <ThemedText style={tw`text-black`} type="title">
        {" "}
        Algo deu errado
      </ThemedText>
    );

  if (!data.pergunta)
    return (
      <ThemedText style={tw`text-black`} type="title">
        {" "}
        Pergunta não encontrada
      </ThemedText>
    );

  let initialData: PerguntaInput = {
    pergunta: data.pergunta?.pergunta,
    tipo: data.pergunta.tipo,
    topico: data.pergunta.topico,
    opcoes_respostas: data.pergunta.opcoes_respostas?.map((opcao) => ({
      id: opcao.id,
      text: opcao.text,
    })),
    perguntaAtiva: data.pergunta.perguntaAtiva,
  };

  return (
    <KeyboardWrapper>
      <ScrollView
        style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto`}
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
          initialValues={initialData}
          onSubmit={async (values, { setErrors }) => {
            // console.log(values);
            const response = await atualizarPergunta({
              variables: { input: values, id: data.pergunta!.id },
              update: (cache) => {
                const data = cache.readFragment<PerguntaInput>({
                  id: "Pergunta:" + _id,
                  fragment: gql`
                    fragment _ on Pergunta {
                      pergunta
                      tipo
                      topico
                      opcoes_respostas {
                        id
                        texto
                      }
                    }
                  `,
                });
                if (data) {
                  cache.writeFragment<PerguntaInput>({
                    id: "Pergunta:" + _id,
                    fragment: gql`
                      fragment _ on Pergunta {
                        pergunta
                        tipo
                        topico
                        opcoes_respostas {
                          id
                          texto
                        }
                      }
                    `,
                    data: { ...data, ...values },
                  });
                }
              },
            });

            if (response.errors || !response.data?.atualizarPergunta) {
              // setErrors(response.errors)
              console.log(response.errors);
            } else if (response.data?.atualizarPergunta) {
              // console.log(response.data?.criarPergunta);
              // navigation.navigate("Perguntas");
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue, handleChange }) => (
            <SafeAreaView
              style={tw`flex justify-center w-[85%] web:w-[40%] mx-auto `}
            >
              <ThemedText
                style={[
                  tw` text-black text-4 `,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Pergunta
              </ThemedText>
              <ThemedTextInputField
                style={[
                  tw`w-full  h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                  { fontFamily: "PoppinsRegular" },
                ]}
                name="pergunta"
                _mask={false}
                placeholder="Insira aqui sua pergunta"
              />
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
                onValueChange={(itemValue, itemIndex) =>
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
                  // type={'checkbox'}
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
                  // ={values.perguntaAtiva}

                  onPress={() => {
                    setFieldValue("perguntaAtiva", !values.perguntaAtiva);
                    handleChange("perguntaAtiva");
                  }}
                  // placeholder="Insira aqui sua pergunta"
                >
                  {values.perguntaAtiva && (
                    <Ionicons name="checkmark" size={24} color="white" />
                  )}
                </Pressable>
              </View>
              <ThemedText
                style={[
                  tw` text-black text-4 mt-6 web:mt-4 mr-2`,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Opcoes Resposta
              </ThemedText>
              <FieldArray name="opcoes_respostas">
                {({ push, remove }) => (
                  <View style={tw``}>
                    {values.opcoes_respostas?.map((option, index) => (
                      <View
                        style={tw`flex-row items-center justify-center`}
                        key={index}
                      >
                        <TextInput
                          style={[
                            tw`w-[90%] web:w-[97.5%] h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                            { fontFamily: "PoppinsRegular" },
                          ]}
                          placeholder={`Opcão de resposta ${index + 1}`}
                          id=""
                          // defaultValue={option.texto}
                          onChangeText={(text) =>
                            setFieldValue(
                              `opcoes_respostas[${index}].text`,
                              text
                            )
                          }
                          value={option.text ?? ""}
                        />
                        <Pressable
                          style={tw`flex-row ml-1 h-8 w-8 justify-center items-center rounded-lg bg-[#4894FE]`}
                          onPress={() => remove(index)}
                        >
                          <Ionicons name="remove" size={24} color={"white"} />
                        </Pressable>
                      </View>
                    ))}
                    <Pressable
                      style={tw`flex-row mt-2 h-8 w-8 justify-center items-center rounded-lg bg-[#4894FE]`}
                      onPress={() => push({ text: "" })}
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
                  title="Atualizar"
                  onPress={handleSubmit}
                />
              </View>
            </SafeAreaView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardWrapper>
  );
};

export default Pergunta;

// import { useLocalSearchParams } from "expo-router";
// import { View, Text, StyleSheet } from "react-native";

// export default function DetailsScreen() {
//   const { id } = useLocalSearchParams();

//   console.log("entrei aqui");
//   return (
// <View style={styles.container}>
//   <Text>Details of user {id} </Text>
// </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

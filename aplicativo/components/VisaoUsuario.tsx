import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import CustomButton from "./CustomButtton";
import { KeyboardWrapper } from "./KeyboardWrapper";
import Mensagem from "./Mensagem";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  MeQuery,
  Resposta,
  useMedicoSuspenseQuery,
  useQuestionarioSuspenseQuery,
  useResponderPerguntaMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { ScrollView as RNScrollView } from "react-native";
import tw, { style } from "twrnc";
import QRCodeComponent from "./QRCode";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface VisaoUsuarioProps {
  user: MeQuery;
}

export const VisaoUsuario: React.FC<VisaoUsuarioProps> = ({ user }) => {
  const [questions, setQuestions] = useState<Resposta[]>([]);
  const { data: questionarioData } = useQuestionarioSuspenseQuery();
  const [responderPergunta] = useResponderPerguntaMutation();
  const apollo = useApolloClient();
  const scrollViewRef = useRef<RNScrollView | null>(null);
  const { data: medico } = useMedicoSuspenseQuery();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(user.me?.userKey!);
  };

  useEffect(() => {
    if (questionarioData?.questionario) {
      if (!questionarioData.questionario.respostas) return undefined;

      const perguntasRespondidas =
        questionarioData.questionario.respostas.filter(
          (resposta) => resposta.respondido
        );

      const primeiraNaoRespondida =
        questionarioData.questionario.respostas.find(
          (resposta) => !resposta.respondido
        );

      const perguntasCombinadas = primeiraNaoRespondida
        ? [...perguntasRespondidas, primeiraNaoRespondida]
        : perguntasRespondidas;

      setQuestions(perguntasCombinadas as Resposta[]);
    }
  }, [questionarioData]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [questions]);

  return (
    <ThemedView style={tw`bg-white`}>
      {!medico?.medico ? (
        <ThemedView style={tw`bg-white mt-12 text-black`}>
          <ThemedText
            style={[
              tw`text-black text-center text-lg`,
              { fontFamily: "PoppinsRegular" },
            ]}
          >
            Você não possui um médico cadastrado!
          </ThemedText>
          <ThemedText
            style={[
              tw`text-black text-center text-lg`,
              { fontFamily: "PoppinsRegular" },
            ]}
          >
            Para utilizar o aplicativo, você precisa ter um médico cadastrado,
            envie a chave cadastrada para o seu médico ou mostre o QRCode abaixo
            para ele!
          </ThemedText>
          <QRCodeComponent userKey={user.me?.userKey!}></QRCodeComponent>
          <SafeAreaView style={tw` flex-row bg-transparent p-2 web:mt-6`}>
            <TextInput
              style={tw`flex-1 h-12 border p-2.5 mr-2 border-gray-400 rounded-xl bg-[#fafafa]`}
              value={user.me?.userKey!}
            ></TextInput>
            <TouchableOpacity
              style={tw`bg-[#4894FE] h-12 w-12 p-2.5 rounded-xl`}
              onPress={copyToClipboard}
            >
              <Ionicons name="copy" size={24} color={"white"} />
            </TouchableOpacity>
          </SafeAreaView>
        </ThemedView>
      ) : questions.length > 0 ? (
        <ScrollView
          style={tw`flex-grow mb-[25%] w-full bg-white p-2 mt-2 web:m-auto z-1 `}
          contentContainerStyle={tw`flex-grow-1`}
          ref={scrollViewRef}
        >
          <Formik
            initialValues={questions}
            enableReinitialize
            onSubmit={async (values) => {
              for (const value of values) {
                if (value.respondido) {
                  0;
                  continue;
                }
                let op;
                if (value.opcao_resposta_escolhida) {
                  op =
                    value.opcao_resposta_escolhida.map((opcao) => ({
                      id: opcao.id,
                      text: opcao.text,
                    })) || [];
                }
                const response = await responderPergunta({
                  variables: {
                    input: {
                      respostaId: value.id,
                      opcaoResposta: op,
                      respostaLivre: value.resposta_livre,
                    },
                  },
                  // update: (cache) => {
                  //   cache.evict({ fieldName: "questionario" });
                  // },
                });

                if (response.errors || !response.data?.responderPergunta) {
                  console.log(response.errors);
                } else {
                  console.log("Response:", response.data.responderPergunta);
                }
              }

              apollo.cache.evict({ fieldName: "questionario" });
            }}
          >
            {({ values, setFieldValue, handleSubmit, handleBlur }) => (
              <>
                {
                  values.map((conjunto, index) =>
                    conjunto.respondido ? (
                      <ThemedView
                        key={`${conjunto.id}-answered`}
                        style={tw`my-1 bg-white`}
                      >
                        <Mensagem
                          key={`${conjunto.pergunta_id}-question`}
                          keyNumber={conjunto.pergunta_id}
                          content={conjunto.pergunta}
                          isQuestion={true}
                        />
                        <Mensagem
                          key={`${conjunto.id}-answer`}
                          keyNumber={conjunto.id}
                          content={
                            conjunto.tipo === "resposta livre"
                              ? conjunto.resposta_livre || ""
                              : conjunto.opcao_resposta_escolhida
                                  ?.map((op) => op.text)
                                  .join(", ") || ""
                          }
                          isQuestion={false}
                        />
                      </ThemedView>
                    ) : (
                      <ThemedView
                        key={`${conjunto.id}-input`}
                        style={tw`my-1 mb-[90%] bg-white`}
                      >
                        <ThemedView style={tw`mb-2 bg-white`}>
                          <Mensagem
                            key={`${conjunto.pergunta_id}-question`}
                            keyNumber={conjunto.pergunta_id}
                            content={conjunto.pergunta}
                            isQuestion={true}
                          />
                        </ThemedView>

                        {conjunto.tipo !== "resposta livre" ? (
                          <ThemedView
                            key={`${conjunto.pergunta_id}-options`}
                            style={tw`flex-row flex-wrap`}
                          >
                            {conjunto.opcao_resposta &&
                              conjunto.opcao_resposta.map((answer) => (
                                <CustomButton
                                  key={answer.id}
                                  style={tw`bg-blue-400 p-2 m-1 rounded`}
                                  onPress={() => {
                                    setFieldValue(
                                      `${index}.opcao_resposta_escolhida`,
                                      [{ id: answer.id, text: answer.text }]
                                    );
                                    handleSubmit();
                                  }}
                                  title={answer.text!}
                                />
                              ))}
                          </ThemedView>
                        ) : (
                          <KeyboardWrapper
                            key={`${conjunto.id}-keyboardwrapper`}
                          >
                            <TextInput
                              key={`${conjunto.id}-resposta_livre`}
                              id={`${conjunto.id}-resposta_livre`}
                              style={[
                                tw`w-full h-14 border p-2.5  mt-1 border-gray-200 rounded-xl bg-[#fafafa] focus:border-neutral-400`,
                                { fontFamily: "PoppinsRegular" },
                              ]}
                              placeholder="Digite sua resposta"
                              value={conjunto.resposta_livre || ""}
                              onChangeText={(text) =>
                                setFieldValue(`${index}.resposta_livre`, text)
                              }
                              onSubmitEditing={() => handleSubmit()}
                            />
                          </KeyboardWrapper>
                        )}
                      </ThemedView>
                    )
                  )
                  // )
                }
                <View
                  style={tw`${
                    questionarioData?.questionario?.respondido ? "mb-10" : ""
                  }`}
                ></View>
              </>
            )}
          </Formik>
        </ScrollView>
      ) : (
        <ThemedText style={tw`mt-5 text-center text-gray-500`}>
          Sem questionario
        </ThemedText>
      )}
    </ThemedView>
  );
};

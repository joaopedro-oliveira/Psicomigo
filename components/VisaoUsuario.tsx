import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import CustomButton from "./CustomButtton";
import { KeyboardWrapper } from "./KeyboardWrapper";
import Mensagem from "./Mensagem";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  Resposta,
  useQuestionarioQuery,
  useResponderPerguntaMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { ScrollView as RNScrollView } from "react-native";
import tw from "twrnc";
interface VisaoUsuarioProps {}

export const VisaoUsuario: React.FC<VisaoUsuarioProps> = ({}) => {
  const [questions, setQuestions] = useState<Resposta[]>([]);
  const { data: questionarioData, loading } = useQuestionarioQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [responderPergunta] = useResponderPerguntaMutation();
  const apollo = useApolloClient();
  const scrollViewRef = useRef<RNScrollView | null>(null);

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
    <>
      {questions.length > 0 ? (
        <ScrollView
          style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 mt-2 web:m-auto z-1`}
          contentContainerStyle={tw`flex-grow-1`}
          // onContentSizeChange={onContentSizeChange}
          ref={scrollViewRef}
        >
          <Formik
            initialValues={questions}
            enableReinitialize
            onSubmit={async (values) => {
              for (const value of values) {
                if (value.respondido) {
                  // console.log("Answered Value:", value);
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
                console.log(op);

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
            {({ values, setFieldValue, handleSubmit }) => (
              <KeyboardWrapper>
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
                      // index === perguntaIndex && (
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
                          <TextInput
                            key={`${conjunto.id}-resposta_livre`}
                            style={tw`border p-2 mt-2 rounded bg-white`}
                            placeholder="Type your answer..."
                            value={conjunto.resposta_livre || ""}
                            onChangeText={(text) =>
                              setFieldValue(`${index}.resposta_livre`, text)
                            }
                            onSubmitEditing={() => handleSubmit()}
                          />
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
              </KeyboardWrapper>
            )}
          </Formik>
        </ScrollView>
      ) : (
        <ThemedText style={tw`mt-5 text-center text-gray-500`}>
          Loading questions...
        </ThemedText>
      )}
    </>
  );
};

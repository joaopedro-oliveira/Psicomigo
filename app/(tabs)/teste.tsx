import { useState, useEffect } from "react";
import { Image, ScrollView, TextInput } from "react-native";
import { Formik } from "formik";
// import { ThemedText, ThemedView, CustomButton, Mensagem } from "@/components";
import tw from "twrnc";
import {
  useQuestionarioQuery,
  useMeQuery,
  useLogoutMutation,
  useCriarPerguntaMutation,
  Resposta,
  RespostaPadraoFragment,
  useResponderPerguntaMutation,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import CustomButton from "@/components/CustomButtton";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";
import Mensagem from "@/components/Mensagem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// type OpcoesResposta = {
//   __typename?: "OpcoesResposta";
//   id: number;
//   text: string;
// };

// type Pergunta = {
//   __typename?: "Pergunta";
//   id: number;
//   pergunta: string;
//   tipo: string;
//   topico: string;
//   opcoes_respostas?: OpcoesResposta[] | null;
// };

// type PerguntaResposta = {
//   questionarioId: number;
//   respondido: boolean | null | undefined;
//   pergunta: {
//     __typename?: "Pergunta";
//     id: number;
//     pergunta: string;
//     tipo: string;
//     topico: string;
//     opcoes_respostas?:
//       | Array<{ __typename?: "OpcoesResposta"; id: number; text: string }>
//       | null
//       | undefined;
//   };
//   resposta?:
//     | {
//         __typename?: "Resposta";
//         id: number;
//         pergunta: string;
//         pergunta_id: number;
//         opcao_resposta_id: Array<number>;
//         opcao_resposta_texto: Array<string>;
//         resposta_livre: string;
//       }
//     | null
//     | undefined;
//   responder: boolean;
// };

const Teste = () => {
  const { data: meData, loading: fetching } = useMeQuery({ skip: isServer() });
  const [criarQuestionario] = useCriarPerguntaMutation();
  const [questions, setQuestions] = useState<Resposta[]>([]);
  const [perguntaIndex, setIndex] = useState(0);
  const { data: questionarioData, loading } = useQuestionarioQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [responderPergunta] = useResponderPerguntaMutation();

  useEffect(() => {
    if (questionarioData?.questionario) {
      questionarioData.questionario.respostas &&
        setQuestions(questionarioData.questionario.respostas as Resposta[]);
      console.log(questionarioData.questionario.respostas);
    }
  }, [questionarioData]);

  return (
    <KeyboardWrapper>
      <ScrollView
        style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto`}
        contentContainerStyle={tw`flex-grow-1`}
      >
        <CustomButton
          title="Criar Q"
          onPress={criarQuestionario}
          style={tw`absolute right-0 bottom-0 mb-4 mr-4`}
        />
        <CustomButton
          title="Logout"
          onPress={() => {
            console.log("Logout");
          }}
          style={tw`absolute left-0 bottom-0 mb-4 ml-4`}
        />

        <ThemedView
          style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center`}
        >
          {fetching ? (
            <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
              Loading
            </ThemedText>
          ) : meData?.me ? (
            <ThemedText type="subtitle" style={tw`text-black ml-7 text-xl`}>
              Olá, {meData.me.username}!
            </ThemedText>
          ) : (
            <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
              No User
            </ThemedText>
          )}
          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mr-7 w-[56px] h-[56px]`}
          />
        </ThemedView>
        {questions.length > 0 ? (
          <Formik<Resposta[]>
            initialValues={questions}
            enableReinitialize
            onSubmit={async (values) => {
              console.log(values);
              for (const value of values) {
                if (value.respondido) {
                  continue;
                }

                console.log(value);

                const op = await Promise.all(
                  value.opcao_resposta?.map(async (opcao) => {
                    return {
                      id: opcao.id,
                      text: opcao.text,
                    };
                  }) || []
                );

                const response = await responderPergunta({
                  variables: {
                    input: {
                      respostaId: value.id,
                      opcaoResposta: op,
                      respostaLivre: value.resposta_livre,
                    },
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "questionario" });
                  },
                });

                if (response.errors || !response.data?.responderPergunta) {
                  console.log(response.errors);
                } else if (response.data?.responderPergunta) {
                  console.log(response.data?.responderPergunta);

                  // navigation.navigate("Perguntas");
                }
              }

              // setIndex((prev) => prev + 1);
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <>
                {values.map((conjunto, index) =>
                  conjunto.respondido ? (
                    <ThemedView
                      key={`${conjunto.id}-answered`}
                      style={tw`mt-9 bg-white`}
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
                            ? conjunto?.resposta_livre || ""
                            : conjunto.opcao_resposta_escolhida
                            ? conjunto.opcao_resposta_escolhida
                                .map((op) => op.text)
                                .join(", ")
                            : ""
                        }
                        isQuestion={false}
                      />
                    </ThemedView>
                  ) : (
                    index === perguntaIndex && (
                      <ThemedView
                        key={`${conjunto.id}-input`}
                        style={tw`mt-9 bg-white`}
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
                            <>{console.log("entrou aqui")}</>

                            {conjunto.opcao_resposta &&
                              conjunto.opcao_resposta.map((answer) => (
                                <CustomButton
                                  key={answer.id}
                                  style={tw`bg-blue-400 p-2 m-1 rounded`}
                                  onPress={() => {
                                    setFieldValue(
                                      `questions.${index}.opcao_resposta`,
                                      { id: answer.id, text: answer.text }
                                    ),
                                      handleSubmit();
                                  }}
                                  title={answer.text!}
                                />
                              ))}
                          </ThemedView>
                        ) : (
                          <TextInput
                            key={`${conjunto.id}-textinput`}
                            style={tw`border p-2 mt-2 rounded`}
                            placeholder="Type your answer..."
                            value={conjunto.resposta_livre || ""}
                            onChangeText={(text) =>
                              setFieldValue(
                                `questions.${index}.resposta_livre`,
                                text
                              )
                            }
                            onSubmitEditing={() => handleSubmit()}
                          />
                        )}
                      </ThemedView>
                    )
                  )
                )}
              </>
            )}
          </Formik>
        ) : (
          <ThemedText style={tw`mt-5 text-center text-gray-500`}>
            Loading questions...
          </ThemedText>
        )}
      </ScrollView>
    </KeyboardWrapper>
  );
};

export default Teste;

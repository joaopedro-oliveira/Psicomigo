import { useState, useEffect } from "react";
import { Image, ScrollView, TextInput } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import {
  useQuestionarioQuery,
  useMeQuery,
  useCriarPerguntaMutation,
  Resposta,
  useResponderPerguntaMutation,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import CustomButton from "@/components/CustomButtton";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";
import Mensagem from "@/components/Mensagem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useApolloClient } from "@apollo/client";

const Teste = () => {
  const { data: meData, loading: fetching } = useMeQuery({ skip: isServer() });
  const [criarQuestionario] = useCriarPerguntaMutation();
  const [questions, setQuestions] = useState<Resposta[]>([]);
  const [perguntaIndex, setIndex] = useState(0);
  const { data: questionarioData, loading } = useQuestionarioQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [responderPergunta] = useResponderPerguntaMutation();
  const apollo = useApolloClient();
  useEffect(() => {
    if (questionarioData?.questionario) {
      setQuestions(questionarioData.questionario.respostas as Resposta[]);
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
          <Formik
            initialValues={questions}
            enableReinitialize
            onSubmit={async (values) => {
              // console.log("Values:", JSON.stringify(values, null, 2));
              for (const value of values) {
                if (value.respondido) {
                  console.log("Answered Value:", value);
                  continue;
                }

                const op =
                  value.opcao_resposta_escolhida?.map((opcao) => ({
                    id: opcao.id,
                    text: opcao.text,
                  })) || [];

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
                            ? conjunto.resposta_livre || ""
                            : conjunto.opcao_resposta_escolhida
                                ?.map((op) => op.text)
                                .join(", ") || ""
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

import { Image, StyleSheet, TextInput } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  PerguntaInput,
  Questionario,
  useCriarQuestionarioMutation,
  useEnviaQuestionariosSubscription,
  useLogoutMutation,
  useMeQuery,
  useQuestionarioQuery,
} from "@/generated/graphql";
import { useIsAuth } from "@/utils/useIsAuth";
import { isServer } from "@/utils/isServer";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { Box, ScrollView, TextField } from "native-base";
import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButtton";
import Mensagem from "@/components/Mensagem";
import { useRouter, useSegments } from "expo-router";
import { gql, useApolloClient } from "@apollo/client";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";
import { Formik } from "formik";

type OpcoesResposta = {
  __typename?: "OpcoesResposta";
  id: number;
  text: string;
};

type Pergunta = {
  __typename?: "Pergunta";
  id: number;
  pergunta: string;
  tipo: string;
  topico: string;
  opcoes_respostas?: OpcoesResposta[] | null;
};

type PerguntaResposta = {
  respondido: boolean | null | undefined;
  pergunta: {
    __typename?: "Pergunta";
    id: number;
    pergunta: string;
    tipo: string;
    topico: string;
    opcoes_respostas?:
      | Array<{ __typename?: "OpcoesResposta"; id: number; text: string }>
      | null
      | undefined;
  };
  resposta?:
    | {
        __typename?: "Resposta";
        id: number;
        pergunta: string;
        pergunta_id: number;
        opcao_resposta_id: Array<number>;
        opcao_resposta_texto: Array<string>;
        resposta_livre: string;
      }
    | null
    | undefined;
  responder: boolean;
};

const Teste = () => {
  useIsAuth();
  const [logout] = useLogoutMutation();
  const { data: meData, loading: fetching } = useMeQuery({
    skip: isServer(),
  });

  const { data: questionarioData, loading } = useQuestionarioQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [criarQuestionario] = useCriarQuestionarioMutation();
  const [questions, setQuestions] = useState<PerguntaResposta[]>([]);
  const apollo = useApolloClient();
  const [perguntaIndex, setIndex] = useState(0); // Tracks the current question index
  const [DemonstrarPerguntas, setDemonstrarPerguntas] = useState<
    PerguntaResposta[]
  >([]); // Set type to Pergunta[]

  let PerguntasRespostas: PerguntaResposta[];

  if (!loading && !questionarioData && questionarioData!.questionario) {
    return (
      <ThemedText type="subtitle" style={tw`text-black ml-7 mr-auto text-2xl`}>
        deu erro
      </ThemedText>
    );
  }

  // console.log(questionarioData);
  const data: PerguntaResposta[] =
    questionarioData!.questionario!.perguntas.map((pergunta, index) => {
      const answer = questionarioData!.questionario!.respostas?.find(
        (respostas) => respostas.pergunta_id === pergunta.id
      );

      if (answer) {
        setIndex(0);
        {
          console.log("enmtrou aqui");
        }

        return {
          respondido: true,
          pergunta: pergunta,
          resposta: answer,
          responder: false,
        };
      }
      // perguntaIndex === 0 ? setIndex(pergunta.id) : null;
      return {
        respondido: false,
        pergunta: pergunta,
        responder: true,
      };
    });
  setQuestions(data); // Store question

  //   PerguntasRespostas

  let initialData: Questionario;

  //   type PerguntaResposta = {
  //     pergunta: Pergunta;
  //     answer: string;
  //   };

  initialData = questionarioData?.questionario as Questionario;
  console.log(questions);
  console.log(perguntaIndex);

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
          onPress={async () => {
            // await apollo.resetStore();
            console.log("working?");
            // router.replace({ pathname: `./${segments.join("/")}` });
            // router.replace({ pathname: `/login` });
          }}
          style={tw`absolute left-0 bottom-0 mb-4 ml-4`}
        />

        <ThemedView
          style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center `}
        >
          <>
            {fetching ? (
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
                style={tw`text-black ml-7 mr-auto text-xl`}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={tw` text-lg text-gray-400`}
                >
                  {"Olá, \n"}
                </ThemedText>
                {meData.me.username.charAt(0).toUpperCase() +
                  meData.me.username.slice(1).toLowerCase() +
                  "!"}
              </ThemedText>
            )}
          </>

          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mr-7 w-[56px] h-[56px]`}
            alt="App Icon"
          />
        </ThemedView>
        <ThemedView style={tw`bg-white h-full w-full`}>
          <Formik<PerguntaResposta[]>
            initialValues={questions}
            onSubmit={async (values, { setErrors }) => {
              // // console.log(values);
              // const response = await atualizarPergunta({});
              // if (response.errors || !response.data?.atualizarPergunta) {
              //   // setErrors(response.errors)
              //   console.log(response.errors);
              // } else if (response.data?.atualizarPergunta) {
              //   // console.log(response.data?.criarPergunta);
              //   // navigation.navigate("Perguntas");
              // }
            }}
          >
            {({ handleSubmit, values, setFieldValue, handleChange }) => (
              <>
                {console.log(values)}

                {values.map((conjunto, index) =>
                  conjunto.respondido ? (
                    <ThemedView style={tw`mt-9 `}>
                      <Mensagem
                        content={conjunto.pergunta.pergunta}
                        keyNumber={conjunto.pergunta.id}
                        isQuestion={true}
                      />
                      <Mensagem
                        content={
                          conjunto.pergunta.tipo === "resposta livre"
                            ? conjunto.resposta!.resposta_livre
                            : conjunto.resposta!.opcao_resposta_texto.join(", ")
                        }
                        keyNumber={conjunto.resposta!.id}
                        isQuestion={false}
                      />
                    </ThemedView>
                  ) : (
                    <>
                      {index === perguntaIndex ? (
                        <>
                          {conjunto.pergunta.opcoes_respostas &&
                          conjunto.pergunta.opcoes_respostas.length > 0 ? (
                            <ThemedView
                              style={tw`bg-transparent flex flex-row flex-wrap`}
                            >
                              {conjunto.pergunta.opcoes_respostas.map(
                                (answer, idx) => (
                                  <CustomButton
                                    key={idx}
                                    style={tw`bg-blue-400 p-2 m-1 rounded`}
                                    onPress={() => handleSubmit()}
                                    title={answer.text}
                                  ></CustomButton>
                                )
                              )}
                            </ThemedView>
                          ) : (
                            <TextInput
                              style={tw`border p-2 mt-2 rounded bg-white`}
                              placeholder="Type your answer..."
                              value={values[index].resposta?.resposta_livre}
                              onChangeText={(text) => {
                                setFieldValue(
                                  `respostas.${index}.resposta_livre`,
                                  text
                                );
                              }}
                              autoFocus={true}
                              onSubmitEditing={() => handleSubmit()}
                            />
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )
                )}
              </>
            )}
          </Formik>
        </ThemedView>
        <ThemedView></ThemedView>
      </ScrollView>
    </KeyboardWrapper>
  );
};

export default Teste;

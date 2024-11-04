import { Image, StyleSheet, TextInput } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
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
import { useApolloClient } from "@apollo/client";
import { KeyboardWrapper } from "@/components/KeyboardWrapper";

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

const HomeScreen = () => {
  useIsAuth();
  const [logout] = useLogoutMutation();
  const { data: meData, loading: fetching } = useMeQuery({
    skip: isServer(),
  });
  const { data: questionarioData } = useQuestionarioQuery();
  const [index, setIndex] = useState(0); // Tracks the current question index
  const [response, setResponse] = useState(""); // Tracks user response
  const [displayResponde, setDisplayResposta] = useState(false);
  const [questions, setQuestions] = useState<Pergunta[]>([]); // Set type to Pergunta[]
  const [criarQuestionario] = useCriarQuestionarioMutation();
  const apollo = useApolloClient();
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    if (!fetching && questionarioData) {
      if (!questionarioData.questionario?.perguntas) return;
      // console.log(questionarioData);
      const perguntas = [...questionarioData.questionario.perguntas];
      setQuestions(perguntas); // Store question
    }
  }, [questionarioData]);

  const handleAnswer = (answer: any) => {
    console.log(`User answered: ${answer}`);

    setResponse(""); // Reset response
    if (!questions) return;
    if (index < questions.length - 1) {
      setIndex(index + 1); // Move to the next question
    } else {
      console.log("End of questionnaire");
    }
  };

  const currentQuestion = !questions ? null : questions[index];
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
            await apollo.resetStore();
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
        <ThemedView style={tw`bg-white w-full h-40%`}>
          {!currentQuestion ? null : (
            <>
              {/* <ThemedView style={tw`flex w-full bg-transparent`}>
              <ThemedView style={tw`ml-[6%] mt-[10%] max-w-[70%] border p-0`}>
                <ThemedView
                  style={tw`relative  min-w-[15%] text-xs max-w-xl px-2 py-2 m-0 rounded-2xl bg-white shadow-md border`}
                >
                  </ThemedView>
                  <ThemedText style={tw`block text-base text-black`}>
                    {currentQuestion?.pergunta}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView> */}

              {/* <ThemedView style={tw`flex-row items-end bg-transparent`}>
              <ThemedView
                style={[
                  tw`w-0 h-0 border-l-4 border-t-4 border-transparent bg-white`,
                  {
                    borderBottomWidth: 4,
                    borderBottomColor: "#f3f4f6", // Tail background color (light gray)
                    marginLeft: 2,
                    marginBottom: -1,
                  },
                ]}
              />

              <ThemedView
                style={tw`bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 max-w-xs`}
              >
                <ThemedText style={tw`text-black`}>
                  {currentQuestion?.pergunta}
                </ThemedText>
              </ThemedView>
            </ThemedView> */}
              <ThemedView style={tw`mt-9 bg-transparent`}>
                <Mensagem
                  content={currentQuestion?.pergunta}
                  keyNumber={currentQuestion?.id}
                  isQuestion={true}
                />
              </ThemedView>
              {/* <ThemedView>
              <ThemedText style={tw`text-lg font-bold mb-4`}>
                {currentQuestion?.pergunta}
              </ThemedText>
            </ThemedView> */}
              {currentQuestion?.opcoes_respostas &&
              currentQuestion.opcoes_respostas.length > 0 ? (
                <ThemedView style={tw`bg-transparent flex flex-row flex-wrap`}>
                  {currentQuestion.opcoes_respostas.map((answer, idx) => (
                    <CustomButton
                      key={idx}
                      style={tw`bg-blue-400 p-2 m-1 rounded`}
                      onPress={() => handleAnswer(answer)}
                      title={answer.text}
                    ></CustomButton>
                  ))}
                </ThemedView>
              ) : (
                <TextInput
                  style={tw`border p-2 mt-2 rounded bg-white`}
                  placeholder="Type your answer..."
                  value={response}
                  onChangeText={setResponse}
                  autoFocus={true}
                  onSubmitEditing={() => handleAnswer(response)}
                />
              )}

              {index >= questions.length - 1 ? (
                <CustomButton
                  title="Enviar respostas"
                  onPress={() => handleAnswer(response)}
                />
              ) : null}
            </>
          )}
        </ThemedView>
        <ThemedView></ThemedView>
      </ScrollView>
    </KeyboardWrapper>
  );
};

export default HomeScreen;

import { Image, StyleSheet, TextInput } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useEnviaQuestionariosSubscription,
  useLogoutMutation,
  useMeQuery,
  useQuestionarioQuery,
} from "@/generated/graphql";
import { useIsAuth } from "@/utils/useIsAuth";
import { isServer } from "@/utils/isServer";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { Box, TextField } from "native-base";
import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButtton";
import Mensagem from "@/components/Mensagem";

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
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data: meData, fetching }] = useMeQuery({
    pause: isServer(),
  });

  // const [{ data: questionarioData }] = useEnviaQuestionariosSubscription();

  const [{ data: questionarioData }] = useQuestionarioQuery();
  const [index, setIndex] = useState(0); // Tracks the current question index
  const [response, setResponse] = useState(""); // Tracks user response
  const [displayResponde, setDisplayResposta] = useState(false);
  const storeUserRespons: string[] = [];
  const [questions, setQuestions] = useState<Pergunta[]>([]); // Set type to Pergunta[]

  useEffect(() => {
    if (!fetching && questionarioData) {
      if (!questionarioData.questionario?.pergunta) return;
      console.log(questionarioData);
      const perguntas = [...questionarioData.questionario.pergunta];
      setQuestions(perguntas); // Store questions when subscription receives data
    }
  }, [questionarioData]);

  const handleAnswer = (answer: any) => {
    console.log(`User answered: ${answer}`);
    // const
    // setDisplayResposta(true)
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
    <ThemedView style={tw`h-full w-full bg-white `}>
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
                key={currentQuestion?.id}
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
                    style={tw`bg-blue-200 p-2 m-1 rounded`}
                    onPress={() => handleAnswer(answer)}
                    title={answer.text}
                  ></CustomButton>
                ))}
              </ThemedView>
            ) : (
              <TextInput
                style={tw`border p-2 mt-2`}
                placeholder="Type your answer..."
                value={response}
                onChangeText={setResponse}
                onSubmitEditing={() => handleAnswer(response)}
              />
            )}

            {currentQuestion?.opcoes_respostas ? (
              <CustomButton
                title="Submit"
                onPress={() => handleAnswer(response)}
              />
            ) : null}
          </>
        )}
      </ThemedView>
      <ThemedView></ThemedView>
    </ThemedView>
  );
};

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
});

export default HomeScreen;

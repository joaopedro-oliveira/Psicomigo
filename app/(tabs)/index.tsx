import { Image, StyleSheet, TextInput } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useEnviaQuestionariosSubscription,
  useLogoutMutation,
  useMeQuery,
} from "@/generated/graphql";
import { useIsAuth } from "@/utils/useIsAuth";
import { isServer } from "@/utils/isServer";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";
import { Box, TextField } from "native-base";
import { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButtton";

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

  const [{ data: questionarioData }] = useEnviaQuestionariosSubscription();

  const [index, setIndex] = useState(0); // Tracks the current question index
  const [response, setResponse] = useState(""); // Tracks user response
  const [questions, setQuestions] = useState<Pergunta[]>([]); // Set type to Pergunta[]

  useEffect(() => {
    if (!fetching && questionarioData) {
      if (!questionarioData.enviaQuestionario.pergunta) return;
      console.log(questionarioData);
      const perguntas = [...questionarioData.enviaQuestionario.pergunta];
      setQuestions(perguntas); // Store questions when subscription receives data
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
            <ThemedText style={tw`text-lg font-bold mb-4`}>
              {currentQuestion?.pergunta}
            </ThemedText>

            {currentQuestion?.opcoes_respostas &&
            currentQuestion.opcoes_respostas.length > 0 ? (
              <ThemedView style={tw`flex flex-row flex-wrap`}>
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

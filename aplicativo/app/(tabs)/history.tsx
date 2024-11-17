import { Image } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Questionario,
  useMeQuery,
  useQuestionariosQuery,
} from "@/generated/graphql";
import { isServer } from "@/utils/isServer";
import { useEffect, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import Mensagem from "@/components/Mensagem";
import { ScrollView } from "native-base";
import CustomButton from "@/components/CustomButtton";

const History = () => {
  const { data: meData, loading: fetching } = useMeQuery({ skip: isServer() });
  const [selectedDates, setSelectedDates] = useState<selectedDateType[]>([]);
  const [UltimoQuestionario, setLastQuestionarioId] =
    useState<Questionario | null>(null);
  const { data: questionarios } = useQuestionariosQuery({ skip: fetching });
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  interface selectedDateType {
    date: string;
    respondido: boolean;
  }

  useEffect(() => {
    if (questionarios?.questionarios) {
      const datas = questionarios.questionarios.map((questionario) => {
        return {
          date: new Date(questionario.createdAt).toISOString().split("T")[0],
          id: questionario.id,
          respondido: questionario.respondido,
        }; // Convert to 'YYYY-MM-DD' format
      });
      setSelectedDates(datas);
    }
  }, [questionarios]);

  // Function to get the latest questionario for a given date
  const getQuestionario = (date: string) => {
    const questionario = questionarios?.questionarios.find((q) => {
      return new Date(q.createdAt).toISOString().split("T")[0] === date;
    });
    // console.log(questionario);
    return questionario;
  };

  // Map the selectedDates to a format for `markedDates`
  const markedDates = selectedDates.reduce(
    (
      acc: {
        [key: string]: {
          selected: boolean;
          disableTouchEvent: boolean;
          selectedDotColor: string;
          customStyles?: any;
        };
      },
      { date, respondido }: selectedDateType
    ) => {
      // const questionario = getQuestionario(date);

      // Custom style based on 'respondido'
      acc[date] = {
        selected: true,
        disableTouchEvent: false,
        selectedDotColor: "orange",
        customStyles: {
          container: {
            backgroundColor: respondido ? "#4894FE" : "#01BBF2",
          },
          text: {
            color: "white",
          },
        },
      };
      return acc;
    },
    {}
  );

  // Handle day press event to set the last questionario ID
  const handleDayPress = (day: DateData) => {
    const questionario = getQuestionario(day.dateString);
    // if (questionario) {
    setLastQuestionarioId(questionario as Questionario);
    // }
    console.log(UltimoQuestionario);
  };

  return (
    <ThemedView
      style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto`}
    >
      <ThemedView style={tw`mt-16 bg-white w-full h-[60px] flex-row `}>
        {fetching ? (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
            Loading
          </ThemedText>
        ) : meData?.me ? (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-xl`}>
            {meData.me.username}
          </ThemedText>
        ) : (
          <ThemedText type="subtitle" style={tw`text-black ml-7 text-2xl`}>
            No User
          </ThemedText>
        )}
        <Image
          source={require("@/assets/images/AppIcon.png")}
          style={tw`mr-7 ml-auto w-[56px] h-[56px]`}
        />
      </ThemedView>
      <ThemedView style={tw`bg-transparent ml-5 mt-8`}>
        <CustomButton
          onPress={() => toggleDropdown()}
          style={tw`px-2 py-2 items-center bg-[#4894FE] rounded-md mr-auto`}
          title="Calendário"
        ></CustomButton>
      </ThemedView>
      <ThemedView style={tw`bg-transparent ${dropdownVisible ? "" : "hidden"}`}>
        <Calendar
          style={tw`p-2 rounded-lg `}
          markingType="custom" // Use custom marking
          markedDates={markedDates} // Apply marked dates with custom styles
          onDayPress={handleDayPress} // Set the last questionario ID when a day is pressed
        />
      </ThemedView>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}

      {/* </GestureHandlerRootView> */}
      <ScrollView
        style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto mt-10`}
        contentContainerStyle={tw`flex-grow-1`}
        // onContentSizeChange={onContentSizeChange}
        // ref={scrollViewRef}
      >
        <ThemedView style={tw`bg-transparent p-0 mb-8`}>
          {UltimoQuestionario && UltimoQuestionario.respostas && (
            <>
              <ThemedView
                key={`${UltimoQuestionario.id}-view`}
                style={tw`flex max-w-[90%] web:max-w-[100%] bg-transparent mb-4`}
              >
                <ThemedText
                  type="defaultSemiBold"
                  key={`${UltimoQuestionario.id}-text`}
                  style={[
                    tw`text-black  text-lg`,
                    { fontFamily: "PoppinsRegular" },
                  ]}
                >
                  Questionario -{" "}
                  {new Date(UltimoQuestionario.createdAt).toLocaleDateString()}
                </ThemedText>

                <ThemedText
                  key={`${UltimoQuestionario.id}-dataFinalizacao`}
                  style={tw`text-sm mt-2 text-gray-600`}
                >
                  Hora da finalização:{" "}
                  {UltimoQuestionario.respondido &&
                    new Date(
                      UltimoQuestionario.dataFinalizacao
                    ).toLocaleTimeString()}
                </ThemedText>
                {/* <ThemedText style={tw`text-sm text-gray-600`}>
                Tópico: {UltimoQuestionario.}
              </ThemedText> */}
              </ThemedView>

              {UltimoQuestionario.respostas.map((resposta) => (
                <>
                  {resposta.respondido ? (
                    <ThemedView
                      key={`${resposta.id}-answered`}
                      style={tw`my-1 bg-white`}
                    >
                      <Mensagem
                        key={`${resposta.pergunta_id}-question`}
                        keyNumber={resposta.pergunta_id}
                        content={resposta.pergunta}
                        isQuestion={true}
                      />
                      <Mensagem
                        key={`${resposta.id}-answer`}
                        keyNumber={resposta.id}
                        content={
                          resposta.tipo === "resposta livre"
                            ? resposta.resposta_livre || ""
                            : resposta.opcao_resposta_escolhida
                                ?.map((op) => op.text)
                                .join(", ") || ""
                        }
                        isQuestion={false}
                      />
                    </ThemedView>
                  ) : (
                    <ThemedView
                      key={`${resposta.id}-unanswered`}
                      style={tw`my-1 bg-white`}
                    >
                      <Mensagem
                        key={`${resposta.pergunta_id}-question`}
                        keyNumber={resposta.pergunta_id}
                        content={resposta.pergunta}
                        isQuestion={true}
                      />
                      <ThemedText
                        key={`${resposta.id}-unanswered`}
                        style={tw`text-black bg-white text-xl`}
                      >
                        Não respondido
                      </ThemedText>
                    </ThemedView>
                  )}
                </>
              ))}
            </>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default History;

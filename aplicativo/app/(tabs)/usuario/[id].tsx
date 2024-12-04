import { useGlobalSearchParams } from "expo-router";
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
  useEditarPacienteMutation,
  useGetUserQuery,
  useMeQuery,
} from "@/generated/graphql";
import { Image } from "native-base";
import CustomButton from "@/components/CustomButtton";
import { Ionicons } from "@expo/vector-icons";
import { Formik, FieldArray } from "formik";
import { useEffect, useState } from "react";

const Usuario = ({}) => {
  const { id } = useGlobalSearchParams();
  const [_id, setId] = useState(-1);

  useEffect(() => {
    if (id) {
      const id_ = typeof id === "string" ? parseInt(id) : -1;
      if (id_) {
        setId(id_);
      }
    }
  }, [id]);

  const { data: meData, loading: meFetching } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });

  const { data, loading: fetching } = useGetUserQuery({
    variables: { userId: _id },
    notifyOnNetworkStatusChange: true,
  });

  const [editarPaciente] = useEditarPacienteMutation();

  if (fetching) return null;
  if (!data)
    return (
      <ThemedText style={tw`text-black`} type="title">
        {" "}
        Algo deu errado
      </ThemedText>
    );

  if (!data.user)
    return (
      <ThemedText style={tw`text-black`} type="title">
        {" "}
        Usuario não encontrada
      </ThemedText>
    );

  let initialData = {
    username: data.user.username,
    email: data.user.email,
    tipo: data.user.tipo,
    paciente_ativo: data.user.paciente_ativo,
    id: data.user.id,
    topicos: data.user.topicosPaciente,
    genero: data.user.genero,
  };

  return (
    <ScrollView
      style={tw`h-full w-full bg-white rounded-xl shadow-md p-2`}
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
      <Formik
        initialValues={initialData}
        onSubmit={async (values, { setErrors }) => {
          const response = await editarPaciente({
            variables: {
              paciente_ativo: values.paciente_ativo,
              userId: _id,
              topicos: values.topicos,
            },
          });
        }}
      >
        {({ handleSubmit, values, setFieldValue, handleChange }) => (
          <SafeAreaView style={tw`flex justify-center w-[85%]  mx-auto `}>
            <KeyboardWrapper>
              <ThemedText
                style={[
                  tw` text-black text-4 `,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Nome
              </ThemedText>
              <TextInput
                readOnly={true}
                style={[
                  tw`w-full  h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                  { fontFamily: "PoppinsRegular" },
                ]}
                id="username"
                value={values.username}
              />
            </KeyboardWrapper>

            <View style={tw`mt-2 web:mt-4 flex-row items-center `}>
              <ThemedText
                style={[
                  tw` text-black text-4 mt-2 web:mt-4 mr-2`,
                  { fontFamily: "PoppinsRegular" },
                ]}
              >
                Paciente Ativo?
              </ThemedText>
              <Pressable
                role="checkbox"
                aria-checked={values.paciente_ativo}
                style={[
                  tw`flex-row mt-auto h-8 w-8 justify-center items-center rounded-lg ${
                    values.paciente_ativo
                      ? "bg-[#4894FE]"
                      : " border-gray-200 border bg-gray-100"
                  }`,
                  { fontFamily: "PoppinsRegular" },
                ]}
                id="paciente_ativo"
                onPress={() => {
                  setFieldValue("paciente_ativo", !values.paciente_ativo);
                  handleChange("paciente_ativo");
                }}
              >
                {values.paciente_ativo && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </Pressable>
            </View>
            <ThemedText
              style={[
                tw` text-black text-4 `,
                { fontFamily: "PoppinsRegular" },
              ]}
            >
              Topico
            </ThemedText>

            <FieldArray name="topicos">
              {({ push, remove }) => (
                <View style={tw``}>
                  {values.topicos?.map((option, index) => (
                    <View
                      style={tw`flex-row items-center justify-center`}
                      key={index}
                    >
                      <TextInput
                        style={[
                          tw`w-[90%] web:w-[97.5%] h-13 border p-2.5  mt-1 border-gray-400 rounded-xl bg-[#fafafa]`,
                          { fontFamily: "PoppinsRegular" },
                        ]}
                        placeholder={`topicos ${index + 1}`}
                        id=""
                        onChangeText={(text) =>
                          setFieldValue(`topicos.${index}`, text)
                        }
                        value={option ?? ""}
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
                    onPress={() => push("")}
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
  );
};

export default Usuario;

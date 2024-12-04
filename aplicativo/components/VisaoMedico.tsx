import {
  useAdicionarPacienteMutation,
  usePacientesDoutorSuspenseQuery,
} from "@/generated/graphql";
import React, { Suspense, useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FlatList, Text } from "native-base";
import tw from "twrnc";
import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "./CustomButtton";
import { Formik } from "formik";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

interface VisaoMedicoProps {}

export const VisaoMedico: React.FC<VisaoMedicoProps> = ({}) => {
  const { data: doutor } = usePacientesDoutorSuspenseQuery();
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [adicionarPaciente] = useAdicionarPacienteMutation();
  const router = useRouter();

  const ScanQRCode = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (permission?.granted) {
      setShowCamera(true);
    }
  };

  return (
    <Suspense>
      <ThemedView style={tw`w-full mt-4 mb-12 z-40 h-auto flex-col bg-white`}>
        <ThemedView style={tw`flex bg-white h-[15%] w-full`}>
          <Formik
            style={tw`w-full `}
            initialValues={{ userKey: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await adicionarPaciente({
                variables: { userkey: values.userKey },
                update: (cache) => {
                  cache.evict({ fieldName: "pacientesDoutor" });
                },
              });
              if (response.errors || response.data?.adicionarPaciente.erro) {
                if (response.data?.adicionarPaciente.erro) {
                  setErrors({ userKey: response.data?.adicionarPaciente.erro });
                }
              } else if (response.data?.adicionarPaciente.sucesso) {
              }
            }}
          >
            {({
              handleSubmit,
              values,
              setFieldValue,
              handleChange,
              errors,
            }) => (
              <>
                {showCamera && permission?.granted && (
                  <>
                    <CameraView
                      style={[
                        tw`flex w-full aspect-square inset-0 mt-[20%] mx-auto  rounded-xl  `,
                      ]}
                      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                      onBarcodeScanned={(data) => {
                        values.userKey = data.data;
                        setFieldValue("userKey", data.data);
                        handleSubmit();
                        setShowCamera(false);
                      }}
                    />
                    <CustomButton
                      style={tw`flex absolute h-24 w-24 justify-center z-33  top-0  items-center rounded-lg bg-[#4894FE] ${
                        !showCamera ? "hidden" : ""
                      }`}
                      textStyle={tw`text-sm`}
                      onPress={() => setShowCamera(false)}
                      title="Fechar Camera"
                    >
                      <Ionicons name="close" size={36} color={"white"} />
                    </CustomButton>
                  </>
                )}
                <ThemedView
                  style={tw`flex-row w-full bg-transparent items-center ${
                    showCamera ? "hidden" : ""
                  }`}
                >
                  <CustomButton
                    style={tw`flex h-24 w-24 justify-center z-1  top-0  items-center rounded-lg bg-[#4894FE] ${
                      showCamera ? "hidden" : ""
                    }`}
                    onPress={ScanQRCode}
                    textStyle={tw`text-sm`}
                    title="Ler QR Code"
                  >
                    <Ionicons name="qr-code" size={30} color={"white"} />
                  </CustomButton>
                  <ThemedView style={tw`bg-white flex w-[65%] items-center`}>
                    <TextInput
                      id="userKey"
                      style={tw`w-full p-2 ml-4 h-12 bg-[#fafafa] border  border-gray-400 rounded-xl `}
                      value={values.userKey}
                      onChangeText={handleChange("userKey")}
                      onSubmitEditing={() => handleSubmit()}
                      placeholder="Insira aqui a chave do paciente"
                    ></TextInput>
                    {errors.userKey ? (
                      <View>
                        <ThemedText
                          lightColor="#ff0000"
                          darkColor="#ff0000"
                          type="default"
                          style={tw`flex w-full text-red-400  mt-1`}
                        >
                          {errors.userKey}
                        </ThemedText>
                      </View>
                    ) : null}
                  </ThemedView>
                </ThemedView>
              </>
            )}
          </Formik>
        </ThemedView>

        <FlatList
          style={tw`flex-grow max-h-[78%] mx-[10%] mt-8 ios:mx-[5%] ios:w-[90%] -z-20 bg-white`}
          data={doutor?.pacientesDoutor}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView
              style={tw`flex-row justify-between p-2 border-b border-gray-200 bg-white`}
            >
              <ThemedView key={item.id} style={tw`w-full p-2 flex  bg-white`}>
                <ThemedView style={tw`flex-row bg-white`}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={[
                      tw`text-black mr-auto`,
                      { fontFamily: "PoppinsSemiBold" },
                    ]}
                  >
                    {item.username}
                  </ThemedText>
                  <TouchableOpacity
                    style={[
                      tw`flex-row h-8 w-8 justify-center items-center rounded-lg
                          bg-[#4894FE]

                      }`,
                      { fontFamily: "PoppinsRegular" },
                    ]}
                    onPress={() => {
                      router.navigate({
                        pathname: "/(tabs)/usuario/[id]",
                        params: { id: item.id },
                      });
                    }}
                  >
                    {<Ionicons name="pencil" size={14} color="white" />}
                  </TouchableOpacity>
                </ThemedView>
                <Text style={{ fontFamily: "PoppinsRegular" }}>
                  ID: {item.id}
                </Text>
                <Text
                  style={[tw`text-sm mt-1`, { fontFamily: "PoppinsRegular" }]}
                >
                  Tópicos: {item.topicosPaciente.join(", ")}
                </Text>

                <ThemedView style={tw`flex-row items-center bg-white`}>
                  <Text style={tw`mr-auto text-sm`}>Paciente Ativo</Text>
                  <Pressable
                    role="checkbox"
                    aria-checked={item.paciente_ativo}
                    style={[
                      tw`flex-row h-8 w-8 justify-center items-center rounded-lg ${
                        item.paciente_ativo
                          ? "bg-[#4894FE]"
                          : " border-gray-200 border bg-gray-100"
                      }`,
                      { fontFamily: "PoppinsRegular" },
                    ]}
                    id="pacienteAtivo"
                  >
                    {item.paciente_ativo && (
                      <Ionicons name="checkmark" size={18} color="white" />
                    )}
                  </Pressable>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )}
        ></FlatList>
      </ThemedView>
    </Suspense>
  );
};

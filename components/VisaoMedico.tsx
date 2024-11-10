import {
  PerguntaInput,
  usePacientesDoutorSuspenseQuery,
} from "@/generated/graphql";
import React, { Suspense, useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FlatList, Text } from "native-base";
import tw from "twrnc";
import { Button, Platform, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureHandlerRootView,
  NativeViewGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CustomButton from "./CustomButtton";
import { Formik } from "formik";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";

interface VisaoMedicoProps {}

export const VisaoMedico: React.FC<VisaoMedicoProps> = ({}) => {
  const { data: doutor } = usePacientesDoutorSuspenseQuery();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const ScanQRCode = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (permission?.granted) {
      setShowCamera(true);
      //   console.log("mostra camera"); // Show camera view when permission is granted
    }
  };

  return (
    <Suspense>
      {/* <ThemedView> */}
      <ThemedView style={tw`z-2`}>
        {Platform.OS !== "web" && (
          <CustomButton
            style={tw`flex-row h-12 w-12 justify-center z-1 absolute top-100 items-center rounded-lg bg-[#4894FE]`}
            onPress={ScanQRCode}
            title="Scan QR Code"
          >
            {/* <Ionicons name="add" size={24} color={"white"} /> */}
          </CustomButton>
        )}

        {/* Render CameraView if showCamera is true and permission is granted */}
        {showCamera && permission?.granted && (
          <>
            <CameraView
              style={tw`absolute inset-0 z-10`} // Full-screen camera view
              // type={facing}
              onMountError={(error) => console.log("Camera error:", error)}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={(data) => {
                console.log("Scanned data:", data);
                setShowCamera(false); // Hide camera after scanning
              }}
            />
            <CustomButton
              style={tw`absolute  flex-row h-12 w-12 justify-center z-20 top-100 items-center rounded-lg bg-[#4894FE]`}
              onPress={() => setShowCamera(false)}
              title="Fechar Camera"
            >
              {/* <Ionicons name="add" size={24} color={"white"} /> */}
            </CustomButton>
          </>
        )}

        {/* <Formik<PerguntaInput>
            initialValues={initialValues}
            onSubmit={async (values, { setErrors }) => {
              // console.log(values);
              const response = await criarPerguntas({
                variables: { input: values },
                update: (cache) => {
                  cache.evict({ fieldName: "perguntas" });
                },
              });
              if (response.errors || !response.data?.criarPergunta.id) {
                console.log(response.errors);
              } else if (response.data?.criarPergunta) {
                // console.log(response.data?.criarPergunta);

                navigation.navigate("Perguntas");
              }
            }}
          >
            {({ handleSubmit, values, setFieldValue, handleChange }) => (
        <CustomButton
          onPress={() =>
            //   navigation.navigate("CadastrarPerguntas" as never)
            console.log("oi")
          }
          title="Adicionar Pergunta"
          style={tw`rounded-xl bg-[#4894FE] `}
        ></CustomButton>
      </ThemedView> */}

        <FlatList
          style={tw`flex mx-[10%] ios:mx-[5%] ios:w-[90%] h-auto -z-20 my-auto`}
          data={doutor?.pacientesDoutor}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView
              style={tw`flex-row justify-between p-2 border-b border-gray-200`}
            >
              <ThemedView key={item.id} style={tw`w-full p-2 flex`}>
                <ThemedText
                  type="defaultSemiBold"
                  style={[tw``, { fontFamily: "PoppinsSemiBold" }]}
                >
                  {item.username}
                </ThemedText>
                <Text>ID: {item.id}</Text>

                <ThemedView style={tw`flex-row items-center`}>
                  <Text style={tw`mr-auto`}>Paciente Ativo</Text>
                  <Pressable
                    role="checkbox"
                    // type={'checkbox'}
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
                    // ={values.perguntaAtiva}

                    // onPress={() => {
                    //   setFieldValue("perguntaAtiva", !values.perguntaAtiva);
                    //   handleChange("perguntaAtiva");
                    // }}
                    // placeholder="Insira aqui sua pergunta"
                  >
                    {item.paciente_ativo && (
                      <Ionicons name="checkmark" size={24} color="white" />
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

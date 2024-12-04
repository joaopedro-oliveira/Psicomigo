import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, ScrollView, Text } from "react-native";
import tw from "twrnc";
import { Image } from "react-native";
interface infoProps {}

const info: React.FC<infoProps> = ({}) => {
  return (
    <ThemedView style={tw`h-full w-full bg-white`}>
      <ThemedView
        style={tw`mx-auto bg-white px-2 w-full h-[85%] mt-8 ios:mt-12 flex`}
      >
        <View style={tw`flex-row`}>
          <Image
            source={require("@/assets/images/AppIcon.png")}
            style={tw`mt-6 ml-auto mr-7 w-[56px] h-[56px]`}
          />
        </View>
        {/* Início do código */}
        <ScrollView style={tw`flex-1 mt-4`}>
          <Text style={tw`text-lg font-bold text-center text-blue-700 mb-4`}>
            Ajuda e Recursos para Saúde Mental
          </Text>
          <View style={tw`p-4 bg-blue-50 rounded-lg shadow mb-4`}>
            <Text style={tw`text-base font-semibold text-blue-800`}>
              CVV - Centro de Valorização da Vida
            </Text>
            <Text style={tw`text-sm text-gray-700 mt-2`}>
              Atendimento 24h: Ligue 188 ou acesse o site para chat online.
            </Text>
          </View>
          <View style={tw`p-4 bg-blue-50 rounded-lg shadow mb-4`}>
            <Text style={tw`text-base font-semibold text-blue-800`}>
              CAPS - Centros de Atenção Psicossocial
            </Text>
            <Text style={tw`text-sm text-gray-700 mt-2`}>
              Serviços públicos para apoio psicológico e psiquiátrico. Procure o
              CAPS mais próximo.
            </Text>
          </View>
          <View style={tw`p-4 bg-blue-50 rounded-lg shadow mb-4`}>
            <Text style={tw`text-base font-semibold text-blue-800`}>
              Emergência Psiquiátrica
            </Text>
            <Text style={tw`text-sm text-gray-700 mt-2`}>
              Ligue 192 (SAMU) em caso de emergências relacionadas à saúde
              mental.
            </Text>
          </View>
          <View style={tw`p-4 bg-blue-50 rounded-lg shadow mb-4`}>
            <Text style={tw`text-base font-semibold text-blue-800`}>
              Informações sobre Saúde Mental
            </Text>
            <Text style={tw`text-sm text-gray-700 mt-2`}>
              Acesse fontes confiáveis como o site da OMS ou Ministério da Saúde
              para entender mais sobre como cuidar da saúde mental.
            </Text>
          </View>
        </ScrollView>
        {/* Fim do código */}
      </ThemedView>
    </ThemedView>
  );
};

export default info;

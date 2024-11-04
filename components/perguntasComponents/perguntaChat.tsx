import { useDeletarPerguntaMutation } from "@/generated/graphql";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import tw from "twrnc";

interface PerguntaProps {
  pergunta: {
    __typename?: "Pergunta";
    id: number;
    pergunta: string;
    tipo: string;
    topico: string;
    createdAt: string;
    perguntaAtiva: boolean;
    opcoes_respostas?:
      | Array<{
          __typename?: "OpcoesResposta";
          text: string;
          id: number;
        }>
      | null
      | undefined;
  };
}

const PerguntaComponent: React.FC<PerguntaProps> = ({ pergunta }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deletarPergunta] = useDeletarPerguntaMutation();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={tw`p-4 bg-white rounded-lg shadow flex`}>
      {/* Header */}
      <View style={tw`flex-row  `}>
        <View style={tw`flex max-w-[90%] web:max-w-[100%] `}>
          <Link
            href={{ pathname: `/pergunta/[id]`, params: { id: pergunta.id } }}
            style={[
              tw`text-lg text-[#4894FE]`,
              { fontFamily: "PoppinsSemiBold" },
            ]}
          >
            {pergunta.pergunta}
          </Link>
          <Text style={tw`text-sm mt-2 text-gray-600`}>
            Tipo: {pergunta.tipo}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            Tópico: {pergunta.topico}
          </Text>
        </View>
        {/* Dropdown Button */}

        <View style={tw`flex ml-auto`}>
          <View style={tw`mb-2`}>
            <TouchableOpacity
              onPress={() =>
                deletarPergunta({
                  variables: { id: pergunta.id },
                  update: (cache) => {
                    cache.evict({ id: "Pergunta:" + pergunta.id });
                  },
                })
              }
              style={tw`px-2 py-2 items-center bg-red-600 rounded-md w-8 h-8`}
            >
              <Ionicons name={"trash-bin"} size={18} color={"white"} />
            </TouchableOpacity>
          </View>

          {(pergunta.tipo === "escolha única" ||
            pergunta.tipo == "múltipla escolha") &&
            pergunta.opcoes_respostas && (
              <View style={tw``}>
                <TouchableOpacity
                  onPress={toggleDropdown}
                  style={tw`px-2 py-2 items-center bg-[#4894FE] rounded-md w-8 h-8`}
                >
                  <Ionicons
                    name={
                      !dropdownVisible ? "chevron-down" : "chevron-up-outline"
                    }
                    size={18}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
      {dropdownVisible && (
        <FlatList
          data={pergunta.opcoes_respostas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row justify-between p-2 border-b border-gray-200`}
            >
              <Text
                style={[tw`text-gray-800`, { fontFamily: "PoppinsRegular" }]}
              >
                {item.text}
              </Text>
              <Text
                style={[tw`text-gray-600`, { fontFamily: "PoppinsRegular" }]}
              >
                ID: {item.id}
              </Text>
            </View>
          )}
          style={[
            tw`mt-2 border border-gray-300 rounded-lg`,
            ,
            { fontFamily: "PoppinsRegular" },
          ]}
        />
      )}
    </View>
  );
};

export default PerguntaComponent;

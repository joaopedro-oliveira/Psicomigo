import { Image, StyleSheet, SafeAreaView } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButtton";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { ThemedTextInputField } from "@/components/ThemedTextInputField";

const Calendar = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const params = useLocalSearchParams();
  const next = params.next;

  return <ThemedView style={tw`h-full w-full bg-white`}></ThemedView>;
};

export default Calendar;

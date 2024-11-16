import React from "react";
import tw from "twrnc";
import { enableScreens } from "react-native-screens";
import { Skeleton } from "native-base";
import { ThemedView } from "./ThemedView";
enableScreens(); // Required for react-native-screens
interface LoadingSkeletonMedicoProps {}

export const LoadingSkeletonMedico: React.FC<
  LoadingSkeletonMedicoProps
> = ({}) => {
  return (
    <ThemedView
      style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 web:m-auto`}
    >
      <Skeleton
        style={tw`h-[70%] w-[90%] flex rounded-lg shadow-sm`}
      ></Skeleton>
    </ThemedView>
  );
};

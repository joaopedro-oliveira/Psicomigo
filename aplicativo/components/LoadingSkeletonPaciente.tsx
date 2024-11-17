import React from "react";
import tw from "twrnc";
import { enableScreens } from "react-native-screens";
import { Skeleton } from "native-base";
import { ThemedView } from "./ThemedView";
enableScreens();
interface LoadingSkeletonPacienteProps {}

export const LoadingSkeletonPaciente: React.FC<
  LoadingSkeletonPacienteProps
> = ({}) => {
  return (
    <ThemedView style={tw`h-full w-full bg-white rounded-xl p-2 web:m-auto`}>
      <ThemedView style={tw`relative mt-4 `}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  left-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-br-3xl  left-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-br-2xl  left-0`}
        />
      </ThemedView>

      <ThemedView style={tw`relative mt-16`}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  right-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-bl-3xl  right-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-bl-2xl right-0 `}
        />
      </ThemedView>

      <ThemedView style={tw`relative mt-16 `}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  left-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-br-3xl  left-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-br-2xl  left-0`}
        />
      </ThemedView>

      <ThemedView style={tw`relative mt-16`}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  right-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-bl-3xl  right-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-bl-2xl right-0 `}
        />
      </ThemedView>
      <ThemedView style={tw`relative mt-16 `}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  left-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-br-3xl  left-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-br-2xl  left-0`}
        />
      </ThemedView>

      <ThemedView style={tw`relative mt-16`}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  right-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-bl-3xl  right-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-bl-2xl right-0 `}
        />
      </ThemedView>
      <ThemedView style={tw`relative mt-16 `}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  left-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-br-3xl  left-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-br-2xl  left-0`}
        />
      </ThemedView>

      <ThemedView style={tw`relative mt-16`}>
        <Skeleton
          style={tw`absolute w-[60%]  h-12 rounded-full shadow-sm  right-0 `}
        />
        <Skeleton
          style={tw`absolute w-5 h-[25px] -bottom-12 rounded-bl-3xl  right-0`}
        />
        <Skeleton
          style={tw`absolute w-5 h-[35px] -bottom-12 rounded-bl-2xl right-0 `}
        />
      </ThemedView>
    </ThemedView>
  );
};

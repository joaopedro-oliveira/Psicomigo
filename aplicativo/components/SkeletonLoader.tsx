import { Skeleton, VStack } from "native-base";
import tw from "twrnc";

const SkeletonLoader = () => {
  return (
    <VStack style={tw`h-full w-full bg-white rounded-xl shadow-md p-2 my-auto`}>
      <Skeleton.Text
        lines={2}
        width="90%"
        marginBottom={4}
        style={tw`bg-neutral-400`}
      />
    </VStack>
  );
};

export default SkeletonLoader;

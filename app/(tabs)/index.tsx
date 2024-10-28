import { Image, StyleSheet } from "react-native";
import tw from "twrnc";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/useIsAuth";
import { isServer } from "@/utils/isServer";

const HomeScreen = () => {
  useIsAuth();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <ThemedView style={tw`h-full w-full bg-white `}>
      <ThemedView
        style={tw`mt-16 bg-white w-full h-[60px] flex-row items-center `}
      >
        <>
          {fetching ? (
            <ThemedText
              type="subtitle"
              style={tw`text-black ml-7 mr-auto text-2xl`}
            >
              Loading
            </ThemedText>
          ) : !data?.me ? (
            <ThemedText
              type="subtitle"
              style={tw`text-black ml-7 mr-auto text-2xl`}
            >
              No User
            </ThemedText>
          ) : (
            <ThemedText
              type="subtitle"
              style={tw`text-black ml-7 mr-auto text-xl`}
            >
              <ThemedText
                type="defaultSemiBold"
                style={tw` text-lg text-gray-400`}
              >
                {"Olá, \n"}
              </ThemedText>
              {data.me.username.charAt(0).toUpperCase() +
                data.me.username.slice(1).toLowerCase() +
                "!"}
            </ThemedText>
          )}
        </>

        <Image
          source={require("@/assets/images/AppIcon.png")}
          style={tw`mr-7 w-[56px] h-[56px]`}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default HomeScreen;

import { Image, StyleSheet, Platform, SafeAreaView, TextInput } from 'react-native';
import tw from 'twrnc';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={tw`h-full w-full bg-white`}>
      <ThemedView style={tw`m-auto bg-white px-2 w-full h-[458px] flex`} >


        <Image source={require('@/assets/images/AppIcon.png')} style={tw` mx-auto w-[56px] h-[56px]`}/>
        <ThemedText type="title" style={tw`mt-16 text-black mx-auto`}>Entre com sua conta!</ThemedText>

        <SafeAreaView style={tw`flex justify-center`}>
          <ThemedText style={tw`text-black`}>Email</ThemedText>
          <TextInput
            style={tw`w-[75%] h-10 m-1 p-2.5 border-2 border-black rounded `}
            placeholder="useless placeholder"
            //onChangeText={onChangeText}
            //value={text}
          />
          <TextInput
            style={tw`h-10 m-3 p-2.5`}
            //onChangeText={onChangeNumber}
            //value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />

      </SafeAreaView>


      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import tw from "twrnc";
interface QRCodeComponentProps {
  userKey: string;
}

export const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  userKey,
}) => {
  return (
    <View style={tw`items-center align-middle mt-4`}>
      <Text style={[tw`text-lg mb-2`, { fontFamily: "PoppinsRegular" }]}>
        Código QR Code
      </Text>
      <QRCode
        ecl="H"
        value={userKey}
        size={200} // Adjust size as needed
        backgroundColor="white"
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QRCodeComponent;

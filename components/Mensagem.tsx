import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import tw from "twrnc";
interface MensagemProps {
  content: string;
  isQuestion: boolean;
  keyNumber: number;
}

const Mensagem: React.FC<MensagemProps> = ({
  content,
  isQuestion,
  keyNumber,
}) => {
  return (
    <>
      {!isQuestion ? (
        <ThemedView
          style={{
            backgroundColor: "#4894FE",
            padding: 10,
            marginLeft: "45%",
            borderRadius: 15,

            marginTop: 5,
            marginRight: "5%",
            maxWidth: "60%",
            alignSelf: "flex-end",
            //   borderRadius: 20,
          }}
          key={keyNumber}
        >
          <ThemedText
            style={{
              fontSize: 15,
              fontFamily: "PoppinsRegular",
              color: "#fff",
            }}
          >
            {content}
          </ThemedText>

          <ThemedView style={styles.rightArrow}></ThemedView>
          <ThemedView style={styles.rightArrowOverlap}></ThemedView>
        </ThemedView>
      ) : (
        <ThemedView
          style={{
            backgroundColor: "#e2e8f0",
            padding: 11,
            borderColor: "#f3f4f6",

            // borderRadius: 5,
            marginTop: 5,
            marginLeft: "5%",
            maxWidth: "70%",
            alignSelf: "flex-start",
            //maxWidth: 500,
            //padding: 14,

            //alignItems:"center",
            borderRadius: 15,
          }}
          key={keyNumber}
        >
          <ThemedText
            style={{
              fontSize: 15,
              color: "#000",
              justifyContent: "center",
              fontFamily: "PoppinsRegular",
            }}
            // key={key}
          >
            {content}
          </ThemedText>
          <ThemedView style={styles.leftArrow}></ThemedView>
          <ThemedView style={styles.leftArrowOverlap}></ThemedView>
        </ThemedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rightArrow: {
    position: "absolute",
    backgroundColor: "#4894FE",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#ffffff",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: "absolute",
    backgroundColor: "#e2e8f0",

    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#ffffff",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});

export default Mensagem;

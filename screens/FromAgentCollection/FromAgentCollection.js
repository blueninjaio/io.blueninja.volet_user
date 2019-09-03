import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { Thumbnail } from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");

export default class FromAgentCollection extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 20,
              width: width / 1.3
            }}
          >
            <Text
              style={{
                padding: 10,
                color: "#5B86E5",
                fontSize: width * 0.06,
                fontWeight: "500"
              }}
            >
              How Much Would You Like To Withdraw
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter the amount you would like to withdraw from your Volet
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            width: width / 1.3,
            alignSelf: "center"
          }}
        >
          <Thumbnail
            source={{
              uri:
                "https://media.gettyimages.com/photos/cristiano-ronaldo-of-real-madrid-celebrates-after-scoring-a-goal-the-picture-id481747786?s=612x612"
            }}
          />
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,

              fontWeight: "bold"
            }}
          >
            Spongebob S.Pants
          </Text>
          <Text style={{ color: "rgb(160,160,160)", marginTop: 10 }}>
            0.3km away
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
            width: width / 1.3
          }}
        >
          <Text style={{ color: "rgb(160,160,160)" }}>Current Balance</Text>
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            MYR 20.00
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("FromAgentReadyCollect")
          }
        >
          <View
            style={{
              flexDirection: "row",
              width: width / 1.3,
              backgroundColor: "white",
              borderRadius: 10,
              alignSelf: "center",
              padding: 10,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 30,
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1
            }}
          >
            <Image
              source={require("../../assets/qrcode.png")}
              style={{ width: 20, height: 20, marginTop: 10 }}
            />
            <View style={{ paddingLeft: 20 }}>
              <Text>Tap to Scan Agent's</Text>
              <Text style={{ marginTop: 5 }}>QR Code</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            width: width / 1.3,
            alignSelf: "center"
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate("FromAgentCollection")
              }
            >
              <Text style={styles.loginText}>Cancel Transaction</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10,
    alignSelf: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

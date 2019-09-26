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
import { LinearGradient } from "expo-linear-gradient";
export const { width, height } = Dimensions.get("window");

export default class FromAgentCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widthdrawAgent: this.props.navigation.state.params.widthdrawAgent,
      distance: this.props.navigation.state.params.distance,
      price: this.props.navigation.state.params.price,
      token: this.props.navigation.state.params.token
    };
  }

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
              Your Withdrawal Is Ready To Collect
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              This is a confirmation page that your withdrawal is ready to
              collect
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
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={{
              borderRadius: 20,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {this.state.widthdrawAgent.f_name.substring(0, 1)}
              {this.state.widthdrawAgent.l_name.substring(0, 1)}
            </Text>
          </LinearGradient>
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,

              fontWeight: "bold"
            }}
          >
            {this.state.widthdrawAgent.f_name}{" "}
            {this.state.widthdrawAgent.l_name}
          </Text>
          <Text style={{ color: "rgb(160,160,160)", marginTop: 10 }}>
            {this.state.distance}km away
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("FromAgentReadyCollect",{
              widthdrawAgent: this.state.widthdrawAgent,
              distance: this.state.distance,
              price: this.state.price,
              token: this.state.token
            })
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

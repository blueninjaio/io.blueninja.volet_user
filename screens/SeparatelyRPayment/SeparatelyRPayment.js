import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");

export class SeparatelyRPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ""
    };
  }
  componentDidMount() {}

  onActionImgPopUp = contact => {
    Keyboard.addListener("keyboardDidShow");
    if (contact !== null) {
      this.setState({ contact });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 4, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 1,
            marginBottom: 10,
            paddingBottom: 30,
            backgroundColor: "white"
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
              Amount To Request
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              How much are you requesting from your friend seperately
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text style={{ color: "black", fontWeight: "500" }}>
              Item Description
            </Text>
            <TextInput
              disabled={true}
              style={{
                width: width / 1.2,
                marginBottom: 15,
                marginTop: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 13
              }}
              type="text"
              placeholder="Your Email"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <TextInput
              disabled={true}
              style={{
                width: width / 1.2,
                marginBottom: 15,
                marginTop: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 13
              }}
              type="text"
              placeholder="MYR"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 10,
              width: width,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 4, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1,
              marginBottom: 10,
              paddingBottom: 10
            }}
          >
            <View
              style={{
                // backgroundColor: "blue",
                width: width / 1.2,
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              <Text
                style={{
                  color: "rgb(0,0,0)",
                  fontWeight: "bold",
                  fontSize: 15
                }}
              >
                Service Charge
              </Text>
              <Text
                style={{
                  color: "rgb(129,129,129)",
                  fontSize: 15,
                  marginTop: 20
                }}
              >
                Total Requesting Amount
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            width: width
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ReasonRPayment")}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>DONE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default SeparatelyRPayment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

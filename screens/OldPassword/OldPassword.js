import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class OldPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OldPassword: ""
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
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
                Reset Password
              </Text>
              <Text
                style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
              >
                Please enter your mobile number and your temporary password to
                receive a new TAC code and reset your
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>
                Mobile number
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
                // onChangeText={name => this.setState({ name })}

                type="text"
                placeholder="Your Full Name"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>

            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FPTac", {
                  OldPassword: this.state.OldPassword,
                  goBack: this.props.navigation.state.params.goBack
                })
              }
              style={{ padding: 20 }}
            >
              <Text>Resend Code</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            width: width,
            alignItems: "center"
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default OldPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  Thumbnail: {
    backgroundColor: "grey",
    height: height / 3.5,
    width: width / 1.2
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

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Thumbnail } from "native-base";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import { dev, prod, url } from "../../config";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: ""
    };
  }

  /**
  |--------------------------------------------------
  | Send Tac Code Implementing 
  |--------------------------------------------------
  */
  sendTacCode = (socialDetails, socialToken, signUpType) => {
    if (this.state.number.length < 5) alert(`Please enter a valid number`);
    else {
      fetch(`${url}/tac/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          contact: "+60" + this.state.number
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Tac", data);
          if (data.success === true) {
            this.props.navigation.navigate("TAC", {
              contact: "+60" + this.state.number,
              requestMethod: "SignUp",
              signUpType: signUpType,
              socialDetails: socialDetails,
              socialToken: socialToken
            });
          } else {
            alert(data.message);
          }
        })
        .catch(err => {
          console.log("Error send tac:", err);
          Alert.alert(
            "Error connecting to server",
            `Please try again later`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  sendTacCodeNumber = () => {
    if (this.state.number.length < 5) alert(`Please enter a valid number`);
    else {
      fetch(`${url}/tac/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          contact: "+60" + this.state.number
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Tac", data);
          if (data.success === true) {
            this.props.navigation.navigate("TAC", {
              contact: "+60" + this.state.number,
              requestMethod: "SignUp",
              signUpType: "Number",
              socialDetails: "",
              socialToken: ""
            });
          } else {
            alert(data.message);
          }
        })
        .catch(err => {
          console.log("Error send tac:", err);
          Alert.alert(
            "Error connecting to server",
            `Please try again later`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  facebookSignIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("506893633189846", {
        permissions: ["public_profile", "email"]
      });

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        let responseJson = await response.json();
        this.sendTacCode(responseJson, token, "facebook");
        console.log("Json details", responseJson);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  googleSign = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "189450334534-b8kfh8mker01imvfq860d16nd6pr3qq6.apps.googleusercontent.com",
        iosClientId:
          "189450334534-i4jl9kdn5a10eavur8vhr0a5m478eshv.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        iosStandaloneAppClientId: `io.blueninja.Volet`,
        androidStandaloneAppClientId: `io.blueninja.Volet`
      });

      if (result.type === "success") {
        let userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` }
          }
        );
        let responseJson = await userInfoResponse.json();
        this.sendTacCode(responseJson, result.accessToken, "google");
        console.log("user Info response", responseJson);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={styles.Logo}>
                <Image
                  source={require("../../assets/voletBlueLogo.png")}
                  resizeMode="contain"
                  style={{ flex: 1, width: width * 0.5 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "80%"
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
                  Whats is your mobile number?
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  We will send you a verification code
                </Text>
              </View>

              <View
                style={{
                  paddingTop: 20,
                  marginBottom: height * 0.112,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "80%"
                }}
              >
                <Text style={{ fontSize: width * 0.04, marginRight: 10 }}>
                  +60
                </Text>
                <TextInput
                  style={{
                    width: "80%",
                    marginBottom: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5"
                  }}
                  onChangeText={text =>
                    this.setState({
                      number: text.replace(/[^0-9]/g, "")
                    })
                  }
                  value={this.state.number}
                  type="number"
                  placeholder="12345678"
                  placeholderTextColor="rgb(215,215,215)"
                  keyboardType="numeric"
                />
              </View>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.linearStyle}
              >
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.sendTacCodeNumber()}
                >
                  <Text style={styles.loginText}>Send Code</Text>
                </TouchableOpacity>
              </LinearGradient>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 10
                }}
              >
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "#5B86E5",
                    width: width * 0.35
                  }}
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    color: "black",
                    fontSize: 15
                  }}
                >
                  or
                </Text>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: "#5B86E5",
                    width: width * 0.35
                  }}
                />
              </View>
            </View>
            <View style={{ width: width }}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Sign Up with your social account</Text>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        width: width / 1.8,
                        marginTop: 15
                      }}
                    >
                      <TouchableHighlight onPress={() => this.facebookSignIn()}>
                        <Image
                          source={require("../../assets/fb.png")}
                          resizeMode="contain"
                          style={{
                            width: width * 0.152,
                            height: width * 0.122
                          }}
                        />
                      </TouchableHighlight>
                      <TouchableOpacity onPress={() => this.googleSign()}>
                        <Image
                          source={require("../../assets/google.png")}
                          resizeMode="contain"
                          style={{
                            width: width * 0.152,
                            height: width * 0.152
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    height: height * 0.2,
    width: width * 0.5,
    alignItems: "center"
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },

  linearStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10,
    marginBottom: height * 0.042
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey",
    marginTop: 20
  },
  Thumbnail: {
    backgroundColor: "grey"
  }
});

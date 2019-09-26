import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { LinearGradient } from 'expo-linear-gradient'

export class ConfirmNewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      Cpassword: ""
    };
  }

  /**
  |--------------------------------------------------
  | Confirm Reset Password Implementation
  |--------------------------------------------------
  */
  confirmPassword = () => {
    if (this.state.password !== this.state.Cpassword) {
      alert(`Please enter a valid password.`);
    } else {
      fetch(`${url}/users/reset-password`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          token: this.props.navigation.state.params.token,
          old_password: this.state.Cpassword,
          new_password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Confrim Password :", data);
          if (data.success === true) {
            Alert.alert(
              "Success",
              `${data.message}`,
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.navigate("Login")
                }
              ],
              { cancelable: false }
            );
          }
        })
        .catch(error => {
          console.log("Error sign up", error);
          Alert.alert(
            "Error connecting to server",
            `${error}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  onActionCheckPassword = password => {
    console.log("Password", password);
    let normalPassword = /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$)?(^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=]).*$)?(^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?(^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?/.test(
      password
    );
    let strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(
      password
    );

    if (password.length < 5 || !normalPassword) {
      this.setState({ changeBarColor: "weak" });
    } else if (password.length === 5 || normalPassword) {
      this.setState({ changeBarColor: "normal" });
    } else if (password.length >= 8 || normalPassword) {
      this.setState({ changeBarColor: "strong" });
    }
    this.setState({ password });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              marginTop: 30,
              marginBottom: height * 0.04
            }}
          >
            <Text style={{ textAlign: "center", color: "rgb(74,74,74)" }}>
              Enter your new password and confirm your new password to reset
              your
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 20
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
                Password
              </Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  width: width / 1.2,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 12
                }}
                onChangeText={password => this.onActionCheckPassword(password)}
                value={this.state.password}
                secureTextEntry={true}
                type="password"
                placeholder="Password"
                placeholderTextColor="rgb(215,215,215)"
              />
              {this.state.changeBarColor === "normal" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "yellow",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "yellow",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "white",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                </View>
              ) : this.state.changeBarColor === "strong" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "rgb(105,219,100)",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "rgb(105,219,100)",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "rgb(105,219,100)",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                </View>
              ) : this.state.changeBarColor === "weak" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "red",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "white",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "white",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "red",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "white",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                  <View
                    style={{
                      width: "20%",
                      backgroundColor: "white",
                      padding: 7,
                      marginLeft: 3
                    }}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 20
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
                Confirm Password
              </Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  width: width / 1.2,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 12
                }}
                onChangeText={CPassword => this.setState({ CPassword })}
                value={this.state.CPassword}
                secureTextEntry={true}
                type="password"
                placeholder="Confirm Password"
                placeholderTextColor="rgb(215,215,215)"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 80,
            width: width
          }}
        >
          <View style={{ alignItems: "center" }}>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.buttonStyle}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.confirmPassword()}
              >
                <Text style={styles.loginText}>Confirm</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ConfirmNewPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
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
    borderRadius: 10
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

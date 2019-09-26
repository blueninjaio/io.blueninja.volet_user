import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class OldPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      token: "",
      contact: ""
    };
  }

  componentDidMount = () => {
    this.getUserID();
  };

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let contact = await AsyncStorage.getItem("contact");
      if (token !== null) {
        // this.getVolet(token);
        this.setState({ contact });
        this.setState({ token });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server storage",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  // getVolet = async token => {
  //   try {
  //     fetch(`${url}/users/me`, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         Authorization: "Bearer " + token
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log("Users :", data);
  //         if (data.success === true) {
  //           this.setState({ balance: data.user.credits });
  //           this.setState({ savings: data.user.monthly_savings });
  //         }
  //       })
  //       .catch(error => {
  //         Alert.alert(
  //           "Error connecting to server Volet",
  //           `${error}`,
  //           [{ text: "OK", onPress: () => null }],
  //           { cancelable: false }
  //         );
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  checkPassword = () => {
    console.log("pasword", this.state.password)
    if (this.state.password !== "") {
      this.props.navigation.navigate("TAC", {
        password: this.state.password,
        contact: this.state.contact,
        requestMethod: "Reset"
        // goBack: this.props.navigation.state.params.goBack
      });
    } else {
      alert("Please enter valid password");
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Please enter your mobile number and you will receive a new TAC
                  code
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
                  Password
                </Text>
                <TextInput
                  disabled={true}
                  style={{
                    width: width / 1.3,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5",
                    fontSize: 13
                  }}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  type="text"
                  placeholder="Password"
                  secureTextEntry={true}
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
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.checkPassword()}
              >
                <Text style={styles.loginText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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

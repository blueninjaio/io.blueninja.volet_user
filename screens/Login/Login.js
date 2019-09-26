import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Icon, Left, Body, Right, Thumbnail } from "native-base";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { Notifications } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from "expo-permissions";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      notificationToken: ""
    };
  }

  /**
  |--------------------------------------------------
  | Login Implementing Redux
  |--------------------------------------------------
  */

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  reduxLogin = () => {
    console.log("Token", this.state.notificationToken);
    fetch(`${url}/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        login_input: this.state.email,
        password: this.state.password,
        push_token: this.state.notificationToken
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Login", data);
        if (data.success === true) {
          this._storeData(data.token, data.user).then(() => {
            this.props.logMeIn();
          });
        } else alert(data.message);
      })
      .catch(err => {
        console.log("Error for login:", err);

        Alert.alert(
          "Error connecting to server",
          `Please try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | Store Token to Async Storage
  |--------------------------------------------------
  */
  _storeData = async (token, userDetails) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("firstname", userDetails.f_name);
      await AsyncStorage.setItem("lastname", userDetails.l_name);
      await AsyncStorage.setItem("email", userDetails.email);
      await AsyncStorage.setItem("ID", userDetails._id);
      await AsyncStorage.setItem("contact", userDetails.contact);
    } catch (error) {
      alert(error);
    }
  };

  /**
  |--------------------------------------------------
  | Implementing Push Notification
  |--------------------------------------------------
  */

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log("push notification", existingStatus);

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // let token = await Expo.Notifications.getExpoPushTokenAsync();
    let token = await Notifications.getExpoPushTokenAsync();
    return this.setState({ notificationToken: token });

    // fetch(`${url}/users/updatePush`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     token: token,
    //     email: this.state.email
    //   })
    // });
  };

  render() {
    return (
      // <KeyboardAvoidingView
      //   behavior={Platform.OS === "ios" ? "padding" : null}
      //   // style={{ flex: 1 }}
      // >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  height: height * 0.2,
                  width: width * 0.5,
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../../assets/voletBlueLogo.png")}
                  resizeMode="contain"
                  style={{ flex: 1, width: width * 0.5 }}
                />
              </View>
              <Text
                style={{
                  color: "#5B86E5",
                  fontSize: 18,
                  marginBottom: 10
                }}
              >
                Log in with your social account
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    width: width / 1.8
                  }}
                >
                  <Thumbnail style={styles.Thumbnail} />
                  <Thumbnail style={styles.Thumbnail} />
                </View>
              </View>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: width / 1.3,
                  justifyContent: "center",
                  marginBottom: 20
                }}
              >
                <Left />
                <Body style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#5B86E5",
                      fontSize: 15,
                      fontWeight: "500"
                    }}
                  >
                    LOG IN
                  </Text>
                </Body>
                <Right>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ContactSupport")
                    }
                  >
                    <Icon
                      name="questioncircleo"
                      type="AntDesign"
                      style={{ color: "#5B86E5", fontSize: 16 }}
                    />
                  </TouchableOpacity>
                </Right>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-start" }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "bold", color: "black" }}
                >
                  Mobile Number / Email
                </Text>
                <TextInput
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
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  type="text"
                  placeholder="Your Mobile Number / Email"
                  placeholderTextColor="rgb(215,215,215)"
                />
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-start" }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "bold", color: "black" }}
                >
                  Password
                </Text>
                <TextInput
                  style={{
                    alignItems: "flex-end",
                    width: width / 1.2,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "rgb(52, 182, 215)",
                    fontSize: 13
                  }}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  secureTextEntry={true}
                  type="text"
                  placeholder="Password"
                  placeholderTextColor="rgb(215,215,215)"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ResetPassword", {
                  goBack: "Login"
                })
              }
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingRight: 30
              }}
            >
              <Text style={{ fontSize: 13, color: "rgb(74,74,74)" }}>
                Forget Password?
              </Text>
            </TouchableOpacity>

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
                  onPress={() => this.reduxLogin()}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      //  </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logMeIn: () => dispatch({ type: "LOGIN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  Thumbnail: {
    backgroundColor: "rgb(215, 215, 215)"
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

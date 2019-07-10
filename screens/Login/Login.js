import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Alert
} from "react-native";
import { Icon, Left, Body, Right, Thumbnail } from "native-base";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { Notifications, Permissions } from "expo";
// import * as Permissions from "expo-permissions";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "jukes@test.io",
      password: "12345678"
    };
  }

  /**
  |--------------------------------------------------
  | Login Implementing Redux
  |--------------------------------------------------
  */
  reduxLogin = () => {
    if (this.state.email.length < 5 || !this.state.email.includes("@"))
      alert(`Please enter a valid email address.`);
    else if (this.state.password.length < 6) alert(`Please enter a password.`);
    else {
      fetch(`${url}/api/users/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this._storeData(data.token, data.user).then(() => {
              this.registerForPushNotificationsAsync();
              this.props.logMeIn();
            });
          } else alert(data.message);
        })
        .catch(err => {
          //To be removed in production
          console.log("Error for login:", err);

          Alert.alert(
            "Error connecting to server",
            `Please try again later`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
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
      await AsyncStorage.setItem("userType", userDetails.user_type);

      // console.log('Saved')
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

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return fetch(`${url}/api/users/updatePush`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        email: this.state.email
      })
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: 100, width: 200 }} />
            <Text>Log in with your social account</Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Sign Up with your social account</Text>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Thumbnail style={styles.Thumbnail} />
                <Thumbnail style={styles.Thumbnail} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10
              }}
            >
              <Text>---------------- </Text>
              <Text> or </Text>
              <Text> ---------------- </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Left />
              <Body>
                <Text>Log in</Text>
              </Body>
              <Right style={{ paddingRight: 30 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ContactSupport")
                  }
                >
                  <Icon name="questioncircleo" type="AntDesign" />
                </TouchableOpacity>
              </Right>
            </View>
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Text>Mobile Number / Email</Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                type="text"
                placeholder="Email"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{ justifyContent: "center", alignItems: "flex-start" }}
            >
              <Text>Password</Text>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                secureTextEntry={true}
                type="text"
                placeholder="password"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ForgetPassword",{
              goBack:"Login"
            })}
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 30
            }}
          >
            <Text>Forget Password</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 30
            }}
          >
            <TouchableOpacity onPress={() => this.reduxLogin()}>
              <Text>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: "grey"
  }
});

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Platform
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import {
  Notifications,
  Permissions,
  LocalAuthentication,
  Expo,
  Constants
} from "expo";
import { connect } from "react-redux";

export class SignUpInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      CPassword: "",
      facebook_id: null,
      google_id: null,
      compatible: false,
      fingerprints: false,
      result: "",
      token: ""
    };
  }

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
  }

  /**
  |--------------------------------------------------
  | Sign Up Implementation
  |--------------------------------------------------
  */
  userSignUp = () => {
    fetch(`${url}/api/users/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        facebook_id: this.state.facebook_id,
        google_id: this.state.google_id,
        contact: this.props.navigation.state.params.contact,
        f_name: this.state.firstName,
        l_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          // this.props.navigation.navigate("Login");
          console.log("Sign Up info", data);
          Alert.alert(
            "Success",
            `${data.message}`,
            [{ text: "OK", onPress: () => this.reduxLogin() }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `Please check your internet or try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

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
              if (Platform.OS === "android") {
                this.showAndroidAlert();
              } else {
                this.scanFingerprint();
              }
              // this.props.logMeIn();
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

  /**
  |--------------------------------------------------
  | Implementation of Phone Touch ID 
  |--------------------------------------------------
  */

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let result = await LocalAuthentication.authenticateAsync(
      "Login with your Touch ID ."
    );
    this.login(result.success);
  };

  login = response => {
    if (response === true) {
      this.props.logMeIn();
    }
  };

  /**
|--------------------------------------------------
| Android Touch ID Integration
|--------------------------------------------------
*/
  showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan For Volet",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            this.scanFingerprint();
          }
        },
        {
          text: "Cancel",
          onPress: () => this.props.logMeIn(),

          style: "cancel"
        }
      ]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>First name</Text>
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
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              type="text"
              placeholder="Your first name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Last name</Text>
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
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              type="text"
              placeholder="Your last name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Email</Text>
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
              placeholder="Your email"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Password</Text>
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
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
              type="password"
              placeholder="Password"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Confirm Password</Text>
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
              onChangeText={CPassword => this.setState({ CPassword })}
              value={this.state.CPassword}
              secureTextEntry={true}
              type="password"
              placeholder="Confirm Password"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => this.userSignUp()}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
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
)(SignUpInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

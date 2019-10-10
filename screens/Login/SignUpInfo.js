import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { Expo, Constants } from "expo";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
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
      token: "",
      isEmailValid: false,
      signUpType: this.props.navigation.state.params.signUpType,
      socialToken: this.props.navigation.state.params.socialToken,
      socialDetails: this.props.navigation.state.params.socialDetails,
      notificationToken: ""
    };
  }

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkUserInput();
    this.registerForPushNotificationsAsync();
  }

  checkUserInput = () => {
    if (this.state.socialDetails.name) {
      let firstName = this.state.socialDetails.name.split(" ")[0];
      let lastName = this.state.socialDetails.name.split(" ")[1];
      this.setState({ firstName });
      this.setState({ lastName });
    }
    if (this.state.socialDetails.email) {
      this.setState({ email: this.state.socialDetails.email });
    }
  };
  /**
  |--------------------------------------------------
  | Sign Up Implementation
  |--------------------------------------------------
  */
  userSignUp = () => {
    if (this.state.isEmailValid === false) {
      alert("Invalid Email");
    } else if (this.state.password !== this.state.CPassword) {
      alert("Password is not matching");
    } else if (this.state.password.length < 8) {
      alert("Password length needs to be 8 characters or more.");
    } else {
      let googleToken, fbToken;
      if (this.state.signUpType === "google") {
        googleToken = this.state.socialToken;
      } else if (this.state.signUpType === "facebook") {
        fbToken = this.state.socialToken;
      }
      fetch(`${url}/users`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-tac-token": this.props.navigation.state.params.token
        },
        body: JSON.stringify({
          // facebook_id: this.state.facebook_id.id,
          facebook_token: fbToken,
          google_token: googleToken,
          f_name: this.state.firstName,
          l_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // this.props.navigation.navigate("Login");
            console.log("Sign Up info", data);
            alert("Successfully Signed Up");
            this.reduxLogin();
          }
        })
        .catch(error => {
          Alert.alert(
            "Error connecting to server",
            `${error}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  socialSignUp = () => {
    if (!this.state.email.includes("@")) {
      alert("Invalid Email");
    } else {
      fetch(`${url}/users`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-tac-token": this.props.navigation.state.params.token
        },
        body: JSON.stringify({
          // facebook_id: this.state.facebook_id.id,
          facebook_token: this.state.fbToken,
          google_token: this.state.google_id,
          f_name: this.state.firstName,
          l_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("Sign Up info", data);
            Alert.alert(
              "Successfully",
              `Successfully Signed Up`,
              [{ text: "OK", onPress: () => this.reduxLogin() }],
              { cancelable: false }
            );
          }
        })
        .catch(error => {
          Alert.alert(
            "Error connecting to server",
            `${error}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  /**
  |--------------------------------------------------
  | Login Implementing Redux
  |--------------------------------------------------
  */
  reduxLogin = () => {
    fetch(`${url}/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        facebook_token: this.state.fbToken,
        google_token: this.state.google_id,
        login_input: this.state.email,
        password: this.state.password,
        push_token: this.state.notificationToken
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this._storeData(data.token, data.user).then(() => {
            this.login(true);
            /*if (this.state.compatible && this.state.fingerprints) {
              if (Platform.OS === "android") {
                this.showAndroidAlert();
              } else {
                this.scanFingerprint();
              }
            }*/
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
    let token = await Notifications.getExpoPushTokenAsync();
    return this.setState({ notificationToken: token });
  };

  /**
  |--------------------------------------------------
  | Implementation of Phone Touch ID 
  |--------------------------------------------------
  */

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({compatible});
    if (compatible) {
      let fingerprints = await LocalAuthentication.isEnrolledAsync();
      this.setState({fingerprints});
    }
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

  inputEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) === false) {
      this.setState({ isEmailValid: false });
    } else {
      email.trim();
      this.setState({ isEmailValid: true });
    }
    this.setState({ email });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
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
                First name
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
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                type="text"
                placeholder="Your first name"
                placeholderTextColor="rgb(215,215,215)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 20
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
                Last name
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
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
                type="text"
                placeholder="Your last name"
                placeholderTextColor="rgb(215,215,215)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: 20
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
                Email
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
                onChangeText={email => this.inputEmail(email)}
                value={this.state.email}
                type="text"
                placeholder="Your email"
                placeholderTextColor="rgb(215,215,215)"
              />
              {/* { this.state.isEmailValid === false ? <Text>Invalid email</Text>: null} */}
            </View>
            {this.state.signUpType === "Number" ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginBottom: 20
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: "black" }}
                >
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
                  onChangeText={password =>
                    this.onActionCheckPassword(password)
                  }
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
            ) : null}
            {this.state.signUpType === "Number" ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginBottom: 20
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: "black" }}
                >
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
            ) : null}
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
                  onPress={
                    this.state.signUpType === "Number"
                      ? () => this.userSignUp()
                      : () => this.socialSignUp()
                  }
                >
                  <Text style={styles.loginText}>Next</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

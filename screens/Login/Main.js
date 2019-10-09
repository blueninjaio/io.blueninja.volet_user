import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform,
  Image
} from "react-native";
// import { LocalAuthentication, Expo, Constants, LinearGradient } from "expo";
import * as LocalAuthentication from "expo-local-authentication";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
export const { width, height } = Dimensions.get("window");

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compatible: false,
      fingerprints: false,
      result: "",
      token: ""
    };
  }

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    this.getToken();
  }

  /**
  |--------------------------------------------------
  | Implementation of retrieving User Token
  |--------------------------------------------------
  */
  getToken = async () => {
    try {
      let value = await AsyncStorage.getItem("token");
      if (value !== null) {
        this.setState({ token: value });
        if (Platform.OS === "android") {
          this.showAndroidAlert();
        } else {
          this.scanFingerprint();
        }
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `Please check your internet or try again later`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
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
      "Scan your finger."
    );
    console.log("Touch ID", result);
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
      "Fingerprint Scan",
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
          // onPress: () => this.props.navigation.navigate("Login"),
          onPress: () => this.props.logMeIn(),

          style: "cancel"
        }
      ]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SignUpView}>
          <Image
            source={require("../../assets/voletBlueLogo.png")}
            resizeMode="contain"
            style={styles.Logo}
          />
        </View>

        <View style={styles.buttonSignUp}>
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            onPress={
              this.state.token !== ""
                ? () => this.getToken()
                : () => this.props.navigation.navigate("Login")
            }
            style={styles.buttonStyle2}
          >
            <Text style={styles.loginText}>Log In</Text>
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
)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    height: width / 1.3,
    width: width / 1.3
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    position: "absolute",
    bottom: 70
  },

  signupText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  },

  loginText: {
    color: "#5B86E5",
    fontWeight: "500",
    fontSize: 16
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.5,
    borderRadius: 10
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10
  }
});

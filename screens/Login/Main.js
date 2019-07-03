import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform
} from "react-native";
import { LocalAuthentication, Expo, Constants } from "expo";
export const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";

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
    console.log("Scan Result:", result.success);
    this.login(result.success);
  };

  login = response => {
    console.log("Response from Touch ID", response);
    if (response === true) {
      // this.props.navigation.navigate("Home");
      this.props.logMeIn();
    }
  };

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
          onPress: () => console.log("Cancel"),
          style: "cancel"
        }
      ]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SignUpView}>
          <View style={styles.Logo} />
          <View style={styles.buttonSignUp}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
              style={styles.buttonStyle}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                this.state.token !== ""
                  ? () => this.getToken()
                  : () => this.props.navigation.navigate("Login")
              }
              style={styles.buttonStyle2}
            >
              <Text>Log in</Text>
            </TouchableOpacity>
          </View>
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
    height: height / 1.1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    backgroundColor: "grey",
    height: 200,
    width: 200
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey"
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey",
    marginTop: 20
  }
});

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  SafeAreaView
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { LocalAuthentication, Expo, Constants } from "expo";

export class PaymentMethod extends Component {
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
    // this.getToken();
  }

  /**
      |--------------------------------------------------
      | Implementation of retrieving User Token
      |--------------------------------------------------
      */
  touchID = () => {
    if (Platform.OS === "android") {
      this.showAndroidAlert();
    } else {
      this.scanFingerprint();
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
    this.login(result.success);
  };

  login = method => {
    // if (response === true) {
      //   this.props.logMeIn();
      this.props.navigation.navigate("TransferSummary", {
        amount: this.props.navigation.state.params.amount,
        reason: this.props.navigation.state.params.reason,
        transferUser: this.props.navigation.state.params.transferUser,
        transferContact: this.props.navigation.state.params.transferContact,
        firstName: this.props.navigation.state.params.firstName,
        lastName: this.props.navigation.state.params.lastName,
        paymentMethod: method
      });
    // }
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
          onPress: () => null,

          style: "cancel"
        }
      ]
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15
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
              Payment Method
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              How would you like to transfer your money to yout friends
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.login("Volet")}
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 25,
            width: width,
            backgroundColor: "rgb(255,255,255)",
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 1
          }}
        >
          <Icon
            name="creditcard"
            type="AntDesign"
            style={{ marginLeft: 20, color: "#5B86E5" }}
          />
          <View style={{ paddingLeft: 20, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                color: "rgb(152,152,152)"
              }}
            >
              Volet
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.login("Online Banking")}
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 25,
            width: width,
            backgroundColor: "rgb(255,255,255)",
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 1
          }}
        >
          <Icon
            name="creditcard"
            type="AntDesign"
            style={{ marginLeft: 20, color: "#5B86E5" }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text
              style={{
                fontSize: 15,
                color: "rgb(152,152,152)"
              }}
            >
              Online Banking
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default PaymentMethod;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

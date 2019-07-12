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
  Platform
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

  login = response => {
    if (response === true) {
      //   this.props.logMeIn();
      this.props.navigation.navigate("TransferSummary",{
        amount:this.props.navigation.state.params.amount,
        reason:this.props.navigation.state.params.reason
      });
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
          onPress: () => null,

          style: "cancel"
        }
      ]
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <Text>Payment Method</Text>
            <Text>
              How would you like to transfer your money to yout friends
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              marginBottom: 10,
              flexDirection: "row",
              width: width / 1.4
            }}
            onPress={() => this.touchID()}
          >
            <Icon name="creditcard" type="AntDesign" />
            <Text style={{ marginLeft: 15 }}>Volet</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
              flexDirection: "row",
              width: width / 1.4
            }}
          >
            <Icon name="creditcard" type="AntDesign" />
            <Text style={{ marginLeft: 15 }}>Online Transfer</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
              flexDirection: "row",
              width: width / 1.4
            }}
          >
            <Icon name="creditcard" type="AntDesign" />
            <Text style={{ marginLeft: 15 }}>Cerdit card</Text>
          </View>
        </View>
      </View>
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

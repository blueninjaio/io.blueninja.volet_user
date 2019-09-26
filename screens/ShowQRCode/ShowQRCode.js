import React, { Component } from "react";
export const { width, height } = Dimensions.get("window");
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  LayoutAnimation
} from "react-native";
import { dev, prod, url } from "../../config/index";
// import { BarCodeScanner, Permissions, LinearGradient } from "expo";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient'
import * as Permissions from 'expo-permissions'
import { NavigationEvents } from "react-navigation";
import QRCode from "react-native-qrcode-svg";

export class ShowQRCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      userType: "",
      selectedValue: "Scan QR",
      token: ""
    };
  }
  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
    this.getPermissionAsync();
  };

  getUserID = async () => {
    try {
      let id = await AsyncStorage.getItem("ID");
      let userType = await AsyncStorage.getItem("userType");
      let token = await AsyncStorage.getItem("token");
      if (id !== null) {
        this.setState({ id });
        this.setState({ userType });
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
  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Image picker
  |--------------------------------------------------
  */

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = result => {
    //   text.split(".")[1].length > 2
    console.log("Scanning")
    console.log("Bar code 1", result);
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      console.log("Bar code", result);
      this.setState({ lastScannedUrl: result.data });
      this.getUserDetails(result.data);
    }
  };

  getUserDetails = userID => {
    let ID = userID.split("_")[0];
    fetch(`${url}/users/${ID}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("User Details :", data);
        if (data.success === true) {
          this.props.navigation.navigate("PaymentAmount", {
            transferUser: data.user.f_name + " " + data.user.l_name,
            transferContact: data.user.contact,
            firstName: data.user.f_name,
            lastName: data.user.l_name,
            transferUserID: ID
          });
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  switchScreen = title => {
    this.setState({ selectedValue: title });
  };

  render() {
    const { id, hasCameraPermission, scanned, userType } = this.state;
    return (
      <View style={styles.container}>
        {this.state.selectedValue === "Scan QR" ? (
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: width / 1.3,
                  marginTop: 20,
                  marginBottom: height * 0.03
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    color: "#5B86E5",
                    fontSize: 18,
                    fontWeight: "600"
                  }}
                >
                  Scan A QR Code
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Show your QR Code to a friend to receive payment.
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <QRCode value={id + "_" + userType} size={250} />
              </View>
            </View>
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
                  onPress={() => this.switchScreen("Show QR")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Scan A QR Code!</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: width / 1.3,
                  marginTop: 20,
                  marginBottom: height * 0.03
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    color: "#5B86E5",
                    fontSize: 18,
                    fontWeight: "600"
                  }}
                >
                  Show A QR Code
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Scan a Volet OR Code to send payment or collect money from
                  agent
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: height * 0.5
                }}
              >
                {this.state.hasCameraPermission === null ? (
                  <Text>Requesting for camera permission</Text>
                ) : this.state.hasCameraPermission === false ? (
                  <Text style={{ color: "#fff" }}>
                    Camera permission is not granted
                  </Text>
                ) : (
                  <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}
                    style={{
                      // height: height / 2.5,
                      flex: 1,
                      width: width
                    }}
                  />
                )}
              </View>
            </View>

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
                  onPress={() => this.switchScreen("Scan QR")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Show QR Code!</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default ShowQRCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: height / 4
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

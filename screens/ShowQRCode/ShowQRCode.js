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
import { LinearGradient } from "expo";
import { dev, prod, url } from "../../config/index"
import { BarCodeScanner, Permissions } from "expo";
import { NavigationEvents } from "react-navigation";
import QRCode from "react-native-qrcode-svg";

export class ShowQRCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      userType: "",
      selectedValue: "Scan QR"
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
      if (id !== null) {
        console.log("User type", userType);
        console.log("QR Code value", id + "_" + userType);
        this.setState({ id });
        this.setState({ userType });
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
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      console.log("Bar code", result);
      this.setState({ lastScannedUrl: result.data });
      this.getUserDetails(result.data);
    }
  };

  getUserDetails = userID => {
    let ID = userID.split("_")[0]
    console.log("Splits ID", ID )
    fetch(`${url}/api/users/id`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        _id: ID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("User Details :", data);
        if (data.success === true) {
          Alert.alert(
            "QR Code",
            `${userID}`,
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("PaymentAmount",{
                    userDetails: data.user
                })
              }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server Volet",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  switchScreen = title => {
    this.setState({ selectedValue: title });
  };

  render() {
    const { id, userType, hasCameraPermission, scanned } = this.state;
    return (
      <View style={styles.container}>
        {this.state.selectedValue === "Scan QR" ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: width / 1.2,
                marginTop: 20,
                height: height / 6
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Scan A QR Code
              </Text>
              <Text>Show your QR Code to a friend to receive payment.</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: height / 3
              }}
            >
              <QRCode value={id + "_" + userType} size={250} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: height / 3
              }}
            >
              <TouchableOpacity onPress={() => this.switchScreen("Show QR")}>
                <Text>Scan a QR Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: width / 1.2,
                marginTop: 20,
                height: height / 6
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Show A QR Code
              </Text>
              <Text>Show your QR Code to a friend to receive payment.</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: height / 3
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
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: height / 2.5,
                    width: width
                  }}
                />
              )}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: height / 3
              }}
            >
              <TouchableOpacity onPress={() => this.switchScreen("Scan QR")}>
                <Text>Show QR Code</Text>
              </TouchableOpacity>
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
  }
});
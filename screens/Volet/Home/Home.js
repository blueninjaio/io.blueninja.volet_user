import React from "react";
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
  LayoutAnimation,
  SafeAreaView
} from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Title,
  Icon
} from "native-base";
import { LinearGradient } from "expo";
import SwipeUpDown from "react-native-swipe-up-down";
import { dev, prod, url } from "../../../config/index";
import { BarCodeScanner, Permissions } from "expo";
import { NavigationEvents } from "react-navigation";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      balance: 0,
      animation: "easeInEaseOut",
      hasCameraPermission: null,
      lastScannedUrl: null,
      savings: 0,
      token: "",
      userImage: ""
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
      let token = await AsyncStorage.getItem("token");
      let username = await AsyncStorage.getItem("firstname");
      if (token !== null) {
        this.getVolet(token);
        this.setState({ username });
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

  getVolet = async token => {
    try {
      fetch(`${url}/users/me`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(data => {
          // console.log("Users :", data);
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            this.setState({ savings: data.user.monthly_savings });
            if (data.user.photo_url) {
              this.setState({ userImage: data.user.photo_url });
            }
            this.UserType(data.user.user_type);
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
    } catch (error) {
      console.log(error);
    }
  };

  UserType = async userType => {
    try {
      await AsyncStorage.setItem("userType", userType);
    } catch (error) {
      console.log(error);
    }
  };

  isToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      console.log("Bar code", result);
      this.setState({ lastScannedUrl: result.data });
      Alert.alert(
        "QR Code",
        `${result.data}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  switchScreen = () => {
    this.props.navigation.navigate("ShowQRCode");
  };

  render() {
    const { hasCameraPermission, scanned, isOpen } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={
            isOpen
              ? [{ backgroundColor: "transparent", opacity: 0.4, flex: 1 }]
              : [{ flex: 1 }]
          }
        >
          <NavigationEvents onWillFocus={payload => this.getUserID()} />
          <StatusBar />
          <ScrollView>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.header}
            >
              <Header style={styles.headerOne}>
                <Left />
                <Body style={styles.headerOneBody}>
                  <Image
                    source={require("../../../assets/VoletLogo.png")}
                    resizeMode="contain"
                    style={{ width: 90, height: 90 }}
                  />
                </Body>
                <Right style={styles.headerOneRight}>
                  <TouchableOpacity onPress={() => this.isToggleOpen()}>
                    <Image
                      source={require("../../../assets/bell.png")}
                      resizeMode="contain"
                      style={{ width: 22, height: 22 }}
                    />
                  </TouchableOpacity>
                </Right>
              </Header>
              <View style={styles.welcomeUser}>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 17,
                    color: "white",
                    opacity: 0.7
                  }}
                >
                  Welcome back,
                </Text>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  {this.state.username}
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.userVolet}>
              {this.state.userImage ? (
                <Thumbnail
                  large
                  source={{
                    uri: `https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/user-512.png`
                  }}
                  style={{ borderColor: "white" }}
                />
              ) : (
                <Thumbnail
                  large
                  source={{
                    uri: `https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/user-512.png`
                  }}
                  style={{ borderColor: "white" }}
                />
              )}

              <View style={styles.voletBalance}>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 17,
                    color: "grey",
                    opacity: 0.9
                  }}
                >
                  Your Volet Balance
                </Text>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  RM{this.state.balance}
                </Text>
              </View>
            </View>
            <View style={styles.savingsCard}>
              <View style={styles.savingsCardTwo}>
                <Body style={{ padding: 5, alignItems: "center" }}>
                  <Text
                    style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}
                  >
                    Balance available today
                  </Text>
                  <Text style={{ color: "green", paddingBottom: 5 }}>
                    RM {this.state.savings}
                  </Text>
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={styles.savingsBar}
                  />
                  <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>
                    Monthly Savings Plan: RM {this.state.savings}/day
                  </Text>
                </Body>
              </View>
            </View>
            <View style={styles.payments}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SendPayment", {
                    token: this.state.token
                  })
                }
              >
                <Image
                  source={require("../../../assets/sendP.png")}
                  resizeMode="contain"
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("RequestPayment", {
                    token: this.state.token
                  })
                }
              >
                <Image
                  source={require("../../../assets/requestP.png")}
                  resizeMode="contain"
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("VoletBalance")}
              >
                <Image
                  source={require("../../../assets/topUP.png")}
                  resizeMode="contain"
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.qrcode}
            // onPress={() => this.swipeUpDownRef.showFull()}
            onPress={() => this.props.navigation.navigate("ShowQRCode")}
          >
            <Card style={{ width: width }}>
              <CardItem>
                <Body
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../../../assets/qrcode.png")}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={{ paddingLeft: 10 }}>
                    Swipe up To scan QR Code
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </View>
        {this.state.isOpen ? (
          <View
            style={{
              position: "absolute",
              width: width * 0.9,
              height: "100%",
              right: 0,
              top: 0,
              zIndex: 1,
              backgroundColor: "white"
            }}
          >
            <Header style={styles.headerNotification}>
              <Left />
              <Body style={styles.headerOneBody}>
                <Text style={{ color: "#5B86E5", fontSize: 17 }}>
                  Notifications
                </Text>
              </Body>
              <Right style={styles.headerOneRight}>
                <TouchableOpacity onPress={() => this.isToggleOpen()}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={{ color: "#5B86E5", fontSize: 20 }}
                  />
                </TouchableOpacity>
              </Right>
            </Header>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: 15
              }}
            >
              <Image
                source={require("../../../assets/wallet.png")}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
              <Text></Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: height * 0.26
  },
  headerOne: {
    backgroundColor: "transparent",
    borderColor: null,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0
  },

  headerNotification: {
    backgroundColor: "white",
    borderColor: null,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0
  },
  headerOneBody: {
    alignItems: "center",
    flex: 1
  },
  headerOneRight: {
    alignItems: "center",
    flex: 1
  },
  welcomeUser: {
    alignItems: "center"
    // flexDirection:"row"
  },
  userVolet: {
    marginTop: -40,
    justifyContent: "center",
    alignItems: "center"
  },
  voletBalance: {
    padding: 15,
    alignItems: "center"
  },
  savingsCard: {
    alignItems: "center"
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0
  },
  payments: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: height * 0.0312
  },
  qrcode: {
    justifyContent: "center",
    alignItems: "flex-end"
    // marginBottom: -5
  },
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  savingsCardTwo: {
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    // borderColor:"white",
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  }
});

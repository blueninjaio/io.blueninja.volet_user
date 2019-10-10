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
  SafeAreaView,
  TouchableHighlight
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
import { AntDesign } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import SwipeUpDown from "react-native-swipe-up-down";
import { dev, prod, url } from "../../../config/index";
import { NavigationEvents } from "react-navigation";
import Modal from "react-native-modal";

const NotificationType = {
  MESSAGE: 0,
  VOUCHER: 1,
  PAYMENT: 2
};
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
      userImage: "",
      paymentConfirmation: null,
      notifications: []
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

  _getLocationAsync = async token => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest
    });
    this.setState({ locationResult: JSON.stringify(location), location });
    // let DMS = this.convertDMS(
    //   location.coords.latitude,
    //   location.coords.longitude
    // );

    let newLocation =
      location.coords.latitude + "," + location.coords.longitude;

    console.log("Location", newLocation);

    setInterval(() => {
      this.updateUserLocation(newLocation, token);
    }, 1000 * 60);
  };

  updateUserLocation = async (location, token) => {
    try {
      fetch(`${url}/users/coordinates`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          coordinates: location
        })
      })
        .then(res => res.json())
        .then(data => {
          //console.log("Location :", data);
          if (data.success) {
            //console.log("Location success:", data);
          } else {
            alert(data.message);
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

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let username = await AsyncStorage.getItem("firstname");
      if (token !== null) {
        this.getVolet(token);
        this._getLocationAsync(token);
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

  convertPayment = (user, payment) => {
    const isSent = payment.from._id === user._id;
    const input = [];
    if (payment.status === "Complete") {
      if (isSent) {
        input.push({
          style: styles.listItemText,
          value: "Sent"
        });
        input.push({
          style: styles.listItemTextGreen,
          value: "MYR " + payment.amount
        });
        input.push({
          style: styles.listItemText,
          value: "to"
        });
        input.push({
          style: styles.listItemTextBold,
          value: payment.to.f_name + " " + payment.to.l_name
        });
      } else {
        input.push({
          style: styles.listItemText,
          value: "Received"
        });
        input.push({
          style: styles.listItemTextGreen,
          value: "MYR " + payment.amount
        });
        input.push({
          style: styles.listItemText,
          value: "from"
        });
        input.push({
          style: styles.listItemTextBold,
          value: payment.from.f_name + " " + payment.from.l_name
        });
      }
    } else {
      if (payment.status === "Requested") {
        if (isSent) {
          return undefined; //should never happen
        }
        input.push({
          style: styles.listItemTextBold,
          value: payment.from.f_name + " " + payment.from.l_name
        });
        input.push({
          style: styles.listItemText,
          value: "requested"
        });
        input.push({
          style: styles.listItemText,
          value: "to withdraw"
        });
        input.push({
          style: styles.listItemTextGreen,
          value: "MYR " + payment.amount
        });
      } else if (payment.status === "Pending") {
        if (isSent) {
          input.push({
            style: styles.listItemText,
            value: "I requested"
          });
          input.push({
            style: styles.listItemTextGreen,
            value: "MYR " + payment.amount
          });
          input.push({
            style: styles.listItemText,
            value: "from"
          });
          input.push({
            style: styles.listItemTextBold,
            value: payment.to.f_name + " " + payment.to.l_name
          });
        } else {
          input.push({
            style: styles.listItemTextBold,
            value: payment.from.f_name + " " + payment.from.l_name
          });
          input.push({
            style: styles.listItemText,
            value: "requested"
          });
          input.push({
            style: styles.listItemTextGreen,
            value: "MYR " + payment.amount
          });
          input.push({
            style: styles.listItemText,
            value: "from me"
          });
        }
      }
    }
    return {
      input,
      acronym: user.f_name.charAt(0) + user.l_name.charAt(0)
    };
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
          //console.log("Users :", data);
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            this.setState({ savings: data.user.monthly_savings });
            if (data.user.photo_base64) {
              this.setState({ userImage: data.user.photo_base64 });
            }
            let notifications = data.user.notifications.map(notification => {
              if (notification.message) {
                return {
                  type: NotificationType.MESSAGE,
                  message: notification.message
                };
              }
              if (notification.voucher) {
                return {
                  type: NotificationType.VOUCHER,
                  voucher: notification.voucher
                };
              }
              if (notification.payment) {
                return {
                  type: NotificationType.PAYMENT,
                  user: data.user._id,
                  payment: notification.payment,
                  ...this.convertPayment(data.user, notification.payment)
                };
              }
            });
            this.setState({ notifications });
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

  isToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleModal = payment => {
    this.setState({ isOpen: false });
    this.setState({ paymentConfirmation: payment });
  };
  confirmWithdraw = async accepted => {
    try {
      let result = await fetch(
        `${url}/volet/withdraw/${accepted ? "accept" : "reject"}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.state.token
          },
          body: JSON.stringify({
            payment_id: this.state.paymentConfirmation._id
          })
        }
      );
      let data = await result.json();
      console.log(data);
      if (data.success) {
        this.toggleModal();
      }
    } catch (e) {
      Alert.alert(
        "Error connecting to server Volet",
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
              <View style={styles.headerOne}>
                <Left style={styles.headerOneBody} />
                <Body style={styles.headerOneBody}>
                  <Image
                    source={require("../../../assets/VoletLogo.png")}
                    resizeMode="contain"
                    style={{ width: 90, height: 65 }}
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
              </View>
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
                    // uri: `${this.state.userImage}`
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
                  style={{ width: width * 0.212, height: width * 0.212 }}
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
                  style={{ width: width * 0.212, height: width * 0.212 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("VoletBalance")}
              >
                <Image
                  source={require("../../../assets/topUP.png")}
                  resizeMode="contain"
                  style={{ width: width * 0.212, height: width * 0.212 }}
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
                    Click here to scan QR Code
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
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Left style={styles.headerOneBody} />
              <Body style={styles.headerOneBody}>
                <Text style={{ color: "#5B86E5", fontSize: width * 0.05 }}>
                  Notifications
                </Text>
              </Body>
              <Right style={styles.headerOneRight}>
                <TouchableOpacity onPress={() => this.isToggleOpen()}>
                  <AntDesign
                    name="close"
                    style={{ color: "#5B86E5", fontSize: 20 }}
                  />
                </TouchableOpacity>
              </Right>
            </View>
            <View style={{ flex: 1 }}>
              {this.state.notifications.map((notification, i) => {
                if (notification.type === NotificationType.MESSAGE) {
                } else if (notification.type === NotificationType.VOUCHER) {
                } else if (notification.type === NotificationType.PAYMENT) {
                  return (
                    <View style={styles.shadowSet} key={i}>
                      <TouchableOpacity
                        onPress={() => {
                          let payment = notification.payment;
                          const isSent = payment.from._id === notification.user;
                          let recipient = isSent ? payment.to : payment.from;
                          if (payment.status === "Requested") {
                            this.toggleModal({
                              firstName: recipient.f_name,
                              lastName: recipient.l_name,
                              transferContact: recipient.contact,
                              isSent,
                              ...payment
                            });
                          } else {
                            let requestType =
                              payment.status === "Complete"
                                ? isSent
                                  ? "Sent"
                                  : "Received"
                                : "Request";
                            this.props.navigation.navigate(
                              "TransactionDetails",
                              {
                                firstName: recipient.f_name,
                                lastName: recipient.l_name,
                                transferContact: recipient.contact,
                                requestType,
                                amount: payment.amount,
                                isSent,
                                date: new Date(payment.date_created),
                                reason: payment.reason,
                                description: payment.description
                              }
                            );
                          }
                        }}
                        style={styles.listItemButton}
                      >
                        <View style={styles.show}>
                          <Image
                            source={require("../../../assets/wallet.png")}
                            resizeMode="contain"
                            style={{ width: 50, height: 50 }}
                          />
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "center",
                              marginLeft: 30
                            }}
                          >
                            <View
                              style={{
                                width: width / 2,
                                flexDirection: "row",
                                marginBottom: 8
                              }}
                            >
                              <Text style={notification.input[0].style}>
                                {notification.input[0].value}
                              </Text>
                              <Text style={notification.input[1].style}>
                                {notification.input[1].value}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: width / 2,
                                flexDirection: "row"
                              }}
                            >
                              <Text style={notification.input[2].style}>
                                {notification.input[2].value}
                              </Text>
                              <Text style={notification.input[3].style}>
                                {notification.input[3].value}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        ) : null}
        {!this.state.paymentConfirmation ? null : (
          <Modal
            transparent={true}
            style={styles.modalContent}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            isVisible={!!this.state.paymentConfirmation}
            backdropColor="black"
          >
            <View style={{ flexDirection: "row" }}>
              <Left style={{ flex: 1 }} />
              <Body style={{ flex: 1 }}>
                <Title style={{ color: "#5B86E5" }}>Withdraw Request</Title>
              </Body>
              <Right style={{ flex: 1 }} />
            </View>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={{
                borderRadius: 30,
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                {this.state.paymentConfirmation.firstName.charAt(0) +
                  this.state.paymentConfirmation.lastName.charAt(0)}
              </Text>
            </LinearGradient>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", marginBottom: 5 }}
              >
                {this.state.paymentConfirmation.firstName +
                  " " +
                  this.state.paymentConfirmation.lastName}
              </Text>
              <Text style={{ color: "#979797" }}>
                {this.state.paymentConfirmation.transferContact}
              </Text>
              <Text
                style={{ color: "black", fontWeight: "bold", marginBottom: 5 }}
              >
                Is requesting to withdraw
              </Text>
              <Text style={{ color: "#5B86E5" }}>
                MYR {this.state.paymentConfirmation.amount}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 50
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}
                style={{
                  width: width / 1.2,
                  marginBottom: 10
                }}
              >
                <LinearGradient
                  colors={["#36D1DC", "#5B86E5"]}
                  style={styles.buttonStyle}
                >
                  <View style={styles.buttonStyle}>
                    <Text style={styles.loginText}>Accept</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}
                style={{
                  width: width / 1.2
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.confirmWithdraw(true);
                  }}
                  style={{
                    width: width / 1.2,
                    marginBottom: 10
                  }}
                >
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={styles.buttonStyle}
                  >
                    <View style={styles.buttonStyle}>
                      <Text style={styles.loginText}>Accept</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.confirmWithdraw(false);
                  }}
                  style={{
                    width: width / 1.2
                  }}
                >
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={styles.buttonStyle}
                  >
                    <View style={styles.buttonStyle}>
                      <Text style={styles.loginText}>Reject</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
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
    height: 180
    // paddingTop: 15
    // paddingTop: 20
  },
  headerOne: {
    // backgroundColor: "transparent",
    // borderColor: null,
    // justifyContent: "center",
    // alignItems: "center",
    // borderBottomWidth: 0,
    // shadowColor: "transparent",
    // shadowOpacity: 0
    flexDirection: "row"
    //     // borderBottomWidth: 0,
    // // shadowColor: "transparent",
    // backgroundColor: "white"
    // // shadowOpacity: 0
  },

  headerNotification: {
    // backgroundColor: "white",
    // borderColor: null,
    // justifyContent: "center",
    // alignItems: "center",
    // borderBottomWidth: 0,
    // shadowColor: "transparent",
    // shadowOpacity: 0,
    // marginBottom: 20
  },
  headerOneBody: {
    alignItems: "center"
    // flex: 1
  },
  headerOneRight: {
    // alignItems: "center",
    marginRight: 10
    // flex: 1
  },
  welcomeUser: {
    alignItems: "center"
    // paddingTop: 20
    // flexDirection:"row"
  },
  userVolet: {
    marginTop: -height * 0.0432,
    justifyContent: "center",
    alignItems: "center"
  },
  voletBalance: {
    padding: 5,
    alignItems: "center"
  },
  savingsCard: {
    alignItems: "center"
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  listItemButtonSwitch: {
    padding: 10,
    // borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemButton: {
    padding: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 5
  },
  listItemTextGreen: {
    fontSize: 15,
    color: "green",
    marginLeft: 5
  },
  listItemTextBold: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5
  },

  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    // borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.3,
    alignItems: "center",
    flexDirection: "row"
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
  },
  modalContent: {
    // backgroundColor: "pink",
    padding: 10,
    // // justifyContent: "center",
    // alignItems: "center",
    // // borderRadius: 8,
    // borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: height / 5,
    marginBottom: height / 5,
    // marginRight: 20,
    // marginLeft: 20
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});

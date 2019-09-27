import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  AsyncStorage,
  Linking,
  Image
} from "react-native";
import { Icon, Left, Right, Body, Title } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config/index";
import Modal from "react-native-modal";
import { Input } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

export class VoletBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "Top Up",
      isModalVisible: false,
      voucherCode: "",
      username: "",
      id: "",
      balance: 0,
      isCreditModal: false,
      addCash: false,
      price: "",
      token: ""
    };
  }

  /**
|--------------------------------------------------
| Implementing Onclick functions to update states
|--------------------------------------------------
*/
  Onclick = value => {
    this.setState({ selectedValue: value });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleCredit = () => {
    this.setState({ isCreditModal: !this.state.isCreditModal });
  };

  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
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
          console.log("Users :", data);
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            this.setState({ savings: data.user.monthly_savings });
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

  redeemVoucher = () => {
    fetch(`${url}/vouchers/redeem`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      },
      body: JSON.stringify({
        code: this.state.voucherCode
        // user: this.state.username,
        // user_id: this.state.id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Redeem voucher :", data);
        console.log("ismodal :", this.state.isModalVisible);
        if (data.success === true) {
          Alert.alert(
            "Success",
            `${data.message}`,
            [
              {
                text: "OK",
                onPress: () => {
                  this.toggleModal(), this.getVolet(this.state.id);
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Fail",
            `${data.message}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server Reedem",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  onActionAddVoletCash = async amount => {
    try {
      fetch(`${url}/volet/top-up`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.state.token
        },
        body: JSON.stringify({
          amount: amount,
          redirect_url: "http://localhost"
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Payment :", data);
          if (data.success === true) {
            this.setState({ isCreditModal: !this.state.isCreditModal });
            this.props.navigation.navigate("OpenWebView", {
              payment: data.bill.url,
              redirectCallback: async params => {
                console.log("params", params);
                Alert.alert(
                  "Success",
                  `Payment Success`,
                  [
                    {
                      text: "OK",
                      onPress: () => this.props.navigation.navigate("Home")
                    }
                  ],
                  { cancelable: false }
                );
              }
            });
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

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderColor: "#ddd",
            width: width
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#5B86E5" }}>
            MYR {this.state.balance}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width / 1.5,
              alignItems: "center",
              padding: 15
            }}
          >
            {this.state.selectedValue === "Top Up" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1.5,
                  borderColor: "#5B86E5"
                }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text style={{ color: "rgb(74, 74, 74)" }}>Top Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text style={{ color: "rgb(74, 74, 74)" }}>Top Up</Text>
              </TouchableOpacity>
            )}

            {this.state.selectedValue === "Widthdraw" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1.5,
                  borderColor: "#5B86E5"
                }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text style={{ color: "rgb(74, 74, 74)" }}>Widthdraw</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text style={{ color: "rgb(74, 74, 74)" }}>Widthdraw</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.state.selectedValue === "Top Up" ? (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.savingsCardTwo}
                onPress={() => this.toggleModal()}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    paddingLeft: 30,
                    width: width / 1.8,
                    alignItems: "center",
                    height: height * 0.089
                    // marginBottom: 10,
                    // backgroundColor: "grey"
                  }}
                >
                  <Image
                    //   source={{uri: this.props.icon}}
                    source={require("../../assets/wallet.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={{
                      color: "rgb(74, 74, 74)",
                      paddingLeft: 30,
                      fontWeight: "500"
                    }}
                  >
                    Voucher code
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.savingsCardTwo}
                onPress={() => this.toggleCredit()}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 30,
                    width: width / 1.8,
                    alignItems: "center",
                    height: height * 0.089

                    // marginBottom: 10,
                    // backgroundColor: "grey"
                  }}
                >
                  <Image
                    //   source={{uri: this.props.icon}}
                    source={require("../../assets/credit.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={{
                      color: "rgb(74, 74, 74)",
                      paddingLeft: 30,
                      fontWeight: "500"
                    }}
                  >
                    Credit / Debit Card
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.savingsCardTwo}
                onPress={() => this.props.navigation.navigate("WithdrawAgent")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 30,
                    width: width / 1.8,
                    alignItems: "center",
                    height: height * 0.089

                    // marginBottom: 10,
                    // backgroundColor: "grey"
                  }}
                >
                  <Image
                    //   source={{uri: this.props.icon}}
                    source={require("../../assets/wallet.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={{
                      color: "rgb(74, 74, 74)",
                      paddingLeft: 30,
                      fontWeight: "500"
                    }}
                  >
                    From Agent
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsCardTwo}
                onPress={() => this.props.navigation.navigate("TransferToBAcc")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 30,
                    width: width / 1.3,
                    alignItems: "center",
                    height: height * 0.089

                    // marginBottom: 10,
                    // backgroundColor: "grey"
                  }}
                >
                  <Image
                    //   source={{uri: this.props.icon}}
                    source={require("../../assets/wallet.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={{
                      color: "rgb(74, 74, 74)",
                      paddingLeft: 30,
                      fontWeight: "500"
                    }}
                  >
                    Transfer to Bank Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Modal
          transparent={true}
          //   backdropColor="black"
          // visible={this.state.isModalVisible}
          style={styles.modalContent}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          isVisible={this.state.isCreditModal}
          // deviceWidth={10}
          // deviceHeight={250}
          backdropColor="black"
          // backdropOpacity={0.2}
        >
          <View style={{ flexDirection: "row" }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Title style={{ color: "#5B86E5", width: width / 1.5 }}>
                Credit / Debits Card
              </Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleCredit();
                }}
              >
                <Icon style={{ color: "#5B86E5" }} name="close" />
              </TouchableHighlight>
            </Right>
          </View>

          <Text
            style={{
              color: "grey",
              fontSize: 18,
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            Top Up Amount
          </Text>
          {this.state.addCash ? (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: width / 1.3,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 20
                }}
              >
                <Input
                  inputStyle={{
                    flex: 1,
                    alignSelf: "center",
                    color: "black",
                    fontSize: 18,
                    paddingLeft: 8
                  }}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5"
                  }}
                  // onChangeText={price => this.checkVoletBalance(price)}
                  onChangeText={price => this.setState({ price })}
                  value={this.state.price}
                  keyboardType="numeric"
                  placeholderTextColor="rgb(74,74,74)"
                  leftIcon={
                    <Text style={{ fontSize: 18, color: "#5B86E5" }}>MYR</Text>
                  }
                />
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
                    this.onActionAddVoletCash(this.state.price);
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
                      <Text style={styles.loginText}>Next</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: width / 1.3,
                  paddingBottom: 15
                }}
              >
                <View style={styles.shadowSet}>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "white",
                      borderRadius: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.onActionAddVoletCash("2000")}
                  >
                    <Image
                      source={require("../../assets/RM20.png")}
                      resizeMode="contain"
                      style={{ width: width * 0.22, height: width * 0.22 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.shadowSet}>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "white",
                      borderRadius: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.onActionAddVoletCash("5000")}
                  >
                    <Image
                      source={require("../../assets/RM50.png")}
                      resizeMode="contain"
                      style={{ width: width * 0.22, height: width * 0.22 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: width / 1.3,
                  paddingBottom: 15
                }}
              >
                <View style={styles.shadowSet}>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "white",
                      borderRadius: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.onActionAddVoletCash("10000")}
                  >
                    <Image
                      source={require("../../assets/RM100.png")}
                      resizeMode="contain"
                      style={{ width: width * 0.22, height: width * 0.22 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.shadowSet}>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: "white",
                      borderRadius: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.setState({ addCash: true })}
                  >
                    <Image
                      source={require("../../assets/RMother.png")}
                      resizeMode="contain"
                      style={{ width: width * 0.22, height: width * 0.22 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Modal>
        <Modal
          transparent={true}
          //   backdropColor="black"
          // visible={this.state.isModalVisible}
          style={styles.modalContent}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          isVisible={this.state.isModalVisible}
          // deviceWidth={10}
          // deviceHeight={250}
          backdropColor="black"
          // backdropOpacity={0.2}
        >
          <View style={{ flexDirection: "row" }}>
            <Left />
            <Body>
              <Title style={{ color: "#5B86E5" }}>Voucher</Title>
            </Body>
            <Right>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal();
                }}
              >
                <Icon style={{ color: "#5B86E5" }} name="close" />
              </TouchableHighlight>
            </Right>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 50
            }}
          >
            <Text style={{ color: "rgb(74, 74, 74)", marginBottom: 15 }}>
              Voucher code
            </Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.5,
                // borderRadius: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                height: 20,
                color: "black"
              }}
              onChangeText={voucherCode => this.setState({ voucherCode })}
              value={this.state.voucherCode}
              type="text"
              // placeholder="voucher Code"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ position: "absolute", bottom: 50 }}>
            <TouchableOpacity
              onPress={() => {
                this.redeemVoucher();
              }}
            >
              <Image
                source={require("../../assets/check.png")}
                style={{ width: 45, height: 45, marginBottom: 30 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default VoletBalance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30
  },
  text: {
    color: "#979797",
    fontSize: 20
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
  },
  savingsCardTwo: {
    width: width / 1.2,
    marginBottom: 10,
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
  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 60,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
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

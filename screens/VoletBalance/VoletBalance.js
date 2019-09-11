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
  AsyncStorage
} from "react-native";
import { Icon, Left, Right, Body, Title } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import Modal from "react-native-modal";
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
      isCreditModal: false
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
                  borderColor: "blue"
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
                  borderColor: "blue"
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
                  <Icon name="close" />

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
                  <Icon name="close" />

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
                  <Icon name="close" />
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
                  <Icon name="close" />
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
            <Left />
            <Body>
              <Title style={{ color: "#5B86E5" }}>Credit / Debits</Title>
            </Body>
            <Right>
              <TouchableHighlight
                onPress={() => {
                  this.toggleCredit();
                }}
              >
                <Icon style={{ color: "#5B86E5" }} name="close" />
              </TouchableHighlight>
            </Right>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "space",
              marginTop: 50
            }}
          ></View>
          <View style={{ position: "absolute", bottom: 50 }}>
            <TouchableOpacity
              onPress={() => {
                this.redeemVoucher();
              }}
            >
              <Icon name="check" type="Entypo" />
            </TouchableOpacity>
          </View>
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
              <Icon name="check" type="Entypo" />
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
  }
});

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
      balance: ""
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
      let id = await AsyncStorage.getItem("ID");
      let username = await AsyncStorage.getItem("firstname");
      if (id !== null) {
        this.getVolet(id);
        this.setState({ id });
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

  getVolet = ID => {
    fetch(`${url}/api/volet/id`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        persona_id: ID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Voucher :", data);
        if (data.success === true) {
          this.setState({ balance: data.total });
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

  redeemVoucher = () => {
    fetch(`${url}/api/vouchers/redeem`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: this.state.voucherCode,
        user: this.state.username,
        user_id: this.state.id
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
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            MYR{this.state.balance}
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
                  borderBottomWidth: 1,
                  borderColor: "blue"
                }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text>Top Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text>Top Up</Text>
              </TouchableOpacity>
            )}

            {this.state.selectedValue === "Widthdraw" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "blue"
                }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text>Widthdraw</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text>Widthdraw</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.state.selectedValue === "Top Up" ? (
            <View>
              <TouchableOpacity
                onPress={() => this.toggleModal()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8,
                  marginBottom: 10,
                  backgroundColor: "grey"
                }}
              >
                <Icon name="close" />

                <Text>Voucher code</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8,
                  backgroundColor: "grey"
                }}
              >
                <Icon name="close" />

                <Text>Credit / Debit Card</Text>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8
                }}
              >
                <Icon name="close" />
                <Text>From Agent</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8
                }}
              >
                <Icon name="close" />

                <Text>Transfer to Bank Account</Text>
              </View>
            </View>
          )}
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          //   backdropColor="black"
          visible={this.state.isModalVisible}
          style={styles.modalContent}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Left />
            <Body>
              <Title>Voucher</Title>
            </Body>
            <Right>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal();
                }}
              >
                <Icon name="close" />
              </TouchableHighlight>
            </Right>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Voucher Code</Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.8,
                paddingLeft: 20,
                // borderRadius: 20,
                height: 50,
                color: "rgb(74,74,74)",
                backgroundColor: "rgb(226,226,226)"
              }}
              onChangeText={voucherCode => this.setState({ voucherCode })}
              value={this.state.voucherCode}
              type="text"
              placeholder="voucher Code"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.redeemVoucher();
              }}
            >
              <Icon name="check" type="Entypo"/>
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
    backgroundColor: "pink",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: height / 5,
    marginBottom: height / 5,
    marginRight: 20,
    marginLeft: 20
  }
});

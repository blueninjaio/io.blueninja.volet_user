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
  AsyncStorage,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { Notifications, Permissions, LinearGradient } from "expo";
import { Input } from "react-native-elements";

export class PaymentAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      balance: "",
      errorMessage: "",
      transferUser: "",
      transferContact: ""
    };
  }

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
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
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
                  Amount To Pay
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  How much do you want to pay your friends
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                  marginBottom: 40,
                  width: width / 1.5
                  // paddingLeft: 10
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    width: width / 1.3
                  }}
                >
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={{
                      borderRadius: 30,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {this.props.navigation.state.params.firstName.substring(
                        0,
                        1
                      )}
                      {this.props.navigation.state.params.lastName.substring(
                        0,
                        1
                      )}
                    </Text>
                  </LinearGradient>
                  <View style={{ justifyContent: "center", paddingLeft: 10 }}>
                    <Text
                      style={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        color: "black",
                        fontSize: 17,
                        fontWeight: "600"
                      }}
                    >
                      {this.props.navigation.state.params.transferUser}
                    </Text>
                    <Text
                      style={{
                        color: "rgb(74,74,74)",
                        fontSize: 17
                      }}
                    >
                      {this.props.navigation.state.params.transferContact}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: width / 1.3,
                  flexDirection: "row",
                  justifyContent: "center"
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
                  onChangeText={price => this.setState({ price })}
                  value={this.state.price}
                  sst
                  keyboardType="numeric"
                  placeholderTextColor="rgb(74,74,74)"
                  leftIcon={<Text style={{ fontSize: 18 }}>MYR</Text>}
                />
              </View>

              {this.state.price === 0 ? (
                <View>
                  <Text style={{ color: "red" }}>
                    Amount is not suffcient to be transfered.
                  </Text>
                  <Text style={{ color: "red" }}>
                    Please increase the amount
                  </Text>
                </View>
              ) : this.state.price > this.state.balance ? (
                <Text style={{ color: "red" }}>
                  Amount exceeds from balance
                </Text>
              ) : this.state.balance === 0 ? (
                <Text style={{ color: "red" }}>Insuffcient Balance</Text>
              ) : this.state.price === 0 || this.state.balance === 0 ? (
                <Text style={{ color: "red" }}>Insuffcient Balance</Text>
              ) : null}

              {/* {this.state.errorMessage === "Amount Exceeds" ? (
                <Text style={{ color: "red" }}>
                  Amount exceeds from balance
                </Text>
              ) : this.state.errorMessage === "Not Suffcient" ? (
                <View>
                  <Text style={{ color: "red" }}>
                    Amount is not suffcient to be transfered.
                  </Text>
                  <Text style={{ color: "red" }}>
                    Please increase the amount
                  </Text>
                </View>
              ) : this.state.errorMessage === "Insuffcient" ||
                this.state.balance === 0 ? (
                <Text style={{ color: "red" }}>Insuffcient Balance</Text>
              ) : null} */}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 70,
            width: width
          }}
        >
          {this.state.balance === 0 || this.state.price > this.state.balance ? (
            <View>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.buttonStyle}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("VoletBalance")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Top Up Volet</Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("TransferReason", {
                    transferUser: this.props.navigation.state.params
                      .transferUser,
                    transferContact: this.props.navigation.state.params
                      .transferContact,
                    amount: this.state.price,
                    firstName: this.props.navigation.state.params.firstName,
                    lastName: this.props.navigation.state.params.lastName,
                    transferUserID: this.props.navigation.state.params
                      .transferUserID
                  })
                }
                style={styles.buttonStyle}
              >
                <Text style={{ color: "rgb(74, 74, 74)", marginTop: 10 }}>
                  Continue with other payment method
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.buttonStyle}
            >
              <TouchableOpacity
                disabled={
                  this.state.balance >= 1 && this.state.price >= 1
                    ? false
                    : true
                }
                onPress={() =>
                  this.props.navigation.navigate("TransferReason", {
                    transferUser: this.props.navigation.state.params
                      .transferUser,
                    transferContact: this.props.navigation.state.params
                      .transferContact,
                    amount: this.state.price,
                    firstName: this.props.navigation.state.params.firstName,
                    lastName: this.props.navigation.state.params.lastName,
                    transferUserID: this.props.navigation.state.params
                      .transferUserID
                  })
                }
                style={styles.buttonStyle}
              >
                <Text style={styles.loginText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default PaymentAmount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "#979797",
    fontSize: 20
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

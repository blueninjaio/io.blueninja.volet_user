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
  SafeAreaView,
  Image,
  Keyboard,
  AsyncStorage
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from 'expo-linear-gradient'

export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config/index";

export class TransferSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      token: ""
    };
  }

  componentDidMount = () => {
    this.getUserID();
  };

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.setState({ token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onActionTransfer = async () => {
    try {
      fetch(`${url}/volet/payments/send`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.state.token
        },
        body: JSON.stringify({
          to: this.props.navigation.state.params.transferUserID,
          reason: this.props.navigation.state.params.selectedValue,
          amount: this.props.navigation.state.params.amount,
          description: this.props.navigation.state.params.reason
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Transfer :", data);
          if (data.success === true) {
            this.props.navigation.navigate("SPaymentSuccess",{
              paymentType: "Sent"
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
      <SafeAreaView style={styles.container}>
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
              Transfer Summary
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Payment made to
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 20,
              width: width / 1.3,
              padding: 18,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: 28
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
                  {this.props.navigation.state.params.firstName.substring(0, 1)}
                  {this.props.navigation.state.params.lastName.substring(0, 1)}
                </Text>
              </LinearGradient>
              <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {this.props.navigation.state.params.transferUser}
                </Text>
                <Text style={{ color: "rgb(144,144,144)", paddingTop: 5 }}>
                  {this.props.navigation.state.params.transferContact}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "rgb(144,144,144)" }}>Amount To Pay</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                MYR {this.props.navigation.state.params.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "rgb(144,144,144)" }}>Payment Method</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {this.props.navigation.state.params.paymentMethod}
              </Text>
            </View>
            <Text style={{ color: "rgb(144,144,144)", marginTop: 30 }}>
              Reasons of Transfer
            </Text>
            <Text style={{ marginTop: 20 }}>
              {this.props.navigation.state.params.reason}
            </Text>
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
              onPress={() => this.onActionTransfer()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Confirm</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default TransferSummary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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

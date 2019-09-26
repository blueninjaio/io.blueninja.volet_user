import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
export const { width, height } = Dimensions.get("window");

export default class TransferToBAccWithdrawReceipt extends Component {
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
              Withdrawal Receipt
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              This is a confirmation page of your total withdrawal amount plus
              transaction fees
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 20,
            width: width / 1.4,
            alignSelf: "center"
            // backgroundColor: "red"
          }}
        >
          <Text style={{ color: "rgb(128,128,128)" }}>Withdraw Amount</Text>
          <Text style={{ fontWeight: "bold" }}>MYR 30.00</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 20,
            paddingBottom: 30,
            width: width / 1.4,
            alignSelf: "center",
            // backgroundColor: "blue",
            borderBottomWidth: 1,
            borderBottomColor: "#5B86E5"
          }}
        >
          <Text style={{ color: "rgb(128,128,128)" }}>Transaction Fees</Text>
          <Text style={{ fontWeight: "bold" }}>MYR 2.00</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 20,
            width: width / 1.4,
            alignSelf: "center"
            // backgroundColor: "red"
          }}
        >
          <Text style={{ color: "rgb(128,128,128)" }}>Withdraw Amount</Text>
          <Text style={{ color: "#5B86E5", fontWeight: "bold" }}>
            MYR 30.00
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 70,
            width: width / 1.3,
            alignSelf: "center"
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate("TransferToBAccSuccess")
              }
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <Text style={{ color: "rgb(207,207,207)", fontWeight: "bold" }}>
              Cancel Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10,
    alignSelf: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

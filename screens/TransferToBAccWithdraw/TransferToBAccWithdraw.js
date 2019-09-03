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
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");

export default class TransferToBAccWithdraw extends Component {
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
              How Much Would You Like To Withdraw
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter the amount you would like to withdraw from your Volet
            </Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
            width: width / 1.3
          }}
        >
          <Text style={{ color: "rgb(160,160,160)" }}>Current Balance</Text>
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            MYR 20.00
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
            width: width / 1.3
          }}
        >
          <TextInput
            disabled={true}
            style={{
              width: width / 1.3,
              marginBottom: 15,
              marginTop: 10,
              height: 20,
              color: "rgb(74,74,74)",
              borderBottomWidth: 1,
              borderBottomColor: "#5B86E5",
              fontSize: 20,
              paddingBottom: 15,
              fontWeight: "bold"
            }}
            type="text"
            placeholder="MYR"
            placeholderTextColor="#5B86E5"
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
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
                this.props.navigation.navigate("TransferToBAccWithdrawReceipt")
              }
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
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

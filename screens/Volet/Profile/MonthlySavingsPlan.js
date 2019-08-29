import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Switch } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo";

const { width } = Dimensions.get("window");

export default class MonthlySavingsPlan extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toggleSavingsContainer}>
          <View style={styles.toggleSavingsTextContainer}>
            <Text>Activate / Deactivate Savings Plan</Text>
          </View>
          <Switch value={true} style={styles.switchBtn} />
        </View>
        <View>
          <View style={styles.savingsCard}>
            <Text style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}>
              Balance available today
            </Text>
            <Text
              style={{
                color: "rgb(126,221,127)",
                paddingBottom: 5,
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              RM 10.00
            </Text>
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.savingsBar}
            />
            <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>
              Monthly Savings Plan: RM 20.00/day
            </Text>
          </View>
          <View style={styles.cashInputContainer}>
            <Text style={styles.cashInputText}>
              How much would you like to save each month
            </Text>
            <TextInput
              disabled={true}
              style={{
                width: width / 1.3,
                marginBottom: 15,
                marginTop: 40,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 25,
                paddingBottom: 10
              }}
              type="text"
              placeholder="MYR"
              placeholderTextColor="rgb(74,74,74)"
            />
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
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.loginText}>Save</Text>
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
    alignItems: "center"
  },
  toggleSavingsContainer: {
    width: width,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#dbdbdb",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#dbdbdb",
    shadowOffset: { height: 0, width: 0 }
  },
  toggleSavingsTextContainer: {
    width: width / 1.2,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  switchBtn: {
    marginTop: 4
  },
  savingsCard: {
    marginTop: 20,
    alignItems: "center",
    width: width / 1.2,
    backgroundColor: "red",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
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
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  cashInputContainer: {
    marginTop: 40,
    alignItems: "center",
    width: width / 1.2
  },
  cashInputText: {
    color: "#5B86E5",
    fontSize: 24
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

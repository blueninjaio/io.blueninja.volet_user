import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Switch, Thumbnail } from "native-base";

const { width } = Dimensions.get("window");

export default class MonthlySavingsPlan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toggleSavingsContainer}>
          <View style={styles.toggleSavingsTextContainer}>
            <Text>Activate / Deactivate Savings Plan</Text>
          </View>
          <Switch value={true} style={styles.switchBtn} />
        </View>
        <SafeAreaView>
          <View>
            <View style={styles.userVolet}>
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
                  RM 10.00
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
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
  userVolet: {
    // marginTop: -40,
    justifyContent: "center",
    alignItems: "center"
  },
  voletBalance: {
    padding: 15,
    alignItems: "center"
  }
});

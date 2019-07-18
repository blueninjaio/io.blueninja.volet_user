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
  Platform
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { LocalAuthentication, Expo, Constants } from "expo";
export class TransferSummary extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 15
            }}
          >
            <Text>Transfer Summary</Text>
            <Text>Payment made to</Text>
          </View>
          <View
            style={{
              borderColor: "#ddd",
              borderWidth: 1,
              borderRadius: 10,
              width: width / 1.2
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 20
              }}
            >
              <View>
                <Thumbnail small style={{ backgroundColor: "grey" }} />
              </View>
              <View style={{ justifyContent: "center", paddingLeft: 20 }}>
                <Text>{this.props.navigation.state.params.transferUser}</Text>
                <Text>{this.props.navigation.state.params.transferContact}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: width / 1.3
              }}
            >
              <Text>Amount to pay</Text>
              <Text>MYR{this.props.navigation.state.params.amount}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: width / 1.3
              }}
            >
              <Text>Payment Method</Text>
              <Text>VOLET</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: width / 1.3,
                alignItems: "flex-start"
              }}
            >
              <Text>Reason of Transfer</Text>
              <Text>{this.props.navigation.state.params.reason}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 50,
            justifyContent: "center",
            alignItems: "center",
            width: width/1.1
          }}
        >
          <TouchableOpacity>
            <Text> Confirm </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  }
});

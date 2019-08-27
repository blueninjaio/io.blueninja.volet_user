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
  SafeAreaView
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { Notifications, Permissions, LinearGradient } from "expo";

export class TransferReason extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ""
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10
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
              Reason Of Transfer
            </Text>
            <View style={{ padding: 10 }}>
              <Text style={{ color: "grey", fontSize: width * 0.034 }}>
                Whats is the reason of your transfer?
              </Text>
              <Text style={{ color: "grey", fontSize: width * 0.034 }}>
                Feel free to attact your receipt or skip
              </Text>
            </View>
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
              marginTop: 30,
              width: width / 1.5
              // paddingLeft: 10
            }}
          >
            <TextInput
              style={{
                alignSelf: "center",
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                height: 20,
                color: "rgb(74,74,74)"
              }}
              onChangeText={reason => this.setState({ reason })}
              value={this.state.reason}
              type="text"
              placeholder="Reason of my transfer  "
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 70,
            width: width
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              disabled={this.state.reason === "" ? true : false}
              onPress={() =>
                this.props.navigation.navigate("PaymentMethod", {
                  amount: this.props.navigation.state.params.amount,
                  reason: this.state.reason,
                  transferUser: this.props.navigation.state.params.transferUser,
                  transferContact: this.props.navigation.state.params
                    .transferContact
                })
              }
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              this.props.navigation.navigate("PaymentMethod", {
                amount: this.props.navigation.state.params.amount,
                reason: this.state.reason,
                transferUser: this.props.navigation.state.params.transferUser,
                transferContact: this.props.navigation.state.params
                  .transferContact
              })
            }
          >
            <Text style={{ color: "rgb(74, 74, 74)", marginTop: 10 }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default TransferReason;
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

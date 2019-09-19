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
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");
// import { dev, prod, url } from "../../../config";

export class SplitESummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      splitAmount: 0,
      totalAmount: 0
    };
  }
  componentDidMount() {
    this._splitBills();
  }

  _splitBills = () => {
    let totalAmount = this.props.navigation.state.params.amount;
    this.setState({ totalAmount });

    let person = this.props.navigation.state.params.selectedContact.length;

    let dividedAmount = totalAmount / person;
    let splitAmount = parseFloat(dividedAmount).toFixed(2);
    this.setState({ splitAmount });
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
              Split Request Summary
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Payment Requested From
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
            {this.props.navigation.state.params.selectedContact.length >= 1
              ? this.props.navigation.state.params.selectedContact.map(
                  (x, i) => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 28
                        // width:width/1.2
                      }}
                      key={i}
                    >
                      <View style={{ flexDirection: "row", width: width / 2 }}>
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
                            {x.firstName.substring(0, 1)}
                            {x.lastName.substring(0, 1)}
                          </Text>
                        </LinearGradient>
                        <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                            {x.name}
                          </Text>
                          <Text
                            style={{ color: "rgb(144,144,144)", paddingTop: 5 }}
                          >
                            {x.phoneNumbers[0].digits}
                          </Text>
                        </View>
                      </View>

                      <View style={{ paddingLeft: 15 }}>
                        <Text style={{ fontWeight: "bold" }}>MYR</Text>
                        <Text style={{ paddingTop: 5 }}>
                          {this.state.splitAmount}
                        </Text>
                      </View>
                    </View>
                  )
                )
              : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "rgb(144,144,144)" }}>Total Request</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                MYR {this.state.totalAmount}
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
              onPress={() => this.props.navigation.navigate("SPaymentSuccess",{
                paymentType:"Requested"
              })}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Request</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplitESummary;
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

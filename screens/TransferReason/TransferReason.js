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
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient'

export class TransferReason extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: "",
      selectedValue: ""
    };
  }

  selectedTransfer = value => {
    this.setState({ selectedValue: value });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 30,
                width: width / 1.3
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
            <View>
              <TouchableOpacity
                style={styles.listItemButtonSwitch}
                onPress={() =>
                  // this.setState({reason: "Transportation"})
                  this.selectedTransfer("Transportation")
                }
              >
                <View style={styles.show}>
                  <Image
                    source={require("../../assets/glasses.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={
                      this.state.selectedValue === "Transportation"
                        ? styles.listItemTextFontBig
                        : styles.listItemText
                    }
                  >
                    Transportation
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.listItemButtonSwitch}
                onPress={() => this.selectedTransfer("Utilities")}
              >
                <View style={styles.show}>
                  <Image
                    source={require("../../assets/glasses.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={
                      this.state.selectedValue === "Utilities"
                        ? styles.listItemTextFontBig
                        : styles.listItemText
                    }
                  >
                    Utilities
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.listItemButtonSwitch}
                onPress={() =>
                  // this.setState({reason: "Food & Beverage"})
                  this.selectedTransfer("Food & Beverage")
                }
              >
                <View style={styles.show}>
                  <Image
                    source={require("../../assets/glasses.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={
                      this.state.selectedValue === "Food & Beverage"
                        ? styles.listItemTextFontBig
                        : styles.listItemText
                    }
                  >
                    Food & Beverage
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.listItemButtonSwitch}
                onPress={() =>
                  // this.setState({reason: "Shopping"})
                  this.selectedTransfer("Shopping")
                }
              >
                <View style={styles.show}>
                  <Image
                    source={require("../../assets/glasses.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={
                      this.state.selectedValue === "Shopping"
                        ? styles.listItemTextFontBig
                        : styles.listItemText
                    }
                  >
                    Shopping
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.listItemButtonSwitch}
                onPress={() =>
                  // this.setState({ reason: "Entertainment" })
                  this.selectedTransfer("Entertainment")
                }
              >
                <View style={styles.show}>
                  <Image
                    source={require("../../assets/glasses.png")}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={
                      this.state.selectedValue === "Entertainment"
                        ? styles.listItemTextFontBig
                        : styles.listItemText
                    }
                  >
                    Entertainment
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>

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
              style={styles.buttonStyle}
              disabled={this.state.reason === "" ? true : false}
              onPress={() =>
                this.props.navigation.navigate("PaymentMethod", {
                  amount: this.props.navigation.state.params.amount,
                  reason: this.state.reason,
                  transferUser: this.props.navigation.state.params.transferUser,
                  transferContact: this.props.navigation.state.params
                    .transferContact,
                  selectedValue: this.state.selectedValue,
                  firstName: this.props.navigation.state.params.firstName,
                  lastName: this.props.navigation.state.params.lastName,
                  transferUserID: this.props.navigation.state.params
                      .transferUserID
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
                  .transferContact,
                selectedValue: this.state.selectedValue,
                firstName: this.props.navigation.state.params.firstName,
                lastName: this.props.navigation.state.params.lastName,
                transferUserID: this.props.navigation.state.params
                      .transferUserID

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
  },
  listItemButtonSwitch: {
    padding: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    width: width / 1.4,
    alignSelf: "center"
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.8,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  },

  listItemTextFontBig: {
    fontSize: 18,
    color: "black",
    marginLeft: 20
  }
});

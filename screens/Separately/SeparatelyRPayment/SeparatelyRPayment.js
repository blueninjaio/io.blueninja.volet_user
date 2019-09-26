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
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from 'expo-linear-gradient'
export const { width, height } = Dimensions.get("window");
import { Input } from "react-native-elements";
import RequestPayment from "../../../component/AmountRequestSeperately";

export class SeparatelyRPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      price: 0,
      serviceCharge: 0,
      totalAmount: 0,
      entries: [
        {
          selectedUsers: []
        }
      ],
      totalUsers: this.props.navigation.state.params.selectedContact
    };
  }

  onActionImgPopUp = contact => {
    Keyboard.addListener("keyboardDidShow");
    if (contact !== null) {
      this.setState({ contact });
    }
  };

  onAddEntry = () => {
    if (this.state.totalUsers.length === 0) {
      return;
    }
    let { entries } = this.state;
    if (entries[entries.length - 1].selectedUsers.length === 0) {
      return;
    }
    entries.push({
      selectedUsers: []
    });
    this.setState({
      entries
    });
  };

  onActionSelectUser = (e, user) => {
    let { entries, totalUsers } = this.state;

    let index = entries.indexOf(e);
    let { selectedUsers } = entries[index];

    if (!selectedUsers.find(selected => selected._id === user._id)) {
      user.selected = true;
      selectedUsers.push(user);
      totalUsers = totalUsers.filter(e => e._id !== user._id);
    } else {
      entries[index].selectedUsers = selectedUsers.filter(
        e => e._id !== user._id
      );
      totalUsers.push(user);
    }

    if (totalUsers.length === 0) {
      entries = entries.filter(entry => entry.selectedUsers.length !== 0);
    }

    this.setState({
      entries,
      totalUsers
    });
  };

  updateInfo = (e, description, price) => {
    let { entries } = this.state;

    let index = entries.indexOf(e);
    let entry = entries[index];
    entry.description = description;
    entry.price = price;

    this.setState({
      entries
    });
    console.log("Entries", entries);
    const temp = entries.reduce(
      (acc, item) => Number(acc.price) + Number(item.price)
    );

    this.setState({ totalAmount: temp });
    // console.log("Reduce entries", temp);
  };

  onSubmit = () => {
    // console.log("Entries info", this.state.entries);
    // this.state.entries.map(item => console.log(item));
    this.props.navigation.navigate("ReasonRPayment", {
      totalEntries: this.state.entries,
      totalAmount: this.state.totalAmount,
      serviceCharge: this.state.serviceCharge
    });
  };

  addServiceCharge = e => {
    const { totalAmount } = this.state;
    let totalValue = totalAmount + (e / 100) * totalAmount;
    // console.log("Service Charge", totalValue);
    this.setState({ totalAmount: totalValue });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
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
                Amount To Request
              </Text>
              <Text
                style={{
                  padding: 10,
                  color: "grey",
                  fontSize: width * 0.034
                }}
              >
                How much are you requesting from your friend seperately
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {this.state.entries.map(e => (
              <RequestPayment
                key={e}
                totalUser={this.state.totalUsers}
                selectedUsers={e.selectedUsers}
                onActionSelectUser={user => this.onActionSelectUser(e, user)}
                updateInfo={(description, price) =>
                  this.updateInfo(e, description, price)
                }
              />
            ))}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  width: width / 1.2,
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
                onPress={this.onAddEntry}
              >
                <Icon
                  name="ios-add-circle-outline"
                  type="Ionicons"
                  style={{ color: "red", fontSize: 15, marginRight: 5 }}
                />
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Add entry
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 10,
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                  shadowColor: "#000",
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 1,
                  marginBottom: 10,
                  paddingBottom: 10
                }}
              >
                <View
                  style={{
                    // backgroundColor: "blue",
                    width: width / 1.2,
                    paddingTop: 20,
                    paddingBottom: 20
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "rgb(0,0,0)",
                        fontWeight: "bold",
                        fontSize: 16
                      }}
                    >
                      Service Charge{" "}
                    </Text>
                    <TextInput
                      style={{
                        width: width / 5,
                        marginBottom: 15,
                        marginTop: 10,
                        height: 20,
                        color: "rgb(74,74,74)",
                        borderBottomWidth: 1,
                        borderBottomColor: "#5B86E5",
                        fontSize: 13,
                        alignSelf: "center"
                      }}
                      keyboardType="numeric"
                      placeholder="%"
                      value={this.state.serviceCharge}
                      placeholderTextColor="rgb(74,74,74)"
                      onChangeText={serviceCharge => {
                        this.addServiceCharge(serviceCharge),
                          this.setState({ serviceCharge });
                      }}
                    />
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: "rgb(129,129,129)",
                        fontSize: 15,
                        marginTop: 20
                      }}
                    >
                      Total Requesting Amount{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#5B86E5",
                        fontSize: 15,
                        marginTop: 20
                      }}
                    >
                      MYR {this.state.totalAmount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // position: "absolute",
                // bottom: 50,
                marginTop: 20,
                marginBottom: 20,
                width: width
              }}
            >
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.buttonStyle}
              >
                <TouchableOpacity
                  onPress={() => this.onSubmit()}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.loginText}>Done</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SeparatelyRPayment;
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

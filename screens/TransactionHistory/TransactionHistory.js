import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

class TransactionHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "Sent"
    };
  }

  Onclick = value => {
    this.setState({ selectedValue: value });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width / 1.2,
              alignItems: "center",
              padding: 15
            }}
          >
            {this.state.selectedValue === "Sent" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1.5,
                  borderColor: "#5B86E5",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Sent")}
              >
                <Image
                  source={require("../../assets/requestSent.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Sent</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Sent")}
              >
                <Image
                  source={require("../../assets/requestSent.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Sent</Text>
              </TouchableOpacity>
            )}

            {this.state.selectedValue === "Received" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1.5,
                  borderColor: "#5B86E5",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Received")}
              >
                <Image
                  source={require("../../assets/wallet.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Received</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Received")}
              >
                <Image
                  source={require("../../assets/wallet.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Request</Text>
              </TouchableOpacity>
            )}
            {this.state.selectedValue === "Request" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1.5,
                  borderColor: "#5B86E5",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Request")}
              >
                <Image
                  source={require("../../assets/requestReceive.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Request</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => this.Onclick("Request")}
              >
                <Image
                  source={require("../../assets/requestReceive.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "rgb(74, 74, 74)" }}>Request</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ width: width / 1.3, alignItems: "center" }}>
            {this.state.selectedValue === "Sent" ? (
              <View style={styles.shadowSet}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Setting", {
                      userType: this.state.userType
                    })
                  }
                  style={styles.listItemButton}
                >
                  <View style={styles.show}>
                    <LinearGradient
                      colors={["#36D1DC", "#5B86E5"]}
                      style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {/* {x.f_name.substring(0, 1)} */}
                        KK
                        {/* {x.l_name.substring(0, 1)} */}
                      </Text>
                    </LinearGradient>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 30
                      }}
                    >
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row",
                          marginBottom: 8
                        }}
                      >
                        <Text style={styles.listItemText}>Sent</Text>
                        <Text style={styles.listItemTextGreen}>MYR 50.00</Text>
                      </View>
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.listItemText}>to</Text>
                        <Text style={styles.listItemTextBold}>Person</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : this.state.selectedValue === "Received" ? (
              <View style={styles.shadowSet}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Setting", {
                      userType: this.state.userType
                    })
                  }
                  style={styles.listItemButton}
                >
                  <View style={styles.show}>
                    <LinearGradient
                      colors={["#36D1DC", "#5B86E5"]}
                      style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {/* {x.f_name.substring(0, 1)} */}
                        KK
                        {/* {x.l_name.substring(0, 1)} */}
                      </Text>
                    </LinearGradient>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 30
                      }}
                    >
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row",
                          marginBottom: 8
                        }}
                      >
                        <Text style={styles.listItemText}>Received</Text>
                        <Text style={styles.listItemTextGreen}>MYR 50.00</Text>
                      </View>
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.listItemText}>from</Text>
                        <Text style={styles.listItemTextBold}>Person</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.shadowSet}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Setting", {
                      userType: this.state.userType
                    })
                  }
                  style={styles.listItemButton}
                >
                  <View style={styles.show}>
                    <LinearGradient
                      colors={["#36D1DC", "#5B86E5"]}
                      style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {/* {x.f_name.substring(0, 1)} */}
                        KK
                        {/* {x.l_name.substring(0, 1)} */}
                      </Text>
                    </LinearGradient>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 30
                      }}
                    >
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row",
                          marginBottom: 8
                        }}
                      >
                        <Text style={styles.listItemTextBold}>Person</Text>
                        <Text style={styles.listItemText}>requested</Text>
                      </View>
                      <View
                        style={{
                          width: width / 2,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.listItemTextGreen}>MYR 50.00</Text>
                        <Text style={styles.listItemTextBold}>from</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default TransactionHistory;

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
  userImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  voletContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  voletBalance: {
    width: width / 1.4,
    // padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    height: height / 10
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.3,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemButtonSwitch: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemButton: {
    padding: 20,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 5
  },
  listItemTextGreen: {
    fontSize: 15,
    color: "green",
    marginLeft: 5
  },
  listItemTextBold: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5
  },

  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  }
});

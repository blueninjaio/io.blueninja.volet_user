import React, {Component} from "react";
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
  AsyncStorage
} from "react-native";
import {Icon, Thumbnail} from "native-base";
import {LinearGradient} from "expo-linear-gradient";

export const {width, height} = Dimensions.get("window");
import {dev, prod, url} from "../../config/index";


function formatDate(date) {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

function formatTime(date) {
  let hours = date.getHours();
  let hour12 = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ":" + date.getMinutes() + ' ' + hour12
}

export class TransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      token: "",
      requestType: this.props.navigation.state.params.requestType
    };
  }

  componentDidMount = () => {
    this.getUserID();
  };

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.setState({token});
      }
    } catch (error) {
      console.log(error);
    }
  };

  onActionTransfer = async () => {
    try {
      fetch(`${url}/volet/payments/send`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.state.token
        },
        body: JSON.stringify({
          to: this.props.navigation.state.params.transferUserID,
          reason: this.props.navigation.state.params.selectedValue,
          amount: this.props.navigation.state.params.amount,
          description: this.props.navigation.state.params.reason
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Transfer :", data);
          if (data.success === true) {
            this.props.navigation.navigate("SPaymentSuccess", {
              paymentType: "Sent"
            });
          } else {
            alert(data.message);
          }
        })
        .catch(error => {
          Alert.alert(
            "Error connecting to server Volet",
            `${error}`,
            [{text: "OK", onPress: () => null}],
            {cancelable: false}
          );
        });
    } catch (error) {
      console.log(error);
    }
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
            {this.state.requestType === "Request" ? (
              <View>
                <Text
                  style={{
                    padding: 10,
                    color: "#5B86E5",
                    fontSize: width * 0.06,
                    fontWeight: "500"
                  }}
                >
                  Payment Requested
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  {this.props.navigation.state.params.isSent ? 'Requested payment from ' + this.props.navigation.state.params.firstName + ' ' + this.props.navigation.state.params.lastName + " " : 'Payment requested from me'}
                </Text>
              </View>
            ) : this.state.requestType === "Received" ? (
              <View>
                <Text
                  style={{
                    padding: 10,
                    color: "#5B86E5",
                    fontSize: width * 0.06,
                    fontWeight: "500"
                  }}
                >
                  Received Payment
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Received payment from
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    padding: 10,
                    color: "#5B86E5",
                    fontSize: width * 0.06,
                    fontWeight: "500"
                  }}
                >
                  Sent Payment
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Sent payment receipt
                </Text>
              </View>
            )}
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
              shadowOffset: {width: 3, height: 5},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: 28
              }}
            >
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
                <Text style={{color: "white", fontSize: 18}}>
                  {this.props.navigation.state.params.firstName.charAt(0)}
                  {this.props.navigation.state.params.lastName.charAt(0)}
                </Text>
              </LinearGradient>
              <View style={{paddingLeft: 20, paddingRight: 25}}>
                <Text style={{fontSize: 14, fontWeight: "bold"}}>
                  {this.props.navigation.state.params.firstName + ' ' + this.props.navigation.state.params.lastName}
                </Text>
                <Text style={{color: "rgb(144,144,144)", paddingTop: 5}}>
                  {this.props.navigation.state.params.transferContact}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
              }}
            >
              <Text style={{color: "rgb(144,144,144)"}}>Amount To Pay</Text>
              <Text style={{fontWeight: "bold", fontSize: 14}}>
                MYR {this.props.navigation.state.params.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Text style={{color: "rgb(144,144,144)"}}>Payment Method</Text>
              <Text style={{fontWeight: "bold", fontSize: 14}}>
                {/* {this.props.navigation.state.params.paymentMethod} */}
                Volet
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Text style={{color: "rgb(144,144,144)"}}>Date & Time </Text>
              <View style={{justifyContent: "center"}}>
                <Text style={{fontWeight: "bold", fontSize: 14}}>
                  {formatDate(this.props.navigation.state.params.date)}
                </Text>
                <Text style={{fontWeight: "bold", fontSize: 14}}>
                  {formatTime(this.props.navigation.state.params.date)}
                </Text>
              </View>
            </View>
            <Text style={{color: "rgb(144,144,144)", marginTop: 20}}>
              Reasons of Transfer
            </Text>
            <Text style={{marginTop: 20}}>
              {this.props.navigation.state.params.reason}
            </Text>
            <Text style={{marginTop: 20}}>
              {this.props.navigation.state.params.description}
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
          {this.state.requestType === "Request" && !this.props.navigation.state.params.isSent ?
            (<LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.buttonStyle}
            >
              <TouchableOpacity
                onPress={() => this.onActionTransfer()}
                style={styles.buttonStyle}
              >
                <Text style={styles.loginText}>Pay Now</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
              onPress={() => this.onActionTransfer()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Confirm</Text>
            </TouchableOpacity> */}
            </LinearGradient>)
            : null}
        </View>
      </SafeAreaView>
    );
  }
}

export default TransactionDetails;
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

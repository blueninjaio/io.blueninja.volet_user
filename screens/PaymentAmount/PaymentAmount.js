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
  AsyncStorage,
  ScrollView
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class PaymentAmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      username: "",
      balance: "",
      errorMessage: "",
      transferUser: "",
      transferContact: ""
    };
  }

  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
    // console.log("Transfer User Details", this.props.navigation.state.params.userDetails)
    this.setState({
      transferUser:
        this.props.navigation.state.params.userDetails.f_name +
        " " +
        this.props.navigation.state.params.userDetails.l_name
    });
    this.setState({
      transferContact: this.props.navigation.state.params.userDetails.contact
    });
  };

  getUserID = async () => {
    try {
      let id = await AsyncStorage.getItem("ID");
      let username = await AsyncStorage.getItem("firstname");
      if (id !== null) {
        this.getVolet(id);
        this.setState({ id });
        this.setState({ username });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server storage",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  getVolet = ID => {
    fetch(`${url}/api/volet/id`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        persona_id: ID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Voucher :", data);
        if (data.success === true) {
          this.setState({ balance: data.total });
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server Volet",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  checkVoletBalance = price => {
    const { balance } = this.state;
    if (price > balance) {
      this.setState({ errorMessage: "Not Suffcient" });
      this.setState({ price });
    } else if (price < balance) {
      this.setState({ errorMessage: "Amount Exceeds" });
      this.setState({ price });
    } else if (price === balance || balance === 0) {
      this.setState({ errorMessage: "Insuffcient" });
      this.setState({ price });
    } else {
      this.setState({ errorMessage: null });
      this.setState({ price });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                width: width / 1.5,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text>Amount To Pay</Text>
              <Text>How much do you want to pay your friends</Text>
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
                  <Text>{this.state.transferUser}</Text>
                  <Text>{this.state.transferContact}</Text>
                </View>
              </View>
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={price => this.checkVoletBalance(price)}
                value={this.state.price}
                type="text"
                placeholder="amount"
                // keyboardType="numeric"
                placeholderTextColor="rgb(74,74,74)"
              />
              {this.state.errorMessage === "Amount Exceeds" ? (
                <Text style={{ color: "red" }}>
                  Amount exceeds from balance
                </Text>
              ) : this.state.errorMessage === "Not Suffcient" ? (
                <View>
                  <Text style={{ color: "red" }}>
                    Amount is not suffcient to be transfered.{" "}
                  </Text>
                  <Text style={{ color: "red" }}>
                    Please increase the amount
                  </Text>
                </View>
              ) : this.state.errorMessage === "Insuffcient" ||
                this.state.balance === 0 ? (
                <Text style={{ color: "red" }}>Insuffcient Balance</Text>
              ) : null}
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              height: height / 2
            }}
          >
            {this.state.errorMessage === "Not Suffcient" ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("VoletBalance")}
                >
                  <Text>Top Up Volet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("TransferReason", {
                      transferUser: this.state.transferUser,
                      transferContact: this.state.transferContact,
                      amount: this.state.price
                    })
                  }
                >
                  <Text>Change payment method</Text>
                </TouchableOpacity>
              </View>
            ) : this.state.errorMessage === null ? (
              <TouchableOpacity disabled={true}>
                <Text>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("TransferReason", {
                    transferUser: this.state.transferUser,
                    transferContact: this.state.transferContact,
                    amount: this.state.price
                  })
                }
              >
                <Text>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PaymentAmount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

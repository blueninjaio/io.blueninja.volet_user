import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Thumbnail } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { Input } from "react-native-elements";
export default class FromAgentWithdrawal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widthdrawAgent: this.props.navigation.state.params.widthdrawAgent,
      distance: this.props.navigation.state.params.distance,
      balance: "",
      token: "",
      price: ""
    };
  }

  componentDidMount = () => {
    this.getUserID();
  };

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.getVolet(token);
        this.setState({ token });
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

  getVolet = async token => {
    try {
      fetch(`${url}/users/me`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("Users :", data);
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            this.setState({ savings: data.user.monthly_savings });
          } else {
            alert(data.message);
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
    } catch (error) {
      console.log(error);
    }
  };

  checkBalance = () => {
    // if (this.state.price === ""){
    //   alert("Please enter an amount")
    // }
    // else if (this.state.price >= this.state.balance){
    //   alert("Insufficient Volet Balance")
    // }
    // else{
      this.props.navigation.navigate("FromAgentCollection", {
        widthdrawAgent: this.state.widthdrawAgent,
        balance: this.state.balance,
        distance: this.state.distance,
        price: this.state.price,
        token: this.state.token
      })
    // }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

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
              How Much Would You Like To Withdraw
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter the amount you would like to withdraw from your Volet
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            width: width / 1.3,
            alignSelf: "center"
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={{
              borderRadius: 20,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {this.state.widthdrawAgent.f_name.substring(0, 1)}
              {this.state.widthdrawAgent.l_name.substring(0, 1)}
            </Text>
          </LinearGradient>
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,

              fontWeight: "bold"
            }}
          >
            {this.state.widthdrawAgent.f_name}{" "}
            {this.state.widthdrawAgent.l_name}
          </Text>
          <Text style={{ color: "rgb(160,160,160)", marginTop: 10 }}>
            {this.state.distance}km away
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
            width: width / 1.3
          }}
        >
          <Text style={{ color: "rgb(160,160,160)" }}>Current Balance</Text>
          <Text
            style={{
              color: "rgb(44,44,44)",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            MYR {this.state.balance}
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
            paddingBottom: 40,
            width: width / 1.3
          }}
        >
          <Input
            inputStyle={{
              flex: 1,
              alignSelf: "center",
              color: "black",
              fontSize: 18
            }}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#5B86E5"
            }}
            // onChangeText={price => this.checkVoletBalance(price)}
            onChangeText={price => this.setState({ price })}
            value={this.state.price}
            sst
            keyboardType="numeric"
            placeholderTextColor="rgb(74,74,74)"
            leftIcon={
              <Text style={{ fontSize: 18, color: "#5B86E5", paddingRight: 8 }}>
                MYR
              </Text>
            }
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            width: width / 1.3,
            alignSelf: "center"
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.checkBalance()}
            >
              <Text style={styles.loginText}>Request</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10,
    alignSelf: "center"
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

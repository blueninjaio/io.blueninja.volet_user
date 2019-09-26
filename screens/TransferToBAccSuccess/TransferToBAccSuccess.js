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

export default class TransferToBAccSuccess extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       balance:""
    }
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            width: width / 1.3,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
            paddingTop: 80
          }}
        >
          <Image
            source={require("../../assets/check.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ color: "rgb(148,148,148)", marginTop: 15 }}>
            Balance
          </Text>
          <Text style={{ color: "rgb(148,148,148)", marginTop: 8 }}>
            MYR 20.00
          </Text>
          <Text style={{ marginTop: 25, fontWeight: "bold" }}>
            {}
            Transaction Successful!
          </Text>
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
              onPress={() => this.props.navigation.navigate("VoletBalance")}
            >
              <Text style={styles.loginText}>Done</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
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

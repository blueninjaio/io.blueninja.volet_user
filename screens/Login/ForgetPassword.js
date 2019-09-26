import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import { LinearGradient } from 'expo-linear-gradient'

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      contact: "",
      tempPassword: ""
    };
  }

  componentDidMount = () => {
    this.setState({ email: this.props.navigation.state.params.email });
  };

  /**
  |--------------------------------------------------
  | Forgot Password Implementation
  |--------------------------------------------------
  */

  forgetpassword = () => {
    fetch(`${url}/users/forget-password`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        email: this.props.navigation.state.params.email,
        token: this.props.navigation.state.params.token
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Forgot password :", data);
        // if (data.success === true) {
        if (data.success === true) {
          this.props.navigation.navigate("ConfirmNewPassword", {
            token: this.props.navigation.state.params.token
          });
        } else {
          alert(`${data.message}`);
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `Please check your internet or try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              marginTop: 50,
              marginBottom: height * 0.04
            }}
          >
            <Text style={{ textAlign: "center", color: "rgb(74,74,74)" }}>
              Please enter your temporay password below based on email you
              recieved
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
              Email
            </Text>
            <TextInput
              style={{
                width: width / 1.2,
                marginBottom: 15,
                marginTop: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 13
              }}
              // onChangeText={email => this.setState({ email })}
              value={this.state.email}
              type="text"
              placeholder="Email"
              placeholderTextColor="rgb(215,215,215)"
            />
          </View>
          {/* <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "black" }}>
              Temporary Password
            </Text>
            <TextInput
              style={{
                alignItems: "flex-end",
                width: width / 1.2,
                marginBottom: 15,
                marginTop: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(52, 182, 215)",
                fontSize: 13
              }}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={true}
              type="text"
              placeholder="Password"
              placeholderTextColor="rgb(215,215,215)"
            />
          </View> */}
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
              onPress={() => this.forgetpassword()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default ForgetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  Thumbnail: {
    backgroundColor: "grey",
    height: height / 3.5,
    width: width / 1.2
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

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
import { LinearGradient } from "expo";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ""
    };
  }

  forgetpassword = () => {
    fetch(`${url}/tac/contact`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        contact: this.state.contact,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Forgot password :", data);
        if (data.success === true) {
          this.props.navigation.navigate("TAC", {
            contact: "+60"+this.state.contact,
            requestMethod: "ResetPassword",
          });
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.log("Error Tac", error);
        Alert.alert(
          "Error connecting to server",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: width / 1.5, marginTop: 50 }}>
            <Text style={{ textAlign: "center", color: "rgb(74,74,74)" }}>
              Please enter your mobile number to receive a new TAC code
            </Text>
          </View>
          <View
            style={{
              marginTop: height * 0.03,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "80%"
            }}
          >
            <Text style={{ fontSize: width * 0.04, marginRight: 10 }}>+60</Text>
            <TextInput
              style={{
                width: "80%",
                marginBottom: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5"
              }}
              onChangeText={text =>
                this.setState({
                  contact: text.replace(/[^0-9]/g, "")
                })
              }
              value={this.state.contact}
              type="number"
              placeholder="Your mobile number"
              placeholderTextColor="rgb(215,215,215)"
              keyboardType="numeric"
            />
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
              onPress={() => this.forgetpassword()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Request Code</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default ResetPassword;
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

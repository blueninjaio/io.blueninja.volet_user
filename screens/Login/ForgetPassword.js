
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

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      contact:"",
      tempPassword:""
    };
  }

  /**
  |--------------------------------------------------
  | Forgot Password Implementation
  |--------------------------------------------------
  */

  forgetpassword = () => {
    fetch(`${url}/api/users/tempPassword`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Forgot password :", data);
        // if (data.success === true) {
        if (data.success === false) {
          this.props.navigation.navigate("ResetPassword",{
            tempPassword: data.tempPassword,
            contact: data.contact,
            email: this.state.email
          })
        }
        else {
          alert(`${data.message}`)
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
          <View style={{ width: width / 1.5, paddingTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Please enter your email and mobile number below to recieve a
              temporary password
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Email</Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.2,
                paddingLeft: 20,
                // borderRadius: 20,
                height: 50,
                color: "rgb(74,74,74)",
                backgroundColor: "rgb(226,226,226)"
              }}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              type="text"
              placeholder="Email"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <TouchableOpacity onPress={() => this.forgetpassword()}>
            <Text>Submit</Text>
          </TouchableOpacity>
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
  }
});

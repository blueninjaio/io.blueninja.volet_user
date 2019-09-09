import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class ConfirmNewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      Cpassword: ""
    };
  }

  /**
  |--------------------------------------------------
  | Confirm Reset Password Implementation
  |--------------------------------------------------
  */
  confirmPassword = () => {
    if (this.state.password !== this.state.Cpassword) {
      alert(`Please enter a valid password.`);
    } 
    else {
      fetch(`${url}/users/resetPassword`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          temporary_password: this.props.navigation.state.params.tempPassword,
          email: this.props.navigation.state.params.email,
          contact: this.props.navigation.state.params.contact,
          new_password: this.state.password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Confrim Password :", data);
          if (data.success === true) {
            this.props.navigation.navigate(this.props.navigation.state.params.goBack)
          }
        })
        .catch(error => {
          console.log("Error sign up", error);
          Alert.alert(
            "Error connecting to server",
            `${error}`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: width / 1.5, paddingTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Enter your new password and confirm your new password to reset
              your
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>New Password</Text>
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
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder="Password"
              type="text"
              placeholderTextColor="rgb(74,74,74)"
              secureTextEntry={true}

            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Confirm Password</Text>
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
              onChangeText={Cpassword => this.setState({ Cpassword })}
              value={this.state.Cpassword}
              type="text"
              placeholder="Confirm Password"
              placeholderTextColor="rgb(74,74,74)"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.confirmPassword()}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConfirmNewPassword;
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

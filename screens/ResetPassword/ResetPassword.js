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

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      tempPassword: ""
    };
  }

  // forgetpassword = () => {
  //   this.props.navigation.state.params.temporaryPassword,
  //     this.props.navigation.state.params.email;
  //   fetch(`${url}/api/users/tempPassword`, {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8"
  //     },
  //     body: JSON.stringify({
  //       email: this.state.email
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Forgot password :", data);
  //       this.props.navigation.navigate("FPTac", {
  //         temporaryPassword: this.props.navigation.state.params
  //           .temporaryPassword,
  //         email: this.props.navigation.state.params.email,
  //         contact: this.state.contact
  //       });
  //     })
  //     .catch(error => {
  //       console.log("Error sign up", error);
  //       Alert.alert(
  //         "Error connecting to server",
  //         `${error}`,
  //         [{ text: "OK", onPress: () => null }],
  //         { cancelable: false }
  //       );
  //     });
  // };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: width / 1.5, paddingTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Please enter your mobile number and your temporary password to
              receive a new TAC code and reset your
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Reset Password</Text>
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
              onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              type="text"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Temporary</Text>
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
              onChangeText={tempPassword => this.setState({ tempPassword })}
              value={this.state.tempPassword}
              type="text"
              placeholder="password"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            height: height / 2
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FPTac", {
                temporaryPassword: this.props.navigation.state.params
                  .temporaryPassword,
                email: this.props.navigation.state.params.email,
                contact: this.state.contact,
              goBack: this.props.navigation.state.params.goBack

              })
            }
            style={{ padding: 20 }}
          >
            <Text>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FPTac", {
                temporaryPassword: this.props.navigation.state.params
                  .temporaryPassword,
                email: this.props.navigation.state.params.email,
                contact: this.state.contact,
              goBack: this.props.navigation.state.params.goBack

              })
            }
            style={{ padding: 20 }}
          >
            <Text>Next</Text>
          </TouchableOpacity>
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
  }
});

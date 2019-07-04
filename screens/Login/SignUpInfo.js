import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class SignUpInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      CPassword: "",
      facebook_id: null,
      google_id: null
      // contact: "012312838129"
    };
  }

  /**
  |--------------------------------------------------
  | Sign Up Implementation
  |--------------------------------------------------
  */
  userSignUp = () => {
    fetch(`${url}/api/users/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        facebook_id: this.state.facebook_id,
        google_id: this.state.google_id,
        contact: this.props.navigation.state.params.contact,
        f_name: this.state.firstName,
        l_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          this.props.navigation.navigate("Login");
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>First name</Text>
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
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              type="text"
              placeholder="Your first name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Last name</Text>
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
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              type="text"
              placeholder="Your last name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
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
              placeholder="Your email"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text>Password</Text>
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
              secureTextEntry={true}
              type="password"
              placeholder="Password"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
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
              onChangeText={CPassword => this.setState({ CPassword })}
              value={this.state.CPassword}
              secureTextEntry={true}
              type="password"
              placeholder="Your first name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => this.userSignUp()}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignUpInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

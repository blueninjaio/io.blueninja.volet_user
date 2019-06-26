import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
export const { width, height } = Dimensions.get("window");

export class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SignUpView}>
          <View style={styles.Logo} />
          <View style={styles.buttonSignUp}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
              style={styles.buttonStyle}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              style={styles.buttonStyle2}
            >
              <Text>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    backgroundColor: "grey",
    height: 200,
    width: 200
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey"
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey",
    marginTop: 20
  }
});

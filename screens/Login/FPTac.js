import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");

export class TAC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: 100,
            paddingTop: 20
          }}
        >
          <Text>Enter your TAC code</Text>
          <Text>We've sent the code to +60123123123</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={{
              alignSelf: "center",
              width: width / 1.2,
              paddingLeft: 20,
              borderRadius: 20,
              marginTop: 40,
              height: 50,
              color: "rgb(74,74,74)",
              backgroundColor: "rgb(226,226,226)"
            }}
            onChangeText={contact => this.setState({ contact })}
            value={this.state.contact}
            type="number"
            placeholder="Your mobile number"
            placeholderTextColor="rgb(74,74,74)"
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("ConfirmNewPassword", {
              temporaryPassword: this.props.navigation.state.params.temporaryPassword,
              email: this.props.navigation.state.params.email,
              contact: this.props.navigation.state.params.contact
            })
          }
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20
          }}
        >
          <Text>Resend Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TAC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

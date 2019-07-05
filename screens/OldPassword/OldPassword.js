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


export class OldPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            OldPassword:""
        }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: width / 1.5, paddingTop: 30 }}>
          <Text>Reset password</Text>
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
            <Text>Mobile number</Text>
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
              onChangeText={OldPassword => this.setState({ OldPassword })}
              value={this.state.OldPassword}
              type="text"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FPTac", {
                OldPassword:this.state.OldPassword
              })
            }
            style={{ padding: 20 }}
          >
            <Text>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default OldPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center"
  },
  Thumbnail: {
    backgroundColor: "grey",
    height: height / 3.5,
    width: width / 1.2
  }
});

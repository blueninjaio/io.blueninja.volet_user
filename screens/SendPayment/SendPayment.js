import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
// import { dev, prod, url } from "../../../config";

export class SendPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <Text>Send Payment</Text>
            <Text>
              Enter a name, contact number or scan your friends OR code to send
              a payment
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 30
              }}
            >
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={contact => this.setState({ contact })}
                value={this.state.contact}
                type="text"
                placeholder="Name Contact Number/  "
                placeholderTextColor="rgb(74,74,74)"
              />
              <TouchableOpacity onPress={() => this.props.navigation.navigate("PaymentAmount")}>
                <Icon name="qrcode" type="AntDesign" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SendPayment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

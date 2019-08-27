import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  Image
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
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 20,
              width: width / 1.3
            }}
          >
            <Text
              style={{
                padding: 10,
                color: "#5B86E5",
                fontSize: width * 0.06,
                fontWeight: "500"
              }}
            >
              Send Payment
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter a name, contact number or scan your friends OR code to send
              a payment
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            width: width / 1.5,
            // paddingLeft: 10

            }}
          >
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 2,
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                height: 20,
                color: "rgb(74,74,74)",
              }}
              onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              type="text"
              placeholder="Name / Contact Number  "
              placeholderTextColor="rgb(215,215,215)"
            />
            <TouchableOpacity
              style={{

              }}
              onPress={() => this.props.navigation.navigate("PaymentAmount")}
            >
              <Image
                source={require("../../assets/qrcode.png")}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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

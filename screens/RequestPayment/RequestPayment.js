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
  Image,
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");
// import { dev, prod, url } from "../../../config";

export class RequestPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: ""
    };
  }
  componentDidMount() {}

  onActionImgPopUp = contact => {
    Keyboard.addListener("keyboardDidShow");
    if (contact !== null) {
      this.setState({ contact });
    }
  };

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
              Request Payment
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Select multiple contact to request payment in bulk
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //   justifyContent: "space-between",
              width: width / 1.5
            }}
          >
            {this.state.contact !== "" ? (
              <TouchableOpacity style={{ marginRight: 10 }}>
                <View>
                  <Thumbnail
                    small
                    source={{
                      uri:
                        "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
                    }}
                  />
                  <Icon
                    type="AntDesign"
                    name="close"
                    style={{
                      fontSize: 10,
                      position: "relative",
                      top: -38,
                      left: 28,
                      color: "red"
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              width: width / 1.5
            }}
          >
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 2,
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                height: 20,
                color: "rgb(74,74,74)"
              }}
              onChangeText={contact => this.onActionImgPopUp(contact)}
              value={this.state.contact}
              type="text"
              placeholder="Name / Contact Number  "
              placeholderTextColor="rgb(215,215,215)"
            />
            <TouchableOpacity
              style={{}}
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
              onPress={() => this.props.navigation.navigate("SplitRPayment")}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>DONE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default RequestPayment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
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

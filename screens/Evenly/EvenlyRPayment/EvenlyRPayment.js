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

export class EvenlyRPayment extends Component {
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
              Amount To Request
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              How much are you requesting from your friend?
            </Text>
          </View>
          <View style={{ width: width / 1.4, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>
              Split evenly among 2 friends
            </Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                marginTop: 20
              }}
            >
              <Thumbnail
                small
                source={{
                  uri:
                    "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
                }}
              />
              <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Ariel L.Mermaid
                </Text>
                <Text style={{ color: "rgb(144,144,144)", paddingTop: 5 }}>
                  +6012-2345789
                </Text>
              </View>
              <View style={{ paddingLeft: 35, paddingTop: 15 }}>
                <Icon
                  type="AntDesign"
                  name="close"
                  style={{ fontSize: 14, color: "#5B86E5" }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                marginTop: 20
              }}
            >
              <Thumbnail
                small
                source={{
                  uri:
                    "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
                }}
              />
              <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Ariel L.Mermaid
                </Text>
                <Text style={{ color: "rgb(144,144,144)", paddingTop: 5 }}>
                  +6012-2345789
                </Text>
              </View>
              <View style={{ paddingLeft: 35, paddingTop: 15 }}>
                <Icon
                  type="AntDesign"
                  name="close"
                  style={{ fontSize: 14, color: "#5B86E5" }}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: width / 1.5,
                paddingTop: 30
              }}
            >
              <TextInput
                disabled={true}
                style={{
                  width: width / 1.5,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                type="text"
                placeholder="MYR"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
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
              onPress={() => this.props.navigation.navigate("ReasonEPayment")}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>NEXT</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default EvenlyRPayment;
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

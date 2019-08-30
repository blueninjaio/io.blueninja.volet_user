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

export class SplitRSummary extends Component {
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
              Split Request Summary
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Payment Requested From
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 20,
              width: width / 1.3,
              padding: 18,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 28
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
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontWeight: "bold" }}>MYR</Text>
                <Text style={{ paddingTop: 5 }}>10.00</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 28
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
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontWeight: "bold" }}>MYR</Text>
                <Text style={{ paddingTop: 5 }}>10.00</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 28
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
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontWeight: "bold" }}>MYR</Text>
                <Text style={{ paddingTop: 5 }}>10.00</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "rgb(144,144,144)" }}>Total Request</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                MYR 20.00
              </Text>
            </View>
            <Text style={{ color: "rgb(144,144,144)", marginTop: 30 }}>
              Reasons of Transfer
            </Text>
            <Text style={{ marginTop: 20 }}>Lorem ipsum bla blabla bla</Text>
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
              onPress={() => this.props.navigation.navigate("SPaymentSuccess")}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Request</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplitRSummary;
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

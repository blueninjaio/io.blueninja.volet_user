import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");

export default class WithdrawAgent extends Component {
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
              Withdraw With Agent
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Nearby agents
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FromAgentWithdrawal")
            }
          >
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 25,
                width: width,
                backgroundColor: "rgb(255,255,255)",
                borderColor: "#ddd",
                shadowColor: "#000",
                shadowOffset: { width: 3, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 1
              }}
            >
              <Thumbnail
                style={{ marginLeft: 20 }}
                source={{
                  uri:
                    "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
                }}
              />
              <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Ariel L.Mermaid
                </Text>
                <Text style={{ color: "rgb(144,144,144)", paddingTop: 15 }}>
                  +6012-2345789
                </Text>
              </View>
              <View style={{ paddingLeft: 35, paddingTop: 31 }}>
                <Text
                  style={{
                    color: "rgb(153,153,153)",
                    fontWeight: "bold"
                  }}
                >
                  0.3km away
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              paddingBottom: 15,
              marginTop: 25,
              width: width,
              backgroundColor: "rgb(255,255,255)",
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 1
            }}
          >
            <Thumbnail
              style={{ marginLeft: 20 }}
              source={{
                uri:
                  "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg"
              }}
            />
            <View style={{ paddingLeft: 20, paddingRight: 25 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Ariel L.Mermaid
              </Text>
              <Text style={{ color: "rgb(144,144,144)", paddingTop: 15 }}>
                +6012-2345789
              </Text>
            </View>
            <View style={{ paddingLeft: 35, paddingTop: 31 }}>
              <Text
                style={{
                  color: "rgb(153,153,153)",
                  fontWeight: "bold"
                }}
              >
                0.3km away
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

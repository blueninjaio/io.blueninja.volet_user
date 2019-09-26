import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from 'expo-linear-gradient'
export const { width, height } = Dimensions.get("window");

export default class TransferToBAcc extends Component {
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
              Transfer Volet Balance To Bank Account
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Transaction fees is applied when withdrawing
            </Text>
          </View>

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
            <View style={{ paddingLeft: 20, paddingTop: 22 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "rgb(152,152,152)"
                }}
              >
                Account Ending 7092
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 50 }}>
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 50
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("TransferToBAccWithdraw")
              }
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 50
              }}
            >
              <Icon
                type="AntDesign"
                name="plus"
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  color: "white"
                }}
              />
            </TouchableOpacity>
          </LinearGradient>
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

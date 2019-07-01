import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "native-base";
export const { width, height } = Dimensions.get("window");

export class ShopDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "grey", height: height / 3 }} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              width: width / 1.2
            }}
          >
            <Text>Krusty</Text>
            <Text>Bikini</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="ios-timer" type="Ionicons" />
                <Text>30 mins</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="ios-timer" type="Ionicons" />
                <Text>10 km</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: width / 1.2,

              }}
            >
              <View>
                <Text>Location</Text>
              </View>
              <View style={{width:width/ 2.5}}>
                <Text>831 Bottom Feeder Lane Bikini Bottom</Text>
              </View>
            </View>
            <Text>Opening Hours</Text>
            <View
              style={{
                width: width / 1.5,
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              <View>
                <Text>Sun</Text>
              </View>
              <View>
                <Text>19:00 - 21:00</Text>
              </View>
            </View>
            <View
              style={{
                width: width / 1.5,
                justifyContent: "space-between",
                flexDirection: "row"
              }}
            >
              <View>
                <Text>Mon</Text>
              </View>
              <View>
                <Text>19:00 - 21:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ShopDetails;
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

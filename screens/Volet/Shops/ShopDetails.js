import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "native-base";
export const { width, height } = Dimensions.get("window");
import dataInfo from "../../../dataInfo/local.json"

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
            <Text>{dataInfo.featuredShopsDetails.title}</Text>
            <Text>{dataInfo.featuredShopsDetails.desc}</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="ios-timer" type="Ionicons" />
                <Text>{dataInfo.featuredShopsDetails.time}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="ios-timer" type="Ionicons" />
                <Text>{dataInfo.featuredShopsDetails.distance}</Text>
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
                <Text>{dataInfo.featuredShopsDetails.address}</Text>
              </View>
            </View>
            <Text>Opening Hours</Text>
            {
              // dataInfo.featuredShopsDetails.openingHours.map((x, i) =>(

              // ))
              }
            
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
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Sun.startTime} - {dataInfo.featuredShopsDetails.openingHours.Sun.endTime}</Text>
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
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Mon.startTime} - {dataInfo.featuredShopsDetails.openingHours.Mon.endTime}</Text>
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
                  <Text>Tues</Text>
                </View>
                <View>
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Tues.startTime} - {dataInfo.featuredShopsDetails.openingHours.Tues.endTime}</Text>
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
                  <Text>Wed</Text>
                </View>
                <View>
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Wed.startTime} - {dataInfo.featuredShopsDetails.openingHours.Wed.endTime}</Text>
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
                  <Text>Thu</Text>
                </View>
                <View>
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Thu.startTime} - {dataInfo.featuredShopsDetails.openingHours.Thu.endTime}</Text>
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
                  <Text>Fri</Text>
                </View>
                <View>
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Fri.startTime} - {dataInfo.featuredShopsDetails.openingHours.Fri.endTime}</Text>
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
                  <Text>Sat</Text>
                </View>
                <View>
                  <Text>{dataInfo.featuredShopsDetails.openingHours.Sat.startTime} - {dataInfo.featuredShopsDetails.openingHours.Sat.endTime}</Text>
                </View>
              </View> 

            {/* <View
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
            </View> */}
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

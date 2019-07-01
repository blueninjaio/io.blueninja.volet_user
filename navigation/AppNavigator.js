import React from "react";

import { createBottomTabNavigator } from "react-navigation";
import { View, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import Icon from "react-native-vector-icons/Ionicons";

import Home from "../screens/Volet/Home";
import Shops from "../screens/Volet/Shops";
import Purchase from "../screens/Volet/Purchases";
import Profile from "../screens/Volet/Profile";

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/homeInactive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          )
      }
    },
    Shops: {
      screen: Shops,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/shopbagInactive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/shopbagActive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ),
          // tabBarVisible: false
      }
    },
    Purchase: {
      screen: Purchase,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/pInActive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/pActive.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/profileInactive.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/profile.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          )
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "black",
      showLabel: false,
      indicatorStyle: { backgroundColor: "transparent" },
      style: {
        backgroundColor: "white",
        // borderTopColor: 'red',
        // borderTopWidth: ,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5,
        height: height / 12
      }
    }
  }
);

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./Home";

const MyHomeScreen = ({ navigation }) => <Home navigation={navigation} />;
MyHomeScreen.navigationOptions = {
  mode: "card",
  header: null,
};

const ModalStack = createStackNavigator(
  {
    Home: {
      screen: MyHomeScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(ModalStack);

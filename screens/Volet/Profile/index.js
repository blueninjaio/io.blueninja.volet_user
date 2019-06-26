import React from "react";
import { createStackNavigator } from "react-navigation";

import Profile from "./Profile";

const MyProfileScreen = ({ navigation }) => <Profile navigation={navigation} />;
MyProfileScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ModalStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;

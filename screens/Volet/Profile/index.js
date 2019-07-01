import React from "react";
import { createStackNavigator } from "react-navigation";

import Profile from "./Profile";
import Setting from "./Setting";
import Logout from "./Logout";
import PersonalDetails from "./PersonalDetails"

const MyProfileScreen = ({ navigation }) => <Profile navigation={navigation} />;
MyProfileScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MySettingScreen = ({ navigation }) => <Setting navigation={navigation} />;
MySettingScreen.navigationOptions = {
  mode: "card",
  title: "Settings",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyLogoutScreen = ({ navigation }) => <Logout navigation={navigation} />;
MyLogoutScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MyPersonalDetailsScreen = ({ navigation }) => <PersonalDetails navigation={navigation} />;
MyPersonalDetailsScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ModalStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen
    },
    Setting: {
      screen: MySettingScreen
    },
    Logout: {
      screen: MyLogoutScreen
    },
    PersonalDetails: {
      screen: MyPersonalDetailsScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;

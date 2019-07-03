import React from "react";
import { createStackNavigator } from "react-navigation";

import Profile from "./Profile";
import Setting from "./Setting";
import Logout from "./Logout";
import PersonalDetails from "./PersonalDetails"
import AboutVolet from "./AboutVolet"
import FAQ from "./FAQ"
import Policies from "./Policies"
import Feedback from "./FeedBack"

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

const MyAboutVoletScreen = ({ navigation }) => <AboutVolet navigation={navigation} />;
MyAboutVoletScreen.navigationOptions = {
  mode: "card",
  title: "About Volet",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFAQScreen = ({ navigation }) => <FAQ navigation={navigation} />;
MyFAQScreen.navigationOptions = {
  mode: "card",
  title: "FAQ",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyPoliciesScreen = ({ navigation }) => <Policies navigation={navigation} />;
MyPoliciesScreen.navigationOptions = {
  mode: "card",
  title: "Policies",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFeedbackScreen = ({ navigation }) => <Feedback navigation={navigation} />;
MyFeedbackScreen.navigationOptions = {
  mode: "card",
  title: "Feedback & Ratings",
  headerStyle: {
    backgroundColor: "white"
  }
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
    },
    AboutVolet: {
      screen: MyAboutVoletScreen
    },
    FAQ: {
      screen: MyFAQScreen
    },
    Policies:{
      screen: MyPoliciesScreen
    },
    Feedback:{
      screen: MyFeedbackScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;

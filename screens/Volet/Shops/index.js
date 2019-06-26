import React from "react";
import { createStackNavigator } from "react-navigation";

import Shops from "./Shops";

const MyShopsScreen = ({ navigation }) => <Shops navigation={navigation} />;
MyShopsScreen.navigationOptions = {
  mode: "card",
  title: "Shops",
  headerStyle: {
    backgroundColor: "white"
  }
};

const ModalStack = createStackNavigator(
  {
    Shops: {
      screen: MyShopsScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;

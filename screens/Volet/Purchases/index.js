import React from "react";
import { createStackNavigator } from "react-navigation";

import Purchase from "./Purchases";

const MyPurchaseScreen = ({ navigation }) => (
  <Purchase navigation={navigation} />
);
MyPurchaseScreen.navigationOptions = {
  mode: "card",
  title: "Purchases",
  headerStyle: {
    backgroundColor: "white"
  }
};

const ModalStack = createStackNavigator(
  {
    Purchase: {
      screen: MyPurchaseScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default ModalStack;

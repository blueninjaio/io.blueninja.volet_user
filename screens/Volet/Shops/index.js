import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Shops from "./Shops";
import ShopList from "./ShopList"
import ShopFeatured from './ShopFeatured'
import ShopDetails from "./ShopDetails"

const MyShopsScreen = ({ navigation }) => <Shops navigation={navigation} />;
MyShopsScreen.navigationOptions = {
  mode: "card",
  title: "Shops",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyShopListScreen = ({ navigation }) => <ShopList navigation={navigation} />;
MyShopListScreen.navigationOptions = {
  mode: "card",
  title: "Shops",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyShopFeaturedScreen = ({ navigation }) => <ShopFeatured navigation={navigation} />;
MyShopFeaturedScreen.navigationOptions = {
  mode: "card",
  title: "Shops",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyShopDetailsScreen = ({ navigation }) => <ShopDetails navigation={navigation} />;
MyShopDetailsScreen.navigationOptions = {
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
    },
    ShopList: {
      screen: MyShopListScreen
    },
    ShopFeatured:{
      screen: MyShopFeaturedScreen
    },
    ShopDetails:{
      screen: MyShopDetailsScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(ModalStack);

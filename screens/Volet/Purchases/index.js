import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


import Purchase from './Purchases'


const MyPurchaseScreen = ({ navigation }) => (
  <Purchase navigation={navigation} />
);
MyPurchaseScreen.navigationOptions = {
    mode: 'card',
    title: 'Purchases',
    headerStyle: {
        backgroundColor: "white",
    },
};

const ModalStack = createStackNavigator(
  {
    Purchase: {
        screen: MyPurchaseScreen,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
      //headerLeft: null,
    }
  }
);

export default ModalStack;
import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


import Shops from './Shops'


const MyShopsScreen = ({ navigation }) => (
  <Shops navigation={navigation} />
);
MyShopsScreen.navigationOptions = {
    mode: 'card',
    title: 'Shops',
    headerStyle: {
        backgroundColor: "white",
    },
};

const ModalStack = createStackNavigator(
  {
    Shops: {
        screen: MyShopsScreen,
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
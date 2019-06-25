import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


import Home from './Home'


const MyHomeScreen = ({ navigation }) => (
  <Home navigation={navigation} />
);
MyHomeScreen.navigationOptions = {
    mode: 'card',
    header: null,
};

const ModalStack = createStackNavigator(
  {
    Home: {
        screen: MyHomeScreen,
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
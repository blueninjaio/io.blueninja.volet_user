import React, { Component } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, ImageBackground, StyleSheet, TextInput, ScrollView, StatusBar, Text, AsyncStorage, Image, ListItem } from 'react-native'
import { SafeAreaView, createStackNavigator, NavigationEvents } from 'react-navigation';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


import Profile from './Profile'


const MyProfileScreen = ({ navigation }) => (
  <Profile navigation={navigation} />
);
MyProfileScreen.navigationOptions = {
    mode: 'card',
    header: null,
};

const ModalStack = createStackNavigator(
  {
    Profile: {
        screen: MyProfileScreen,
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
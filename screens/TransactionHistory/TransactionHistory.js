import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export default class TransactionHistory extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

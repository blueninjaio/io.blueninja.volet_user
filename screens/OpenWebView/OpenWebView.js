import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  AsyncStorage,
  Linking,
  WebView
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
export class OpenWebView extends Component {
  render() {
    return (
      <WebView
        ref={"WEBVIEW_REF"}
        source={{ uri: this.props.navigation.state.params.payment }}
        style={{ height: height, width: width }}
        // onNavigationStateChange={(e) => {
        //     console.log("on Load Start", e.url, e.target, e.title, e.loading)
        // }}
        onShouldStartLoadWithRequest={navigator => {
          if (navigator.url.indexOf("localhost") === -1) {
            return true;
          } else {
            this.refs["WEBVIEW_REF"].stopLoading(); //Some reference to your WebView to make it stop loading that URL
            this.props.navigation.state.params.redirectCallback(navigator.url.substr(navigator.url.indexOf('?') + 1))
            return false;
          }
        }}
      />
    );
  }
}

export default OpenWebView;

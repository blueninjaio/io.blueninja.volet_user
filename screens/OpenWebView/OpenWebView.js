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
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    console.log(params);
    return (
        <WebView
          ref={"WEBVIEW_REF"}
          source={{ uri: params.payment }}
          style={{
            // backgroundColor: "pink",
            width: width,
            height: height
          }}
          // javaScriptEnabled={false}
          // domStorageEnabled={true}
          // startInLoadingState={false}
          //  onNavigationStateChange={(e) => {
          //      console.log("on Load Start", e.url, e.target, e.title, e.loading)
          //  }}
          onShouldStartLoadWithRequest={navigator => {
            console.log("Nav", navigator)
            if (navigator.url.indexOf("localhost") === -1) {
              return true;
            } else {
              this.refs["WEBVIEW_REF"].stopLoading(); //Some reference to your WebView to make it stop loading that URL
              params.redirectCallback(
                navigator.url.substr(navigator.url.indexOf("?") + 1)
              );
              return false;
            }
          }}
        />
    );
  }
}

export default OpenWebView;

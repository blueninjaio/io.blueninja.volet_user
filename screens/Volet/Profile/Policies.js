import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  AsyncStorage
} from "react-native";
import { dev, prod, url } from "../../../config";
export const { width, height } = Dimensions.get("window");

export class Policies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      policies: []
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of Get Policies
  |--------------------------------------------------
  */

 getUserID = async () => {
  try {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      this.setState({ token });
      this.getPolicies(token);
    }
  } catch (error) {
    console.log(error);
  }
};

componentDidMount = () => {
  this.getUserID();
};

  getPolicies = (token) => {
    fetch(`${url}/static/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token

      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Policies :", data);
        if (data.static.length >= 1) {
          this.setState({ policies: data.static });
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.state.policies.map((x, i) => (
              <View
                key={i}
                style={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingBottom: 20
                }}
              >
                <Text>{x.policies}</Text>
              </View>
            ))}
            {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  padding: 10,
                  color: "#5B86E5",
                  fontSize: width * 0.06,
                  fontWeight: "500"
                }}
              >
                Introduction
              </Text>
              <Text style={{ fontSize: 15, padding: 10, lineHeight: 20 }}>
                Lorem Ipsum is the single greatest threat. We are not - we are
                not keeping up with other websites. Lorem Ipsum best not make
                any more threats to your website. It will be met with fire and
                fury like the world has never seen. Does everybody know that pig
                named Lorem Ipsum? An ‘extremely credible source’ has called my
                office and told me that Barack Obama’s placeholder text is a
                fraud.
              </Text>
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Policies;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

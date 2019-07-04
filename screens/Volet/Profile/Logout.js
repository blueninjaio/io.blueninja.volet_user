import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
export const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
import { dev, prod, url } from "../../../config/index";


export class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  /**
  |--------------------------------------------------
  | Implementing User Logout with Redux
  |--------------------------------------------------
  */
  UserSignedOut = async () => {
    try {
      let value = await AsyncStorage.clear();
      if (value === null || value === undefined) {
        this.removeNotificationToken();
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  /**
  |--------------------------------------------------
  | Implementation of retrieving User email 
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getEmail();
  }

  getEmail = async () => {
    try {
      let value = await AsyncStorage.getItem("email");
      if (value !== null) {
        this.setState({ email: value });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  /**
|--------------------------------------------------
| Remove Notification Token
|--------------------------------------------------
*/
  removeNotificationToken = () => {
    fetch(`${url}/api/users/removePush`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          this.props.logMeIn();
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
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: height / 2
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>We are sad to see you go</Text>
            <Text>Are you sure you want to log out</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{ padding: 20, backgroundColor: "grey" }}
              onPress={() => this.UserSignedOut()}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20, backgroundColor: "grey" }}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logMeIn: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center"
    justifyContent: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

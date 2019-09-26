import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Alert,
  SafeAreaView
} from "react-native";
import StarRating from "react-native-star-rating";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../../config/index";
import { CheckBox } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

export class ConvertAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: 0,
      name: "",
      feedback: "",
      email: "",
      contact: "",
      _id: "",
      firstname: "",
      lastname: "",
      isSelected: "",
      token: ""
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of retrieving user info from AsyncStorage
  |--------------------------------------------------
  */
  componentDidMount = async () => {
    //get user id and set state to _id
    try {
      let value = await AsyncStorage.getItem("ID");
      let token = await AsyncStorage.getItem("token");
      let firstname = await AsyncStorage.getItem("firstname");
      let lastname = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");

      if (value !== null) {
        this.setState({ _id: value });
        this.setState({ token });
        this.setState({ firstname });
        this.setState({ lastname });
        this.setState({ email });
        this.setState({ contact });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server",
        `Please check your internet or try again later`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  CheckBox = () => {
    this.setState({ isSelected: !this.state.isSelected });
  };
  /**
  |--------------------------------------------------
  | Implementation of converting agent info
  |--------------------------------------------------
  */
  convertAgent = () => {
    if (this.state.isSelected === true) {
      fetch(`${url}/users/agents/apply`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.state.token
        }
        // body: JSON.stringify({
        //   user_id: this.state._id
        // })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log(data)
            alert("Success");
            this.props.navigation.navigate("Profile");
          } else {
            Alert.alert(
              "Failed",
              `${data.message}`,
              [{ text: "OK", onPress: () => null }],
              { cancelable: false }
            );
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
    } else {
      alert("Please agree the terms and conditions");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 40
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 20,
              width: width / 1.3
            }}
          >
            <Text
              style={{
                padding: 10,
                color: "#5B86E5",
                fontSize: width * 0.06,
                fontWeight: "500"
              }}
            >
              Convert To Agent
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              By filling up this form you agree to convert to an agent and
              agreed to all terms and conditions from volet
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 20,
              width: width / 1.3,
              marginTop: 40
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
              First Name
            </Text>
            <TextInput
              disabled={true}
              style={{
                alignSelf: "center",
                marginTop: 10,
                width: width / 1.3,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 12
              }}
              // onChangeText={name => this.setState({ name })}
              value={this.state.firstname}
              type="text"
              placeholder="Your first Name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 20,
              width: width / 1.3
            }}
          >
            <Text>Last Name</Text>
            <TextInput
              disabled={true}
              style={{
                alignSelf: "center",
                marginTop: 10,
                width: width / 1.3,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 12
              }}
              // onChangeText={name => this.setState({ name })}
              value={this.state.lastname}
              type="text"
              placeholder="Last name"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 20,
              width: width / 1.3
            }}
          >
            <Text>Email</Text>
            <TextInput
              disabled={true}
              style={{
                alignSelf: "center",
                marginTop: 10,
                width: width / 1.3,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 12
              }}
              // onChangeText={email => this.setState({ email })}
              value={this.state.email}
              type="text"
              placeholder="Your Email"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: 20,
              width: width / 1.3
            }}
          >
            <Text>Mobile Number</Text>
            <TextInput
              disabled={true}
              style={{
                alignSelf: "center",
                marginTop: 10,
                width: width / 1.3,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 12
              }}
              // onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              type="text"
              placeholder="Your mobile number"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "row",
              paddingTop: 30,
              width: width / 1.3
            }}
          >
            {this.state.isSelected === true ? (
              <TouchableOpacity
                style={{
                  height: 15,
                  width: 15,
                  borderColor: "#5B86E5",
                  borderWidth: 1,
                  backgroundColor: "#5B86E5"
                }}
                onPress={() => this.CheckBox()}
              />
            ) : (
              <TouchableOpacity
                style={{
                  height: 15,
                  width: 15,
                  borderColor: "#5B86E5",
                  borderWidth: 1
                }}
                onPress={() => this.CheckBox()}
              />
            )}

            <Text style={{ color: "black", paddingLeft: 10 }}>
              I agreed to the terms and conditions{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            width: width
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              onPress={() => this.convertAgent()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default ConvertAgent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

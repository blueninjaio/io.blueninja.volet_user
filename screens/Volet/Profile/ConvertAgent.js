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
  Alert
} from "react-native";
import StarRating from "react-native-star-rating";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../../config/index";
import { CheckBox } from "native-base";

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
      isSelected:""
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
      let firstname = await AsyncStorage.getItem("firstname");
      let lastname = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");


      if (value !== null) {
        this.setState({ _id: value });
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
    this.setState({isSelected: !this.state.isSelected})
  }
  /**
  |--------------------------------------------------
  | Implementation of converting agent info
  |--------------------------------------------------
  */
  convertAgent = () => {
      console.log(this.state._id)
    if (this.state.isSelected === true){
    fetch(`${url}/agents`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        user_id: this.state._id,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          Alert.alert(
            "Success",
            `${data.message}`,
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("Profile")
              }
            ],
            { cancelable: false }
          );
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
    }
    else{
        alert("Please agree the terms and conditions");
    }

  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: width / 1.1
              }}
            >
              <View style={{ width: width / 1.8 }}>
                <Text>Convert To Agent</Text>
                <Text>
                  By filling up this form you agree to convert to an agent and
                  agreed to all terms and conditions from volet
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>First Name</Text>
              <TextInput
                disabled={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                // onChangeText={name => this.setState({ name })}
                value={this.state.firstname}
                type="text"
                placeholder="Your Full Name"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Last Name</Text>
              <TextInput
                disabled={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
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
                paddingTop: 30
              }}
            >
              <Text>Email</Text>
              <TextInput
                disabled={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
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
                paddingTop: 30
              }}
            >
              <Text>Mobile Number</Text>
              <TextInput
                disabled={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
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
                paddingTop: 30
              }}
            >
              {this.state.isSelected === true ? (
                <TouchableOpacity
                  style={{ height: 15, width: 15, borderColor: "blue", borderWidth: 1, backgroundColor:"blue" }}
                  onPress={() => this.CheckBox()}
                />
              ) : (
                <TouchableOpacity
                  style={{ height: 15, width: 15, borderColor: "blue", borderWidth: 1,  }}
                  onPress={() => this.CheckBox()}
                />
              )}

              <Text>I agreed to the terms and conditions </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.convertAgent()}
              style={{ backgroundColor: "grey", padding: 20 }}
            >
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
  }
});

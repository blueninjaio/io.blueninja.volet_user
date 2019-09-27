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
import { LinearGradient } from "expo-linear-gradient";

export class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: 0,
      name: "",
      feedback: "",
      email: "",
      contact: "",
      fullname: ""
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
      let token = await AsyncStorage.getItem("token");
      let firstname = await AsyncStorage.getItem("firstname");
      let lastname = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");

      if (toekn !== null) {
        let fullname = firstname + " " + lastname;
        this.setState({ token });
        this.setState({ fullname });
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

  /**
  |--------------------------------------------------
  | Implementation of Ratings Value
  |--------------------------------------------------
  */
  ratingCompleted = rating => {
    this.setState({ ratings: rating });
  };

  /**
  |--------------------------------------------------
  | Implementation of updating feedback info
  |--------------------------------------------------
  */
  addFeedback = () => {
    fetch(`${url}/feedback`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      },
      body: JSON.stringify({
        rating: this.state.ratings,
        description: this.state.feedback
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
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
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
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
                Give us some feedback and Ratings
              </Text>
              <Text
                style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
              >
                Are you happy with our app? What do you think we need to improve
                on
              </Text>
              <View>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  starSize={30}
                  rating={this.state.ratings}
                  halfStarEnabled={true}
                  starStyle={{ padding: 15 }}
                  selectedStar={rating => this.ratingCompleted(rating)}
                />
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>Name</Text>
              <TextInput
                disabled={true}
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                // onChangeText={name => this.setState({ name })}
                value={this.state.fullname}
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
              <Text style={{ color: "black", fontWeight: "500" }}>Email</Text>
              <TextInput
                disabled={true}
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                // onChangeText={name => this.setState({ name })}
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
              <Text style={{ color: "black", fontWeight: "500" }}>
                Mobile Number
              </Text>
              <TextInput
                disabled={true}
                style={{
                  width: width / 1.2,
                  marginBottom: 15,
                  marginTop: 10,
                  height: 20,
                  color: "rgb(74,74,74)",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5",
                  fontSize: 13
                }}
                // onChangeText={name => this.setState({ name })}
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
                paddingTop: 30
              }}
            >
              <Text style={{ color: "black", fontWeight: "500" }}>
                Can you tell us a little bit more?
              </Text>
              <TextInput
                multiline={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 150,
                  color: "rgb(74,74,74)",
                  borderWidth: 1,
                  borderColor: "#5B86E5",
                  fontSize: 13,
                  flexShrink: 1,
                  marginBottom: 15,
                  marginTop: 10
                }}
                onChangeText={feedback => this.setState({ feedback })}
                value={this.state.feedback}
                type="text"
                placeholder="Your Message"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            {/* <TouchableOpacity
              onPress={() => this.addFeedback()}
              style={{ backgroundColor: "grey", padding: 20 }}
            >
              <Text>Send</Text>
            </TouchableOpacity> */}
            <LinearGradient
              colors={["#36D1DC", "#5B86E5"]}
              style={styles.buttonStyle}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.addFeedback()}
              >
                <Text style={styles.loginText}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default FeedBack;
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

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

export class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: 0,
      name: "",
      feedback: "",
      email: "",
      contact: "",
      _id: "",
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
      let value = await AsyncStorage.getItem("ID");
      let firstname = await AsyncStorage.getItem("firstname");
      let lastname = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");

      if (value !== null) {
        let fullname = firstname + " " + lastname;

        this.setState({ _id: value });
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
    fetch(`${url}/api/feedbacks`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        user_id: this.state._id,
        rating: this.state.ratings,
        description: this.state.feedback
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
                <Text>Give us some feedback and Ratings</Text>
                <Text>
                  Are you happy with our app? What do you think we need to
                  improve on
                </Text>
              </View>
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
            >
              <Text>Name</Text>
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
                paddingTop: 30
              }}
            >
              <Text>Can you tell us a little bit more?</Text>
              <TextInput
                multiline={true}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 150,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)",
                  flexShrink: 1
                }}
                onChangeText={feedback => this.setState({ feedback })}
                value={this.state.feedback}
                type="text"
                placeholder="Your Message"
                placeholderTextColor="rgb(74,74,74)"

              />
            </View>
            <TouchableOpacity
              onPress={() => this.addFeedback()}
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

export default FeedBack;
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

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import StarRating from "react-native-star-rating";
export const { width, height } = Dimensions.get("window");

export class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: 0
    };
  }

  ratingCompleted = rating => {
    console.log("Rating is: " + rating);
    this.setState({ ratings: rating });
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
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
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
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={email => this.setState({ email })}
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
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={contact => this.setState({ contact })}
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
                numberOfLines={5}
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 150,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={storeDesc => this.setState({ storeDesc })}
                value={this.state.storeDesc}
                type="text"
                placeholder="Your Message"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
            <TouchableOpacity style={{ backgroundColor: "grey", padding: 20 }}>
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

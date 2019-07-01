import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { ImagePicker, Permissions } from "expo";

export class PersonalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address: "",
      imageUri: ""
    };
  }


  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Image picker
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        //its granted.
      }
    }
  };

    /**
  |--------------------------------------------------
  | Image Picker Implementation
  |--------------------------------------------------
  */
  _onChoosePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log("Image link", result); // this logs correctly
    if (!result.cancelled) {
      this.setState({ imageUri: result.uri });
      // TODO: why isn't this showing up inside the Image on screen?
    }
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const { cancelled, uri } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  };

  render() {
    return (
      <View styles={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 20,
              marginTop: 30
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
                // height: height / 8
                // backgroundColor: "grey"
              }}
            >
            {
              this.state.imageUri !== ""
              ?
              <Thumbnail
                large
                style={{ backgroundColor: "grey" }}
                source={{ uri: `${this.state.imageUri}` }}
              />
              :
              <Thumbnail
                large
                style={{ backgroundColor: "grey" }}
                // source={{ uri: `${this.state.imageUri}` }}
              />

            }
              
              <TouchableOpacity
                style={{
                  //   justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 30
                }}
                onPress={() => this._onChoosePic()}
              >
                <Icon name="ios-add-circle-outline" type="Ionicons" />
                <Text>Upload Profile Images</Text>
              </TouchableOpacity>
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
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
                type="text"
                placeholder="First name"
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
                style={{
                  alignSelf: "center",
                  width: width / 1.2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
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
                placeholder="Email"
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
                type="number"
                placeholder="First name"
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
              <Text>Address </Text>
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
                onChangeText={id => this.setState({ address })}
                value={this.state.address}
                type="text"
                placeholder="Passport Number"
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 30
              }}
              onPress={() => this.inputCheck()}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PersonalDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

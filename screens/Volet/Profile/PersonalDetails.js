import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { ImagePicker, Permissions, LinearGradient } from "expo";
import { dev, prod, url } from "../../../config";

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
    this.getUserInfo();
  }

  /**
  |--------------------------------------------------
  | Implementation of retrieving user info from AsyncStorage
  |--------------------------------------------------
  */
  getUserInfo = async () => {
    //get user id and set state to _id
    try {
      let token = await AsyncStorage.getItem("token");
      let firstName = await AsyncStorage.getItem("firstname");
      let lastName = await AsyncStorage.getItem("lastname");
      let email = await AsyncStorage.getItem("email");
      let contact = await AsyncStorage.getItem("contact");

      if (token !== null) {
        this.setState({ token });
        this.setState({ firstName });
        this.setState({ lastName });
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

  editUserInfo = async () => {
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      imageUri,
      token
    } = this.state;

    let formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "userImage.jpg",
      type: "image/jpg"
    });
    formData.append("f_name", firstName);
    formData.append("l_name", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("contact", contact);

    fetch(`${url}/users/edit`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      },
      body: formData
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
                onPress: () => this.props.navigation.navigate("Home")
              }
            ],
            { cancelable: false }
          );
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  inputCheck = () => {
    const {
      firstName,
      lastName,
      email,
      contact,
      address,
      imageUri
    } = this.state;
    if (firstName === "" || lastName === "") {
      alert("Please enter valid name");
    } else if (email.length < 5 || !email.includes("@")) {
      alert(`Please enter a valid email address.`);
    } else if (imageUri === "") {
      alert("Please upload an image");
    } else if (address === "") {
      alert("Please enter valid address");
    } else {
      this.editUserInfo();
    }
  };

  render() {
    return (
      <SafeAreaView styles={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // paddingLeft: 15,
                // paddingRight: 20,
                marginTop: 30
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.imageUri !== "" ? (
                  <Thumbnail
                    large
                    style={{ backgroundColor: "grey" }}
                    source={{ uri: `${this.state.imageUri}` }}
                  />
                ) : (
                  <Thumbnail
                    large
                    // style={{ backgroundColor: "grey" }}
                    source={{
                      uri: `https://cdn4.iconfinder.com/data/icons/basic-interface-overcolor/512/user-512.png`
                    }}
                  />
                )}

                <TouchableOpacity
                  style={{
                    //   justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingTop: 30
                  }}
                  onPress={() => this._onChoosePic()}
                >
                  <Icon
                    name="ios-add-circle-outline"
                    type="Ionicons"
                    style={{ fontSize: 17, color: "#5B86E5" }}
                  />
                  <Text
                    style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}
                  >
                    Upload Profile Images
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 30
                }}
              >
                <Text style={{ color: "rgb(74, 74, 74)" }}>First Name</Text>
                <TextInput
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
                    width: width / 1.2,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5",
                    fontSize: 13
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
                    width: width / 1.2,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5",
                    fontSize: 13
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
                    width: width / 1.2,
                    marginBottom: 15,
                    marginTop: 10,
                    height: 20,
                    color: "rgb(74,74,74)",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5B86E5",
                    fontSize: 13
                  }}
                  // onChangeText={contact => this.setState({ contact })}
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
                  paddingTop: 30,
                  marginBottom: 20
                }}
              >
                <Text>Address </Text>
                <TextInput
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
                  onChangeText={address => this.setState({ address })}
                  value={this.state.address}
                  type="text"
                  placeholder="Address"
                  placeholderTextColor="rgb(74,74,74)"
                />
              </View>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.buttonStyle}
              >
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.inputCheck()}
                >
                  <Text style={styles.loginText}>Next</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
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

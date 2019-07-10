import React from "react";
export const { width, height } = Dimensions.get("window");
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  LayoutAnimation
} from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail,
  Title
} from "native-base";
import { LinearGradient } from "expo";
import SwipeUpDown from "react-native-swipe-up-down";
import { dev, prod, url } from "../../../config/index";
import { BarCodeScanner, Permissions } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "Fa Mulan",
      id: "",
      username: "",
      balance: 0,
      animation: "easeInEaseOut",
      hasCameraPermission: null,
      lastScannedUrl: null,
    };
  }
  /**
|--------------------------------------------------
| Get Volet balance
|--------------------------------------------------
*/
  componentDidMount = () => {
    this.getUserID();
    this.getPermissionAsync();
  };

  getUserID = async () => {
    try {
      let id = await AsyncStorage.getItem("ID");
      let username = await AsyncStorage.getItem("firstname");
      if (id !== null) {
        this.getVolet(id);
        this.setState({ id });
        this.setState({ username });
      }
    } catch (error) {
      Alert.alert(
        "Error connecting to server storage",
        `${error}`,
        [{ text: "OK", onPress: () => null }],
        { cancelable: false }
      );
    }
  };

  getVolet = ID => {
    fetch(`${url}/api/volet/id`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        persona_id: ID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Voucher :", data);
        if (data.success === true) {
          this.setState({ balance: data.total });
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server Volet",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Image picker
  |--------------------------------------------------
  */

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
    // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // if (permission.status !== "granted") {
    //   const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (newPermission.status === "granted") {
    //     //its granted.
    //   }
    // }
  };

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  // _onTakePic = async () => {
  //   const result = await ImagePicker.launchCameraAsync({});
  //   console.log("Image link", result); // this logs correctly
  //   if (!result.cancelled) {
  //     this.setState({ imageUri: result.uri });
  //     // TODO: why isn't this showing up inside the Image on screen?
  //   }
  // };


  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      console.log("Bar code", result.data)
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={styles.header}>
            <Header style={styles.headerOne}>
              <Left />
              <Body style={styles.headerOneBody}>
                <Image
                  source={require("../../../assets/VoletLogo.png")}
                  resizeMode="contain"
                  style={{ width: 90, height: 90 }}
                />
              </Body>
              <Right style={styles.headerOneRight}>
                <Image
                  source={require("../../../assets/bell.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                />
              </Right>
            </Header>
            <View style={styles.welcomeUser}>
              <Text
                style={{
                  padding: 5,
                  fontSize: 17,
                  color: "white",
                  opacity: 0.7
                }}
              >
                Welcome back,{" "}
              </Text>
              <Text
                style={{
                  padding: 5,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                {this.state.user}
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.userVolet}>
            <Thumbnail
              large
              source={{
                uri: `https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg`
              }}
              style={{ backgroundColor: "grey", borderColor: "white" }}
            />
            <View style={styles.voletBalance}>
              <Text
                style={{
                  padding: 5,
                  fontSize: 17,
                  color: "grey",
                  opacity: 0.9
                }}
              >
                Your Volet Balance
              </Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                RM{this.state.balance}
              </Text>
            </View>
          </View>
          <View style={styles.savingsCard}>
            <View style={styles.savingsCardTwo}>
              <Body style={{ padding: 5, alignItems: "center" }}>
                <Text style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}>
                  Balance available today
                </Text>
                <Text style={{ color: "green", paddingBottom: 5 }}>
                  RM 10.00
                </Text>
                <LinearGradient
                  colors={["#36D1DC", "#5B86E5"]}
                  style={styles.savingsBar}
                />
                <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>
                  Monthly Savings Plan: RM 20.00/day
                </Text>
              </Body>
            </View>
          </View>
          <View style={styles.payments}>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/sendP.png")}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/requestP.png")}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require("../../../assets/topUP.png")}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.qrcode}
          onPress={() => this.swipeUpDownRef.showFull()}
        >
          <Card style={{ width: width }}>
            <CardItem>
              <Body
                style={{
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../../../assets/qrcode.png")}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ paddingLeft: 10 }}>
                  Swipe up To scan OR Code
                </Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
        <SwipeUpDown
          hasRef={ref => (this.swipeUpDownRef = ref)}
          // itemMini={}
          itemFull={
            <View
              style={{
                flex: 1,
                backgroundColor: "pink"
              }}
            >
              <Header>
                <Left />
                <Body>
                  <Title>QR Code</Title>
                </Body>
                <Right>
                  <Text>Cancel</Text>
                </Right>
              </Header>
              <ScrollView>
                <View
                  style={{
                    paddingTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-center"
                    }}
                  >
                    <Text>Scan a QR code </Text>
                    <Text>
                      Scan a volet QR code to send payment to collect money from
                      agent
                    </Text>
                  </View>
                </View>
                {this.state.hasCameraPermission === null ? (
                  <Text>Requesting for camera permission</Text>
                ) : this.state.hasCameraPermission === false ? (
                  <Text style={{ color: "#fff" }}>
                    Camera permission is not granted
                  </Text>
                ) : (
                  <BarCodeScanner
                    onBarCodeRead={this._handleBarCodeRead}
                    style={{
                      height: height / 2.5,
                      width: width
                    }}
                  />
                )}
                <View
                  style={{
                    paddingTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity style={{ paddingTop: 20 }}>
                    <Text>Show QR Code</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          }
          onShowMini={() => console.log("mini")}
          onShowFull={() => console.log("full")}
          disablePressToShow={true}
          style={{}}
          animation={this.state.animation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: height / 4
  },
  headerOne: {
    backgroundColor: "transparent",
    borderColor: null,
    justifyContent: "center",
    alignItems: "center"
  },
  headerOneBody: {
    alignItems: "center"
  },
  headerOneRight: {
    alignItems: "center"
  },
  welcomeUser: {
    alignItems: "center"
    // flexDirection:"row"
  },
  userVolet: {
    marginTop: -40,
    justifyContent: "center",
    alignItems: "center"
  },
  voletBalance: {
    padding: 15,
    alignItems: "center"
  },
  savingsCard: {
    alignItems: "center"
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0
  },
  payments: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20
  },
  qrcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -5
  },
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  savingsCardTwo: {
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    // borderColor:"white",
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  }
});

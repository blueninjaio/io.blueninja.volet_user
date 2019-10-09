import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { dev, prod, url } from "../../config/index";
import { LinearGradient } from "expo-linear-gradient";

export default class WithdrawAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      location: { coords: { latitude: 3.12703, longitude: 101.61751 } },
      token: "",
      userAgents: [],
      distance: "",
      agentCoords: []
    };
  }

  componentDidMount() {
    this._getLocationAsync();
    this.getUserID();
  }

  getUserID = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.getUserAgent(token);
        this.setState({ token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest
    });
    this.setState({ locationResult: JSON.stringify(location), location });
    // this.updateUserLocation(DMS);
  };

  getUserAgent = async token => {
    let userCoors = [];
    let agentCoords = [];
    let lat = "";
    let long = "";
    let temp = {};
    try {
      fetch(`${url}/users/agents`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("Users Agent:", data);
          if (data.success === true) {
            this.setState({ userAgents: data.users });
            data.users.map(x => {
              userCoors = x.gps_coordinates.split(",");
              lat = Number(userCoors[0]);
              long = Number(userCoors[1]);
              temp = {
                longitude: long,
                latitude: lat
              };
              agentCoords.push(temp);
            });
            console.log("User coords", agentCoords);
            this.setState({ agentCoords });
          } else {
            alert(data.message);
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
    } catch (error) {
      console.log(error);
    }
  };

  userDistance = coords => {
    const { location } = this.state;
    let userCoors = coords.split(",");
    // console.log("User coords", userCoors, location.coords);
    let lat = userCoors[0];
    let long = userCoors[1];
    let distance = this.distanceInKmBetweenEarthCoordinates(
      lat,
      long,
      location.coords.latitude,
      location.coords.longitude
    );

    return distance.toFixed(2);
  };

  distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    var earthRadiusKm = 6371;
    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  degreesToRadians = degrees => {
    return (degrees * Math.PI) / 180;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={{ flexGrow: 1 }}>
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
                  Withdraw With Agent
                </Text>
                <Text
                  style={{
                    padding: 10,
                    color: "grey",
                    fontSize: width * 0.034
                  }}
                >
                  Nearby agents
                </Text>
              </View>
              <View style={styles.mapContainer}>
                <MapView
                  provider={MapView.PROVIDER_GOOGLE}
                  style={styles.map}
                  showCompass={true}
                  rotateEnabled={false}
                  showUserLocation={true}
                  region={{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                  // onRegionChange={this._handleMapRegionChange}
                >
                  {this.state.agentCoords.map((x, i) => (
                    <MapView.Marker
                      coordinate={x}
                      title="Agent"
                      pinColor="blue"
                      key={i}
                    />
                  ))}

                  <MapView.Marker
                    coordinate={this.state.location.coords}
                    title="My Current location"
                  />
                </MapView>
              </View>

              {this.state.userAgents.length >= 1 ? (
                this.state.userAgents.map((x, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("FromAgentWithdrawal", {
                        widthdrawAgent: x,
                        distance: this.userDistance(x.gps_coordinates)
                      })
                    }
                    key={i}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 15,
                        paddingBottom: 15,
                        marginTop: 25,
                        width: width,
                        backgroundColor: "rgb(255,255,255)",
                        borderColor: "#ddd",
                        shadowColor: "#000",
                        shadowOffset: { width: 3, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 1
                      }}
                    >
                      <LinearGradient
                        colors={["#36D1DC", "#5B86E5"]}
                        style={{
                          borderRadius: 20,
                          marginLeft: 20,
                          width: 40,
                          height: 40,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>
                          {x.f_name.substring(0, 1)}
                          {x.l_name.substring(0, 1)}
                        </Text>
                      </LinearGradient>
                      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {x.f_name} {x.l_name}
                        </Text>
                        <Text
                          style={{ color: "rgb(144,144,144)", paddingTop: 15 }}
                        >
                          {x.contact}
                        </Text>
                      </View>
                      <View style={{ paddingLeft: 35, paddingTop: 31 }}>
                        <Text
                          style={{
                            color: "rgb(153,153,153)",
                            fontWeight: "bold"
                          }}
                        >
                          {this.userDistance(x.gps_coordinates)}km away
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    No user agent around you
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: height / 3,
    width: 600,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  }
});

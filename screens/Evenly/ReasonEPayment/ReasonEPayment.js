import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
  Keyboard
} from "react-native";
import { Icon, Thumbnail } from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");
// import { dev, prod, url } from "../../../config";

export class ReasonEPayment extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
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
              Reason Of Request
            </Text>
            <View
              style={{
                padding: 10
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: width * 0.034,
                  marginBottom: 5
                }}
              >
                What is the reason for you request?
              </Text>
              <Text style={{ color: "grey", fontSize: width * 0.034 }}>
                Feel free to attach your receipt or skip
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              width: width / 1.5
            }}
          >
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 2,
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                height: 20,
                color: "rgb(74,74,74)"
              }}
              type="text"
              placeholder="Reason of my transfer"
              placeholderTextColor="rgb(215,215,215)"
            />
            <TouchableOpacity
              style={{}}
              //   onPress={() => this.props.navigation.navigate("PaymentAmount")}
            >
              <Image
                source={require("../../../assets/qrcode.png")}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.listItemButtonSwitch}
            onPress={() => this.props.navigation.navigate("SeparatelyRPayment")}
          >
            <View style={styles.show}>
              <Image
                source={require("../../../assets/glasses.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.listItemText}>Transportation</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.listItemButtonSwitch}
            onPress={() => this.props.navigation.navigate("SeparatelyRPayment")}
          >
            <View style={styles.show}>
              <Image
                source={require("../../../assets/glasses.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.listItemText}>Utilities</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.listItemButtonSwitch}
            onPress={() => this.props.navigation.navigate("SeparatelyRPayment")}
          >
            <View style={styles.show}>
              <Image
                source={require("../../../assets/glasses.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.listItemText}>Food & Beverage</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.listItemButtonSwitch}
            onPress={() => this.props.navigation.navigate("SeparatelyRPayment")}
          >
            <View style={styles.show}>
              <Image
                source={require("../../../assets/glasses.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.listItemText}>Shopping</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.listItemButtonSwitch}
            onPress={() => this.props.navigation.navigate("SeparatelyRPayment")}
          >
            <View style={styles.show}>
              <Image
                source={require("../../../assets/glasses.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.listItemText}>Entertainment</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 60,
            width: width
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SplitESummary")}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>DONE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default ReasonEPayment;
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
  },
  listItemButtonSwitch: {
    padding: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    width: width / 1.4,
    alignSelf: "center"
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.8,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  }
});

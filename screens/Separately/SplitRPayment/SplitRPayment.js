import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
export const { width, height } = Dimensions.get("window");

export class SplitRPayment extends Component {
  render() {
    console.log(this.props.navigation.state.params.selectedContact)
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
              How would you like split your request?
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity
              style={styles.listItemButtonSwitch}
              onPress={() =>
                this.props.navigation.navigate("EvenlyRPayment", {
                  selectedContact: this.props.navigation.state.params.selectedContact
                })
              }
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/glasses.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Evenly</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.listItemButtonSwitch}
              onPress={() =>
                this.props.navigation.navigate("SeparatelyRPayment", {
                  selectedContact: this.props.navigation.state.params.selectedContact

                })
              }
            >
              <View style={styles.show}>
                <Image
                  source={require("../../../assets/glasses.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.listItemText}>Seperately</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplitRPayment;
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
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    width: width / 1.1,
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

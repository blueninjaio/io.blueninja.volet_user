import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { LinearGradient } from 'expo-linear-gradient'

export class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onPressContact = value => {
    if (value.contacts !== "") {
      this.props.onActionSelectNumber(value);
    } else {
      alert("Invalid Number");
    }
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        {/* <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "600"
          }}
        >
          {this.props.alpha}
        </Text> */}
        {this.props.contacts.length >= 1 ? (
          this.props.contacts.map((x, i) => (
            <View key={i}>
              {x.contact ? (
                <TouchableOpacity
                  style={{
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    paddingTop: 5,
                    paddingBottom: 5,
                    width: width / 1.3
                  }}
                  onPress={() => this.onPressContact(x)}
                >
                  <LinearGradient
                    colors={["#36D1DC", "#5B86E5"]}
                    style={{
                      borderRadius: 20,
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
                  <View style={{ justifyContent: "center", marginLeft: 20 }}>
                    <Text
                      style={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        color: "black",
                        fontSize: 17,
                        fontWeight: "600"
                      }}
                    >
                      {x.f_name + " " + x.l_name}
                    </Text>
                    <Text
                      style={{
                        color: "rgb(74,74,74)",
                        fontSize: 17
                      }}
                    >
                      {x.contact}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          ))
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 15, color: "rgb(214, 214, 214)" }}>
              There is not contact on Volet
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default ContactList;

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Icon, Thumbnail, Spinner } from "native-base";
export const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo";

export class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onPressContact = value => {
    if (value.phoneNumbers[0].digits !== "") {
      this.props.onActionSelectNumber(value);
    } else {
      alert("Invalid Number");
    }
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "600"
          }}
        >
          {this.props.alpha}
        </Text>
        {this.props.contacts.map((x, i) => (
          <View key={i}>
            {x.phoneNumbers ? (
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
                    borderRadius: 30,
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    {x.firstName
                      ? x.firstName.substring(0, 1)
                      : x.name.substring(0, 1)}

                    {x.lastName ? x.lastName.substring(0, 1) : null}
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
                    {x.name}
                  </Text>

                  {x.phoneNumbers !== undefined && x.phoneNumbers.length > 0 ? (
                    <Text
                      style={{
                        color: "rgb(74,74,74)",
                        fontSize: 17
                      }}
                    >
                      {x.phoneNumbers[0].digits}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    );
  }
}

export default ContactList;

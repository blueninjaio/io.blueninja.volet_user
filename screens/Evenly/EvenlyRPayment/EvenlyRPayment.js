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
import { Input } from "react-native-elements";

export class EvenlyRPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payContact: []
    };
  }

  componentDidMount() {
    this.setState({
      payContact: this.props.navigation.state.params.selectedContact
    });
  }

  onActionRemoveContact = value => {
    let payContact = [];
    payContact = this.state.payContact.filter(x => value.name !== x.name);
    console.log("Selected Contact remove", payContact);
    this.setState({ payContact });
  };

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
              Amount To Request
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              How much are you requesting from your friend?
            </Text>
          </View>
          <View style={{ width: width / 1.4, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>
              Split evenly among {this.state.payContact.length} friends
            </Text>
            {this.state.payContact.length >= 1
              ? this.state.payContact.map((x, i) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20
                    }}
                    key={i}
                  >
                    <View style={{ flexDirection: "row", width: width / 2 }}>
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
                          {x.firstName.substring(0, 1)}
                          {x.lastName.substring(0, 1)}
                        </Text>
                      </LinearGradient>
                      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                          {x.name}
                        </Text>
                        <Text
                          style={{ color: "rgb(144,144,144)", paddingTop: 5 }}
                        >
                          {x.phoneNumbers[0].digits}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{ paddingLeft: 35, paddingTop: 15 }}
                      onPress={() => this.onActionRemoveContact(x)}
                    >
                      <Icon
                        type="AntDesign"
                        name="close"
                        style={{ fontSize: 14, color: "#5B86E5" }}
                      />
                    </TouchableOpacity>
                  </View>
                ))
              : null}
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: width / 1.5,
                paddingTop: 30
              }}
            >
              <Input
                inputStyle={{
                  flex: 1,
                  alignSelf: "center",
                  color: "black",
                  fontSize: 18
                }}
                inputContainerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#5B86E5"
                }}
                // onChangeText={price => this.checkVoletBalance(price)}
                onChangeText={price => this.setState({ price })}
                value={this.state.price}
                sst
                keyboardType="numeric"
                placeholderTextColor="rgb(74,74,74)"
                leftIcon={
                  <Text
                    style={{ fontSize: 18, color: "#5B86E5", paddingRight: 8 }}
                  >
                    MYR
                  </Text>
                }
              />
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            width: width
          }}
        >
          <LinearGradient
            colors={["#36D1DC", "#5B86E5"]}
            style={styles.buttonStyle}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ReasonEPayment", {
                  selectedContact: this.state.payContact,
                  amount: this.state.price
                })
              }
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default EvenlyRPayment;
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
  },

  listItemTextFontBig: {
    fontSize: 18,
    color: "black",
    marginLeft: 20
  }
});

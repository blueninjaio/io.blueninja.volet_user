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
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import { Contacts, Permissions, Constants, LinearGradient } from "expo";
import ContactList from "../../component/ContactList/index";
import { dev, prod, url } from "../../config/index";

export class SendPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: "",
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: [],
      isLoading: false,
      selectedContact: "",
      voletContacts: ""
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.showFirstContactAsync();
  }

  showFirstContactAsync = async () => {
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS]
    });

    console.log("Contacts", contacts.data);
    this.filterNumbers(contacts.data);

    // if (contacts !== "") {
    //   this.setState({ isLoading: false });
    //   this.setState({ A: this.filterMatches(contacts.data, /^A/) });
    //   this.setState({ B: this.filterMatches(contacts.data, /^B/) });
    //   this.setState({ C: this.filterMatches(contacts.data, /^C/) });
    //   this.setState({ D: this.filterMatches(contacts.data, /^D/) });
    //   this.setState({ E: this.filterMatches(contacts.data, /^E/) });
    //   this.setState({ F: this.filterMatches(contacts.data, /^F/) });
    //   this.setState({ G: this.filterMatches(contacts.data, /^G/) });
    //   this.setState({ H: this.filterMatches(contacts.data, /^H/) });
    //   this.setState({ I: this.filterMatches(contacts.data, /^I/) });
    //   this.setState({ J: this.filterMatches(contacts.data, /^J/) });
    //   this.setState({ K: this.filterMatches(contacts.data, /^K/) });
    //   this.setState({ L: this.filterMatches(contacts.data, /^L/) });
    //   this.setState({ M: this.filterMatches(contacts.data, /^M/) });
    //   this.setState({ N: this.filterMatches(contacts.data, /^N/) });
    //   this.setState({ O: this.filterMatches(contacts.data, /^O/) });
    //   this.setState({ P: this.filterMatches(contacts.data, /^P/) });
    //   this.setState({ Q: this.filterMatches(contacts.data, /^Q/) });
    //   this.setState({ R: this.filterMatches(contacts.data, /^R/) });
    //   this.setState({ S: this.filterMatches(contacts.data, /^S/) });
    //   this.setState({ T: this.filterMatches(contacts.data, /^T/) });
    //   this.setState({ U: this.filterMatches(contacts.data, /^U/) });
    //   this.setState({ V: this.filterMatches(contacts.data, /^V/) });
    //   this.setState({ W: this.filterMatches(contacts.data, /^W/) });
    //   this.setState({ X: this.filterMatches(contacts.data, /^X/) });
    //   this.setState({ Y: this.filterMatches(contacts.data, /^Y/) });
    //   this.setState({ Z: this.filterMatches(contacts.data, /^Z/) });
    // } else {
    //   this.setState({ isLoading: true });
    // }
  };

  filterMatches = (words, regexp) => {
    return words.filter(word => {
      return regexp.test(word.name);
    });
  };

  filterNumbers = async value => {
    let tempArra = [];
    value.map(x => {
      if (x.phoneNumbers) {
        tempArra.push(x.phoneNumbers[0].digits);
      }
    });
    console.log("Contacts list ", tempArra);
    try {
      fetch(`${url}/users/get-by-contact`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.props.navigation.state.params.token
        },
        body: JSON.stringify({
          contacts: tempArra
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("volet contacts :", data);
          if (data.success === true) {
            this.setState({ voletContacts: data.users });
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

  /**
  |--------------------------------------------------
  | Implementing Permission Requst for Contacts
  |--------------------------------------------------
  */

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    console.log("contact permission", status);
    // this.setState({
    //   hasCameraPermission: status === "granted"
    // });
  };

  onActionSelectNumber = contactList => {
    this.setState({ selectedContact: contactList });
    this.setState({ contact: contactList.phoneNumbers[0].digits });
  };

  onActionPaymentAmount = () => {
    if (this.state.contact !== "") {
      this.props.navigation.navigate("PaymentAmount", {
        selectedContact: this.state.selectedContact
      });
    } else {
      alert("Please enter a number");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            paddingBottom: 40
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
              Send Payment
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              Enter a name, contact number or scan your friends OR code to send
              a payment
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              width: width / 1.5
              // paddingLeft: 10
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
              onChangeText={contact => this.setState({ contact })}
              value={this.state.contact}
              type="text"
              placeholder="Name / Contact Number  "
              placeholderTextColor="rgb(215,215,215)"
            />
            <TouchableOpacity
              style={{}}
              onPress={() => this.props.navigation.navigate("ShowQRCode")}
            >
              <Image
                source={require("../../assets/qrcode.png")}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: width,
            borderColor: "#ddd",
            // borderWidth: 1,
            // borderRadius: 10,
            borderBottomWidth: 1,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 1
          }}
        ></View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20
          }}
        >
          <View style={{ width: width / 1.1, justifyContent: "flex-start" }}>
            {this.state.isLoading === true ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#5B86E5" />
              </View>
            ) : (
              <View style={{ paddingLeft: 5 }}>
                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <Text
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: 1,
                      fontSize: 18,
                      color: "#5B86E5"
                    }}
                  >
                    Contact List Not On Volet
                  </Text>
                </View>
                <ContactList
                  contacts={this.state.A}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"A"}
                />
                <ContactList
                  contacts={this.state.B}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"B"}
                />
                <ContactList
                  contacts={this.state.C}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"C"}
                />
                <ContactList
                  contacts={this.state.D}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"D"}
                />
                <ContactList
                  contacts={this.state.E}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"E"}
                />
                <ContactList
                  contacts={this.state.G}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"G"}
                />
                <ContactList
                  contacts={this.state.H}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"H"}
                />
                <ContactList
                  contacts={this.state.I}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"I"}
                />
                <ContactList
                  contacts={this.state.J}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"J"}
                />
                <ContactList
                  contacts={this.state.K}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"K"}
                />
                <ContactList
                  contacts={this.state.L}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"L"}
                />
                <ContactList
                  contacts={this.state.M}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"M"}
                />

                <ContactList
                  contacts={this.state.N}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"N"}
                />

                <ContactList
                  contacts={this.state.O}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"O"}
                />
                <ContactList
                  contacts={this.state.P}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"P"}
                />
                <ContactList
                  contacts={this.state.Q}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"Q"}
                />
                <ContactList
                  contacts={this.state.R}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"R"}
                />
                <ContactList
                  contacts={this.state.S}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"S"}
                />
                <ContactList
                  contacts={this.state.T}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"T"}
                />
                <ContactList
                  contacts={this.state.U}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"U"}
                />
                <ContactList
                  contacts={this.state.V}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"V"}
                />
                <ContactList
                  contacts={this.state.W}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"W"}
                />
                <ContactList
                  contacts={this.state.X}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"X"}
                />
                <ContactList
                  contacts={this.state.Y}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"Y"}
                />
                <ContactList
                  contacts={this.state.Z}
                  onActionSelectNumber={this.onActionSelectNumber}
                  alpha={"Z"}
                />
              </View>
            )}
          </View>
        </ScrollView>
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
              onPress={() => this.onActionPaymentAmount()}
              style={styles.buttonStyle}
            >
              <Text style={styles.loginText}>Done</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

export default SendPayment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
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

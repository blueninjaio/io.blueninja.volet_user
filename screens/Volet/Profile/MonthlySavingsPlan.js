import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { Switch } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "react-native-elements";
import { dev, prod, url } from "../../../config/index";

const { width } = Dimensions.get("window");

export default class MonthlySavingsPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: null,
      price: "",
      savings: 0,
      balance: 0
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of retrieving user info from AsyncStorage
  |--------------------------------------------------
  */
  componentDidMount = async () => {
    //get user id and set state to _id
    try {
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.getVolet(token);
        this.setState({ token });
      }
    } catch (error) {
      alert(error);
    }
  };


  onActionSwitch = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  onActionSavePlan = () => {
    fetch(`${url}/users/edit-savings`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.state.token
      },
      body: JSON.stringify({
        active: this.state.isActive,
        amount: this.state.price
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Save plan:", data);
        if (data.success) {
          this.props.navigation.navigate("Profile");
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.log("Error saving plans", error);
        Alert.alert(
          "Error connecting to server",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };

  getVolet = async token => {
    try {
      fetch(`${url}/users/me`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("Users :", data);
          if (data.success === true) {
            this.setState({ balance: data.user.credits });
            this.setState({ savings: data.user.monthly_savings });
            this.setState({ isActive: data.user.savings_active });
            if (data.user.photo_url) {
              this.setState({ userImage: data.user.photo_url });
            }
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.toggleSavingsContainer}>
            <View style={styles.toggleSavingsTextContainer}>
              <Text>Activate / Deactivate Savings Plan</Text>
            </View>
            <Switch
              style={styles.switchBtn}
              value={this.state.isActive}
              onValueChange={() => this.onActionSwitch()}
            />
          </View>
          <View>
            <View style={styles.savingsCard}>
              <Text style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}>
                Balance available today
              </Text>
              <Text
                style={{
                  color: "rgb(126,221,127)",
                  paddingBottom: 5,
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                RM{this.state.balance}
              </Text>
              <LinearGradient
                colors={["#36D1DC", "#5B86E5"]}
                style={styles.savingsBar}
              />
              <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>
                Monthly Savings Plan: RM {this.state.savings}
                /day
              </Text>
            </View>
            <View style={styles.cashInputContainer}>
              <Text style={styles.cashInputText}>
                How much would you like to save each month
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: width / 1.3,
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
                      style={{
                        fontSize: 18,
                        color: "#5B86E5",
                        paddingRight: 8
                      }}
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
                style={styles.buttonStyle}
                onPress={() => this.onActionSavePlan()}
              >
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  toggleSavingsContainer: {
    width: width,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#dbdbdb",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowColor: "#dbdbdb",
    shadowOffset: { height: 0, width: 0 }
  },
  toggleSavingsTextContainer: {
    width: width / 1.2,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  switchBtn: {
    marginTop: 4
  },
  savingsCard: {
    marginTop: 20,
    alignItems: "center",
    width: width / 1.2,
    backgroundColor: "red",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  savingsCardTwo: {
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  cashInputContainer: {
    marginTop: 40,
    alignItems: "center",
    width: width / 1.2
  },
  cashInputText: {
    color: "#5B86E5",
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

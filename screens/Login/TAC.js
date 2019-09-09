import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";

export class TAC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tacCode: "",
      timer: 90,
      isInvalid: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onActionTacCode = tacCode => {
    this.setState({ tacCode });
    if (tacCode.length === 6) {
      //   if (this.props.navigation.state.params.requestMethod === "SignUp")
      //   this.props.navigation.navigate("SignUpInfo", {
      //     contact: this.props.navigation.state.params.contact,
      //     // token: data.token
      //   })
      //   else{
      //     this.props.navigation.navigate("ForgetPassword", {
      //       contact: this.props.navigation.state.params.contact,
      //       // token: data.token
      //     })
      //   }
      fetch(`${url}/tac/check`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          contact: this.props.navigation.state.params.contact,
          tac_code: tacCode
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Valid Tac", data);
          if (data.success === true) {
            if (this.props.navigation.state.params.requestMethod === "SignUp")
              this.props.navigation.navigate("SignUpInfo", {
                contact: this.props.navigation.state.params.contact,
                // token: this.props.navigation.state.params.token
                token: data.token
              });
            else {
              this.props.navigation.navigate("ForgetPassword", {
                contact: this.props.navigation.state.params.contact,
                // token: this.props.navigation.state.params.token,
                token: data.token,
                email: data.email
              });
            }
          } else {
            this.setState({ isInvalid: true });
            alert(data.message);
          }
        })
        .catch(err => {
          console.log("Error send tac:", err);
          Alert.alert(
            "Error connecting to server",
            `Please try again later`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
          );
        });
    }
  };

  /**
  |--------------------------------------------------
  | Send Tac Code Implementing 
  |--------------------------------------------------
  */
  sendTacCode = () => {
    fetch(`${url}/tac/check`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        contact: this.props.navigation.state.params.contact
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.log("Error send tac:", err);
        Alert.alert(
          "Error connecting to server",
          `Please try again later`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
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
              Enter your TAC code
            </Text>
            <Text
              style={{ padding: 10, color: "grey", fontSize: width * 0.034 }}
            >
              We've sent the code to +60
              {this.props.navigation.state.params.contact}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: width
          }}
        >
          <TextInput
            style={
              this.state.isInvalid === true
                ? styles.textInputWrong
                : styles.textInputCorrect
            }
            onChangeText={tacCode => this.onActionTacCode(tacCode)}
            value={this.state.tacCode}
            type="number"
            placeholder="000000"
            placeholderTextColor="rgb(74,74,74)"
          />
          {this.state.timer === 0 ? (
            <TouchableOpacity
              onPress={() => this.sendTacCode()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20
              }}
            >
              <Text style={{ color: "grey", fontSize: width * 0.032 }}>
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: "grey", fontSize: width * 0.032 }}>
              You can request for a new code in {this.state.timer}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default TAC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  textInputWrong: {
    alignSelf: "center",
    width: width / 2,
    // paddingLeft: 20,
    borderRadius: 20,
    marginTop: 40,
    height: 20,
    marginBottom: 13,
    fontSize: 18,
    color: "black",
    borderBottomColor: "red",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  textInputCorrect: {
    alignSelf: "center",
    width: width / 2,
    // paddingLeft: 20,
    borderRadius: 20,
    marginTop: 40,
    height: 20,
    marginBottom: 13,
    fontSize: 18,
    color: "black",
    borderBottomColor: "#5B86E5",
    borderBottomWidth: 1,
    textAlign: "center"
  }
});

import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Alert } from "react-native";
import { dev, prod, url } from "../../../config";

export class Policies extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             policies: []
        }
    }
    
  /**
  |--------------------------------------------------
  | Implementation of Get Policies
  |--------------------------------------------------
  */

  componentDidMount = () => {
    this.getPolicies();
  };

  getPolicies = () => {
    fetch(`${url}/api/static/`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("FAQ :", data);
        if (data.static.length >= 1) {
          this.setState({ policies: data.static });
        }
      })
      .catch(error => {
        Alert.alert(
          "Error connecting to server",
          `${error}`,
          [{ text: "OK", onPress: () => null }],
          { cancelable: false }
        );
      });
  };
  render() {
    return (
      <View style={styles.container}>   
            <View style={{justifyContent:"center", alignItems:"center"}}>
                {
                    this.state.policies.map((x, i) => (
                        <View key={i} style={{alignItems:"flex-start", justifyContent:"center",  paddingBottom: 20}}>
                            <Text>{x.policies}</Text>
                        </View>
                    ))
                }
            </View>
      </View>
    );
  }
}

export default Policies;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    text: {
      color: "#979797",
      fontSize: 20
    }
  });
  
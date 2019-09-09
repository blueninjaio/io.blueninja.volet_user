import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { dev, prod, url } from "../../../config";

export class FAQ extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             faq: []
        }
    }
    
  /**
  |--------------------------------------------------
  | Implementation of Get Business Categories
  |--------------------------------------------------
  */

  componentDidMount = () => {
    this.getFAQ();
  };

  getFAQ = () => {
    fetch(`${url}/static/`, {
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
          this.setState({ faq: data.static });
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
                    this.state.faq.map((x, i) => (
                        <View key={i} style={{alignItems:"flex-start", justifyContent:"center", paddingBottom: 20}}>
                            <Text>{x.faq}</Text>
                        </View>
                    ))
                }
            </View>
      </View>
    );
  }
}

export default FAQ;
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
  
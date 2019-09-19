import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
export const { width, height } = Dimensions.get("window");
// import dataInfo from "../../../dataInfo/local.json";
import { dev, prod, url } from "../../../config";

export class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: []
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of Get Business Categories
  |--------------------------------------------------
  */

  componentDidMount = () => {
    // this.addBusiness();
  };

  addBusiness = () => {
    fetch(`${url}/business_category`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Business Details :", data.categories);
        if (data.categories.length >= 1) {
          this.setState({ shops: data.categories });
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
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}> */}
        {/* <FlatList
            data={this.state.shops}
            showsHorizontalScrollIndicator={false}
            // horizontal
            pagingEnabled={true}
            contentContainerStyle={{ marginBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "grey",
                  width: width / 1.1,
                  height: height / 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20
                }}
                onPress={() =>
                  this.props.navigation.navigate("ShopList", {
                    title: item.title
                  })
                }
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        <Text style={styles.text}> Coming Soon </Text>
        {/* </View> */}
      </View>
    );
  }
}

export default Shops;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

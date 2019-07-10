import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
import dataInfo from "../../../dataInfo/local.json"
import { dev, prod, url } from "../../../config";


export class ShopFeatured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredShops:[]
    };
  }


  /**
  |--------------------------------------------------
  | Implementation of Get Business item based on business ID
  |--------------------------------------------------
  */

  componentDidMount = () => {
    this.getBusinessItem();
  };

  getBusinessItem = () => {
    fetch(`${url}/api/item/business`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        business_id: this.props.navigation.state.params.businessID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get business item :", data);
        if (data.success === true) {
          this.setState({ featuredShops: data.item });
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
        <View
          style={{
            backgroundColor: "grey",
            height: height / 8,
            alignItems: "flex-start",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15
            }}
          >
            <Thumbnail
              large
              style={{ backgroundColor: "grey" }}
              source={{ uri: `${this.state.image}` }}
            />
            <View style={{}}>
              <Text>{this.props.navigation.state.params.legalName}</Text>
              <Text>{this.props.navigation.state.params.companyName}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <Text>{dataInfo.shopAvailablityInfo.availablityStatus}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="ios-timer" type="Ionicons" />
              <Text>{dataInfo.shopAvailablityInfo.time}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="ios-timer" type="Ionicons" />
              <Text>{dataInfo.shopAvailablityInfo.distance}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ShopDetails")}
            >
              <Text>See Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20
          }}
        >
          <Text>Featured </Text>
        </View>
        {/* </View> */}

        <FlatList
          data={this.state.featuredShops}
          showsHorizontalScrollIndicator={false}
          // horizontal
          pagingEnabled={true}
          contentContainerStyle={{ marginBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "grey",
                height: height / 8,
                marginBottom: 20
              }}
                onPress={() => this.props.navigation.navigate("")}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15
                }}
              >
                <Thumbnail
                  large
                  square
                  style={{ backgroundColor: "pink" }}
                  // source={{ uri: `${item.image}` }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: width / 1.5
                  }}
                >
                  <Text style={{width: width/2.2}}>{item.name}</Text>
                  <Text>RM{item.price.value}.{item.price.decimal}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default ShopFeatured;
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
  }
});

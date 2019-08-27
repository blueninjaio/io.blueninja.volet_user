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
import { Item, Icon, Input, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");
// import dataInfo from "../../../dataInfo/local.json";
import { dev, prod, url } from "../../../config";

export class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
      searchShopList: []
    };
  }

  /**
  |--------------------------------------------------
  | Implementation of Get Business based on selected Category
  |--------------------------------------------------
  */

  componentDidMount = () => {
    this.getCategoryDetails();
  };

  getCategoryDetails = () => {
    fetch(`${url}/api/category/business`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        type_of_business: this.props.navigation.state.params.title
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Categories Details :", data);
        if (data.success === true) {
          this.setState({ shopList: data.business });
          this.setState({ searchShopList: data.business });
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

  /**
    |--------------------------------------------------
    | Initialize and invoke search function to filter Shoplist 
    |--------------------------------------------------
    */
  search(text) {
    this.setState({ text });
    // SEARCH LOGIC SHOULD GO HERE
    let searchList = this.state.searchShopList.filter(ele =>
      ele.company_name.includes(text)
    );
    // console.log("Searched packages", searchedPackage)
    this.setState({ shopList: searchList });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.props.navigation.state.params.title}
            </Text>
          </View>
          <View style={{ width: width / 1.1 }}>
            <Item searchBar rounded>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onChangeText={text => this.search(text)}
              />
            </Item>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            data={this.state.shopList}
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
                  // alignItems: "center",
                  // justifyContent: "center",
                  marginBottom: 20
                }}
                onPress={() => this.props.navigation.navigate("ShopFeatured",{
                  businessID: item._id,
                  legalName:item.legal_name,
                  companyName: item.company_name,
                  shopList: this.state.shopList
                })}
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
                    style={{ backgroundColor: "grey" }}
                    // source={{ uri: `${item.image}` }}
                  />
                  <View style={{}}>
                    <Text>{item.legal_name}</Text>
                    <Text>{item.company_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default ShopList;
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

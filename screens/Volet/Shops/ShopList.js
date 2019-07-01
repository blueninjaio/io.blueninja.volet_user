import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Item, Icon, Input, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");

export class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [
        {
          image:
            "https://d2hdssvult3r4r.cloudfront.net/wp-content/uploads/2019/02/Eyeshadow--e1550500572435.png",
          title: "Karab",
          desc: "lorem upsem"
        }
      ]
    };
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
            <Text>{this.props.navigation.state.params.title}</Text>
          </View>
          <View style={{ width: width / 1.1 }}>
            <Item searchBar rounded>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
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
                onPress={() => this.props.navigation.navigate("ShopFeatured")}
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
                    source={{ uri: `${item.image}` }}
                  />
                  <View style={{}}>
                    <Text>{item.title}</Text>
                    <Text>{item.desc}</Text>
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

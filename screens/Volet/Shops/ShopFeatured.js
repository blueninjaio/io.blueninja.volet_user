import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");

export class ShopFeatured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featured: [
        {
          image:
            "https://d2hdssvult3r4r.cloudfront.net/wp-content/uploads/2019/02/Eyeshadow--e1550500572435.png",
          title: "Karab",
          price: "RM12.00"
        },
        {
          image:
            "https://d2hdssvult3r4r.cloudfront.net/wp-content/uploads/2019/02/Eyeshadow--e1550500572435.png",
          title: "Karab",
          price: "RM93.00"
        }
      ]
    };
  }

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
              source={{ uri: `${""}` }}
            />
            <View style={{}}>
              <Text>Krusty </Text>
              <Text>Bikimi</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <Text>Open Now</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="ios-timer" type="Ionicons" />
              <Text>30 mins</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="ios-timer" type="Ionicons" />
              <Text>10 km</Text>
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
          data={this.state.featured}
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
                  style={{ backgroundColor: "grey" }}
                  source={{ uri: `${item.image}` }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: width / 1.8
                  }}
                >
                  <Text>{item.title}</Text>
                  <Text>{item.price}</Text>
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

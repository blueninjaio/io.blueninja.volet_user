import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
export const { width, height } = Dimensions.get("window");
import dataInfo from "../../../dataInfo/local.json"

export class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [
        {
          title: "FnB"
        },
        { title: "Utilities" },
        {
          title: "Transportation"
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            data={dataInfo.shopCategories}
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
                    title: item.shopTitle
                  })
                }
              >
                <Text>{item.shopTitle}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default Shops;
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

import React, { Component } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import ListButton from "../../../component/ListButton";
export const { width, height } = Dimensions.get("window");

export class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrue: true,
      isFalse: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <ListButton
            title={"Reset Password"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"OldPassword"}
            />
          <ListButton
            title={"Reset Pin"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"ConvertAgent"}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Security;
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

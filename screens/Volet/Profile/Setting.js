import React, { Component } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import ListButton from "../../../component/ListButton";
export const { width, height } = Dimensions.get("window");

export class Setting extends Component {
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
            title={"Language"}
            desc={"English"}
            extraProps={this.state.isTrue}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
          />
          <ListButton
            title={"Currency"}
            desc={"English"}
            extraProps={this.state.isTrue}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
          />
          <ListButton
            title={"About Volet"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"AboutVolet"}
          />
          <ListButton
            title={"Security"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"Security"}
          />
          {this.props.navigation.state.params.userType === "User" ? (
            <ListButton
              title={"Convert To Agent"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/glasses.png")}
              navigation={this.props.navigation}
              page={"ConvertAgent"}
            />
          ) : null}

          <ListButton
            title={"Logout"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            page={"Logout"}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Setting;
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

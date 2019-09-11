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
        <ScrollView style={{ paddingTop: 16 }}>
          <ListButton
            title={"Language"}
            desc={"English"}
            extraProps={this.state.isTrue}
            icon={require("../../../assets/global.png")}
            // navigation={this.props.navigation}
          />
          <ListButton
            title={"Currency"}
            desc={"MYR"}
            extraProps={this.state.isTrue}
            icon={require("../../../assets/server.png")}
            // navigation={this.props.navigation}
          />
          <ListButton
            title={"About Volet"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/info.png")}
            navigation={this.props.navigation}
            page={"AboutVolet"}
          />
          <ListButton
            title={"Security"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/lock.png")}
            navigation={this.props.navigation}
            page={"Security"}
          />
          {this.props.navigation.state.params.userType === "User" ? (
            <ListButton
              title={"Convert To Agent"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/users.png")}
              navigation={this.props.navigation}
              page={"ConvertAgent"}
            />
          ) : null}

          <ListButton
            title={"Logout"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/power.png")}
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

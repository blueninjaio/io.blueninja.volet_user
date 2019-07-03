import React, { Component } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import ListButton from "../../../component/ListButton";
export const { width, height } = Dimensions.get("window");

export class AboutVolet extends Component {
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
            title={"FAQ"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"FAQ"}
          />
          <ListButton
            title={"Contact Support"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={""}
          />
          <ListButton
            title={"Feed & Ratings"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"Feedback"}
          />
          <ListButton
            title={"Policies"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"Policies"}

          />
        </ScrollView>
      </View>
    );
  }
}

export default AboutVolet;
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

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
          <View style={styles.shadowSet}>
            <ListButton
              title={"Language"}
              desc={"English"}
              extraProps={this.state.isTrue}
              icon={require("../../../assets/global.png")}
              navigation={this.props.navigation}
              page={""}

            />
          </View>
          <View style={styles.shadowSet}>
            <ListButton
              title={"Currency"}
              desc={"MYR"}
              extraProps={this.state.isTrue}
              icon={require("../../../assets/server.png")}
              navigation={this.props.navigation}
              page={""}

            />
          </View>
          <View style={styles.shadowSet}>
            <ListButton
              title={"About Volet"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/info.png")}
              navigation={this.props.navigation}
              page={"AboutVolet"}
            />
          </View>
          <View style={styles.shadowSet}>
            <ListButton
              title={"Security"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/lock.png")}
              navigation={this.props.navigation}
              page={"Security"}
            />
          </View>
          {this.props.navigation.state.params.userType === "User" ? (
            <View style={styles.shadowSet}>
              <ListButton
                title={"Convert To Agent"}
                extraProps={this.state.isFalse}
                icon={require("../../../assets/users.png")}
                navigation={this.props.navigation}
                page={"ConvertAgent"}
              />
            </View>
          ) : null}
          <View style={styles.shadowSet}>
            <ListButton
              title={"Logout"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/power.png")}
              page={"Logout"}
              navigation={this.props.navigation}
            />
          </View>
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
  },
  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  }
});

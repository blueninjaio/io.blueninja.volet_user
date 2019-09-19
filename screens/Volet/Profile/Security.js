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
        <ScrollView style={{ paddingTop: 16 }}>
          <View style={styles.shadowSet}>
            <ListButton
              title={"Reset Password"}
              extraProps={this.state.isFalse}
              icon={require("../../../assets/rPwd.png")}
              navigation={this.props.navigation}
              page={"OldPassword"}
              goBack="Security"
            />
          </View>
          {/* <ListButton
            title={"Reset Pin"}
            extraProps={this.state.isFalse}
            icon={require("../../../assets/glasses.png")}
            navigation={this.props.navigation}
            page={"ResetPin"}
            goBack="Security"

          /> */}
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

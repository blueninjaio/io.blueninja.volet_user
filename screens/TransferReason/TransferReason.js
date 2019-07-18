import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { Icon, Thumbnail } from "native-base";
export const { width, height } = Dimensions.get("window");

export class TransferReason extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: width / 1.5,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            <Text>Reason Of Transfer</Text>
            <Text>Whats is the reason of your transfer?</Text>
            <Text>Feel free to attact your receipt or skip</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 30
              }}
            >
              <TextInput
                style={{
                  alignSelf: "center",
                  width: width / 2,
                  paddingLeft: 20,
                  // borderRadius: 20,
                  height: 50,
                  color: "rgb(74,74,74)",
                  backgroundColor: "rgb(226,226,226)"
                }}
                onChangeText={reason => this.setState({ reason })}
                value={this.state.reason}
                type="text"
                placeholder="Reason of my transfer  "
                placeholderTextColor="rgb(74,74,74)"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            height: height / 2,
            alignItems: "center"
          }}
        >
          <TouchableOpacity style={{backgroundColor:"grey", padding: 20}}
            disabled={this.state.reason === "" ? true : false}
            onPress={() =>
              this.props.navigation.navigate("PaymentMethod", {
                amount: this.props.navigation.state.params.amount,
                reason: this.state.reason,
                transferUser: this.props.navigation.state.params.transferUser,
                transferContact: this.props.navigation.state.params
                  .transferContact
              })
            }
          >
            <Text>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"grey", padding: 20}}
            onPress={() =>
              this.props.navigation.navigate("PaymentMethod", {
                amount: this.props.navigation.state.params.amount,
                reason: this.state.reason,
                transferUser: this.props.navigation.state.params.transferUser,
                transferContact: this.props.navigation.state.params
                  .transferContact
              })
            }
          >
            <Text>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TransferReason;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30
  },
  text: {
    color: "#979797",
    fontSize: 20
  }
});

import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Icon, Left, Right, Body, Title } from "native-base";
export const { width, height } = Dimensions.get("window");
import Modal from "react-native-modal";
export class VoletBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "Top Up",
      isModalVisible: false
    };
  }

/**
|--------------------------------------------------
| Implementing Onclick functions to update states
|--------------------------------------------------
*/
  Onclick = value => {
    this.setState({ selectedValue: value });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderColor: "#ddd",
            width: width
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>MYR 200.00</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width / 1.5,
              alignItems: "center",
              padding: 15
            }}
          >
            {this.state.selectedValue === "Top Up" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "blue"
                }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text>Top Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Top Up")}
              >
                <Text>Top Up</Text>
              </TouchableOpacity>
            )}

            {this.state.selectedValue === "Widthdraw" ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "blue"
                }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text>Widthdraw</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.Onclick("Widthdraw")}
              >
                <Text>Widthdraw</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.state.selectedValue === "Top Up" ? (
            <View>
              <TouchableOpacity
                onPress={() => this.toggleModal()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8,
                  marginBottom: 10,
                  backgroundColor: "pink"
                }}
              >
                <Icon name="close" />

                <Text>Voucher code</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8,
                  backgroundColor: "grey"
                }}
              >
                <Icon name="close" />

                <Text>Credit / Debit Card</Text>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8
                }}
              >
                <Icon name="close" />
                <Text>From Agent</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: width / 1.2,
                  alignItems: "center",
                  height: height / 8
                }}
              >
                <Icon name="close" />

                <Text>Transfer to Bank Account</Text>
              </View>
            </View>
          )}
        </View>
        <Modal
          transparent={true}
          animationType="slide"
        //   backdropColor="black"
          visible={this.state.isModalVisible}
          style={styles.modalContent}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Left />
            <Body>
              <Title>Voucher</Title>
            </Body>
            <Right>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal();
                }}
              >
                <Icon name="close" />
              </TouchableHighlight>
            </Right>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Voucher Code</Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.8,
                paddingLeft: 20,
                // borderRadius: 20,
                height: 50,
                color: "rgb(74,74,74)",
                backgroundColor: "rgb(226,226,226)"
              }}
              onChangeText={voucherCode => this.setState({ voucherCode })}
              value={this.state.voucherCode}
              type="text"
              placeholder="voucher Code"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.toggleModal();
              }}
            >
              <Icon name="close" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default VoletBalance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  modalContent: {
    backgroundColor: "pink",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: height / 5,
    marginBottom: height /5,
    marginRight: 20,
    marginLeft: 20
  }
});

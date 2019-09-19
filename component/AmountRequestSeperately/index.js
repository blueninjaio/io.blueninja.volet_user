import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  AsyncStorage,
  Linking,
  Image,
  ScrollView
} from "react-native";
import { Icon, Left, Right, Body, Title } from "native-base";
export const { width, height } = Dimensions.get("window");
import { dev, prod, url } from "../../config";
import Modal from "react-native-modal";
import { Input } from "react-native-elements";
import { Contacts, Permissions, Constants, LinearGradient } from "expo";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      price: "",
      arrayIndex: [1],
      isUserModal: false,
      showSelectedUser: [],
    };
  }

  toggleAddUser = () => {
    this.setState({ isUserModal: !this.state.isUserModal });
  };


  render() {
    // console.log("Request payment array", this.state.arrayIndex);
    return (
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderTopWidth: 0,
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 1,
            marginBottom: 10,
            paddingBottom: 30,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text style={{ color: "black", fontWeight: "500" }}>
              Item Description
            </Text>
            <TextInput
              style={{
                width: width / 1.3,
                marginBottom: 15,
                marginTop: 10,
                height: 20,
                color: "rgb(74,74,74)",
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                fontSize: 13,
                alignSelf: "center"
              }}
              type="text"
              placeholder="Description"
              placeholderTextColor="rgb(74,74,74)"
              onChangeText={(description) => {
                this.props.updateInfo(description, this.state.price)
                this.setState({ description })
              }}
            />
            <Input
              inputStyle={{
                // flex: 1,
                color: "black",
                fontSize: 18
              }}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: "#5B86E5",
                width: width / 1.3
              }}
              onChangeText={(price) => {
                this.props.updateInfo(this.state.description, price)
                this.setState({ price })
              }}              
              value={this.state.price}
              keyboardType="numeric"
              placeholderTextColor="rgb(74,74,74)"
              leftIcon={
                <Text
                  style={{ fontSize: 18, color: "#5B86E5", paddingRight: 8 }}
                >
                  MYR
                </Text>
              }
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                //   justifyContent: "space-between",
                width: width / 1.5
              }}
            >
              {this.props.selectedUsers.map((x, i) => (
                x.selected?
                <View style={styles.shadowSet}>
                  <TouchableOpacity
                    style={{
                      padding: 7,
                      backgroundColor: "white",
                      borderRadius: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    key={i}
                    onPress={() => this.props.onActionSelectUser(x)}
                  >
                    <LinearGradient
                      colors={["#36D1DC", "#5B86E5"]}
                      style={{
                        borderRadius: 30,
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {x.f_name.substring(0, 1)}

                        {x.l_name.substring(0, 1)}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                :null
              ))}
              <TouchableOpacity
                style={{
                  padding: 7,
                  backgroundColor: "white",
                  borderRadius: 60,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.toggleAddUser}
              >
                <Image
                  source={require("../../assets/addUser.png")}
                  resizeMode="contain"
                  style={{ width: 33, height: 33 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            transparent={true}
            //   backdropColor="black"
            style={styles.modalContent}
            animationIn="slideInDown"
            animationOut="slideOutUp"
            isVisible={this.state.isUserModal}
            // deviceWidth={10}
            // deviceHeight={250}
            backdropColor="black"
            // backdropOpacity={0.2}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{ width: width / 1.4, justifyContent: "flex-start" }}
              >
                <Text
                  style={{
                    fontSize: width * 0.094,
                    color: "#5B86E5",
                    padding: 7
                  }}
                >
                  Who you want to share with?
                </Text>
                {this.props.totalUser.map((x, i) => (
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableOpacity
                      style={{
                        width: width / 1.6,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onPress={() => this.props.onActionSelectUser(x)}
                      key={i}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          paddingTop: 5,
                          paddingBottom: 5,
                          width: width / 1.8,
                          backgroundColor: "pink",
                          marginBottom: 10
                        }}
                      >
                        <LinearGradient
                          colors={["#36D1DC", "#5B86E5"]}
                          style={{
                            borderRadius: 30,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 18 }}>
                            {x.f_name.substring(0, 1)}

                            {x.l_name.substring(0, 1)}
                          </Text>
                        </LinearGradient>
                        <View
                          style={{ justifyContent: "center", marginLeft: 20 }}
                        >
                          <Text
                            style={{
                              paddingTop: 3,
                              paddingBottom: 3,
                              color: "black",
                              fontSize: 17,
                              fontWeight: "600"
                            }}
                          >
                            {x.f_name + " " + x.l_name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                ))}
              </View>
              <TouchableOpacity onPress={this.toggleAddUser}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  modalContent: {
    // backgroundColor: "pink",
    padding: 10,
    // // justifyContent: "center",
    // alignItems: "center",
    // // borderRadius: 8,
    // borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: height / 5,
    marginBottom: height / 5,
    // marginRight: 20,
    // marginLeft: 20
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 60,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15,
    marginTop: 10
  },
  buttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center",
    width: width / 1.3,
    borderRadius: 10
  },
  loginText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16
  }
});

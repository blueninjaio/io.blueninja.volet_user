import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Title,
  Subtitle,
  Item,
  InputGroup,
  Input,
  Badge,
  Header,
  Left,
  Body,
  Right,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardItem,
  Thumbnail,
  Form,
  Label,
  Switch,
  Textarea,
  CheckBox
} from "native-base";
import { LinearGradient } from "expo";
export const { width, height } = Dimensions.get("window");

export class ConfirmNewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: width / 1.5, paddingTop: 30 }}>
            <Text style={{ textAlign: "center" }}>
              Enter your new password and confirm your new password to reset
              your
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>New Password</Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.2,
                paddingLeft: 20,
                // borderRadius: 20,
                height: 50,
                color: "rgb(74,74,74)",
                backgroundColor: "rgb(226,226,226)"
              }}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              type="text"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 30
            }}
          >
            <Text>Confirm Password</Text>
            <TextInput
              style={{
                alignSelf: "center",
                width: width / 1.2,
                paddingLeft: 20,
                // borderRadius: 20,
                height: 50,
                color: "rgb(74,74,74)",
                backgroundColor: "rgb(226,226,226)"
              }}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              type="text"
              placeholder="password"
              placeholderTextColor="rgb(74,74,74)"
            />
          </View>
        </View>
        <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text>Confirm</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConfirmNewPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  Thumbnail: {
    backgroundColor: "grey",
    height: height / 3.5,
    width: width / 1.2
  }
});

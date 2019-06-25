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
  TouchableOpacity
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
import { TextInput } from "react-native-gesture-handler";
export const { width, height } = Dimensions.get("window");

export class TAC extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:''
        }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent:"space-around", alignItems:"center", height:100, paddingTop: 20}}>
          <Text>Enter your TAC code</Text>
          <Text>We've sent the code to +60123123123</Text>
        </View>
        <View style={{justifyContent:"center", alignItems:'center'}}>
          <TextInput
            style={{
              alignSelf: "center",
              width: width / 1.2,
              paddingLeft: 20,
              borderRadius: 20,
              marginTop: 40,
              height: 50,
              color: "rgb(74,74,74)",
              backgroundColor: "rgb(226,226,226)"
            }}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            type="number"
            placeholder="Your mobile number"
            placeholderTextColor="rgb(74,74,74)"
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmNewPassword')} style={{justifyContent:"center", alignItems:"center", padding: 20}}><Text>Resend Code</Text></TouchableOpacity>
      </View>
    );
  }
}

export default TAC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

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

export class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:""
        }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <View style={{justifyContent:"center", alignItems:"center"}}>
            <View style={styles.Logo} />

            </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ padding: 20 }}>Whats is your mobile number?</Text>
            <Text style={{ padding: 20 }}>
              We will send you a verification code
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TAC')}>
              <Text>Send Code</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row", justifyContent:"center", alignItems:'center', paddingBottom: 10}}>
            <Text>---------------- </Text>
            <Text> or </Text>
            <Text> ---------------- </Text>
          </View>
          <View style={{justifyContent:"center", alignItems:'center'}}>
            <Text>Sign Up with your social account</Text>
            <View style={{justifyContent:'space-around', alignItems:"center", flexDirection:"row"}}>
              <Thumbnail style={styles.Thumbnail} />
              <Thumbnail style={styles.Thumbnail} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  SignUpView: {
    height: height / 1.1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  Logo: {
    backgroundColor: "grey",
    height: 100,
    width: 200,
    marginBottom: 30
  },
  buttonSignUp: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey"
  },
  buttonStyle2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: "grey",
    marginTop: 20
  },
  Thumbnail:{
      backgroundColor:"grey"
  }
});

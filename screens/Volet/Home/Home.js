import React from 'react';
export const { width, height } = Dimensions.get('window');
import { Text, View, StyleSheet, TouchableHighlight, Dimensions, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import {
  Container, Content, Footer, FooterTab, Icon, Title, Subtitle, Item, InputGroup,
  Input, Badge, Header, Left, Body, Right, Accordion, Tab, Tabs,
  Card, CardItem, Thumbnail, Form, Label, Switch, Textarea, CheckBox
} from "native-base";
import { LinearGradient } from "expo"
// import { LinearTextGradient } from "react-native-text-gradient";

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: "Fa Mulan"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView>
          <LinearGradient
            colors={['#36D1DC', '#5B86E5']}
            style={styles.header}>
            <Header style={styles.headerOne}>
              <Left>
              </Left>
              <Body style={styles.headerOneBody}>
                <Image source={require('../../../assets/VoletLogo.png')} resizeMode="contain" style={{ width: 90, height: 90 }} />
              </Body>
              <Right style={styles.headerOneRight}>
                <Image source={require('../../../assets/bell.png')} resizeMode="contain" style={{ width: 22, height: 22 }} />
              </Right>
            </Header>
            <View style={styles.welcomeUser}>
              <Text style={{ padding: 5, fontSize: 17, color: "white", opacity: 0.7 }}>Welcome back, </Text>
              <Text style={{ padding: 5, fontSize: 25, fontWeight: "bold", color: "white" }}>{this.state.user}</Text>
            </View>
          </LinearGradient>
          <View style={styles.userVolet}>
            <Thumbnail large source={{ uri: `https://upload.wikimedia.org/wikipedia/en/0/0c/Give_Me_A_Try_single_cover.jpeg` }} style={{ backgroundColor: "grey", borderColor: "white" }} />
            <View style={styles.voletBalance}>
              <Text style={{ padding: 5, fontSize: 17, color: "grey", opacity: 0.9 }}>Your Volet Balance</Text>
              {/* <LinearTextGradient
                style={{ fontWeight: "bold", fontSize: 72 }}
                colors={['#36D1DC', '#5B86E5']}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                >
                RM200.00
              </LinearTextGradient> */}
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>RM200.00</Text>
            </View>
          </View>
          <View style={styles.savingsCard}>
            {/* <Card style={{ width: width / 1.2 }}>
              <CardItem>
                <Body style={{ padding: 5, alignItems: "center" }}>
                  <Text style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}>Balance available today</Text>
                  <Text style={{ color: "green", paddingBottom: 5 }}>RM 10.00</Text>
                  <LinearGradient
                    colors={['#36D1DC', '#5B86E5']}
                    style={styles.savingsBar}>
  
                  </LinearGradient>
                  <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>Monthly Savings Plan: RM 20.00/day</Text>
                </Body>
              </CardItem>
            </Card> */}
            <View style={styles.savingsCardTwo}>
              <Body style={{ padding: 5, alignItems: "center" }}>
                <Text style={{ color: "grey", opacity: 0.9, paddingBottom: 5 }}>Balance available today</Text>
                <Text style={{ color: "green", paddingBottom: 5 }}>RM 10.00</Text>
                <LinearGradient
                  colors={['#36D1DC', '#5B86E5']}
                  style={styles.savingsBar}>

                </LinearGradient>
                <Text style={{ color: "grey", opacity: 0.7, fontSize: 13 }}>Monthly Savings Plan: RM 20.00/day</Text>
              </Body>
            </View>
          </View>
          <View style={styles.payments}>
            <TouchableOpacity>
              <Image source={require('../../../assets/sendP.png')} resizeMode="contain" style={{ width: 100, height: 100 }} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={require('../../../assets/requestP.png')} resizeMode="contain" style={{ width: 100, height: 100 }} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={require('../../../assets/topUP.png')} resizeMode="contain" style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.qrcode}>
          <Card style={{ width: width }}>
            <CardItem>
              <Body style={{ padding: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../../../assets/qrcode.png')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                <Text style={{ paddingLeft: 10 }}>Swipe up To scan OR Code</Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: height / 4,
  },
  headerOne: {
    backgroundColor: "transparent",
    borderColor: null,
    justifyContent: "center",
    alignItems: "center"
  },
  headerOneBody: {
    alignItems: "center"
  },
  headerOneRight: {
    alignItems: "center"
  },
  welcomeUser: {
    alignItems: "center",
    // flexDirection:"row"
  },
  userVolet: {
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  voletBalance: {
    padding: 15,
    alignItems: "center"
  },
  savingsCard: {
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    // borderTopWidth: 0, 
    // borderLeftWidth: 0
  },
  payments: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20
  },
  qrcode: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -5
  },
  savingsBar: {
    height: 16,
    width: width / 1.4,
    marginBottom: 5
  },
  savingsCardTwo:{
    width: width / 1.2, 
    borderRadius: 10, 
    backgroundColor:"white", 
    padding: 10,
    // borderColor:"white",
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderTopWidth: 0, 
    // borderLeftWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  }
});

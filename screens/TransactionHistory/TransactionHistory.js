import React, {Component} from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

export const {width, height} = Dimensions.get("window");
import {dev, prod, url} from "../../config";
import {get} from "../../api/fetch";

const Page = {
  SENT: 0,
  RECEIVED: 1,
  REQUESTED: 2
};

function TransactionHistory(props) {
  const [selectedPage, setSelectedPage] = React.useState(Page.SENT);
  const [payments, setPayments] = React.useState([]);
  //
  React.useEffect( () => {
    get(`/volet/payments`).then(data => {
      let user = data.user;
      let payments = data.payments.map(payment => {
        const isSent = payment.from._id === user._id;
        let recipient = isSent ? payment.to : payment.from;
        let page = payment.status === 'Complete' ? isSent ? Page.SENT : Page.RECEIVED : Page.REQUESTED;
        const input = [];
        if (page === Page.SENT) {
          input.push({
            style: styles.listItemText,
            value: "Sent"
          });
          input.push({
            style: styles.listItemTextGreen,
            value: "MYR " + payment.amount
          });
          input.push({
            style: styles.listItemText,
            value: "to"
          });
          input.push({
            style: styles.listItemTextBold,
            value: recipient.f_name + " " + recipient.l_name
          });
        } else if (page === Page.RECEIVED) {
          input.push({
            style: styles.listItemText,
            value: "Received"
          });
          input.push({
            style: styles.listItemTextGreen,
            value: "MYR " + payment.amount
          });
          input.push({
            style: styles.listItemText,
            value: "from"
          });
          input.push({
            style: styles.listItemTextBold,
            value: recipient.f_name + " " + recipient.l_name
          });
        } else if (page === Page.REQUESTED) {
          if (payment.status === 'Requested') {
            if (isSent) {
              return undefined;//should never happen
            }
            input.push({
              style: styles.listItemTextBold,
              value: recipient.f_name + " " + recipient.l_name
            });
            input.push({
              style: styles.listItemText,
              value: "requested"
            });
            input.push({
              style: styles.listItemText,
              value: "to withdraw"
            });
            input.push({
              style: styles.listItemTextGreen,
              value: "MYR " + payment.amount
            });
          } else if (payment.status === 'Pending') {
            if (isSent) {
              input.push({
                style: styles.listItemText,
                value: "I requested"
              });
              input.push({
                style: styles.listItemTextGreen,
                value: "MYR " + payment.amount
              });
              input.push({
                style: styles.listItemText,
                value: "from"
              });
              input.push({
                style: styles.listItemTextBold,
                value: recipient.f_name + " " + recipient.l_name
              });
            } else {
              input.push({
                style: styles.listItemTextBold,
                value: recipient.f_name + " " + recipient.l_name
              });
              input.push({
                style: styles.listItemText,
                value: "requested"
              });
              input.push({
                style: styles.listItemTextGreen,
                value: "MYR " + payment.amount
              });
              input.push({
                style: styles.listItemText,
                value: "from me"
              });
            }
          }
        }
        return {
          firstName: recipient.f_name,
          lastName: recipient.l_name,
          transferContact: recipient.contact,
          requestType: page === Page.SENT ? "Sent" : page === Page.RECEIVED ? "Received" : "Request",
          page,
          input,
          acronym: user.f_name.charAt(0) + user.l_name.charAt(0),
          ...payment
        }
      });
      setPayments(payments);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width / 1.2,
            alignItems: "center",
            padding: 15
          }}
        >
          <TouchableOpacity
            style={selectedPage === Page.SENT ? styles.selectedView : styles.unselectedView}
            onPress={() => setSelectedPage(Page.SENT)}
          >
            <Image
              source={require("../../assets/requestSent.png")}
              resizeMode="contain"
              style={{width: 50, height: 50}}
            />
            <Text style={{color: "rgb(74, 74, 74)"}}>Sent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPage === Page.RECEIVED ? styles.selectedView : styles.unselectedView}
            onPress={() => setSelectedPage(Page.RECEIVED)}
          >
            <Image
              source={require("../../assets/wallet.png")}
              resizeMode="contain"
              style={{width: 50, height: 50}}
            />
            <Text style={{color: "rgb(74, 74, 74)"}}>Received</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPage === Page.REQUESTED ? styles.selectedView : styles.unselectedView}
            onPress={() => setSelectedPage(Page.REQUESTED)}
          >
            <Image
              source={require("../../assets/requestReceive.png")}
              resizeMode="contain"
              style={{width: 50, height: 50}}
            />
            <Text style={{color: "rgb(74, 74, 74)"}}>Request</Text>
          </TouchableOpacity>
        </View>

        <View style={{width: width / 1.3, alignItems: "center"}}>
                {
                  payments
                    .filter(payment => payment.page === selectedPage)
                    .map(payment => (
                      <>
                      <View style={styles.shadowSet}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("TransactionDetails", {
                              firstName: payment.firstName,
                              lastName: payment.lastName,
                              transferContact: payment.transferContact,
                              requestType: payment.requestType,
                              amount: payment.amount,
                              date: new Date(payment.date_created),//01/04/2019
                              transferTime: payment.date_created,//13:50 hours
                              reason: payment.reason
                            })
                          }
                          style={styles.listItemButton}
                        >
                          <View style={styles.show}>
                        <LinearGradient
                          colors={["#36D1DC", "#5B86E5"]}
                          style={{
                            borderRadius: 20,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{color: "white", fontSize: 18}}>
                            {payment.acronym}
                          </Text>
                        </LinearGradient>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            marginLeft: 30
                          }}
                        >
                          <View
                            style={{
                              width: width / 2,
                              flexDirection: "row",
                              marginBottom: 8
                            }}
                          >
                            <Text style={payment.input[0].style}>{payment.input[0].value}</Text>
                            <Text style={payment.input[1].style}>{payment.input[1].value}</Text>
                          </View>
                          <View
                            style={{
                              width: width / 2,
                              flexDirection: "row"
                            }}
                          >
                            <Text style={payment.input[2].style}>{payment.input[2].value}</Text>
                            <Text style={payment.input[3].style}>{payment.input[3].value}</Text>
                          </View>
                        </View>
              </View>
            </TouchableOpacity>
          </View>
                      </>
                    ))
                }
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    color: "#979797",
    fontSize: 20
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
  },
  userImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  voletContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  voletBalance: {
    width: width / 1.4,
    // padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    height: height / 10
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.3,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemButtonSwitch: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemButton: {
    padding: 20,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 5
  },
  listItemTextGreen: {
    fontSize: 15,
    color: "green",
    marginLeft: 5
  },
  listItemTextBold: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5
  },

  shadowSet: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: "#dbdbdb",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {width: 3, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15
  },
  selectedView: {
    padding: 10,
    borderBottomWidth: 1.5,
    borderColor: "#5B86E5",
    justifyContent: "center",
    alignItems: "center"
  },
  unselectedView: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

import React from "react";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import Icon from "react-native-vector-icons/Ionicons";

import Home from "../screens/Volet/Home";
import Shops from "../screens/Volet/Shops";
import Purchase from "../screens/Volet/Purchases";
import Profile from "../screens/Volet/Profile";
import ResetPassword from "../screens/ResetPassword";
import OldPassword from "../screens/OldPassword";
import FPTac from "../screens/FPTac";
import ConfirmNewPassword from "../screens/ConfirmNewPassword";
import ResetPin from "../screens/ResetPin";
import SendPayment from "../screens/SendPayment";
import RequestPayment from "../screens/Separately/RequestPayment";
import EvenlyRPayment from "../screens/Evenly/EvenlyRPayment";
import SplitRPayment from "../screens/Separately/SplitRPayment";
import SplitRSummary from "../screens/Separately/SplitRSummary";
import SplitESummary from "../screens/Evenly/SplitESummary";
import SeparatelyRPayment from "../screens/Separately/SeparatelyRPayment";
import ReasonRPayment from "../screens/Separately/ReasonRPayment";
import ReasonEPayment from "../screens/Evenly/ReasonEPayment";
import SPaymentSuccess from "../screens/SPaymentSuccess";
import PaymentAmount from "../screens/PaymentAmount";
import VoletBalance from "../screens/VoletBalance";
import WithdrawAgent from "../screens/WithdrawAgent";
import TransferReason from "../screens/TransferReason";
import PaymentMethod from "../screens/PaymentMethod";
import TransferSummary from "../screens/TransferSummary";
import ShowQRCode from "../screens/ShowQRCode";

const tabbarVisible = navigation => {
  const { routes } = navigation.state;
  // console.log("Route", routes);
  let showTabbar = true;
  routes.forEach(route => {
    if (route.routeName !== "Profile") {
      showTabbar = false;
    }
  });
  // console.log("tab bar status", showTabbar);
  return showTabbar;
};

const UserTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/homeInactive.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Image
              source={require("../assets/home.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          )
      }
    },
    Shops: {
      screen: Shops,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/shopbagInactive.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Image
              source={require("../assets/shopbagActive.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          )
        // tabBarVisible: false
      }
    },
    Purchase: {
      screen: Purchase,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/pInActive.png")}
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <Image
              source={require("../assets/pActive.png")}
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
            />
          )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) =>
          tintColor === "black" ? (
            <Image
              source={require("../assets/profileInactive.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Image
              source={require("../assets/profile.png")}
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
            />
          ),
        tabBarVisible: tabbarVisible(navigation)
      })
    }
  },
  {
    // animationEnabled: true,
    // swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "black",
      showLabel: false,
      indicatorStyle: { backgroundColor: "transparent" },
      style: {
        backgroundColor: "white",
        // borderTopColor: 'red',
        // borderTopWidth: ,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5,
        height: height / 12
      }
    }
  }
);
const StackNavigator = createStackNavigator(
  {
    // Login: {
    //   screen: Login,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null,
    //   }),
    // },

    // SignUp: {
    //   screen: SignUp,
    //   navigationOptions: ({ navigation }) => ({
    //     header: null,
    //   }),
    // },
    Home: {
      screen: UserTabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Reset Password",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    OldPassword: {
      screen: OldPassword,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Reset Password",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    FPTac: {
      screen: FPTac,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Reset Password",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    ConfirmNewPassword: {
      screen: ConfirmNewPassword,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Reset Password",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    ResetPin: {
      screen: ResetPin,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Reset Pin",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    SendPayment: {
      screen: SendPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Send Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    EvenlyRPayment: {
      screen: EvenlyRPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    RequestPayment: {
      screen: RequestPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    SplitRPayment: {
      screen: SplitRPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },

    SplitRSummary: {
      screen: SplitRSummary,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    SplitESummary: {
      screen: SplitESummary,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    SPaymentSuccess: {
      screen: SPaymentSuccess,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    SeparatelyRPayment: {
      screen: SeparatelyRPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    ReasonRPayment: {
      screen: ReasonRPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    ReasonEPayment: {
      screen: ReasonEPayment,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Request Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    PaymentAmount: {
      screen: PaymentAmount,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Send Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    VoletBalance: {
      screen: VoletBalance,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Volet Balance",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    WithdrawAgent: {
      screen: WithdrawAgent,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Volet Balance",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    TransferReason: {
      screen: TransferReason,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Send Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    PaymentMethod: {
      screen: PaymentMethod,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Send Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    TransferSummary: {
      screen: TransferSummary,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "Send Payment",
        headerStyle: {
          backgroundColor: "white"
        }
      })
    },
    ShowQRCode: {
      screen: ShowQRCode,
      navigationOptions: ({ navigation }) => ({
        mode: "card",
        title: "QR Code",
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "white"
        }
      })
    }
  },
  {
    swipeEnabled: true
  }
);

export default createAppContainer(StackNavigator);

const styles = StyleSheet.create({
  cancelBut: {
    marginRight: 10,
    color: "rgb(215,215,215)"
  }
});

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Icon } from "native-base";
import Login from "./Login";
import Main from "./Main";
import Signup from "./SignUp";
import TAC from "./TAC";
import SignUpInfo from "./SignUpInfo";
import SetPin from "./SetPin";
import ContactSupport from "./ContactSupport";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import ConfirmNewPassword from "./ConfirmNewPassword";
import FPTac from "./FPTac";
import Home from "../Volet/Home/Home";

const LoginScreen = ({ navigation }) => <Login navigation={navigation} />;

const MainScreen = ({ navigation }) => <Main navigation={navigation} />;

MainScreen.navigationOptions = {
  mode: "card",
  header: null
};

const SignupScreen = ({ navigation }) => <Signup navigation={navigation} />;

const TACScreen = ({ navigation }) => <TAC navigation={navigation} />;

const SignUpInfoScreen = ({ navigation }) => (
  <SignUpInfo navigation={navigation} />
);

const SetPinScreen = ({ navigation }) => <SetPin navigation={navigation} />;

SetPinScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
);

const ForgetPasswordScreen = ({ navigation }) => (
  <ForgetPassword navigation={navigation} />
);

const ResetPasswordScreen = ({ navigation }) => (
  <ResetPassword navigation={navigation} />
);

const ConfirmNewPasswordScreen = ({ navigation }) => (
  <ConfirmNewPassword navigation={navigation} />
);

const FPTacScreen = ({ navigation }) => <FPTac navigation={navigation} />;

const MyHomeScreen = ({ navigation }) => <Home navigation={navigation} />;
MyHomeScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ModalStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    TAC: {
      screen: TACScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        title: 'Create Account',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    SignUpInfo: {
      screen: SignUpInfoScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        title: 'Sign Up',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    SetPin: {
      screen: SetPinScreen
    },
    ContactSupport: {
      screen: ContactSupportScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Forget Password',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Forget Password',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    ConfirmNewPassword: {
      screen: ConfirmNewPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        title: 'Reset Password',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: null,
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    FPTac: {
      screen: FPTacScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        title: 'Forget Password',
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={styles.cancelBut}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          borderBottomWidth: 0,
          shadowColor: "transparent",
          shadowOpacity: 0
        }
      })
    },
    Home: {
      screen: MyHomeScreen
    }
  },
  {
    defaultNavigationOptions: {
      // header: null
    }
  }
);

export default createAppContainer(ModalStack);

const styles = StyleSheet.create({
  cancelBut: {
    marginRight: 10,
    color:"rgb(215,215,215)",

  }
});

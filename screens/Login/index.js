import React from "react";
import { Text, TouchableOpacity } from "react-native";
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

LoginScreen.navigationOptions = {
  mode: "card",
  // header: null
  headerLeft: null,
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const MainScreen = ({ navigation }) => <Main navigation={navigation} />;

MainScreen.navigationOptions = {
  mode: "card",
  header: null
};

const SignupScreen = ({ navigation }) => <Signup navigation={navigation} />;

SignupScreen.navigationOptions = {
  mode: "card",
  // header: null
  headerLeft: null,
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const TACScreen = ({ navigation }) => <TAC navigation={navigation} />;

TACScreen.navigationOptions = {
  mode: "card",
  // header: null
  headerLeft: null,
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const SignUpInfoScreen = ({ navigation }) => (
  <SignUpInfo navigation={navigation} />
);

SignUpInfoScreen.navigationOptions = {
  mode: "card",
  // header: null
  headerLeft: null,
  title: "Sign Up",
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const SetPinScreen = ({ navigation }) => <SetPin navigation={navigation} />;

SetPinScreen.navigationOptions = {
  mode: "card",
  header: null
};

const ContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
);

ContactSupportScreen.navigationOptions = {
  mode: "card",
  // header: null
  title: "Contact Support",
  headerRight: (
    <TouchableOpacity>
      <Icon name="closecircleo" type="AntDesign" />
    </TouchableOpacity>
  )
};

const ForgetPasswordScreen = ({ navigation }) => (
  <ForgetPassword navigation={navigation} />
);

ForgetPasswordScreen.navigationOptions = {
  mode: "card",
  // header: null
  title: "Forget Password",
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const ResetPasswordScreen = ({ navigation }) => (
  <ResetPassword navigation={navigation} />
);

ResetPasswordScreen.navigationOptions = {
  mode: "card",
  // header: null
  title: "Forget Password",
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const ConfirmNewPasswordScreen = ({ navigation }) => (
  <ConfirmNewPassword navigation={navigation} />
);

ConfirmNewPasswordScreen.navigationOptions = {
  mode: "card",
  // header: null
  title: "Reset Password",
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

const FPTacScreen = ({ navigation }) => <FPTac navigation={navigation} />;

FPTacScreen.navigationOptions = {
  mode: "card",
  // header: null
  title: "Forget Password",
  headerRight: (
    <TouchableOpacity>
      <Text>Cancel</Text>
    </TouchableOpacity>
  )
};

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
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    },
    TAC: {
      screen: TACScreen
    },
    SignUpInfo: {
      screen: SignUpInfoScreen
    },
    SetPin: {
      screen: SetPinScreen
    },
    ContactSupport: {
      screen: ContactSupportScreen
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen
    },
    ResetPassword: {
      screen: ResetPasswordScreen
    },
    ConfirmNewPassword: {
      screen: ConfirmNewPasswordScreen
    },
    FPTac: {
      screen: FPTacScreen
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

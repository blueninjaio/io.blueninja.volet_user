import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Profile from "./Profile";
import Setting from "./Setting";
import Logout from "./Logout";
import PersonalDetails from "./PersonalDetails";
import AboutVolet from "./AboutVolet";
import FAQ from "./FAQ";
import Policies from "./Policies";
import Feedback from "./FeedBack";
import ContactSupport from "./ContactSupport";
// import VoletBalance from "./VoletBalance"
import ConvertAgent from "./ConvertAgent";
import Security from "./Security";

const MyProfileScreen = ({ navigation }) => <Profile navigation={navigation} />;
MyProfileScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MySettingScreen = ({ navigation }) => <Setting navigation={navigation} />;
MySettingScreen.navigationOptions = {
  mode: "card",
  title: "Settings",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyLogoutScreen = ({ navigation }) => <Logout navigation={navigation} />;
MyLogoutScreen.navigationOptions = {
  mode: "card",
  header: null
};

const MyPersonalDetailsScreen = ({ navigation }) => (
  <PersonalDetails navigation={navigation} />
);
MyPersonalDetailsScreen.navigationOptions = {
  mode: "card",
  title: "Personal Details",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyAboutVoletScreen = ({ navigation }) => (
  <AboutVolet navigation={navigation} />
);
MyAboutVoletScreen.navigationOptions = {
  mode: "card",
  title: "About Volet",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFAQScreen = ({ navigation }) => <FAQ navigation={navigation} />;
MyFAQScreen.navigationOptions = {
  mode: "card",
  title: "FAQ",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyPoliciesScreen = ({ navigation }) => (
  <Policies navigation={navigation} />
);
MyPoliciesScreen.navigationOptions = {
  mode: "card",
  title: "Policies",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyFeedbackScreen = ({ navigation }) => (
  <Feedback navigation={navigation} />
);
MyFeedbackScreen.navigationOptions = {
  mode: "card",
  title: "Feedback & Ratings",
  headerStyle: {
    backgroundColor: "white"
  }
};

// const MyVoletBalanceScreen = ({ navigation }) => <VoletBalance navigation={navigation} />;
// MyVoletBalanceScreen.navigationOptions = {
//   mode: "card",
//   title: "Volet Balance",
//   headerStyle: {
//     backgroundColor: "white"
//   }
// };

const MyContactSupportScreen = ({ navigation }) => (
  <ContactSupport navigation={navigation} />
);
MyContactSupportScreen.navigationOptions = {
  mode: "card",
  title: "Contact Support",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MyConvertAgentScreen = ({ navigation }) => (
  <ConvertAgent navigation={navigation} />
);
MyConvertAgentScreen.navigationOptions = {
  mode: "card",
  title: "Convert To Agent",
  headerStyle: {
    backgroundColor: "white"
  }
};

const MySecurityScreen = ({ navigation }) => (
  <Security navigation={navigation} />
);
MySecurityScreen.navigationOptions = {
  mode: "card",
  title: "Security",
  headerStyle: {
    backgroundColor: "white"
  }
};

const ModalStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen
    },
    Setting: {
      screen: MySettingScreen
    },
    Logout: {
      screen: MyLogoutScreen
    },
    PersonalDetails: {
      screen: MyPersonalDetailsScreen
    },
    AboutVolet: {
      screen: MyAboutVoletScreen
    },
    FAQ: {
      screen: MyFAQScreen
    },
    Policies: {
      screen: MyPoliciesScreen
    },
    Feedback: {
      screen: MyFeedbackScreen
    },
    // VoletBalance:{
    //   screen: MyVoletBalanceScreen
    // },
    ConvertAgent: {
      screen: MyConvertAgentScreen
    },
    Security: {
      screen: MySecurityScreen
    },
    ContactSupport: {
      screen: MyContactSupportScreen
    }
  },
  {
    defaultNavigationOptions: {
      // header: null
    }
  }
);

export default createAppContainer(ModalStack);

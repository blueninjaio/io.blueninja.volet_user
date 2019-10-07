import React from "react";
import Volet from "./screens/index";
import { Provider } from "react-redux";
import store from "./store/index";
import { Container, Button, text, ListItem, Text, Spinner } from "native-base";
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Provider store={store}>
        <Volet />
      </Provider>
    );
  }
}

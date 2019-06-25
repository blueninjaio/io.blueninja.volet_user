import React from 'react';
import Volet from './screens/index'
import { Provider } from 'react-redux'
import store from './store/index'

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store} >
        <Volet />
      </Provider>
    );
  }
}
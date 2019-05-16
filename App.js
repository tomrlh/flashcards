import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import Routes from "./Routes"
import { setLocalNotification } from './src/utils/helpers'

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Routes/>
      </Provider>
    );
  }
}
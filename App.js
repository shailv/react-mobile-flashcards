import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import AppNavigator from './components/AppNavigator'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" /> 

          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

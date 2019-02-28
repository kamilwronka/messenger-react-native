import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View } from 'react-native';
import { Root, Spinner } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import AppNavigator from './src/navigation';
import AppSocketWrapper from './src/AppSocketWrapper';

import { persistor, store } from './src/store';

export default class App extends Component {
    componentDidMount() {
      console.log('mount')
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root>
              <AppSocketWrapper>
                {Platform.OS === 'ios' && (
                  <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                )}
                <AppNavigator />
              </AppSocketWrapper>
            </Root>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

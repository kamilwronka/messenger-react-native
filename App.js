import React, { Component } from "react";
import { StyleSheet, StatusBar, View, YellowBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import SplashScreen from "react-native-splash-screen";

import AppNavigator from "./src/navigation";
import AppSocketWrapper from "./src/AppSocketWrapper";

import { persistor, store } from "./src/store";

console.ignoredYellowBox = ["Remote debugger"];
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

export default class App extends Component {
  componentDidMount() {
    setTimeout(SplashScreen.hide, 100);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppSocketWrapper>
              <StatusBar barStyle="light-content" />
              <AppNavigator />
            </AppSocketWrapper>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

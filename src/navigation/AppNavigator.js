import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import AuthLoadingScreen from "../screens/AuthScreen/AuthLoadingScreen";

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Welcome: WelcomeScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

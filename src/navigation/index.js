import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CameraScreen from "../screens/CameraScreen/CameraScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen.component";
import PhotoScreen from "../screens/PhotoScreen/PhotoScreen";

import AuthScreen from "../screens/AuthScreen/AuthScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import AuthLoadingScreen from "../screens/AuthScreen/AuthLoadingScreen";

import ConversationScreen from "../screens/ConversationScreen/ConversationScreen";

import { BottomTabNavigation } from "./BottomTabNavigation";
import ConversationInfoScreen from "../screens/ConversationInfoScreen/ConversationInfoScreen";

const SearchStack = createStackNavigator(
  {
    BottomTabNavigation: {
      screen: BottomTabNavigation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: { gesturesEnabled: false }
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const ConversationStack = createStackNavigator(
  {
    ConversationScreen: {
      screen: ConversationScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ConversationInfoScreen: {
      screen: ConversationInfoScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const ModalStack = createStackNavigator(
  {
    SearchStack: {
      screen: SearchStack,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    }
  },
  {
    mode: "modal"
  }
);

const MessengerApp = createStackNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen
  },
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: { header: null }
  },
  MainScreen: {
    screen: ModalStack,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  },
  ConversationStack: {
    screen: ConversationStack,
    navigationOptions: { gesturesEnabled: false, header: null }
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: { gesturesEnabled: false, header: null }
  },
  PhotoScreen: {
    screen: PhotoScreen,
    navigationOptions: { gesturesEnabled: false, header: null }
  }
});

export default createAppContainer(MessengerApp);
